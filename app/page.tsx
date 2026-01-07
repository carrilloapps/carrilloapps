"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail, Download, Eye } from "lucide-react"
import { motion } from "@/lib/motion"
import Image from "next/image"

import { projects } from "@/data/projects"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer";
import { DynamicBackground } from "@/components/dynamic-background";
import { AnimatedSection } from "@/components/animated-section"
import { 
  DynamicTabs as Tabs,
  DynamicTabsContent as TabsContent,
  DynamicTabsList as TabsList,
  DynamicTabsTrigger as TabsTrigger,
  DynamicDialog as Dialog,
  DynamicDialogContent as DialogContent,
  DynamicDialogDescription as DialogDescription,
  DynamicDialogHeader as DialogHeader,
  DynamicDialogTitle as DialogTitle,
  DynamicCompactContactSection as CompactContactSection,
  DynamicProjectDialog as ProjectDialog
} from "@/components/dynamic-imports"
import { useIsMobile } from "@/hooks/use-media-query"
import { trackCTAClick, trackButtonClick, trackScrollDepth, trackProjectView } from "@/lib/analytics";

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

// Rate limiting hook
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

export default function Home() {
  const isMobile = useIsMobile()
  const [cvModalOpen, setCvModalOpen] = useState(false)
  const [cvFormSubmitted, setCvFormSubmitted] = useState(false)
  const [cvFormData, setCvFormData] = useState({ name: "", email: "" })
  const [cvFormErrors, setCvFormErrors] = useState({ name: "", email: "" })
  
  // Contact form security states
  const [emailRevealed, setEmailRevealed] = useState(false)
  const [phoneRevealed, setPhoneRevealed] = useState(false)
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // Hidden field for bot detection
  })
  
  // Rate limiting for contact form
  const { isLimited: isContactLimited, recordAttempt: recordContactAttempt } = useRateLimit(3, 60000)
  
  // Form submission tracking
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSubmission, setLastSubmission] = useState<number>(0)
  
  // Refs for additional security
  const contactFormRef = useRef<HTMLFormElement>(null)
  const startTime = useRef<number>(Date.now())
  
  // Obfuscated contact data
  const obfuscatedEmail = obfuscateEmail('m@carrillo.app')
  const obfuscatedPhone = obfuscatePhone('+57 (300) 332 8389')
  
  // Security checks on mount
  useEffect(() => {
    startTime.current = Date.now()
  }, [])

  // Scroll depth tracking
  useEffect(() => {
    const scrollDepths = [25, 50, 75, 100];
    const tracked = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      scrollDepths.forEach((depth) => {
        if (scrollPercent >= depth && !tracked.has(depth)) {
          trackScrollDepth(depth as 25 | 50 | 75 | 100);
          tracked.add(depth);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle contact form input changes
  const handleContactInputChange = (field: string, value: string) => {
    setContactFormData(prev => ({ ...prev, [field]: value }))
  }
  
  // Handle contact form submission with security checks
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Security validations
    if (contactFormData.honeypot) {
      console.warn('Honeypot field filled, submission blocked')
      return
    }
    
    if (isContactLimited) {
      alert('Demasiados intentos. Por favor, espera un momento antes de intentar nuevamente.')
      return
    }
    
    // Check submission timing
    const submissionTime = Date.now() - startTime.current
    if (submissionTime < 1000) {
      console.warn('Submission too fast, likely bot')
      return
    }
    
    // Check for duplicate rapid submissions
    if (Date.now() - lastSubmission < 5000) {
      alert('Por favor, espera antes de enviar otro mensaje.')
      return
    }
    
    setIsSubmitting(true)
    recordContactAttempt()
    setLastSubmission(Date.now())
    
    try {
      // Here you would implement your actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Reset form after successful submission
      setContactFormData({
        name: '',
        email: '',
        subject: contactFormData.subject || '', // Keep subject if it exists (for full form)
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
    <div className="min-h-screen text-white relative overflow-hidden">
      <DynamicBackground />
      <SiteHeader />
      <main id="main-content" role="main" className="relative z-10 pt-5">
        {/* Hero Section - Full Width */}
        <AnimatedSection className="py-16 md:py-28 relative w-full" role="banner" aria-labelledby="hero-heading">

          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2 items-center relative z-10">
              {/* Mobile: Image first, Desktop: Content first */}
              <div className="space-y-8 text-center md:text-left order-2 md:order-1">
                <motion.div 
                  initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : -20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: isMobile ? 0 : 0.2, duration: isMobile ? 0 : 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg shadow-emerald-600/10" role="text">
                    Tech Leader | Senior Full Stack
                  </div>
                </motion.div>
                <motion.h1
                  id="hero-heading"
                  initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isMobile ? 0 : 0.3, duration: isMobile ? 0 : 0.6, type: isMobile ? undefined : "spring" }}
                  className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight"
                >
                  <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
                    José Carrillo
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isMobile ? 0 : 0.4, duration: isMobile ? 0 : 0.7 }}
                  className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto md:mx-0 leading-relaxed"
                  role="text"
                >
                  Como desarrollador de software senior y líder técnico, me especializo en la creación de{" "}
                  <span className="text-blue-300 font-semibold">soluciones de pago y sistemas financieros</span>{" "}
                  de alta transaccionalidad y seguridad.
                </motion.p>
                <motion.div
                  initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isMobile ? 0 : 0.5, duration: isMobile ? 0 : 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                  role="group"
                  aria-label="Acciones principales"
                >
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:from-blue-700 focus:to-purple-700 focus:ring-4 focus:ring-blue-500/50 w-full sm:w-auto text-white font-bold py-3 px-8 min-h-[48px] rounded-lg shadow-lg shadow-blue-500/30 touch-manipulation transform hover:scale-105 transition-all duration-300 group" 
                    asChild
                    onClick={() => trackCTAClick('Contactarme', 'primary', 'home-hero')}
                  >
                    <Link href="/contacto" aria-describedby="contact-me-desc">
                      Contactarme
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:animate-pulse" aria-hidden="true" />
                      <span id="contact-me-desc" className="sr-only">Conversemos más a fondo sobre lo que desees</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-zinc-700 text-zinc-300 bg-transparent hover:bg-zinc-800/70 hover:border-zinc-600 hover:text-white focus:bg-zinc-800/70 focus:ring-4 focus:ring-zinc-500/50 w-full sm:w-auto font-bold py-3 px-8 min-h-[48px] rounded-lg backdrop-blur-sm touch-manipulation transform hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      trackButtonClick('Descargar CV', 'home-hero');
                      setCvModalOpen(true);
                    }}
                    aria-describedby="download-cv-desc"
                  >
                    Descargar CV
                    <Download className="ml-2 h-5 w-5" aria-hidden="true" />
                    <span id="download-cv-desc" className="sr-only">Abrir formulario para descargar mi currículum vitae</span>
                  </Button>
                </motion.div>
              </div>

              {/* Enhanced profile image section - Optimized for LCP */}
              <div
                className="relative group flex justify-center items-center order-1 md:order-2"
                role="img"
                aria-label="Foto de perfil de José Carrillo"
              >
                <div className="relative w-[320px] h-[320px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] rounded-full">
                  {/* Clean border with subtle glow */}
                  <div 
                    className="relative w-full h-full rounded-full overflow-hidden border-4 border-blue-500/40 group-hover:border-blue-400/60 transition-all duration-500"
                    style={{
                      boxShadow: '0 0 40px rgba(59, 130, 246, 0.25), 0 0 80px rgba(147, 51, 234, 0.15), 0 20px 60px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <Image
                      src="/profile.jpg"
                      alt="José Carrillo, desarrollador de software senior y líder técnico especializado en sistemas financieros"
                      width={420}
                      height={420}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                      priority
                      fetchPriority="high"
                      loading="eager"
                      quality={90}
                      sizes="(max-width: 768px) 320px, (max-width: 1024px) 380px, 420px"
                    />
                    {/* Simplified overlays - removed heavy blur effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/3 to-transparent rounded-full" />
                  </div>
                  
                  {/* Status badge */}
                  <div className="absolute bottom-4 right-4 bg-black/90 backdrop-blur-sm border border-emerald-500/30 rounded-lg px-3 py-2 shadow-xl shadow-emerald-600/10 flex items-center gap-2 z-10">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" aria-hidden="true"></div>
                    <div className="text-white">
                      <div className="text-xs text-zinc-400 leading-tight">Status</div>
                      <div className="text-sm font-semibold text-emerald-400 leading-tight">On Work</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Enhanced social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMobile ? 0 : 0.3, duration: isMobile ? 0.3 : 0.5 }}
              className="flex gap-4 md:gap-8 justify-center md:justify-start pt-8"
              aria-label="Enlaces de redes sociales"
            >
              <Link href="https://github.com/carrilloapps" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 focus:text-blue-400 focus:ring-4 focus:ring-blue-500/50 rounded-lg p-3 md:p-4 min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation transform hover:scale-110 transition-all duration-300 group" aria-label="Visitar mi perfil de GitHub (se abre en nueva ventana)">
                <Github className="h-6 w-6 md:h-7 md:w-7 group-hover:drop-shadow-lg" aria-hidden="true" />
              </Link>
              <Link href="https://linkedin.com/in/carrilloapps" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 focus:text-blue-400 focus:ring-4 focus:ring-blue-500/50 rounded-lg p-3 md:p-4 min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation transform hover:scale-110 transition-all duration-300 group" aria-label="Visitar mi perfil de LinkedIn (se abre en nueva ventana)">
                <Linkedin className="h-6 w-6 md:h-7 md:w-7 group-hover:drop-shadow-lg" aria-hidden="true" />
              </Link>
              <Link href="https://x.com/carrilloapps" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 focus:text-blue-400 focus:ring-4 focus:ring-blue-500/50 rounded-lg p-3 md:p-4 min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation transform hover:scale-110 transition-all duration-300 group" aria-label="Visitar mi perfil de X/Twitter (se abre en nueva ventana)">
                <svg className="h-6 w-6 md:h-7 md:w-7 group-hover:drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </Link>
              <Link href="mailto:contacto@carrillo.com" className="text-slate-400 hover:text-blue-400 focus:text-blue-400 focus:ring-4 focus:ring-blue-500/50 rounded-lg p-3 md:p-4 min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation transform hover:scale-110 transition-all duration-300 group" aria-label="Enviar correo electrónico a contacto@carrillo.com">
                <Mail className="h-6 w-6 md:h-7 md:w-7 group-hover:drop-shadow-lg" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex justify-center mt-16"
            >
              <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-bounce"></div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Experience Section */}
        <AnimatedSection className="py-16 md:py-24 relative" delay={0.1} role="region" aria-labelledby="experience-heading">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 via-blue-900/5 to-purple-900/5 pointer-events-none"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="space-y-6 text-center pb-8">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 text-blue-300 text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg shadow-blue-600/10" role="text">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                  Trayectoria & experiencia
                </div>
              </motion.div>
              <motion.h2
                id="experience-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight"
              >
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                  Experiencia profesional
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
              >
                Más de una década de experiencia construyendo <span className="text-blue-300 font-semibold">soluciones tecnológicas</span> de alto impacto al más alto nivel para la banca, pagos y fintech.
              </motion.p>
            </div>

            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" aria-label="Experiencia laboral">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border border-zinc-700/50 h-full focus-within:ring-4 focus-within:ring-blue-500/50 backdrop-blur-sm shadow-xl shadow-black/20 group-hover:shadow-blue-500/20 group-hover:border-blue-500/30 transition-all duration-300" role="article" aria-labelledby="job-1-title">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Badge className="bg-blue-600" role="text">2024 - Presente</Badge>
                      <h3 id="job-1-title" className="text-xl font-bold">Tech Leader</h3>
                      <p className="text-zinc-300">Yummy Inc.</p>
                    </div>
                    <p className="text-zinc-300">
                      Liderando un equipo de 7 desarrolladores en el diseño e implementación de herramientas innovadoras para Pagos y Finanzas. Implementando medios de pagos y arquitecturas de microservicios que mejoran la confiabilidad del sistema en un 40%.
                    </p>
                    <div className="flex flex-wrap gap-2" aria-label="Tecnologías utilizadas">
                      <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                        Node.js
                      </Badge>
                      <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                        React
                      </Badge>
                      <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                        AWS
                      </Badge>
                      <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                        Microservicios
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border border-zinc-700/50 h-full focus-within:ring-4 focus-within:ring-blue-500/50 backdrop-blur-sm shadow-xl shadow-black/20 group-hover:shadow-blue-500/20 group-hover:border-blue-500/30 transition-all duration-300" role="article" aria-labelledby="job-2-title">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Badge className="bg-blue-600" role="text">2022 - 2023</Badge>
                      <h3 id="job-2-title" className="text-xl font-bold">Developer Lead</h3>
                      <p className="text-zinc-300">Cencosud S.A.</p>
                    </div>
                    <p className="text-zinc-300">
                      Desarrollé herramientas y módulos de contabilidad con integración en SAP que gestionan cerca de 2 millones en transacciones semanales. Optimicé consultas de bases de datos, lo que resultó en tiempos de procesamiento un 60% más rápidos.
                    </p>
                    <div className="flex flex-wrap gap-2" aria-label="Tecnologías utilizadas">
                      <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                        TypeScript
                      </Badge>
                      <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                        Amazon Redshift
                      </Badge>
                      <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                        Terraform
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group ${isMobile ? "" : "lg:col-span-1 sm:col-span-2"}`}
              >
                <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border border-zinc-700/50 h-full focus-within:ring-4 focus-within:ring-blue-500/50 backdrop-blur-sm shadow-xl shadow-black/20 group-hover:shadow-blue-500/20 group-hover:border-blue-500/30 transition-all duration-300" role="article" aria-labelledby="job-3-title">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Badge className="bg-blue-600" role="text">2021 - 2022</Badge>
                      <h3 id="job-3-title" className="text-xl font-bold">Sr. Software Engineer</h3>
                      <p className="text-zinc-300">Sky Airline</p>
                    </div>
                    <p className="text-zinc-300">
                      Construí varios microservicios, como la gestión de perfiles. Y escalé hasta Tech Leader Backup, desarrollando junto a mi equipo la nueva versión de AppSales, mientras se soportaba la anterior versión para más de 1 millón de transacciones mensuales en Android e iOS.
                    </p>
                    <div className="flex flex-wrap gap-2" aria-label="Tecnologías utilizadas">
                      <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                        React Native
                      </Badge>
                      <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                        NestJS
                      </Badge>
                      <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                        Firebase
                      </Badge>
                      <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                        GCP
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="text-center mt-8">
              <Button variant="link" className="text-blue-500 min-h-[48px]" asChild>
                <Link 
                  href="/sobre-mi" 
                  className="flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-500/50 rounded-lg px-6 py-3 min-h-[48px] touch-manipulation" 
                  aria-label="Ver toda mi experiencia laboral"
                  onClick={() => trackButtonClick('Ver más experiencia', 'home-experience-section')}
                >
                  Ver más experiencia
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">- Navegar a la página completa de experiencia laboral</span>
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection className="py-16 md:py-24 relative" delay={0.2} role="region" aria-labelledby="skills-heading">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-blue-900/5 to-slate-900/5 pointer-events-none"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="space-y-6 text-center pb-8">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-600/30 text-purple-300 text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg shadow-purple-600/10" role="text">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Certificaciones & habilidades
                </div>
              </motion.div>
              <motion.h2
                id="skills-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight"
              >
                <span className="bg-gradient-to-r from-white via-purple-100 to-blue-200 bg-clip-text text-transparent">
                  Habilidades técnicas
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
                role="text"
              >
                Especializado en <span className="text-purple-300 font-semibold">sistemas de pago, banca, finanzas</span> y tiendas online.
              </motion.p>
            </div>

            <Tabs defaultValue="technical" className="w-full">
              <div className="overflow-x-auto pb-2">
                <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 h-auto bg-zinc-900 p-1 min-w-max">
                  <TabsTrigger value="technical" className="data-[state=active]:bg-zinc-800 min-h-[44px] px-6 touch-manipulation">
                    Técnico
                  </TabsTrigger>
                  <TabsTrigger value="leadership" className="data-[state=active]:bg-zinc-800 min-h-[44px] px-6 touch-manipulation">
                    Liderazgo
                  </TabsTrigger>
                  <TabsTrigger value="domain" className="data-[state=active]:bg-zinc-800 min-h-[44px] px-6 touch-manipulation">
                    Dominio
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="technical" className="mt-6">
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 [&>*:nth-child(3)]:md:col-span-2 [&>*:nth-child(3)]:lg:col-span-1" aria-label="Categorías de habilidades técnicas">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border border-zinc-700/50 backdrop-blur-sm shadow-xl shadow-black/20 group-hover:shadow-purple-500/20 group-hover:border-purple-500/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-4 text-purple-300">Lenguajes</h3>
                        <div className="space-y-4" aria-label="Lenguajes de programación">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>JavaScript/TypeScript</span>
                              <span aria-label="Nivel de competencia: 99 por ciento">99%</span>
                            </div>
                            <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow="99" aria-valuemin="0" aria-valuemax="100" aria-label="JavaScript/TypeScript: 99% de competencia">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "99%" }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="h-full bg-blue-600 rounded-full"
                              ></motion.div>
                            </motion.div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Golang</span>
                              <span aria-label="Nivel de competencia: 99 por ciento">99%</span>
                            </div>
                            <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow="99" aria-valuemin="0" aria-valuemax="100" aria-label="Golang: 99% de competencia">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "99%" }}
                                transition={{ delay: 0.6, duration: 1 }}
                                className="h-full bg-blue-600 rounded-full"
                              ></motion.div>
                            </motion.div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Python</span>
                              <span aria-label="Nivel de competencia: 95 por ciento">95%</span>
                            </div>
                            <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100" aria-label="Python: 95% de competencia">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "95%" }}
                                transition={{ delay: 0.7, duration: 1 }}
                                className="h-full bg-blue-600 rounded-full"
                              ></motion.div>
                            </motion.div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Java/Kotlin</span>
                              <span aria-label="Nivel de competencia: 95 por ciento">95%</span>
                            </div>
                            <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100" aria-label="Java/Kotlin: 95% de competencia">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "95%" }}
                                transition={{ delay: 0.8, duration: 1 }}
                                className="h-full bg-blue-600 rounded-full"
                              ></motion.div>
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border border-zinc-700/50 backdrop-blur-sm shadow-xl shadow-black/20 group-hover:shadow-blue-500/20 group-hover:border-blue-500/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-4 text-blue-300">Frameworks</h3>
                        <div className="space-y-4" aria-label="Frameworks y librerías">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>React/Next.js</span>
                              <span aria-label="Nivel de competencia: 99 por ciento">99%</span>
                            </div>
                            <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow="99" aria-valuemin="0" aria-valuemax="100" aria-label="React/Next.js: 99% de competencia">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "99%" }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="h-full bg-blue-600 rounded-full"
                              ></motion.div>
                            </motion.div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Node.js/Nest.js</span>
                              <span aria-label="Nivel de competencia: 99 por ciento">99%</span>
                            </div>
                            <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow="99" aria-valuemin="0" aria-valuemax="100" aria-label="Node.js/Nest.js: 99% de competencia">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "99%" }}
                                transition={{ delay: 0.6, duration: 1 }}
                                className="h-full bg-blue-600 rounded-full"
                              ></motion.div>
                            </motion.div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>React Native</span>
                              <span aria-label="Nivel de competencia: 95 por ciento">95%</span>
                            </div>
                            <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100" aria-label="React Native: 95% de competencia">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "95%" }}
                                transition={{ delay: 0.7, duration: 1 }}
                                className="h-full bg-blue-600 rounded-full"
                              ></motion.div>
                            </motion.div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Vue.js/Angular</span>
                              <span aria-label="Nivel de competencia: 90 por ciento">90%</span>
                            </div>
                            <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" aria-label="Vue.js/Angular: 90% de competencia">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "90%" }}
                                transition={{ delay: 0.8, duration: 1 }}
                                className="h-full bg-blue-600 rounded-full"
                              ></motion.div>
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border border-zinc-700/50 backdrop-blur-sm shadow-xl shadow-black/20 group-hover:shadow-green-500/20 group-hover:border-green-500/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-4 text-green-300">Infraestructura</h3>
                        <div className="space-y-4" aria-label="Tecnologías de infraestructura">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Microservices</span>
                              <span aria-label="Nivel de competencia: 99 por ciento">99%</span>
                            </div>
                            <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow="99" aria-valuemin="0" aria-valuemax="100" aria-label="Microservices: 99% de competencia">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "99%" }}
                                transition={{ delay: 0.8, duration: 1 }}
                                className="h-full bg-blue-600 rounded-full"
                              ></motion.div>
                            </motion.div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>AWS</span>
                              <span aria-label="Nivel de competencia: 90 por ciento">90%</span>
                            </div>
                            <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" aria-label="AWS: 90% de competencia">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "90%" }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="h-full bg-blue-600 rounded-full"
                              ></motion.div>
                            </motion.div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Docker/Kubernetes</span>
                              <span aria-label="Nivel de competencia: 90 por ciento">90%</span>
                            </div>
                            <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" aria-label="Docker/Kubernetes: 90% de competencia">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "90%" }}
                                transition={{ delay: 0.6, duration: 1 }}
                                className="h-full bg-blue-600 rounded-full"
                              ></motion.div>
                            </motion.div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>CI/CD</span>
                              <span aria-label="Nivel de competencia: 90 por ciento">90%</span>
                            </div>
                            <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" aria-label="CI/CD: 90% de competencia">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "90%" }}
                                transition={{ delay: 0.7, duration: 1 }}
                                className="h-full bg-blue-600 rounded-full"
                              ></motion.div>
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="leadership" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2" aria-label="Habilidades de liderazgo">
                  <Card className="bg-zinc-900 border-zinc-800 focus-within:ring-2 focus-within:ring-blue-500">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-lg font-bold" id="team-management-heading">Gestión de equipos</h3>
                      <ul className="space-y-2 text-zinc-300" aria-labelledby="team-management-heading">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          Lideré equipos multifuncionales de hasta 15 desarrolladores
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          Implementamos metodologías ágiles mejorando X2 tiempos de entrega
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          He mentoreado a desarrolladores en tecnologías y su implementación.
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          Implementando marcos de trabajo colaborativo y CI/CD.
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-zinc-900 border-zinc-800 focus-within:ring-2 focus-within:ring-blue-500">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-lg font-bold" id="project-management-heading">Gestión de proyectos</h3>
                      <ul className="space-y-2 text-zinc-300" aria-labelledby="project-management-heading">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          Gestionó proyectos técnicos desde su concepción hasta su entrega.
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          Implementé estrategias de gestión de riesgos reduciendo los retrasos.
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          Estándares de documentación técnica establecidos en toda la organización.
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          Lideré la gestión de las partes para iniciativas complejas de varios equipos.
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="domain" className="mt-6">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [&>*:nth-child(3)]:md:col-span-2 [&>*:nth-child(3)]:lg:col-span-1" aria-label="Conocimiento de dominio">
                  <Card className="bg-zinc-900 border-zinc-800 focus-within:ring-2 focus-within:ring-blue-500">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-lg font-bold" id="payment-systems-heading">Sistemas de pago</h3>
                      <ul className="space-y-2 text-zinc-300" aria-labelledby="payment-systems-heading">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          Procesamiento de pagos en línea.
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          Interoperabilidad de plataformas de pagos.
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          Integración gestores de prevención del fraude.
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          Inicialización de procesos de cobro.
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-zinc-900 border-zinc-800 focus-within:ring-2 focus-within:ring-blue-500">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-lg font-bold" id="financial-systems-heading">Sistemas financieros</h3>
                      <ul className="space-y-2 text-zinc-300" aria-labelledby="financial-systems-heading">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          Implementación de sistemas ERP.
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          Integración bancaria y conciliación de cuentas.
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          Implementación de facturación electrónica.
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          Levantamiento de Data Warehousing
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-zinc-900 border-zinc-800 focus-within:ring-2 focus-within:ring-blue-500">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-lg font-bold" id="security-compliance-heading">Seguridad y cumplimiento</h3>
                      <ul className="space-y-2 text-zinc-300" aria-labelledby="security-compliance-heading">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          PCI DSS compliance
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          GDPR implementation
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          SOC 2 certification
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                          Penetration testing
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection className="py-16 md:py-24 relative" delay={0.3} role="region" aria-labelledby="projects-heading">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-cyan-900/5 to-slate-900/5 pointer-events-none"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="space-y-6 text-center pb-8">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-600/30 text-blue-300 text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg shadow-blue-600/10" role="text">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  Portafolio & proyectos
                </div>
              </motion.div>
              <motion.h2
                id="projects-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight"
              >
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                  Proyectos destacados
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
                role="text"
              >
                Soluciones <span className="text-blue-300 font-semibold">innovadoras</span> que he desarrollado para clientes del sector.
              </motion.p>
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2" aria-label="Lista de proyectos destacados">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                 
                >
                  <ProjectDialog
                    title={project.title}
                    description={project.description}
                    fullDescription={project.fullDescription}
                    technologies={project.technologies}
                    imageEmoji={project.imageEmoji}
                    year={project.year}
                    demoUrl={project.demoUrl}
                    repoUrl={project.repoUrl}
                  // Remove type prop since it doesn't exist in Project interface
                  >
                    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden cursor-pointer h-full focus-within:ring-2 focus-within:ring-blue-500" role="article" aria-labelledby={`project-title-${project.id}`}>
                      <div className="aspect-video bg-zinc-800 relative" role="img" aria-label={`Imagen del proyecto ${project.shortTitle}`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={project.imageAlt || `Captura de pantalla del proyecto ${project.title}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="text-4xl" aria-hidden="true">{project.imageEmoji}</div>
                          )}
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold" id={`project-title-${project.id}`}>{project.shortTitle}</h3>
                          <p className="text-zinc-300" role="text">{project.shortDescription}</p>
                        </div>
                        <div className="flex flex-wrap gap-2" aria-label="Tecnologías utilizadas">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="border-zinc-700 text-zinc-200"
                             
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-between items-center pt-4">
                          <Button 
                            variant="outline" 
                            className="border-zinc-700 hover:bg-zinc-800 focus:ring-2 focus:ring-blue-500 min-h-[44px] px-6 touch-manipulation" 
                            aria-label={`Ver más detalles del proyecto ${project.shortTitle}`}
                            onClick={() => trackProjectView(project.shortTitle, project.category)}
                          >
                            Ver más
                          </Button>
                          <div className="text-zinc-300 text-sm font-medium" role="text" aria-label={`Año de desarrollo: ${project.year}`}>{project.year}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </ProjectDialog>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="link" className="text-blue-500 focus:ring-2 focus:ring-blue-500 min-h-[48px]" asChild>
                <Link 
                  href="/recursos" 
                  className="flex items-center justify-center px-6 py-3 min-h-[48px] touch-manipulation focus:outline-none focus:ring-4 focus:ring-blue-500/50 rounded-lg" 
                  aria-label="Ver todos los proyectos en la página de recursos"
                  onClick={() => trackButtonClick('Ver otros proyectos', 'home-projects-section')}
                >
                  Ver otros proyectos
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Navegar a la página de recursos para ver más proyectos</span>
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="contact" className="py-12 md:py-16 relative" delay={0.4} role="region" aria-labelledby="contact-heading">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/5 via-emerald-900/5 to-slate-900/5 pointer-events-none"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="space-y-4 text-center pb-6">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-600/30 text-green-300 text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg shadow-green-600/10" role="text">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Contáctame
                </div>
              </motion.div>
              <motion.h2
                id="contact-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight"
              >
                <span className="bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent">
                  Convirtamos tu idea en realidad
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
                role="text"
              >
                ¿Tienes alguna <span className="text-green-300 font-semibold">idea en mente?</span> Comunícate conmigo y conversemos de ella.
              </motion.p>
            </div>

            <CompactContactSection
              formData={{
                name: contactFormData.name,
                email: contactFormData.email,
                subject: contactFormData.subject,
                message: contactFormData.message,
                honeypot: contactFormData.honeypot,
              }}
              onInputChange={handleContactInputChange}
              onSubmit={handleContactSubmit}
              isSubmitting={isSubmitting}
              isLimited={isContactLimited}
              formRef={contactFormRef}
              emailRevealed={emailRevealed}
              phoneRevealed={phoneRevealed}
              onRevealEmail={revealEmail}
              onRevealPhone={revealPhone}
              obfuscatedEmail={obfuscatedEmail}
              obfuscatedPhone={obfuscatedPhone}
              deobfuscateEmail={deobfuscateEmail}
              deobfuscatePhone={deobfuscatePhone}
            />
          </div>
        </AnimatedSection>
      </main>
      {/* CV Download Modal */}
      <Dialog open={cvModalOpen} onOpenChange={setCvModalOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Descargar CV</DialogTitle>
            <DialogDescription className="text-zinc-300">
              {!cvFormSubmitted
                ? "Por favor, ingresa tu información para acceder el CV, esperando quizás conocerte mejor en algun momento."
                : "¡Gracias! Ahora puedes ver o descargar el CV"}
            </DialogDescription>
          </DialogHeader>

          {!cvFormSubmitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault()

                // Validate form
                const errors = {
                  name: cvFormData.name ? "" : "El nombre es requerido",
                  email: !cvFormData.email
                    ? "El correo electrónico es requerido"
                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cvFormData.email)
                      ? "Por favor ingresa un correo electrónico válido"
                      : "",
                }

                setCvFormErrors(errors)

                // If no errors, submit form
                if (!errors.name && !errors.email) {
                  // Here you would typically send the data to your backend
                  console.log("Form submitted:", cvFormData)
                  setCvFormSubmitted(true)
                }
              }}
              className="space-y-4 py-2"
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Nombre completo
                </Label>
                <Input
                  id="name"
                  value={cvFormData.name}
                  autoCapitalize="words"
                  autoComplete="name"
                  autoCorrect="off"
                  spellCheck="false"
                  required
                  aria-required="true"
                  aria-invalid={!!cvFormErrors.name}
                  aria-errormessage="name-error"
                  aria-describedby="name-error"
                  aria-label="Nombre completo"
                  aria-labelledby="name-label"
                  aria-placeholder="Por favor ingresa tu nombre completo"
                  aria-autocorrect="off"
                  aria-spellcheck="false"
                  aria-autocapitalize="words"
                  onChange={(e) => setCvFormData({ ...cvFormData, name: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="Por favor ingresa tu nombre completo"
                />
                {cvFormErrors.name && <p className="text-red-500 text-sm">{cvFormErrors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  spellCheck="false"
                  required
                  aria-required="true"
                  aria-invalid={!!cvFormErrors.email}
                  aria-errormessage="email-error"
                  aria-describedby="email-error"
                  aria-label="Correo electrónico"
                  aria-labelledby="email-label"
                  aria-placeholder="Por favor ingrese su correo electrónico"
                  aria-autocorrect="off"
                  aria-spellcheck="false"
                  aria-autocapitalize="none"
                  value={cvFormData.email}
                  onChange={(e) => setCvFormData({ ...cvFormData, email: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="Por favor ingrese su correo electrónico"
                />
                {cvFormErrors.email && <p className="text-red-500 text-sm">{cvFormErrors.email}</p>}
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 min-h-[48px] touch-manipulation">
                Acceder al CV
              </Button>
            </form>
          ) : (
            <div className="space-y-4 py-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 flex-1 min-h-[48px] touch-manipulation"
                  onClick={() => window.open("/cv.pdf", "_blank")}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Ver el CV
                </Button>
                <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:ring-zinc-500/50 flex-1 min-h-[48px] touch-manipulation" asChild>
                  <a href="/cv.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar el CV
                  </a>
                </Button>
              </div>

              <div className="text-center text-zinc-300 text-sm">
                <p>¡Gracias por el interés, {cvFormData.name}!</p>
                <p>Se ha enviado tambien a {cvFormData.email}.</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <SiteFooter />
    </div>
  );
}
