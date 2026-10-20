import { AdminHeader } from "../components/admin-header";
import { requireAdmin } from "../components/admin-auth";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { RoleSelect } from "../components/role-select";
import { UserEditCard } from "../components/user-edit-card";

export const instant = false;

type UserRoleRow = { user_id: string; email: string; display_name: string | null; role: string; created_at: string };
type PageProps = { searchParams: Promise<{ page?: string }> };
const PAGE_SIZE = 10;

export default async function AdminUsersPage({ searchParams }: PageProps) {
  await connection();
  const { supabase, user: adminUser } = await requireAdmin();
  const params = await searchParams;
  const requestedPage = Number.parseInt(params.page ?? "1", 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const from = (page - 1) * PAGE_SIZE;
  const { data, count, error } = await supabase
    .from("user_roles")
    .select("user_id, email, display_name, role, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);
  if (error) throw new Error(`No se pudieron cargar los usuarios: ${error.message}`);
  const users = (data ?? []) as UserRoleRow[];
  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));
  if (page > totalPages && count) {
    redirect("/admin/users?page=1");
  }

  return (
    <main className="min-h-screen bg-[#e7f2fb] text-nordic">
      <AdminHeader active="users" user={adminUser} />
      <header className="mx-auto w-full max-w-7xl px-4 pb-6 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div><h1 className="text-3xl font-bold tracking-tight">Directorio de usuarios</h1><p className="mt-1 text-sm text-nordic/55">Administra el acceso y los roles de tu plataforma.</p></div>
          <div className="flex w-full gap-3 md:w-auto"><div className="flex w-full items-center rounded-lg bg-white px-3 shadow-sm md:w-80"><span className="mr-2 text-lg text-nordic/35">⌕</span><input className="w-full border-0 bg-transparent py-2.5 text-sm outline-none placeholder:text-nordic/30 focus:ring-0" placeholder="Buscar por nombre o correo..." /></div><button type="button" className="inline-flex whitespace-nowrap items-center gap-2 rounded-lg bg-mosque px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-mosque/20 transition hover:-translate-y-0.5 hover:bg-nordic">＋ Agregar usuario</button></div>
        </div>
        <div className="mt-8 flex gap-6 overflow-x-auto border-b border-nordic/10">
          <Tab active>Todos los usuarios</Tab><Tab>Agentes</Tab><Tab>Administradores</Tab>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl space-y-4 px-4 pb-12 sm:px-6 lg:px-8">
        <div className="hidden grid-cols-12 gap-4 px-6 text-xs font-semibold uppercase tracking-wider text-nordic/50 md:grid"><div className="col-span-5">Datos del usuario</div><div className="col-span-3">Rol y estado</div><div className="col-span-2">Registro</div><div className="col-span-2 text-right">Acciones</div></div>
        {users.map((user, index) => (
          <div key={user.user_id} className={`group grid grid-cols-1 items-center gap-4 rounded-xl border border-transparent p-5 shadow-sm transition hover:shadow-soft md:grid-cols-12 ${index === 0 ? "bg-hint" : "bg-white"}`}>
            <div className="flex min-w-0 items-center md:col-span-5"><div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-white bg-mosque/10 font-bold text-mosque">{initials(user.display_name || user.email)}</div><div className="ml-4 min-w-0"><p className="truncate text-sm font-bold">{user.display_name || "Usuario"}</p><p className="truncate text-xs text-nordic/65">{user.email}</p><span className="mt-1 inline-block rounded bg-white/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-mosque">{user.role === "admin" ? "Administrador" : "Cuenta activa"}</span></div></div>
            <div className="md:col-span-3"><RoleSelect userId={user.user_id} role={user.role} /></div>
            <div className="text-xs text-nordic/55 md:col-span-2">{new Date(user.created_at).toLocaleDateString("es-CL")}</div>
            <div className="flex items-center justify-start gap-2 text-left text-sm font-medium text-mosque md:col-span-2 md:justify-end"><UserEditCard userId={user.user_id} displayName={user.display_name || "Usuario"} email={user.email} role={user.role} /></div>
          </div>
        ))}
        <Pagination page={page} totalPages={totalPages} />
      </main>
    </main>
  );
}

function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Paginación" className="flex items-center justify-between pt-2">
      <PageLink href={`/admin/users?page=${Math.max(1, page - 1)}`} disabled={page === 1}>← Anterior</PageLink>
      <span className="text-sm text-nordic/55">Página <strong className="text-nordic">{page}</strong> de {totalPages}</span>
      <PageLink href={`/admin/users?page=${Math.min(totalPages, page + 1)}`} disabled={page === totalPages}>Siguiente →</PageLink>
    </nav>
  );
}

function PageLink({ href, disabled, children }: { href: string; disabled: boolean; children: React.ReactNode }) {
  return disabled ? <span className="rounded-lg border border-nordic/10 bg-white px-4 py-2 text-sm text-nordic/30">{children}</span> : <Link href={href} className="rounded-lg border border-mosque/20 bg-white px-4 py-2 text-sm font-medium text-mosque transition hover:bg-hint">{children}</Link>;
}

function Tab({ active = false, children }: { active?: boolean; children: React.ReactNode }) {
  return <button type="button" className={`whitespace-nowrap border-b-2 pb-3 text-sm ${active ? "border-mosque font-semibold text-mosque" : "border-transparent font-medium text-nordic/60 hover:text-nordic"}`}>{children}</button>;
}

function initials(value: string) {
  return value.split(/[\s@]+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}
