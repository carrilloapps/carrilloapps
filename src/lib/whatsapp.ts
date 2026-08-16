import { publicEnv } from "@/lib/env"

/**
 * Central WhatsApp helper. Every lead form on the site funnels into a single
 * WhatsApp conversation using a pre-filled message *template*. The destination
 * number is configured via `NEXT_PUBLIC_WHATSAPP_PHONE` (see `lib/env.ts`);
 * any non-digit characters in the env value are stripped so it accepts both
 * `+57 300 332 8389` and `573003328389`.
 */
export const WHATSAPP_PHONE = (publicEnv.WHATSAPP_PHONE || "").replace(/\D/g, "")

/** Renders a `*Label:* value` line, or an empty string when the value is blank. */
function field(label: string, value?: string): string {
  const trimmed = value?.trim()
  return trimmed ? `*${label}:* ${trimmed}\n` : ""
}

/** Builds a `wa.me` deep link with a URL-encoded, pre-filled message. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
}

export interface ContactWhatsAppFields {
  name: string
  email: string
  whatsapp?: string
  company?: string
  subject?: string
  message: string
}

/** Template for the contact forms (full contact page + home compact form). */
export function buildContactWhatsAppMessage(f: ContactWhatsAppFields): string {
  return (
    "*Nuevo contacto desde carrillo.app*\n\n" +
    field("Nombre", f.name) +
    field("Email", f.email) +
    field("WhatsApp", f.whatsapp) +
    field("Empresa", f.company) +
    field("Asunto", f.subject) +
    `\n*Mensaje:*\n${f.message.trim()}`
  )
}

export interface ScheduleWhatsAppFields {
  name: string
  email: string
  phone?: string
  projectType?: string
  preferredTime?: string
  message?: string
}

/** Template for the scheduling form (/agendamiento). */
export function buildScheduleWhatsAppMessage(f: ScheduleWhatsAppFields): string {
  const message = f.message?.trim()
  return (
    "*Solicitud de agendamiento — carrillo.app*\n\n" +
    field("Nombre", f.name) +
    field("Email", f.email) +
    field("Teléfono", f.phone) +
    field("Tipo de proyecto", f.projectType) +
    field("Horario preferido", f.preferredTime) +
    (message ? `\n*Mensaje:*\n${message}` : "")
  )
}
