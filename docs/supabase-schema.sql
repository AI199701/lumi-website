-- Run once in Supabase Dashboard > SQL Editor.
-- Public visitors can read and add wishes, but cannot change or delete them.
create table if not exists public.wishes (
  id text primary key,
  text varchar(520) not null check (char_length(text) between 1 and 520),
  created_at timestamptz not null default now()
);

alter table public.wishes enable row level security;
grant select, insert on public.wishes to anon;

drop policy if exists "public can read wishes" on public.wishes;
create policy "public can read wishes"
on public.wishes for select to anon
using (true);

drop policy if exists "public can add wishes" on public.wishes;
create policy "public can add wishes"
on public.wishes for insert to anon
with check (char_length(text) between 1 and 520);

-- Append-only interaction memory. It intentionally has no anonymous SELECT,
-- UPDATE, or DELETE policy, so browser visitors cannot inspect or erase it.
create table if not exists public.visitor_events (
  id bigint generated always as identity primary key,
  visitor_id text not null check (char_length(visitor_id) between 8 and 120),
  action text not null check (char_length(action) between 1 and 80),
  affection smallint not null default 0 check (affection between 0 and 100),
  habits jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists visitor_events_visitor_created_idx
on public.visitor_events (visitor_id, created_at desc);

alter table public.visitor_events enable row level security;
grant insert on public.visitor_events to anon;
grant usage, select on sequence public.visitor_events_id_seq to anon;

drop policy if exists "public can append visitor events" on public.visitor_events;
create policy "public can append visitor events"
on public.visitor_events for insert to anon
with check (
  affection between 0 and 100
  and char_length(visitor_id) between 8 and 120
  and char_length(action) between 1 and 80
);

-- Intentionally do not add anonymous UPDATE or DELETE policies.
