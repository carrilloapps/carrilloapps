import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "José Carrillo | Senior Software Developer & Tech Leader",
    description:
      "Senior Software Developer and Tech Leader specializing in financial and backoffice solutions with over 10 years of experience building enterprise systems.",
    url: "https://carrillo.app",
    siteName: "José Carrillo Portfolio",
    images: [
      {
        url: "https://carrillo.app/home-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "José Carrillo - Senior Software Developer & Tech Leader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}
