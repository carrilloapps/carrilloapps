import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { CookieConsent } from "@/components/cookie-consent"
import { WebsiteJsonLd, OrganizationJsonLd, PersonJsonLd } from "@/components/json-ld"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SkipLink } from "@/components/skip-link"
import { PageLoadingProvider } from "@/components/page-loading-context"
import { GlobalPageLoader } from "@/components/global-page-loader"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://carrillo.app"),
  title: {
    default: "José Carrillo | Senior Software Developer & Tech Leader",
    template: "%s | José Carrillo",
  },
  description:
    "Desarrollador Senior de Software y Líder Técnico especializado en pagos y finanzas. +10 años de experiencia construyendo sistemas empresariales robustos y escalables",
  keywords: [
    "José Carrillo",
    "software developer",
    "tech leader",
    "financial systems",
    "backoffice solutions",
    "enterprise software",
    "senior developer",
    "financial technology",
    "fintech",
    "software engineering",
    "technical leadership",
  ],
  authors: [{ name: "José Carrillo", url: "https://carrillo.app" }],
  creator: "José Carrillo",
  publisher: "carrillo.app",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://carrillo.app",
    title: "José Carrillo | Senior Software Developer & Tech Leader",
    description:
      "Desarrollador Senior de Software y Líder Técnico especializado en pagos y finanzas. +10 años de experiencia construyendo sistemas empresariales robustos y escalables",
    siteName: "José Carrillo Portfolio",
    images: [
      {
        url: "https://carrillo.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "José Carrillo - Senior Software Developer & Tech Leader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "José Carrillo | Senior Software Developer & Tech Leader",
    description:
      "Desarrollador Senior de Software y Líder Técnico especializado en pagos y finanzas. +10 años de experiencia construyendo sistemas empresariales robustos y escalables",
    creator: "@carrilloapps",
    images: ["https://carrillo.app/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  generator: '@carrillo.app/v1'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PageLoadingProvider>
            <SkipLink />
            <GlobalPageLoader />
            <ScrollToTop />
            {children}
            <CookieConsent />
          </PageLoadingProvider>
        </ThemeProvider>
        <WebsiteJsonLd />
        <OrganizationJsonLd />
        <PersonJsonLd />
      </body>
    </html>
  )
}
