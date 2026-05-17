import type React from "react"
import { buildPageMetadata } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "Solicitud Recibida — Consulta Agendada",
  description: "Tu consulta ha sido agendada con éxito. Recibirás un email de confirmación en breve con los próximos pasos para nuestra sesión.",
  path: "/agendamiento/gracias",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
})

export default function GraciasLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
