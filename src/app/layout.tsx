import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Archivo, JetBrains_Mono } from "next/font/google"

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

// The ledger's two voices. Archivo is a press grotesque built for dense,
// functional setting — it holds a document header at 6rem and a table label at
// 11px without changing character. JetBrains Mono carries every figure, install
// command and timestamp; monospace here is measurement, not costume.
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  variable: "--font-archivo",
  axes: ["wdth"],
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  variable: "--font-mono-ledger",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
})

const SITE_URL = getSiteUrl()
const SITE_NAME = "Junior Carrillo"
// Google measures snippets in pixels, not characters: ~580px of title in Arial
// bold 20 and ~920px of description in Arial 13. Spanish runs wide — accents,
// long words — so a 155-character description that looks safe by count lands at
// 1024px and gets cut mid-sentence. Measure, do not count. See docs/SEO.md.
const SITE_TITLE = "Junior Carrillo | Tech Leader en pagos y fintech"
const SITE_DESCRIPTION =
  "Tech Leader en pagos de alta transaccionalidad en LATAM. Herramientas de código abierto en npm y escritura técnica."

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
        alt: "carrillo.app — Junior Carrillo, Tech Leader en pagos e infraestructura financiera",
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
        alt: "carrillo.app — Junior Carrillo, Tech Leader en pagos e infraestructura financiera",
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
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  manifest: "/manifest.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // `data-scroll-behavior` is not decoration: globals.css sets
  // `scroll-behavior: smooth` on <html>, and without this attribute Next cannot
  // tell that a route transition's jump-to-top is being animated — so every
  // navigation smooth-scrolls the whole page instead of landing at the top.
  // Declaring it lets Next suppress the animation for that one jump while
  // in-page anchors keep gliding.
  return (
    <html lang="es-CO" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/*
          dns-prefetch only. Every origin here is contacted *after* load —
          analytics are deferred, Substack and GitHub are fetched by route
          handlers on interaction — so resolving DNS early is the whole benefit
          and a preconnect would hold open a socket nothing uses in the load
          window. Lighthouse flagged all four preconnects as unused.

          The two Google Fonts origins are gone entirely: `next/font/google`
          self-hosts Archivo and JetBrains Mono from /_next/static at build
          time, so the browser never talks to fonts.googleapis.com or
          fonts.gstatic.com at all.
        */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://carrilloapps.substack.com" />
        <link rel="dns-prefetch" href="https://api.github.com" />

        {/* Meta tags para PWA */}
        <meta name="theme-color" content="#0b0c0e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="carrillo.app" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="carrillo.app" />
        <meta name="msapplication-TileColor" content="#0b0c0e" />
      </head>
      <body className={`${archivo.variable} ${jetbrainsMono.variable} font-sans`}>
        {/*
          THESIS: This site is a settlement ledger — every repository, post and
          production figure is an entry with its column, its date and its
          quantity. It refuses the centered portrait hero with two buttons; a
          portrait does not open an accounting entry.
          OWN-WORLD: Ink ground #0B0C0E, inverted-paper text #E8E6E1, 1px
          hairline rules #2A2D33, one validation-stamp red #C4362F confined to
          rules and state marks. Archivo for setting, JetBrains Mono for every
          figure. No cards, no gradients, no glass — rules and columns only.
          STORY: A developer arriving from a post believes this code is usable
          today, copies an install command, and subscribes.
          FIRST VIEWPORT: Document header (name, role, period) over the primary
          entry — three installable tools, install command left, downloads right
          in tabular figures, hairline between each. Primary action at the foot,
          as the total line.
          FORM: Settlement ledger, candidate 3 of 7 by resonance, seed 50449e74.
          FINISH: unreviewed and undocumented is unfinished; this build ends with
          the finish review, the verdict, DESIGN.md, and every shipping raster
          carrying its provenance.
        */}
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
