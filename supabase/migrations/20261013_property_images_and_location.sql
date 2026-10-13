alter table public.properties
  add column if not exists latitude numeric(9, 6);

alter table public.properties
  add column if not exists longitude numeric(9, 6);

create table if not exists public.property_images (
  id bigint generated always as identity primary key,
  property_id bigint not null references public.properties(id) on delete cascade,
  image_url text not null,
  alt_text text not null,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.property_images enable row level security;

drop policy if exists "Permitir lectura pública de imágenes de propiedades" on public.property_images;
create policy "Permitir lectura pública de imágenes de propiedades"
  on public.property_images for select
  to anon, authenticated
  using (true);

create index if not exists property_images_property_order_idx
  on public.property_images (property_id, sort_order);
