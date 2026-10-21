import { connection } from "next/server";
import { AdminHeader } from "../../components/admin-header";
import { requireAdmin } from "../../components/admin-auth";
import { PropertyForm } from "../../components/property-form";

export const instant = false;

export default async function NewPropertyPage() {
  await connection();
  const { user } = await requireAdmin();
  return (
    <main className="min-h-screen bg-[#e7f2fb] text-nordic">
      <AdminHeader active="properties" user={user} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-nordic/10 pb-8">
          <p className="mb-3 text-sm font-medium text-nordic/50"><span>Propiedades</span> <span className="mx-2">›</span> Nueva propiedad</p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Agregar nueva propiedad</h1>
          <p className="mt-2 text-sm text-nordic/55">Completa los datos para publicar una nueva propiedad.</p>
        </header>
        <PropertyForm mode="create" />
      </div>
    </main>
  );
}
