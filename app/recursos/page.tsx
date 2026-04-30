"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Funnel, Search, ArrowRight } from "lucide-react";
import { Github } from "@/components/icons/social-icons";

import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "@/components/section-header";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RepositoriesList } from "@/components/repositories-list";
import { RepositoriesLoading } from "@/components/unified-loading";
import { FeaturedProjects } from "@/components/featured-projects";
import { DynamicBackground } from "@/components/dynamic-background";
import { PageLoadingProvider, usePageLoading } from "@/components/page-loading-context";
import { OverlayLoading as PageLoadingOverlay } from "@/components/unified-loading";
import { PageHero } from "@/components/page-hero";
import Link from "next/link";
import { trackCTAClick } from "@/lib/analytics";

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

function ResourcesPageContent() {
  const { isLoading } = usePageLoading();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Leer tab del query param, por defecto "github"
  const tabFromUrl = searchParams.get("tab");
  const activeTab = (tabFromUrl === "gitlab" || tabFromUrl === "github") ? tabFromUrl : "github";

  // Handler para cambiar de tab
  const handleTabChange = (value: string) => {
    router.replace(`/recursos?tab=${value}`, { scroll: false });
  };

  return (
    <>
      <PageLoadingOverlay isVisible={isLoading} />
      <div className="min-h-screen text-white relative overflow-hidden">
        <DynamicBackground />
        <SiteHeader />

        <main className="relative z-10 container py-12 space-y-24" id="main-content">
          <PageHero
            badge={{ text: "Recursos" }}
            title="Gratuitos & código abierto"
            description="Proyectos de software, sistemas enfocados en finanzas y medios de pago, todos recursos para desarrolladores."
          />

          {/* Repositories Section */}
          <motion.section 
            className="pt-6 pb-12 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
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
            className="w-full"
          >
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full" suppressHydrationWarning>
            <motion.div
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8"
              variants={itemVariants}
            >
                <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 h-auto bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 p-1">
                  <TabsTrigger
                    value="github"
                    className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white gap-2 transition-all duration-200"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </TabsTrigger>
                  <TabsTrigger
                    value="gitlab"
                    className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white gap-2 transition-all duration-200"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
                    </svg>
                    GitLab
                  </TabsTrigger>
                </TabsList>

                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none z-10" aria-hidden="true" />
                    <Input
                      variant="glass"
                      type="search"
                      placeholder="Buscar repositorio…"
                      className="pl-10 w-full"
                      aria-label="Buscar repositorio"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Select>
                      <SelectTrigger variant="glass" className="w-full md:w-[180px]" aria-label="Filtrar por lenguaje">
                        <SelectValue placeholder="Lenguaje" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-950/95 backdrop-blur-xl border-white/10">
                        <SelectItem value="all">Todos los lenguajes</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="nextjs">Next.js</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="glass" size="default" className="gap-2 h-11">
                      <Funnel className="h-4 w-4" aria-hidden="true" />
                      Filtros
                    </Button>
                  </div>
                </div>
              </motion.div>

              <TabsContent value="github" className="mt-0">
                <Suspense fallback={<RepositoriesLoading />}>
                  <RepositoriesList key="github-repos" source="github" username="carrilloapps" />
                </Suspense>
              </TabsContent>

              <TabsContent value="gitlab" className="mt-0">
                <Suspense fallback={<RepositoriesLoading />}>
                  <RepositoriesList key="gitlab-repos" source="gitlab" username="carrilloapps" />
                </Suspense>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.section>

          {/* Featured Projects Section */}
          <motion.section
            className="py-12 space-y-8"
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
                <div className="p-8 md:p-12 space-y-8">
                  <div className="space-y-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.18em] text-blue-300 bg-blue-500/10 border border-blue-500/30">
                      Trabajemos juntos
                    </span>
                    <h2
                      id="recursos-cta-heading"
                      className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
                    >
                      ¿Quieres colaborar?
                    </h2>
                    <p className="text-base md:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                      Siempre estoy abierto a proyectos interesantes — desarrollo web, aplicaciones móviles y sistemas financieros. Si tienes una idea, hablemos.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <Button
                      variant="gradient"
                      size="lg"
                      className="w-full sm:w-auto touch-manipulation group"
                      asChild
                      onClick={() =>
                        trackCTAClick("Contactarme", "primary", "recursos-cta-section")
                      }
                    >
                      <Link href="/contacto">
                        Contactarme
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button
                      variant="glass"
                      size="lg"
                      className="w-full sm:w-auto touch-manipulation"
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
  );
}

export default function ResourcesPage() {
  return (
    <PageLoadingProvider>
      <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
        <ResourcesPageContent />
      </Suspense>
    </PageLoadingProvider>
  );
}
