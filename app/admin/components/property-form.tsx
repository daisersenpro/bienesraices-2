"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProperty, updateProperty } from "../actions";
import { getSupabaseBrowserClient } from "../../../lib/supabase/client";

type PropertyValues = {
  id?: number; slug: string; name: string; location: string; price: number; propertyType: string; listingType: string;
  beds: string; baths: string; bedrooms: number; bathrooms: number; area: string; description: string;
  imageUrl: string; galleryUrls: string[]; featured: boolean; priceSuffix: string; latitude: number; longitude: number;
};

export function PropertyForm({ initial, mode }: { initial?: Partial<PropertyValues>; mode: "create" | "edit" }) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(initial?.galleryUrls ?? (initial?.imageUrl ? [initial.imageUrl] : []));
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function uploadImages(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true); setError("");
    try {
      const supabase = getSupabaseBrowserClient();
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) throw new Error("Usa imágenes JPG, PNG o WEBP de máximo 5 MB.");
        const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
        const { error: uploadError } = await supabase.storage.from("property-images").upload(path, file);
        if (uploadError) throw new Error(`No se pudo subir la imagen: ${uploadError.message}`);
        uploaded.push(supabase.storage.from("property-images").getPublicUrl(path).data.publicUrl);
      }
      setImages((current) => [...current, ...uploaded]);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "No se pudieron subir las imágenes.");
    } finally { setUploading(false); }
  }

  async function submit(formData: FormData) {
    setSaving(true); setError("");
    try {
      formData.set("imageUrl", images[0] ?? "");
      formData.set("galleryUrls", JSON.stringify(images));
      if (mode === "edit") { formData.set("propertyId", String(initial?.id)); await updateProperty(formData); }
      else await createProperty(formData);
      router.push("/admin/properties");
      router.refresh();
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "No se pudo guardar la propiedad.");
    } finally { setSaving(false); }
  }

  return (
    <form action={submit} className="grid gap-8 xl:grid-cols-12">
      <div className="space-y-8 xl:col-span-8">
        <Section title="Información básica">
          <Field label="Título de la propiedad" name="name" defaultValue={initial?.name} required />
          <div className="grid gap-5 md:grid-cols-3">
            <Field label="Precio (CLP)" name="price" type="number" defaultValue={initial?.price} required />
            <SelectField label="Operación" name="listingType" defaultValue={initial?.listingType ?? "En venta"} options={["En venta", "En alquiler"]} />
            <SelectField label="Tipo" name="propertyType" defaultValue={initial?.propertyType ?? "House"} options={["House", "Apartment", "Villa", "Penthouse"]} />
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            <Field label="Dormitorios" name="bedrooms" type="number" defaultValue={initial?.bedrooms ?? 0} required />
            <Field label="Baños" name="bathrooms" type="number" step="0.5" defaultValue={initial?.bathrooms ?? 0} required />
            <Field label="Habitaciones" name="beds" defaultValue={initial?.beds} required />
            <Field label="Baños visibles" name="baths" defaultValue={initial?.baths} required />
          </div>
          <Field label="Superficie" name="area" defaultValue={initial?.area} required />
        </Section>
        <Section title="Descripción"><textarea name="description" defaultValue={initial?.description} maxLength={2000} rows={7} placeholder="Describe las características, el barrio y los puntos destacados..." className="w-full rounded-lg border border-nordic/10 px-4 py-3 text-sm outline-none focus:border-mosque focus:ring-2 focus:ring-mosque/20" /></Section>
        <Section title="Galería">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-nordic/15 bg-[#f6f7f7] p-10 text-center transition hover:border-mosque/50 hover:bg-hint/30">
            <span className="text-3xl text-mosque">↑</span><span className="mt-2 text-sm font-medium">Haz clic o arrastra imágenes aquí</span><span className="mt-1 text-xs text-nordic/45">JPG, PNG o WEBP · máximo 5 MB por imagen</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => void uploadImages(event.target.files)} className="sr-only" />
          </label>
          {uploading && <p className="mt-3 text-sm text-mosque">Subiendo imágenes...</p>}
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">{images.map((url, index) => <div key={url} className="group relative aspect-square overflow-hidden rounded-lg"><img src={url} alt={`Imagen ${index + 1}`} className="h-full w-full object-cover" /><button type="button" onClick={() => setImages((current) => current.filter((item) => item !== url))} className="absolute right-2 top-2 rounded-full bg-white px-2 py-1 text-xs text-red-600 opacity-0 shadow group-hover:opacity-100">Eliminar</button>{index === 0 && <span className="absolute bottom-2 left-2 rounded bg-mosque px-2 py-1 text-[10px] font-bold uppercase text-white">Principal</span>}</div>)}</div>
        </Section>
      </div>
      <aside className="space-y-8 xl:col-span-4">
        <Section title="Ubicación"><Field label="Dirección" name="location" defaultValue={initial?.location} required /><div className="grid gap-4 grid-cols-2"><Field label="Latitud" name="latitude" type="number" step="0.000001" defaultValue={initial?.latitude ?? 0} required /><Field label="Longitud" name="longitude" type="number" step="0.000001" defaultValue={initial?.longitude ?? 0} required /></div></Section>
        <Section title="Publicación"><Field label="Slug" name="slug" defaultValue={initial?.slug} required disabled={mode === "edit"} /><Field label="Texto de precio" name="priceSuffix" defaultValue={initial?.priceSuffix} placeholder="por mes" /><label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" value="true" defaultChecked={initial?.featured} className="rounded border-nordic/20 text-mosque focus:ring-mosque" /> Marcar como destacada</label></Section>
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div className="flex justify-end gap-3"><Link href="/admin/properties" className="rounded-lg border border-nordic/10 bg-white px-5 py-2.5 text-sm font-medium hover:bg-hint">Cancelar</Link><button type="submit" disabled={saving || uploading} className="rounded-lg bg-mosque px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-mosque/20 transition hover:bg-nordic disabled:opacity-60">{saving ? "Guardando..." : mode === "create" ? "Guardar propiedad" : "Guardar cambios"}</button></div>
      </aside>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section className="overflow-hidden rounded-xl border border-nordic/10 bg-white shadow-sm"><div className="border-b border-hint/50 bg-gradient-to-r from-hint/30 to-transparent px-6 py-5"><h2 className="text-xl font-bold">{title}</h2></div><div className="space-y-5 p-6">{children}</div></section>; }
function Field({ label, name, type = "text", defaultValue, required = false, disabled = false, step, placeholder }: { label: string; name: string; type?: string; defaultValue?: string | number; required?: boolean; disabled?: boolean; step?: string; placeholder?: string }) { return <label className="block text-sm font-medium"><span className="mb-1.5 block">{label}{required && <b className="text-red-500"> *</b>}</span><input name={name} type={type} defaultValue={defaultValue} required={required} disabled={disabled} step={step} placeholder={placeholder} className="w-full rounded-lg border border-nordic/10 px-4 py-2.5 text-sm outline-none focus:border-mosque focus:ring-2 focus:ring-mosque/20 disabled:bg-nordic/5" /></label>; }
function SelectField({ label, name, defaultValue, options }: { label: string; name: string; defaultValue: string; options: string[] }) { return <label className="block text-sm font-medium"><span className="mb-1.5 block">{label}</span><select name={name} defaultValue={defaultValue} className="w-full rounded-lg border border-nordic/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-mosque focus:ring-2 focus:ring-mosque/20">{options.map((option) => <option key={option}>{option}</option>)}</select></label>; }
