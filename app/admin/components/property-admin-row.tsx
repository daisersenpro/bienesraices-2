"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { activateProperty, deactivateProperty } from "../actions";
import { FeedbackModal } from "./feedback-modal";

type Property = { id: number; slug: string; name: string; location: string; price: number; propertyType: string; listingType: string; imageUrl: string; featured: boolean; isActive: boolean };

export function PropertyAdminRow({ property }: { property: Property }) {
  const router = useRouter();
  const [feedback, setFeedback] = useState<"confirm" | "success" | "error" | null>(null);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  async function changeActiveState() {
    setDeleting(true);
    try {
      const formData = new FormData();
      formData.set("propertyId", String(property.id));
      if (property.isActive) await deactivateProperty(formData);
      else await activateProperty(formData);
      setFeedback("success");
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "No se pudo actualizar el estado de la propiedad.");
      setFeedback("error");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="group grid grid-cols-1 items-center gap-4 border-b border-nordic/5 px-6 py-5 transition-colors last:border-0 hover:bg-[#e7f2fb]/50 md:grid-cols-12">
      <>
          <div className="flex gap-4 md:col-span-6">
            <img src={property.imageUrl} alt={property.name} className="h-20 w-28 flex-shrink-0 rounded-lg object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="min-w-0 self-center"><Link href={`/propiedades/${property.slug}`} className="truncate text-sm font-bold hover:text-mosque">{property.name}</Link><p className="mt-1 truncate text-xs text-nordic/55">{property.location}</p><p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-mosque">{property.propertyType}</p></div>
          </div>
          <div className="text-sm font-semibold md:col-span-2">{formatPrice(property.price)}</div>
          <div className="md:col-span-2"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${!property.isActive ? "bg-red-100 text-red-700" : property.featured ? "bg-hint text-nordic" : "bg-mosque/10 text-mosque"}`}>{!property.isActive ? "Desactivada" : property.featured ? "Destacada" : property.listingType}</span></div>
          <div className="flex items-center gap-3 text-left text-sm font-medium text-mosque md:col-span-2 md:justify-end"><Link href={`/admin/properties/${property.id}/edit`} aria-label={`Editar ${property.name}`} title="Editar propiedad" className="rounded-lg p-2 text-lg transition hover:bg-hint hover:text-nordic">✎</Link><button type="button" onClick={() => setFeedback("confirm")} disabled={deleting} aria-label={property.isActive ? `Desactivar ${property.name}` : `Activar ${property.name}`} title={property.isActive ? "Desactivar propiedad" : "Activar propiedad"} className={`rounded-lg p-2 text-lg transition hover:bg-hint hover:text-nordic disabled:opacity-50 ${property.isActive ? "text-red-500" : "text-mosque"}`}>{property.isActive ? "🗑" : "↻"}</button><Link href={`/propiedades/${property.slug}`} className="hover:text-nordic">Ver →</Link></div>
      </>
      {feedback === "confirm" && <FeedbackModal title={property.isActive ? "¿La ocultamos?" : "¿La mostramos?"} message={property.isActive ? "La propiedad dejará de verse en la página, pero seguirá guardada." : "La propiedad volverá a aparecer en la página."} tone={property.isActive ? "error" : "success"} confirmLabel={property.isActive ? "Sí, ocultar" : "Sí, mostrar"} onClose={() => setFeedback(null)} onConfirm={() => void changeActiveState()} />}
      {feedback === "success" && <FeedbackModal title="¡Listo!" message={property.isActive ? "La propiedad ya no se muestra en la página." : "La propiedad volvió a mostrarse en la página."} onClose={() => { setFeedback(null); router.refresh(); }} />}
      {feedback === "error" && <FeedbackModal title="No pudimos actualizarla" message={error} tone="error" onClose={() => setFeedback(null)} />}
    </div>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(price);
}
