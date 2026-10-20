"use client";

import { useState } from "react";
import { updateProperty } from "../actions";

type Property = { id: number; name: string; location: string; price: number; listingType: string; featured: boolean };

export function PropertyEditForm({ property, onClose }: { property: Property; onClose: () => void }) {
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(formData: FormData) {
    setSaving(true);
    setError("");
    try {
      formData.set("propertyId", String(property.id));
      await updateProperty(formData);
      onClose();
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "No se pudo guardar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form action={submit} className="col-span-full grid gap-3 rounded-lg bg-hint/50 p-4 sm:grid-cols-2 lg:grid-cols-5">
      <input name="name" defaultValue={property.name} required className="rounded-lg border-0 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-mosque" />
      <input name="location" defaultValue={property.location} required className="rounded-lg border-0 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-mosque" />
      <input name="price" type="number" min="0" defaultValue={property.price} required className="rounded-lg border-0 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-mosque" />
      <select name="listingType" defaultValue={property.listingType} className="rounded-lg border-0 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-mosque"><option>En venta</option><option>En alquiler</option></select>
      <div className="flex items-center gap-2"><select name="featured" defaultValue={String(property.featured)} className="rounded-lg border-0 bg-white px-3 py-2 text-sm"><option value="false">No destacada</option><option value="true">Destacada</option></select><button disabled={saving} className="rounded-lg bg-mosque px-3 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? "..." : "Guardar"}</button><button type="button" onClick={onClose} className="rounded-lg px-3 py-2 text-sm text-nordic/60 hover:bg-white">Cancelar</button></div>
      {error && <p role="alert" className="text-xs text-red-600 sm:col-span-2 lg:col-span-5">{error}</p>}
    </form>
  );
}
