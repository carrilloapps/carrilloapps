"use client";

import Image from "next/image";
import { ArrowRight, Award, BookOpen, Calendar, User, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ParticleHeroBackground } from "@/components/particle-hero-background";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
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
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ParticleHeroBackground />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black/50 pointer-events-none" />
      
      <SiteHeader />

      <main className="relative z-10 container py-12 space-y-24">
        {/* Hero Section */}
        <motion.section 
          className="py-12 md:py-0 space-y-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="space-y-2">
                <motion.div variants={itemVariants}>
                  <Badge
                    variant="outline"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 text-white text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg shadow-blue-600/10"
                  >
                    Conóceme
                  </Badge>
                </motion.div>
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-lg"
                  variants={itemVariants}
                >
                  Hola, soy José Carrillo
                </motion.h1>
                <motion.p 
                  className="text-xl text-zinc-400"
                  variants={itemVariants}
                >
                  Mi trayectoria profesional en el mundo del desarrollo
                </motion.p>
              </div>
              <motion.p 
                className="text-zinc-400 leading-relaxed"
                variants={itemVariants}
              >
                Con más de 10 años de experiencia en la industria tecnológica,
                he dedicado mi carrera a construir sistemas financieros robustos
                y liderar equipos técnicos hacia el éxito. Mi pasión reside en
                resolver problemas complejos y crear software que genere un
                impacto real en las operaciones empresariales.
              </motion.p>
              <motion.p 
                className="text-zinc-400 leading-relaxed"
                variants={itemVariants}
              >
                Como líder técnico, creo en fomentar una cultura de innovación,
                aprendizaje continuo y colaboración. Estoy comprometido con la
                mentoría de la nueva generación de desarrolladores y con la
                creación de soluciones de software sostenibles y escalables.
              </motion.p>
              <motion.div 
                className="flex gap-4"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/25">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar CV
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="border-zinc-700/50 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 hover:border-zinc-600/50"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Contáctame
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <Image
                src="https://avatars.githubusercontent.com/u/16759783"
                alt="José Carrillo"
                width={600}
                height={600}
                className="object-cover"
                priority
              />
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-[1px]" />
            </motion.div>
          </div>
        </motion.section>

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
                  Como desarrollador senior en Wompi, participe en el desarrollo
                  de la plataforma de pagos, implementando integraciones con
                  múltiples entitdades bancarias y financieras, mejorando la
                  experiencia de usuario en el checkout, dashboard e incluso un
                  flujo completo de su panel administrativo. Ayude en el
                  rediseño de la arquitectura del backend para soportar
                  transacciones de de Open Banking como iniciadores de pago,
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
              Enfoque de Desarrollo
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
                    Me comprometo a mantenerme a la vanguardia de la tecnología en
                    constante evolución. Dedico tiempo a explorar nuevas técnicas
                    y buenas prácticas para desarrollar soluciones innovadoras
                    ante los desafíos empresariales actuales.
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
              Cuando no estoy programando o liderando equipos técnicos, esto es lo que me mantiene inspirado
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
                >
                  <motion.div variants={itemVariants}>
                    <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 overflow-hidden hover:bg-gradient-to-br hover:from-zinc-800/90 hover:to-zinc-700/90 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 group">
                      <div className="aspect-video bg-zinc-800/50 backdrop-blur-sm relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div 
                            className="text-4xl"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            🏔️
                          </motion.div>
                        </div>
                      </div>
                        <CardContent className="p-6 space-y-4">
                        <h3 className="text-xl font-bold">
                          Senderismo y Aventuras al Aire Libre
                        </h3>
                        <p className="text-zinc-400">
                          Desconectarme de la tecnología y conectar con la naturaleza 
                          me ayuda a mantener la perspectiva y la creatividad. He 
                          recorrido más de 20 parques nacionales y siempre estoy 
                          planificando mi próxima aventura en la montaña.
                        </p>
                        </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 overflow-hidden hover:bg-gradient-to-br hover:from-zinc-800/90 hover:to-zinc-700/90 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 group">
                      <div className="aspect-video bg-zinc-800/50 backdrop-blur-sm relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div 
                            className="text-4xl"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            🎸
                          </motion.div>
                        </div>
                      </div>
                        <CardContent className="p-6 space-y-4">
                        <h3 className="text-xl font-bold">Producción Musical</h3>
                        <p className="text-zinc-400">
                          Tocar guitarra y producir música electrónica es mi 
                          escape creativo. El proceso de componer y mezclar 
                          pistas tiene sorprendentes paralelismos con el desarrollo 
                          de software - ambos requieren atención al detalle y 
                          resolución creativa de problemas.
                        </p>
                        </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="reading" className="mt-6">
                <motion.div variants={itemVariants}>
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
                            <h4 className="font-bold">Lecturas Técnicas</h4>
                            <ul className="mt-2 space-y-2 text-zinc-400">
                            <li>• "Código Limpio" por Robert C. Martin</li>
                            <li>
                              • "Diseñando Aplicaciones Data-Intensivas" por Martin
                              Kleppmann
                            </li>
                            <li>• "El Proyecto Phoenix" por Gene Kim</li>
                            <li>
                              • "Acelerar" por Nicole Forsgren, Jez Humble y
                              Gene Kim
                            </li>
                            </ul>
                        </motion.div>

                        <motion.div 
                          className="p-4 bg-gradient-to-br from-zinc-800/70 to-zinc-700/70 backdrop-blur-sm rounded-lg border border-zinc-600/50 hover:bg-gradient-to-br hover:from-zinc-700/80 hover:to-zinc-600/80 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <h4 className="font-bold">Liderazgo y Negocios</h4>
                          <ul className="mt-2 space-y-2 text-zinc-400">
                          <li>
                            • "Las cinco disfunciones de un equipo" por Patrick
                            Lencioni
                          </li>
                          <li>• "Crítica Radical" por Kim Scott</li>
                          <li>• "El método Lean Startup" por Eric Ries</li>
                          <li>• "Gestión de Alto Rendimiento" por Andrew Grove</li>
                          </ul>
                        </motion.div>

                        <motion.div 
                          className="p-4 bg-gradient-to-br from-zinc-800/70 to-zinc-700/70 backdrop-blur-sm rounded-lg border border-zinc-600/50 hover:bg-gradient-to-br hover:from-zinc-700/80 hover:to-zinc-600/80 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <h4 className="font-bold">Filosofía y Pensamiento</h4>
                          <ul className="mt-2 space-y-2 text-zinc-400">
                          <li>• "Pensar rápido, pensar despacio" por Daniel Kahneman</li>
                          <li>• "Antifrágil" por Nassim Nicholas Taleb</li>
                          <li>• "Mindset: La actitud del éxito" por Carol Dweck</li>
                          <li>• "Trabajo Profundo" por Cal Newport</li>
                          </ul>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="community" className="mt-6">
                <motion.div variants={itemVariants}>
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
                            <h4 className="font-bold">Programa de Mentorías</h4>
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
                            ámbito de la tecnología financiera, ayudando a construir 
                            herramientas que benefician a la comunidad de desarrolladores
                            y democratizan el acceso a soluciones financieras.
                            </p>
                        </motion.div>

                        <motion.div 
                          className="p-4 bg-gradient-to-br from-zinc-800/70 to-zinc-700/70 backdrop-blur-sm rounded-lg border border-zinc-600/50 hover:bg-gradient-to-br hover:from-zinc-700/80 hover:to-zinc-600/80 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <h4 className="font-bold">Charlas Técnicas & Talleres</h4>
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
                          <h4 className="font-bold">Educación Tecnológica</h4>
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

      <SiteFooter />
    </div>
  );
}
