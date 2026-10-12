create table if not exists public.properties (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  location text not null,
  price numeric not null check (price >= 0),
  price_suffix text,
  property_type text not null check (property_type in ('House', 'Apartment', 'Villa', 'Penthouse')),
  listing_type text not null check (listing_type in ('En venta', 'En alquiler')),
  beds text not null,
  baths text not null,
  area text not null,
  image_url text not null,
  label text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.properties enable row level security;

drop policy if exists "Permitir lectura pública de propiedades" on public.properties;
create policy "Permitir lectura pública de propiedades"
  on public.properties for select
  to anon, authenticated
  using (true);

create index if not exists properties_featured_created_idx
  on public.properties (featured desc, created_at desc);

create index if not exists properties_type_idx
  on public.properties (property_type);
