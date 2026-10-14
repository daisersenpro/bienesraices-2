"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { translations, type Locale } from "../i18n/config";

const propertyTypes = [
  { value: "", label: "Cualquier tipo" },
  { value: "House", label: "Casa" },
  { value: "Apartment", label: "Apartamento" },
  { value: "Villa", label: "Villa" },
  { value: "Penthouse", label: "Ático" },
] as const;

const listingTypes = [
  { value: "", label: "Venta o arriendo" },
  { value: "En venta", label: "En venta" },
  { value: "En alquiler", label: "En arriendo" },
] as const;

type FilterValues = {
  ubicacion: string;
  precioMinimo: string;
  precioMaximo: string;
  tipo: string;
  operacion: string;
  dormitorios: string;
  banos: string;
};

export function PropertyFilters({ initialValues, locale }: { initialValues: FilterValues; locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const t = translations[locale];

  function applyFilters(formData: FormData) {
    const params = new URLSearchParams();
    const fields = ["ubicacion", "precioMinimo", "precioMaximo", "tipo", "operacion", "dormitorios", "banos"];

    for (const field of fields) {
      const value = String(formData.get(field) ?? "").trim();
      if (value) params.set(field, value);
    }

    const search = params.toString();
    setIsOpen(false);
    router.push(search ? `/?${search}` : "/");
  }

  function clearFilters() {
    setIsOpen(false);
    router.push("/");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="whitespace-nowrap px-2 py-2 text-sm font-medium text-nordic transition-colors hover:text-mosque"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        ⚙ {t.filters}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-nordic/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="filters-title">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <header className="flex items-center justify-between border-b border-nordic/10 px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">{t.search}</p>
                <h2 id="filters-title" className="mt-1 text-2xl font-semibold tracking-tight text-nordic">{t.filters}</h2>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-full p-2 text-xl text-muted transition-colors hover:bg-hint hover:text-nordic" aria-label={t.close}>
                ×
              </button>
            </header>

            <form action={applyFilters} className="overflow-y-auto px-6 py-6 sm:px-8">
              <div className="space-y-8">
                <section>
                  <label htmlFor="filter-location" className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted">{t.location}</label>
                  <div className="flex items-center rounded-lg bg-[#e7f2fb] px-4 focus-within:ring-2 focus-within:ring-mosque">
                    <span className="mr-3 text-lg text-muted">⌖</span>
                    <input id="filter-location" name="ubicacion" defaultValue={initialValues.ubicacion} className="w-full border-0 bg-transparent py-3 text-nordic outline-none placeholder:text-muted/70 focus:ring-0" placeholder={t.searchPlaceholder} />
                  </div>
                </section>

                <section>
                  <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted">{t.priceRange}</label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FilterInput label={t.minPrice} name="precioMinimo" defaultValue={initialValues.precioMinimo} placeholder="100000000" type="number" />
                    <FilterInput label={t.maxPrice} name="precioMaximo" defaultValue={initialValues.precioMaximo} placeholder="500000000" type="number" />
                  </div>
                </section>

                <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FilterSelect label={t.propertyType} name="tipo" defaultValue={initialValues.tipo} options={propertyTypes.map((option) => ({ ...option, label: option.value === "" ? t.anyType : option.value === "House" ? t.houses : option.value === "Apartment" ? t.apartments : option.value === "Villa" ? t.villas : t.penthouses }))} />
                  <FilterSelect label={t.operation} name="operacion" defaultValue={initialValues.operacion} options={listingTypes.map((option) => ({ ...option, label: option.value === "" ? t.anyOperation : option.value === "En venta" ? t.sale : t.rentLabel }))} />
                </section>

                <section>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">{t.features}</p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FilterSelect
                      label={t.bedrooms}
                      name="dormitorios"
                      defaultValue={initialValues.dormitorios}
                      options={[
                        { value: "", label: t.anyAmount },
                        { value: "1", label: "1+" },
                        { value: "2", label: "2+" },
                        { value: "3", label: "3+" },
                        { value: "4", label: "4+" },
                        { value: "5", label: "5+" },
                      ]}
                    />
                    <FilterSelect
                      label={t.bathrooms}
                      name="banos"
                      defaultValue={initialValues.banos}
                      options={[
                        { value: "", label: t.anyAmount },
                        { value: "1", label: "1+" },
                        { value: "2", label: "2+" },
                        { value: "3", label: "3+" },
                        { value: "4", label: "4+" },
                      ]}
                    />
                  </div>
                </section>
              </div>

              <footer className="mt-8 flex items-center justify-between gap-4 border-t border-nordic/10 pt-6">
                <button type="button" onClick={clearFilters} className="text-sm font-medium text-muted underline decoration-hint underline-offset-4 transition-colors hover:text-nordic">
                  {t.clearFilters}
                </button>
                <button type="submit" className="rounded-lg bg-mosque px-6 py-3 text-sm font-medium text-white shadow-lg shadow-mosque/20 transition-colors hover:bg-nordic">
                  {t.showProperties} →
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function FilterInput({ label, name, defaultValue, placeholder, type }: { label: string; name: string; defaultValue: string; placeholder: string; type: "number" | "text" }) {
  return (
    <label className="rounded-lg bg-[#e7f2fb] p-3 focus-within:ring-2 focus-within:ring-mosque">
      <span className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted">{label}</span>
      <input name={name} defaultValue={defaultValue} placeholder={placeholder} type={type} min={type === "number" ? "0" : undefined} className="w-full border-0 bg-transparent p-0 text-sm font-medium text-nordic outline-none focus:ring-0" />
    </label>
  );
}

function FilterSelect({ label, name, defaultValue, options }: { label: string; name: string; defaultValue: string; options: ReadonlyArray<{ value: string; label: string }> }) {
  return (
    <label className="block">
      <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
      <select name={name} defaultValue={defaultValue} className="w-full rounded-lg border-0 bg-[#e7f2fb] py-3 pl-4 pr-10 text-sm text-nordic outline-none focus:ring-2 focus:ring-mosque">
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}
