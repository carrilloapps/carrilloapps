import { Suspense } from "react"
import Link from "next/link"
import { Home, Mail } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { Button } from "@/components/ui/button"

function NotFoundContent() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <DynamicBackground />
      <SiteHeader />

      <main
        className="container py-20 md:py-28 flex flex-col items-center justify-center text-center space-y-8 relative z-10"
        id="main-content"
      >
        <div className="space-y-5 max-w-2xl mx-auto">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.18em] text-amber-300 bg-amber-500/10 border border-amber-500/30">
            Error 404
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            Página no encontrada
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
            Lo sentimos, la página que estás buscando no existe o se movió a
            otro lugar.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button variant="gradient" size="lg" className="touch-manipulation" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" aria-hidden="true" />
              Volver al inicio
            </Link>
          </Button>
          <Button variant="glass" size="lg" className="touch-manipulation" asChild>
            <Link href="/contacto">
              <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
              Solicitar contacto
            </Link>
          </Button>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export default function NotFound() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <NotFoundContent />
    </Suspense>
  )
}
