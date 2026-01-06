"use client";

import Image from "next/image";
import { ArrowRight, Award, BookOpen, Calendar, User, Download, Eye } from "lucide-react";
import { motion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DynamicBackground } from "@/components/dynamic-background";
import { PageHeroSplit } from "@/components/page-hero-split";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
};

export default function AboutPage() {
  const [cvModalOpen, setCvModalOpen] = useState(false)
  const [cvFormSubmitted, setCvFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [formErrors, setFormErrors] = useState({ name: "", email: "" })

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <DynamicBackground />
      <SiteHeader />
      <main className="relative z-10 container py-12 space-y-24">
        <PageHeroSplit
          badge={{ text: "Conóceme" }}
          title="Hola, soy José Carrillo"
          subtitle="Mi trayectoria profesional en el mundo del desarrollo"
          description={
            <>
              <p className="text-zinc-400 leading-relaxed pb-4">
                Con más de 10 años de experiencia en la industria tecnológica,
                he dedicado mi carrera a construir sistemas financieros robustos
                y liderar equipos técnicos hacia el éxito. Mi pasión reside en
                resolver problemas complejos y crear software que genere un
                impacto real en las operaciones empresariales.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Como líder técnico, creo en fomentar una cultura de innovación,
                aprendizaje continuo y colaboración. Estoy comprometido con la
                mentoría de la nueva generación de desarrolladores y con la
                creación de soluciones de software sostenibles y escalables.
              </p>
            </>
          }
          image={{
            src: "https://avatars.githubusercontent.com/u/16759783",
            alt: "José Carrillo, desarrollador de software senior y líder técnico",
            width: 600,
            height: 600,
            priority: true,
          }}
          actions={
            <>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:from-blue-700 focus:to-purple-700 focus:ring-4 focus:ring-blue-500/50 w-full sm:w-auto text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 group" asChild>
                <Link href="/contacto" aria-describedby="explore-projects-desc">
                  Contactarme
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:animate-pulse" aria-hidden="true" />
                  <span id="explore-projects-desc" className="sr-only">Conversemos más a fondo sobre lo que desees</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300 bg-transparent hover:bg-zinc-800/70 hover:border-zinc-600 hover:text-white focus:bg-zinc-800/70 focus:ring-4 focus:ring-zinc-500/50 w-full sm:w-auto font-bold py-3 px-8 rounded-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                onClick={() => setCvModalOpen(true)}
                aria-describedby="download-cv-desc"
              >
                Descargar CV
                <Download className="ml-2 h-5 w-5" aria-hidden="true" />
                <span id="download-cv-desc" className="sr-only">Abrir formulario para descargar mi currículum vitae</span>
              </Button>
            </>
          }
        />

        {/* Sección de Trayectoria Profesional */}
        <motion.section
          className="py-12 space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className="space-y-4 text-center" variants={itemVariants}>
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 text-white text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg shadow-blue-600/10"
            >
              Timeline
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
              Trayectoria profesional
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              De programador entusiasta a líder técnico - los hitos clave que
              han formado mi carrera
            </p>
          </motion.div>

          <motion.div
            className="relative border-l border-zinc-800/50 ml-3 md:ml-6 pl-6 md:pl-10 space-y-10"
            variants={itemVariants}
          >
            {/* Posición actual */}
            <motion.div
              className="relative"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -left-[42px] md:-left-[50px] flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-2 p-6 rounded-xl bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 hover:bg-gradient-to-br hover:from-zinc-800/90 hover:to-zinc-700/90 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">oct. 2024 - Presente</Badge>
                  <h3 className="text-xl font-bold">
                    Tech Leader @ Yummy Inc.
                  </h3>
                </div>
                <p className="text-zinc-400">
                  Lidero dos equipo de desarrolladores con los cuales construyo
                  las integraciones financieras empresariales y bancarias.
                  Implementé una arquitectura de microservicios que mejoró la
                  fiabilidad del sistema considerablemente. Mentoría a
                  desarrolladores y establecimiento de planes de carrera técnica
                  dentro de la organización.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    Liderazgo
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    Arquitectura
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    Mentoría
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Rol senior */}
            <motion.div
              className="relative"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -left-[42px] md:-left-[50px] flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-2 p-6 rounded-xl bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 hover:bg-gradient-to-br hover:from-zinc-800/90 hover:to-zinc-700/90 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">mar. 2024 - oct. 2024</Badge>
                  <h3 className="text-xl font-bold">
                    Developer Leader @ Cencosud S.A.
                  </h3>
                </div>
                <p className="text-zinc-400">
                  Desarrollé módulos e integraciones financieras core junto a un
                  equipo especializado multinacional, e integrando estos con
                  herramientas ERP. Optimicé consultas de base de datos
                  resultando en tiempos de procesamiento 30% más rápidos. Lideré
                  la migración de arquitectura monolítica a microservicios,
                  mejorando la escalabilidad y fiabilidad del sistema.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    SAP & ERP
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    Rendimiento
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    Arquitectura
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Experiencia media */}
            <motion.div
              className="relative"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -left-[42px] md:-left-[50px] flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-2 p-6 rounded-xl bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 hover:bg-gradient-to-br hover:from-zinc-800/90 hover:to-zinc-700/90 hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">ago. 2021 - oct. 2024</Badge>
                  <h3 className="text-xl font-bold">
                    Senior Software Engineering @ Acid Labs
                  </h3>
                </div>
                <p className="text-zinc-400">
                  Construí sistemas de tokenización bajo certificación PCI DSS y
                  aplicaciones móviles para empresas de transporte aéreo.
                  Durante mi tiempo en Acid Labs, una de las empresas líderes en
                  staffing en Chile, tuve la oportunidad de colaborar con
                  desarrolladores de diferentes países de LATAM. Implementé
                  algoritmos de detección de fraude que redujeron incidentes en
                  un 40%. Trabajé con equipos multidisciplinarios para entregar
                  soluciones integradas en los sectores financiero, e-commerce,
                  retail y transporte para clientes empresariales.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    Pagos
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    Seguridad
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    Android
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    iOS
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    PCI DSS
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    Banking
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Inicio de carrera */}
            <motion.div
              className="relative"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -left-[42px] md:-left-[50px] flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-2 p-6 rounded-xl bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 hover:bg-gradient-to-br hover:from-zinc-800/90 hover:to-zinc-700/90 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">may. 2023 - mar. 2024</Badge>
                  <h3 className="text-xl font-bold">
                    Senior Developer Full Stack @ Wompi
                  </h3>
                </div>
                <p className="text-zinc-400">
                  Como desarrollador senior en Wompi, participé en el desarrollo
                  de la plataforma de pagos, implementando integraciones con
                  múltiples entidades bancarias y financieras, mejorando la
                  experiencia de usuario en el checkout, dashboard e incluso un
                  flujo completo de su panel administrativo. Ayudé en el
                  rediseño de la arquitectura del backend para soportar
                  transacciones de Open Banking como iniciadores de pago,
                  logrando una disponibilidad del 99.9% y reduciendo el tiempo
                  de procesamiento en un 35%. Colaboré estrechamente con equipos
                  de producto y UX para crear soluciones de pago intuitivas que
                  aumentaron la tasa de conversión de los comercios en un 28%.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    Backend
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    UI/UX
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    Startups
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    Open Banking
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    Pasarelas de pago
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Formación académica */}
            <motion.div
              className="relative"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -left-[42px] md:-left-[50px] flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="space-y-2 p-6 rounded-xl bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 hover:bg-gradient-to-br hover:from-zinc-800/90 hover:to-zinc-700/90 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">ene. 2022 - feb. 2024</Badge>
                  <h3 className="text-xl font-bold">
                    Senior Software Engineer (Tech Leader Backup) @ Sky Airline
                  </h3>
                </div>
                <p className="text-zinc-400">
                  Desarrolle y servi como Tech Leader Backup en el desarrollo la
                  aplicación movil de ventas para la aerolínea, integrando desde
                  sistemas de prevención del fraude, como sistemas de diseño y
                  reservas, incluso pasarelas de pago. Rediseñé la arquitectura
                  de microservicios que mejoró la estabilidad de los sistemas de
                  venta en un 45%. Supervisé la implementación de un sistema de
                  perfiles y autenticación, lo que optimizó la experiencia de
                  usuario en las plataformas de venta de voletos.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    Android
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    iOS
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    Prevención del fraude
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    Firebase
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30"
                  >
                    Prevención del fraude
                  </Badge>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Philosophy Section */}
        <motion.section
          className="py-12 space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className="space-y-4 text-center" variants={itemVariants}>
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 text-white text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg shadow-blue-600/10"
            >
              Enfoque de desarrollo
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
              Visión y misión profesional
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Los principios fundamentales que guían mi trabajo como
              desarrollador y líder técnico
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 hover:bg-gradient-to-br hover:from-zinc-800/90 hover:to-zinc-700/90 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 h-full group">
                <CardContent className="p-6 space-y-4">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Award className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold">Calidad ante todo</h3>
                  <p className="text-zinc-400">
                    Código de calidad significa mantenibilidad, legibilidad y
                    escalabilidad, no solo funcionalidad. Priorizo escribir
                    soluciones limpias y bien probadas que resistan el paso del
                    tiempo y faciliten el crecimiento de los proyectos.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 hover:bg-gradient-to-br hover:from-zinc-800/90 hover:to-zinc-700/90 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 h-full group">
                <CardContent className="p-6 space-y-4">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <User className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold">Centrado en el usuario</h3>
                  <p className="text-zinc-400">
                    La excelencia técnica debe servir a necesidades reales. En
                    sistemas financieros y empresariales, siempre busco entender
                    los requerimientos del negocio para crear soluciones que
                    resuelvan problemas concretos de manera efectiva.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 hover:bg-gradient-to-br hover:from-zinc-800/90 hover:to-zinc-700/90 hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 h-full group">
                <CardContent className="p-6 space-y-4">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <BookOpen className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold">Aprendizaje continuo</h3>
                  <p className="text-zinc-400">
                    Estoy comprometo con mantenerme a la vanguardia de la tecnología. Dedico tiempo a explorar nuevas técnicas
                    y buenas prácticas para desarrollar soluciones innovadoras
                    ante los desafíos actuales.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Personal Interests */}
        <motion.section
          className="py-12 space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className="space-y-4 text-center" variants={itemVariants}>
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 text-white text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg shadow-blue-600/10"
            >
              Más allá del código
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
              Intereses personales
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Cuando no estoy programando o liderando equipos técnicos, esto es lo que me mantiene inspirado y me permite recargar energía.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="hobbies" className="w-full">
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 h-auto bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 p-1">
                <TabsTrigger
                  value="hobbies"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-white"
                >
                  Pasatiempos
                </TabsTrigger>
                <TabsTrigger
                  value="reading"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-white"
                >
                  Lecturas
                </TabsTrigger>
                <TabsTrigger
                  value="community"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-white"
                >
                  Comunidad
                </TabsTrigger>
              </TabsList>

              <TabsContent value="hobbies" className="mt-6">
                <motion.div
                  className="grid gap-6 md:grid-cols-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants}>
                    <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 overflow-hidden hover:bg-gradient-to-br hover:from-zinc-800/90 hover:to-zinc-700/90 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 group">
                      <div className="aspect-video bg-zinc-800 relative" role="img" aria-label="">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image
                            src="https://www.metropolitan-touring.com/wp-content/uploads/2024/11/el-poblado-discrict.webp"
                            alt="Caminatas por la ciudad de Medellín"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-4">
                        <h3 className="text-xl font-bold">
                          Caminatas por la ciudad
                        </h3>
                        <p className="text-zinc-400">
                          No todas las formas de conectar son igual, y particularmente en la ciudad,
                          donde hay tantas oportunidades para interactuar con otras personas, es importante
                          dedicar tiempo a conocer la jungla de cemento. Por eso me encanta caminar por la ciudad,
                          explorar las calles y encontrar nuevos lugares ocultos.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 overflow-hidden hover:bg-gradient-to-br hover:from-zinc-800/90 hover:to-zinc-700/90 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 group">
                      <div className="aspect-video bg-zinc-800 relative" role="img" aria-label="">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image
                            src="https://almipro.com/wp-content/uploads/2019/01/parquedelcafe.jpg"
                            alt="Me encanta el tiempo en familia"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-4">
                        <h3 className="text-xl font-bold">Tiempo en familia</h3>
                        <p className="text-zinc-400">
                          Mi tiempo en familia es fundamental. Me encanta
                          pasar tiempo con mis hijos y esposa, familiares y compañeros de
                          trabajo. Disfruto de momentos de tranquilidad y conexión
                          con las personas que me rodean y aportan valor a lo que soy,
                          en reuniones o incluso compartido lugares únicos.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="reading" className="mt-6">
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 hover:bg-gradient-to-br hover:from-zinc-800/90 hover:to-zinc-700/90 hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
                    <CardContent className="p-6 space-y-6">
                      <h3 className="text-xl font-bold">Mi biblioteca personal</h3>
                      <p className="text-zinc-400">
                        La lectura es fundamental para mi crecimiento profesional y
                        personal. Estos son algunos libros que han influido significativamente
                        en mi forma de pensar:
                      </p>

                      <div className="space-y-4">
                        <motion.div
                          className="p-4 bg-gradient-to-br from-zinc-800/70 to-zinc-700/70 backdrop-blur-sm rounded-lg border border-zinc-600/50 hover:bg-gradient-to-br hover:from-zinc-700/80 hover:to-zinc-600/80 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <h4 className="font-bold">Lecturas técnicas</h4>
                          <ul className="mt-2 space-y-2 text-zinc-400">
                            <li>• "Clean Code" por Robert C. Martin</li>
                            <li>
                              • "Designing Data-Intensive Applications" por Martin
                              Kleppmann
                            </li>
                            <li>• "The Phoenix Project" por Gene Kim</li>
                            <li>
                              • "Accelerate" por Nicole Forsgren, Jez Humble y
                              Gene Kim
                            </li>
                          </ul>
                        </motion.div>

                        <motion.div
                          className="p-4 bg-gradient-to-br from-zinc-800/70 to-zinc-700/70 backdrop-blur-sm rounded-lg border border-zinc-600/50 hover:bg-gradient-to-br hover:from-zinc-700/80 hover:to-zinc-600/80 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <h4 className="font-bold">Liderazgo y negocios</h4>
                          <ul className="mt-2 space-y-2 text-zinc-400">
                            <li>
                              • "The Five Dysfunctions of a Team" por Patrick
                              Lencioni
                            </li>
                            <li>• "Radical Candor" por Kim Scott</li>
                            <li>• "The Lean Startup" por Eric Ries</li>
                            <li>• "High Output Management" por Andrew Grove</li>
                          </ul>
                        </motion.div>

                        <motion.div
                          className="p-4 bg-gradient-to-br from-zinc-800/70 to-zinc-700/70 backdrop-blur-sm rounded-lg border border-zinc-600/50 hover:bg-gradient-to-br hover:from-zinc-700/80 hover:to-zinc-600/80 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <h4 className="font-bold">Filosofía y pensamiento</h4>
                          <ul className="mt-2 space-y-2 text-zinc-400">
                            <li>• "Thinking, Fast and Slow" por Daniel Kahneman</li>
                            <li>• "Antifragile: Things That Gain from Disorder" por Nassim Nicholas Taleb</li>
                            <li>• "Mindset: The New Psychology of Success" por Carol S. Dweck</li>
                            <li>• "Deep Work: Rules for Focused Success in a Distracted World" por Cal Newport</li>
                          </ul>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="community" className="mt-6">
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 hover:bg-gradient-to-br hover:from-zinc-800/90 hover:to-zinc-700/90 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300">
                    <CardContent className="p-6 space-y-6">
                      <h3 className="text-xl font-bold">Participación en la comunidad</h3>
                      <p className="text-zinc-400">
                        Creo firmemente en retribuir a la comunidad tecnológica y
                        apoyar a la siguiente generación de desarrolladores. Así es
                        como me involucro:
                      </p>

                      <div className="grid gap-4 md:grid-cols-2">
                        <motion.div
                          className="p-4 bg-gradient-to-br from-zinc-800/70 to-zinc-700/70 backdrop-blur-sm rounded-lg border border-zinc-600/50 hover:bg-gradient-to-br hover:from-zinc-700/80 hover:to-zinc-600/80 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <h4 className="font-bold">Programa de mentorías</h4>
                          <p className="mt-2 text-zinc-400">
                            Regularmente mentoreo a desarrolladores junior a través de programas
                            estructurados y relaciones informales, ayudándoles a navegar sus
                            trayectorias profesionales y desafíos técnicos en el mundo del desarrollo.
                          </p>
                        </motion.div>

                        <motion.div
                          className="p-4 bg-gradient-to-br from-zinc-800/70 to-zinc-700/70 backdrop-blur-sm rounded-lg border border-zinc-600/50 hover:bg-gradient-to-br hover:from-zinc-700/80 hover:to-zinc-600/80 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <h4 className="font-bold">Contribuciones Open Source</h4>
                          <p className="mt-2 text-zinc-400">
                            Contribuyo activamente a proyectos de código abierto en el
                            ámbito de la tecnología, ayudando a construir
                            herramientas que benefician a la comunidad de desarrolladores
                            y democratizan el acceso a soluciones de todo tipo pero haciendo enfasis en medios de pago y finanzas.
                          </p>
                        </motion.div>

                        <motion.div
                          className="p-4 bg-gradient-to-br from-zinc-800/70 to-zinc-700/70 backdrop-blur-sm rounded-lg border border-zinc-600/50 hover:bg-gradient-to-br hover:from-zinc-700/80 hover:to-zinc-600/80 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <h4 className="font-bold">Charlas técnicas & talleres</h4>
                          <p className="mt-2 text-zinc-400">
                            Participo como ponente en meetups y conferencias locales
                            sobre arquitectura de software financiero, liderazgo y
                            desarrollo profesional en el ámbito tecnológico.
                          </p>
                        </motion.div>

                        <motion.div
                          className="p-4 bg-gradient-to-br from-zinc-800/70 to-zinc-700/70 backdrop-blur-sm rounded-lg border border-zinc-600/50 hover:bg-gradient-to-br hover:from-zinc-700/80 hover:to-zinc-600/80 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <h4 className="font-bold">Educación tecnológica</h4>
                          <p className="mt-2 text-zinc-400">
                            Colaboro con programas que introducen conceptos de
                            programación y tecnología a grupos subrepresentados
                            en el sector tech, contribuyendo a construir una
                            industria más diversa e inclusiva.
                          </p>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.section>

        {/* Llamado a la Acción */}
        <motion.section
          className="py-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-blue-600/90 to-purple-600/90 border-0 backdrop-blur-sm shadow-2xl shadow-blue-500/25 relative overflow-hidden">
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-[1px]" />

              <CardContent className="p-8 md:p-12 text-center space-y-6 relative z-10">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-white"
                  variants={itemVariants}
                >
                  ¿Trabajamos juntos?
                </motion.h2>
                <motion.p
                  className="text-white/90 max-w-2xl mx-auto text-lg"
                  variants={itemVariants}
                >
                  Si necesitas liderazgo técnico, experiencia en arquitectura de
                  software o apoyo en el desarrollo de sistemas financieros o
                  empresariales, estoy aquí para ayudarte a convertir tu visión en
                  realidad.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                  variants={containerVariants}
                >
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="bg-white hover:bg-white focus:ring-4 focus:ring-blue-500/50 w-full sm:w-auto text-blue-500 font-bold py-3 px-8 rounded-lg shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 group"
                    >
                      Contáctame
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-transparent border-white/50 border-2 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                    >
                      Mis proyectos
                    </Button>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>
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
  );
}
