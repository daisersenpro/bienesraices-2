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
  if (!Number.isInteger(propertyId) || !name || !location || !Number.isFinite(price) || price < 0 || !["En venta", "En alquiler"].includes(listingType)) {
    throw new Error("Datos de propiedad no válidos.");
  }
  const supabase = await requireAdminClient();
  const { error } = await supabase.from("properties").update({ name, location, price, listing_type: listingType, featured }).eq("id", propertyId);
  if (error) throw new Error(`No se pudo actualizar la propiedad: ${error.message}`);
  revalidatePath("/admin/properties");
}
