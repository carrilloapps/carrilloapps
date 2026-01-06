import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { WebsiteJsonLd, OrganizationJsonLd, PersonJsonLd } from "@/components/json-ld"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SkipLink } from "@/components/skip-link"
import { PageLoadingProvider } from "@/components/page-loading-context"
import { GlobalPageLoader } from "@/components/global-page-loader"
import { DynamicCookieConsent } from "@/components/dynamic-imports"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
})

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
    "tech leader",
    "yummy inc",
    "software developer",
    "senior developer",
    "odoo",
    "medios de pagos",
    "procesadores de pago",
    "open banking",
    "fintech",
    "software engineering",
    "technical leadership",
    "arquitectura microservicios",
    "sistemas financieros",
    "backoffice financiero",
    "mentoría técnica",
  ],
  authors: [{ name: "José Carrillo", url: "https://carrillo.app" }],
  creator: "José Carrillo",
  publisher: "carrillo.app",
  category: "Technology",
  classification: "Business",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-CO": "/es-CO",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://avatars.githubusercontent.com" />
        <link rel="preconnect" href="https://miro.medium.com" />
        <link rel="dns-prefetch" href="https://miro.medium.com" />
        <link rel="preconnect" href="https://cdn-images-1.medium.com" />
        <link rel="dns-prefetch" href="https://cdn-images-1.medium.com" />
        
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
          <PageLoadingProvider>
            <SkipLink />
            <GlobalPageLoader />
            <ScrollToTop />
            {children}
            <DynamicCookieConsent />
          </PageLoadingProvider>
        </ThemeProvider>
        <WebsiteJsonLd />
        <OrganizationJsonLd />
        <PersonJsonLd />
      </body>
    </html>
  )
}
