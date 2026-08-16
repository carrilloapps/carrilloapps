"use client"

import Link from "next/link"
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/section-header"
import { Section } from "@/components/ui/section"
import { ExperienceTimeline } from "@/components/about/experience-timeline"
import { PortraitPlate } from "@/components/about/portrait-plate"
import { CvDownloadButton } from "@/components/cv-download-button"
import { SocialRow } from "@/components/social-row"
import { CalPopupButton } from "@/components/cal-booking"

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

/** The particulars of the career, in the shape the ledger states particulars. */
const FIGURES = [
  { term: "Años de carrera", value: "10+", note: "Desde 2015" },
  { term: "Transacciones", value: "2M", note: "Por día, en producción" },
  { term: "Equipo actual", value: "7", note: "Personas a cargo" },
  { term: "Roles de liderazgo", value: "3", note: "Tech Lead y Dev Lead" },
]

/**
 * The reference index. A ledger closes with the sources it was worked from, so
 * the library is set as an index of references rather than as three cards of
 * bullet points — same content, a shape the document already owns.
 */
const LIBRARY = [
  {
    heading: "Oficio",
    entries: [
      { title: "Designing Data-Intensive Applications", author: "Kleppmann" },
      { title: "Clean Code", author: "Martin" },
      { title: "Accelerate", author: "Forsgren, Humble, Kim" },
      { title: "The Phoenix Project", author: "Kim" },
    ],
  },
  {
    heading: "Equipos",
    entries: [
      { title: "High Output Management", author: "Grove" },
      { title: "Radical Candor", author: "Scott" },
      { title: "The Five Dysfunctions of a Team", author: "Lencioni" },
      { title: "The Lean Startup", author: "Ries" },
    ],
  },
  {
    heading: "Criterio",
    entries: [
      { title: "Thinking, Fast and Slow", author: "Kahneman" },
      { title: "Antifragile", author: "Taleb" },
      { title: "Deep Work", author: "Newport" },
      { title: "Mindset", author: "Dweck" },
    ],
  },
]

/**
 * What I give back. Each row carries where it actually lands, so the section is
 * a ledger of accounts rather than four paragraphs with headings — the reader
 * can go to the thing instead of taking the claim on trust.
 */
