"use client";

import dynamic from "next/dynamic";
import type { Property } from "../data/properties";
import type { Locale } from "../i18n/config";

const PropertyMap = dynamic(
  () => import("./property-map").then((module) => module.PropertyMap),
  {
    ssr: false,
    loading: () => <div className="h-80 animate-pulse rounded-2xl bg-hint" />,
  },
);

export function PropertyMapLoader({ property, locale }: { property: Property; locale: Locale }) {
  return <PropertyMap property={property} locale={locale} />;
}
