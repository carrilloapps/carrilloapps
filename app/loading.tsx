import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 min-h-[70vh] flex items-center justify-center" id="main-content">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
          <h1 className="text-2xl font-bold">Cargando...</h1>
          <p className="text-zinc-400">Por favor, espere mientras cargamos el contenido.</p>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
