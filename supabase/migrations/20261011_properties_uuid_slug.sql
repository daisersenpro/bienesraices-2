create extension if not exists pgcrypto;

alter table public.properties
  add column if not exists slug text;

update public.properties
set slug = id
where slug is null;

alter table public.properties
  alter column slug set not null;

alter table public.properties
  add constraint properties_slug_key unique (slug);

alter table public.properties
  add column if not exists id_uuid uuid default gen_random_uuid();

update public.properties
set id_uuid = gen_random_uuid()
where id_uuid is null;

alter table public.properties
  alter column id_uuid set not null;

alter table public.properties
  drop constraint if exists properties_pkey;

alter table public.properties
  drop column id;

alter table public.properties
  rename column id_uuid to id;

alter table public.properties
  add primary key (id);

alter table public.properties
  alter column id set default gen_random_uuid();
