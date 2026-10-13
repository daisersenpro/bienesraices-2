import { getSupabaseServerClient } from "../../lib/supabase/server";
import type { Property, PropertyImage } from "./properties";

const PAGE_SIZE = 8;

type PropertyRow = {
  id: number;
  slug: string;
  name: string;
  location: string;
  price: number;
  price_suffix: string | null;
  property_type: Property["type"];
  listing_type: Property["listing"];
  beds: string;
  baths: string;
  area: string;
  image_url: string;
  label: string | null;
  featured: boolean;
  latitude: number | null;
  longitude: number | null;
}

type PropertyImageRow = {
  id: number;
  image_url: string;
  alt_text: string;
  sort_order: number;
  is_primary: boolean;
};

function mapProperty(row: PropertyRow): Property {
  return {
    id: String(row.id),
    slug: row.slug,
    name: row.name,
    location: row.location,
    price: row.price,
    priceSuffix: row.price_suffix ?? undefined,
    type: row.property_type,
    listing: row.listing_type,
    beds: row.beds,
    baths: row.baths,
    area: row.area,
    image: row.image_url,
    label: row.label ?? undefined,
    latitude: row.latitude ?? undefined,
    longitude: row.longitude ?? undefined,
  };
}

export async function getFeaturedProperties() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("properties")
    .select("id, slug, name, location, price, price_suffix, property_type, listing_type, beds, baths, area, image_url, label, featured, latitude, longitude")
    .eq("featured", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`No se pudieron cargar las destacadas: ${error.message}`);
  return (data as PropertyRow[]).map(mapProperty);
}

export async function getProperties({
  page,
  type,
  query,
}: {
  page: number;
  type?: Property["type"];
  query?: string;
}) {
  const supabase = getSupabaseServerClient();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  let request = supabase
    .from("properties")
    .select("id, slug, name, location, price, price_suffix, property_type, listing_type, beds, baths, area, image_url, label, featured, latitude, longitude", { count: "exact" })
    .eq("featured", false)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (type) request = request.eq("property_type", type);
  if (query) request = request.or(`name.ilike.%${query}%,location.ilike.%${query}%`);

  const { data, count, error } = await request;
  if (error) throw new Error(`No se pudieron cargar las propiedades: ${error.message}`);

  return {
    properties: (data as PropertyRow[]).map(mapProperty),
    total: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
  };
}

export async function getPropertyBySlug(slug: string) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("properties")
    .select("id, slug, name, location, price, price_suffix, property_type, listing_type, beds, baths, area, image_url, label, featured, latitude, longitude, property_images(id, image_url, alt_text, sort_order, is_primary)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`No se pudo cargar la propiedad: ${error.message}`);
  if (!data) return null;

  const row = data as PropertyRow & { property_images: PropertyImageRow[] };
  const images: PropertyImage[] = (row.property_images ?? [])
    .sort((first, second) => first.sort_order - second.sort_order)
    .map((image) => ({
      id: image.id,
      url: image.image_url,
      alt: image.alt_text,
      sortOrder: image.sort_order,
      isPrimary: image.is_primary,
    }));

  return {
    ...mapProperty(row),
    images,
  };
}
