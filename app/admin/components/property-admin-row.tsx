"use client";

import Link from "next/link";

type Property = { id: number; slug: string; name: string; location: string; price: number; propertyType: string; listingType: string; imageUrl: string; featured: boolean };

export function PropertyAdminRow({ property }: { property: Property }) {
  return (
    <div className="group grid grid-cols-1 items-center gap-4 border-b border-nordic/5 px-6 py-5 transition-colors last:border-0 hover:bg-[#e7f2fb]/50 md:grid-cols-12">
      <>
          <div className="flex gap-4 md:col-span-6">
            <img src={property.imageUrl} alt={property.name} className="h-20 w-28 flex-shrink-0 rounded-lg object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="min-w-0 self-center"><Link href={`/propiedades/${property.slug}`} className="truncate text-sm font-bold hover:text-mosque">{property.name}</Link><p className="mt-1 truncate text-xs text-nordic/55">{property.location}</p><p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-mosque">{property.propertyType}</p></div>
          </div>
          <div className="text-sm font-semibold md:col-span-2">{formatPrice(property.price)}</div>
          <div className="md:col-span-2"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${property.featured ? "bg-hint text-nordic" : "bg-mosque/10 text-mosque"}`}>{property.featured ? "Destacada" : property.listingType}</span></div>
          <div className="flex items-center gap-3 text-left text-sm font-medium text-mosque md:col-span-2 md:justify-end"><Link href={`/admin/properties/${property.id}/edit`} aria-label={`Editar ${property.name}`} title="Editar propiedad" className="rounded-lg p-2 text-lg transition hover:bg-hint hover:text-nordic">✎</Link><Link href={`/propiedades/${property.slug}`} className="hover:text-nordic">Ver →</Link></div>
      </>
    </div>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(price);
}
