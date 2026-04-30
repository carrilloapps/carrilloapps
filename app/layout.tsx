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
import { GlobalPageLoader } from "@/components/global-page-loader"
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
const SITE_NAME = "José Carrillo"
const SITE_TITLE = "José Carrillo | Senior Software Developer & Tech Leader"
const SITE_DESCRIPTION =
  "Desarrollador Senior de Software y Líder Técnico especializado en pagos y finanzas. +10 años de experiencia construyendo sistemas empresariales robustos y escalables."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | José Carrillo",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "José Carrillo", url: SITE_URL }],
  creator: "José Carrillo",
  publisher: "José Carrillo",
  category: "Technology",
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
  },
  twitter: {
    card: "summary_large_image",
    site: "@carrilloapps",
    creator: "@carrilloapps",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
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
    <html lang="es" suppressHydrationWarning>
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
        <meta name="application-name" content="José Carrillo" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <MotionPreferencesProvider>
            <PageLoadingProvider>
              <SkipLink />
              <GlobalPageLoader />
              <ScrollToTop />
              {children}
              <DynamicCookieConsent />
            </PageLoadingProvider>
          </MotionPreferencesProvider>
        </ThemeProvider>
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
