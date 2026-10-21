import Link from "next/link";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { AdminHeader } from "../components/admin-header";
import { requireAdmin } from "../components/admin-auth";
import { PropertyAdminRow } from "../components/property-admin-row";

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

type PageProps = { searchParams: Promise<{ page?: string }> };
const PAGE_SIZE = 10;

export default async function AdminPropertiesPage({ searchParams }: PageProps) {
  await connection();
  const { supabase, user } = await requireAdmin();
  const params = await searchParams;
  const requestedPage = Number.parseInt(params.page ?? "1", 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const from = (page - 1) * PAGE_SIZE;
  const { data, error } = await supabase
    .from("properties")
    .select("id, slug, name, location, price, property_type, listing_type, image_url, featured", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);
  if (error) throw new Error(`No se pudieron cargar las propiedades: ${error.message}`);

  const properties = (data ?? []) as PropertyRow[];
  const { count: totalProperties } = await supabase.from("properties").select("id", { count: "exact", head: true });
  const { count: activeProperties } = await supabase.from("properties").select("id", { count: "exact", head: true }).in("listing_type", ["En venta", "En alquiler"]);
  const { count: featuredProperties } = await supabase.from("properties").select("id", { count: "exact", head: true }).eq("featured", true);
  const totalPages = Math.max(1, Math.ceil((totalProperties ?? 0) / PAGE_SIZE));
  if (page > totalPages && totalProperties) {
    redirect("/admin/properties?page=1");
  }

  return (
    <main className="min-h-screen bg-[#e7f2fb] text-nordic">
      <AdminHeader active="properties" user={user} />
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mis propiedades</h1>
            <p className="mt-1 text-sm text-nordic/55">Administra tu portafolio y revisa el estado de tus publicaciones.</p>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-nordic/10 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-hint">☷ Filtrar</button>
            <Link href="/admin/properties/new" className="inline-flex items-center gap-2 rounded-lg bg-mosque px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-mosque/20 transition hover:-translate-y-0.5 hover:bg-nordic">＋ Nueva propiedad</Link>
          </div>
        </header>

        <section className="mb-8 grid gap-5 sm:grid-cols-3">
          <StatCard label="Total de publicaciones" value={totalProperties ?? 0} icon="⌂" />
          <StatCard label="Propiedades activas" value={activeProperties ?? 0} icon="✓" tone="green" />
          <StatCard label="Destacadas" value={featuredProperties ?? 0} icon="★" tone="orange" />
        </section>

        <section className="overflow-hidden rounded-xl border border-nordic/10 bg-white shadow-sm">
          <div className="hidden grid-cols-12 gap-4 border-b border-nordic/5 bg-nordic/[0.02] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-nordic/50 md:grid">
            <div className="col-span-6">Detalles de propiedad</div><div className="col-span-2">Precio</div><div className="col-span-2">Estado</div><div className="col-span-2 text-right">Acciones</div>
          </div>
          {properties.map((property) => <PropertyAdminRow key={property.id} property={{ id: property.id, slug: property.slug, name: property.name, location: property.location, price: property.price, propertyType: property.property_type, listingType: property.listing_type, imageUrl: property.image_url, featured: property.featured }} />)}
        </section>
        <Pagination page={page} totalPages={totalPages} basePath="/admin/properties" />
      </div>
    </main>
  );
}

function Pagination({ page, totalPages, basePath }: { page: number; totalPages: number; basePath: string }) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Paginación" className="mt-6 flex items-center justify-between">
      <PageLink href={`${basePath}?page=${Math.max(1, page - 1)}`} disabled={page === 1}>← Anterior</PageLink>
      <span className="text-sm text-nordic/55">Página <strong className="text-nordic">{page}</strong> de {totalPages}</span>
      <PageLink href={`${basePath}?page=${Math.min(totalPages, page + 1)}`} disabled={page === totalPages}>Siguiente →</PageLink>
    </nav>
  );
}

function PageLink({ href, disabled, children }: { href: string; disabled: boolean; children: React.ReactNode }) {
  return disabled ? <span className="rounded-lg border border-nordic/10 bg-white px-4 py-2 text-sm text-nordic/30">{children}</span> : <Link href={href} className="rounded-lg border border-mosque/20 bg-white px-4 py-2 text-sm font-medium text-mosque transition hover:bg-hint">{children}</Link>;
}

function StatCard({ label, value, icon, tone = "blue" }: { label: string; value: number; icon: string; tone?: "blue" | "green" | "orange" }) {
  const colors = { blue: "bg-mosque/10 text-mosque", green: "bg-hint text-mosque", orange: "bg-orange-100 text-orange-600" };
  return <div className="flex items-center justify-between rounded-xl border border-mosque/10 bg-white p-5 shadow-sm"><div><p className="text-sm font-medium text-nordic/55">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div><div className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${colors[tone]}`}>{icon}</div></div>;
}
