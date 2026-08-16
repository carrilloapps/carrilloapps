"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, CalendarDays, ChevronDown, Menu, X } from "lucide-react"

import { Logo } from "@/components/logo"
import { CalPopupButton } from "@/components/cal-booking"
import { SocialRow } from "@/components/social-row"
import { SERVICES } from "@/lib/data/services"
import { trackNavigation } from "@/lib/analytics"

/* -------------------------------------------------------------------------- */
/*  The map                                                                   */
/* -------------------------------------------------------------------------- */

interface NavChild {
  href: string
  label: string
  description: string
}

interface NavGroup {
  /** What these have in common, from the client's side of the table. */
  title: string
  items: NavChild[]
}

interface NavEntry {
  href: string
  label: string
  /** Grouped children. A flat list of seven asks the reader to sort them. */
  groups?: NavGroup[]
  /** Children that need no grouping — three destinations sort themselves. */
  items?: NavChild[]
  /** One head over the ungrouped row, so it aligns with the aside's. */
  itemsLabel?: string
  /** Right-hand column of the panel: one thing worth doing from here. */
  aside?: { label: string; title: string; body: string; href: string; cta: string }
}

/** Pull a service straight from the catalogue so the menu cannot drift. */
const service = (slug: string): NavChild => {
  const found = SERVICES.find((s) => s.slug === slug)
  return {
    href: `/servicios/${slug}`,
    label: found?.title ?? slug,
    description: found?.summary ?? "",
  }
}

/**
 * The site map as a tree, not a list.
 *
 * Seven services in one column is a list the reader has to sort themselves.
 * They group cleanly by what the client is actually trying to do — build
 * something, keep it running, or change how the team works — so the panel says
 * that out loud and the scan becomes three short reads instead of one long one.
 *
 * Every service is read from `SERVICES`, so adding one adds it here.
 */
const NAV: NavEntry[] = [
  { href: "/sobre-mi", label: "Sobre mí" },
  {
    href: "/servicios",
    label: "Servicios",
    groups: [
      {
        title: "Construir",
        items: [
          service("fintech-y-banca"),
          service("arquitectura-de-software"),
          service("backoffice"),
        ],
      },
      {
        title: "Operar",
        items: [service("infraestructura-cloud"), service("seguridad-y-compliance")],
      },
      {
        title: "Evolucionar",
        items: [service("liderazgo-tecnico"), service("inteligencia-artificial")],
      },
    ],
    aside: {
      label: "Empezar",
      title: "Un diagnóstico de una hora",
      body: "El problema concreto, los riesgos priorizados y siguientes pasos accionables.",
      href: "/agendamiento",
      cta: "Agendar",
    },
  },
  // Plain links, no panel. A two-item mega menu costs a hover, a click target
  // and a whole surface to say what the destination already says.
  { href: "/recursos", label: "Recursos" },
  { href: "/blog", label: "Blog" },
  {
    href: "/contacto",
    label: "Contacto",
    itemsLabel: "Hablemos",
    items: [
      {
        href: "/contacto",
        label: "Escribirme",
        description: "Cuéntame qué construyes y dónde se atasca.",
      },
      {
        href: "/agendamiento",
        label: "Agendar una hora",
        description: "Calendario en vivo, confirmación inmediata.",
      },
    ],
    aside: {
      label: "Respuesta",
      title: "Menos de 24 horas hábiles",
      body: "El formulario abre WhatsApp con el mensaje ya redactado; nada se guarda en el sitio.",
      href: "/agendamiento",
      cta: "Ver calendario",
    },
  },
]

/* -------------------------------------------------------------------------- */

