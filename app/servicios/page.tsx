"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { ArrowRight, Code, Database, LineChart, Users, Layers, Shield, Server, Cpu, CheckCircle } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServicesSeo } from "@/components/services-seo"
import { DynamicBackground } from "@/components/dynamic-background"
import { ParallaxBackdrop } from "@/components/parallax-backdrop"
import { AuroraBackdrop } from "@/components/aurora-backdrop"
import { ServiceGlobe } from "@/components/service-globe"
import { useIsMobile } from "@/hooks/use-media-query"
import { trackCTAClick, trackButtonClick } from "@/lib/analytics";

// Variantes de animación
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

// Datos de servicios
const services = [
  {
    id: "technical-leadership",
    title: "Liderazgo",
    icon: Users,
    description: "Dirección estratégica y liderazgo para equipos de desarrollo y proyectos tecnológicos.",
    benefits: [
      "Mentorización de equipos de desarrollo",
      "Establecimiento de estándares técnicos",
      "Planificación estratégica de tecnología",
      "Gestión de equipos multidisciplinarios",
      "Optimización de procesos de desarrollo",
    ],
    caseStudy: {
      title: "Transformación de Equipo Técnico",
      description:
        "Lideré un equipo de 15 desarrolladores en la transformación de un sistema monolítico a una arquitectura de microservicios, mejorando la eficiencia del equipo en un 40% y reduciendo el tiempo de entrega en un 60%.",
    },
  },
  {
    id: "financial-systems",
    title: "Fintech & Banking",
    icon: LineChart,
    description: "Desarrollo e implementación de soluciones tecnológicas para el sector financiero y bancario.",
    benefits: [
      "Procesamiento de pagos seguro",
      "Sistemas de gestión de riesgos",
      "Plataformas de trading",
      "Soluciones de cumplimiento regulatorio",
      "Dashboards financieros en tiempo real",
    ],
    caseStudy: {
      title: "Plataforma de Pagos Enterprise",
      description:
        "Desarrollé una plataforma de pagos que procesa más de 2 millones de transacciones diarias para una institución financiera líder, con detección de fraude en tiempo real y cumplimiento de estándares PCI DSS.",
    },
  },
  {
    id: "backoffice-solutions",
    title: "Backoffice",
    icon: Database,
    description: "Automatización y optimización de procesos internos y operaciones de backoffice empresarial.",
    benefits: [
      "Automatización de flujos de trabajo",
      "Integración con sistemas ERP",
      "Gestión documental inteligente",
      "Dashboards operativos",
      "Reducción de procesos manuales",
    ],
    caseStudy: {
      title: "Suite de Automatización Backoffice",
      description:
        "Implementé una solución integral de automatización que redujo el tiempo de procesamiento manual en un 70% para un proveedor global de servicios financieros, resultando en ahorros significativos y una reducción de errores del 85%.",
    },
  },
  {
    id: "architecture-design",
    title: "Arquitectura",
    icon: Layers,
    description:
      "Diseño de arquitecturas de software escalables, resilientes y mantenibles para sistemas empresariales.",
    benefits: [
      "Arquitecturas de microservicios",
      "Diseño orientado a eventos",
      "Sistemas distribuidos",
      "Arquitecturas cloud-native",
      "Patrones de escalabilidad",
    ],
    caseStudy: {
      title: "Rediseño Arquitectónico",
      description:
        "Diseñé la arquitectura de un sistema financiero crítico que mejoró la escalabilidad en un 300%, redujo los costos de infraestructura en un 40% y disminuyó el tiempo de recuperación ante fallos de horas a minutos.",
    },
  },
  {
    id: "security-compliance",
    title: "Seguridad & compliance",
    icon: Shield,
    description: "Implementación de soluciones de seguridad y cumplimiento normativo para sistemas financieros.",
    benefits: [
      "Cumplimiento PCI DSS",
      "Implementación GDPR",
      "Auditorías de seguridad",
      "Protección de datos sensibles",
      "Gestión de identidades y accesos",
    ],
    caseStudy: {
      title: "Programa de Seguridad Financiera",
      description:
        "Implementé un programa completo de seguridad para una institución financiera que resultó en la certificación PCI DSS y SOC 2, reduciendo los incidentes de seguridad en un 75% y mejorando la confianza de los clientes.",
    },
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud",
    icon: Server,
    description: "Diseño e implementación de infraestructuras cloud escalables, seguras y optimizadas en costos.",
    benefits: [
      "Arquitecturas multi-cloud",
      "Infraestructura como código",
      "Optimización de costos cloud",
      "Estrategias de migración",
      "Automatización de despliegues",
    ],
    caseStudy: {
      title: "Migración a la Nube",
      description:
        "Lideré la migración de un sistema financiero crítico a AWS, implementando una arquitectura serverless que redujo los costos operativos en un 60% y mejoró la disponibilidad al 99.99%.",
    },
  },
  {
    id: "ai-integration",
    title: "Inteligencia artificial",
    icon: Cpu,
    description:
      "Incorporación de soluciones de inteligencia artificial y machine learning en sistemas financieros y de backoffice.",
    benefits: [
      "Detección de fraude con IA",
      "Análisis predictivo financiero",
      "Automatización inteligente de procesos",
      "Sistemas de recomendación",
      "Procesamiento de lenguaje natural",
    ],
    caseStudy: {
      title: "Sistema de Detección de Fraude con IA",
      description:
        "Desarrollé un sistema de detección de fraude basado en IA que redujo las transacciones fraudulentas en un 45% para un banco internacional, ahorrando millones en pérdidas potenciales.",
    },
  },
]

