"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { Property } from "../data/properties";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function PropertyMap({ property }: { property: Property }) {
  if (property.latitude === undefined || property.longitude === undefined) {
    return (
      <div className="flex h-80 items-center justify-center rounded-2xl bg-hint px-6 text-center text-sm text-muted">
        La ubicación del mapa aún no está disponible para esta propiedad.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#c8e5f8] shadow-card">
      <MapContainer center={[property.latitude, property.longitude]} zoom={14} scrollWheelZoom={false} className="h-80 w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[property.latitude, property.longitude]} icon={markerIcon}>
          <Popup>{property.name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
