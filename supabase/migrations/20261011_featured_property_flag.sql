alter table public.properties
  add column if not exists featured boolean not null default false;

create index if not exists properties_featured_created_idx
  on public.properties (featured desc, created_at desc);

-- Asignación inicial de la colección destacada.
update public.properties
set featured = slug in ('glass-pavilion', 'azure-heights');
