"use client"

import { Mail, MapPin, Phone, Send, Clock, Globe, MessageSquare, Eye, Briefcase, CreditCard, CalendarClock, Wallet } from "lucide-react"
import { motion, type Variants } from "@/lib/motion"
import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { PageLoadingProvider, usePageLoading } from "@/components/page-loading-context"
import { OverlayLoading as PageLoadingOverlay } from "@/components/unified-loading"
import { PageHero } from "@/components/page-hero"
import { Github, Linkedin, Substack } from "@/components/icons/social-icons"
import {
  trackFormStart,
  trackFormSubmit,
  trackFormFieldInteraction,
  trackButtonClick,
} from "@/lib/analytics"
import { buildWhatsAppUrl, buildContactWhatsAppMessage } from "@/lib/whatsapp"
import { contactFaq, type ContactFaqIcon } from "@/data/contact-faq"
import { toast } from "sonner"

/** Maps each FAQ item's icon key to its lucide component. */
const FAQ_ICONS: Record<ContactFaqIcon, typeof Globe> = {
  services: Briefcase,
  payments: CreditCard,
  schedule: CalendarClock,
  remote: Globe,
  pricing: Wallet,
  timeline: Clock,
}

const obfuscateEmail = (email: string): string =>
  btoa(email).split("").reverse().join("")

const deobfuscateEmail = (obfuscated: string): string =>
  atob(obfuscated.split("").reverse().join(""))

const obfuscatePhone = (phone: string): string =>
  phone
    .split("")
    .map((char, index) =>
      index % 2 === 0 ? char : String.fromCharCode(char.charCodeAt(0) + 1)
    )
    .join("")

const deobfuscatePhone = (obfuscated: string): string =>
  obfuscated
    .split("")
    .map((char, index) =>
      index % 2 === 0 ? char : String.fromCharCode(char.charCodeAt(0) - 1)
    )
    .join("")

