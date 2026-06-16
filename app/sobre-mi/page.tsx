"use client"

import Image from "next/image"
import { ArrowRight, Award, BookOpen, Calendar, User, Download, Eye } from "lucide-react"
import { motion, type Variants } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MediaCard } from "@/components/ui/media-card"
import { StatTiles } from "@/components/ui/stat-tiles"
import { Pill } from "@/components/ui/pill"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { ParallaxBackdrop } from "@/components/parallax-backdrop"
import { AuroraBackdrop } from "@/components/aurora-backdrop"
import Link from "next/link"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

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

export default function AboutPage() {
  const [cvModalOpen, setCvModalOpen] = useState(false)
  const [cvFormSubmitted, setCvFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [formErrors, setFormErrors] = useState({ name: "", email: "" })

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <DynamicBackground />
      <SiteHeader />
      <main className="relative z-10 pt-12" id="main-content">
        {/* Hero editorial — distinto del home: layout 7:5, retrato rectangular,
            stats strip y chips glass sobre la foto. Lenguaje editorial vs el
            home, que es más comercial. */}
        <div className="container mx-auto px-4">
          <motion.section
            className="relative w-full pt-6 pb-4 md:pt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            aria-labelledby="about-hero-heading"
          >
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              {/* Columna de copy — 7/12 en lg para que respire. */}
              <motion.div
                className="order-2 space-y-6 lg:order-1 lg:col-span-7"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2.5 text-emerald-400">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20"
                      aria-hidden="true"
                    />
                    <span className="text-[11px] font-semibold tracking-[0.18em] uppercase md:text-xs">
                      Disponible para nuevos proyectos
                    </span>
                  </span>
                </div>

                <h1
                  id="about-hero-heading"
                  className="max-w-[20ch] text-3xl leading-[1.05] font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl xl:text-[3.5rem]"
                >
                  +10 años evitando que los sistemas financieros se caigan
                  <span className="text-blue-400">{" a las 3 a. m."}</span>
                </h1>

                <p className="max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
                  Soy{" "}
                  <strong className="font-semibold text-white">
                    Tech Leader y Senior Software Developer
                  </strong>
                  , especializado en pagos. Hoy dirijo el equipo de pagos en{" "}
                  <Link
                    href="https://yummysuperapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-300 hover:text-blue-200"
                  >
                    Yummy Inc.
                  </Link>{" "}
                  — antes co-construí la dispersión de Wompi y los módulos de Cencosud que mueven
                  +2M facturas/mes.
                </p>

                {/* Stats strip — credenciales numéricas de un vistazo. Es el
                  rasgo más distintivo del hero del about respecto al del
                  home, que no las muestra en el primer fold. */}
                <StatTiles
                  className="max-w-2xl pt-2 pb-4"
                  variant="plain"
                  size="md"
                  columns={4}
                  ariaLabel="Credenciales profesionales"
                  metrics={[
                    { value: "10", label: "Años de carrera" },
                    { value: "7", label: "Team players" },
                    { value: "2 M+", label: "Tx/día procesadas" },
                    { value: "3", label: "Roles de liderazgo" },
                  ]}
                />

                <div
                  className="flex flex-col gap-3 pt-6 sm:flex-row"
                  role="group"
                  aria-label="Acciones principales"
                >
                  <Button
                    variant="gradient"
                    size="xl"
                    className="group w-full touch-manipulation sm:w-auto"
                    asChild
                  >
                    <Link href="/contacto">
                      Conversemos sobre tu sistema
                      <ArrowRight
                        className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="xl"
                    className="w-full touch-manipulation text-zinc-400 hover:bg-transparent hover:text-white sm:w-auto"
                    onClick={() => setCvModalOpen(true)}
                  >
                    Recibir mi CV
                    <Download className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </motion.div>

              {/* Retrato editorial — rectangular con esquinas suaves (rounded-3xl)
                para diferenciarlo del avatar circular del home. Dos chips
                glass superpuestos: ubicación arriba a la izquierda, indicador
                de status abajo a la derecha. */}
              <motion.figure
                className="group relative order-1 mx-auto w-full max-w-[360px] lg:order-2 lg:col-span-5 lg:mx-0 lg:max-w-none"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10"
                  style={{
                    boxShadow:
                      "0 0 40px rgba(59, 130, 246, 0.18), 0 30px 80px -20px rgba(0, 0, 0, 0.6)",
                  }}
                >
                  <Image
                    src="/profile.jpg"
                    alt="Junior Carrillo, Tech Leader y Senior Software Developer en Medellín, Colombia."
                    width={480}
                    height={600}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                    priority
                    fetchPriority="high"
                    loading="eager"
                    quality={90}
                    sizes="(max-width: 768px) 360px, (max-width: 1280px) 380px, 440px"
                  />

                  {/* Capa de oscurecimiento sutil para legibilidad de chips. */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30"
                    aria-hidden="true"
                  />

                  {/* Chip ubicación — arriba a la izquierda. */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                    <span aria-hidden="true">📍</span>
                    <span className="font-medium">Medellín, CO</span>
                  </div>

                  {/* Chip status — abajo a la derecha. */}
                  <div className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-black/60 px-3 py-1.5 backdrop-blur-md">
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"
                      aria-hidden="true"
                    />
                    <span className="text-xs leading-none font-semibold text-emerald-300">
                      Disponible
                    </span>
                  </div>
                </div>

                <figcaption className="sr-only">
                  Retrato de Junior Carrillo, basado en Medellín, Colombia.
                </figcaption>
              </motion.figure>
            </div>
          </motion.section>
        </div>

        {/* 01 — Manifiesto · superficie clara con aurora tono studio · es la
            "tesis editorial" del about, merece protagonismo visual. */}
        <div className="relative overflow-hidden">
          <AuroraBackdrop tone="studio" intensity={0.6} />
          <motion.section
            className="relative mx-auto max-w-3xl px-4 py-16 md:py-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            aria-labelledby="about-manifesto"
          >
            <div className="relative space-y-6">
              {/* Comilla decorativa de apertura — refuerza el peso editorial. */}
              <span
                className="pointer-events-none absolute -top-12 -left-2 font-serif text-[8rem] leading-none text-blue-500/20 select-none md:-top-16 md:-left-4 md:text-[10rem]"
                aria-hidden="true"
              >
                «
              </span>
              <p
                id="about-manifesto"
                className="relative text-[11px] font-medium tracking-[0.22em] text-zinc-500 uppercase"
              >
                El manifiesto
              </p>
              <p className="relative max-w-prose text-2xl leading-tight font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                Mi trabajo no es escribir el código más bonito; es diseñar el sistema en el que un
                equipo puede meter cambios <span className="text-blue-300">sin miedo</span>.
              </p>
              <div className="max-w-prose border-l-2 border-blue-500/40 pl-6 md:pl-8">
                <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
                  Mentoreo desarrolladores cada semana, escribo sobre arquitectura financiera en{" "}
                  <Link href="/blog" className="font-semibold text-blue-300 hover:text-blue-200">
                    mi blog
                  </Link>{" "}
                  y participo en meetups de fintech en Colombia. Si vas a contratarme, lo que se
                  llevan tus equipos no es un{" "}
                  <em className="font-semibold text-white not-italic">dev</em> senior: es un manual
                  de cómo no quemarse construyendo software crítico.
                </p>
              </div>
            </div>
          </motion.section>
        </div>

        {/* 02 — Carrera/Timeline · superficie transparente · parallax diagonals
            (mismo lenguaje que Experience en el home). */}
        <div className="relative overflow-hidden">
          <ParallaxBackdrop
            variant="diagonals"
            position="top-left"
            speed={0.14}
            opacityClass="opacity-[0.05]"
          />
          <motion.section
            className="container mx-auto space-y-10 px-4 py-16 md:py-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div className="space-y-4 text-center" variants={itemVariants}>
              <Pill variant="eyebrow" size="md">
                Carrera
              </Pill>
              <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Roles que me formaron
              </h2>
              <p className="mx-auto max-w-2xl leading-relaxed text-zinc-300">
                De programador entusiasta a Tech Leader — los lugares y proyectos donde aprendí a
                construir sistemas de dinero que no se rompen.
              </p>
            </motion.div>

            <motion.div
              className="relative ml-3 space-y-10 border-l border-zinc-800/50 pl-6 md:ml-6 md:pl-10"
              variants={itemVariants}
            >
              {/* Posición actual */}
              <motion.div
                className="relative"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute -left-[42px] flex h-9 w-9 items-center justify-center rounded-full border-2 border-blue-500/60 bg-slate-950 text-blue-300 shadow-lg ring-4 shadow-blue-500/20 ring-blue-500/15 md:-left-[50px]">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="surface-card space-y-2 rounded-xl p-6">
                  <div className="flex items-center gap-2">
                    <Badge className="border border-blue-500/30 bg-blue-500/15 text-blue-300 hover:bg-blue-500/20">
                      oct. 2024 - Presente
                    </Badge>
                    <h3 className="text-xl font-bold">Tech Leader @ Yummy Inc.</h3>
                  </div>
                  <p className="text-zinc-300">
                    Lidero dos equipos de desarrolladores con los cuales construyo las integraciones
                    financieras empresariales y bancarias. Implementé una arquitectura de
                    microservicios que mejoró la fiabilidad del sistema considerablemente. Mentoría
                    a desarrolladores y establecimiento de planes de carrera técnica dentro de la
                    organización.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      Liderazgo
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      Arquitectura
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
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
                <div className="absolute -left-[42px] flex h-9 w-9 items-center justify-center rounded-full border-2 border-blue-500/60 bg-slate-950 text-blue-300 shadow-lg ring-4 shadow-blue-500/20 ring-blue-500/15 md:-left-[50px]">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="surface-card space-y-2 rounded-xl p-6">
                  <div className="flex items-center gap-2">
                    <Badge className="border border-blue-500/30 bg-blue-500/15 text-blue-300 hover:bg-blue-500/20">
                      mar. 2024 - oct. 2024
                    </Badge>
                    <h3 className="text-xl font-bold">Developer Leader @ Cencosud S.A.</h3>
                  </div>
                  <p className="text-zinc-300">
                    Desarrollé módulos e integraciones financieras core junto a un equipo
                    especializado multinacional, e integrando estos con herramientas ERP. Optimicé
                    consultas de base de datos resultando en tiempos de procesamiento 30% más
                    rápidos. Lideré la migración de arquitectura monolítica a microservicios,
                    mejorando la escalabilidad y fiabilidad del sistema.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      SAP & ERP
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      Rendimiento
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
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
                <div className="absolute -left-[42px] flex h-9 w-9 items-center justify-center rounded-full border-2 border-blue-500/60 bg-slate-950 text-blue-300 shadow-lg ring-4 shadow-blue-500/20 ring-blue-500/15 md:-left-[50px]">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="surface-card space-y-2 rounded-xl p-6">
                  <div className="flex items-center gap-2">
                    <Badge className="border border-blue-500/30 bg-blue-500/15 text-blue-300 hover:bg-blue-500/20">
                      ago. 2021 - oct. 2024
                    </Badge>
                    <h3 className="text-xl font-bold">Senior Software Engineer @ Acid Labs</h3>
                  </div>
                  <p className="text-zinc-300">
                    Construí sistemas de tokenización bajo certificación PCI DSS y aplicaciones
                    móviles para empresas de transporte aéreo. Durante mi tiempo en Acid Labs, una
                    de las empresas líderes en staffing en Chile, tuve la oportunidad de colaborar
                    con desarrolladores de diferentes países de LATAM. Implementé algoritmos de
                    detección de fraude que redujeron incidentes en un 40%. Trabajé con equipos
                    multidisciplinarios para entregar soluciones integradas en los sectores
                    financiero, e-commerce, retail y transporte para clientes empresariales.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      Pagos
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      Seguridad
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      Android
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      iOS
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      PCI DSS
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
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
                <div className="absolute -left-[42px] flex h-9 w-9 items-center justify-center rounded-full border-2 border-blue-500/60 bg-slate-950 text-blue-300 shadow-lg ring-4 shadow-blue-500/20 ring-blue-500/15 md:-left-[50px]">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="surface-card space-y-2 rounded-xl p-6">
                  <div className="flex items-center gap-2">
                    <Badge className="border border-blue-500/30 bg-blue-500/15 text-blue-300 hover:bg-blue-500/20">
                      may. 2023 - mar. 2024
                    </Badge>
                    <h3 className="text-xl font-bold">Senior Developer Full Stack @ Wompi</h3>
                  </div>
                  <p className="text-zinc-300">
                    Como desarrollador senior en Wompi, participé en el desarrollo de la plataforma
                    de pagos, implementando integraciones con múltiples entidades bancarias y
                    financieras, mejorando la experiencia de usuario en el checkout, dashboard e
                    incluso un flujo completo de su panel administrativo. Ayudé en el rediseño de la
                    arquitectura del backend para soportar transacciones de Open Banking como
                    iniciadores de pago, logrando una disponibilidad del 99.9% y reduciendo el
                    tiempo de procesamiento en un 35%. Colaboré estrechamente con equipos de
                    producto y UX para crear soluciones de pago intuitivas que aumentaron la tasa de
                    conversión de los comercios en un 28%.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      Backend
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      UI/UX
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      Startups
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      Open Banking
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
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
                <div className="absolute -left-[42px] flex h-9 w-9 items-center justify-center rounded-full border-2 border-blue-500/60 bg-slate-950 text-blue-300 shadow-lg ring-4 shadow-blue-500/20 ring-blue-500/15 md:-left-[50px]">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="surface-card space-y-2 rounded-xl p-6">
                  <div className="flex items-center gap-2">
                    <Badge className="border border-blue-500/30 bg-blue-500/15 text-blue-300 hover:bg-blue-500/20">
                      ene. 2022 - feb. 2024
                    </Badge>
                    <h3 className="text-xl font-bold">
                      Senior Software Engineer (Tech Leader Backup) @ Sky Airline
                    </h3>
                  </div>
                  <p className="text-zinc-300">
                    Desarrollé y serví como Tech Leader Backup en la construcción de la aplicación
                    móvil de ventas para la aerolínea, integrando sistemas de prevención del fraude,
                    módulos de diseño y reservas, e incluso pasarelas de pago. Rediseñé la
                    arquitectura de microservicios que mejoró la estabilidad de los sistemas de
                    venta en un 45%. Supervisé la implementación de un sistema de perfiles y
                    autenticación, lo que optimizó la experiencia de usuario en las plataformas de
                    venta de boletos.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      Android
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      iOS
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      Prevención del fraude
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      Firebase
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700/50 bg-zinc-800/30 text-zinc-400"
                    >
                      React Native
                    </Badge>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>
        </div>

        {/* 03 — Pull quote · superficie limpia, ancho contenido · sirve como
            "respiro narrativo" entre la carrera y la filosofía. */}
        <motion.figure
          className="container mx-auto px-4 py-12 md:py-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <blockquote className="relative mx-auto max-w-3xl px-6 md:px-10">
            <span
              className="absolute -top-4 left-0 font-serif text-7xl leading-none text-blue-500/30 select-none md:text-8xl"
              aria-hidden="true"
            >
              «
            </span>
            <p className="pl-6 text-xl leading-snug font-semibold tracking-tight text-white md:pl-8 md:text-2xl lg:text-3xl">
              El mejor software de pagos es el que nadie nota. Si tu equipo está apagando incendios
              todos los lunes, no es problema de código: es problema de arquitectura.
            </p>
            <figcaption className="mt-4 pl-6 text-sm text-zinc-400 md:pl-8">
              — Algo que repito en mentorías más de lo que debería.
            </figcaption>
          </blockquote>
        </motion.figure>

        {/* 04 — Filosofía · superficie oscura sutil + parallax rings ·
            quiebra la monotonía con un fondo más denso. */}
        <div className="relative overflow-hidden border-y border-zinc-900/60 bg-zinc-950/50 backdrop-blur-sm">
          <ParallaxBackdrop variant="rings" position="bottom-right" speed={0.16} />
          <motion.section
            className="container mx-auto space-y-10 px-4 py-16 md:py-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div className="space-y-4 text-center" variants={itemVariants}>
              <Pill variant="eyebrow" size="md">
                ¿Cómo trabajo?
              </Pill>
              <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Tres reglas que no rompo
              </h2>
              <p className="mx-auto max-w-2xl leading-relaxed text-zinc-300">
                Lo que aprendí en una década construyendo software financiero — compactado en tres
                principios citables.
              </p>
            </motion.div>

            <motion.div className="grid gap-8 md:grid-cols-3" variants={containerVariants}>
              <motion.div variants={itemVariants}>
                <Card className="surface-card group h-full">
                  <CardContent className="space-y-4 p-6">
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 transition-all duration-300 group-hover:from-blue-600/30 group-hover:to-purple-600/30"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Award className="h-6 w-6 text-blue-400" aria-hidden="true" />
                    </motion.div>
                    <h3 className="text-xl leading-snug font-bold text-white">
                      El código se lee 10 veces más de las que se escribe
                    </h3>
                    <p className="leading-relaxed text-zinc-300">
                      Por eso me importa más la legibilidad que la cleverness. Una función obvia que
                      cualquiera puede modificar a las 2 a. m. vale más que un one-liner brillante
                      que sólo entiende quien lo escribió. La calidad no es un check de QA — es una
                      decisión de cada PR.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="surface-card group h-full">
                  <CardContent className="space-y-4 p-6">
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 transition-all duration-300 group-hover:from-blue-600/30 group-hover:to-purple-600/30"
                      whileHover={{ scale: 1.1 }}
                    >
                      <User className="h-6 w-6 text-blue-400" aria-hidden="true" />
                    </motion.div>
                    <h3 className="text-xl leading-snug font-bold text-white">
                      Si no entiendo el negocio, no puedo entregar arquitectura
                    </h3>
                    <p className="leading-relaxed text-zinc-300">
                      En fintech, una decisión técnica equivocada es plata perdida. Antes de
                      proponer microservicios o un esquema de eventos, pregunto cómo gana dinero el
                      negocio, qué métrica rompe primero y qué pasa si el sistema se cae el último
                      día del mes. La arquitectura sale de ahí, no del libro.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="surface-card group h-full">
                  <CardContent className="space-y-4 p-6">
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 transition-all duration-300 group-hover:from-blue-600/30 group-hover:to-purple-600/30"
                      whileHover={{ scale: 1.1 }}
                    >
                      <BookOpen className="h-6 w-6 text-blue-400" aria-hidden="true" />
                    </motion.div>
                    <h3 className="text-xl leading-snug font-bold text-white">
                      El stack que dominabas hace 5 años hoy es deuda técnica
                    </h3>
                    <p className="leading-relaxed text-zinc-300">
                      Leo, pruebo y me equivoco con tooling nuevo cada semana — no por moda, sino
                      para saber qué problemas reales resuelve cada herramienta antes de que llegue
                      al stack de producción. El día que deje de aprender, dejo de ser útil para mi
                      equipo.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.section>
        </div>

        {/* 05 — Off-screen · superficie transparente + parallax brackets ·
            cambio de pulso visual respecto a Filosofía (que va sobre slate). */}
        <div className="relative overflow-hidden">
          <ParallaxBackdrop variant="brackets" position="top-right" speed={0.18} />
          <motion.section
            className="container mx-auto space-y-10 px-4 py-16 md:py-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div className="space-y-4 text-center" variants={itemVariants}>
              <Pill variant="eyebrow" size="md">
                Off-screen
              </Pill>
              <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Lo que hago cuando cierro el editor
              </h2>
              <p className="mx-auto max-w-2xl leading-relaxed text-zinc-300">
                Caminar Medellín, leer fuera del stack, mentorear y compartir con la comunidad. Lo
                que me mantiene curioso y me permite volver al código con perspectiva.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Tabs defaultValue="hobbies" className="w-full">
                <TabsList className="grid h-auto w-full grid-cols-3 border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md md:inline-grid md:w-auto">
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
                      <MediaCard
                        image="https://www.metropolitan-touring.com/wp-content/uploads/2024/11/el-poblado-discrict.webp"
                        alt="Caminatas por la ciudad de Medellín"
                        title="Caminatas por la ciudad"
                      >
                        No todas las formas de conectar son igual, y particularmente en la ciudad,
                        donde hay tantas oportunidades para interactuar con otras personas, es
                        importante dedicar tiempo a conocer la jungla de cemento. Por eso me encanta
                        caminar por la ciudad, explorar las calles y encontrar nuevos lugares
                        ocultos.
                      </MediaCard>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <MediaCard
                        image="https://almipro.com/wp-content/uploads/2019/01/parquedelcafe.jpg"
                        alt="Me encanta el tiempo en familia"
                        title="Tiempo en familia"
                      >
                        Mi tiempo en familia es fundamental. Me encanta pasar tiempo con mis hijos y
                        esposa, familiares y compañeros de trabajo. Disfruto de momentos de
                        tranquilidad y conexión con las personas que me rodean y aportan valor a lo
                        que soy, en reuniones o incluso compartiendo lugares únicos.
                      </MediaCard>
                    </motion.div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="reading" className="mt-6">
                  <motion.div variants={itemVariants} initial="hidden" animate="visible">
                    <Card className="surface-card">
                      <CardContent className="space-y-6 p-6">
                        <h3 className="text-xl font-bold">Mi biblioteca personal</h3>
                        <p className="text-zinc-300">
                          La lectura es fundamental para mi crecimiento profesional y personal.
                          Estos son algunos libros que han influido significativamente en mi forma
                          de pensar:
                        </p>

                        <div className="space-y-4">
                          <motion.div
                            className="border-l-2 border-blue-500/30 py-1 pl-5 transition-colors duration-200 hover:border-blue-400/60"
                            whileHover={{ scale: 1.02 }}
                          >
                            <h4 className="font-bold">Lecturas técnicas</h4>
                            <ul className="mt-2 space-y-2 text-zinc-400">
                              <li>• "Clean Code" por Robert C. Martin</li>
                              <li>
                                • "Designing Data-Intensive Applications" por Martin Kleppmann
                              </li>
                              <li>• "The Phoenix Project" por Gene Kim</li>
                              <li>• "Accelerate" por Nicole Forsgren, Jez Humble y Gene Kim</li>
                            </ul>
                          </motion.div>

                          <motion.div
                            className="border-l-2 border-blue-500/30 py-1 pl-5 transition-colors duration-200 hover:border-blue-400/60"
                            whileHover={{ scale: 1.02 }}
                          >
                            <h4 className="font-bold">Liderazgo y negocios</h4>
                            <ul className="mt-2 space-y-2 text-zinc-400">
                              <li>• "The Five Dysfunctions of a Team" por Patrick Lencioni</li>
                              <li>• "Radical Candor" por Kim Scott</li>
                              <li>• "The Lean Startup" por Eric Ries</li>
                              <li>• "High Output Management" por Andrew Grove</li>
                            </ul>
                          </motion.div>

                          <motion.div
                            className="border-l-2 border-blue-500/30 py-1 pl-5 transition-colors duration-200 hover:border-blue-400/60"
                            whileHover={{ scale: 1.02 }}
                          >
                            <h4 className="font-bold">Filosofía y pensamiento</h4>
                            <ul className="mt-2 space-y-2 text-zinc-400">
                              <li>• "Thinking, Fast and Slow" por Daniel Kahneman</li>
                              <li>
                                • "Antifragile: Things That Gain from Disorder" por Nassim Nicholas
                                Taleb
                              </li>
                              <li>• "Mindset: The New Psychology of Success" por Carol S. Dweck</li>
                              <li>
                                • "Deep Work: Rules for Focused Success in a Distracted World" por
                                Cal Newport
                              </li>
                            </ul>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="community" className="mt-6">
                  <motion.div variants={itemVariants} initial="hidden" animate="visible">
                    <Card className="surface-card">
                      <CardContent className="space-y-6 p-6">
                        <h3 className="text-xl font-bold">Participación en la comunidad</h3>
                        <p className="text-zinc-300">
                          Creo firmemente en retribuir a la comunidad tecnológica y apoyar a la
                          siguiente generación de desarrolladores. Así es como me involucro:
                        </p>

                        <div className="grid gap-4 md:grid-cols-2">
                          <motion.div
                            className="border-l-2 border-blue-500/30 py-1 pl-5 transition-colors duration-200 hover:border-blue-400/60"
                            whileHover={{ scale: 1.02 }}
                          >
                            <h4 className="font-bold">Programa de mentorías</h4>
                            <p className="mt-2 text-zinc-400">
                              Regularmente mentoreo a desarrolladores junior a través de programas
                              estructurados y relaciones informales, ayudándoles a navegar sus
                              trayectorias profesionales y desafíos técnicos en el mundo del
                              desarrollo.
                            </p>
                          </motion.div>

                          <motion.div
                            className="border-l-2 border-blue-500/30 py-1 pl-5 transition-colors duration-200 hover:border-blue-400/60"
                            whileHover={{ scale: 1.02 }}
                          >
                            <h4 className="font-bold">Contribuciones Open Source</h4>
                            <p className="mt-2 text-zinc-400">
                              Contribuyo activamente a proyectos de código abierto en el ámbito de
                              la tecnología, ayudando a construir herramientas que benefician a la
                              comunidad de desarrolladores y democratizan el acceso a soluciones de
                              todo tipo pero haciendo enfasis en medios de pago y finanzas.
                            </p>
                          </motion.div>

                          <motion.div
                            className="border-l-2 border-blue-500/30 py-1 pl-5 transition-colors duration-200 hover:border-blue-400/60"
                            whileHover={{ scale: 1.02 }}
                          >
                            <h4 className="font-bold">Charlas técnicas & talleres</h4>
                            <p className="mt-2 text-zinc-400">
                              Participo como ponente en meetups y conferencias locales sobre
                              arquitectura de software financiero, liderazgo y desarrollo
                              profesional en el ámbito tecnológico.
                            </p>
                          </motion.div>

                          <motion.div
                            className="border-l-2 border-blue-500/30 py-1 pl-5 transition-colors duration-200 hover:border-blue-400/60"
                            whileHover={{ scale: 1.02 }}
                          >
                            <h4 className="font-bold">Educación tecnológica</h4>
                            <p className="mt-2 text-zinc-400">
                              Colaboro con programas que introducen conceptos de programación y
                              tecnología a grupos subrepresentados en el sector tech, contribuyendo
                              a construir una industria más diversa e inclusiva.
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
        </div>

        {/* 06 — CTA final · superficie oscura sutil + parallax brackets
            centrado · cierre del recorrido con peso visual. */}
        <div className="relative overflow-hidden border-y border-zinc-900/60 bg-zinc-950/50 backdrop-blur-sm">
          <ParallaxBackdrop
            variant="brackets"
            position="center"
            speed={0.12}
            opacityClass="opacity-[0.04]"
          />
          <motion.section
            className="container mx-auto px-4 py-16 md:py-24"
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
              <Card className="surface-card relative overflow-hidden">
                {/* Capa de saturación brand — el card sigue siendo glass pero
                  con un tinte más vivo que el resto, para que la CTA final
                  destaque visualmente sin romper el sistema. */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/15 to-transparent"
                  aria-hidden="true"
                />

                <CardContent className="relative z-10 space-y-6 p-8 text-center md:p-12">
                  <motion.h2
                    className="text-3xl font-extrabold tracking-tight text-white md:text-4xl"
                    variants={itemVariants}
                  >
                    ¿Tu próximo proyecto necesita arquitectura?
                  </motion.h2>
                  <motion.p
                    className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-200 md:text-lg"
                    variants={itemVariants}
                  >
                    Si tienes un sistema de pagos creciendo más rápido de lo que aguanta, o un
                    equipo que necesita un Tech Leader que entienda fintech desde la trinchera —
                    hablemos. Reviso tu contexto en una llamada de 30 minutos antes de proponer
                    cualquier cosa.
                  </motion.p>
                  <motion.div
                    className="flex flex-col justify-center gap-4 pt-4 sm:flex-row"
                    variants={containerVariants}
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="gradient"
                        size="xl"
                        className="group w-full touch-manipulation sm:w-auto"
                        asChild
                      >
                        <Link href="/contacto">
                          Conversemos sobre tu sistema
                          <ArrowRight
                            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="glass"
                        size="xl"
                        className="w-full touch-manipulation sm:w-auto"
                        asChild
                      >
                        <Link href="/recursos">Mis proyectos</Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>
        </div>
      </main>
      {/* CV Download Modal */}
      <Dialog open={cvModalOpen} onOpenChange={setCvModalOpen}>
        <DialogContent className="max-w-md border-white/10 bg-slate-950/95 text-white backdrop-blur-xl">
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
                  variant="glass"
                  placeholder="Por favor ingresa tu nombre completo"
                />
                {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
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
                  variant="glass"
                  placeholder="Por favor ingrese su correo electrónico"
                />
                {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
              </div>

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full touch-manipulation"
              >
                Acceder al CV
              </Button>
            </form>
          ) : (
            <div className="space-y-4 py-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="gradient"
                  size="lg"
                  className="flex-1 touch-manipulation"
                  onClick={() => window.open("/cv.pdf", "_blank")}
                >
                  <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
                  Ver el CV
                </Button>
                <Button variant="glass" size="lg" className="flex-1 touch-manipulation" asChild>
                  <a href="/cv.pdf" download>
                    <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                    Descargar el CV
                  </a>
                </Button>
              </div>

              <div className="text-center text-sm text-zinc-400">
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
