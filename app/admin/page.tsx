import { redirect } from "next/navigation";
import Link from "next/link";
import { getSupabaseAuthServerClient } from "../../lib/supabase/auth-server";
import { RoleSelect } from "./components/role-select";

export const instant = false;

type PropertyRow = {
  id: number;
  name: string;
  location: string;
  price: number;
  property_type: string;
  listing_type: string;
  featured: boolean;
};

type UserRoleRow = {
  user_id: string;
  email: string;
  display_name: string | null;
  role: string;
};

export default async function AdminPage() {
  const supabase = await getSupabaseAuthServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: currentRole } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();
  if (currentRole?.role !== "admin") redirect("/");

  const [{ data: properties, error: propertiesError }, { data: users, error: usersError }] = await Promise.all([
    supabase
      .from("properties")
      .select("id, name, location, price, property_type, listing_type, featured")
      .order("created_at", { ascending: false }),
    supabase
      .from("user_roles")
      .select("user_id, email, display_name, role")
      .order("created_at", { ascending: false }),
  ]);

  if (propertiesError) throw new Error(`No se pudieron cargar las propiedades: ${propertiesError.message}`);
  if (usersError) throw new Error(`No se pudieron cargar los usuarios: ${usersError.message}`);

  const propertyRows = (properties ?? []) as PropertyRow[];
  const userRows = (users ?? []) as UserRoleRow[];

  return (
    <main className="min-h-screen bg-[#e7f2fb] px-4 py-8 text-nordic sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-mosque">Casas SenPro</p>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard administrativo</h1>
            <p className="mt-2 text-sm text-nordic/60">Gestiona propiedades y permisos de acceso.</p>
          </div>
          <Link href="/" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-nordic shadow-sm transition hover:bg-hint">Volver al sitio</Link>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Propiedades" value={propertyRows.length} />
          <StatCard label="Usuarios autenticados" value={userRows.length} />
          <StatCard label="Administradores" value={userRows.filter((item) => item.role === "admin").length} />
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.35fr_1fr]">
          <section className="rounded-2xl border border-white/70 bg-white p-5 shadow-soft sm:p-6">
            <h2 className="mb-4 text-xl font-bold">Propiedades actuales</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="border-b border-nordic/10 text-xs uppercase tracking-wide text-nordic/50">
                  <tr><th className="px-3 py-3">Propiedad</th><th className="px-3 py-3">Ubicación</th><th className="px-3 py-3">Tipo</th><th className="px-3 py-3">Precio</th><th className="px-3 py-3">Estado</th></tr>
                </thead>
                <tbody>
                  {propertyRows.map((property) => (
                    <tr key={property.id} className="border-b border-nordic/5 last:border-0">
                      <td className="px-3 py-4 font-semibold">{property.name}</td>
                      <td className="px-3 py-4 text-nordic/65">{property.location}</td>
                      <td className="px-3 py-4 text-nordic/65">{property.property_type}</td>
                      <td className="px-3 py-4 font-medium">{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(property.price)}</td>
                      <td className="px-3 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${property.featured ? "bg-hint text-nordic" : "bg-nordic/5 text-nordic/60"}`}>{property.featured ? "Destacada" : property.listing_type}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-white/70 bg-white p-5 shadow-soft sm:p-6">
            <h2 className="mb-1 text-xl font-bold">Roles de usuarios</h2>
            <p className="mb-4 text-sm text-nordic/60">Solo los administradores pueden modificar estos permisos.</p>
            <div className="space-y-3">
              {userRows.map((item) => (
                <div key={item.user_id} className="flex items-center justify-between gap-3 rounded-xl border border-nordic/10 p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{item.display_name || "Usuario"}</p>
                    <p className="truncate text-xs text-nordic/55">{item.email}</p>
                  </div>
                  <RoleSelect userId={item.user_id} role={item.role} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl border border-white/70 bg-white p-5 shadow-soft"><p className="text-sm text-nordic/60">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>;
}
