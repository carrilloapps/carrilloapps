import { Suspense } from "react"
import Link from "next/link"
import { Home, Mail } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { Button } from "@/components/ui/button"

function NotFoundContent() {
  return (
    <div className="relative min-h-screen text-white">
      <DynamicBackground />
      <SiteHeader />

      <main
        className="relative z-10 container flex flex-col items-center justify-center space-y-8 py-20 text-center md:py-28"
        id="main-content"
      >
        <div className="mx-auto max-w-2xl space-y-5">
          <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-amber-300 uppercase">
            Error 404
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            Página no encontrada
          </h1>
          <p className="text-lg leading-relaxed text-zinc-300 md:text-xl">
            Lo sentimos, la página que estás buscando no existe o se movió a otro lugar.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
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
