import { renderPageOg, ogSize, ogContentType } from "@/lib/og"

export const alt = "Agendar una asesoría — Junior Carrillo"
export const size = ogSize
export const contentType = ogContentType

export default async function OpenGraphImage() {
  return renderPageOg({
    eyebrow: "Agendamiento",
    title: "Agendar una asesoría",
    subtitle:
      "60 minutos sobre tu arquitectura de pagos: el problema concreto, los riesgos que veo priorizados, y siguientes pasos accionables.",
    particulars: [
      { term: "Duración", value: "60 minutos" },
      { term: "Formato", value: "Videollamada" },
      { term: "Zona", value: "America/Bogotá" },
      { term: "Agenda", value: "Cal.com" },
    ],
  })
}
