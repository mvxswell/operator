-- Think Operator leaderboard.
-- Run this file once in the Supabase SQL editor (or via the Supabase CLI).
-- The site talks to Supabase from the browser with the public anon key only.
-- Do not put the service-role key in the app, in .env.local, or in GitHub Pages.

-- Score ranges follow the app, not a guess:
--   operator  0–1000   Operator Score (src/lib/scoring.ts, MAX_OPERATOR_SCORE)
--   quick     0–300    decisions per minute. The 60s round plus a 220ms input
--                      lockout caps a perfect run near 272, so 300 rejects
--                      impossible totals without cutting off a legal one.
--   <skill>   0–1000   skill tests reuse the Operator Score formula. The 0–100
--                      figures on a result screen are the per-skill breakdown
--                      inside a run, not the skill-test score that gets posted.

create table public.scores (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nickname text not null,
  mode text not null,
  score numeric not null,
  duration_ms integer not null,
  client_id text not null,
  constraint scores_nickname_check check (
    char_length(nickname) between 2 and 20
    and nickname ~ '^[A-Za-z0-9 _-]{2,20}$'
    and nickname ~ '[A-Za-z0-9]'
  ),
  constraint scores_mode_check check (
    mode in (
      'operator',
      'quick',
      'bottleneck',
      'prioritization',
      'resource',
      'financial',
      'sales',
      'operations',
      'people',
      'strategy'
    )
  ),
  constraint scores_score_check check (
    score >= 0
    and score = trunc(score)
    and (
      (mode = 'quick' and score <= 300)
      or (mode <> 'quick' and score <= 1000)
    )
  ),
  constraint scores_duration_check check (duration_ms > 0 and duration_ms <= 21600000),
  constraint scores_client_check check (
    client_id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
  )
);

comment on table public.scores is
  'Posted runs. Anon may read rows. Inserts happen only through submit_score.';

create index scores_leaderboard_idx
  on public.scores (mode, score desc, duration_ms asc);

create index scores_client_created_idx
  on public.scores (client_id, created_at desc);

-- Small blocklist. Matching is done in submit_score, not by the client.
create table public.profanity_blocklist (
  term text primary key,
  constraint profanity_term_check check (term = lower(term) and char_length(term) >= 3)
);

insert into public.profanity_blocklist (term) values
  ('fuck'),
  ('fucker'),
  ('fucking'),
  ('motherfucker'),
  ('shit'),
  ('shitty'),
  ('bullshit'),
  ('bitch'),
  ('bastard'),
  ('asshole'),
  ('cunt'),
  ('dick'),
  ('cock'),
  ('pussy'),
  ('slut'),
  ('whore'),
  ('nigger'),
  ('nigga'),
  ('faggot'),
  ('retard'),
  ('retarded'),
  ('rape'),
  ('rapist');

alter table public.scores enable row level security;
alter table public.profanity_blocklist enable row level security;

-- Anon and authenticated can read scores. No insert, update, or delete policy,
-- so those operations are denied for the public key.
create policy scores_select_public
  on public.scores
  for select
  to anon, authenticated
  using (true);

revoke all on table public.scores from public, anon, authenticated;
grant select on table public.scores to anon, authenticated;

revoke all on table public.profanity_blocklist from public, anon, authenticated;

