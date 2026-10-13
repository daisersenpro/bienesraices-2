alter table public.properties
  add column if not exists bedrooms integer,
  add column if not exists bathrooms numeric(3, 1);

update public.properties
set
  bedrooms = nullif(regexp_replace(beds, '[^0-9].*$', ''), '')::integer,
  bathrooms = nullif(regexp_replace(baths, '[^0-9.]', '', 'g'), '')::numeric;

alter table public.properties
  alter column bedrooms set not null,
  alter column bathrooms set not null;

alter table public.properties
  drop constraint if exists properties_bedrooms_check,
  drop constraint if exists properties_bathrooms_check;

alter table public.properties
  add constraint properties_bedrooms_check check (bedrooms >= 0),
  add constraint properties_bathrooms_check check (bathrooms >= 0);

create index if not exists properties_search_filters_idx
  on public.properties (listing_type, property_type, price, bedrooms, bathrooms);
