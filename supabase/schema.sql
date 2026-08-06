-- ════════════════════════════════════════════════════════════
--  DROPLY — schema.sql
--  Esquema de Supabase: perfiles, playlists, likes, historial
--  y la base social (followers / activities / notifications).
--
--  Ejecutar completo en el SQL Editor de tu proyecto Supabase.
--  Es seguro volver a ejecutarlo (usa IF NOT EXISTS / OR REPLACE).
-- ════════════════════════════════════════════════════════════

create extension if not exists pgcrypto;

-- ────────────────────────────────────────────────────────────
-- 1. PROFILES — un perfil por usuario de auth.users
-- ────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  username     text unique,
  display_name text,
  avatar_url   text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_all"  on public.profiles;
drop policy if exists "profiles_update_own"  on public.profiles;
drop policy if exists "profiles_insert_own"  on public.profiles;

-- Los perfiles (nombre/avatar) son legibles por cualquiera autenticado,
-- para poder soportar en el futuro la búsqueda de usuarios / seguidores.
create policy "profiles_select_all" on public.profiles
  for select using (auth.role() = 'authenticated');

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Crea automáticamente el perfil cuando se registra un usuario nuevo.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
      || '_' || substr(new.id::text, 1, 4),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Mantiene profiles.updated_at al día.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();


-- ────────────────────────────────────────────────────────────
-- 2. PLAYLISTS
--    El "id" es el mismo identificador (texto) que ya genera
--    el cliente (Date.now().toString()) — así no hace falta
--    traducir IDs entre localStorage y la nube.
-- ────────────────────────────────────────────────────────────
create table if not exists public.playlists (
  user_id    uuid not null references auth.users(id) on delete cascade,
  id         text not null,
  name       text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

alter table public.playlists enable row level security;

drop policy if exists "playlists_owner_all" on public.playlists;
create policy "playlists_owner_all" on public.playlists
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop trigger if exists playlists_set_updated_at on public.playlists;
create trigger playlists_set_updated_at
  before update on public.playlists
  for each row execute procedure public.set_updated_at();


-- ────────────────────────────────────────────────────────────
-- 3. PLAYLIST_SONGS — canciones dentro de cada playlist
-- ────────────────────────────────────────────────────────────
create table if not exists public.playlist_songs (
  user_id     uuid not null references auth.users(id) on delete cascade,
  playlist_id text not null,
  track_file  text not null,
  position    integer not null default 0,
  added_at    timestamptz not null default now(),
  primary key (user_id, playlist_id, track_file),
  foreign key (user_id, playlist_id) references public.playlists(user_id, id) on delete cascade
);

create index if not exists idx_playlist_songs_lookup
  on public.playlist_songs (user_id, playlist_id, position);

alter table public.playlist_songs enable row level security;

drop policy if exists "playlist_songs_owner_all" on public.playlist_songs;
create policy "playlist_songs_owner_all" on public.playlist_songs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);


-- ────────────────────────────────────────────────────────────
-- 4. LIKED_SONGS
-- ────────────────────────────────────────────────────────────
create table if not exists public.liked_songs (
  user_id    uuid not null references auth.users(id) on delete cascade,
  track_file text not null,
  liked_at   timestamptz not null default now(),
  primary key (user_id, track_file)
);

alter table public.liked_songs enable row level security;

drop policy if exists "liked_songs_owner_all" on public.liked_songs;
create policy "liked_songs_owner_all" on public.liked_songs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);


-- ────────────────────────────────────────────────────────────
-- 5. HISTORY
--    played_at_ms guarda el mismo epoch (ms) que usa el cliente,
--    para no perder precisión al ir y volver. play_count guarda
--    el contador local de reproducciones de esa pista.
-- ────────────────────────────────────────────────────────────
create table if not exists public.history (
  user_id       uuid not null references auth.users(id) on delete cascade,
  track_file    text not null,
  played_at_ms  bigint not null,
  play_count    integer not null default 1,
  primary key (user_id, track_file)
);

create index if not exists idx_history_recent
  on public.history (user_id, played_at_ms desc);

alter table public.history enable row level security;

drop policy if exists "history_owner_all" on public.history;
create policy "history_owner_all" on public.history
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);


-- ────────────────────────────────────────────────────────────
-- 6. FOLLOWERS — base para funciones sociales futuras
-- ────────────────────────────────────────────────────────────
create table if not exists public.followers (
  follower_id  uuid not null references auth.users(id) on delete cascade,
  following_id uuid not null references auth.users(id) on delete cascade,
  created_at   timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);

create index if not exists idx_followers_following on public.followers (following_id);

alter table public.followers enable row level security;

drop policy if exists "followers_select_all"  on public.followers;
drop policy if exists "followers_insert_own"  on public.followers;
drop policy if exists "followers_delete_own"  on public.followers;

create policy "followers_select_all" on public.followers
  for select using (auth.role() = 'authenticated');

create policy "followers_insert_own" on public.followers
  for insert with check (auth.uid() = follower_id);

create policy "followers_delete_own" on public.followers
  for delete using (auth.uid() = follower_id);


-- ────────────────────────────────────────────────────────────
-- 7. ACTIVITIES — feed de actividad (propio), base para el futuro
-- ────────────────────────────────────────────────────────────
create table if not exists public.activities (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  type           text not null,
  track_file     text,
  playlist_id    text,
  target_user_id uuid references auth.users(id) on delete set null,
  metadata       jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now()
);

create index if not exists idx_activities_user_recent
  on public.activities (user_id, created_at desc);

alter table public.activities enable row level security;

drop policy if exists "activities_owner_select" on public.activities;
drop policy if exists "activities_owner_insert" on public.activities;
drop policy if exists "activities_owner_delete" on public.activities;

-- Por ahora cada usuario solo ve su propia actividad. Cuando se
-- construya el feed social (ver quién sigue a quién) se puede
-- ampliar esta policy para incluir activities de following_id.
create policy "activities_owner_select" on public.activities
  for select using (auth.uid() = user_id);

create policy "activities_owner_insert" on public.activities
  for insert with check (auth.uid() = user_id);

create policy "activities_owner_delete" on public.activities
  for delete using (auth.uid() = user_id);


-- ────────────────────────────────────────────────────────────
-- 8. NOTIFICATIONS
-- ────────────────────────────────────────────────────────────
create table if not exists public.notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade, -- destinatario
  actor_id   uuid references auth.users(id) on delete set null,        -- quién la origina
  type       text not null,
  message    text,
  metadata   jsonb not null default '{}'::jsonb,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_notifications_user_recent
  on public.notifications (user_id, read, created_at desc);

alter table public.notifications enable row level security;

drop policy if exists "notifications_recipient_select" on public.notifications;
drop policy if exists "notifications_recipient_update" on public.notifications;
drop policy if exists "notifications_recipient_delete" on public.notifications;
drop policy if exists "notifications_actor_insert"      on public.notifications;

create policy "notifications_recipient_select" on public.notifications
  for select using (auth.uid() = user_id);

-- Marcar como leída / borrar: solo el destinatario.
create policy "notifications_recipient_update" on public.notifications
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "notifications_recipient_delete" on public.notifications
  for delete using (auth.uid() = user_id);

-- Crear notificación: solo en nombre propio como "actor" (p.ej. al seguir a alguien).
create policy "notifications_actor_insert" on public.notifications
  for insert with check (auth.uid() = actor_id);

-- ════════════════════════════════════════════════════════════
-- Fin del esquema.
-- ════════════════════════════════════════════════════════════