import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="container py-12 space-y-12">
        <section className="py-12 md:py-24 space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contáctame</h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              ¿Tienes un proyecto en mente o necesitas un desarrollador especializado? Estoy aquí para convertir tus ideas en realidad.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Envíame un mensaje</CardTitle>
                <CardDescription>Completa el formulario a continuación y te responderé lo antes posible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium">
                      Nombre
                      </label>
                      <Input
                      id="first-name"
                      placeholder="Carlos"
                      className="bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium">
                      Apellido
                      </label>
                      <Input
                      id="last-name"
                      placeholder="Rodríguez"
                      className="bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500"
                      />
                    </div>
                    </div>
                    <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Correo electrónico
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="carlos@ejemplo.com"
                      className="bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500"
                    />
                    </div>
                    <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Asunto
                    </label>
                    <Input
                      id="subject"
                      placeholder="Consulta sobre proyecto"
                      className="bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500"
                    />
                    </div>
                    <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Cuéntame sobre tu proyecto o idea..."
                      rows={5}
                      className="bg-zinc-950 border-zinc-800 focus-visible:ring-blue-500"
                    />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Enviar mensaje
                    </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                  <CardDescription>Estoy disponible para ti a través de cualquiera de estos canales.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">Correo electrónico</p>
                    <p className="text-zinc-400">m@carrilloa.app</p>
                    <p className="text-zinc-500 text-sm">Respuesta garantizada en menos de 24 horas</p>
                  </div>
                  </div>
                  <Separator className="my-4 bg-zinc-800" />
                  <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">Teléfono</p>
                    <p className="text-zinc-400">+57 (300) 332 8389</p>
                    <p className="text-zinc-500 text-sm">Disponible Lun-Vie, 9:00-18:00 Colombia</p>
                  </div>
                  </div>
                  <Separator className="my-4 bg-zinc-800" />
                  <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">Ubicación</p>
                    <p className="text-zinc-400">Medellín, Colombia</p>
                    <p className="text-zinc-500 text-sm">Disponible para trabajo remoto internacional</p>
                  </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Mis Redes Sociales</CardTitle>
                  <CardDescription>Conéctate conmigo o explora mi trabajo en línea.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <a
                      href="https://github.com/carrilloapps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                    >
                      <Mail className="h-8 w-8 mb-2" />
                      <span className="text-sm">GitHub</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/carrilloapps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                    >
                      <Phone className="h-8 w-8 mb-2" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                    <a
                      href="https://twitter.com/carrilloapps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                    >
                      <MapPin className="h-8 w-8 mb-2" />
                      <span className="text-sm">Twitter</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 space-y-8">
            <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold">Preguntas frecuentes</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Aquí encontrarás respuestas a las dudas más comunes. Si tienes alguna pregunta adicional, no dudes en contactarme directamente.
            </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">¿Qué servicios ofreces?</h3>
              <p className="text-zinc-400">
                Me especializo en desarrollo de software financiero, liderazgo técnico, diseño de arquitectura y 
                soluciones de automatización de backoffice. Puedo ayudarte tanto con el desarrollo como con la 
                orientación técnica estratégica.
              </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">¿Trabajas con clientes internacionales?</h3>
              <p className="text-zinc-400">
                Sí, trabajo con clientes de todo el mundo. Gracias a las herramientas modernas de colaboración 
                y una programación flexible, puedo adaptarme a diferentes zonas horarias y modalidades de trabajo.
              </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">¿Cuál es tu cronograma típico de proyecto?</h3>
              <p className="text-zinc-400">
                Los tiempos varían según el alcance y la complejidad. Proyectos pequeños pueden tomar de 2 a 4 semanas, 
                mientras que soluciones empresariales más grandes pueden extenderse varios meses. Proporciono 
                cronogramas detallados durante las consultas iniciales.
              </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">¿Cómo manejas la gestión de proyectos?</h3>
              <p className="text-zinc-400">
                Utilizo metodologías ágiles con seguimientos regulares y actualizaciones de progreso. Me adapto a 
                herramientas como Jira, Trello o Asana según tus preferencias, garantizando una comunicación 
                transparente durante todo el proceso.
              </p>
              </CardContent>
            </Card>
            </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
