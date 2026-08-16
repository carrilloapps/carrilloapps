import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"

/**
 * The receipt.
 *
 * Its copy described a flow that no longer exists: "te contactaré para proponer
 * una fecha" was true when this page followed a form that emailed availability
 * in prose. Cal.com confirms the slot itself, so the page now states what
 * actually happened — the appointment is booked — and what happens next, which
 * is preparation rather than negotiation.
 */
const NEXT = [
  {
    n: "01",
    heading: "Confirmación en tu correo",
    body: "Con el enlace de la videollamada y el archivo para tu calendario. Si no aparece en unos minutos, revisa el correo no deseado.",
  },
  {
    n: "02",
    heading: "Mándame contexto",
    body: "Responde a ese correo con lo que tengas: un repositorio, un diagrama, el hilo de un incidente. Lo reviso antes de la sesión.",
  },
  {
    n: "03",
    heading: "Hablamos una hora",
    body: "Sin presentación comercial. El tiempo se va en tu problema, no en mi trayectoria.",
  },
  {
    n: "04",
    heading: "Resumen escrito",
    body: "Dentro de las 48 horas siguientes: riesgos priorizados y siguientes pasos. Tuyo, haya continuidad o no.",
  },
]

export default function ThankYouPage() {
  return (
    <div className="relative min-h-screen text-paper">
      <DynamicBackground />
      <SiteHeader />

      <main id="main-content" role="main" className="relative z-10">
        <section className="relative w-full pt-6 md:pt-10" aria-labelledby="thanks-heading">
          <div className="container mx-auto px-4">
            <p className="font-mono text-[11px] tracking-[0.16em] text-settled uppercase">
              Reserva confirmada
            </p>

            <h1
              id="thanks-heading"
              className="mt-3 max-w-[16ch] font-sans text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.94] font-semibold tracking-[-0.04em] text-balance text-paper"
            >
              Listo, queda agendado
            </h1>

            <p className="mt-6 max-w-[60ch] font-sans text-base leading-relaxed text-paper-dim md:text-lg">
              Gracias por reservar. El espacio ya está bloqueado en mi calendario y la confirmación
              va camino a tu correo con el enlace de la llamada.
            </p>
          </div>
        </section>

        <section className="relative pt-10 md:pt-16" aria-labelledby="thanks-next">
          <div className="container mx-auto px-4">
            <h2
              id="thanks-next"
              className="border-b-2 border-rule-strong pb-2 font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase"
            >
              Qué sigue
            </h2>

            <ol className="grid md:grid-cols-2 lg:grid-cols-4">
              {NEXT.map(({ n, heading, body }, i) => (
                <li
                  key={n}
                  className={`border-b border-rule py-6 md:px-6 ${
                    i > 0 ? "md:border-l md:border-l-rule" : "md:pl-0"
                  } ${i === NEXT.length - 1 ? "md:pr-0" : ""}`}
                >
                  <p className="font-mono text-[11px] text-stamp-text tabular-nums">{n}</p>
                  <p className="mt-3 font-sans text-lg leading-tight tracking-[-0.02em] text-paper">
                    {heading}
                  </p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-paper-dim">{body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t-2 border-rule-strong pt-5">
              <Link href="/recursos" className="cta">
                Ver lo que publico
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/contacto" className="cta-quiet">
                Escribirme antes de la sesión
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
