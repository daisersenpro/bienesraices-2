"use client";

import { useState } from "react";
import type { PropertyImage } from "../data/properties";
import { translations, type Locale } from "../i18n/config";

export function PropertyGallery({ images, name, locale }: { images: PropertyImage[]; name: string; locale: Locale }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentImage = images[selectedIndex];
  const t = translations[locale];

  if (!currentImage) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-2xl bg-hint text-sm text-muted">
        {t.noImages}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl bg-white shadow-soft">
        <img src={currentImage.url} alt={currentImage.alt || name} className="aspect-[16/10] h-full w-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
          {images.map((image, index) => (
            <button
              key={image.id ?? image.url}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`${t.viewImage} ${index + 1} ${t.of} ${images.length}`}
              aria-pressed={selectedIndex === index}
              className={`overflow-hidden rounded-lg border-2 transition ${
                selectedIndex === index ? "border-mosque" : "border-transparent"
              }`}
            >
              <img src={image.url} alt="" className="aspect-square w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
