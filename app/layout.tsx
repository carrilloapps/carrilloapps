import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { CookieConsent } from "@/components/cookie-consent"
import { WebsiteJsonLd, OrganizationJsonLd, PersonJsonLd } from "@/components/json-ld"
import { PageLoader } from "@/components/page-loader"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SkipLink } from "@/components/skip-link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://carrillo.app"),
  title: {
    default: "José Carrillo | Senior Software Developer & Tech Leader",
    template: "%s | José Carrillo",
  },
  description:
    "Senior Software Developer and Tech Leader specializing in financial and backoffice solutions with over 10 years of experience building enterprise systems.",
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
      "en-US": "/",
      "es-ES": "/es",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://carrillo.app",
    title: "José Carrillo | Senior Software Developer & Tech Leader",
    description:
      "Senior Software Developer and Tech Leader specializing in financial and backoffice solutions with over 10 years of experience building enterprise systems.",
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
      "Senior Software Developer and Tech Leader specializing in financial and backoffice solutions with over 10 years of experience building enterprise systems.",
    creator: "@josecarrillo",
    images: ["https://carrillo.app/twitter-image.jpg"],
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
    generator: 'v0.dev'
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
          <SkipLink />
          <PageLoader />
          <ScrollToTop />
          {children}
          <CookieConsent />
        </ThemeProvider>
        <WebsiteJsonLd />
        <OrganizationJsonLd />
        <PersonJsonLd />
      </body>
    </html>
  )
}
