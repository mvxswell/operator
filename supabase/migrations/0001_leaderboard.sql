-- Run once in the Supabase SQL editor. No service-role key belongs in the site.
create table if not exists public.scores (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nickname text not null check (nickname ~ '^[A-Za-z0-9_ -]{2,20}$'),
  mode text not null check (mode in (
    'operator', 'quick', 'bottleneck', 'prioritization', 'resource',
    'financial', 'sales', 'operations', 'people', 'strategy'
  )),
  score numeric not null check (score >= 0 and score <= 1000 and score = trunc(score)),
  duration_ms integer not null check (duration_ms > 0),
  client_id text not null check (client_id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$')
);

create index if not exists scores_mode_rank_idx
  on public.scores (mode, score desc, duration_ms asc, created_at asc);
create index if not exists scores_client_recent_idx
  on public.scores (client_id, created_at desc);

create table if not exists public.blocked_nicknames (
  term text primary key
);
insert into public.blocked_nicknames (term) values
  ('fuck'), ('shit'), ('bitch'), ('cunt'), ('nigger'), ('nigga'), ('faggot')
on conflict do nothing;

alter table public.scores enable row level security;
alter table public.blocked_nicknames enable row level security;
revoke all on public.scores from anon, authenticated;
revoke all on public.blocked_nicknames from anon, authenticated;

-- Public reads exclude the pseudonymous client_id. No direct write policy exists.
grant select (id, created_at, nickname, mode, score, duration_ms)
  on public.scores to anon, authenticated;
create policy "Public leaderboard scores" on public.scores
  for select to anon, authenticated using (true);

create or replace function public.submit_score(
  p_nickname text, p_mode text, p_score numeric,
  p_duration_ms integer, p_client_id text
)
returns table (submitted_id uuid, player_rank bigint)
language plpgsql security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_now timestamptz := clock_timestamp();
  v_min_duration integer;
begin
  if p_nickname is null or p_nickname !~ '^[A-Za-z0-9_ -]{2,20}$'
     or btrim(p_nickname) = '' then
    raise exception 'Nickname must be 2–20 letters, numbers, spaces, _ or -';
  end if;
  if exists (
    select 1 from public.blocked_nicknames b
    where lower(p_nickname) like '%' || b.term || '%'
  ) then
    raise exception 'Choose a different nickname';
  end if;
  if p_mode not in ('operator', 'quick', 'bottleneck', 'prioritization',
    'resource', 'financial', 'sales', 'operations', 'people', 'strategy') then
    raise exception 'Invalid mode';
  end if;
  if p_score is null or p_score <> trunc(p_score) or p_score < 0
     or p_score > case when p_mode = 'quick' then 200 else 1000 end then
    raise exception 'Invalid score';
  end if;
  -- Quick Decisions always runs for 60 seconds. The other modes have 20/10
  -- questions; these are conservative floors, not proof of an honest run.
  v_min_duration := case p_mode when 'quick' then 59000
    when 'operator' then 10000 else 5000 end;
  if p_duration_ms is null or p_duration_ms < v_min_duration
     or p_duration_ms > 86400000 then
    raise exception 'Invalid run duration';
  end if;
  if p_client_id is null or p_client_id !~
    '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
    raise exception 'Invalid client id';
  end if;

  -- Serialize requests for this client so concurrent calls cannot bypass limits.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_client_id, 0));
  if exists (select 1 from public.scores s
    where s.client_id = p_client_id and s.created_at > v_now - interval '30 seconds') then
    raise exception 'Wait 30 seconds before posting again';
  end if;
  if (select count(*) from public.scores s
    where s.client_id = p_client_id and s.created_at > v_now - interval '1 hour') >= 10 then
    raise exception 'Hourly posting limit reached';
  end if;

  insert into public.scores (nickname, mode, score, duration_ms, client_id, created_at)
  values (btrim(p_nickname), p_mode, p_score, p_duration_ms, p_client_id, v_now)
  returning id into v_id;

  return query
  with best as (
    select distinct on (lower(s.nickname)) s.id, s.score, s.duration_ms, s.created_at
    from public.scores s where s.mode = p_mode
    order by lower(s.nickname), s.score desc, s.duration_ms asc, s.created_at asc, s.id asc
  ), ranked as (
    select b.id, row_number() over (
      order by b.score desc, b.duration_ms asc, b.created_at asc, b.id asc
    ) as rank from best b
  )
  select v_id, r.rank from ranked r where r.id = v_id;
  if not found then
    return query select v_id, null::bigint;
  end if;
end;
$$;

create or replace function public.leaderboard(
  p_mode text, p_limit integer default 50, p_client_id text default null
)
returns table (
  rank bigint, id uuid, nickname text, score numeric,
  duration_ms integer, created_at timestamptz, is_mine boolean
)
language plpgsql security definer stable
set search_path = ''
as $$
begin
  if p_mode not in ('operator', 'quick', 'bottleneck', 'prioritization',
    'resource', 'financial', 'sales', 'operations', 'people', 'strategy') then
    raise exception 'Invalid mode';
  end if;
  if p_limit is null or p_limit < 1 or p_limit > 50 then
    raise exception 'Limit must be 1–50';
  end if;
  return query
  with best as (
    select distinct on (lower(s.nickname)) s.*
    from public.scores s where s.mode = p_mode
    order by lower(s.nickname), s.score desc, s.duration_ms asc, s.created_at asc, s.id asc
  ), ranked as (
    select row_number() over (
      order by b.score desc, b.duration_ms asc, b.created_at asc, b.id asc
    ) as position, b.* from best b
  )
  select r.position, r.id, r.nickname, r.score, r.duration_ms, r.created_at,
    (p_client_id is not null and r.client_id = p_client_id)
  from ranked r where r.position <= p_limit order by r.position;
end;
$$;

revoke all on function public.submit_score(text, text, numeric, integer, text) from public;
revoke all on function public.leaderboard(text, integer, text) from public;
grant execute on function public.submit_score(text, text, numeric, integer, text) to anon, authenticated;
grant execute on function public.leaderboard(text, integer, text) to anon, authenticated;
