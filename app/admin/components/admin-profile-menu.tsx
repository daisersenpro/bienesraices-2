"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "../../../lib/supabase/client";

export function AdminProfileMenu({ user }: { user: User }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const metadata = user.user_metadata ?? {};
  const name = String(metadata.full_name ?? metadata.name ?? user.email ?? "Administrador");
  const avatar = metadata.avatar_url ?? metadata.picture ?? metadata.avatar;

  async function signOut() {
    const { error: signOutError } = await getSupabaseBrowserClient().auth.signOut();
    if (signOutError) {
      setError(signOutError.message);
      return;
    }
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="relative">
      <button type="button" title={name} aria-label="Abrir menú de perfil" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex items-center gap-2 rounded-full ring-2 ring-transparent transition hover:ring-mosque">
        <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-hint font-semibold text-mosque">
          {typeof avatar === "string" ? <img src={avatar} alt={`Avatar de ${name}`} className="h-full w-full object-cover" /> : initials(name)}
        </span>
        <span className="hidden max-w-32 text-left sm:block"><strong className="block truncate text-xs text-nordic">{name}</strong><small className="text-[10px] text-nordic/50">Administrador</small></span>
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full z-50 mt-2 min-w-52 rounded-xl border border-nordic/10 bg-white p-2 shadow-soft">
          <Link href="/admin/properties" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-nordic hover:bg-hint">Administrar propiedades</Link>
          <Link href="/admin/users" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-nordic hover:bg-hint">Administrar usuarios</Link>
          <button type="button" onClick={() => void signOut()} className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-nordic hover:bg-hint hover:text-mosque">Cerrar sesión</button>
          {error && <p role="alert" className="px-3 py-2 text-xs text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
}

function initials(value: string) {
  return value.split(/[\s@]+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}
