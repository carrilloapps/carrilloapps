import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { WebsiteJsonLd, OrganizationJsonLd, PersonJsonLd } from "@/components/json-ld"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SkipLink } from "@/components/skip-link"
import { PageLoadingProvider } from "@/components/page-loading-context"
import { MotionPreferencesProvider } from "@/components/motion-preferences-provider"
import { Providers } from "@/components/providers"
import { GlobalPageLoader } from "@/components/global-page-loader"
import { Toaster } from "@/components/ui/sonner"
import { DynamicCookieConsent } from "@/components/dynamic-imports"
import { DeferCSS } from "@/app/defer-css"
import { GoogleAnalytics, MicrosoftClarity } from "@/components/analytics"
import { getSiteUrl } from "@/lib/env"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true, // Enable preloading for optimal font loading
  adjustFontFallback: true,
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
})

const SITE_URL = getSiteUrl()
const SITE_NAME = "Junior Carrillo"
const SITE_TITLE = "Junior Carrillo | Senior Software Developer & Tech Leader"
const SITE_DESCRIPTION =
  "Desarrollador Senior y Líder Técnico especializado en pagos y finanzas. +10 años construyendo sistemas empresariales robustos y escalables para LATAM."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Junior Carrillo",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Junior Carrillo", url: SITE_URL }],
  creator: "Junior Carrillo",
  publisher: "Junior Carrillo",
  category: "Technology",
  // Keywords del home — no son determinantes para Google pero sí para
  // Bing/DuckDuckGo y para que el documento HTML refleje los términos
  // por los que queremos rankear. Mantener bajo 10 términos.
  keywords: [
    "tech leader colombia",
    "senior software developer",
    "consultor sistemas de pago",
    "desarrollador fintech latam",
    "arquitecto microservicios",
    "open banking developer",
    "líder técnico medellín",
    "consultoría backoffice",
    "Junior Carrillo",
  ],
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-CO": "/",
      "x-default": "/",
    },
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "profile",
    locale: "es_CO",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    firstName: "José",
    lastName: "Carrillo",
    username: "carrilloapps",
    // Image alt explícita — Next inyecta /opengraph-image automático,
    // pero el alt text se pierde si no lo declaramos a mano.
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "carrillo.app — Junior Carrillo, Senior Software Developer & Tech Leader",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@carrilloapps",
    creator: "@carrilloapps",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        alt: "carrillo.app — Junior Carrillo, Senior Software Developer & Tech Leader",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/icons/192.png", sizes: "192x192" },
  },
  manifest: "/manifest.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-CO" suppressHydrationWarning>
      <head>
        {/* DNS prefetch and preconnect for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://blog.carrillo.app" />
        <link rel="dns-prefetch" href="https://api.github.com" />

        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Meta tags para PWA */}
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="carrillo.app" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Junior Carrillo" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <MotionPreferencesProvider>
              <PageLoadingProvider>
                <SkipLink />
                <GlobalPageLoader />
                <ScrollToTop />
                {children}
                <DynamicCookieConsent />
                <Toaster richColors closeButton position="bottom-right" theme="dark" />
              </PageLoadingProvider>
            </MotionPreferencesProvider>
          </ThemeProvider>
        </Providers>
        <WebsiteJsonLd />
        <OrganizationJsonLd />
        <PersonJsonLd />
        <GoogleAnalytics />
        <MicrosoftClarity />
        <DeferCSS />
      </body>
    </html>
  )
}
