import Link from "next/link";
import { connection } from "next/server";
import { AdminHeader } from "../components/admin-header";
import { requireAdmin } from "../components/admin-auth";

export const instant = false;

type PropertyRow = {
  id: number;
  slug: string;
  name: string;
  location: string;
  price: number;
  property_type: string;
  listing_type: string;
  image_url: string;
  featured: boolean;
};

export default async function AdminPropertiesPage() {
  await connection();
  const supabase = await requireAdmin();
  const { data, error } = await supabase
    .from("properties")
    .select("id, slug, name, location, price, property_type, listing_type, image_url, featured")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`No se pudieron cargar las propiedades: ${error.message}`);

  const properties = (data ?? []) as PropertyRow[];
  const active = properties.filter((property) => property.listing_type === "En venta" || property.listing_type === "En alquiler").length;
  const featured = properties.filter((property) => property.featured).length;
  const pending = properties.filter((property) => !property.featured).length;

  return (
    <main className="min-h-screen bg-[#e7f2fb] text-nordic">
      <AdminHeader active="properties" />
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mis propiedades</h1>
            <p className="mt-1 text-sm text-nordic/55">Administra tu portafolio y revisa el estado de tus publicaciones.</p>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-nordic/10 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-hint">☷ Filtrar</button>
            <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-mosque px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-mosque/20 transition hover:-translate-y-0.5 hover:bg-nordic">＋ Nueva propiedad</button>
          </div>
        </header>

        <section className="mb-8 grid gap-5 sm:grid-cols-3">
          <StatCard label="Total de publicaciones" value={properties.length} icon="⌂" />
          <StatCard label="Propiedades activas" value={active} icon="✓" tone="green" />
          <StatCard label="Destacadas" value={featured} icon="★" tone="orange" />
        </section>

        <section className="overflow-hidden rounded-xl border border-nordic/10 bg-white shadow-sm">
          <div className="hidden grid-cols-12 gap-4 border-b border-nordic/5 bg-nordic/[0.02] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-nordic/50 md:grid">
            <div className="col-span-6">Detalles de propiedad</div><div className="col-span-2">Precio</div><div className="col-span-2">Estado</div><div className="col-span-2 text-right">Acciones</div>
          </div>
          {properties.map((property) => (
            <div key={property.id} className="group grid grid-cols-1 items-center gap-4 border-b border-nordic/5 px-6 py-5 transition-colors last:border-0 hover:bg-[#e7f2fb]/50 md:grid-cols-12">
              <div className="flex gap-4 md:col-span-6">
                <img src={property.image_url} alt={property.name} className="h-20 w-28 flex-shrink-0 rounded-lg object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="min-w-0 self-center">
                  <Link href={`/propiedades/${property.slug}`} className="truncate text-sm font-bold hover:text-mosque">{property.name}</Link>
                  <p className="mt-1 truncate text-xs text-nordic/55">{property.location}</p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-mosque">{property.property_type}</p>
                </div>
              </div>
              <div className="text-sm font-semibold md:col-span-2">{formatPrice(property.price)}</div>
              <div className="md:col-span-2"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${property.featured ? "bg-hint text-nordic" : "bg-mosque/10 text-mosque"}`}>{property.featured ? "Destacada" : property.listing_type}</span></div>
              <div className="text-left text-sm font-medium text-mosque md:col-span-2 md:text-right"><Link href={`/propiedades/${property.slug}`} className="hover:text-nordic">Ver detalles →</Link></div>
            </div>
          ))}
        </section>
        <p className="mt-4 text-right text-xs text-nordic/45">{pending} propiedades no destacadas</p>
      </div>
    </main>
  );
}

function StatCard({ label, value, icon, tone = "blue" }: { label: string; value: number; icon: string; tone?: "blue" | "green" | "orange" }) {
  const colors = { blue: "bg-mosque/10 text-mosque", green: "bg-hint text-mosque", orange: "bg-orange-100 text-orange-600" };
  return <div className="flex items-center justify-between rounded-xl border border-mosque/10 bg-white p-5 shadow-sm"><div><p className="text-sm font-medium text-nordic/55">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div><div className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${colors[tone]}`}>{icon}</div></div>;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(price);
}
