import { PropertyCard } from "./components/property-card";
import { PropertyFilters } from "./components/property-filters";
import { LanguageSelector } from "./components/language-selector";
import Link from "next/link";
import { cookies } from "next/headers";
import { formatPrice, type Property } from "./data/properties";
import { getFeaturedProperties, getProperties } from "./data/property-repository";
import { isLocale, translations, type Locale } from "./i18n/config";

export const instant = false;

const categories = [
  { value: "All", translation: "all" },
  { value: "House", translation: "houses" },
  { value: "Apartment", translation: "apartments" },
  { value: "Villa", translation: "villas" },
  { value: "Penthouse", translation: "penthouses" },
] as const;
type Category = (typeof categories)[number]["value"];

type SearchParams = Promise<{
  page?: string;
  tipo?: string;
  busqueda?: string;
  ubicacion?: string;
  precioMinimo?: string;
  precioMaximo?: string;
  operacion?: string;
  dormitorios?: string;
  banos?: string;
}>;

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("casas-senpro-locale")?.value;
  const locale: Locale = isLocale(cookieLocale) ? cookieLocale : "es";
  const t = translations[locale];
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);
  const selectedType = categories.some((item) => item.value === params.tipo)
    ? (params.tipo as Category)
    : "All";
  const query = params.busqueda?.trim() ?? "";
  const location = params.ubicacion?.trim() ?? "";
  const minPrice = parsePositiveNumber(params.precioMinimo);
  const maxPrice = parsePositiveNumber(params.precioMaximo);
  const minBedrooms = parsePositiveNumber(params.dormitorios);
  const minBathrooms = parsePositiveNumber(params.banos);
  const listing = params.operacion === "En venta" || params.operacion === "En alquiler"
    ? params.operacion
    : undefined;
  const type = selectedType === "All" ? undefined : selectedType;
  const activeFilters = {
    ubicacion: location,
    precioMinimo: params.precioMinimo ?? "",
    precioMaximo: params.precioMaximo ?? "",
    operacion: listing ?? "",
    dormitorios: params.dormitorios ?? "",
    banos: params.banos ?? "",
  };
  const [{ properties, total, pageSize }, featuredProperties] = await Promise.all([
    getProperties({ page, type, query, location, listing, minPrice, maxPrice, minBedrooms, minBathrooms }),
    getFeaturedProperties(),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-[#b9d8ee] bg-[#e7f2fb]/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2" aria-label="Volver al inicio de Casas SenPro">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-nordic text-lg text-white">⌂</span>
            <span className="text-xl font-semibold tracking-tight text-nordic">Casas SenPro</span>
          </Link>
          <div className="hidden items-center space-x-8 md:flex">
            <a href="#" className="border-b-2 border-mosque px-1 py-1 text-sm font-medium text-mosque">{t.buy}</a>
            <a href="#new-in-market" className="px-1 py-1 text-sm font-medium text-nordic/70 transition-colors hover:text-nordic">{t.rent}</a>
            <a href="#" className="px-1 py-1 text-sm font-medium text-nordic/70 transition-colors hover:text-nordic">{t.sell}</a>
            <a href="#" className="px-1 py-1 text-sm font-medium text-nordic/70 transition-colors hover:text-nordic">{t.favorites}</a>
          </div>
          <div className="flex items-center gap-3 text-xl text-nordic">
            <LanguageSelector locale={locale} label={t.language} />
            <button type="button" aria-label={t.search}>⌕</button>
            <button type="button" aria-label={t.notifications} className="relative">♧<span className="absolute -right-1 top-0 h-2 w-2 rounded-full bg-red-500" /></button>
            <button type="button" aria-label={t.profile} className="hidden h-9 w-9 items-center justify-center rounded-full bg-hint text-sm font-semibold sm:flex">CS</button>
          </div>
        </div>
      </nav>
      <main className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <h1 className="text-4xl font-light leading-tight tracking-tight text-nordic md:text-5xl lg:text-6xl">
            {t.headlineStart}{" "}
            <span className="relative inline-block">
              <span className="relative z-10 font-medium">{t.headlineHighlight}</span>
              <span className="absolute bottom-2 left-0 z-0 h-3 w-full -rotate-1 bg-mosque/20" />
            </span>
            .
          </h1>
          <form action="/" className="relative mx-auto max-w-2xl">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-2xl text-muted">
              ⌕
            </span>
            <input
              name="busqueda"
              defaultValue={query}
              className="block w-full rounded-xl border-0 bg-white py-4 pl-12 pr-32 text-lg text-nordic shadow-soft outline-none placeholder:text-muted/60 focus:ring-2 focus:ring-mosque"
              placeholder={t.searchPlaceholder}
              aria-label={t.search}
            />
            {selectedType !== "All" && <input type="hidden" name="tipo" value={selectedType} />}
            {Object.entries(activeFilters).map(([name, value]) => value && <input key={name} type="hidden" name={name} value={value} />)}
            <button
              type="submit"
              className="absolute inset-y-2 right-2 rounded-lg bg-mosque px-6 font-medium text-white shadow-lg shadow-mosque/20 transition-colors hover:bg-nordic"
            >
              {t.search}
            </button>
          </form>
          <div className="hide-scroll flex items-center justify-start gap-3 overflow-x-auto py-2 px-1 sm:justify-center">
            {categories.map((item) => (
              <Link
                key={item.value}
                href={categoryHref(item.value, query, activeFilters)}
                aria-current={selectedType === item.value ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  selectedType === item.value
                    ? "bg-nordic text-white shadow-lg shadow-nordic/10"
                    : "border border-nordic/10 bg-white text-muted hover:border-mosque/50 hover:text-nordic"
                }`}
              >
                {t[item.translation]}
              </Link>
            ))}
            <span className="mx-2 h-6 w-px shrink-0 bg-nordic/10" />
            <PropertyFilters initialValues={{
              ubicacion: location,
              precioMinimo: params.precioMinimo ?? "",
              precioMaximo: params.precioMaximo ?? "",
              tipo: selectedType === "All" ? "" : selectedType,
              operacion: listing ?? "",
              dormitorios: params.dormitorios ?? "",
              banos: params.banos ?? "",
            }} />
          </div>
        </div>
      </section>

      <section className="mb-16">
        <SectionHeading title={t.featured} description={t.featuredDescription} linkText={t.viewAll} />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {featuredProperties.map((property) => (
            <FeaturedProperty key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section id="new-in-market">
        <SectionHeading title={t.marketNews} description={t.marketNewsDescription} />
        <div className="mb-6 flex gap-1 rounded-lg bg-white p-1 md:hidden">
          <span className="rounded-md bg-nordic px-4 py-1.5 text-sm font-medium text-white">{t.all}</span>
          <span className="px-4 py-1.5 text-sm font-medium text-muted">{t.buy}</span>
          <span className="px-4 py-1.5 text-sm font-medium text-muted">{t.rent}</span>
        </div>
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-card">
            <p className="font-medium text-nordic">{t.noProperties}</p>
            <p className="mt-1 text-sm text-muted">{t.noPropertiesDescription}</p>
          </div>
        )}
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            type={selectedType}
            query={query}
            filters={activeFilters}
            labels={{ previous: t.previous, next: t.next, page: t.page, of: t.of }}
          />
        )}
      </section>
      </main>
    </>
  );
}

function parsePositiveNumber(value: string | undefined) {
  if (!value) return undefined;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : undefined;
}

function categoryHref(category: Category, query: string, filters: Record<string, string>) {
  const params = new URLSearchParams();
  if (category !== "All") params.set("tipo", category);
  if (query) params.set("busqueda", query);
  for (const [key, value] of Object.entries(filters)) {
    if (key !== "tipo" && value) params.set(key, value);
  }
  const search = params.toString();
  return search ? `/?${search}` : "/";
}

function SectionHeading({ title, description, linkText }: { title: string; description: string; linkText?: string }) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <h2 className="text-2xl font-light text-nordic">{title}</h2>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
      {linkText && <button type="button" className="hidden items-center gap-1 text-sm font-medium text-mosque transition-opacity hover:opacity-70 sm:flex">{linkText} →</button>}
    </div>
  );
}

function FeaturedProperty({ property }: { property: Property }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link href={`/propiedades/${property.slug}`} aria-label={`Ver ${property.name}`}>
          <img src={property.image} alt={`${property.name}, ${property.location}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </Link>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-nordic">{property.label}</span>
        <span className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-medium text-nordic transition-colors group-hover:text-mosque">
              <Link href={`/propiedades/${property.slug}`}>{property.name}</Link>
            </h3>
            <p className="mt-1 text-sm text-muted">⌖ {property.location}</p>
          </div>
          <span className="text-right text-xl font-semibold text-mosque">{formatPrice(property.price)}</span>
        </div>
        <div className="mt-6 flex items-center gap-4 border-t border-nordic/10 pt-6 text-sm text-muted sm:gap-6">
          <span>⌂ {property.beds}</span>
          <span>◉ {property.baths}</span>
          <span>□ {property.area}</span>
        </div>
      </div>
    </article>
  );
}

function Pagination({
  page,
  totalPages,
  type,
  query,
  filters,
  labels,
}: {
  page: number;
  totalPages: number;
  type: Category;
  query: string;
  filters: Record<string, string>;
  labels: { previous: string; next: string; page: string; of: string };
}) {
  const link = (nextPage: number) => {
    const params = new URLSearchParams();
    if (nextPage > 1) params.set("page", String(nextPage));
    if (type !== "All") params.set("tipo", type);
    if (query) params.set("busqueda", query);
    for (const [key, value] of Object.entries(filters)) {
      if (value) params.set(key, value);
    }
    const search = params.toString();
    return search ? `/?${search}` : "/";
  };

  return (
    <nav aria-label="Paginación de propiedades" className="mt-10 flex items-center justify-center gap-2">
      {page > 1 && <a href={link(page - 1)} className="rounded-lg border border-nordic/10 bg-white px-4 py-2 text-sm font-medium text-nordic hover:border-mosque">{labels.previous}</a>}
      <span className="px-4 text-sm text-muted">{labels.page} {page} {labels.of} {totalPages}</span>
      {page < totalPages && <a href={link(page + 1)} className="rounded-lg bg-mosque px-4 py-2 text-sm font-medium text-white hover:bg-nordic">{labels.next}</a>}
    </nav>
  );
}
