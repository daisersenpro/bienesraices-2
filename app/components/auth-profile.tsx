"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "../../lib/supabase/client";

export function AuthProfile({ labels }: { labels: { login: string; logout: string; profile: string } }) {
  const [user, setUser] = useState<{ name: string; avatar: string | null; isAdmin: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    async function loadUser(authUser: User | null) {
      if (!authUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", authUser.id).maybeSingle();
      setUser({ ...mapUser(authUser), isAdmin: role?.role === "admin" });
      setIsLoading(false);
    }
    void supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => loadUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      void loadUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <span aria-hidden="true" className="hidden h-9 w-16 animate-pulse rounded-lg bg-hint/70 sm:inline-flex" />;
  }

  if (!user) {
    return <Link href="/login" className="hidden rounded-lg bg-mosque px-3 py-2 text-xs font-semibold text-white transition hover:bg-nordic sm:inline-flex">{labels.login}</Link>;
  }

  return (
    <div className="relative">
      <button
        type="button"
        title={user.name}
        aria-label={labels.profile}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-hint text-sm font-semibold text-nordic ring-2 ring-transparent transition hover:ring-mosque"
      >
        {user.avatar ? <img src={user.avatar} alt={`Avatar de ${user.name}`} className="h-full w-full object-cover" onError={() => setUser((current) => current ? { ...current, avatar: null } : current)} /> : user.name.slice(0, 2).toUpperCase()}
      </button>
      {isOpen && (
        <div role="menu" className="absolute right-0 top-full z-[70] mt-2 min-w-48 rounded-xl border border-nordic/10 bg-white p-2 shadow-soft">
          <p className="truncate px-3 py-2 text-xs text-muted">{user.name}</p>
          {user.isAdmin && (
            <>
              <Link href="/admin/properties" role="menuitem" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-2 text-left text-sm font-medium text-nordic transition-colors hover:bg-hint hover:text-mosque">Administrar propiedades</Link>
              <Link href="/admin/users" role="menuitem" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-2 text-left text-sm font-medium text-nordic transition-colors hover:bg-hint hover:text-mosque">Administrar usuarios</Link>
            </>
          )}
          <button
            type="button"
            role="menuitem"
            onClick={async () => {
              const { error } = await getSupabaseBrowserClient().auth.signOut();
              if (error) {
                setLogoutError(error.message);
                return;
              }
              setLogoutError("");
              setIsOpen(false);
            }}
            className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-nordic transition-colors hover:bg-hint hover:text-mosque"
          >
            {labels.logout}
          </button>
          {logoutError && <p role="alert" className="px-3 py-2 text-xs text-red-600">{logoutError}</p>}
        </div>
      )}
    </div>
  );
}

function mapUser(user: { user_metadata?: Record<string, unknown>; email?: string }) {
  const metadata = user.user_metadata ?? {};
  const name = String(metadata.full_name ?? metadata.name ?? user.email ?? "Usuario");
  const avatar = metadata.avatar_url ?? metadata.picture ?? metadata.avatar;
  return { name, avatar: typeof avatar === "string" ? avatar : null };
}
