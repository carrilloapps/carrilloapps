"use client"

import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/section-header"
import { CalInline } from "@/components/cal-booking"
import { trackCTAClick } from "@/lib/analytics"

/**
 * Scheduling, on the real calendar.
 *
 * This page used to be a 300-line contact form that composed a WhatsApp
 * message: the visitor typed their availability into a text field and waited
 * for a human to reconcile it against a calendar. Cal.com holds the actual
 * availability, so the booking happens here, against real slots.
 *
 * What it was missing was everything around the widget. A calendar with four
 * facts beside it asks for an hour of a stranger's time without saying what
 * happens in it, what they should bring, what they leave with, or what it
 * costs — so the page now answers those before the embed, and the embed itself
 * no longer repeats the appointment slip in its own typography.
 */

const PARTICULARS = [
  { term: "Duración", value: "60 minutos" },
  { term: "Formato", value: "Videollamada" },
  { term: "Zona horaria", value: "America/Bogotá" },
  { term: "Idioma", value: "Español o inglés" },
]

const AGENDA = [
  {
    heading: "El problema, en concreto",
    body: "Qué estás construyendo, dónde se atasca y qué has intentado. Los primeros diez minutos son tuyos, sin interrupciones.",
  },
  {
    heading: "La arquitectura que ya tienes",
    body: "Pagos, conciliación, integraciones, despliegue o el punto que duela. Reviso lo que exista: diagramas, un repositorio, una captura de un dashboard.",
  },
  {
    heading: "Riesgos, priorizados",
    body: "Qué se rompe primero y qué cuesta arreglarlo. Distingo lo que es difícil por el dominio de lo que es difícil por desorden.",
  },
  {
    heading: "Siguientes pasos accionables",
    body: "Qué harías el lunes, con o sin mí. Si lo que necesitas no es mi trabajo, te lo digo en la llamada.",
  },
]

const STEPS = [
  {
    n: "01",
    heading: "Reservas",
    body: "Eliges un espacio en el calendario. La confirmación y el enlace de la videollamada llegan al instante, sin ida y vuelta por correo.",
  },
  {
    n: "02",
    heading: "Preparo el contexto",
    body: "Reviso lo que compartas antes de la sesión — repositorio, diagrama, documento — para no gastar la hora en ponerme al día.",
  },
  {
    n: "03",
    heading: "Hablamos una hora",
    body: "Sin presentación comercial. Si en veinte minutos queda claro que no soy la persona indicada, lo digo y te devuelvo el resto del tiempo.",
  },
  {
    n: "04",
    heading: "Recibes el resumen",
    body: "Dentro de las 48 horas siguientes te envío por escrito los riesgos priorizados y los siguientes pasos. Es tuyo, haya continuidad o no.",
  },
]

const FIT = {
  yes: [
    "Estás integrando pagos, conciliación o un core financiero y quieres una segunda lectura antes de comprometer el trimestre.",
    "Tienes una plataforma en producción que creció más rápido que su arquitectura.",
    "Lideras un equipo técnico y necesitas contrastar una decisión con alguien que ya la tomó.",
    "Vas a incorporar agentes de IA a un flujo donde se mueve dinero y quieres saber qué auditar.",
  ],
  no: [
    "Buscas cotización de un desarrollo cerrado sin haber definido el alcance: para eso escribe primero.",
    "Necesitas soporte inmediato de un incidente en curso. Una asesoría agendada no es una guardia.",
    "Quieres una revisión de código línea por línea. Eso es un encargo, no una hora.",
  ],
}

const TAKEAWAY = [
  { term: "Durante", value: "Diagnóstico en vivo" },
  { term: "Después", value: "Resumen escrito" },
  { term: "Plazo", value: "48 horas" },
  { term: "Compromiso", value: "Ninguno" },
]

