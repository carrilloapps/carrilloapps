"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Code, Filter, Search, Github, GitBranch, Star, Eye, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <motion.main
        className="container py-8 space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Recursos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>
        {/* Hero Section */}
        <motion.section
          className="py-12 md:py-24 space-y-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="space-y-4 text-center" variants={itemVariants}>
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 text-white text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg shadow-blue-600/10"
              >
                Recursos
              </Badge>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-lg pb-2"
              variants={itemVariants}
            >
              Gratuitos &amp; código abierto
            </motion.h1>
            <motion.p
              className="text-xl text-zinc-400 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Proyectos de software, sistemas enfocados en finanzas y medios de pago, todos recursos para desarrolladores.
            </motion.p>
          </motion.div>

          <motion.div className="h-8" variants={itemVariants} />

          <motion.div
            className="flex flex-wrap justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 rounded-full border border-zinc-800">
              <Github className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-zinc-300">Open Source</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 rounded-full border border-zinc-800">
              <GitBranch className="h-4 w-4 text-green-400" />
              <span className="text-sm text-zinc-300">Contribuciones</span>
            </div>
          </motion.div>
        </motion.section>
        <motion.section className="py-16 md:py-24 space-y-12" variants={itemVariants}>
          <motion.div
            variants={itemVariants}
            className="w-full"
          >
            <Tabs defaultValue="github" className="w-full">
              <motion.div
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
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
                      <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Suspense fallback={<RepositoriesLoading />}>
                    <RepositoriesList source="github" username="carrilloapps" />
                  </Suspense>
                </motion.div>
              </TabsContent>

              <TabsContent value="gitlab" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Suspense fallback={<RepositoriesLoading />}>
                    <RepositoriesList source="gitlab" username="carrilloapps" />
                  </Suspense>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.section>

        <motion.section className="py-16 space-y-12" variants={itemVariants}>
          <motion.div
            className="space-y-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Proyectos destacados
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Mis proyectos personales y contribuciones de código abierto más
              significativas, desarrollados con las mejores y más estables tecnologías.
            </p>
          </motion.div>

          <FeaturedProjects />
        </motion.section>

        <motion.section className="py-16" variants={itemVariants}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 backdrop-blur-sm border-zinc-700 hover:border-zinc-600 transition-all duration-300">
              <CardContent className="p-8 md:p-12 space-y-8">
                <div className="space-y-6 text-center">
                  <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    ¿Quieres Colaborar?
                  </motion.h2>
                  <motion.p
                    className="text-lg md:text-xl text-zinc-400 max-w-4xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Siempre estoy abierto a colaborar en proyectos interesantes,
                    especialmente en desarrollo web, aplicaciones móviles y sistemas
                    financieros. Si tienes una idea o proyecto que te gustaría
                    discutir, no dudes en contactarme.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-medium transition-all duration-200 transform hover:scale-105">
                    Contáctame
                  </Button>
                  <Button
                    variant="outline"
                    className="border-zinc-600 hover:bg-zinc-800 hover:border-zinc-500 px-8 py-3 text-lg font-medium transition-all duration-200 transform hover:scale-105"
                  >
                    Ver más proyectos
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>
      </motion.main>

      <SiteFooter />
    </div>
  );
}
