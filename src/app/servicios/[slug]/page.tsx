"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { AnimatedSection } from "@/components/animated-section"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/section-header"
import { CalPopupButton } from "@/components/cal-booking"
import { SERVICES, getService } from "@/lib/data/services"

/**
 * One service, one page.
 *
 * The page is a client component, as most pages here are, so the slug comes
 * from `useParams` rather than the `params` promise — that one is for the
 * server layout beside this file, which owns the metadata, the JSON-LD and the
 * static params.
 *
 * Seven sections, each a different shape: the opening entry, the scope as a
 * numbered schedule, the method as dated steps, an optional spotlight, the
 * practices as a plain index, what gets delivered, and the questions. A page
 * that has to carry a thousand words earns them by not saying them all the
 * same way.
 */
export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const service = getService(slug)

  // `dynamicParams = false` in the layout means an unknown slug never routes
  // here. This is the type narrowing, not a runtime branch anyone reaches.
  if (!service) return null

  const others = SERVICES.filter((s) => s.slug !== service.slug)
  const index = SERVICES.findIndex((s) => s.slug === service.slug)

  return (
    <div className="relative min-h-screen text-paper">
      <DynamicBackground />
      <SiteHeader />

      <main id="main-content" role="main" className="relative z-10">
        {/* Opening entry: where this sits in the schedule, then the claim. */}
        <AnimatedSection
          className="relative w-full pt-6 md:pt-10"
          role="region"
          aria-labelledby="service-heading"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-baseline justify-between gap-6 border-b border-rule-strong pb-2">
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase transition-colors hover:text-paper"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                Servicios
              </Link>
              <span className="font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
              </span>
            </div>

            <h1
              id="service-heading"
              className="mt-8 max-w-[20ch] font-sans text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.96] font-semibold tracking-[-0.04em] text-balance text-paper"
            >
              {service.heading}
            </h1>

            <div className="mt-8 grid gap-x-14 gap-y-8 md:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
              <div className="max-w-[68ch] space-y-5 font-sans text-base leading-relaxed text-paper-dim md:text-lg">
                {service.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <dl className="self-start border-y border-rule">
                {service.particulars.map(({ term, value }, i) => (
                  <div
                    key={`${term}-${i}`}
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

            {service.credentials?.length ? (
              <dl className="mt-8 flex flex-wrap items-baseline gap-x-10 gap-y-3 border-t border-rule pt-4">
                <dt className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
                  Certificaciones
                </dt>
                {service.credentials.map((credential) => (
                  <dd
                    key={credential}
                    className="inline-flex items-baseline gap-2.5 font-mono text-[12px] tracking-[0.1em] text-paper uppercase"
                  >
                    <span aria-hidden="true" className="inline-block h-1.5 w-1.5 bg-stamp" />
                    {credential}
                  </dd>
                ))}
              </dl>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-rule-strong pt-5">
              <CalPopupButton
                source={`service-${service.slug}`}
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
            </div>
          </div>
        </AnimatedSection>

        {/* Scope, with the case alongside. */}
        <Section
          spacing="compact"
          header={{
            columnLabel: "Alcance",
            title: "¿Qué involucra?",
            headingId: "scope-heading",
          }}
        >
          <div className="grid gap-x-14 gap-y-12 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
            <ol className="border-t border-rule-strong">
              {service.benefits.map((benefit, i) => (
                <li
                  key={`${benefit}-${i}`}
                  className="flex items-baseline gap-5 border-b border-rule py-4 md:gap-8"
                >
                  <span className="font-mono text-[11px] text-paper-faint tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-base text-paper md:text-lg">{benefit}</span>
                </li>
              ))}
            </ol>

            <aside aria-labelledby="case-heading">
              <h3
                id="case-heading"
                className="border-b border-rule-strong pb-2 font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase"
              >
                Un caso
              </h3>

              <p className="mt-5 font-sans text-xl leading-tight tracking-[-0.02em] text-paper">
                {service.caseStudy.title}
              </p>
              <p className="mt-4 font-sans text-base leading-relaxed text-paper-dim">
                {service.caseStudy.description}
              </p>

              <dl className="mt-6 border-t border-rule-strong">
                {service.caseStudy.metrics.map((metric, i) => (
                  <div
                    key={`${metric.label}-${i}`}
                    className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5"
                  >
                    <dt className="font-mono text-[10px] tracking-[0.14em] text-paper-faint uppercase">
                      {metric.label}
                    </dt>
                    <dd className="font-mono text-lg text-paper tabular-nums">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </Section>

        {/* How the work runs, as dated steps down a rule. */}
        <Section
          spacing="compact"
          header={{
            columnLabel: "Método",
            title: "¿Cómo se aborda?",
            headingId: "approach-heading",
          }}
        >
          <ol className="relative">
            <span
              className="absolute top-2 bottom-2 left-0 hidden w-px bg-rule md:block"
              aria-hidden="true"
            />
            {service.approach.map((step, i) => (
              <li key={`${step.title}-${i}`} className="relative pb-10 last:pb-0 md:pl-12">
                <span
                  className="absolute top-[0.55rem] -left-[3px] hidden h-[7px] w-[7px] bg-stamp md:block"
                  aria-hidden="true"
                />
                <p className="font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase tabular-nums">
                  Paso {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 max-w-[26ch] font-sans text-2xl leading-[1.1] tracking-[-0.02em] text-paper">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[70ch] font-sans text-base leading-relaxed text-paper-dim md:text-lg">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        {/* The one service that carries a deep-dive. */}
        {service.spotlight ? (
          <Section
            spacing="compact"
            header={{
              columnLabel: service.spotlight.label,
              title: service.spotlight.title,
              headingId: "spotlight-heading",
            }}
          >
            <div className="grid gap-x-14 gap-y-10 md:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
              <div className="max-w-[68ch] space-y-5 font-sans text-base leading-relaxed text-paper-dim md:text-lg">
                {service.spotlight.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <ul className="self-start border-t border-rule-strong">
                {service.spotlight.items.map((item, i) => (
                  <li
                    key={`${item}-${i}`}
                    className="flex items-baseline gap-3 border-b border-rule py-3.5 font-sans text-sm leading-relaxed text-paper-dim"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.45rem] inline-block h-1.5 w-1.5 shrink-0 bg-stamp"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        ) : null}

        {/*
          Where it has actually been done. A different shape again: a wide
          record where the context sits in the margin, the work in the measure
          and the figure in the right-hand column, the way a ledger cites the
          entry a balance came from.
        */}
        <Section
          spacing="compact"
          header={{
            columnLabel: "Evidencia",
            title: "¿Dónde lo he hecho?",
            headingId: "evidence-heading",
          }}
        >
          <dl className="border-t-2 border-rule-strong">
            {service.evidence.map((item, i) => (
              <div
                key={`${item.context}-${i}`}
                className="grid items-baseline gap-x-10 gap-y-2 border-b border-rule py-5 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_auto]"
              >
                <dt className="font-mono text-[11px] tracking-[0.12em] text-paper-dim uppercase">
                  {item.context}
                </dt>
                <dd className="max-w-[62ch] font-sans text-base leading-relaxed text-paper-dim">
                  {item.detail}
                </dd>
                <dd className="font-mono text-lg text-paper tabular-nums md:justify-self-end">
                  {item.metric}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 font-sans text-sm text-paper-faint">
            Las cifras vienen de sistemas en producción.{" "}
            <Link
              href="/sobre-mi"
              className="text-paper-dim underline decoration-rule underline-offset-4 transition-colors hover:text-stamp-text hover:decoration-stamp"
            >
              La trayectoria completa está en Sobre mí
            </Link>
            .
          </p>
        </Section>

        {/* Practices, deliverables and stack — three short indexes side by side. */}
        <Section
          spacing="compact"
          header={{
            columnLabel: "Ejecución",
            title: "Prácticas y entregables",
            headingId: "practices-heading",
          }}
        >
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-3">
            <IndexColumn heading="Prácticas" items={service.practices} />
            <IndexColumn heading="Entregables" items={service.deliverables} />
            <IndexColumn heading="Stack" items={service.stack} mono />
          </div>
        </Section>

        {/* Questions. Also this page's FAQPage graph, from the same source. */}
        <Section
          spacing="compact"
          header={{
            columnLabel: "Preguntas",
            title: "Lo que suelen preguntarme",
            headingId: "faq-heading",
          }}
        >
          <dl className="border-t border-rule-strong">
            {service.faq.map(({ question, answer }, i) => (
              <div
                key={`${question}-${i}`}
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

        {/* The rest of the schedule, so the page is not a dead end. */}
        <AnimatedSection
          className="relative pt-10 pb-16 md:pt-16 md:pb-20"
          role="region"
          aria-labelledby="others-heading"
        >
          <div className="container mx-auto px-4">
            <SectionHeader
              columnLabel="Catálogo"
              title="Otros frentes"
              headingId="others-heading"
              trailing={
                <Link href="/servicios" className="cta-quiet">
                  Ver todos
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              }
            />

            <ul className="grid border-t border-rule-strong sm:grid-cols-2 lg:grid-cols-3">
              {others.map((other) => (
                <li key={other.slug} className="border-b border-rule">
                  <Link
                    href={`/servicios/${other.slug}`}
                    className="group flex h-full flex-col gap-2 py-5 pr-6 transition-colors"
                  >
                    <span className="font-sans text-lg leading-tight tracking-[-0.02em] text-paper transition-colors group-hover:text-stamp-text">
                      {other.title}
                    </span>
                    <span className="max-w-[42ch] font-sans text-sm leading-relaxed text-paper-faint">
                      {other.summary}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </main>

      <SiteFooter />
    </div>
  )
}

/** A short ruled index. Three of them sit side by side under "Ejecución". */
function IndexColumn({
  heading,
  items,
  mono = false,
}: {
  heading: string
  items: string[]
  mono?: boolean
}) {
  return (
    <div>
      <h3 className="border-b border-rule-strong pb-2 font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase">
        {heading}
      </h3>
      <ul className="divide-y divide-rule">
        {items.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className={
              mono
                ? "py-2.5 font-mono text-[11px] tracking-[0.08em] text-paper-dim uppercase"
                : "py-2.5 font-sans text-sm leading-relaxed text-paper-dim"
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