/**
 * The letterhead bar.
 *
 * Rebuilt from an 854-line component that carried three overlapping menu
 * implementations, a hand-kept copy of the service list, and deep links into
 * query parameters that had been renamed. What it keeps: real `position: sticky`
 * (no scroll listener repositioning it), two densities, and the reading-progress
 * hairline. What it gains: one panel implementation for both breakpoints, the
 * keyboard contract a disclosure menu owes (Escape, outside click, focus
 * return), and a current-section mark that follows the route rather than being
 * set by hand.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [openPanel, setOpenPanel] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  const isCurrent = useCallback(
    (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)),
    [pathname],
  )

  /*
    One scroll listener for both the density switch and the progress rule.

    The density switch needs hysteresis, and not as a nicety. The bar is
    `sticky`, so it sits in flow: growing it from 56px back to 80px adds 24px of
    content above the viewport, and the browser's scroll anchoring compensates
    by adding those 24px to `scrollY` to keep what you were looking at still.
    With a single 8px threshold that lands you back above it, the bar shrinks,
    anchoring removes the 24px, you fall below the threshold again — and the
    header judders between the two heights forever. Measured at the boundary:
    `scrollY` bouncing 6 ↔ 17 and the height 56 ↔ 67, never settling.

    Two thresholds, 48px apart, make that impossible: the 24px the header can
    move you is not enough to cross back over the one you just left.
  */
  useEffect(() => {
    const SHRINK_AT = 72
    const GROW_AT = 24

    const onScroll = () => {
      const y = window.scrollY
      setScrolled((prev) => (prev ? y > GROW_AT : y > SHRINK_AT))
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? Math.min(1, y / total) : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Any navigation closes whatever is open.
  useEffect(() => {
    setOpenPanel(null)
    setMobileOpen(false)
  }, [pathname])

  // Escape closes; a click outside the header closes; the body stops scrolling
  // while the mobile sheet is up. Escape also puts focus back on the trigger —
  // dismissing a disclosure and leaving focus on the document body strands a
  // keyboard user at the top of the page.
  useEffect(() => {
    if (!openPanel && !mobileOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      if (openPanel) {
        headerRef.current
          ?.querySelector<HTMLButtonElement>(`[data-panel-trigger="${openPanel}"]`)
          ?.focus()
      }
      setOpenPanel(null)
      setMobileOpen(false)
    }
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenPanel(null)
    }

    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [openPanel, mobileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])
  const panels = NAV.filter((entry) => entry.groups || entry.items)

  return (
    <>
      <header
        ref={headerRef}
        role="banner"
        className="sticky top-0 z-50 border-b border-rule bg-ink/95 backdrop-blur-sm"
        onMouseLeave={() => setOpenPanel(null)}
      >
        <div className="container mx-auto px-4">
          <div
            className={`flex items-center justify-between transition-[height] duration-200 ${
              scrolled ? "h-14" : "h-16 lg:h-20"
            }`}
          >
            <Logo showMark size={scrolled ? 26 : 28} />

            <nav aria-label="Navegación principal" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {NAV.map((entry) => {
                  const current = isCurrent(entry.href)
                  const open = openPanel === entry.href
                  const expandable = Boolean(entry.groups || entry.items)
                  const shared = `inline-flex min-h-[44px] items-center gap-2 px-3 font-sans text-[15px] transition-colors focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-[-4px] focus-visible:outline-stamp ${
                    current || open ? "text-paper" : "text-paper-dim hover:text-paper"
                  }`

                  return (
                    <li key={entry.href} className="relative">
                      {expandable ? (
                        <button
                          type="button"
                          data-panel-trigger={entry.href}
                          aria-expanded={open}
                          aria-controls={`${panelId}-${entry.href}`}
                          onClick={() => setOpenPanel(open ? null : entry.href)}
                          onMouseEnter={() => setOpenPanel(entry.href)}
                          className={`${shared} cursor-pointer`}
                        >
                          <CurrentMark on={current} />
                          {entry.label}
                          <ChevronDown
                            className={`h-3.5 w-3.5 text-paper-faint transition-transform ${open ? "rotate-180" : ""}`}
                            aria-hidden="true"
                          />
                        </button>
                      ) : (
                        <Link
                          href={entry.href}
                          aria-current={current ? "page" : undefined}
                          onClick={() => trackNavigation(entry.label, entry.href, "header")}
                          className={shared}
                        >
                          <CurrentMark on={current} />
                          {entry.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-1">
              <CalPopupButton
                source="header"
                aria-label="Agendar una asesoría"
                className="cta-stamp ml-2 hidden lg:inline-flex"
              >
                Agéndame
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
              </CalPopupButton>

              {/*
                On a phone the primary action moves into the drawer, where it
                sits within thumb reach at the bottom. A second button up here
                competes with the menu for the same corner and gets neither.
              */}
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-expanded={mobileOpen}
                aria-controls={`${panelId}-mobile`}
                aria-label="Abrir menú"
                className="inline-flex h-12 w-12 cursor-pointer items-center justify-center text-paper-dim transition-colors hover:text-paper focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-[-4px] focus-visible:outline-stamp lg:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {panels.map((entry) => (
          <div
            key={entry.href}
            id={`${panelId}-${entry.href}`}
            hidden={openPanel !== entry.href}
            className="absolute inset-x-0 top-full hidden border-b border-rule-strong bg-ink shadow-[0_24px_48px_-16px_rgba(0,0,0,0.95)] lg:block"
          >
            <div
              className={`container mx-auto grid gap-x-12 gap-y-8 px-4 py-8 ${
                entry.aside ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)]" : ""
              }`}
            >
              {entry.groups ? (
                <div
                  className="grid gap-x-10 gap-y-8"
                  style={{
                    // A fixed measure, not 1fr: two groups stretched across the
                    // full bar put 700px between the first and the second.
                    gridTemplateColumns: `repeat(${entry.groups.length}, minmax(0, 18rem))`,
                  }}
                >
                  {entry.groups.map((group) => (
                    <div key={group.title}>
                      <PanelHead>{group.title}</PanelHead>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item.href} className="border-b border-rule">
                            <PanelLink item={item} onNavigate={() => setOpenPanel(null)} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <PanelHead>{entry.itemsLabel}</PanelHead>
                  <ul
                    className="grid gap-x-10"
                    style={{
                      gridTemplateColumns: `repeat(${Math.min(entry.items?.length ?? 1, 3)}, minmax(0, 18rem))`,
                    }}
                  >
                    {entry.items?.map((item) => (
                      <li key={item.href} className="border-b border-rule">
                        <PanelLink item={item} onNavigate={() => setOpenPanel(null)} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* The aside carries the same head as the groups — label, then
                  rule — so all four columns share one horizontal line instead
                  of it starting 18px above the rest. */}
              {entry.aside ? (
                <aside>
                  <PanelHead>{entry.aside.label}</PanelHead>
                  <p className="mt-4 font-sans text-lg leading-tight tracking-[-0.02em] text-paper">
                    {entry.aside.title}
                  </p>
                  <p className="mt-2 font-sans text-[13px] leading-relaxed text-paper-faint">
                    {entry.aside.body}
                  </p>
                  <Link
                    href={entry.aside.href}
                    onClick={() => setOpenPanel(null)}
                    className="cta-quiet mt-3"
                  >
                    {entry.aside.cta}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </aside>
              ) : null}
            </div>
          </div>
        ))}

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-stamp transition-transform duration-100"
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      <MobileDrawer
        id={`${panelId}-mobile`}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isCurrent={isCurrent}
        returnFocusTo={menuButtonRef}
      />
    </>
  )
}

/** One child row in the drawer — a plain 46px target, no description. */
function DrawerChild({ item, onClose }: { item: NavChild; onClose: () => void }) {
  const external = item.href.startsWith("http")
  return (
    <li>
      <Link
        href={item.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClose}
        className="flex min-h-[46px] items-center font-sans text-base text-paper-dim transition-colors active:text-paper"
      >
        {item.label}
      </Link>
    </li>
  )
}

/** Column head: the mono label plus the rule every panel column shares. */
function PanelHead({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-b border-rule-strong pb-2 font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
      {children}
    </p>
  )
}

/** One destination: what it is, then what you get there. */
function PanelLink({ item, onNavigate }: { item: NavChild; onNavigate: () => void }) {
  const external = item.href.startsWith("http")
  return (
    <Link
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={() => {
        trackNavigation(item.label, item.href, "header")
        onNavigate()
      }}
      className="group flex flex-col gap-1 py-3"
    >
      <span className="font-sans text-[15px] leading-tight text-paper transition-colors group-hover:text-stamp-text">
        {item.label}
      </span>
      <span className="max-w-[38ch] font-sans text-[13px] leading-snug text-paper-faint">
        {item.description}
      </span>
    </Link>
  )
}

/**
 * The current-page mark.
 *
 * An underline was the wrong signal: `.cta` already owns a rule under a label
 * as "this is an action", so the same shape under a nav item said the wrong
 * thing twice. A filled stamp square before the label is how a register marks
 * the row you are on, and it costs no vertical space in a bar that changes
 * height on scroll. The slot is always rendered so nothing shifts when the
 * current section changes.
 */
function CurrentMark({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-1.5 w-1.5 shrink-0 transition-colors ${
        on ? "bg-stamp" : "bg-transparent"
      }`}
    />
  )
}

/**
 * The phone drawer.
 *
 * Built for the thumb, not scaled down from the desktop menu. It opens over the
 * page rather than pushing it, and the two things a visitor most often wants —
 * book, or write — are pinned at the bottom where the thumb already rests.
 *
 * The tree is an accordion with one section open at a time, and it opens on the
 * section you are already in. Rendering the whole tree expanded was the first
 * attempt: it put four top-level destinations and twelve children in one column
 * that ran 1900px, so "Contacto" — the shortest path to the point of the site —
 * sat three screens below the fold. One section at a time keeps every top-level
 * choice in the first viewport, and the row splits the two intents: the label is
 * a link to the section, the control beside it only expands.
 */
function MobileDrawer({
  id,
  open,
  onClose,
  isCurrent,
  returnFocusTo,
}: {
  id: string
  open: boolean
  onClose: () => void
  isCurrent: (href: string) => boolean
  returnFocusTo: React.RefObject<HTMLButtonElement | null>
}) {
  const expandable = NAV.filter((entry) => entry.groups || entry.items)
  const [expanded, setExpanded] = useState<string | null>(
    () => expandable.find((entry) => isCurrent(entry.href))?.href ?? null,
  )

  const sheetRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // The header outlives client navigations, so the section chosen at mount goes
  // stale. Re-derive it each time the drawer opens.
  useEffect(() => {
    if (open) setExpanded(expandable.find((entry) => isCurrent(entry.href))?.href ?? null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  /*
    `aria-modal` is a promise about focus, not just a label: while the sheet is
    up, Tab must stay inside it, and dismissing it must hand focus back to the
    control that opened it. Without this the next Tab after opening lands on the
    page behind the overlay, which a screen reader user cannot see is covered.
  */
  useEffect(() => {
    if (!open) return
    const opener = returnFocusTo.current
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !sheetRef.current) return
      const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      const list = [...focusable].filter((el) => el.offsetParent !== null)
      if (!list.length) return

      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      opener?.focus()
    }
  }, [open, returnFocusTo])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <button
        type="button"
        aria-label="Cerrar menú"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/80 backdrop-blur-sm"
      />

      <div
        ref={sheetRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        className="absolute inset-x-0 top-0 flex max-h-full flex-col border-b border-rule-strong bg-ink"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-rule px-4">
          <Logo showMark size={26} />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="inline-flex h-12 w-12 cursor-pointer items-center justify-center text-paper-faint transition-colors hover:text-stamp-text focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-[-4px] focus-visible:outline-stamp"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Navegación principal" className="min-h-0 flex-1 overflow-y-auto px-4">
          <ul>
            {NAV.map((entry) => {
              const current = isCurrent(entry.href)
              const hasChildren = Boolean(entry.groups || entry.items)
              const isOpen = expanded === entry.href
              const sectionId = `${id}-${entry.href}`

              return (
                <li key={entry.href} className="border-b border-rule">
                  <div className="flex items-stretch">
                    <Link
                      href={entry.href}
                      aria-current={current ? "page" : undefined}
                      onClick={onClose}
                      className="flex min-h-[60px] flex-1 items-center gap-2.5"
                    >
                      <CurrentMark on={current} />
                      <span
                        className={`font-sans text-xl tracking-[-0.02em] ${
                          current ? "text-paper" : "text-paper-dim"
                        }`}
                      >
                        {entry.label}
                      </span>
                    </Link>

                    {hasChildren ? (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={sectionId}
                        aria-label={`${isOpen ? "Contraer" : "Desplegar"} ${entry.label}`}
                        onClick={() => setExpanded(isOpen ? null : entry.href)}
                        className="-mr-3 inline-flex w-12 shrink-0 cursor-pointer items-center justify-center text-paper-faint transition-colors focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-[-4px] focus-visible:outline-stamp"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-paper" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    ) : null}
                  </div>

                  {/* Children indent to the parent label's text edge — the mark
                      and its gap measure 16px, so they line up under the word
                      rather than to the left of it. */}
                  {hasChildren ? (
                    <div id={sectionId} hidden={!isOpen} className="pb-3 pl-4">
                      {entry.groups ? (
                        entry.groups.map((group) => (
                          <div
                            key={group.title}
                            className="border-t border-rule pt-2 first:border-t-0"
                          >
                            <p className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
                              {group.title}
                            </p>
                            <ul>
                              {group.items.map((item) => (
                                <DrawerChild key={item.href} item={item} onClose={onClose} />
                              ))}
                            </ul>
                          </div>
                        ))
                      ) : (
                        <ul>
                          {entry.items?.map((item) => (
                            <DrawerChild key={item.href} item={item} onClose={onClose} />
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="shrink-0 border-t-2 border-rule-strong px-4 py-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <CalPopupButton source="header" aria-label="Agendar una asesoría" className="cta-stamp">
              Agendar una asesoría
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
            </CalPopupButton>
            <Link href="/contacto" onClick={onClose} className="cta-quiet">
              Escribirme
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-3 border-t border-rule pt-1">
            <SocialRow variant="marks" className="-ml-3" />
          </div>
        </div>
      </div>
    </div>
  )
}