const COMMUNITY: {
  term: string
  detail: string
  link?: { label: string; href: string; external?: boolean }
}[] = [
  {
    term: "Código abierto",
    detail:
      "Publico y mantengo librerías, CLIs y servidores MCP en npm y GitHub. Todo lo que resuelvo dos veces en el trabajo termina siendo un paquete instalable.",
    link: { label: "Ver herramientas", href: "/recursos" },
  },
  {
    term: "Escritura técnica",
    detail:
      "Escribo sobre qué se rompió en producción y cómo se arregló — el material que me habría servido tener cuando empecé.",
    link: {
      label: "Leer en Substack",
      href: "https://carrilloapps.substack.com",
      external: true,
    },
  },
  {
    term: "Mentorías",
    detail:
      "Acompaño a desarrolladores junior y semi-senior, en programas estructurados y en relaciones informales, sobre decisiones técnicas y de carrera.",
    link: { label: "Escribirme", href: "/contacto" },
  },
  {
    term: "Charlas y talleres",
    detail:
      "Doy charlas sobre arquitectura de pagos, conciliación de alto volumen y liderazgo técnico en comunidades y equipos de la región.",
    link: { label: "Proponer una charla", href: "/contacto" },
  },
]

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function AboutPage() {
  return (
    <div className="relative min-h-screen text-paper">
      <DynamicBackground />
      <SiteHeader />

      <main id="main-content" role="main" className="relative z-10">
        <OpeningEntry />

        <FiguresRow />

        <Trayectoria />

        <Practice />

        <Community />
      </main>

      <SiteFooter />
    </div>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * The opening entry: the exhibit on the left, the statement on the right.
 *
 * The page used to open on a centred gradient title over a pill badge, with the
 * portrait boxed in a rounded card and lit by a blue-to-purple wash. None of
 * that language exists here anymore.
 */
function OpeningEntry() {
  return (
    <AnimatedSection
      className="relative w-full pt-6 pb-12 md:pt-10 md:pb-16"
      role="region"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4">
        {/*
          Three items, placed rather than nested. On a phone they read in DOM
          order — exhibit, statement, addresses — which keeps the heading inside
          the first viewport; wrapping the exhibit and the addresses together
          pushed it 250px down. On a wide screen explicit row/column placement
          rebuilds the identification column on the left with the statement
          spanning both rows beside it.
        */}
        <div className="grid items-start gap-y-10 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:grid-rows-[auto_1fr] md:gap-x-14 md:gap-y-8 lg:gap-x-20">
          <div className="md:col-start-1 md:row-start-1">
            <PortraitPlate />
          </div>

          <div className="md:col-start-2 md:row-span-2 md:row-start-1">
            <h1
              id="about-heading"
              className="font-sans text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.94] font-semibold tracking-[-0.04em] text-balance text-paper"
            >
              Diez años en dinero que se mueve
            </h1>

            <div className="mt-8 max-w-[68ch] space-y-5 font-sans text-base leading-relaxed text-paper-dim md:text-lg">
              <p>
                Soy José Carrillo, aunque todo el mundo me dice Junior. Empecé escribiendo código
                para quien lo pagara y terminé especializándome en el único dominio donde un error
                no se puede maquillar: el que mueve plata de una cuenta a otra.
              </p>
              <p>
                Hoy lidero el equipo de Pagos y Finanzas de{" "}
                <span className="text-paper">Yummy</span>, la super-app de LATAM. Antes pasé por
                conciliación contable a escala en <span className="text-paper">Cencosud</span>,
                microservicios de aerolínea en <span className="text-paper">Sky Airline</span> y
                pasarelas de pago en <span className="text-paper">Wompi</span>. Son contextos
                distintos con el mismo problema de fondo: sistemas que no pueden fallar, operados
                por equipos que tienen que poder dormir.
              </p>
              <p>
                Trabajo desde Medellín. Fuera del teclado eso significa caminar la ciudad y tiempo
                con mi familia, que es lo que sostiene todo lo demás.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-rule-strong pt-5">
              <CalPopupButton source="about-hero" aria-label="Agendar una asesoría" className="cta">
                Agendar una asesoría
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
              </CalPopupButton>

              <CvDownloadButton source="about-hero" />

              <Link href="/servicios" className="cta-quiet">
                Ver servicios
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* The marks close the identification column, under the exhibit.
              The wrapper carries the plate's own width cap so the row centres on
              the photograph rather than on the grid column, which is wider than
              the plate on phones. */}
          <div className="w-full max-w-[16rem] md:col-start-1 md:row-start-2 md:max-w-none">
            <SocialRow variant="marks" className="justify-center" />
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

/**
 * The figures, as ruled cells — the same `<dl>` the home page and the social
 * cards print. Four numbers, no tiles, no icons.
 */
function FiguresRow() {
  return (
    <AnimatedSection
      className="relative pb-4 md:pb-8"
      role="region"
      aria-label="Cifras de la trayectoria"
    >
      <div className="container mx-auto px-4">
        {/* Naming the band is what stops it reading as four stray numbers: a
            balance strip has a heading and a period, like any other total. */}
        <div className="flex items-baseline justify-between gap-6 border-b border-rule-strong pb-2">
          <span className="font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase">
            Balance
          </span>
          <span className="font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase tabular-nums">
            2015 — 2026
          </span>
        </div>

        <dl className="grid grid-cols-2 border-b border-rule md:grid-cols-4">
          {FIGURES.map(({ term, value, note }, i) => (
            <div
              key={term}
              className={`py-5 md:px-6 md:py-6 ${i > 0 ? "md:border-l md:border-rule" : ""} ${
                i % 2 === 1 ? "border-l border-rule pl-5 md:pl-6" : ""
              } ${i < 2 ? "border-b border-rule md:border-b-0" : ""}`}
            >
              <dt className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
                {term}
              </dt>
              <dd className="mt-2 font-mono text-3xl leading-none text-paper tabular-nums md:text-4xl">
                {value}
              </dd>
              <p className="mt-2 font-sans text-sm text-paper-faint">{note}</p>
            </div>
          ))}
        </dl>
      </div>
    </AnimatedSection>
  )
}

/**
 * The career, on an axis you move along.
 *
 * The home prints the same three roles as a short vertical list, because there
 * it is one section among several and a visitor is skimming. Here it is the
 * spine of the page, so it earns the interaction: pick a period, read that
 * entry. Same data (`src/lib/data/experience.ts`), two readings.
 */
function Trayectoria() {
  return (
    <Section
      spacing="default"
      header={{
        columnLabel: "Trayectoria",
        title: "Roles que dejaron huella",
        description:
          "Más de una década construyendo plataformas críticas para banca, pagos y fintech. Elige un período para abrir la entrada.",
        headingId: "experience-heading",
      }}
    >
      <ExperienceTimeline />
    </Section>
  )
}

/**
 * How the work is actually done, in prose, with the reference index alongside.
 *
 * Prose on the left and an index on the right is the third distinct shape on
 * this page — after the exhibit-and-statement opening and the dated timeline.
 * Three sections of the same list would be the thing this redesign exists to
 * stop.
 */
function Practice() {
  return (
    <Section
      spacing="default"
      header={{
        columnLabel: "Método",
        title: "¿Cómo trabajo?",
        headingId: "practice-heading",
      }}
    >
      <div className="grid gap-x-14 gap-y-12 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        <div className="max-w-[68ch] space-y-5 font-sans text-base leading-relaxed text-paper-dim md:text-lg">
          <p>
            Empiezo por el dinero, no por el código. Antes de proponer una arquitectura necesito
            entender de dónde sale cada peso, dónde se registra y quién tiene que poder auditarlo
            seis meses después. En pagos, el modelo de datos es el producto; todo lo demás es
            plomería alrededor.
          </p>
          <p>
            De ahí salen microservicios y event sourcing cuando el dominio lo justifica, y un
            monolito bien ordenado cuando no. Prefiero un sistema aburrido que se entienda a las
            tres de la mañana antes que uno elegante que solo yo sepa operar. La observabilidad y
            las pruebas no son una fase posterior: son la condición para poder desplegar sin pedirle
            permiso al miedo.
          </p>
          <p>
            El cumplimiento —PCI-DSS, ISO 27001— entra como restricción de diseño desde el primer
            día, no como una auditoría que se sufre al final. Sale más barato y produce mejores
            sistemas.
          </p>
          <p>
            Liderar, en la práctica, significa que otras siete personas puedan tomar buenas
            decisiones sin esperarme. Documento lo que decido y por qué, reviso código a fondo, y
            trato de que el criterio quede en el equipo y no en mi cabeza. Si el equipo depende de
            mí para avanzar, hice mal mi trabajo.
          </p>
        </div>

        {/*
          Set as an index, not as a stack of headed lists. Three things changed:
          the group headings sit on their own rule, the way every other head in
          this system does instead of floating; each title and its author share
          one baseline rather than taking two lines each, which is how an index
          is set and halves the rail's height; and both the index and each group
          carry a count, so the size of the thing is legible before any of it is
          read.
        */}
        <aside aria-labelledby="library-heading">
          <div className="flex items-baseline justify-between gap-4 border-b border-rule-strong pb-2">
            <h3
              id="library-heading"
              className="font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase"
            >
              De dónde viene el criterio
            </h3>
            <span className="font-mono text-[11px] text-paper-faint tabular-nums">
              {LIBRARY.reduce((n, g) => n + g.entries.length, 0)}
            </span>
          </div>

          <div className="mt-6 space-y-6">
            {LIBRARY.map((group) => (
              <section key={group.heading}>
                <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-1.5">
                  <h4 className="font-mono text-[10px] tracking-[0.16em] text-paper-dim uppercase">
                    {group.heading}
                  </h4>
                  <span className="font-mono text-[10px] text-paper-faint tabular-nums">
                    {group.entries.length}
                  </span>
                </div>

                <ul>
                  {group.entries.map((entry) => (
                    <li
                      key={entry.title}
                      className="flex items-baseline justify-between gap-3 py-2"
                    >
                      <span className="font-sans text-sm leading-snug text-paper-dim">
                        {entry.title}
                      </span>
                      <span className="shrink-0 font-mono text-[10px] tracking-[0.08em] text-paper-faint uppercase">
                        {entry.author}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </aside>
      </div>
    </Section>
  )
}

/**
 * The closing entry: what I give back, then the total line.
 */
function Community() {
  return (
    <AnimatedSection
      className="relative pb-20 md:pb-28"
      role="region"
      aria-labelledby="community-heading"
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          columnLabel="Comunidad"
          title="Lo que devuelvo"
          description="Casi todo lo que sé lo aprendí de gente que se tomó el trabajo de explicarlo en público. Esto es lo que hago para saldar esa cuenta."
          headingId="community-heading"
        />

        <dl className="border-t border-rule-strong">
          {COMMUNITY.map(({ term, detail, link }) => (
            <div
              key={term}
              className="grid gap-x-10 gap-y-3 border-b border-rule py-6 md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)_auto] md:items-baseline"
            >
              <dt className="flex items-baseline gap-2.5 font-mono text-[11px] tracking-[0.14em] text-paper-dim uppercase">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 shrink-0 translate-y-[-1px] bg-stamp"
                />
                {term}
              </dt>

              <dd className="max-w-[62ch] font-sans text-base leading-relaxed text-paper-dim">
                {detail}
              </dd>

              {link ? (
                <dd className="md:justify-self-end">
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-quiet"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link href={link.href} className="cta-quiet">
                      {link.label}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </dd>
              ) : null}
            </div>
          ))}
        </dl>

        {/* The total line. */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-t-2 border-rule-strong pt-5">
          <p className="max-w-[46ch] font-sans text-base text-paper-dim">
            ¿Tienes un sistema de pagos que se está volviendo difícil de sostener?
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <CalPopupButton
              source="about-closing"
              aria-label="Agendar una asesoría"
              className="cta"
            >
              Agendar una asesoría
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
            </CalPopupButton>

            {/* Only what the rows above do not already offer — "Escribirme" and
                "Ver herramientas" are one line up, as destinations of their own
                entries, and repeating them here just dilutes both. */}
            <CvDownloadButton source="about-closing" />
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
