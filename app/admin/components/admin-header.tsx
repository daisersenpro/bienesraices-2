import Link from "next/link";

export function AdminHeader({ active }: { active: "properties" | "users" }) {
  return (
    <nav className="border-b border-nordic/5 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/admin/properties" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-mosque text-lg font-bold text-white">⌂</span>
            <span className="font-bold tracking-tight text-nordic">Casas SenPro</span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <NavLink href="/admin/properties" active={active === "properties"}>Propiedades</NavLink>
            <NavLink href="/admin/users" active={active === "users"}>Usuarios</NavLink>
          </div>
        </div>
        <Link href="/" className="text-sm font-medium text-nordic/60 transition-colors hover:text-mosque">Volver al sitio</Link>
      </div>
    </nav>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className={`border-b-2 px-1 py-5 text-sm font-medium transition-colors ${active ? "border-mosque text-mosque" : "border-transparent text-nordic/60 hover:border-mosque/30 hover:text-mosque"}`}>
      {children}
    </Link>
  );
}
