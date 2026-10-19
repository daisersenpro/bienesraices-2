"use client";

import { useState } from "react";
import { updateUserRole } from "../actions";

export function RoleSelect({ userId, role }: { userId: string; role: string }) {
  const [value, setValue] = useState(role);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(nextRole: string) {
    setValue(nextRole);
    setError("");
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.set("userId", userId);
      formData.set("role", nextRole);
      await updateUserRole(formData);
    } catch (actionError) {
      setValue(role);
      setError(actionError instanceof Error ? actionError.message : "No se pudo actualizar el rol.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <select
        value={value}
        disabled={isSaving}
        onChange={(event) => void handleChange(event.target.value)}
        aria-label="Rol del usuario"
        className="rounded-lg border border-nordic/15 bg-white px-3 py-2 text-sm text-nordic outline-none focus:border-mosque focus:ring-2 focus:ring-mosque/20 disabled:opacity-60"
      >
        <option value="user">Usuario</option>
        <option value="editor">Editor</option>
        <option value="admin">Administrador</option>
      </select>
      {error && <p role="alert" className="mt-1 max-w-40 text-right text-xs text-red-600">{error}</p>}
    </div>
  );
}
