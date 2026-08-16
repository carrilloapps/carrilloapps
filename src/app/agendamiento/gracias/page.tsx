"use client"

import Link from "next/link"
import { motion } from "@/lib/motion"
import { CheckCircle, ArrowLeft, Calendar } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { Button } from "@/components/ui/button"
import { SurfaceCard } from "@/components/ui/surface-card"

const STEPS = [
  "Recibirás un email de confirmación con un resumen de tu solicitud.",
  "Te contactaré para proponer una fecha y hora específica.",
  "Una vez confirmada, recibirás los detalles de la reunión (enlace de contacto).",
  "¡Nos reuniremos para discutir tu proyecto y cómo puedo ayudarte!",
] as const

export default function ThankYouPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <DynamicBackground />
      <SiteHeader />

      <main className="relative z-10 container mx-auto px-4 py-16 md:py-24" id="main-content">
        <motion.div
          className="mx-auto max-w-2xl space-y-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-2xl shadow-emerald-500/30"
            >
              <CheckCircle className="h-8 w-8 text-white" aria-hidden="true" />
            </motion.div>
            <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-emerald-300 uppercase">
              Solicitud recibida
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              ¡Gracias por agendar conmigo!
            </h1>
            <p className="text-lg leading-relaxed text-zinc-300">
              Voy a revisar tu solicitud y te respondo en menos de 24 horas con una propuesta de
              fecha.
            </p>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -4 }}
            className="group"
          >
            <SurfaceCard className="text-left">
              <div className="space-y-5 p-6 md:p-8">
                <div className="space-y-1">
                  <p className="text-[11px] font-medium tracking-[0.18em] text-zinc-500 uppercase">
                    Próximos pasos
                  </p>
                  <h2 className="text-lg font-bold text-white md:text-xl">Cómo seguimos</h2>
                </div>
                <ol className="m-0 list-none space-y-3 p-0">
                  {STEPS.map((step, index) => (
                    <li key={step} className="flex items-start gap-3 leading-relaxed text-zinc-300">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-sm font-semibold text-emerald-400 tabular-nums"
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </SurfaceCard>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col justify-center gap-3 pt-2 sm:flex-row"
          >
            <Button variant="glass" size="lg" className="touch-manipulation" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                Volver al inicio
              </Link>
            </Button>
            <Button variant="gradient" size="lg" className="touch-manipulation" asChild>
              <Link href="/recursos">
                <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
                Explorar recursos
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </main>

      <SiteFooter />
    </div>
  )
}
