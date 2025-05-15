import Image from "next/image";
import { ArrowRight, Award, BookOpen, Calendar, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-24">
        {/* Hero Section */}
        <section className="py-12 md:py-24 space-y-8">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="border-blue-500 text-blue-500"
                >
                  Conoceme
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Hola, soy José Carrillo
                </h1>
                <p className="text-xl text-zinc-400">
                  Mi trayectoria profesional en el mundo del desarrollo
                </p>
              </div>
              <p className="text-zinc-400 leading-relaxed">
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
              <div className="flex gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Descargar CV
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-900"
                >
                  Contáctame
                </Button>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-zinc-800">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Professional headshot"
                width={600}
                height={600}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Sección de Trayectoria Profesional */}
        <section className="py-12 space-y-8">
          <div className="space-y-4 text-center">
            <Badge variant="outline" className="border-blue-500 text-blue-500">
              Timeline
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Trayectoria profesional
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              De programador entusiasta a líder técnico - los hitos clave que
              han formado mi carrera
            </p>
          </div>

          <div className="relative border-l border-zinc-800 ml-3 md:ml-6 pl-6 md:pl-10 space-y-10">
            {/* Posición actual */}
            <div className="relative">
              <div className="absolute -left-[42px] md:-left-[50px] flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">oct. 2024 - Presente</Badge>
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
                    className="border-zinc-700 text-zinc-400"
                  >
                    Liderazgo
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    Arquitectura
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    Mentoría
                  </Badge>
                </div>
              </div>
            </div>

            {/* Rol senior */}
            <div className="relative">
              <div className="absolute -left-[42px] md:-left-[50px] flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">mar. 2024 - oct. 2024</Badge>
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
                    className="border-zinc-700 text-zinc-400"
                  >
                    SAP & ERP
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    Rendimiento
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    Arquitectura
                  </Badge>
                </div>
              </div>
            </div>

            {/* Experiencia media */}
            <div className="relative">
              <div className="absolute -left-[42px] md:-left-[50px] flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">ago. 2021 - oct. 2024</Badge>
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
                    className="border-zinc-700 text-zinc-400"
                  >
                    Pagos
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    Seguridad
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    Android
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    iOS
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    PCI DSS
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    Banking
                  </Badge>
                </div>
              </div>
            </div>

            {/* Inicio de carrera */}
            <div className="relative">
              <div className="absolute -left-[42px] md:-left-[50px] flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">may. 2023 - mar. 2024</Badge>
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
                    className="border-zinc-700 text-zinc-400"
                  >
                    Backend
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    UI/UX
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    Startups
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    Open Banking
                  </Badge>

                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    Pasarelas de pago
                  </Badge>
                </div>
              </div>
            </div>

            {/* Formación académica */}
            <div className="relative">
              <div className="absolute -left-[42px] md:-left-[50px] flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">ene. 2022 - feb. 2024</Badge>
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
                    className="border-zinc-700 text-zinc-400"
                  >
                    Android
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    iOS
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    Prevención del fraude
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    Firebase
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    Prevención del fraude
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-12 space-y-8">
          <div className="space-y-4 text-center">
            <Badge variant="outline" className="border-blue-500 text-blue-500">
              Enfoque de Desarrollo
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Visión y misión profesional
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Los principios fundamentales que guían mi trabajo como
              desarrollador y líder técnico
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Calidad ante todo</h3>
                <p className="text-zinc-400">
                  Código de calidad significa mantenibilidad, legibilidad y
                  escalabilidad, no solo funcionalidad. Priorizo escribir
                  soluciones limpias y bien probadas que resistan el paso del
                  tiempo y faciliten el crecimiento de los proyectos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Centrado en el usuario</h3>
                <p className="text-zinc-400">
                  La excelencia técnica debe servir a necesidades reales. En
                  sistemas financieros y empresariales, siempre busco entender
                  los requerimientos del negocio para crear soluciones que
                  resuelvan problemas concretos de manera efectiva.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Aprendizaje continuo</h3>
                <p className="text-zinc-400">
                  Me comprometo a mantenerme a la vanguardia de la tecnología en
                  constante evolución. Dedico tiempo a explorar nuevas técnicas
                  y buenas prácticas para desarrollar soluciones innovadoras
                  ante los desafíos empresariales actuales.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Personal Interests */}
        <section className="py-12 space-y-8">
          <div className="space-y-4 text-center">
            <Badge variant="outline" className="border-blue-500 text-blue-500">
              Más allá del código
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Intereses personales
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Cuando no estoy programando o liderando equipos técnicos, esto es lo que me mantiene inspirado
            </p>
          </div>

          <Tabs defaultValue="hobbies" className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 h-auto bg-zinc-900 p-1">
                <TabsTrigger
                value="hobbies"
                className="data-[state=active]:bg-zinc-800"
                >
                Pasatiempos
                </TabsTrigger>
                <TabsTrigger
                value="reading"
                className="data-[state=active]:bg-zinc-800"
                >
                Lecturas
                </TabsTrigger>
                <TabsTrigger
                value="community"
                className="data-[state=active]:bg-zinc-800"
                >
                Comunidad
                </TabsTrigger>
            </TabsList>

            <TabsContent value="hobbies" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
                  <div className="aspect-video bg-zinc-800 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl">🏔️</div>
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

                <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
                  <div className="aspect-video bg-zinc-800 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl">🎸</div>
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
              </div>
            </TabsContent>

            <TabsContent value="reading" className="mt-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6 space-y-6">
                    <h3 className="text-xl font-bold">Mi biblioteca personal</h3>
                    <p className="text-zinc-400">
                    La lectura es fundamental para mi crecimiento profesional y
                    personal. Estos son algunos libros que han influido significativamente
                    en mi forma de pensar:
                    </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-800 rounded-lg">
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
                    </div>

                    <div className="p-4 bg-zinc-800 rounded-lg">
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
                    </div>

                    <div className="p-4 bg-zinc-800 rounded-lg">
                      <h4 className="font-bold">Filosofía y Pensamiento</h4>
                      <ul className="mt-2 space-y-2 text-zinc-400">
                      <li>• "Pensar rápido, pensar despacio" por Daniel Kahneman</li>
                      <li>• "Antifrágil" por Nassim Nicholas Taleb</li>
                      <li>• "Mindset: La actitud del éxito" por Carol Dweck</li>
                      <li>• "Trabajo Profundo" por Cal Newport</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="community" className="mt-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6 space-y-6">
                    <h3 className="text-xl font-bold">Participación en la comunidad</h3>
                    <p className="text-zinc-400">
                    Creo firmemente en retribuir a la comunidad tecnológica y
                    apoyar a la siguiente generación de desarrolladores. Así es
                    como me involucro:
                    </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 bg-zinc-800 rounded-lg">
                        <h4 className="font-bold">Programa de Mentorías</h4>
                        <p className="mt-2 text-zinc-400">
                        Regularmente mentoreo a desarrolladores junior a través de programas 
                        estructurados y relaciones informales, ayudándoles a navegar sus 
                        trayectorias profesionales y desafíos técnicos en el mundo del desarrollo.
                        </p>
                    </div>

                    <div className="p-4 bg-zinc-800 rounded-lg">
                        <h4 className="font-bold">Contribuciones Open Source</h4>
                        <p className="mt-2 text-zinc-400">
                        Contribuyo activamente a proyectos de código abierto en el 
                        ámbito de la tecnología financiera, ayudando a construir 
                        herramientas que benefician a la comunidad de desarrolladores
                        y democratizan el acceso a soluciones financieras.
                        </p>
                    </div>

                    <div className="p-4 bg-zinc-800 rounded-lg">
                      <h4 className="font-bold">Charlas Técnicas & Talleres</h4>
                      <p className="mt-2 text-zinc-400">
                      Participo como ponente en meetups y conferencias locales 
                      sobre arquitectura de software financiero, liderazgo y 
                      desarrollo profesional en el ámbito tecnológico.
                      </p>
                    </div>

                    <div className="p-4 bg-zinc-800 rounded-lg">
                      <h4 className="font-bold">Educación Tecnológica</h4>
                      <p className="mt-2 text-zinc-400">
                      Colaboro con programas que introducen conceptos de 
                      programación y tecnología a grupos subrepresentados 
                      en el sector tech, contribuyendo a construir una 
                      industria más diversa e inclusiva.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Llamado a la Acción */}
        <section className="py-12">
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                ¿Trabajamos juntos?
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto text-lg">
                Si necesitas liderazgo técnico, experiencia en arquitectura de
                software o apoyo en el desarrollo de sistemas financieros o
                empresariales, estoy aquí para ayudarte a convertir tu visión en
                realidad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-white/90"
                >
                  Contáctame
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Mis proyectos
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
