import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropertyGallery } from "../../components/property-gallery";
import { PropertyMapLoader } from "../../components/property-map-loader";
import { formatPrice } from "../../data/properties";
import { getPropertyBySlug } from "../../data/property-repository";
import { cookies } from "next/headers";
import { isLocale, translateListing, translations, type Locale } from "../../i18n/config";
import { LanguageSelector } from "../../components/language-selector";
import { AuthProfile } from "../../components/auth-profile";

export const instant = false;

type PropertyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "Propiedad no encontrada | Casas SenPro" };

  return {
    title: `${property.name} | Casas SenPro`,
    description: `${property.name} en ${property.location}. ${formatPrice(property.price)}.`,
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();
  const cookieLocale = (await cookies()).get("casas-senpro-locale")?.value;
  const locale: Locale = isLocale(cookieLocale) ? cookieLocale : "es";
  const t = translations[locale];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-[#b9d8ee] bg-[#e7f2fb]/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="flex w-full items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label={t.backToProperties}>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-nordic text-lg text-white">⌂</span>
            <span className="text-xl font-semibold tracking-tight text-nordic">Casas SenPro</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSelector locale={locale} label={t.language} />
            <AuthProfile label={t.login} />
          </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 pb-20 sm:px-6 lg:px-8">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-mosque hover:text-nordic">← {t.backToProperties}</Link>
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
          <PropertyGallery images={property.images ?? []} name={property.name} locale={locale} />
          <section>
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-hint px-3 py-1 text-xs font-semibold uppercase tracking-wide text-nordic">{translateListing(property.listing, locale)}</span>
              {property.label && <span className="rounded-full bg-mosque/10 px-3 py-1 text-xs font-semibold text-mosque">{property.label}</span>}
            </div>
            <h1 className="text-4xl font-light leading-tight text-nordic">{property.name}</h1>
            <p className="mt-3 text-muted">⌖ {property.location}</p>
            <p className="mt-8 text-3xl font-semibold text-mosque">{formatPrice(property.price)}<span className="text-base font-normal text-muted">{property.priceSuffix}</span></p>
            <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl bg-white p-5 shadow-card">
              <DetailMetric label={t.rooms} value={property.beds} />
              <DetailMetric label={t.bathrooms} value={property.baths} />
              <DetailMetric label={t.area} value={property.area} />
            </div>
            <button type="button" className="mt-8 w-full rounded-xl bg-mosque px-6 py-4 font-medium text-white shadow-lg shadow-mosque/20 transition hover:bg-nordic">
              {t.requestInformation}
            </button>
          </section>
        </div>
        <section className="mt-14">
          <h2 className="mb-4 text-2xl font-light text-nordic">{t.approximateLocation}</h2>
          <p className="mb-5 text-sm text-muted">{t.exactLocationNotice}</p>
          <PropertyMapLoader property={property} locale={locale} />
        </section>
      </main>
    </>
  );
}

function DetailMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-nordic/10 last:border-0">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-semibold text-nordic">{value}</p>
    </div>
  );
}
