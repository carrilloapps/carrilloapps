import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CalendarDays } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/section-header"
import { Section } from "@/components/ui/section"
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld"
import { CalPopupButton } from "@/components/cal-booking"
import { CvDownloadButton } from "@/components/cv-download-button"
import { METHOD, SERVICES, SERVICES_FAQ } from "@/lib/data/services"
import { buildPageMetadata } from "@/lib/seo"
import { getSiteUrl } from "@/lib/env"

const SITE_URL = getSiteUrl()

/**
 * A server component, unlike every other page here, and deliberately so.
 *
 * This route now has children, and metadata in `servicios/layout.tsx` would
 * apply to all of them: the seven detail pages inherited the index's `Service`
 * JSON-LD on top of their own, and its plain-string title shadowed the root
 * layout's `%s | Junior Carrillo` template so every service page shipped a
 * bare title. An index with children owns its own metadata; nothing on this
 * page needs a hook to render.
 */
export const metadata: Metadata = buildPageMetadata({
  title: "Arquitectura de pagos y liderazgo",
  description:
    "Consultoría y auditoría de arquitectura de pagos: microservicios, conciliación, observabilidad y cumplimiento desde el diseño.",
  path: "/servicios",
  keywords: [
    "consultoría arquitectura de pagos",
    "auditoría sistemas financieros",
    "tech lead fintech",
    "conciliación alto volumen",
    "microservicios pagos",
    "compliance PCI DSS",
    "consultor fintech latam",
    "Junior Carrillo",
  ],
})

/**
 * The catalogue as an `ItemList` of real URLs.
 *
 * The old graph was one `Service` node carrying an `OfferCatalog` of seven
 * offers, all of them on this single address — nothing a search engine could
 * surface individually. Each service now has its own `Service` node on its own
 * page; this list just points at them, in order.
 */
const catalogueJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/servicios#catalogue`,
  name: "Servicios — Junior Carrillo",
  description: "Consultoría, auditoría y liderazgo técnico para plataformas financieras en LATAM.",
  url: `${SITE_URL}/servicios`,
  inLanguage: "es-CO",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: SERVICES.length,
    itemListElement: SERVICES.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: service.title,
      description: service.summary,
      url: `${SITE_URL}/servicios/${service.slug}`,
    })),
  },
  provider: {
    "@type": "Person",
    name: "Junior Carrillo",
    url: SITE_URL,
    jobTitle: "Tech Leader & Senior Software Developer",
  },
  isPartOf: { "@type": "WebSite", name: "carrillo.app", url: SITE_URL },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/servicios#faq`,
  inLanguage: "es-CO",
  mainEntity: SERVICES_FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
}

/**
 * The service catalogue as a schedule of accounts.
 *
 * The old page put all seven services behind a tab strip: one visible at a
 * time, six hidden, nothing linkable, and the whole thing on a single URL that
 * could rank for exactly one query. Each service is a route now, and this page
 * is the schedule that lists them — which is also the shape a statement uses
 * when it enumerates what it covers.
 */
