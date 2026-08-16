"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { AnimatedSection } from "@/components/animated-section"
import { CalInline } from "@/components/cal-booking"
import { trackCTAClick } from "@/lib/analytics"

/**
 * Scheduling, on the real calendar.
 *
 * This page used to be a 300-line contact form that composed a WhatsApp
 * message: the visitor typed their availability into a text field and waited
 * for a human to reconcile it against a calendar. Cal.com holds the actual
 * availability, so the booking happens here, against real slots, and the
 * confirmation is automatic.
 *
 * The particulars of the appointment are stated beside the calendar the way an
 * appointment slip states them — duration, format, price, timezone — so nobody
 * has to open the widget to find out what they are booking.
 */
const PARTICULARS = [
  { term: "Duración", value: "60 minutos" },
  { term: "Formato", value: "Videollamada" },
  { term: "Zona horaria", value: "America/Bogotá" },
  { term: "Idioma", value: "Español o inglés" },
]

const AGENDA = [
  "El problema concreto que estás resolviendo y dónde se está atascando.",
  "Revisión de tu arquitectura actual: pagos, conciliación, integraciones o el punto que duela.",
  "Riesgos que veo, con prioridad y esfuerzo estimado.",
  "Siguientes pasos accionables, tengas o no continuidad conmigo.",
]

export default function AgendamientoPage() {
  return (
    <div className="relative min-h-screen text-paper">
      <DynamicBackground />
      <SiteHeader />

      <main id="main-content" role="main" className="relative z-10">
        <AnimatedSection className="relative pt-10 pb-4 md:pt-14" aria-labelledby="booking-heading">
          <div className="container mx-auto px-4">
            <h1
              id="booking-heading"
              className="max-w-[16ch] font-sans text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] font-semibold tracking-[-0.04em] text-paper"
            >
              Agendar una asesoría
            </h1>

            <dl className="mt-8 grid grid-cols-2 border-y border-rule md:grid-cols-4">
              {PARTICULARS.map(({ term, value }, i) => (
                <div
                  key={term}
                  className={`py-4 md:px-5 md:py-5 ${i > 0 ? "md:border-l md:border-rule" : ""} ${
                    i % 2 === 1 ? "border-l border-rule pl-5 md:pl-5" : ""
                  } ${i < 2 ? "border-b border-rule md:border-b-0" : ""}`}
                >
                  <dt className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
                    {term}
                  </dt>
                  <dd className="mt-1.5 font-sans text-base text-paper">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </AnimatedSection>

        <AnimatedSection className="relative pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start">
              {/* The calendar itself, themed as part of the page. */}
              <CalInline className="min-h-[640px] w-full" />

              <aside className="lg:border-l lg:border-l-rule lg:pl-10">
                <h2 className="border-b border-rule-strong pb-2 font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase">
                  ¿Qué cubrimos?
                </h2>
                <ul className="divide-y divide-rule">
                  {AGENDA.map((item) => (
                    <li
                      key={item}
                      className="py-4 font-sans text-sm leading-relaxed text-paper-dim"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-rule-strong pt-5">
                  <p className="font-sans text-sm leading-relaxed text-paper-dim">
                    ¿Prefieres escribir antes de reservar? Cuéntame el contexto y te respondo en
                    menos de 24 horas hábiles.
                  </p>
                  <Link
                    href="/contacto"
                    onClick={() => trackCTAClick("Contacto", "secondary", "agendamiento-aside")}
                    className="cta-quiet mt-4 w-full justify-center"
                  >
                    Escribirme
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <SiteFooter />
    </div>
  )
}
