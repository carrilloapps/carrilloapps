import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/providers/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { DonationWindow } from '@/components/donation-window'
import { SharedMetadata } from "@/app/shared-metadata";
import { CookieConsent } from '@/components/cookie-consent'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Metadata } from "next";
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  ...SharedMetadata,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" prefix="og: https://ogp.me/ns#" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col">
              <div className="container w-full max-w-7xl mx-auto py-4">
                <Breadcrumbs />
              </div>
              <div className="container w-full max-w-7xl mx-auto py-8">
                {children}
              </div>
            </main>
            <Footer />
            <DonationWindow />
            <CookieConsent />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

