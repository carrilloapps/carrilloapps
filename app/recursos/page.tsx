"use client"

import { Suspense, useState } from "react"
import { useQueryState, parseAsString, parseAsStringLiteral } from "nuqs"
import { motion, type Variants } from "@/lib/motion"
import { Search, ArrowRight } from "lucide-react"
import { Github } from "@/components/icons/social-icons"

import { Button } from "@/components/ui/button"
import { Pill } from "@/components/ui/pill"
import { Input } from "@/components/ui/input"
import { SurfaceCard } from "@/components/ui/surface-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionHeader } from "@/components/section-header"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RepositoriesList } from "@/components/repositories-list"
import { RepositoriesLoading } from "@/components/unified-loading"
import { FeaturedProjects } from "@/components/featured-projects"
import { DynamicBackground } from "@/components/dynamic-background"
import { PageLoadingProvider, usePageLoading } from "@/components/page-loading-context"
import { OverlayLoading as PageLoadingOverlay } from "@/components/unified-loading"
import { PageHero } from "@/components/page-hero"
import Link from "next/link"
import { trackCTAClick, trackSearch } from "@/lib/analytics"

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

function ResourcesPageContent() {
  const { isLoading } = usePageLoading()

  // URL-driven state (shareable, navigable, SSR-friendly) via nuqs.
  const [activeTab, setActiveTab] = useQueryState(
    "tab",
    parseAsStringLiteral(["github", "gitlab"] as const).withDefault("github"),
  )
  const [searchQuery, setSearchQuery] = useQueryState("q", parseAsString.withDefault(""))
  const [language, setLanguage] = useQueryState("lang", parseAsString.withDefault("all"))

  // Uncommitted text in the search box (committed to the URL on submit).
  const [searchInput, setSearchInput] = useState("")

  const handleTabChange = (value: string) => {
    setActiveTab(value as "github" | "gitlab", { scroll: false })
    setSearchInput("")
    setSearchQuery(null)
    setLanguage(null)
  }

  const handleSearch = () => {
    if (searchInput) trackSearch(searchInput)
    setSearchQuery(searchInput || null)
  }

  return (
    <>
      <PageLoadingOverlay isVisible={isLoading} />
      <div className="relative min-h-screen overflow-hidden text-white">
        <DynamicBackground />
        <SiteHeader />

        <main className="relative z-10 container space-y-24 py-12" id="main-content">
          <PageHero
            className="!mb-0 !pb-4 md:!pb-8"
            badge={{ text: "Recursos" }}
            title="Gratuitos & código abierto"
            description="Proyectos de software, sistemas enfocados en finanzas y medios de pago, todos recursos para desarrolladores."
          />

          {/* Repositories Section */}
          <motion.section
            className="!mt-5 space-y-8 pt-2 pb-12 md:!mt-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="w-full">
              <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-full"
                suppressHydrationWarning
              >
                {/* Control bar: tabs left, search+filter right */}
                <motion.div
                  className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                  variants={itemVariants}
                >
                  <TabsList className="inline-flex h-auto w-full gap-1 rounded-xl border border-white/[0.08] bg-white/[0.04] p-1 backdrop-blur-md md:w-auto">
                    <TabsTrigger
                      value="github"
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition-all duration-200 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-sm md:flex-none"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </TabsTrigger>
                    <TabsTrigger
                      value="gitlab"
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition-all duration-200 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-sm md:flex-none"
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
                      </svg>
                      GitLab
                    </TabsTrigger>
                  </TabsList>

                  <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                    <div className="relative w-full sm:w-72">
                      <Search
                        className="pointer-events-none absolute top-1/2 left-3.5 z-10 h-4 w-4 -translate-y-1/2 text-zinc-500"
                        aria-hidden="true"
                      />
                      <Input
                        variant="glass"
                        type="search"
                        placeholder="Buscar repositorio…"
                        className="w-full pr-20 pl-10"
                        aria-label="Buscar repositorio"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1/2 right-1 h-7 -translate-y-1/2 rounded-lg px-3 text-xs text-zinc-400 hover:bg-zinc-700/60 hover:text-white"
                        onClick={handleSearch}
                      >
                        Buscar
                      </Button>
                    </div>
                    <Select
                      value={language}
                      onValueChange={(v) => setLanguage(v === "all" ? null : v)}
                    >
                      <SelectTrigger
                        variant="glass"
                        className="w-full sm:w-[180px]"
                        aria-label="Filtrar por lenguaje"
                      >
                        <SelectValue placeholder="Lenguaje" />
                      </SelectTrigger>
                      <SelectContent className="border-white/10 bg-slate-950/95 backdrop-blur-xl">
                        <SelectItem value="all">Todos los lenguajes</SelectItem>
                        <SelectItem value="TypeScript">TypeScript</SelectItem>
                        <SelectItem value="JavaScript">JavaScript</SelectItem>
                        <SelectItem value="Go">Go</SelectItem>
                        <SelectItem value="Kotlin">Kotlin</SelectItem>
                        <SelectItem value="Python">Python</SelectItem>
                        <SelectItem value="Shell">Shell</SelectItem>
                        <SelectItem value="Java">Java</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>

                <TabsContent value="github" className="mt-0">
                  <Suspense fallback={<RepositoriesLoading />}>
                    <RepositoriesList
                      key={`github-${searchQuery}-${language}`}
                      source="github"
                      username="carrilloapps"
                      externalSearch={searchQuery}
                      externalLanguage={language}
                    />
                  </Suspense>
                </TabsContent>

                <TabsContent value="gitlab" className="mt-0">
                  <Suspense fallback={<RepositoriesLoading />}>
                    <RepositoriesList
                      key={`gitlab-${searchQuery}-${language}`}
                      source="gitlab"
                      username="carrilloapps"
                      externalSearch={searchQuery}
                      externalLanguage={language}
                    />
                  </Suspense>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.section>

          {/* Featured Projects Section */}
          <motion.section
            className="space-y-8 py-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            aria-labelledby="featured-projects-heading"
          >
            <motion.div variants={itemVariants}>
              <SectionHeader
                eyebrow="Portafolio"
                title="Proyectos destacados"
                description="Mis proyectos personales y contribuciones de código abierto más significativas, construidos con las tecnologías más estables del momento."
                headingId="featured-projects-heading"
                align="left"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FeaturedProjects />
            </motion.div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            className="py-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            aria-labelledby="recursos-cta-heading"
          >
            <motion.div variants={itemVariants}>
              <SurfaceCard className="text-center">
                <div className="space-y-8 p-8 md:p-12">
                  <div className="space-y-4">
                    <Pill variant="eyebrow" size="md">
                      Trabajemos juntos
                    </Pill>
                    <h2
                      id="recursos-cta-heading"
                      className="text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl"
                    >
                      ¿Quieres colaborar?
                    </h2>
                    <p className="mx-auto max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
                      Siempre estoy abierto a proyectos interesantes — desarrollo web, aplicaciones
                      móviles y sistemas financieros. Si tienes una idea, hablemos.
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button
                      variant="gradient"
                      size="lg"
                      className="group w-full touch-manipulation sm:w-auto"
                      asChild
                      onClick={() =>
                        trackCTAClick("Contactarme", "primary", "recursos-cta-section")
                      }
                    >
                      <Link href="/contacto">
                        Contactarme
                        <ArrowRight
                          className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full touch-manipulation text-zinc-400 hover:bg-transparent hover:text-white sm:w-auto"
                      asChild
                      onClick={() =>
                        trackCTAClick("Agendar reunión", "secondary", "recursos-cta-section")
                      }
                    >
                      <Link href="/agendamiento">Agendar reunión</Link>
                    </Button>
                  </div>
                </div>
              </SurfaceCard>
            </motion.div>
          </motion.section>
        </main>

        <SiteFooter />
      </div>
    </>
  )
}

export default function ResourcesPage() {
  return (
    <PageLoadingProvider>
      <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
        <ResourcesPageContent />
      </Suspense>
    </PageLoadingProvider>
  )
}
