alter table public.properties
  add column if not exists description text not null default '';

alter table public.properties
  add column if not exists is_active boolean not null default true;

drop policy if exists "Permitir lectura pública de propiedades" on public.properties;
create policy "Permitir lectura pública de propiedades"
  on public.properties for select
  to anon, authenticated
  using (is_active or public.is_admin());

drop policy if exists "Admins can insert properties" on public.properties;
create policy "Admins can insert properties"
  on public.properties for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Admins can delete properties" on public.properties;

drop policy if exists "Admins can update property images" on public.property_images;
create policy "Admins can update property images"
  on public.property_images for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Admins can upload property images" on storage.objects;
create policy "Admins can upload property images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'property-images' and public.is_admin());

drop policy if exists "Admins can update property image files" on storage.objects;
create policy "Admins can update property image files"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'property-images' and public.is_admin())
  with check (bucket_id = 'property-images' and public.is_admin());

drop policy if exists "Admins can delete property image files" on storage.objects;
create policy "Admins can delete property image files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'property-images' and public.is_admin());