// Componente principal que envuelve con Suspense
export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <ServicesPageContent />
    </Suspense>
  )
}

// Componente interno que usa useSearchParams
function ServicesPageContent() {
  const _searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("technical-leadership")
  const _isMobile = useIsMobile()

  // Scroll a la sección que contiene los tabs — NO al TabsContent directo.
  // Si scrolleamos al elemento con id={service.id} (el TabsContent),
  // aterrizamos dentro del cuerpo del case-study y no se ve la barra de
  // tabs ni el heading "Servicios especializados". Scrollar al `<section>`
  // ancestro garantiza que el usuario vea el contexto completo.
  //
  // El offset ~96px compensa el header sticky (~65px) + margen visual.
  const scrollToServicesSection = (hash: string) => {
    const tabsContent = document.getElementById(hash)
    if (!tabsContent) return
    const section = tabsContent.closest("section")
    const target = section ?? tabsContent
    const HEADER_OFFSET = 96
    const top =
      target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
  }

  // Hash → tab: corre en mount Y cada vez que cambia el hash de la URL.
  // Ejemplos: navegar a /servicios#cloud-infrastructure (load directo o
  // SPA), click en un anchor interno, back/forward del browser.
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "")
      if (!hash || !services.some((s) => s.id === hash)) return

      // Activar la pestaña primero — el TabsContent recién se monta cuando
      // queda activa.
      setActiveTab(hash)

      // El scroll requiere que el TabsContent ya esté en el DOM. Doble
      // requestAnimationFrame nos asegura que React terminó la pasada de
      // render con el nuevo `value` activo antes de buscar el elemento.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToServicesSection(hash)
        })
      })
    }

    applyHash()
    window.addEventListener("hashchange", applyHash)
    return () => window.removeEventListener("hashchange", applyHash)
  }, [])

  // Función para cambiar la URL cuando cambia la pestaña
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    window.history.pushState({}, "", `/servicios#${value}`)

    // Mantener al usuario en la sección de tabs — sin saltar al cuerpo
    // del case-study cuando alterna entre pestañas.
    requestAnimationFrame(() => {
      scrollToServicesSection(value)
    })
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <DynamicBackground />
      <SiteHeader />
      <ServicesSeo />

      <main className="relative z-10 pt-12" id="main-content">
        {/* Hero editorial — distinto del de sobre-mi: en lugar de retrato,
            mosaico 2×3 de categorías de servicio con ícono y nombre, que ya
            insinúa la promesa visual. Mismo layout 7:5 + eyebrow + H1 con
            acento de color + stats strip + 2 CTAs. */}
        <div className="container mx-auto px-4">
        <motion.section
          className="relative w-full pt-6 md:pt-10 pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          aria-labelledby="services-hero-heading"
        >
          <div className="grid gap-10 lg:gap-14 lg:grid-cols-12 items-center">
            {/* Columna de copy — 7/12 en lg. */}
            <motion.div
              className="space-y-6 lg:col-span-7 order-2 lg:order-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs md:text-sm font-medium py-1.5 px-3 rounded-full backdrop-blur-sm">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                    aria-hidden="true"
                  />
                  Aceptando proyectos · Consultoría remota
                </span>
              </div>

              <h1
                id="services-hero-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-white max-w-[28ch]"
              >
                Consultoría y liderazgo técnico para
                <span className="text-blue-400">{" sistemas de pago, banking, fintech y backoffice"}</span>.
              </h1>

              <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl">
                Diseño y construyo{" "}
                <strong className="font-semibold text-white">
                  pasarelas de pago, integraciones bancarias y plataformas de
                  backoffice
                </strong>
                . Lidero equipos técnicos en proyectos críticos de LATAM y
                trabajo con stacks que cumplen PCI DSS e ISO 27001.
              </p>

              {/* Stats strip — credenciales operacionales. */}
              <ul
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3 max-w-2xl pt-2"
                aria-label="Credenciales operacionales"
              >
                {[
                  { value: "10+", label: "Años de stack fintech" },
                  { value: "6", label: "Áreas de especialización" },
                  { value: "50+", label: "Proyectos completados" },
                  { value: "PCI · ISO", label: "Compliance" },
                ].map((stat) => (
                  <li
                    key={stat.label}
                    className="surface-card-subtle px-3 py-3 text-center"
                  >
                    <div className="text-xl md:text-2xl font-extrabold tracking-tight text-white tabular-nums leading-none">
                      {stat.value}
                    </div>
                    <div className="mt-1.5 text-[10px] md:text-[11px] text-zinc-300 leading-tight">
                      {stat.label}
                    </div>
                  </li>
                ))}
              </ul>

              <div
                className="flex flex-col sm:flex-row gap-3 pt-2"
                role="group"
                aria-label="Acciones principales"
              >
                <Button
                  variant="gradient"
                  size="xl"
                  className="w-full sm:w-auto touch-manipulation group"
                  asChild
                >
                  <Link href="#technical-leadership">
                    Explorar áreas
                    <ArrowRight
                      className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button
                  variant="glass"
                  size="xl"
                  className="w-full sm:w-auto touch-manipulation"
                  asChild
                >
                  <Link href="/agendamiento">Agendar diagnóstico</Link>
                </Button>
              </div>
            </motion.div>

            {/* Globo 3D interactivo — reemplaza al retrato/imagen de
                sobre-mi. Las 6 categorías de servicio orbitan sobre la
                superficie y responden al cursor con tilt suave. */}
            <motion.div
              className="lg:col-span-5 order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <ServiceGlobe />
            </motion.div>
          </div>
        </motion.section>

        </div>

        {/* 01 — Servicios · transparente + parallax brackets. */}
        <div className="relative overflow-hidden">
          <ParallaxBackdrop variant="brackets" position="top-right" speed={0.18} />
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-4 py-16 md:py-24 space-y-12"
        >
          <motion.div variants={itemVariants} className="space-y-4 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.18em] text-blue-300 bg-blue-500/10 border border-blue-500/30">
              Áreas de especialización
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Servicios especializados
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Cada servicio está diseñado para generar valor real y resultados medibles en tu organización de la forma más ágil y eficiente posible.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <div className="overflow-x-auto pb-2">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:flex-wrap gap-2 h-auto bg-white/[0.03] backdrop-blur-md border border-white/10 p-2 mb-8 rounded-xl">
                  {services.map((service) => {
                    const IconComponent = service.icon
                    return (
                      <TabsTrigger
                        key={service.id}
                        value={service.id}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg bg-transparent border-0 text-zinc-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 whitespace-nowrap"
                      >
                        <IconComponent className="w-4 h-4" />
                        <span className="hidden sm:inline">{service.title}</span>
                      </TabsTrigger>
                    )
                  })}
                </TabsList>
              </div>

              {services.map((service) => {
                const IconComponent = service.icon
                return (
                  <TabsContent key={service.id} value={service.id} className="mt-12" id={service.id}>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-16"
                    >
                      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                          <div className="flex items-center gap-4">
                            <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
                              <IconComponent className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white">{service.title}</h3>
                          </div>
                          <p className="text-zinc-300 text-xl leading-relaxed">
                            {service.description}
                          </p>
                          <Button
                            variant="gradient"
                            size="lg"
                            className="touch-manipulation"
                            onClick={() => trackCTAClick('Solicitar Consulta', 'primary', `servicios-${service.id}-description`)}
                          >
                            <Link href={`/contacto?service=${service.id}`} className="flex items-center gap-2">
                              Solicitar Consulta
                              <ArrowRight className="w-5 h-5" />
                            </Link>
                          </Button>
                        </div>
                        <div className="surface-card-subtle aspect-video flex items-center justify-center overflow-hidden">
                          <div className="text-center space-y-4 px-4">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                              <IconComponent className="w-7 h-7 text-blue-400" aria-hidden="true" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xl font-semibold text-white">{service.title}</h4>
                              <p className="text-sm text-zinc-300">Solución especializada</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-8">
                        <div className="space-y-6">
                          <h4 className="text-2xl font-bold text-white">Beneficios clave</h4>
                          <div className="grid gap-4 sm:grid-cols-2">
                            {service.benefits.map((benefit, index) => (
                              <motion.div
                                key={index}
                                variants={itemVariants}
                                className="surface-card-subtle flex items-center gap-3 p-4"
                              >
                                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" aria-hidden="true" />
                                <span className="text-zinc-200">{benefit}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <motion.div variants={cardVariants} whileHover="hover">
                          <Card className="surface-card">
                            <CardContent className="p-8 space-y-6">
                              <div className="space-y-3">
                                <h5 className="text-xl font-semibold text-white">Caso de éxito</h5>
                                <h6 className="text-lg font-medium text-blue-400">{service.caseStudy.title}</h6>
                                <p className="text-zinc-300 leading-relaxed">{service.caseStudy.description}</p>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <Button
                                  variant="glass"
                                  size="default"
                                  onClick={() => trackButtonClick('Más información', `servicios-${service.id}-case-study`)}
                                >
                                  Más información
                                </Button>
                                <Button
                                  variant="gradient"
                                  size="default"
                                  asChild
                                  onClick={() => trackCTAClick('Contactar', 'primary', `servicios-${service.id}-case-study`)}
                                >
                                  <Link href={`/contacto?service=${service.id}`}>
                                    Contactar
                                  </Link>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                )
              })}
            </Tabs>
          </motion.div>
        </motion.section>

        </div>

        {/* 02 — Metodología · slate dark + parallax rings · bloque "proceso". */}
        <div className="relative overflow-hidden bg-zinc-950/50 backdrop-blur-sm border-y border-zinc-900/60">
          <ParallaxBackdrop variant="rings" position="bottom-right" speed={0.16} />
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-4 py-16 md:py-24 space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4 relative z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.18em] text-blue-300 bg-blue-500/10 border border-blue-500/30">
              Metodología probada
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Proceso de desarrollo
            </h2>
            <p className="text-base md:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              Un enfoque sistemático y probado que garantiza resultados
              excepcionales en cada proyecto: claro, medible y escalable.
            </p>
          </motion.div>

          {/* Enhanced Methodology Cards */}
          <motion.div variants={itemVariants} className="relative z-10">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Análisis Estratégico",
                  description: "Evaluación profunda de necesidades, objetivos y arquitectura actual del proyecto.",
                  icon: Database,
                  features: ["Auditoría técnica", "Análisis de requisitos", "Evaluación de riesgos"],
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "from-blue-600/20 to-cyan-600/20",
                  borderColor: "border-blue-500/30",
                },
                {
                  step: "02",
                  title: "Diseño Arquitectónico",
                  description: "Arquitectura escalable y planificación detallada de la solución tecnológica.",
                  icon: Layers,
                  features: ["Diseño de sistemas", "Prototipado", "Documentación técnica"],
                  color: "from-purple-500 to-pink-500",
                  bgColor: "from-purple-600/20 to-pink-600/20",
                  borderColor: "border-purple-500/30",
                },
                {
                  step: "03",
                  title: "Implementación Ágil",
                  description: "Desarrollo iterativo y despliegue con las mejores prácticas de la industria.",
                  icon: Code,
                  features: ["Desarrollo iterativo", "Testing continuo", "Despliegue automatizado"],
                  color: "from-emerald-500 to-teal-500",
                  bgColor: "from-emerald-600/20 to-teal-600/20",
                  borderColor: "border-emerald-500/30",
                },
              ].map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.div 
                    key={index} 
                    variants={{
                      hidden: { opacity: 0, y: 50, scale: 0.9 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.8,
                          delay: index * 0.2,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      },
                    }}
                    whileHover={{
                      y: -12,
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    className="group relative"
                  >
                    {/* Connection Line */}
                    {index < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-zinc-600 to-transparent z-0" />
                    )}
                    
                    <Card className="surface-card h-full relative overflow-hidden">
                      <CardContent className="p-7 md:p-8 space-y-5">
                        {/* Header — ícono glass + número de paso. */}
                        <div className="flex items-center justify-between">
                          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:border-blue-400/60 transition-colors duration-300">
                            <IconComponent className="w-6 h-6 text-blue-400" aria-hidden="true" />
                          </div>
                          <span className="text-5xl font-extrabold text-white/10 tabular-nums leading-none group-hover:text-white/20 transition-colors duration-300">
                            {item.step}
                          </span>
                        </div>

                        {/* Title + descripción. */}
                        <div className="space-y-3">
                          <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                            {item.title}
                          </h4>
                          <p className="text-zinc-300 leading-relaxed text-base">
                            {item.description}
                          </p>
                        </div>

                        {/* Features — lista con bullets. */}
                        <ul className="space-y-2 pt-3 border-t border-white/[0.06] list-none p-0 m-0">
                          {item.features.map((feature, featureIndex) => (
                            <motion.li
                              key={featureIndex}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.15 + featureIndex * 0.05 }}
                              className="flex items-center gap-2.5 text-sm text-zinc-300"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"
                                aria-hidden="true"
                              />
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>

                        {/* Barra de progreso. */}
                        <div className="pt-3">
                          <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              initial={{ width: "0%" }}
                              whileInView={{ width: "100%" }}
                              transition={{ duration: 1.5, delay: index * 0.3 }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div 
            variants={itemVariants}
            className="text-center relative z-10"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="gradient"
                size="xl"
                className="touch-manipulation group"
                asChild
                onClick={() => trackCTAClick('¿Alguna duda? Contáctame', 'primary', 'servicios-bottom-cta')}
              >
                <Link href="/contacto" className="inline-flex items-center gap-2">
                  ¿Alguna duda? Contáctame
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>
        </div>

        {/* 03 — Stats · transparente + parallax diagonals · números duros. */}
        <div className="relative overflow-hidden">
          <ParallaxBackdrop variant="diagonals" position="top-left" speed={0.14} opacityClass="opacity-[0.05]" />
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-4 py-16 md:py-24 space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.18em] text-blue-300 bg-blue-500/10 border border-blue-500/30">
              Resultados
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Impacto medible
            </h2>
            <p className="text-base md:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              Cada proyecto está diseñado para generar resultados tangibles y
              valor real.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "15+",
                label: "Años de Experiencia",
                description: "En desarrollo y liderazgo técnico",
                icon: Users,
              },
              {
                number: "50+",
                label: "Proyectos Completados",
                description: "Soluciones entregadas exitosamente",
                icon: CheckCircle,
              },
              {
                number: "2M+",
                label: "Transacciones Diarias",
                description: "Procesadas por sistemas desarrollados",
                icon: LineChart,
              },
              {
                number: "99.9%",
                label: "Disponibilidad",
                description: "En sistemas críticos implementados",
                icon: Shield,
              },
            ].map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <motion.div key={index} variants={cardVariants} whileHover="hover">
                  <Card className="surface-card relative overflow-hidden h-full group">
                    <CardContent className="p-7 md:p-8 space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white tabular-nums leading-none">
                          {stat.number}
                        </span>
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:border-blue-400/60 transition-colors">
                          <IconComponent className="w-5 h-5 text-blue-400" aria-hidden="true" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg md:text-xl font-semibold text-white">{stat.label}</h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">{stat.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>
        </div>

        {/* 04 — Testimonios · aurora studio · zona "editorial / social proof". */}
        <div className="relative overflow-hidden">
          <AuroraBackdrop tone="studio" intensity={0.6} />
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-4 py-16 md:py-24 space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.18em] text-blue-300 bg-blue-500/10 border border-blue-500/30">
              Testimonios
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Lo que dicen mis clientes
            </h2>
            <p className="text-base md:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              La confianza es el mejor indicador del valor que aporto a cada
              proyecto.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "José transformó completamente nuestra arquitectura de pagos. Su liderazgo técnico y visión estratégica fueron fundamentales para el éxito del proyecto.",
                author: "María González",
                role: "CTO, FinTech Solutions",
                avatar: "/placeholder.svg",
              },
              {
                quote:
                  "La implementación de nuestro sistema de backoffice superó todas las expectativas. José no solo entregó una solución técnica excelente, sino que también mentorizó a nuestro equipo.",
                author: "Carlos Rodríguez",
                role: "Director de Tecnología, Banco Nacional",
                avatar: "/placeholder.svg",
              },
              {
                quote:
                  "Su experiencia en sistemas financieros y cumplimiento regulatorio fue invaluable. Logramos la certificación PCI DSS en tiempo récord.",
                author: "Ana Martínez",
                role: "VP de Operaciones, PaymentCorp",
                avatar: "/placeholder.svg",
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover">
                <Card className="surface-card h-full relative overflow-hidden">
                  <CardContent className="p-7 md:p-8 space-y-5 flex flex-col h-full">
                    <span
                      className="text-5xl text-blue-400/40 font-serif leading-none select-none"
                      aria-hidden="true"
                    >
                      «
                    </span>
                    <p className="text-zinc-200 text-base md:text-lg leading-relaxed flex-1">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-blue-500/30 flex-shrink-0">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={`Foto de ${testimonial.author}`}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-white truncate">{testimonial.author}</p>
                        <p className="text-sm text-zinc-400 truncate">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        </div>

        {/* 05 — CTA final · slate dark + parallax brackets centrado · cierre. */}
        <div className="relative overflow-hidden bg-zinc-950/50 backdrop-blur-sm border-y border-zinc-900/60">
          <ParallaxBackdrop variant="brackets" position="center" speed={0.12} opacityClass="opacity-[0.04]" />
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-4 py-20 md:py-28 text-center space-y-10"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.18em] text-blue-300 bg-blue-500/10 border border-blue-500/30">
              ¿Listo para comenzar?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
              Transformemos tu visión en realidad
            </h2>
            <p className="text-base md:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              Cada gran proyecto comienza con una conversación. Hablemos sobre
              cómo puedo ayudarte a alcanzar tus objetivos tecnológicos y de
              negocio.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              variant="gradient"
              size="xl"
              className="touch-manipulation group"
              asChild
              onClick={() => trackCTAClick('Iniciar conversación', 'primary', 'servicios-final-cta')}
            >
              <Link href="/contacto">
                Iniciar conversación
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              variant="glass"
              size="xl"
              className="touch-manipulation"
              asChild
              onClick={() => trackButtonClick('Ver otros proyectos', 'servicios-final-cta')}
            >
              <Link href="/recursos">
                Ver otros proyectos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
