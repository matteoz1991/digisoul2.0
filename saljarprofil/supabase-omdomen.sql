-- Endast om ni väljer Supabase (typ "supabase" i config.json).
-- Besökare får bara SKAPA omdömen. De kan inte läsa, ändra eller radera. Godkännande sker i Supabase-panelen.
create table if not exists public.omdomen (
  id bigint generated always as identity primary key,
  skapad timestamptz not null default now(),
  saljare text not null,
  profil text not null,
  betyg smallint not null check (betyg between 1 and 5),
  namn text not null check (char_length(namn) between 1 and 80),
  foretag text check (char_length(foretag) <= 120),
  text text not null check (char_length(text) between 1 and 1200),
  samtycke boolean not null check (samtycke),
  godkand boolean not null default false
);
alter table public.omdomen enable row level security;
create policy "anon kan skicka omdome" on public.omdomen
  for insert to anon with check (godkand = false);
