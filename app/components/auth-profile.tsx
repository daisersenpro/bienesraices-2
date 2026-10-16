"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "../../lib/supabase/client";

export function AuthProfile({ label }: { label: string }) {
  const [user, setUser] = useState<{ name: string; avatar: string | null } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    void supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => {
      setUser(data.user ? mapUser(data.user) : null);
      setIsLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ? mapUser(session.user) : null);
      setIsLoading(false);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <span aria-hidden="true" className="hidden h-9 w-16 animate-pulse rounded-lg bg-hint/70 sm:inline-flex" />;
  }

  if (!user) {
    return <Link href="/login" className="hidden rounded-lg bg-mosque px-3 py-2 text-xs font-semibold text-white transition hover:bg-nordic sm:inline-flex">{label}</Link>;
  }

  return (
    <button type="button" title={user.name} className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-hint text-sm font-semibold text-nordic">
      {user.avatar ? <img src={user.avatar} alt={`Avatar de ${user.name}`} className="h-full w-full object-cover" onError={() => setUser((current) => current ? { ...current, avatar: null } : current)} /> : user.name.slice(0, 2).toUpperCase()}
    </button>
  );
}

function mapUser(user: { user_metadata?: Record<string, unknown>; email?: string }) {
  const metadata = user.user_metadata ?? {};
  const name = String(metadata.full_name ?? metadata.name ?? user.email ?? "Usuario");
  const avatar = metadata.avatar_url ?? metadata.picture ?? metadata.avatar;
  return { name, avatar: typeof avatar === "string" ? avatar : null };
}
