"use client";

import { useState } from "react";
import { updateUser } from "../actions";

export function UserEditCard({ userId, displayName, email, role }: { userId: string; displayName: string; email: string; role: string }) {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  async function submit(formData: FormData) {
    setSaving(true); setError("");
    try { formData.set("userId", userId); await updateUser(formData); setEditing(false); }
    catch (actionError) { setError(actionError instanceof Error ? actionError.message : "No se pudo guardar."); }
    finally { setSaving(false); }
  }
  if (editing) return <form action={submit} className="rounded-xl bg-hint p-5 shadow-sm"><div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"><input name="displayName" defaultValue={displayName} required className="rounded-lg border-0 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-mosque" /><input value={email} disabled className="rounded-lg border-0 bg-white/70 px-3 py-2 text-sm text-nordic/50" /><select name="role" defaultValue={role} className="rounded-lg border-0 bg-white px-3 py-2 text-sm"><option value="user">Usuario</option><option value="editor">Editor</option><option value="admin">Administrador</option></select></div><div className="mt-3 flex justify-end gap-2"><button disabled={saving} className="rounded-lg bg-mosque px-4 py-2 text-sm font-semibold text-white">{saving ? "..." : "Guardar"}</button><button type="button" onClick={() => setEditing(false)} className="rounded-lg px-4 py-2 text-sm text-nordic/60 hover:bg-white">Cancelar</button></div>{error && <p role="alert" className="mt-2 text-xs text-red-600">{error}</p>}</form>;
  return <button type="button" onClick={() => setEditing(true)} aria-label={`Editar ${email}`} title="Editar usuario" className="rounded-lg p-2 text-lg text-mosque transition hover:bg-hint hover:text-nordic">✎</button>;
}
