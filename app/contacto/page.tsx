"use client"

import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Send, Clock, Globe, MessageSquare, HelpCircle, Settings, Code, Shield, Share2 } from "lucide-react"
import { motion, type Variants } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      <SiteHeader />

      <main className="container py-12 space-y-16 relative z-10">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="py-12 md:py-24 space-y-12"
        >
          <motion.div variants={itemVariants} className="space-y-6 text-center relative">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-emerald-600/20 text-emerald-400 border-emerald-500/30 px-4 py-2">
                <Mail className="w-4 h-4 mr-2" />
                Disponible para nuevos proyectos
              </Badge>
            </div>


            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
            >
              Hablemos
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
            >
              ¿Tienes un proyecto en mente? Me encantaría conocer más sobre tu visión y cómo puedo ayudarte a hacerla realidad.
            </motion.p>

            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 to-zinc-900/30 -z-10" />
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="bg-zinc-900/90 border-zinc-800/50 backdrop-blur-sm relative overflow-hidden group">
                {/* Card Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-blue-500/30">
                      <Send className="w-5 h-5 text-blue-400" />
                    </div>
                    <CardTitle className="text-2xl bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                      Envíame un mensaje
                    </CardTitle>
                  </div>
                  <CardDescription className="text-zinc-400">
                    Completa el formulario y te responderé lo antes posible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Nombre</label>
                      <Input
                        placeholder="Tu nombre"
                        className="bg-zinc-800/50 border-zinc-700/50 focus:border-blue-500/50 transition-colors duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Email</label>
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        className="bg-zinc-800/50 border-zinc-700/50 focus:border-blue-500/50 transition-colors duration-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Asunto</label>
                    <Input
                      placeholder="¿En qué puedo ayudarte?"
                      className="bg-zinc-800/50 border-zinc-700/50 focus:border-blue-500/50 transition-colors duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Mensaje</label>
                    <Textarea
                      placeholder="Cuéntame más sobre tu proyecto..."
                      className="bg-zinc-800/50 border-zinc-700/50 focus:border-blue-500/50 transition-colors duration-300 min-h-[120px]"
                      rows={5}
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-300">
                      <Send className="w-4 h-4 mr-2" />
                      Enviar mensaje
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="space-y-8">
              <motion.div variants={cardVariants} whileHover="hover">
                <Card className="bg-zinc-900/90 border-zinc-800/50 backdrop-blur-sm relative overflow-hidden group">
                  {/* Card Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-600/20 to-blue-600/20 flex items-center justify-center border border-emerald-500/30">
                        <Phone className="w-5 h-5 text-emerald-400" />
                      </div>
                      <CardTitle className="text-2xl bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                        Información de Contacto
                      </CardTitle>
                    </div>
                    <CardDescription className="text-zinc-400">
                      Estoy disponible para ti a través de cualquiera de estos canales.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 relative z-10">
                    <motion.div
                      className="flex items-start space-x-4 p-4 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/50 transition-all duration-300 group/item"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 flex items-center justify-center border border-blue-500/30 group-hover/item:scale-110 transition-transform duration-300">
                        <Mail className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <p className="font-semibold text-white">Correo electrónico</p>
                        <p className="text-zinc-300 font-mono">m@carrilloa.app</p>
                        <div className="flex items-center gap-2 text-zinc-500 text-sm">
                          <Clock className="w-3 h-3" />
                          <span>Respuesta garantizada en menos de 24 horas</span>
                        </div>
                      </div>
                    </motion.div>

                    <Separator className="my-6 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

                    <motion.div
                      className="flex items-start space-x-4 p-4 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/50 transition-all duration-300 group/item"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-600/20 to-teal-600/20 flex items-center justify-center border border-emerald-500/30 group-hover/item:scale-110 transition-transform duration-300">
                        <Phone className="h-6 w-6 text-emerald-400" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <p className="font-semibold text-white">Teléfono</p>
                        <p className="text-zinc-300 font-mono">+57 (300) 332 8389</p>
                        <div className="flex items-center gap-2 text-zinc-500 text-sm">
                          <Clock className="w-3 h-3" />
                          <span>Disponible Lun-Vie, 9:00-18:00 Colombia</span>
                        </div>
                      </div>
                    </motion.div>

                    <Separator className="my-6 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

                    <motion.div
                      className="flex items-start space-x-4 p-4 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/50 transition-all duration-300 group/item"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center border border-purple-500/30 group-hover/item:scale-110 transition-transform duration-300">
                        <MapPin className="h-6 w-6 text-purple-400" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <p className="font-semibold text-white">Ubicación</p>
                        <p className="text-zinc-300">Medellín, Colombia</p>
                        <div className="flex items-center gap-2 text-zinc-500 text-sm">
                          <Globe className="w-3 h-3" />
                          <span>Disponible para trabajo remoto internacional</span>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={cardVariants} whileHover="hover">
                <Card className="bg-zinc-900/90 border-zinc-800/50 backdrop-blur-sm relative overflow-hidden group">
                  {/* Card Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center border border-purple-500/30">
                        <Globe className="w-5 h-5 text-purple-400" />
                      </div>
                      <CardTitle className="text-2xl bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                        Mis Redes Sociales
                      </CardTitle>
                    </div>
                    <CardDescription className="text-zinc-400">
                      Conéctate conmigo o explora mi trabajo en línea.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="grid grid-cols-3 gap-4">
                      <motion.a
                        href="https://github.com/carrilloapps"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/50 transition-all duration-300 group/social border border-zinc-700/30 hover:border-purple-500/30"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center border border-purple-500/30 group-hover/social:scale-110 transition-transform duration-300 mb-3">
                          <Github className="h-6 w-6 text-purple-400" />
                        </div>
                        <span className="text-sm font-medium text-zinc-300 group-hover/social:text-white transition-colors duration-300">GitHub</span>
                      </motion.a>
                      <motion.a
                        href="https://linkedin.com/in/carrilloapps"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/50 transition-all duration-300 group/social border border-zinc-700/30 hover:border-blue-500/30"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 flex items-center justify-center border border-blue-500/30 group-hover/social:scale-110 transition-transform duration-300 mb-3">
                          <Linkedin className="h-6 w-6 text-blue-400" />
                        </div>
                        <span className="text-sm font-medium text-zinc-300 group-hover/social:text-white transition-colors duration-300">LinkedIn</span>
                      </motion.a>
                      <motion.a
                        href="https://twitter.com/carrilloapps"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/50 transition-all duration-300 group/social border border-zinc-700/30 hover:border-cyan-500/30"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-600/20 to-teal-600/20 flex items-center justify-center border border-cyan-500/30 group-hover/social:scale-110 transition-transform duration-300 mb-3">
                          <Twitter className="h-6 w-6 text-cyan-400" />
                        </div>
                        <span className="text-sm font-medium text-zinc-300 group-hover/social:text-white transition-colors duration-300">Twitter</span>
                      </motion.a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="py-16 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 to-zinc-900/30" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-600/10 to-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-600/20 to-blue-600/20 flex items-center justify-center border border-emerald-500/30">
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  Preguntas Frecuentes
                </h2>
              </div>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                Aquí encontrarás respuestas a las dudas más comunes. Si tienes alguna pregunta adicional, no dudes en contactarme directamente.
              </p>
            </motion.div>

            <motion.div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto" variants={itemVariants}>
              <motion.div variants={cardVariants} whileHover="hover">
                <Card className="bg-zinc-900/90 border-zinc-800/50 backdrop-blur-sm h-full relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                        <Globe className="w-5 h-5 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">¿Qué servicios ofreces?</h3>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">
                      Me especializo en desarrollo de software financiero, liderazgo técnico, diseño de arquitectura y
                      soluciones de automatización de backoffice. Puedo ayudarte tanto con el desarrollo como con la
                      orientación técnica estratégica.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={cardVariants} whileHover="hover">
                <Card className="bg-zinc-900/90 border-zinc-800/50 backdrop-blur-sm h-full relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-600/20 to-blue-600/20 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                        <Globe className="w-5 h-5 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">¿Trabajas con clientes internacionales?</h3>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">
                      Sí, trabajo con clientes de todo el mundo. Gracias a las herramientas modernas de colaboración
                      y una programación flexible, puedo adaptarme a diferentes zonas horarias y modalidades de trabajo.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={cardVariants} whileHover="hover">
                <Card className="bg-zinc-900/90 border-zinc-800/50 backdrop-blur-sm h-full relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center border border-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                        <Clock className="w-5 h-5 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">¿Cuál es tu cronograma típico de proyecto?</h3>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">
                      Los tiempos varían según el alcance y la complejidad. Proyectos pequeños pueden tomar de 2 a 4 semanas,
                      mientras que soluciones empresariales más grandes pueden extenderse varios meses. Proporciono
                      cronogramas detallados durante las consultas iniciales.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={cardVariants} whileHover="hover">
                <Card className="bg-zinc-900/90 border-zinc-800/50 backdrop-blur-sm h-full relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-600/20 to-teal-600/20 flex items-center justify-center border border-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                        <Send className="w-5 h-5 text-cyan-400" />
                      </div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">¿Cómo manejas la gestión de proyectos?</h3>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">
                      Utilizo metodologías ágiles con seguimientos regulares y actualizaciones de progreso. Me adapto a
                      herramientas como Jira, Trello o Asana según tus preferencias, garantizando una comunicación
                      transparente durante todo el proceso.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  )
}
