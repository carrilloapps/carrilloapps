"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, Clock, CheckCircle, AlertCircle, ArrowRight, Briefcase, Info } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { PageHeroSplit } from "@/components/page-hero-split"
import { PageLoadingProvider, usePageLoading } from "@/components/page-loading-context"
import { OverlayLoading as PageLoadingOverlay } from "@/components/unified-loading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function SchedulePageContent() {
  const { isLoading } = usePageLoading()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    preferredTime: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [showDialog, setShowDialog] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user selects
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!formData.name.trim()) errors.name = "El nombre es requerido"
    if (!formData.email.trim()) {
      errors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email inválido"
    }
    if (!formData.phone.trim()) errors.phone = "El teléfono es requerido"
    if (!formData.projectType) errors.projectType = "Selecciona un tipo de proyecto"
    if (!formData.preferredTime) errors.preferredTime = "Selecciona un horario preferido"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setShowDialog(true)
    }
  }

  const confirmSubmission = () => {
    setShowDialog(false)
    // Aquí normalmente enviarías los datos al servidor
    // Por ahora, solo redirigimos a la página de agradecimiento
    router.push("/agendamiento/gracias")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  return (
    <>
      <PageLoadingOverlay isVisible={isLoading} />
      <div className="min-h-screen text-white relative overflow-hidden">
        <DynamicBackground />
        
        <SiteHeader />

        <main className="relative z-10 container py-12 space-y-24" id="main-content">
          {/* Hero Section */}
          <PageHeroSplit
            badge={{ 
              text: "Consultoría Personalizada"
            }}
            title="Agenda una sesión"
            subtitle="Experto en soluciones bancarias, pagos y finanzas"
            description={
              <p className="text-zinc-400 leading-relaxed">
                Reserva una consulta personalizada para discutir tu proyecto,
                resolver dudas técnicas o explorar oportunidades de
                colaboración. Con más de 10 años de experiencia en el desarrollo
                de sistemas financieros y liderazgo técnico, puedo ayudarte a
                encontrar la solución adecuada para tu negocio.
              </p>
            }
            image={{
              src: "/profile.jpg",
              alt: "José Carrillo - Tech Consultant",
              width: 600,
              height: 600,
              priority: true,
            }}
            actions={
              <>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:from-blue-700 focus:to-purple-700 focus:ring-4 focus:ring-blue-500/50 w-full sm:w-auto text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 group min-h-[48px]" 
                  onClick={() => window.requestAnimationFrame(() => window.scrollTo({ top: 800, behavior: "smooth" }))}
                  aria-describedby="agendar-servicio-desc"
                >
                  Agendar servicio
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:animate-pulse" aria-hidden="true" />
                  <span id="agendar-servicio-desc" className="sr-only">Book a specialized professional service</span>
                </Button>
                <Button
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 bg-transparent hover:bg-zinc-800/70 hover:border-zinc-600 hover:text-white focus:bg-zinc-800/70 focus:ring-4 focus:ring-zinc-500/50 w-full sm:w-auto font-bold py-3 px-8 rounded-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300 min-h-[48px]"
                  aria-describedby="services-desc"
                >
                  Ver servicios
                  <span id="services-desc" className="sr-only">View my services</span>
                </Button>
              </>
            }
          />

          <motion.section
            className="pt-6 pb-12 space-y-8 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div className="space-y-4 text-center relative" variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent select-text">
                Agenda una consulta
              </h2>
              <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto leading-relaxed select-text">
                Completa el formulario para agendar una consulta inicial y
                discutir cómo puedo ayudarte con tu proyecto.
              </p>
            </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10"
            >
              <Card className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden group">
                {/* Card Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <CardHeader className="relative z-10">
                  <CardTitle>Solicitar agendamiento</CardTitle>
                  <CardDescription>
                    Completa el formulario y me pondré en contacto contigo para
                    confirmar la cita.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre completo"
                        className={`bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500 ${formErrors.name ? "border-red-500" : ""
                          }`}
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="tu@email.com"
                          className={`bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500 ${formErrors.email ? "border-red-500" : ""
                            }`}
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                          className={`bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500 ${formErrors.phone ? "border-red-500" : ""
                            }`}
                        />
                        {formErrors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa (opcional)</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nombre de tu empresa"
                        className="bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectType">Tipo de proyecto</Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("projectType", value)
                        }
                        defaultValue={formData.projectType}
                      >
                        <SelectTrigger
                          id="projectType"
                          className={`bg-zinc-950 border-zinc-800 focus:ring-blue-500 ${formErrors.projectType ? "border-red-500" : ""
                            }`}
                        >
                          <SelectValue placeholder="Selecciona el tipo de proyecto" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-950 border-zinc-800">
                          <SelectItem value="financial-system">
                            Sistema Financiero
                          </SelectItem>
                          <SelectItem value="backoffice-solution">
                            Solución de Backoffice
                          </SelectItem>
                          <SelectItem value="technical-leadership">
                            Liderazgo Técnico
                          </SelectItem>
                          <SelectItem value="architecture-design">
                            Diseño de Arquitectura
                          </SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                      {formErrors.projectType && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.projectType}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Horario preferido para la consulta</Label>
                      <RadioGroup
                        defaultValue={formData.preferredTime}
                        onValueChange={(value) =>
                          handleSelectChange("preferredTime", value)
                        }
                        className={`grid grid-cols-1 md:grid-cols-2 gap-2 ${formErrors.preferredTime
                            ? "border border-red-500 rounded-md p-2"
                            : ""
                          }`}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="morning" id="morning" />
                          <Label htmlFor="morning" className="cursor-pointer">
                            Mañana (9AM - 12PM)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="afternoon" id="afternoon" />
                          <Label htmlFor="afternoon" className="cursor-pointer">
                            Tarde (1PM - 5PM)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="evening" id="evening" />
                          <Label htmlFor="evening" className="cursor-pointer">
                            Noche (6PM - 8PM)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="flexible" id="flexible" />
                          <Label htmlFor="flexible" className="cursor-pointer">
                            Flexible
                          </Label>
                        </div>
                      </RadioGroup>
                      {formErrors.preferredTime && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.preferredTime}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Detalles del proyecto</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Cuéntame brevemente sobre tu proyecto y cómo puedo ayudarte..."
                        rows={5}
                        className="bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:from-blue-700 focus:to-purple-700 focus:ring-4 focus:ring-blue-500/50 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300"
                    >
                      Solicitar Agendamiento
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="space-y-6"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Card className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 relative overflow-hidden group">
                  {/* Card Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader className="relative">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-emerald-500" />
                      Disponibilidad
                    </CardTitle>
                    <CardDescription>
                      Horarios en los que estoy disponible para consultas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 relative">
                    <div className="space-y-2">
                      <h3 className="font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent select-text">Días Laborables</h3>
                      <p className="text-zinc-400">Lunes a Viernes</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent select-text">Horario de Trabajo</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Clock className="h-4 w-4 text-emerald-500" />
                          9:00 AM - 12:00 PM
                        </div>
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Clock className="h-4 w-4 text-emerald-500" />
                          1:00 PM - 5:00 PM
                        </div>
                      </div>
                      <p className="text-zinc-500 text-sm mt-2">
                        También disponible en horarios nocturnos (6PM - 8PM) con
                        cita previa.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent select-text">Zona Horaria</h3>
                      <p className="text-zinc-400">Hora del Este (EST/EDT)</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Card className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 relative overflow-hidden group">
                  {/* Card Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader className="relative">
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-purple-500" />
                      Proceso de Agendamiento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 relative">
                    <Alert className="bg-zinc-800/50 border-purple-800/50 backdrop-blur-sm">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      <AlertTitle>Cómo funciona</AlertTitle>
                      <AlertDescription className="text-zinc-400">
                        Una vez que envíes tu solicitud, revisaré los detalles y
                        te contactaré dentro de 24-48 horas para confirmar la
                        fecha y hora exacta de nuestra consulta.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2 mt-4">
                      <h3 className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent select-text">Tipos de Consultas</h3>
                      <ul className="space-y-2 text-zinc-400">
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          Consulta inicial (30 minutos) - Gratuita
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          Asesoría técnica (1 hora)
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          Revisión de arquitectura (1-2 horas)
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          Planificación de proyecto (2+ horas)
                        </li>
                      </ul>
                    </div>

                    <Alert className="bg-zinc-800/50 border-yellow-800/50 backdrop-blur-sm mt-4">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <AlertTitle>Importante</AlertTitle>
                      <AlertDescription className="text-zinc-400">
                        Para cancelaciones o reprogramaciones, por favor
                        notifícame con al menos 24 horas de anticipación.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Brands Section */}
        <motion.section
          className="py-12 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold">
              He trabajado con empresas líderes en la industria
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Ayudando a transformar sus operaciones financieras y de backoffice
              con soluciones tecnológicas innovadoras
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {/* Logos de marcas - Usando placeholders */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-900 p-6 rounded-lg w-full max-w-[150px] h-[80px] flex items-center justify-center"
            >
              <div className="text-2xl font-bold text-zinc-500">BBVA</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-900 p-6 rounded-lg w-full max-w-[150px] h-[80px] flex items-center justify-center"
            >
              <div className="text-2xl font-bold text-zinc-500">Santander</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-900 p-6 rounded-lg w-full max-w-[150px] h-[80px] flex items-center justify-center"
            >
              <div className="text-2xl font-bold text-zinc-500">IBM</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-900 p-6 rounded-lg w-full max-w-[150px] h-[80px] flex items-center justify-center"
            >
              <div className="text-2xl font-bold text-zinc-500">Deloitte</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-900 p-6 rounded-lg w-full max-w-[150px] h-[80px] flex items-center justify-center"
            >
              <div className="text-2xl font-bold text-zinc-500">PayPal</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-900 p-6 rounded-lg w-full max-w-[150px] h-[80px] flex items-center justify-center"
            >
              <div className="text-2xl font-bold text-zinc-500">Visa</div>
            </motion.div>
          </div>

          <div className="flex justify-center mt-8">
            <Card className="bg-zinc-900 border-zinc-800 max-w-3xl">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-shrink-0">
                    <Briefcase className="h-12 w-12 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Experiencia en Múltiples Industrias
                    </h3>
                    <p className="text-zinc-400">
                      He colaborado con empresas de diversos sectores, desde
                      fintech y banca hasta retail y telecomunicaciones,
                      implementando soluciones tecnológicas que han mejorado su
                      eficiencia operativa y rentabilidad.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </main>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-zinc-900/95 backdrop-blur-xl border-zinc-800/50 shadow-2xl shadow-blue-500/10 max-w-2xl overflow-hidden">
          {/* Modal Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 pointer-events-none" />

          <DialogHeader className="relative z-10">
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Confirmar solicitud
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              ¿Estás seguro de que deseas enviar esta solicitud de agendamiento?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50">
                <p className="text-sm font-medium text-zinc-400 mb-1">Nombre:</p>
                <p className="truncate text-white font-medium">{formData.name}</p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50">
                <p className="text-sm font-medium text-zinc-400 mb-1">
                  Correo electrónico:
                </p>
                <p className="truncate text-white font-medium">{formData.email}</p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50">
                <p className="text-sm font-medium text-zinc-400 mb-1">Teléfono:</p>
                <p className="truncate text-white font-medium">{formData.phone}</p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50">
                <p className="text-sm font-medium text-zinc-400 mb-1">
                  Horario preferido:
                </p>
                <p className="text-white font-medium">
                  {formData.preferredTime === "morning"
                    ? "Mañana (9AM - 12PM)"
                    : formData.preferredTime === "afternoon"
                      ? "Tarde (1PM - 5PM)"
                      : formData.preferredTime === "evening"
                        ? "Noche (6PM - 8PM)"
                        : "Flexible"}
                </p>
              </div>
            </div>

            {formData.message && (
              <div className="p-3 rounded-lg bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50">
                <p className="text-sm font-medium text-zinc-400 mb-2">Detalles del proyecto:</p>
                <p className="text-white text-sm leading-relaxed">{formData.message}</p>
              </div>
            )}
          </div>

          <DialogFooter className="relative z-10 gap-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300 bg-transparent hover:bg-zinc-800/70 hover:border-zinc-600 hover:text-white focus:bg-zinc-800/70 focus:ring-4 focus:ring-zinc-500/50 font-bold py-3 px-8 rounded-lg backdrop-blur-sm transition-all duration-300"
                onClick={() => setShowDialog(false)}
              >
                Cancelar
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:from-blue-700 focus:to-purple-700 focus:ring-4 focus:ring-blue-500/50 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300"
                onClick={confirmSubmission}
              >
                Confirmar y enviar
              </Button>
            </motion.div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
    </>
  );
}

export default function SchedulePage() {
  return (
    <PageLoadingProvider>
      <SchedulePageContent />
    </PageLoadingProvider>
  );
}
