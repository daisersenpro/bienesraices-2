"use client";

import { useState } from "react";
import { formatPrice, type Property } from "../data/properties";

export function PropertyCard({ property }: { property: Property }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#c8e5f8] bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={`${property.name}, ${property.location}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          aria-label={saved ? `Quitar ${property.name} de favoritos` : `Guardar ${property.name} en favoritos`}
          aria-pressed={saved}
          onClick={() => setSaved(!saved)}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl transition-colors hover:bg-mosque hover:text-white ${saved ? "text-mosque" : "text-nordic"}`}
        >
          {saved ? "♥" : "♡"}
        </button>
        <div className="absolute bottom-3 left-3 rounded bg-nordic/90 px-2 py-1 text-xs font-bold uppercase tracking-wide text-white">
          {property.listing}
        </div>
      </div>
      <div className="flex flex-grow flex-col p-4">
        <h3 className="text-lg font-bold text-nordic">{formatPrice(property.price)}<span className="text-sm font-normal text-muted">{property.priceSuffix}</span></h3>
        <h4 className="mt-1 truncate font-medium text-nordic">{property.name}</h4>
        <p className="mb-4 mt-1 text-xs text-muted">{property.location}</p>
        <div className="mt-auto flex items-center justify-between border-t border-nordic/10 pt-3 text-xs text-muted">
          <span>⌂ {property.beds}</span>
          <span>◉ {property.baths}</span>
          <span>□ {property.area}</span>
        </div>
      </div>
    </article>
  );
}
