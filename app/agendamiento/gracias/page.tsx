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
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      {/* Global Background Elements */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="fixed inset-0 -z-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-zinc-950/40 to-zinc-950" />
      </div>
      
      <SiteHeader />

      <main className="container mx-auto px-4 py-16 relative">
        <motion.div
          className="max-w-2xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/25"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent select-text">
              ¡Solicitud Enviada!
            </h1>
            <p className="text-xl text-zinc-400">
              Gracias por tu interés en agendar una consulta conmigo.
            </p>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.6 }}
            whileHover={{ y: -8 }}
          >
            <Card className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden group">
              {/* Card Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-6 space-y-4 relative">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent select-text">Próximos pasos</h2>
                <ul className="space-y-3 text-zinc-400">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5 shadow-lg shadow-blue-500/25">
                      <span className="text-white text-sm font-medium">1</span>
                    </div>
                    Recibirás un email de confirmación con un resumen de tu solicitud.
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5 shadow-lg shadow-blue-500/25">
                      <span className="text-white text-sm font-medium">2</span>
                    </div>
                    Te contactaré para proponer una fecha y hora específica.
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5 shadow-lg shadow-blue-500/25">
                      <span className="text-white text-sm font-medium">3</span>
                    </div>
                    Una vez confirmada, recibirás los detalles de la reunión (enlace de contacto).
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5 shadow-lg shadow-blue-500/25">
                      <span className="text-white text-sm font-medium">4</span>
                    </div>
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="border-zinc-700/50 hover:bg-zinc-800/50 backdrop-blur-sm hover:border-zinc-600/70 transition-all duration-300" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al inicio
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/25 transition-all duration-300" asChild>
                <Link href="/recursos">
                  <Calendar className="mr-2 h-4 w-4" />
                  Explorar recursos
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      <SiteFooter />
    </div>
  )
}
