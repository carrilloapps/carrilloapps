"use client"

import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"

// Componente interno que maneja la lógica de la página 404
function NotFoundContent() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-16 md:py-24 flex flex-col items-center justify-center text-center space-y-8">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-3xl font-bold tracking-tight">404 - Página no encontrada</h1>
          <p className="text-xl text-zinc-400">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Volver al inicio
            </Link>
          </Button>
          <Button variant="outline" className="border-zinc-700 hover:bg-zinc-900" asChild>
            <Link href="/contacto">Solicitar contacto</Link>
          </Button>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

// Componente principal que envuelve el contenido en Suspense
export default function NotFound() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black"></div>}>
      <NotFoundContent />
    </Suspense>
  )
}