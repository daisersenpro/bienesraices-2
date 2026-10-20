-- Permite a los administradores gestionar propiedades desde el dashboard.
create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'admin');
$$;

drop policy if exists "Admins can update properties" on public.properties;
create policy "Admins can update properties"
  on public.properties for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());
