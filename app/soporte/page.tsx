import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Book, LifeBuoy, Mail } from 'lucide-react'
import Link from "next/link"
import {Metadata} from "next";
import {SharedMetadata} from "@/app/shared-metadata";

export const metadata: Metadata = {
  ...SharedMetadata,
  title: 'Soporte - José Carrillo',
  description: 'Comunícate conmigo, estoy aquí para ayudarte. Elige una de las opciones a continuación.',
  keywords: ['soporte', 'contacto', 'chat', 'documentación', 'faq', 'josé carrillo'],
  alternates: {
    ...SharedMetadata.alternates,
    canonical: "/soporte",
    languages: {
      'es-CO': '/soporte',
      'en-US': '/en/support',
    },
  },
  openGraph: {
    ...SharedMetadata.openGraph,
    type: 'website',
    url: '/soporte',
    title: 'Soporte de banking, fintech y ecommerce',
    description: 'José Carrillo te brinda soporte en tiempo real, documentación, preguntas frecuentes y soporte por correo electrónico.',
  },
  twitter: {
    ...SharedMetadata.twitter,
    title: 'Soporte de banking, fintech y ecommerce',
    description: 'José Carrillo te brinda soporte en tiempo real, documentación, preguntas frecuentes y soporte por correo electrónico.',
  }
}

export default function SupportPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Soporte</h1>
        <p className="text-xl text-muted-foreground mb-8">
          ¿Necesitar ayuda? Estamos aquí para ti. Elija entre las opciones siguientes.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat en línea
              </CardTitle>
              <CardDescription>Chatea por WhatsApp</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Comenzar</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                Documentación
              </CardTitle>
              <CardDescription>Explora la documentación de los principales proyectos</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/docs">Explorar</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LifeBuoy className="h-5 w-5" />
                Preguntas frecuentes (FAQ)
              </CardTitle>
              <CardDescription>Encuentra las respuesta a tus preguntas</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/faq">Explorar</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Correo electrónico
              </CardTitle>
              <CardDescription>Recibe soporte vía correo electrónico</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/contact">Explorar</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