export default function AgendamientoPage() {
  return (
    <div className="relative min-h-screen text-paper">
      <DynamicBackground />
      <SiteHeader />

      <main id="main-content" role="main" className="relative z-10">
        <OpeningEntry />
        <Booking />
        <HowItWorks />
        <Fit />
        <ClosingEntry />
      </main>

      <SiteFooter />
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function OpeningEntry() {
  return (
    <AnimatedSection
      className="relative w-full pt-6 md:pt-10"
      role="region"
      aria-labelledby="booking-heading"
    >
      <div className="container mx-auto px-4">
        <p className="font-mono text-[11px] tracking-[0.16em] text-paper-faint uppercase">
          Agendamiento
        </p>

        <h1
          id="booking-heading"
          className="mt-3 max-w-[16ch] font-sans text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.94] font-semibold tracking-[-0.04em] text-balance text-paper"
        >
          Una hora, y sales con un plan
        </h1>

        <div className="mt-8 grid gap-x-14 gap-y-8 md:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
          <div className="max-w-[68ch] space-y-5 font-sans text-base leading-relaxed text-paper-dim md:text-lg">
            <p>
              Casi todo lo que hago empieza igual: una llamada en la que alguien describe una
              plataforma que funciona pero ya no aguanta lo que le viene encima. Sistemas de pago
              que concilian a mano, arquitecturas que crecieron por acumulación, equipos que
              entregan pero no saben cuánto pueden comprometer.
            </p>
            <p>
              La sesión es de diagnóstico, no de venta. Al final tienes los riesgos priorizados y
              qué hacer con ellos, por escrito, tanto si seguimos trabajando juntos como si no.
            </p>
          </div>

          <dl className="self-start border-y border-rule">
            {PARTICULARS.map(({ term, value }) => (
              <div
                key={term}
                className="flex items-baseline justify-between gap-4 border-b border-rule py-3 last:border-b-0"
              >
                <dt className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
                  {term}
                </dt>
                <dd className="text-right font-sans text-base text-paper">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </AnimatedSection>
  )
}

/**
 * The calendar and what happens in the hour, side by side.
 *
 * The agenda sits to the right of the widget rather than under it: choosing a
 * slot and knowing what the slot is for are the same decision, and a reader who
 * has to scroll past the calendar to find out what it books has already been
 * asked to commit before being told to what.
 */
function Booking() {
  return (
    <AnimatedSection className="relative pt-10 md:pt-16" aria-labelledby="booking-calendar">
      <div className="container mx-auto px-4">
        {/* 53rem is not arbitrary: below ~830px Cal drops its two-pane layout
            and stacks the time slots under the month, which doubles the height of
            the embed. Pinning the column just above that threshold keeps the
            compact layout and hands the leftover width to the agenda, which was
            being squeezed for space the embed never used. */}
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,53rem)_minmax(0,1fr)] lg:items-start">
          <div>
            <h2
              id="booking-calendar"
              className="border-b-2 border-rule-strong pb-2 font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase"
            >
              Disponibilidad en vivo
            </h2>
            <CalInline className="mt-5 w-full" />
          </div>

          <aside>
            <h2 className="border-b-2 border-rule-strong pb-2 font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
              ¿Qué cubrimos?
            </h2>
            <ul className="divide-y divide-rule">
              {AGENDA.map(({ heading, body }) => (
                <li key={heading} className="py-4">
                  <p className="font-sans text-[15px] leading-tight text-paper">{heading}</p>
                  <p className="mt-1.5 font-sans text-sm leading-relaxed text-paper-faint">
                    {body}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="mt-6 border-t-2 border-rule-strong">
              {TAKEAWAY.map(({ term, value }) => (
                <div
                  key={term}
                  className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5"
                >
                  <dt className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
                    {term}
                  </dt>
                  <dd className="text-right font-sans text-sm text-paper">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </AnimatedSection>
  )
}

function HowItWorks() {
  return (
    <AnimatedSection className="relative pt-10 md:pt-16" aria-labelledby="booking-steps">
      <div className="container mx-auto px-4">
        <SectionHeader
          columnLabel="Cómo funciona"
          title="Cuatro pasos, ninguno con sorpresas"
          description="Desde que eliges el espacio hasta que tienes el resumen en tu bandeja."
          headingId="booking-steps"
        />

        <ol className="grid border-t-2 border-rule-strong md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ n, heading, body }, i) => (
            <li
              key={n}
              className={`border-b border-rule py-6 md:px-6 md:first:pl-0 ${
                i > 0 ? "md:border-l md:border-l-rule" : ""
              } ${i === 0 ? "md:pl-0" : ""} ${i === STEPS.length - 1 ? "md:pr-0" : ""}`}
            >
              <p className="font-mono text-[11px] text-stamp-text tabular-nums">{n}</p>
              <p className="mt-3 font-sans text-lg leading-tight tracking-[-0.02em] text-paper">
                {heading}
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-paper-dim">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </AnimatedSection>
  )
}

/**
 * Who it is for, and who it is not.
 *
 * Saying no out loud is the cheapest filter there is: it saves the wrong
 * visitor an hour and buys credibility with the right one.
 */
function Fit() {
  return (
    <AnimatedSection className="relative pt-10 md:pt-16" aria-labelledby="booking-fit">
      <div className="container mx-auto px-4">
        <SectionHeader
          columnLabel="Encaje"
          title="Reserva si esto te suena"
          description="Y ahórrate la hora si lo que necesitas está en la segunda columna."
          headingId="booking-fit"
        />

        <div className="grid gap-x-12 gap-y-10 border-t-2 border-rule-strong pt-6 md:grid-cols-2">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-settled uppercase">Encaja</p>
            <ul className="mt-2">
              {FIT.yes.map((item) => (
                <li
                  key={item}
                  className="border-b border-rule py-3.5 font-sans text-[15px] leading-relaxed text-paper-dim"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-stamp-text uppercase">
              No encaja
            </p>
            <ul className="mt-2">
              {FIT.no.map((item) => (
                <li
                  key={item}
                  className="border-b border-rule py-3.5 font-sans text-[15px] leading-relaxed text-paper-faint"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

function ClosingEntry() {
  return (
    <AnimatedSection
      className="relative pt-10 pb-16 md:pt-16 md:pb-20"
      aria-labelledby="booking-closing"
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          columnLabel="Antes de reservar"
          title="¿Prefieres escribir primero?"
          description="Cuéntame el contexto por mensaje y te respondo en menos de 24 horas hábiles. Si de ahí sale una llamada, la agendamos con el problema ya sobre la mesa."
          headingId="booking-closing"
        />

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t-2 border-rule-strong pt-5">
          <Link
            href="/contacto"
            onClick={() => trackCTAClick("Contacto", "secondary", "agendamiento-closing")}
            className="cta"
          >
            Escribirme
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Link href="/servicios" className="cta-quiet">
            Ver servicios
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  )
}
