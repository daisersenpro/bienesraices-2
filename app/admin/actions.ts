"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAuthServerClient } from "../../lib/supabase/auth-server";

const allowedRoles = new Set(["user", "editor", "admin"]);

export async function updateUserRole(formData: FormData) {
  const userId = String(formData.get("userId") ?? "");
  const role = String(formData.get("role") ?? "");
  if (!userId || !allowedRoles.has(role)) {
    throw new Error("Datos de rol no válidos.");
  }

  const supabase = await getSupabaseAuthServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Debes iniciar sesión.");

  const { data: currentRole } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();
  if (currentRole?.role !== "admin") throw new Error("No tienes permisos para cambiar roles.");

  const { error } = await supabase
    .from("user_roles")
    .update({ role, updated_at: new Date().toISOString() })
    .eq("user_id", userId);
  if (error) throw new Error(`No se pudo actualizar el rol: ${error.message}`);

  revalidatePath("/admin");
}
