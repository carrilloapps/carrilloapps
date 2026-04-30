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
    <div className="min-h-screen text-white relative overflow-hidden">
      <DynamicBackground />
      <SiteHeader />

      <main className="container mx-auto px-4 py-16 md:py-24 relative z-10" id="main-content">
        <motion.div
          className="max-w-2xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-2xl shadow-emerald-500/30"
            >
              <CheckCircle className="w-8 h-8 text-white" aria-hidden="true" />
            </motion.div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300 bg-emerald-500/10 border border-emerald-500/30">
              Solicitud recibida
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              ¡Gracias por agendar conmigo!
            </h1>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Voy a revisar tu solicitud y te respondo en menos de 24 horas con una propuesta de fecha.
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
              <div className="p-6 md:p-8 space-y-5">
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
                    Próximos pasos
                  </p>
                  <h2 className="text-lg md:text-xl font-bold text-white">
                    Cómo seguimos
                  </h2>
                </div>
                <ol className="space-y-3 list-none p-0 m-0">
                  {STEPS.map((step, index) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 text-zinc-300 leading-relaxed"
                    >
                      <span
                        className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-sm font-semibold text-blue-300 tabular-nums"
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
            className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
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
