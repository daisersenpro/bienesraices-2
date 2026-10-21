import { notFound } from "next/navigation";
import { connection } from "next/server";
import { AdminHeader } from "../../../components/admin-header";
import { requireAdmin } from "../../../components/admin-auth";
import { PropertyForm } from "../../../components/property-form";

export const instant = false;

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { supabase, user } = await requireAdmin();
  const { id } = await params;
  const { data, error } = await supabase.from("properties").select("id, slug, name, location, price, property_type, listing_type, beds, baths, bedrooms, bathrooms, area, description, image_url, featured, is_active, price_suffix, latitude, longitude, property_images(image_url, sort_order)").eq("id", id).maybeSingle();
  if (error) throw new Error(`No se pudo cargar la propiedad: ${error.message}`);
  if (!data) notFound();
  const row = data as typeof data & { property_images?: Array<{ image_url: string; sort_order: number }> };
  const galleryUrls = (row.property_images ?? []).sort((a, b) => a.sort_order - b.sort_order).map((image) => image.image_url);
  return (
    <main className="min-h-screen bg-[#e7f2fb] text-nordic">
      <AdminHeader active="properties" user={user} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-nordic/10 pb-8">
          <p className="mb-3 text-sm font-medium text-nordic/50"><span>Propiedades</span> <span className="mx-2">›</span> Editar propiedad</p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Editar propiedad</h1>
          <p className="mt-2 text-sm text-nordic/55">Actualiza la información, ubicación y galería.</p>
        </header>
        <PropertyForm mode="edit" initial={{ id: row.id, slug: row.slug, name: row.name, location: row.location, price: row.price, propertyType: row.property_type, listingType: row.listing_type, beds: row.beds, baths: row.baths, bedrooms: row.bedrooms, bathrooms: row.bathrooms, area: row.area, description: row.description, imageUrl: row.image_url, galleryUrls, featured: row.featured, isActive: row.is_active, priceSuffix: row.price_suffix, latitude: row.latitude, longitude: row.longitude }} />
      </div>
    </main>
  );
}
