"use client"

import { Mail, MapPin, Phone, Github, Linkedin, Send, Clock, Globe, MessageSquare, HelpCircle, Settings, Code, Shield, Share2, Eye, EyeOff } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { useState, useEffect, useCallback, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ParticleHeroBackground } from "@/components/particle-hero-background"
import { PageLoadingProvider, usePageLoading } from "@/components/page-loading-context"
import { OverlayLoading as PageLoadingOverlay } from "@/components/unified-loading"
import { PageHero } from "@/components/page-hero"

// Security utilities
const obfuscateEmail = (email: string): string => {
  return btoa(email).split('').reverse().join('')
}

const deobfuscateEmail = (obfuscated: string): string => {
  return atob(obfuscated.split('').reverse().join(''))
}

const obfuscatePhone = (phone: string): string => {
  return phone.split('').map((char, index) => 
    index % 2 === 0 ? char : String.fromCharCode(char.charCodeAt(0) + 1)
  ).join('')
}

const deobfuscatePhone = (obfuscated: string): string => {
  return obfuscated.split('').map((char, index) => 
    index % 2 === 0 ? char : String.fromCharCode(char.charCodeAt(0) - 1)
  ).join('')
}

// Rate limiting
const useRateLimit = (limit: number = 3, windowMs: number = 60000) => {
  const [attempts, setAttempts] = useState<number[]>([])
  
  const isLimited = useCallback(() => {
    const now = Date.now()
    const recentAttempts = attempts.filter(time => now - time < windowMs)
    return recentAttempts.length >= limit
  }, [attempts, limit, windowMs])
  
  const recordAttempt = useCallback(() => {
    const now = Date.now()
    setAttempts(prev => [...prev.filter(time => now - time < windowMs), now])
  }, [windowMs])
  
  return { isLimited: isLimited(), recordAttempt }
}

// Animation variants - consistent with blog and resources pages
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      ease: "easeOut",
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
      ease: "easeOut",
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

function ContactPageContent() {
  const { isLoading } = usePageLoading();
  // Security states
  const [emailRevealed, setEmailRevealed] = useState(false)
  const [phoneRevealed, setPhoneRevealed] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // Hidden field for bot detection
  })
  
  // Rate limiting
  const { isLimited, recordAttempt } = useRateLimit(3, 60000)
  
  // Form submission tracking
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSubmission, setLastSubmission] = useState<number>(0)
  
  // Refs for additional security
  const formRef = useRef<HTMLFormElement>(null)
  const startTime = useRef<number>(Date.now())
  
  // Obfuscated contact data
  const obfuscatedEmail = obfuscateEmail('m@carrillo.app')
  const obfuscatedPhone = obfuscatePhone('+57 (300) 332 8389')
  
  // Security checks on mount
  useEffect(() => {
    startTime.current = Date.now()
    // Inicializar tiempo de carga para validación de envío
  }, [])
  
  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  // Handle form submission with security checks
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Security validations
    // Solo bloquear si el honeypot está lleno (bots lo llenan automáticamente)
    if (formData.honeypot) {
      console.warn('Honeypot field filled, submission blocked')
      return
    }
    
    if (isLimited) {
      alert('Demasiados intentos. Por favor, espera un momento antes de intentar nuevamente.')
      return
    }
    
    // Check submission timing - tiempo mínimo reducido para usuarios legítimos
    const submissionTime = Date.now() - startTime.current
    if (submissionTime < 1000) {
      // Solo bloquear si es extremadamente rápido (< 1 segundo)
      console.warn('Submission too fast, likely bot')
      return
    }
    
    // Check for duplicate rapid submissions
    if (Date.now() - lastSubmission < 5000) {
      alert('Por favor, espera antes de enviar otro mensaje.')
      return
    }
    
    setIsSubmitting(true)
    recordAttempt()
    setLastSubmission(Date.now())
    
    try {
      // Here you would implement your actual form submission logic
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: ''
      })
      
      alert('¡Mensaje enviado exitosamente!')
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Error al enviar el mensaje. Por favor, inténtalo nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Reveal contact information
  const revealEmail = () => {
    setEmailRevealed(true)
  }
  
  const revealPhone = () => {
    setPhoneRevealed(true)
  }
  return (
    <>
      <PageLoadingOverlay isVisible={isLoading} />
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <ParticleHeroBackground />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black/50 pointer-events-none" />
        
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
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                },
              }}
            >
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
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field - hidden from users but visible to bots */}
                    <input
                      type="text"
                      name="website"
                      value={formData.honeypot}
                      onChange={(e) => handleInputChange('honeypot', e.target.value)}
                      style={{ 
                        position: 'absolute', 
                        left: '-9999px', 
                        width: '1px', 
                        height: '1px',
                        opacity: 0,
                        pointerEvents: 'none',
                        visibility: 'hidden'
                      }}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Nombre</label>
                        <Input
                          placeholder="Tu nombre"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="bg-zinc-800/50 border-zinc-700/50 focus:border-blue-500/50 transition-colors duration-300"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Email</label>
                        <Input
                          type="email"
                          placeholder="tu@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-zinc-800/50 border-zinc-700/50 focus:border-blue-500/50 transition-colors duration-300"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Asunto</label>
                      <Input
                        placeholder="¿En qué puedo ayudarte?"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="bg-zinc-800/50 border-zinc-700/50 focus:border-blue-500/50 transition-colors duration-300"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Mensaje</label>
                      <Textarea
                        placeholder="Cuéntame más sobre tu proyecto..."
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="bg-zinc-800/50 border-zinc-700/50 focus:border-blue-500/50 transition-colors duration-300 min-h-[120px]"
                        rows={5}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    {isLimited && (
                      <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 text-sm">
                          Has alcanzado el límite de envíos. Por favor, espera un momento antes de intentar nuevamente.
                        </p>
                      </div>
                    )}
                    
                    <motion.div
                      whileHover={{ scale: isSubmitting || isLimited ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting || isLimited ? 1 : 0.98 }}
                    >
                      <Button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-300"
                        disabled={isSubmitting || isLimited}
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
                        Información de contacto
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
                      className="flex items-start space-x-4 p-4 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/50 transition-all duration-300 group/item"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-600/20 to-teal-600/20 flex items-center justify-center border border-emerald-500/30 group-hover/item:scale-110 transition-transform duration-300">
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
                        Mis redes sociales
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
                        href="https://x.com/carrilloapps"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/50 transition-all duration-300 group/social border border-zinc-700/30 hover:border-cyan-500/30"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-600/20 to-teal-600/20 flex items-center justify-center border border-cyan-500/30 group-hover/social:scale-110 transition-transform duration-300 mb-3">
                          <svg className="h-6 w-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                        </div>
                        <span className="text-sm font-medium text-zinc-300 group-hover/social:text-white transition-colors duration-300">Twitter</span>
                      </motion.a>
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
          >
            <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-600/20 to-blue-600/20 flex items-center justify-center border border-emerald-500/30">
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  Preguntas frecuentes
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
    </>
  );
}

export default function ContactPage() {
  return (
    <PageLoadingProvider>
      <ContactPageContent />
    </PageLoadingProvider>
  );
}
