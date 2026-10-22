import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Casas SenPro | Encuentra tu hogar",
  description: "Descubre propiedades seleccionadas por Casas SenPro.",
  openGraph: {
    type: "website",
    siteName: "Casas SenPro",
    title: "Casas SenPro | Encuentra tu hogar",
    description: "Descubre propiedades seleccionadas por Casas SenPro.",
    locale: "es_CL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casas SenPro | Encuentra tu hogar",
    description: "Descubre propiedades seleccionadas por Casas SenPro.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="es" className="h-full antialiased"><body className="min-h-full">{children}</body></html>;
}
