-- Datos de desarrollo: agrega 20 propiedades chilenas para probar búsqueda y filtros.
-- Es idempotente: los slugs evitan duplicar registros si se ejecuta nuevamente.
with development_properties (slug, name, location, price, price_suffix, property_type, listing_type, beds, baths, bedrooms, bathrooms, area, image_url, label) as (
  values
    ('casa-lo-barnechea-norte', 'Casa Lo Barnechea Norte', 'Lo Barnechea, Santiago', 925000000, null, 'House', 'En venta', '4 habitaciones', '3 baños', 4, 3, '260 m²', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85', 'Nueva publicación'),
    ('departamento-nueva-las-condes', 'Departamento Nueva Las Condes', 'Las Condes, Santiago', 385000000, null, 'Apartment', 'En venta', '3 habitaciones', '2 baños', 3, 2, '118 m²', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85', 'Oportunidad'),
    ('villa-camino-el-volcan', 'Villa Camino El Volcán', 'San José de Maipo, Santiago', 680000000, null, 'Villa', 'En venta', '5 habitaciones', '4 baños', 5, 4, '320 m²', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85', 'Exclusiva'),
    ('loft-barrio-yungay', 'Loft Barrio Yungay', 'Barrio Yungay, Santiago', 980000, ' al mes', 'Apartment', 'En alquiler', '1 habitación', '1 baño', 1, 1, '58 m²', 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=85', 'Disponible'),
    ('casa-jardin-la-reina', 'Casa Jardín La Reina', 'La Reina, Santiago', 745000000, null, 'House', 'En venta', '4 habitaciones', '3 baños', 4, 3, '210 m²', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85', 'Jardín privado'),
    ('departamento-plaza-nunoa', 'Departamento Plaza Ñuñoa', 'Ñuñoa, Santiago', 265000000, null, 'Apartment', 'En venta', '2 habitaciones', '2 baños', 2, 2, '78 m²', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85', 'Cercano al metro'),
    ('penthouse-el-golf', 'Penthouse El Golf', 'El Golf, Las Condes', 1250000, ' al mes', 'Penthouse', 'En alquiler', '3 habitaciones', '3 baños', 3, 3, '195 m²', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85', 'Vista panorámica'),
    ('casa-playa-maitencillo', 'Casa Playa Maitencillo', 'Maitencillo, Valparaíso', 590000000, null, 'House', 'En venta', '3 habitaciones', '2 baños', 3, 2, '145 m²', 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85', 'Vida costera'),
    ('villa-jardin-del-mar', 'Villa Jardín del Mar', 'Viña del Mar, Valparaíso', 820000000, null, 'Villa', 'En venta', '4 habitaciones', '4 baños', 4, 4, '285 m²', 'https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1200&q=85', 'Vista al océano'),
    ('departamento-mirador-concepcion', 'Departamento Mirador Concepción', 'Concepción, Biobío', 210000000, null, 'Apartment', 'En venta', '2 habitaciones', '1 baño', 2, 1, '68 m²', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85', 'Entrega inmediata'),
    ('casa-condominio-talca', 'Casa Condominio Talca', 'Talca, Maule', 185000000, null, 'House', 'En venta', '3 habitaciones', '2 baños', 3, 2, '120 m²', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85', 'Condominio seguro'),
    ('departamento-centro-temuco', 'Departamento Centro Temuco', 'Temuco, La Araucanía', 168000000, null, 'Apartment', 'En venta', '2 habitaciones', '2 baños', 2, 2, '72 m²', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85', 'Excelente conectividad'),
    ('casa-bosque-pucon', 'Casa Bosque Pucón', 'Pucón, La Araucanía', 460000000, null, 'House', 'En venta', '4 habitaciones', '3 baños', 4, 3, '180 m²', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85', 'Entorno natural'),
    ('villa-lago-villarrica', 'Villa Lago Villarrica', 'Villarrica, La Araucanía', 530000000, null, 'Villa', 'En venta', '4 habitaciones', '3 baños', 4, 3, '205 m²', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85', 'A pasos del lago'),
    ('departamento-costanera-puerto-montt', 'Departamento Costanera Puerto Montt', 'Puerto Montt, Los Lagos', 245000000, null, 'Apartment', 'En venta', '3 habitaciones', '2 baños', 3, 2, '96 m²', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85', 'Vista despejada'),
    ('casa-parque-aranjuez-rancagua', 'Casa Parque Aranjuez', 'Rancagua, OHiggins', 230000000, null, 'House', 'En venta', '3 habitaciones', '2 baños', 3, 2, '135 m²', 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85', 'Ideal para familias'),
    ('penthouse-miraflores-vina', 'Penthouse Miraflores', 'Miraflores, Viña del Mar', 1650000, ' al mes', 'Penthouse', 'En alquiler', '4 habitaciones', '3 baños', 4, 3, '220 m²', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85', 'Terraza amplia'),
    ('departamento-barrio-lastarria', 'Departamento Barrio Lastarria', 'Lastarria, Santiago', 1150000, ' al mes', 'Apartment', 'En alquiler', '2 habitaciones', '2 baños', 2, 2, '88 m²', 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=85', 'Amoblado'),
    ('casa-condominio-chicureo', 'Casa Condominio Chicureo', 'Chicureo, Colina', 615000000, null, 'House', 'En venta', '5 habitaciones', '4 baños', 5, 4, '310 m²', 'https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1200&q=85', 'Piscina y quincho'),
    ('villa-valle-del-elqui', 'Villa Valle del Elqui', 'Vicuña, Coquimbo', 395000000, null, 'Villa', 'En venta', '3 habitaciones', '2 baños', 3, 2, '175 m²', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85', 'Refugio de descanso')
)
insert into public.properties (
  slug, name, location, price, price_suffix, property_type, listing_type,
  beds, baths, bedrooms, bathrooms, area, image_url, label, featured
)
select
  development_properties.slug,
  development_properties.name,
  development_properties.location,
  development_properties.price,
  development_properties.price_suffix,
  development_properties.property_type,
  development_properties.listing_type,
  development_properties.beds,
  development_properties.baths,
  development_properties.bedrooms,
  development_properties.bathrooms,
  development_properties.area,
  development_properties.image_url,
  development_properties.label,
  false
from development_properties
where not exists (
  select 1
  from public.properties existing_property
  where existing_property.slug = development_properties.slug
);

with development_images (sort_order, image_url, image_suffix) as (
  values
    (0, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85', 'vista principal'),
    (1, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85', 'vista interior'),
    (2, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85', 'espacio adicional'),
    (3, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85', 'vista exterior'),
    (4, 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85', 'detalle adicional')
)
insert into public.property_images (property_id, image_url, alt_text, sort_order, is_primary)
select
  properties.id,
  development_images.image_url,
  properties.name || ', ' || development_images.image_suffix,
  development_images.sort_order,
  development_images.sort_order = 0
from public.properties
cross join development_images
where not exists (
  select 1
  from public.property_images existing_image
  where existing_image.property_id = properties.id
    and existing_image.sort_order = development_images.sort_order
);
