import { Suspense } from "react";
import { Code, Filter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { RepositoriesLoading } from "@/components/repositories-loading";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-12">
        <section className="py-12 md:py-24 space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Recursos de Código Abierto
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Explora mis repositorios públicos en GitHub y GitLab. Puedes usar,
              hacer fork o contribuir a cualquiera de ellos.
            </p>
          </div>

          <Tabs defaultValue="github" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 h-auto bg-zinc-900 p-1">
                <TabsTrigger
                  value="github"
                  className="data-[state=active]:bg-zinc-800 gap-2"
                >
                  <Code className="h-4 w-4" />
                  GitHub
                </TabsTrigger>
                <TabsTrigger
                  value="gitlab"
                  className="data-[state=active]:bg-zinc-800 gap-2"
                >
                  <Code className="h-4 w-4" />
                  GitLab
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                  <Input
                    type="search"
                    placeholder="Buscar repositorio..."
                    className="pl-8 bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500 w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-full md:w-[180px] bg-zinc-950 border-zinc-800 focus:ring-blue-500">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-950 border-zinc-800">
                      <SelectItem value="all">Todos los lenguajes</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-zinc-800 gap-2">
                    <Filter className="h-4 w-4" />
                    Filtros
                  </Button>
                </div>
              </div>
            </div>

            <TabsContent value="github" className="mt-0">
              <Suspense fallback={<RepositoriesLoading />}>
                <RepositoriesList source="github" username="carrilloapps" />
              </Suspense>
            </TabsContent>

            <TabsContent value="gitlab" className="mt-0">
              <Suspense fallback={<RepositoriesLoading />}>
                <RepositoriesList source="gitlab" username="carrilloapps" />
              </Suspense>
            </TabsContent>
          </Tabs>
        </section>

        <section className="py-12 space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold">Mis proyectos destacados</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Mis proyectos personales y contribuciones de código abierto más
              significativas
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-500" />
                  Financial Dashboard
                </CardTitle>
                <CardDescription>
                  An open-source financial analytics dashboard with real-time
                  data visualization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    TypeScript
                  </div>
                  <p className="text-zinc-400">
                    Built with React, D3.js, and Node.js. Features include
                    portfolio tracking, market analysis, and customizable
                    widgets.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-4 text-sm text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Code className="h-4 w-4" />
                    128
                  </div>
                  <div className="flex items-center gap-1">
                    <Code className="h-4 w-4" />
                    42
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-800 gap-2"
                >
                  <Code className="h-4 w-4" />
                  Ver proyecto
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-500" />
                  Backoffice Toolkit
                </CardTitle>
                <CardDescription>
                  A collection of tools for automating backoffice operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    JavaScript
                  </div>
                  <p className="text-zinc-400">
                    Includes modules for data processing, report generation, and
                    workflow automation. Used by several financial institutions.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-4 text-sm text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Code className="h-4 w-4" />
                    95
                  </div>
                  <div className="flex items-center gap-1">
                    <Code className="h-4 w-4" />
                    31
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-800 gap-2"
                >
                  <Code className="h-4 w-4" />
                  Ver proyecto
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-500" />
                  Secure Payment Gateway
                </CardTitle>
                <CardDescription>
                  An open-source payment processing system with fraud detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Python
                  </div>
                  <p className="text-zinc-400">
                    Implements industry-standard security protocols and machine
                    learning for fraud detection. Supports multiple payment
                    methods.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-4 text-sm text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Code className="h-4 w-4" />
                    210
                  </div>
                  <div className="flex items-center gap-1">
                    <Code className="h-4 w-4" />
                    78
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-800 gap-2"
                >
                  <Code className="h-4 w-4" />
                  Ver proyecto
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="py-12">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-8 md:p-12 space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">¿Quieres colaborar?</h2>
                <p className="text-zinc-400 max-w-3xl">
                  Siempre estoy abierto a colaborar en proyectos interesantes,
                  especialmente en desarrollo web y aplicaciones móviles. Si
                  tienes una idea o proyecto que te gustaría discutir, no dudes
                  en contactarme.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Contáctame
                </Button>
                <Button
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-800"
                >
                  Ver proyectos
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
