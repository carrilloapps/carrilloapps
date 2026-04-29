import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "José Carrillo | Senior Software Developer & Tech Leader",
    description:
      "Desarrollador Senior de Software y Líder Técnico especializado en pagos y finanzas. +10 años de experiencia construyendo sistemas empresariales robustos y escalables",
    url: "https://carrillo.app",
    siteName: "José Carrillo",
    images: [
      {
        url: "https://carrillo.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "José Carrillo - Senior Software Developer & Tech Leader",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
}