create or replace function public.submit_score(
  p_nickname text,
  p_mode text,
  p_score numeric,
  p_duration_ms integer,
  p_client_id text
)
returns table (
  board_rank integer,
  nickname text,
  score numeric,
  duration_ms integer,
  is_best boolean
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_nick text;
  v_flat text;
  v_id uuid;
  v_best_id uuid;
  v_min_duration integer;
  v_max_score numeric;
begin
  if p_client_id is null
     or p_client_id !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
    raise exception 'invalid_client';
  end if;

  -- One submission at a time per browser id, so the rate limit cannot be raced.
  perform pg_advisory_xact_lock(hashtext(p_client_id));

  v_nick := btrim(coalesce(p_nickname, ''));
  if char_length(v_nick) < 2
     or char_length(v_nick) > 20
     or v_nick !~ '^[A-Za-z0-9 _-]{2,20}$'
     or v_nick !~ '[A-Za-z0-9]' then
    raise exception 'invalid_nickname';
  end if;

  v_flat := lower(regexp_replace(v_nick, '[^A-Za-z0-9]', '', 'g'));
  if exists (
    select 1
    from public.profanity_blocklist as blocked
    where v_flat = blocked.term
       or lower(v_nick) ~ ('(^|[^a-z])' || blocked.term || '([^a-z]|$)')
       or (
         char_length(blocked.term) >= 4
         and blocked.term not in ('cock', 'dick', 'rape')
         and v_flat like '%' || blocked.term || '%'
       )
  ) then
    raise exception 'nickname_not_allowed';
  end if;

  if p_mode is null or p_mode not in (
    'operator', 'quick',
    'bottleneck', 'prioritization', 'resource', 'financial',
    'sales', 'operations', 'people', 'strategy'
  ) then
    raise exception 'invalid_mode';
  end if;

  v_max_score := case when p_mode = 'quick' then 300 else 1000 end;
  if p_score is null or p_score < 0 or p_score > v_max_score or p_score <> trunc(p_score) then
    raise exception 'invalid_score';
  end if;

  -- Floors are below a careful human and above an instant script.
  -- Operator Test is 20 questions, a skill test is 10, Quick Decisions is a
  -- 60 second clock (src/lib/useQuickGame.ts ROUND_MS).
  v_min_duration := case
    when p_mode = 'operator' then 45000
    when p_mode = 'quick' then 50000
    else 20000
  end;
  if p_duration_ms is null or p_duration_ms < v_min_duration or p_duration_ms > 21600000 then
    raise exception 'implausible_duration';
  end if;

  if (
    select count(*)
    from public.scores
    where client_id = p_client_id
      and created_at > now() - interval '1 hour'
  ) >= 10 then
    raise exception 'rate_limited';
  end if;

  if exists (
    select 1
    from public.scores
    where client_id = p_client_id
      and created_at > now() - interval '30 seconds'
  ) then
    raise exception 'rate_limited';
  end if;

  insert into public.scores (nickname, mode, score, duration_ms, client_id)
  values (v_nick, p_mode, p_score, p_duration_ms, p_client_id)
  returning id into v_id;

  return query
  with best as (
    select distinct on (lower(s.nickname))
      s.id,
      s.nickname,
      s.score,
      s.duration_ms,
      s.created_at
    from public.scores as s
    where s.mode = p_mode
    order by lower(s.nickname), s.score desc, s.duration_ms asc, s.created_at asc
  ),
  ranked as (
    select
      best.id,
      best.nickname,
      best.score,
      best.duration_ms,
      row_number() over (
        order by best.score desc, best.duration_ms asc, best.created_at asc
      )::integer as board_rank
    from best
  )
  select
    ranked.board_rank,
    ranked.nickname,
    ranked.score,
    ranked.duration_ms,
    (ranked.id = v_id) as is_best
  from ranked
  where ranked.id = v_id
     or lower(ranked.nickname) = lower(v_nick)
  order by (ranked.id = v_id) desc
  limit 1;
end;
$$;

create or replace function public.leaderboard(
  p_mode text,
  p_limit integer default 50
)
returns table (
  board_rank integer,
  nickname text,
  score numeric,
  duration_ms integer,
  created_at timestamptz
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_limit integer;
begin
  if p_mode is null or p_mode not in (
    'operator', 'quick',
    'bottleneck', 'prioritization', 'resource', 'financial',
    'sales', 'operations', 'people', 'strategy'
  ) then
    raise exception 'invalid_mode';
  end if;

  v_limit := least(greatest(coalesce(p_limit, 50), 1), 50);

  return query
  with best as (
    -- One row per nickname: highest score, then faster time, then earlier post.
    select distinct on (lower(s.nickname))
      s.nickname,
      s.score,
      s.duration_ms,
      s.created_at
    from public.scores as s
    where s.mode = p_mode
    order by lower(s.nickname), s.score desc, s.duration_ms asc, s.created_at asc
  )
  select
    row_number() over (
      order by best.score desc, best.duration_ms asc, best.created_at asc
    )::integer as board_rank,
    best.nickname,
    best.score,
    best.duration_ms,
    best.created_at
  from best
  order by 1
  limit v_limit;
end;
$$;

revoke all on function public.submit_score(text, text, numeric, integer, text) from public;
grant execute on function public.submit_score(text, text, numeric, integer, text) to anon, authenticated;

revoke all on function public.leaderboard(text, integer) from public;
grant execute on function public.leaderboard(text, integer) to anon, authenticated;
