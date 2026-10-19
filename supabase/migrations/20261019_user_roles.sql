-- Roles de aplicación sincronizados con los usuarios de Supabase Auth.
-- Después de ejecutar esta migración, promueve manualmente al primer administrador:
-- update public.user_roles set role = 'admin' where email = 'tu-correo@example.com';

create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  role text not null default 'user' check (role in ('user', 'editor', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.sync_user_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_roles (user_id, email, display_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  )
  on conflict (user_id) do update
    set email = excluded.email,
        display_name = coalesce(excluded.display_name, public.user_roles.display_name),
        updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_sync_role on auth.users;
create trigger on_auth_user_created_sync_role
  after insert or update of email, raw_user_meta_data on auth.users
  for each row execute function public.sync_user_role();

insert into public.user_roles (user_id, email, display_name)
select
  users.id,
  coalesce(users.email, ''),
  coalesce(users.raw_user_meta_data ->> 'full_name', users.raw_user_meta_data ->> 'name')
from auth.users as users
on conflict (user_id) do update
  set email = excluded.email,
      display_name = coalesce(excluded.display_name, public.user_roles.display_name),
      updated_at = now();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.user_roles enable row level security;

drop policy if exists "Users can read their own role" on public.user_roles;
create policy "Users can read their own role"
  on public.user_roles for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "Admins can read all roles" on public.user_roles;
create policy "Admins can read all roles"
  on public.user_roles for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Admins can update roles" on public.user_roles;
create policy "Admins can update roles"
  on public.user_roles for update
  to authenticated
  using (public.is_admin())
  with check (role in ('user', 'editor', 'admin'));

create index if not exists user_roles_role_idx on public.user_roles (role);
