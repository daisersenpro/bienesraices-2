-- Datos de desarrollo: agrega tres imágenes adicionales a cada propiedad.
-- Es idempotente: puede ejecutarse más de una vez sin duplicar estas posiciones.
with development_images (sort_order, image_url, image_suffix) as (
  values
    (
      2,
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
      'vista interior adicional'
    ),
    (
      3,
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85',
      'vista exterior adicional'
    ),
    (
      4,
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      'detalle adicional'
    )
)
insert into public.property_images (
  property_id,
  image_url,
  alt_text,
  sort_order,
  is_primary
)
select
  properties.id,
  development_images.image_url,
  properties.name || ', ' || development_images.image_suffix,
  development_images.sort_order,
  false
from public.properties
cross join development_images
where not exists (
  select 1
  from public.property_images existing_image
  where existing_image.property_id = properties.id
    and existing_image.sort_order = development_images.sort_order
);
