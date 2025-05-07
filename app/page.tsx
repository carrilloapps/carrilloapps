"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail, Twitter, Download, Eye } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

import { projects } from "@/data/projects"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AnimatedSection } from "@/components/animated-section"
import { ProjectDialog } from "@/components/project-dialog"
import { useIsMobile } from "@/hooks/use-media-query"

export default function Home() {
  const isMobile = useIsMobile()
  const [cvModalOpen, setCvModalOpen] = useState(false)
  const [cvFormSubmitted, setCvFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [formErrors, setFormErrors] = useState({ name: "", email: "" })

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-8 md:py-12 space-y-16 md:space-y-24" id="main-content">
        {/* Hero Section */}
        <AnimatedSection className="py-8 md:py-24 space-y-8">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <Badge variant="outline" className="border-blue-500 text-blue-500">
                    Tech Leader
                  </Badge>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                >
                  José Carrillo
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-lg md:text-xl text-zinc-400"
                >
                  Senior Software Developer & Payments Solutions Expert
                </motion.p>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-zinc-400 leading-relaxed"
              >
                Con más de 10 años de experiencia desarrollando sistemas financieros y de pagos robustos, liderando equipos técnicos, ayudo a las empresas a transformar sus operaciones de backoffice o desarrollar productos y servicios mediante soluciones de software innovadoras.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                  <Link href="/resources" className="flex items-center">
                    Ver proyectos
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-900 w-full sm:w-auto"
                  onClick={() => setCvModalOpen(true)}
                >
                  Descargar CV
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex gap-4 pt-4 justify-center sm:justify-start"
              >
                <Link
                  href="https://github.com/carrilloapps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white"
                  aria-label="GitHub de José Carrillo"
                >
                  <Github className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://linkedin.com/in/carrilloapps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white"
                  aria-label="LinkedIn de José Carrillo"
                >
                  <Linkedin className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="https://x.com/carrilloapps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white"
                  aria-label="X de José Carrillo"
                >
                  <Twitter className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">X</span>
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
              className="relative aspect-square rounded-full bg-gradient-to-br from-blue-600 to-purple-600 opacity-80 blur-3xl max-w-md mx-auto"
              aria-hidden="true"
            />
          </div>
        </AnimatedSection>

        {/* Experience Section */}
        <AnimatedSection className="py-8 md:py-12 space-y-8" delay={0.1}>
          <div className="space-y-4 text-center">
            <Badge variant="outline" className="border-blue-500 text-blue-500">
              Trayectoria & Experiencia
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Experiencia profesional</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Una década de experiencia construyendo soluciones tecnologías.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-zinc-900 border-zinc-800 h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Badge className="bg-blue-600">2024 - Presente</Badge>
                    <h3 className="text-xl font-bold">Tech Leader</h3>
                    <p className="text-zinc-400">Yummy Inc.</p>
                  </div>
                  <p className="text-zinc-400">
                    Liderando un equipo de 7 desarrolladores en el diseño e implementación de herramientas innovadoras para Pagos y Finanzas. Implementando medios de pagos y arquitecturas de microservicios que mejoran la confiabilidad del sistema en un 40%.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                      Node.js
                    </Badge>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                      React
                    </Badge>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                      AWS
                    </Badge>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
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
              whileHover={{ y: -5 }}
            >
              <Card className="bg-zinc-900 border-zinc-800 h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Badge className="bg-blue-600">2022 - 2023</Badge>
                    <h3 className="text-xl font-bold">Developer Lead</h3>
                    <p className="text-zinc-400">Cencosud S.A.</p>
                  </div>
                  <p className="text-zinc-400">
                    Desarrollé herramientas y módulos de contabilidad con integración en SAP que gestionan cerca de 2 millones en transacciones semanales. Optimicé consultas de bases de datos, lo que resultó en tiempos de procesamiento un 60% más rápidos.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                      TypeScript
                    </Badge>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                      Amazon Redshift
                    </Badge>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
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
              whileHover={{ y: -5 }}
              className={isMobile ? "" : "lg:col-span-1 sm:col-span-2"}
            >
              <Card className="bg-zinc-900 border-zinc-800 h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Badge className="bg-blue-600">2021 - 2022</Badge>
                    <h3 className="text-xl font-bold">Sr. Software Engineer</h3>
                    <p className="text-zinc-400">Sky Airline</p>
                  </div>
                  <p className="text-zinc-400">
                    Construí varios microservicios, como la gestión de perfiles. Y escale hasta Tech Leader Backup, desarrollando junto a mi equipo la nueva versión de AppSales, mientras se soportaba la anterios versión para más de 1 millón de transacciones mensuales en Android e iOS.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                      React Native
                    </Badge>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                      NestJS
                    </Badge>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                      Firebase
                    </Badge>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                      GCP
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="text-center">
            <Button variant="link" className="text-blue-500">
              <Link href="/about" className="flex items-center">
                Ver más experiencia
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection className="py-8 md:py-12 space-y-8" delay={0.2}>
          <div className="space-y-4 text-center">
            <Badge variant="outline" className="border-blue-500 text-blue-500">
              Certificaciones
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Habilidades técnicas</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Especializado en sistemas de pago, banca, finanzas y tiendas online.
            </p>
          </div>

          <Tabs defaultValue="technical" className="w-full">
            <div className="overflow-x-auto pb-2">
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 h-auto bg-zinc-900 p-1 min-w-max">
                <TabsTrigger value="technical" className="data-[state=active]:bg-zinc-800">
                  Técnico
                </TabsTrigger>
                <TabsTrigger value="leadership" className="data-[state=active]:bg-zinc-800">
                  Liderazgo
                </TabsTrigger>
                <TabsTrigger value="domain" className="data-[state=active]:bg-zinc-800">
                  Dominio
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="technical" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Lenguajes</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>JavaScript/TypeScript</span>
                          <span>99%</span>
                        </div>
                        <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
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
                          <span>99%</span>
                        </div>
                        <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
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
                          <span>95%</span>
                        </div>
                        <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
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
                          <span>95%</span>
                        </div>
                        <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
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

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Frameworks</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>React/Next.js</span>
                          <span>99%</span>
                        </div>
                        <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
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
                          <span>99%</span>
                        </div>
                        <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
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
                          <span>95%</span>
                        </div>
                        <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
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
                          <span>90%</span>
                        </div>
                        <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
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

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Infraestructura</h3>
                    <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Microservices</span>
                          <span>99%</span>
                        </div>
                        <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
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
                          <span>90%</span>
                        </div>
                        <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
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
                          <span>90%</span>
                        </div>
                        <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
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
                          <span>90%</span>
                        </div>
                        <motion.div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
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
              </div>
            </TabsContent>

            <TabsContent value="leadership" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-bold">Gestión de equipos</h3>
                    <ul className="space-y-2 text-zinc-400">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Lideré equipos multifuncionales de hasta 15 desarrolladores
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Implementamos metodologías ágiles mejorando X2 tiempos de entrega
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        He mentoreado a desarrolladores en tecnologías y su implementación.
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Implementando marcos de trabajo colaborativo y CI/CD.
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-bold">Gestión de proyectos</h3>
                    <ul className="space-y-2 text-zinc-400">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Gestionó proyectos técnicos desde su concepción hasta su entrega.
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Implementé estrategias de gestión de riesgos reduciendo los retrasos.
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Estándares de documentación técnica establecidos en toda la organización.
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Lideré la gestión de las partes para iniciativas complejas de varios equipos.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="domain" className="mt-6">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-bold">Sistemas de pago</h3>
                    <ul className="space-y-2 text-zinc-400">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Procesamiento de pagos en línea.
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Interoperabilidad de plataformas de pagos.
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Integración gestores de prevención del fraude.
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Inicialización de procesos de cobro.
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-bold">Sistemas financieron</h3>
                    <ul className="space-y-2 text-zinc-400">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Impementación de sistemas ERP.
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Integración bancaría y conciliación de cuentas.	
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Implementación de facturación electrónica.
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Levantemiento de Data Warehousing
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-bold">Seguridad y cumplimiento</h3>
                    <ul className="space-y-2 text-zinc-400">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        PCI DSS compliance
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        GDPR implementation
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        SOC 2 certification
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Penetration testing
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection className="py-8 md:py-12 space-y-8" delay={0.3}>
          <div className="space-y-4 text-center">
            <Badge variant="outline" className="border-blue-500 text-blue-500">
              Portafolio
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Proyectos destacados</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Soluciones innovadoras que he desarrollado para clientes del sector.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
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
                  type={project.type}
                >
                  <Card className="bg-zinc-900 border-zinc-800 overflow-hidden cursor-pointer h-full">
                    <div className="aspect-video bg-zinc-800 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.imageAlt || project.title}
                            layout="fill"
                            objectFit="cover"
                          />
                        ) : (
                          <div className="text-4xl">{project.imageEmoji}</div>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{project.shortTitle}</h3>
                        <p className="text-zinc-400">{project.shortDescription}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="border-zinc-700 text-zinc-400"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                          Ver más
                        </Button>
                        <div className="text-zinc-500 text-sm">{project.year}</div>
                      </div>
                    </CardContent>
                  </Card>
                </ProjectDialog>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="link" className="text-blue-500" asChild>
              <Link href="/resources">
                Ver otros proyectos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="contact" className="py-8 md:py-12 space-y-8" delay={0.4}>
          <div className="space-y-4 text-center">
            <Badge variant="outline" className="border-blue-500 text-blue-500">
              Contáctame
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Convirtamos tu idea en realidad</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              ¿Tienes alguna idea en mente? Comunicate conmigo y conversemos sobre tu idea.
            </p>
          </div>

          <Card className="bg-zinc-900 border-zinc-800 max-w-2xl mx-auto">
            <CardContent className="p-6 space-y-4">
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nombre
                    </label>
                    <input
                      id="name"
                      placeholder="Su nombre completo"
                      className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-visible:ring-offset-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Si dirección de correo electrónico"
                      className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-visible:ring-offset-2"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Asunto
                  </label>
                  <input
                    id="subject"
                    placeholder="¿Cómo puedo ayudarte?"
                    className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-visible:ring-offset-2"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    placeholder="Dame un poco más de contexto para entender tu idea"
                    rows={5}
                    className="flex w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-visible:ring-offset-2"
                  ></textarea>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Enviar mensaje</Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-zinc-900 border-zinc-800 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Mail className="h-10 w-10 text-blue-500" />
                  <h3 className="text-lg font-bold">Correo electrónico</h3>
                  <p className="text-zinc-400">m@carrillo.app</p>
                  <Button variant="link" className="text-blue-500">
                    Enviame un mensaje
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-zinc-900 border-zinc-800 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Linkedin className="h-10 w-10 text-blue-500" />
                  <h3 className="text-lg font-bold">LinkedIn</h3>
                  <p className="text-zinc-400">Conéctate profesionalmente</p>
                  <Button variant="link" className="text-blue-500">
                    Ver perfil
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ y: -5 }}
              className="sm:col-span-2 lg:col-span-1"
            >
              <Card className="bg-zinc-900 border-zinc-800 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Github className="h-10 w-10 text-blue-500" />
                  <h3 className="text-lg font-bold">GitHub</h3>
                  <p className="text-zinc-400">Conoce mis proyectos</p>
                  <Button variant="link" className="text-blue-500" asChild>
                    <Link href="https://github.com/carrilloapps" target="_blank">
                      Ver repositorios
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </AnimatedSection>
      </main>

      {/* CV Download Modal */}
      <Dialog open={cvModalOpen} onOpenChange={setCvModalOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Descargar CV</DialogTitle>
            <DialogDescription className="text-zinc-400">
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
                  name: formData.name ? "" : "El nombre es requerido",
                  email: !formData.email
                    ? "El correo electrónico es requerido"
                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                      ? "Por favor ingresa un correo electrónico válido"
                      : "",
                }

                setFormErrors(errors)

                // If no errors, submit form
                if (!errors.name && !errors.email) {
                  // Here you would typically send the data to your backend
                  console.log("Form submitted:", formData)
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
                  value={formData.name}
                  autoCapitalize="words"
                  autoComplete="name"
                  autoCorrect="off"
                  spellCheck="false"
                  required
                  aria-required="true"
                  aria-invalid={!!formErrors.name}
                  aria-errormessage="name-error"
                  aria-describedby="name-error"
                  aria-label="Nombre completo"
                  aria-labelledby="name-label"
                  aria-placeholder="Por favor ingresa tu nombre completo"
                  aria-autocorrect="off"
                  aria-spellcheck="false"
                  aria-autocapitalize="words"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="Por favor ingresa tu nombre completo"
                />
                {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
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
                  aria-invalid={!!formErrors.email}
                  aria-errormessage="email-error"
                  aria-describedby="email-error"
                  aria-label="Correo electrónico"
                  aria-labelledby="email-label"
                  aria-placeholder="Por favor ingrese su correo electrónico"
                  aria-autocorrect="off"
                  aria-spellcheck="false"
                  aria-autocapitalize="none"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="Por favor ingrese su correo electrónico"
                />
                {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Acceder al CV
              </Button>
            </form>
          ) : (
            <div className="space-y-4 py-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 flex-1"
                  onClick={() => window.open("/cv.pdf", "_blank")}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Ver el CV
                </Button>
                <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 flex-1" asChild>
                  <a href="/cv.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar el CV
                  </a>
                </Button>
              </div>

              <div className="text-center text-zinc-400 text-sm">
                <p>¡Gracias por el interés, {formData.name}!</p>
                <p>Se ha enviado tambien a {formData.email}.</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  )
}
