"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAuthServerClient } from "../../lib/supabase/auth-server";

const allowedRoles = new Set(["user", "editor", "admin"]);

async function requireAdminClient() {
  const supabase = await getSupabaseAuthServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Debes iniciar sesión.");
  const { data: currentRole } = await supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle();
  if (currentRole?.role !== "admin") throw new Error("No tienes permisos de administrador.");
  return supabase;
}

export async function updateUserRole(formData: FormData) {
  const userId = String(formData.get("userId") ?? "");
  const role = String(formData.get("role") ?? "");
  if (!userId || !allowedRoles.has(role)) throw new Error("Datos de rol no válidos.");
  const supabase = await requireAdminClient();
  const { error } = await supabase.from("user_roles").update({ role, updated_at: new Date().toISOString() }).eq("user_id", userId);
  if (error) throw new Error(`No se pudo actualizar el rol: ${error.message}`);
  revalidatePath("/admin");
  revalidatePath("/admin/users");
}

export async function updateUser(formData: FormData) {
  const userId = String(formData.get("userId") ?? "");
  const displayName = String(formData.get("displayName") ?? "").trim();
  const role = String(formData.get("role") ?? "");
  if (!userId || !displayName || !allowedRoles.has(role)) throw new Error("Datos de usuario no válidos.");
  const supabase = await requireAdminClient();
  const { error } = await supabase.from("user_roles").update({ display_name: displayName, role, updated_at: new Date().toISOString() }).eq("user_id", userId);
  if (error) throw new Error(`No se pudo actualizar el usuario: ${error.message}`);
  revalidatePath("/admin/users");
}

export async function updateProperty(formData: FormData) {
  const propertyId = Number(formData.get("propertyId"));
  const name = String(formData.get("name") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const price = Number(formData.get("price"));
  const listingType = String(formData.get("listingType") ?? "");
  const featured = formData.get("featured") === "true";
  const propertyType = String(formData.get("propertyType") ?? "");
  const description = String(formData.get("description") ?? "");
  const area = String(formData.get("area") ?? "").trim();
  const beds = String(formData.get("beds") ?? "").trim();
  const baths = String(formData.get("baths") ?? "").trim();
  const bedrooms = Number(formData.get("bedrooms"));
  const bathrooms = Number(formData.get("bathrooms"));
  const latitude = Number(formData.get("latitude"));
  const longitude = Number(formData.get("longitude"));
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const galleryUrls = JSON.parse(String(formData.get("galleryUrls") ?? "[]")) as string[];
  if (!Number.isInteger(propertyId) || !name || !location || !Number.isFinite(price) || price < 0 || !["En venta", "En alquiler"].includes(listingType) || !["House", "Apartment", "Villa", "Penthouse"].includes(propertyType) || !area || !beds || !baths || !Number.isInteger(bedrooms) || bedrooms < 0 || !Number.isFinite(bathrooms) || bathrooms < 0 || !Number.isFinite(latitude) || !Number.isFinite(longitude) || !imageUrl) {
    throw new Error("Datos de propiedad no válidos.");
  }
  const supabase = await requireAdminClient();
  const { error } = await supabase.from("properties").update({ name, location, price, listing_type: listingType, property_type: propertyType, description, area, beds, baths, bedrooms, bathrooms, latitude, longitude, image_url: imageUrl, featured }).eq("id", propertyId);
  if (error) throw new Error(`No se pudo actualizar la propiedad: ${error.message}`);
  await supabase.from("property_images").delete().eq("property_id", propertyId);
  if (galleryUrls.length) {
    const { error: galleryError } = await supabase.from("property_images").insert(galleryUrls.map((url, index) => ({ property_id: propertyId, image_url: url, alt_text: name, sort_order: index, is_primary: index === 0 })));
    if (galleryError) throw new Error(`No se pudo actualizar la galería: ${galleryError.message}`);
  }
  revalidatePath("/admin/properties");
}

export async function createProperty(formData: FormData) {
  const supabase = await requireAdminClient();
  const name = String(formData.get("name") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const price = Number(formData.get("price"));
  const propertyType = String(formData.get("propertyType") ?? "");
  const listingType = String(formData.get("listingType") ?? "");
  const area = String(formData.get("area") ?? "").trim();
  const beds = String(formData.get("beds") ?? "").trim();
  const baths = String(formData.get("baths") ?? "").trim();
  const bedrooms = Number(formData.get("bedrooms"));
  const bathrooms = Number(formData.get("bathrooms"));
  const latitude = Number(formData.get("latitude"));
  const longitude = Number(formData.get("longitude"));
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const galleryUrls = JSON.parse(String(formData.get("galleryUrls") ?? "[]")) as string[];
  if (!name || !location || !slug || !Number.isFinite(price) || price < 0 || !["En venta", "En alquiler"].includes(listingType) || !["House", "Apartment", "Villa", "Penthouse"].includes(propertyType) || !area || !beds || !baths || !Number.isInteger(bedrooms) || bedrooms < 0 || !Number.isFinite(bathrooms) || bathrooms < 0 || !Number.isFinite(latitude) || !Number.isFinite(longitude) || !imageUrl) {
    throw new Error("Completa todos los campos obligatorios de la propiedad.");
  }
  const { data: property, error } = await supabase.from("properties").insert({
    name, slug, location, price, property_type: propertyType, listing_type: listingType, area, beds, baths, bedrooms, bathrooms, latitude, longitude, image_url: imageUrl, description: String(formData.get("description") ?? ""), featured: formData.get("featured") === "true", price_suffix: String(formData.get("priceSuffix") ?? ""),
  }).select("id").single();
  if (error) throw new Error(`No se pudo crear la propiedad: ${error.message}`);
  if (galleryUrls.length) {
    const { error: galleryError } = await supabase.from("property_images").insert(galleryUrls.map((url, index) => ({ property_id: property.id, image_url: url, alt_text: name, sort_order: index, is_primary: index === 0 })));
    if (galleryError) throw new Error(`No se pudo crear la galería: ${galleryError.message}`);
  }
  revalidatePath("/admin/properties");
  return property.id;
}
