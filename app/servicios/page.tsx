"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
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

// Definimos los servicios y sus IDs para la navegación
const services = [
  {
    id: "technical-leadership",
    title: "Liderazgo Técnico",
    icon: <Users className="h-10 w-10 text-blue-500" aria-hidden="true" />,
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
    title: "Sistemas Financieros",
    icon: <LineChart className="h-10 w-10 text-blue-500" />,
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
    title: "Soluciones de Backoffice",
    icon: <Database className="h-10 w-10 text-blue-500" />,
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
    title: "Diseño de Arquitectura",
    icon: <Layers className="h-10 w-10 text-blue-500" />,
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
    title: "Seguridad y Cumplimiento",
    icon: <Shield className="h-10 w-10 text-blue-500" />,
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
    title: "Infraestructura Cloud",
    icon: <Server className="h-10 w-10 text-blue-500" />,
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
    title: "Integración de IA",
    icon: <Cpu className="h-10 w-10 text-blue-500" />,
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

      // Scroll suave a la sección
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [searchParams])

  // Función para cambiar la URL cuando cambia la pestaña
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    window.history.pushState({}, "", `/services#${value}`)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <ServicesSeo />

      <main className="container py-8 md:py-12 space-y-16 md:space-y-24" id="main-content">
        {/* Hero Section */}
        <AnimatedSection className="py-8 md:py-24 space-y-8">
          <div className="grid gap-8 md:gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <Badge variant="outline" className="border-blue-500 text-blue-500">
                    Servicios Profesionales
                  </Badge>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                >
                  Soluciones Tecnológicas Especializadas
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-lg md:text-xl text-zinc-400"
                >
                  Servicios de consultoría y desarrollo para el sector financiero y empresarial
                </motion.p>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-zinc-400 leading-relaxed"
              >
                Con más de una década de experiencia en el desarrollo de sistemas financieros y liderazgo técnico,
                ofrezco soluciones tecnológicas a medida que transforman la operativa de tu negocio, mejoran la
                eficiencia y potencian el crecimiento.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                  Explorar Servicios
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="outline" className="border-zinc-700 hover:bg-zinc-900 w-full sm:w-auto" asChild>
                  <Link href="/contact">Contactar</Link>
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
              className="relative aspect-square rounded-2xl overflow-hidden border-2 border-zinc-800 max-w-md mx-auto md:mx-0 w-full"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"
                aria-hidden="true"
              ></div>
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Servicios de consultoría tecnológica"
                width={600}
                height={600}
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Services Navigation */}
        <AnimatedSection className="py-8 md:py-12 space-y-8" delay={0.1}>
          <div className="space-y-4 text-center">
            <Badge variant="outline" className="border-blue-500 text-blue-500">
              Áreas de Especialización
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Servicios Profesionales</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Soluciones tecnológicas especializadas para potenciar tu negocio y optimizar tus operaciones
            </p>
          </div>

          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
            aria-label="Servicios profesionales"
          >
            <div className="overflow-x-auto pb-2">
              <TabsList
                className={`grid ${
                  isMobile ? "grid-cols-2" : "md:grid-cols-4 lg:flex lg:flex-wrap"
                } h-auto bg-zinc-900 p-1 mb-8 min-w-max`}
                aria-label="Categorías de servicios"
              >
                {services.map((service) => (
                  <TabsTrigger
                    key={service.id}
                    value={service.id}
                    className="data-[state=active]:bg-zinc-800 py-3 whitespace-nowrap"
                    id={service.id}
                  >
                    {service.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {services.map((service) => (
              <TabsContent key={service.id} value={service.id} className="mt-6 space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="flex items-start flex-col sm:flex-row sm:items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center mb-2 sm:mb-0"
                        aria-hidden="true"
                      >
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold">{service.title}</h3>
                        <p className="text-zinc-400">{service.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg md:text-xl font-semibold">Beneficios</h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span className="text-zinc-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" asChild>
                        <Link href={`/contact?service=${service.id}`}>
                          Solicitar este Servicio
                          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Card className="bg-zinc-900 border-zinc-800 h-full">
                      <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                          <Badge className="bg-blue-600">Caso de Éxito</Badge>
                          <h4 className="text-xl font-bold">{service.caseStudy.title}</h4>
                        </div>
                        <p className="text-zinc-400">{service.caseStudy.description}</p>

                        <div className="pt-4">
                          <Button
                            variant="outline"
                            className="border-zinc-700 hover:bg-zinc-800 w-full sm:w-auto"
                            asChild
                          >
                            <Link href="/resources">Ver Proyectos Relacionados</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Related Services */}
                <div className="pt-8">
                  <h4 className="text-xl font-semibold mb-6">Servicios Relacionados</h4>
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {services
                      .filter((s) => s.id !== service.id)
                      .slice(0, 3)
                      .map((relatedService) => (
                        <motion.div
                          key={relatedService.id}
                          whileHover={{ y: -5 }}
                          className="cursor-pointer"
                          onClick={() => handleTabChange(relatedService.id)}
                        >
                          <Card className="bg-zinc-900 border-zinc-800">
                            <CardContent className="p-6 space-y-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center"
                                  aria-hidden="true"
                                >
                                  {relatedService.icon}
                                </div>
                                <h5 className="font-bold">{relatedService.title}</h5>
                              </div>
                              <p className="text-zinc-400 text-sm line-clamp-2">{relatedService.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </AnimatedSection>

        {/* Process Section */}
        <AnimatedSection className="py-8 md:py-12 space-y-8" delay={0.2}>
          <div className="space-y-4 text-center">
            <Badge variant="outline" className="border-blue-500 text-blue-500">
              Metodología
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Proceso de Trabajo</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Un enfoque estructurado para garantizar resultados excepcionales en cada proyecto
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Consulta Inicial",
                description: "Evaluación detallada de tus necesidades, objetivos y desafíos tecnológicos actuales.",
                icon: <Users className="h-6 w-6 text-blue-500" aria-hidden="true" />,
              },
              {
                step: "02",
                title: "Propuesta Personalizada",
                description: "Desarrollo de una estrategia y plan de acción adaptado a tus requerimientos específicos.",
                icon: <Code className="h-6 w-6 text-blue-500" aria-hidden="true" />,
              },
              {
                step: "03",
                title: "Implementación",
                description: "Ejecución metódica del plan con comunicación constante y adaptación según sea necesario.",
                icon: <Layers className="h-6 w-6 text-blue-500" aria-hidden="true" />,
              },
              {
                step: "04",
                title: "Seguimiento y Optimización",
                description: "Monitoreo continuo, evaluación de resultados y mejoras incrementales.",
                icon: <LineChart className="h-6 w-6 text-blue-500" aria-hidden="true" />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-zinc-900 border-zinc-800 h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div
                        className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </div>
                      <span className="text-3xl font-bold text-blue-500">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-zinc-400">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Testimonials */}
        <AnimatedSection className="py-8 md:py-12 space-y-8" delay={0.3}>
          <div className="space-y-4 text-center">
            <Badge variant="outline" className="border-blue-500 text-blue-500">
              Testimonios
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Lo que Dicen mis Clientes</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Experiencias de clientes que han transformado sus negocios con mis servicios
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "José transformó completamente nuestro sistema de backoffice, reduciendo los tiempos de procesamiento en un 70% y mejorando la satisfacción de nuestros empleados.",
                author: "María Rodríguez",
                position: "CTO, FinTech Solutions",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                quote:
                  "Su liderazgo técnico fue clave para el éxito de nuestro proyecto. Implementó estándares y prácticas que siguen beneficiando a nuestro equipo hasta hoy.",
                author: "Carlos Méndez",
                position: "Director de Tecnología, Banco Internacional",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                quote:
                  "La arquitectura de microservicios que José diseñó para nosotros ha sido fundamental para nuestro crecimiento, permitiéndonos escalar sin problemas durante los últimos tres años.",
                author: "Ana Martínez",
                position: "CEO, Payments Pro",
                image: "/placeholder.svg?height=100&width=100",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-zinc-900 border-zinc-800 h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="text-2xl text-blue-500" aria-hidden="true">
                      "
                    </div>
                    <p className="text-zinc-300 italic">{testimonial.quote}</p>
                    <div className="flex items-center gap-4 pt-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={`Foto de ${testimonial.author}`}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-zinc-400 text-sm">{testimonial.position}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection className="py-8 md:py-12" delay={0.4}>
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0">
            <CardContent className="p-6 md:p-8 lg:p-12 text-center space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                ¿Listo para Transformar tu Negocio?
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto text-base md:text-lg">
                Agenda una consulta gratuita para discutir cómo puedo ayudarte a alcanzar tus objetivos tecnológicos y
                empresariales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 w-full sm:w-auto" asChild>
                  <Link href="/schedule">Agendar Consulta</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                  asChild
                >
                  <Link href="/contact">Contactar</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </main>

      <SiteFooter />
    </div>
  )
}
