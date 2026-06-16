import { describe, it, expect } from "vitest"
import {
  buildContactWhatsAppMessage,
  buildScheduleWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp"

describe("buildWhatsAppUrl", () => {
  it("builds a wa.me deep link with a URL-encoded message", () => {
    const url = buildWhatsAppUrl("hola mundo & más")
    expect(url.startsWith("https://wa.me/")).toBe(true)
    expect(url).toContain("?text=")
    expect(url).toContain(encodeURIComponent("hola mundo & más"))
  })
})

describe("buildContactWhatsAppMessage", () => {
  it("includes only the fields that have a value", () => {
    const msg = buildContactWhatsAppMessage({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Quiero trabajar contigo",
    })
    expect(msg).toContain("*Nombre:* Ada Lovelace")
    expect(msg).toContain("*Email:* ada@example.com")
    expect(msg).toContain("*Mensaje:*")
    expect(msg).toContain("Quiero trabajar contigo")
    // Optional fields left blank must not render an empty line.
    expect(msg).not.toContain("*WhatsApp:*")
    expect(msg).not.toContain("*Empresa:*")
    expect(msg).not.toContain("*Asunto:*")
  })

  it("renders optional fields when provided and trims them", () => {
    const msg = buildContactWhatsAppMessage({
      name: "Ada",
      email: "ada@example.com",
      whatsapp: "  +57 300 000 0000  ",
      company: "Analytical Engines",
      subject: "Consultoría",
      message: "  Hola  ",
    })
    expect(msg).toContain("*WhatsApp:* +57 300 000 0000")
    expect(msg).toContain("*Empresa:* Analytical Engines")
    expect(msg).toContain("*Asunto:* Consultoría")
    expect(msg.endsWith("Hola")).toBe(true)
  })
})

describe("buildScheduleWhatsAppMessage", () => {
  it("omits the message block when no message is given", () => {
    const msg = buildScheduleWhatsAppMessage({
      name: "Grace",
      email: "grace@example.com",
      projectType: "Web",
    })
    expect(msg).toContain("*Solicitud de agendamiento — carrillo.app*")
    expect(msg).toContain("*Tipo de proyecto:* Web")
    expect(msg).not.toContain("*Mensaje:*")
  })
})
