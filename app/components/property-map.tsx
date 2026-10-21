"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import type { Property } from "../data/properties";
import { translations, type Locale } from "../i18n/config";

export function PropertyMap({ property, locale }: { property: Property; locale: Locale }) {
  const t = translations[locale];

  if (property.latitude === undefined || property.longitude === undefined) {
    return (
      <div className="flex h-80 items-center justify-center rounded-2xl bg-hint px-6 text-center text-sm text-muted">
        {t.noProperties}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#c8e5f8] shadow-card">
      <CoordinateMap latitude={property.latitude} longitude={property.longitude} name={property.name} className="h-80 w-full" />
    </div>
  );
}

export function CoordinateMap({ latitude, longitude, name, className = "h-64 w-full" }: { latitude: number; longitude: number; name: string; className?: string }) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;
    const map = L.map(container, { scrollWheelZoom: false }).setView([latitude, longitude], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    L.marker([latitude, longitude]).addTo(map).bindPopup(name);
    return () => {
      map.remove();
    };
  }, [latitude, longitude, name]);

  return <div ref={mapContainerRef} className={className} />;
}
