"use client";

import dynamic from "next/dynamic";
import type { Property } from "../data/properties";

const PropertyMap = dynamic(
  () => import("./property-map").then((module) => module.PropertyMap),
  {
    ssr: false,
    loading: () => <div className="h-80 animate-pulse rounded-2xl bg-hint" />,
  },
);

export function PropertyMapLoader({ property }: { property: Property }) {
  return <PropertyMap property={property} />;
}