export default function ServicesPage() {
  return (
    <div className="relative min-h-screen text-paper">
      <DynamicBackground />
      <SiteHeader />

      <main id="main-content" role="main" className="relative z-10">
        <OpeningEntry />
        <Catalogue />
        <Method />
        <Questions />
        <ClosingEntry />
      </main>

      <SiteFooter />

      <JsonLd data={catalogueJsonLd} />
      <JsonLd data={faqJsonLd} />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Servicios", url: `${SITE_URL}/servicios` },
        ]}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function OpeningEntry() {
  return (
    <AnimatedSection
      className="relative w-full pt-6 pb-10 md:pt-10 md:pb-14"
      role="region"
      aria-labelledby="services-heading"
    >
      <div className="container mx-auto px-4">
        <h1
          id="services-heading"
          className="max-w-[18ch] font-sans text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.94] font-semibold tracking-[-0.04em] text-balance text-paper"
        >
          Arquitectura de pagos que aguanta
        </h1>

        <div className="mt-8 grid gap-x-14 gap-y-8 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          <div className="max-w-[68ch] space-y-5 font-sans text-base leading-relaxed text-paper-dim md:text-lg">
            <p>
              Trabajo con equipos que operan dinero: pasarelas de pago, conciliación de alto
              volumen, core bancario y el backoffice que los sostiene. Son sistemas donde un fallo
              no es un bug cosmético — es plata que no llega, una factura duplicada o una auditoría
              que no cuadra tres meses después.
            </p>
            <p>
              Entro de tres maneras, según lo que haga falta: como consultor que diseña la
              arquitectura, como auditor que revisa la que ya existe, o como liderazgo técnico
              acompañando al equipo que la va a mantener. Casi siempre empieza por un diagnóstico de
              una hora, porque hasta no ver el repositorio y la conciliación de ayer cualquier
              recomendación sería una hipótesis.
            </p>
            <p>
              El método no cambia entre frentes. Se especifica antes de construir —Spec-Driven
              Development, con cada decisión estructural registrada como ADR fechado— y se prueba
              primero donde el error cuesta dinero: cálculo de comisiones, idempotencia de
              reintentos, conciliación. En el resto, pruebas de contrato e integración, que son las
              que atrapan regresiones reales. Después se despliega de forma progresiva y reversible,
              y se mide en producción con indicadores sobre el dinero, no sobre la CPU.
            </p>
            <p>
              Lo mismo aplica cuando entra IA. Un agente en producción no se distingue de cualquier
              otra integración crítica: herramientas acotadas con contrato a través de MCP,
              evaluaciones con casos reales antes de tocar nada, y aprobación humana donde hay
              efecto contable. Y cuando el que inicia el pago es el propio agente —{" "}
              <Link
                href="/servicios/inteligencia-artificial"
                className="text-paper underline decoration-rule underline-offset-4 transition-colors hover:text-stamp-text hover:decoration-stamp"
              >
                finanzas agénticas
              </Link>{" "}
              — hacen falta identidad propia, mandatos con límite y caducidad, y una traza que
              responda quién autorizó cada movimiento. Puedo integrarlo porque vengo del lado de los
              pagos, no del lado de las demos.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-y-6 self-start border-y border-rule py-6 md:grid-cols-1 md:gap-y-5">
            {[
              { term: "Frentes", value: `${SERVICES.length} servicios` },
              { term: "Modalidad", value: "Remoto · LATAM" },
              { term: "Idiomas", value: "Español · Inglés" },
            ].map(({ term, value }) => (
              <div key={term} className="flex flex-col gap-1.5 md:flex-row md:justify-between">
                <dt className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
                  {term}
                </dt>
                <dd className="font-sans text-base text-paper">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-rule-strong pt-5">
          <CalPopupButton
            source="services-hero"
            aria-label="Agendar un diagnóstico"
            className="cta"
          >
            Agendar un diagnóstico
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
          </CalPopupButton>

          <Link href="/recursos" className="cta-quiet">
            Ver casos de impacto
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>

          <CvDownloadButton source="services-hero" />
        </div>
      </div>
    </AnimatedSection>
  )
}

/**
 * The schedule itself: one ruled row per service, each one a link to its own
 * page. Numbered because the sequence is a schedule of items, which is the one
 * case where a number carries information the reader uses.
 */
function Catalogue() {
  return (
    <Section
      spacing="compact"
      header={{
        columnLabel: "Catálogo",
        title: "¿En qué trabajo?",
        description:
          "Siete frentes, cada uno con su alcance, su método, las prácticas que lo sostienen y un caso con cifras reales. Abre el que te interese.",
        headingId: "catalogue-heading",
        trailing: (
          <span className="font-mono text-[11px] text-paper-faint tabular-nums">
            {SERVICES.length}
          </span>
        ),
      }}
    >
      <ol className="border-t border-rule-strong">
        {SERVICES.map((service, i) => (
          <li key={service.slug}>
            <Link
              href={`/servicios/${service.slug}`}
              className="group grid items-baseline gap-x-8 gap-y-2 border-b border-rule py-6 transition-colors md:grid-cols-[3rem_minmax(0,15rem)_minmax(0,1fr)_auto]"
            >
              <span className="font-mono text-[11px] text-paper-faint tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="font-sans text-xl leading-tight tracking-[-0.02em] text-paper transition-colors group-hover:text-stamp-text md:text-2xl">
                {service.title}
              </span>

              <span className="max-w-[60ch] font-sans text-base leading-relaxed text-paper-dim">
                {service.summary}
              </span>

              <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-paper-faint uppercase transition-colors group-hover:text-paper md:justify-self-end">
                Abrir
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </Section>
  )
}

/** How an engagement runs. Three ruled columns, not three cards. */
function Method() {
  return (
    <Section
      spacing="default"
      header={{
        columnLabel: "Método",
        title: "¿Cómo se trabaja?",
        description:
          "El mismo recorrido en los siete frentes: entender antes de proponer, diseñar antes de construir, y medir en producción.",
        headingId: "method-heading",
      }}
    >
      <ol className="grid border-t-2 border-rule-strong md:grid-cols-3">
        {METHOD.map((step, i) => (
          <li
            key={step.term}
            className={`border-b border-rule py-7 md:border-b-0 md:px-7 ${
              i === 0 ? "md:pl-0" : "md:border-l md:border-rule"
            }`}
          >
            <p className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
              {step.term}
            </p>
            <h3 className="mt-3 font-sans text-xl leading-tight tracking-[-0.02em] text-paper">
              {step.title}
            </h3>
            <p className="mt-3 max-w-[42ch] font-sans text-base leading-relaxed text-paper-dim">
              {step.description}
            </p>
            <ul className="mt-5 divide-y divide-rule border-t border-rule">
              {step.items.map((item) => (
                <li
                  key={item}
                  className="py-2 font-mono text-[11px] tracking-[0.08em] text-paper-faint uppercase"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}

/** The questions that come before picking a front. */
function Questions() {
  return (
    <Section
      spacing="compact"
      header={{
        columnLabel: "Preguntas",
        title: "Antes de escribirme",
        headingId: "services-faq",
      }}
    >
      <dl className="border-t border-rule-strong">
        {SERVICES_FAQ.map(({ question, answer }) => (
          <div
            key={question}
            className="grid gap-x-12 gap-y-2 border-b border-rule py-6 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]"
          >
            <dt className="font-sans text-lg leading-snug tracking-[-0.01em] text-paper">
              {question}
            </dt>
            <dd className="max-w-[68ch] font-sans text-base leading-relaxed text-paper-dim">
              {answer}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

function ClosingEntry() {
  return (
    <AnimatedSection
      className="relative pb-20 md:pb-28"
      role="region"
      aria-labelledby="services-closing"
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          columnLabel="Siguiente paso"
          title="Una hora sobre tu arquitectura"
          description="Sesenta minutos, el problema concreto, los riesgos que veo priorizados y siguientes pasos accionables. Si de ahí no sale nada útil, no hay nada que contratar."
          headingId="services-closing"
        />

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t-2 border-rule-strong pt-5">
          <CalPopupButton
            source="services-closing"
            aria-label="Agendar un diagnóstico"
            className="cta"
          >
            Agendar un diagnóstico
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
          </CalPopupButton>

          <Link href="/contacto" className="cta-quiet">
            Escribirme
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>

          <Link href="/sobre-mi" className="cta-quiet">
            Ver trayectoria
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  )
}
