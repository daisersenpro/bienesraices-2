import { redirect } from "next/navigation";
import { getSupabaseAuthServerClient } from "../../../lib/supabase/auth-server";

export async function requireAdmin() {
  const supabase = await getSupabaseAuthServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: currentRole } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();
  if (currentRole?.role !== "admin") redirect("/");

  return supabase;
}
