"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, ArrowLeft, Calendar } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
            className="flex justify-center"
          >
            <div className="w-24 h-24 rounded-full bg-blue-600/20 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">¡Solicitud Recibida!</h1>
            <p className="text-xl text-zinc-400">
              Gracias por solicitar una consulta. He recibido tu información y me pondré en contacto contigo dentro de
              las próximas 24-48 horas para confirmar los detalles de nuestra reunión.
            </p>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold">Próximos Pasos</h2>
                <ul className="space-y-3 text-zinc-400">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">1.</span>
                    Recibirás un email de confirmación con un resumen de tu solicitud.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">2.</span>
                    Te contactaré para proponer una fecha y hora específica para nuestra consulta.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">3.</span>
                    Una vez confirmada, recibirás los detalles de la reunión (enlace de Zoom o información de contacto).
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">4.</span>
                    ¡Nos reuniremos para discutir tu proyecto y cómo puedo ayudarte!
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Link>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/resources">
                <Calendar className="mr-2 h-4 w-4" />
                Explorar Recursos
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </main>

      <SiteFooter />
    </div>
  )
}
