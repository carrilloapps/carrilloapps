import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { SERVICES } from "@/lib/data/services"

/**
 * 404, as a returned entry rather than an apology.
 *
 * The old page was a centred amber pill, a gradient button and a dead end: two
 * links, both of which sent the reader to the top of the site to start over.
 * A missing page is a routing fact, so it is stated like one — stamped, with
 * the register of everywhere they could have meant instead, so the next click
 * is a destination and not a retreat.
 */
const DESTINATIONS = [
  { label: "Inicio", href: "/", note: "Quién soy y en qué trabajo ahora." },
  { label: "Servicios", href: "/servicios", note: "Los siete frentes en los que entro." },
  { label: "Sobre mí", href: "/sobre-mi", note: "La trayectoria, con fechas y contexto." },
  { label: "Recursos", href: "/recursos", note: "Herramientas publicadas y repositorios." },
  { label: "Contacto", href: "/contacto", note: "Escríbeme y te respondo en 24 h hábiles." },
  { label: "Agendamiento", href: "/agendamiento", note: "Calendario en vivo, una hora." },
]

// A 404 is still a page in the tab strip and in a shared link. `robots` keeps
// it out of the index — a soft 404 that ranks is worse than no page at all.
export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La ruta que buscas no existe en carrillo.app. Aquí está todo lo que sí hay.",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="relative min-h-screen text-paper">
      <DynamicBackground />
      <SiteHeader />

      <main id="main-content" role="main" className="relative z-10">
        <section
          className="relative w-full pt-6 pb-10 md:pt-10 md:pb-14"
          aria-labelledby="notfound-heading"
        >
          <div className="container mx-auto px-4">
            <p className="font-mono text-[11px] tracking-[0.16em] text-stamp-text uppercase">
              Error 404 · Sin registro
            </p>

            <h1
              id="notfound-heading"
              className="mt-3 max-w-[16ch] font-sans text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.94] font-semibold tracking-[-0.04em] text-balance text-paper"
            >
              Esta página no existe
            </h1>

            <p className="mt-6 max-w-[60ch] font-sans text-base leading-relaxed text-paper-dim md:text-lg">
              O nunca existió, o se movió y el enlace que seguiste quedó apuntando al hueco. Abajo
              está todo lo que sí hay; si llegaste desde un enlace mío que ya no funciona, avísame y
              lo arreglo.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t-2 border-rule-strong pt-5">
              <Link href="/" className="cta">
                Volver al inicio
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/contacto" className="cta-quiet">
                Reportar el enlace roto
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="relative pb-20 md:pb-28" aria-labelledby="notfound-index">
          <div className="container mx-auto px-4">
            <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-start">
              <nav aria-labelledby="notfound-index">
                <p
                  id="notfound-index"
                  className="border-b-2 border-rule-strong pb-2 font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase"
                >
                  Dónde sí hay algo
                </p>
                <ul>
                  {DESTINATIONS.map(({ label, href, note }) => (
                    <li key={href} className="border-b border-rule">
                      <Link
                        href={href}
                        className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 py-4"
                      >
                        <span className="min-w-0">
                          <span className="font-sans text-lg leading-tight text-paper transition-colors group-hover:text-stamp-text">
                            {label}
                          </span>
                          <span className="mt-1 block font-sans text-sm leading-relaxed text-paper-faint">
                            {note}
                          </span>
                        </span>
                        <ArrowRight
                          className="h-4 w-4 shrink-0 text-paper-faint transition-colors group-hover:text-stamp-text"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <aside>
                <p className="border-b-2 border-rule-strong pb-2 font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
                  Servicios
                </p>
                <ul>
                  {SERVICES.map((service) => (
                    <li key={service.slug} className="border-b border-rule">
                      <Link
                        href={`/servicios/${service.slug}`}
                        className="flex min-h-[44px] items-center font-sans text-[15px] text-paper-dim transition-colors hover:text-paper"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
