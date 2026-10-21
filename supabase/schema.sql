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
  bedrooms integer not null check (bedrooms >= 0),
  bathrooms numeric(3, 1) not null check (bathrooms >= 0),
  area text not null,
  description text not null default '',
  image_url text not null,
  label text,
  featured boolean not null default false,
  latitude numeric(9, 6),
  longitude numeric(9, 6),
  created_at timestamptz not null default now()
);

create table if not exists public.property_images (
  id bigint generated always as identity primary key,
  property_id bigint not null references public.properties(id) on delete cascade,
  image_url text not null,
  alt_text text not null,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_primary boolean not null default false,
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

create index if not exists property_images_property_order_idx
  on public.property_images (property_id, sort_order);

alter table public.property_images enable row level security;

drop policy if exists "Permitir lectura pública de imágenes de propiedades" on public.property_images;
create policy "Permitir lectura pública de imágenes de propiedades"
  on public.property_images for select
  to anon, authenticated
  using (true);
