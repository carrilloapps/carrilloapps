"use client";

import { Suspense } from "react";
import { motion, Variants } from "framer-motion";
import { Filter, Search, Github, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
            <Tabs defaultValue="github" className="w-full">
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

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input
                      type="search"
                      placeholder="Buscar repositorio..."
                      className="pl-10 bg-zinc-950/80 backdrop-blur-sm border-zinc-800 focus-visible:ring-blue-500 focus-visible:border-blue-500 w-full transition-all duration-200"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Select>
                      <SelectTrigger className="w-full md:w-[180px] bg-zinc-950/80 backdrop-blur-sm border-zinc-800 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                        <SelectValue placeholder="Lenguaje" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-950 border-zinc-800">
                        <SelectItem value="all">Todos los lenguajes</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="nextjs">Next.js</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="border-zinc-800 hover:bg-zinc-800 gap-2 transition-all duration-200">
                      <Filter className="h-4 w-4" />
                      Filtros
                    </Button>
                  </div>
                </div>
              </motion.div>

              <TabsContent value="github" className="mt-0">
                <motion.div variants={itemVariants}>
                  <Suspense fallback={<RepositoriesLoading />}>
                    <RepositoriesList source="github" username="carrilloapps" />
                  </Suspense>
                </motion.div>
              </TabsContent>

              <TabsContent value="gitlab" className="mt-0">
                <motion.div variants={itemVariants}>
                  <Suspense fallback={<RepositoriesLoading />}>
                    <RepositoriesList source="gitlab" username="carrilloapps" />
                  </Suspense>
                </motion.div>
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
          >
            <motion.div 
              className="space-y-6 text-center"
              variants={itemVariants}
            >
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                Proyectos destacados
              </h2>
              <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                Mis proyectos personales y contribuciones de código abierto más
                significativas, desarrollados con las mejores y más estables tecnologías.
              </p>
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
          >
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 backdrop-blur-sm border-zinc-700 hover:border-zinc-600 transition-all duration-300">
                <CardContent className="p-8 md:p-12 space-y-8">
                  <div className="space-y-6 text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                      ¿Quieres colaborar?
                    </h2>
                    <p className="text-lg md:text-xl text-zinc-400 max-w-4xl mx-auto leading-relaxed">
                      Siempre estoy abierto a colaborar en proyectos interesantes,
                      especialmente en desarrollo web, aplicaciones móviles y sistemas
                      financieros. Si tienes una idea o proyecto que te gustaría
                      discutir, no dudes en contactarme.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:from-blue-700 focus:to-purple-700 focus:ring-4 focus:ring-blue-500/50 w-full sm:w-auto text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 group" 
                      asChild
                      onClick={() => trackCTAClick('Contactarme', 'primary', 'recursos-cta-section')}
                    >
                      <Link href="/contacto" aria-describedby="explore-projects-desc">
                        Contactarme
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:animate-pulse" aria-hidden="true" />
                        <span id="explore-projects-desc" className="sr-only">Contactame y conversemos</span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:border-slate-500 focus:bg-slate-800/50 focus:ring-4 focus:ring-slate-500/50 w-full sm:w-auto font-bold py-3 px-8 rounded-lg shadow-lg shadow-slate-500/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                      aria-describedby="download-cv-desc"
                      asChild
                      onClick={() => trackCTAClick('Agendar reunión', 'secondary', 'recursos-cta-section')}
                    >
                      <Link href="/agendamiento" aria-describedby="explore-projects-desc">
                        Agendar reunión
                        <span id="download-cv-desc" className="sr-only">Agendame una reunión y discutamos tu proyecto</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
      <ResourcesPageContent />
    </PageLoadingProvider>
  );
}