const useRateLimit = (limit: number = 3, windowMs: number = 60000) => {
  const [attempts, setAttempts] = useState<number[]>([])

  const isLimited = useCallback(() => {
    const now = Date.now()
    return attempts.filter((time) => now - time < windowMs).length >= limit
  }, [attempts, limit, windowMs])

  const recordAttempt = useCallback(() => {
    const now = Date.now()
    setAttempts((prev) => [...prev.filter((time) => now - time < windowMs), now])
  }, [windowMs])

  return { isLimited: isLimited(), recordAttempt }
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

function ContactPageContent() {
  const { isLoading } = usePageLoading()
  const [emailRevealed, setEmailRevealed] = useState(false)
  const [phoneRevealed, setPhoneRevealed] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    company: "",
    subject: "",
    message: "",
    honeypot: "",
  })

  const { isLimited, recordAttempt } = useRateLimit(3, 60000)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSubmission, setLastSubmission] = useState<number>(0)
  const formRef = useRef<HTMLFormElement>(null)
  const startTime = useRef<number>(0)

  const obfuscatedEmail = obfuscateEmail("m@carrillo.app")
  const obfuscatedPhone = obfuscatePhone("+57 (300) 332 8389")

  useEffect(() => {
    startTime.current = Date.now()
    trackFormStart("contact_form")
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (value && !formData[field as keyof typeof formData]) {
      trackFormFieldInteraction("contact_form", field)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.honeypot) return
    if (!termsAccepted) return

    if (isLimited) {
      toast.error("Demasiados intentos", {
        description: "Espera un momento antes de intentar nuevamente.",
      })
      return
    }

    if (Date.now() - startTime.current < 1000) return

    if (Date.now() - lastSubmission < 5000) {
      toast.warning("Espera un momento", {
        description: "Por favor, espera antes de enviar otro mensaje.",
      })
      return
    }

    setIsSubmitting(true)
    recordAttempt()
    setLastSubmission(Date.now())

    try {
      const whatsappUrl = buildWhatsAppUrl(
        buildContactWhatsAppMessage({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
        })
      )
      window.open(whatsappUrl, "_blank", "noopener,noreferrer")
      trackFormSubmit("contact_form", true)
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        company: "",
        subject: "",
        message: "",
        honeypot: "",
      })
      setTermsAccepted(false)
      toast.success("Abriendo WhatsApp…", {
        description: "Te llevo a la conversación con tu mensaje ya listo.",
      })
    } catch (error) {
      console.error("Error sending message:", error)
      trackFormSubmit(
        "contact_form",
        false,
        error instanceof Error ? error.message : "Unknown error"
      )
      toast.error("Error al enviar el mensaje", {
        description: "Por favor, inténtalo nuevamente en un momento.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const revealEmail = () => {
    setEmailRevealed(true)
    trackButtonClick("Reveal Email", "contact_page", { action: "reveal_contact_info" })
  }

  const revealPhone = () => {
    setPhoneRevealed(true)
  }

  return (
    <>
      <PageLoadingOverlay isVisible={isLoading} />
      <div className="min-h-screen text-white relative overflow-hidden">
        <DynamicBackground />
        <SiteHeader />

        <main className="relative z-10 container py-12 space-y-24" id="main-content">
          <PageHero
            badge={{
              text: "Disponible para nuevos proyectos",
              icon: Mail,
              gradientFrom: "from-emerald-600/20",
              gradientTo: "to-teal-600/20",
              borderColor: "border-emerald-500/30",
              textColor: "text-emerald-400",
              shadowColor: "shadow-emerald-600/10",
            }}
            title="Hablemos"
            description="¿Tienes un proyecto en mente? Me encantaría conocer más sobre tu visión y cómo puedo ayudarte a hacerla realidad."
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Contact form */}
                <motion.div variants={cardVariants} whileHover="hover">
                  <Card className="surface-card relative overflow-hidden group">
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
                      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                        <input
                          type="text"
                          name="website"
                          value={formData.honeypot}
                          onChange={(e) => handleInputChange("honeypot", e.target.value)}
                          style={{
                            position: "absolute",
                            left: "-9999px",
                            width: "1px",
                            height: "1px",
                            opacity: 0,
                            pointerEvents: "none",
                            visibility: "hidden",
                          }}
                          tabIndex={-1}
                          autoComplete="off"
                          aria-hidden="true"
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label
                              htmlFor="contact-name"
                              className="text-sm font-medium text-zinc-300"
                            >
                              Nombre
                            </label>
                            <Input
                              id="contact-name"
                              placeholder="Tu nombre"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              variant="glass"
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="contact-email"
                              className="text-sm font-medium text-zinc-300"
                            >
                              Email
                            </label>
                            <Input
                              id="contact-email"
                              type="email"
                              placeholder="tu@email.com"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              variant="glass"
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label
                              htmlFor="contact-whatsapp"
                              className="text-sm font-medium text-zinc-300"
                            >
                              WhatsApp
                            </label>
                            <Input
                              id="contact-whatsapp"
                              type="tel"
                              placeholder="+57 300 000 0000"
                              value={formData.whatsapp}
                              onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                              variant="glass"
                              required
                              disabled={isSubmitting}
                              autoComplete="tel"
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="contact-company"
                              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300"
                            >
                              Empresa
                              <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 bg-zinc-800/80 px-1.5 py-0.5 rounded">
                                opcional
                              </span>
                            </label>
                            <Input
                              id="contact-company"
                              placeholder="Tu empresa"
                              value={formData.company}
                              onChange={(e) => handleInputChange("company", e.target.value)}
                              variant="glass"
                              disabled={isSubmitting}
                              autoComplete="organization"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="contact-subject"
                            className="text-sm font-medium text-zinc-300"
                          >
                            Asunto
                          </label>
                          <Input
                            id="contact-subject"
                            placeholder="¿En qué puedo ayudarte?"
                            value={formData.subject}
                            onChange={(e) => handleInputChange("subject", e.target.value)}
                            variant="glass"
                            required
                            disabled={isSubmitting}
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="contact-message"
                            className="text-sm font-medium text-zinc-300"
                          >
                            Mensaje
                          </label>
                          <Textarea
                            id="contact-message"
                            placeholder="Cuéntame más sobre tu proyecto..."
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            variant="glass"
                            rows={5}
                            required
                            disabled={isSubmitting}
                          />
                        </div>

                        {isLimited && (
                          <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                            <p className="text-red-400 text-sm">
                              Has alcanzado el límite de envíos. Por favor, espera un momento
                              antes de intentar nuevamente.
                            </p>
                          </div>
                        )}

                        <div className="flex items-start gap-3">
                          <input
                            id="contact-terms"
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            className="mt-0.5 h-4 w-4 rounded border-zinc-600 bg-zinc-900/50 accent-emerald-500 cursor-pointer"
                            disabled={isSubmitting}
                          />
                          <label
                            htmlFor="contact-terms"
                            className="text-sm text-zinc-400 leading-snug cursor-pointer"
                          >
                            Acepto los{" "}
                            <Link
                              href="/terminos"
                              target="_blank"
                              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                            >
                              términos y condiciones
                            </Link>{" "}
                            y la{" "}
                            <Link
                              href="/privacidad"
                              target="_blank"
                              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                            >
                              política de privacidad
                            </Link>
                          </label>
                        </div>

                        <motion.div
                          whileHover={{ scale: isSubmitting || isLimited ? 1 : 1.02 }}
                          whileTap={{ scale: isSubmitting || isLimited ? 1 : 0.98 }}
                        >
                          <Button
                            type="submit"
                            variant="gradient"
                            size="lg"
                            className="w-full touch-manipulation"
                            disabled={isSubmitting || isLimited || !termsAccepted}
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Enviando...
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4 mr-2" />
                                Enviar mensaje
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Contact info + social */}
                <div className="space-y-8">
                  <motion.div variants={cardVariants} whileHover="hover">
                    <Card className="surface-card relative overflow-hidden group">
                      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <CardHeader className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30">
                            <Phone className="w-5 h-5 text-emerald-400" />
                          </div>
                          <CardTitle className="text-2xl bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                            Información de contacto
                          </CardTitle>
                        </div>
                        <CardDescription className="text-zinc-400">
                          Estoy disponible para ti a través de cualquiera de estos canales.
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-6 relative z-10">
                        <motion.div
                          className="surface-card-subtle flex items-start space-x-4 p-4 group/item"
                          whileHover={{ x: 4 }}
                        >
                          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30 group-hover/item:scale-110 transition-transform duration-300">
                            <Mail className="h-6 w-6 text-blue-400" />
                          </div>
                          <div className="space-y-1 flex-1">
                            <p className="font-semibold text-white">Correo electrónico</p>
                            <div className="flex items-center gap-2">
                              {emailRevealed ? (
                                <p className="text-zinc-300 font-mono select-all">
                                  {deobfuscateEmail(obfuscatedEmail)}
                                </p>
                              ) : (
                                <button
                                  onClick={revealEmail}
                                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                >
                                  <Eye className="w-4 h-4" />
                                  <span className="text-sm">Hacer clic para revelar email</span>
                                </button>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-zinc-500 text-sm">
                              <Clock className="w-3 h-3" />
                              <span>Respuesta garantizada en menos de 24 horas</span>
                            </div>
                          </div>
                        </motion.div>

                        <Separator className="my-6 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

                        <motion.div
                          className="surface-card-subtle flex items-start space-x-4 p-4 group/item"
                          whileHover={{ x: 4 }}
                        >
                          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30 group-hover/item:scale-110 transition-transform duration-300">
                            <Phone className="h-6 w-6 text-emerald-400" />
                          </div>
                          <div className="space-y-1 flex-1">
                            <p className="font-semibold text-white">Teléfono</p>
                            <div className="flex items-center gap-2">
                              {phoneRevealed ? (
                                <p className="text-zinc-300 font-mono select-all">
                                  {deobfuscatePhone(obfuscatedPhone)}
                                </p>
                              ) : (
                                <button
                                  onClick={revealPhone}
                                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                                >
                                  <Eye className="w-4 h-4" />
                                  <span className="text-sm">Hacer clic para revelar teléfono</span>
                                </button>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-zinc-500 text-sm">
                              <Clock className="w-3 h-3" />
                              <span>Disponible Lun-Vie, 9:00-18:00 Colombia</span>
                            </div>
                          </div>
                        </motion.div>

                        <Separator className="my-6 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

                        <motion.div
                          className="surface-card-subtle flex items-start space-x-4 p-4 group/item"
                          whileHover={{ x: 4 }}
                        >
                          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30 group-hover/item:scale-110 transition-transform duration-300">
                            <MapPin className="h-6 w-6 text-blue-400" />
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
                    <Card className="surface-card relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <CardHeader className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center border border-purple-500/30">
                            <Globe className="w-5 h-5 text-purple-400" />
                          </div>
                          <CardTitle className="text-2xl bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                            Mis redes sociales
                          </CardTitle>
                        </div>
                        <CardDescription className="text-zinc-300">
                          Conéctate conmigo o explora mi trabajo en línea.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <div className="flex flex-wrap gap-3">
                          {[
                            {
                              href: "https://github.com/carrilloapps",
                              label: "GitHub",
                              icon: <Github className="w-4 h-4 text-purple-400" aria-hidden="true" />,
                              hover: "hover:border-purple-500/50",
                            },
                            {
                              href: "https://linkedin.com/in/carrilloapps",
                              label: "LinkedIn",
                              icon: <Linkedin className="w-4 h-4 text-blue-400" aria-hidden="true" />,
                              hover: "hover:border-blue-500/50",
                            },
                            {
                              href: "https://x.com/carrilloapps",
                              label: "Twitter",
                              icon: (
                                <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                              ),
                              hover: "hover:border-cyan-500/50",
                            },
                            {
                              href: "https://carrilloapps.substack.com/",
                              label: "Substack",
                              icon: <Substack className="w-4 h-4 text-orange-400" aria-hidden="true" />,
                              hover: "hover:border-orange-500/50",
                            },
                          ].map(({ href, label, icon, hover }) => (
                            <a
                              key={label}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${label} (se abre en nueva ventana)`}
                              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl surface-card-subtle text-sm font-medium text-zinc-300 hover:text-white border border-white/[0.06] ${hover} transition-all duration-200 min-h-[44px] touch-manipulation`}
                            >
                              {icon}
                              {label}
                            </a>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </PageHero>

          {/* FAQ Section */}
          <motion.section
            className="py-12 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            aria-labelledby="faq-heading"
          >
            <div className="container mx-auto px-4">
              <motion.div className="text-center mb-12" variants={itemVariants}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30">
                    <MessageSquare className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h2
                    id="faq-heading"
                    className="text-4xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
                  >
                    Preguntas frecuentes
                  </h2>
                </div>
                <p className="text-zinc-300 max-w-2xl mx-auto text-lg">
                  Aquí encontrarás respuestas a las dudas más comunes. Si tienes alguna pregunta
                  adicional, no dudes en contactarme directamente.
                </p>
              </motion.div>

              <motion.div
                className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto"
                variants={itemVariants}
              >
                {contactFaq.map((item) => {
                  const Icon = FAQ_ICONS[item.icon]
                  return (
                    <motion.div key={item.question} variants={cardVariants} whileHover="hover">
                      <Card className="surface-card h-full relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardContent className="p-6 relative z-10">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                              <Icon className="w-5 h-5 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                              {item.question}
                            </h3>
                          </div>
                          <p className="text-zinc-300 leading-relaxed">{item.answer}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </motion.section>
        </main>

        <SiteFooter />
      </div>
    </>
  )
}

export default function ContactPage() {
  return (
    <PageLoadingProvider>
      <ContactPageContent />
    </PageLoadingProvider>
  )
}
