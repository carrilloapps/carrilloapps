"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/legacy/image"
import { motion, type Variants } from "framer-motion"
import { ArrowRight, Code, Database, LineChart, Users, Layers, Shield, Server, Cpu, CheckCircle } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedSection } from "@/components/animated-section"
import { ServicesSeo } from "@/components/services-seo"
import { useIsMobile } from "@/hooks/use-media-query"

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
    <Suspense fallback={<div className="min-h-screen bg-black"></div>}>
      <ServicesPageContent />
    </Suspense>
  )
}

// Componente interno que usa useSearchParams
function ServicesPageContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("technical-leadership")
  const isMobile = useIsMobile()

  // Efecto para manejar la navegación por anclas
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash && services.some((service) => service.id === hash)) {
      setActiveTab(hash)

      // Scroll suave a la sección con un pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    }
  }, [])

  // Función para cambiar la URL cuando cambia la pestaña
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    window.history.pushState({}, "", `/servicios#${value}`)

    // Scroll suave al elemento correspondiente
    setTimeout(() => {
      const element = document.getElementById(value)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <ServicesSeo />

      <main className="container py-12 md:py-16 space-y-20 md:space-y-32" id="main-content">
        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="py-16 md:py-32 space-y-12"
        >
          <div className="grid gap-12 md:gap-16 md:grid-cols-2 items-center">
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-4">
                <motion.div variants={itemVariants}>
                  <Badge
                    variant="outline"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 text-white text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg shadow-blue-600/10"
                  >
                    Servicios profesionales
                  </Badge>
                </motion.div>
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
                >
                  Soluciones tecnológicas{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    de alto impacto
                  </span>
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="text-xl text-zinc-400 leading-relaxed max-w-2xl"
                >
                  Transformo ideas en soluciones tecnológicas robustas y escalables.
                  Especializado en sistemas financieros, liderazgo técnico y arquitecturas empresariales.
                </motion.p>
              </div>
              <motion.div variants={itemVariants}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                  asChild
                >
                  <Link href="#technical-leadership">
                    Explorar servicios
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants} className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl border border-zinc-800/50 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <Code className="w-12 h-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">15+ Años</h3>
                    <p className="text-zinc-400">de Experiencia</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Services Navigation */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-12 space-y-12"
        >
          <motion.div variants={itemVariants} className="space-y-6 text-center">
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 text-white text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg shadow-blue-600/10"
            >
              Áreas de especialización
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Servicios especializados
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Cada servicio está diseñado para generar valor real y resultados medibles en tu organización de la forma más ágil y eficiente posible.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <div className="overflow-x-auto pb-2">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:flex-wrap gap-2 h-auto bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 p-2 mb-8 rounded-xl">
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
                          <p className="text-zinc-400 text-xl leading-relaxed">
                            {service.description}
                          </p>
                          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                            <Link href={`/contact?service=${service.id}`} className="flex items-center gap-2">
                              Solicitar Consulta
                              <ArrowRight className="w-5 h-5" />
                            </Link>
                          </Button>
                        </div>
                        <div className="aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-zinc-800/50 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                          <div className="text-center space-y-4">
                            <IconComponent className="w-16 h-16 text-blue-400 mx-auto" />
                            <div className="space-y-2">
                              <h4 className="text-xl font-semibold text-white">{service.title}</h4>
                              <p className="text-zinc-400">Solución Especializada</p>
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
                                className="flex items-center gap-3 p-4 bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 rounded-lg border border-zinc-700/50 backdrop-blur-sm"
                              >
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <span className="text-zinc-300">{benefit}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <motion.div variants={cardVariants} whileHover="hover">
                          <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border-zinc-700/50 backdrop-blur-sm">
                            <CardContent className="p-8 space-y-6">
                              <div className="space-y-3">
                                <h5 className="text-xl font-semibold text-white">Caso de éxito</h5>
                                <h6 className="text-lg font-medium text-blue-400">{service.caseStudy.title}</h6>
                                <p className="text-zinc-400 leading-relaxed">{service.caseStudy.description}</p>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-600/20">
                                  Más información
                                </Button>
                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                                  <Link href={`/contact?service=${service.id}`}>
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

        {/* Enhanced Methodology Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 space-y-16 relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6 relative z-10">
            <Badge 
              variant="outline" 
              className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/50 text-blue-400 backdrop-blur-sm px-4 py-2"
            >
              Metodología probada
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Proceso de desarrollo
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Un enfoque sistemático y probado que garantiza resultados excepcionales en cada proyecto, de forma clara, medible y escalable.
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
                    
                    <Card className={`bg-zinc-900/90 ${item.borderColor} backdrop-blur-sm h-full relative overflow-hidden transition-all duration-500 group-hover:bg-zinc-800/90 group-hover:shadow-2xl group-hover:shadow-${item.color.split(' ')[1].split('-')[0]}-500/20`}>
                      {/* Card Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      <CardContent className="p-8 space-y-6 relative z-10">
                        {/* Header with Icon and Step */}
                        <div className="flex items-center justify-between">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.bgColor} flex items-center justify-center ${item.borderColor} border-2 group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className={`w-8 h-8 text-transparent bg-gradient-to-r ${item.color} bg-clip-text`} />
                          </div>
                          <span className={`text-4xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-300`}>
                            {item.step}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                          <h4 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-zinc-300 transition-all duration-300">
                            {item.title}
                          </h4>
                          <p className="text-zinc-400 leading-relaxed text-base group-hover:text-zinc-300 transition-colors duration-300">
                            {item.description}
                          </p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-3 pt-4 border-t border-zinc-800/50 group-hover:border-zinc-700/50 transition-colors duration-300">
                          {item.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                              className="flex items-center gap-3 text-sm"
                            >
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color} flex-shrink-0`} />
                              <span className="text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Progress Indicator */}
                        <div className="pt-4">
                          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
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
                size="lg" 
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl shadow-blue-500/25 hover:shadow-purple-500/25 transition-all duration-300"
              >
                <Link href="/contacto" className="flex items-center gap-3">
                  ¿Alguna duda? Contáctame
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-16 space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 text-white text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg shadow-blue-600/10"
            >
              Resultados
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Impacto medible
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Cada proyecto está diseñado para generar resultados tangibles y valor real.
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
                  <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border-zinc-700/50 backdrop-blur-sm relative overflow-hidden h-full">
                    <CardContent className="p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {stat.number}
                        </span>
                        <div className="p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500/30">
                          <IconComponent className="w-6 h-6 text-purple-400" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-xl font-semibold text-white">{stat.label}</h4>
                        <p className="text-zinc-400 leading-relaxed">{stat.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-16 space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 text-white text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg shadow-blue-600/10"
            >
              Testimonios
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Lo que dicen mis clientes
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              La confianza es el mejor indicador del valor que aporto a cada proyecto.
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
                <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border-zinc-700/50 backdrop-blur-sm h-full relative overflow-hidden">
                  <CardContent className="p-8 space-y-6">
                    <div className="text-4xl text-green-400 font-serif" aria-hidden="true">
                      "
                    </div>
                    <p className="text-zinc-300 italic text-lg leading-relaxed">{testimonial.quote}</p>
                    <div className="flex items-center gap-4 pt-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-green-500/30">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={`Foto de ${testimonial.author}`}
                          width={56}
                          height={56}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-white">{testimonial.author}</p>
                        <p className="text-zinc-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 md:py-32 text-center space-y-12"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 text-white text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg shadow-blue-600/10"
            >
              ¿Listo para comenzar?
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Transformemos tu visión en realidad
            </h2>
            <p className="text-xl text-zinc-400 max-w-4xl mx-auto leading-relaxed">
              Cada gran proyecto comienza con una conversación. Hablemos sobre cómo puedo ayudarte a
              alcanzar tus objetivos tecnológicos y de negocio.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl"
              asChild
            >
              <Link href="/contacto">
                Iniciar conversación
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 px-12 py-6 text-xl"
              asChild
            >
              <Link href="/recursos">
                Ver otros proyectos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  )
}
