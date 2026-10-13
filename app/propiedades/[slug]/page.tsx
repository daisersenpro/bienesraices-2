import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropertyGallery } from "../../components/property-gallery";
import { PropertyMapLoader } from "../../components/property-map-loader";
import { formatPrice } from "../../data/properties";
import { getPropertyBySlug } from "../../data/property-repository";

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

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-[#b9d8ee] bg-[#e7f2fb]/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2" aria-label="Volver al inicio de Casas SenPro">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-nordic text-lg text-white">⌂</span>
            <span className="text-xl font-semibold tracking-tight text-nordic">Casas SenPro</span>
          </Link>
        </div>
      </nav>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 pb-20 sm:px-6 lg:px-8">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-mosque hover:text-nordic">← Volver a propiedades</Link>
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
          <PropertyGallery images={property.images ?? []} name={property.name} />
          <section>
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-hint px-3 py-1 text-xs font-semibold uppercase tracking-wide text-nordic">{property.listing}</span>
              {property.label && <span className="rounded-full bg-mosque/10 px-3 py-1 text-xs font-semibold text-mosque">{property.label}</span>}
            </div>
            <h1 className="text-4xl font-light leading-tight text-nordic">{property.name}</h1>
            <p className="mt-3 text-muted">⌖ {property.location}</p>
            <p className="mt-8 text-3xl font-semibold text-mosque">{formatPrice(property.price)}<span className="text-base font-normal text-muted">{property.priceSuffix}</span></p>
            <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl bg-white p-5 shadow-card">
              <DetailMetric label="Habitaciones" value={property.beds} />
              <DetailMetric label="Baños" value={property.baths} />
              <DetailMetric label="Superficie" value={property.area} />
            </div>
            <button type="button" className="mt-8 w-full rounded-xl bg-mosque px-6 py-4 font-medium text-white shadow-lg shadow-mosque/20 transition hover:bg-nordic">
              Solicitar información
            </button>
          </section>
        </div>
        <section className="mt-14">
          <h2 className="mb-4 text-2xl font-light text-nordic">Ubicación aproximada</h2>
          <p className="mb-5 text-sm text-muted">La ubicación exacta se comparte durante el proceso de visita.</p>
          <PropertyMapLoader property={property} />
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
