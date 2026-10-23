-- Think Operator leaderboard abuse limits.
--
-- Run this whole file once in the Supabase SQL editor, after
-- supabase/migrations/0001_leaderboard.sql. It is not applied by the site,
-- by GitHub Pages, or by this repository's deploy. Do not put a service-role
-- key in the app, in .env, or in the Pages build. The anon key stays in
-- NEXT_PUBLIC_SUPABASE_ANON_KEY only.
--
-- Order: run this SQL before publishing a new static export. The function
-- signature and the returned columns do not change, so the site that is
-- already live keeps working. That site already turns these exceptions into
-- a normal "couldn't post" message. Publishing first would leave the old,
-- browser-id-only limit in place until this file is run.
--
-- Direct reads of public.scores are removed. submit_score and leaderboard
-- are SECURITY DEFINER with a fixed search_path, so they can still insert
-- and read after the revoke. leaderboard does not return client_id.

-- ---------------------------------------------------------------------------
-- Bounds. Taken from the quiz code, not from a guess.
--
-- Scores are self-reported. These checks reject values the quiz cannot
-- produce and runs that finish faster than the questions allow. They do not
-- prove the player earned the score.
--
-- operator   20 questions (src/app/operator/page.tsx, OPERATOR_TEST_LENGTH).
--            Posted score is the Operator Score, integers 0–1000
--            (src/lib/scoring.ts, MAX_OPERATOR_SCORE = 500 + 350 + 150).
--            Floor: 2.25s per question = 45_000ms. That is under a careful
--            read (PAR_SECONDS in src/lib/adaptive.ts starts at 10s) and
--            above an instant script. The same floor is minDurationForMode
--            in src/lib/leaderboardRules.ts.
-- skill      10 questions (src/app/skills/[category]/SkillTest.tsx,
--            SKILL_TEST_LENGTH). Every skill bank has 12 questions, so a
--            run is always 10. Same 0–1000 Operator Score. The 0–100 figures
--            on a result screen are the per-skill breakdown, not this score.
--            Floor: 2s per question = 20_000ms.
-- quick      One 60_000ms round (src/lib/useQuickGame.ts, ROUND_MS).
--            Posted score is decisions per minute: the correct-answer count,
--            or less when accuracy is under 75% (computeQuickResult).
--            Each new card ignores input for 220ms (INPUT_LOCKOUT_MS), so a
--            perfect minute holds at most floor(60000/220) = 272 answers.
--            The table check still allows 300, which leaves slack over 272
--            and matches maxScoreForMode. This function also rejects a DPM
--            higher than the number of 220ms lockouts that fit in the
--            reported duration, so a short clock cannot carry a perfect score.
--            Duration floor is 50_000ms: 10s under the 60s clock for timer
--            slack. A hidden tab can make the reported duration longer than
--            the round, so the only upper bound is the shared 6 hour cap.
-- all        Score is an integer >= 0 and <= the mode max. Duration is
--            > 0 and <= 21_600_000ms (6 hours), matching scores_duration_check.
--
-- Operator Score speed credit rewards faster answers, so a high score does
-- not require a longer run. The time check is a per-question floor, not a
-- curve that rises with the score.
--
-- Rate limits. The 10/hour and 30s gaps keyed on p_client_id stay. That id
-- is chosen by the browser, so it is not enough on its own.
--   * 20 posts per hour for one nickname, compared case-insensitively.
--     The board already keeps a single row per lower(nickname). Twenty
--     leaves room for two people who pick the same short name and still
--     stops one name being rewritten from many browser ids.
--   * 60 inserts per minute across every submitter. A crowd finishing
--     together still fits. A script that rotates browser ids does not.
-- ---------------------------------------------------------------------------

create index if not exists scores_created_at_idx
  on public.scores (created_at desc);

create index if not exists scores_nickname_created_idx
  on public.scores (lower(nickname), created_at desc);

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
  v_max_score numeric;
  v_min_duration integer;
  v_questions integer;
  v_min_per_question integer;
begin
  if p_client_id is null
     or p_client_id !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
    raise exception 'invalid_client';
  end if;

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

  -- 300 is the quick-mode slack over the 272-answer lockout cap.
  -- 1000 is MAX_OPERATOR_SCORE for the Operator Test and every skill test.
  v_max_score := case when p_mode = 'quick' then 300 else 1000 end;
  if p_score is null or p_score < 0 or p_score > v_max_score or p_score <> trunc(p_score) then
    raise exception 'invalid_score';
  end if;

  v_questions := case when p_mode = 'operator' then 20 when p_mode = 'quick' then 0 else 10 end;
  v_min_per_question := case
    when p_mode = 'operator' then 2250
    when p_mode = 'quick' then 0
    else 2000
  end;
  v_min_duration := case
    when p_mode = 'quick' then 50000
    else v_questions * v_min_per_question
  end;

  if p_duration_ms is null or p_duration_ms < v_min_duration or p_duration_ms > 21600000 then
    raise exception 'implausible_duration';
  end if;

  -- Quick DPM cannot exceed the 220ms input lockouts that fit in this run.
  if p_mode = 'quick' and p_score > (p_duration_ms / 220) then
    raise exception 'invalid_score';
  end if;

  -- One lock order for every caller: global, then nickname, then browser id.
  -- Held until this transaction ends, so the counts below cannot race an insert.
  perform pg_advisory_xact_lock(hashtext('submit_score'), hashtext('global'));
  perform pg_advisory_xact_lock(hashtext('submit_score'), hashtext('nick:' || lower(v_nick)));
  perform pg_advisory_xact_lock(hashtext('submit_score'), hashtext('client:' || p_client_id));

  if (
    select count(*)
    from public.scores
    where created_at > now() - interval '1 minute'
  ) >= 60 then
    raise exception 'rate_limited_global';
  end if;

  if (
    select count(*)
    from public.scores
    where lower(nickname) = lower(v_nick)
      and created_at > now() - interval '1 hour'
  ) >= 20 then
    raise exception 'rate_limited_nickname';
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

-- The public select policy would expose every column, including client_id,
-- if select were ever granted again. Reads go through leaderboard() only.
drop policy if exists scores_select_public on public.scores;

revoke select on public.scores from anon, authenticated;

comment on table public.scores is
  'Posted runs. anon and authenticated cannot select rows. Inserts happen only through submit_score(). The public board is leaderboard(), which does not return client_id.';
