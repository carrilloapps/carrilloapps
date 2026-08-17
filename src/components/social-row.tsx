"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Substack, XMark } from "@/components/icons/social-icons"
import { trackSocialClick } from "@/lib/analytics"

const LINKS = [
  {
    href: "https://github.com/carrilloapps",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://linkedin.com/in/carrilloapps",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://x.com/carrilloapps",
    label: "X / Twitter",
    icon: XMark,
  },
  {
    href: "https://carrilloapps.substack.com/",
    label: "Substack",
    icon: Substack,
  },
  { href: "mailto:m@carrillo.app", label: "Email", icon: Mail },
]

const LINK_CLASS =
  "group inline-flex min-h-[48px] touch-manipulation items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-paper-faint uppercase transition-colors hover:text-paper focus-visible:text-paper"

const ICON_CLASS = "h-3.5 w-3.5 shrink-0 transition-colors group-hover:text-stamp-text"

interface SocialRowProps {
  /**
   * `inline` (default) — one horizontal row of labels, for a wide column.
   * `marks` — the icons alone at reading size, for a narrow column that already
   *   has something to say.
   */
  variant?: "inline" | "marks"
  /** Extra classes on the list, e.g. alignment for a given layout. */
  className?: string
}

/**
 * Where a letterhead prints its addresses, this ledger prints where to find the
 * same person. Labels in mono, no icon tiles — the marks are drawn at text size
 * and inherit the entry's colour.
 *
 * Two shapes because the two surfaces are different columns. Inline sits in the
 * home hero's wide measure, alongside the summary. Marks exists for /sobre-mi,
 * where the row sits under the portrait: the inline labels there landed above
 * the page's actions as five mono strings stacked over three more, all at one
 * size and weight, and the actions stopped reading as actions. A ruled list of
 * handles fixed the competition but replaced it with a second table on a page
 * that already has several. The marks alone say the same thing in one line —
 * the names live in each link's accessible name, not on screen.
 */
export function SocialRow({ variant = "inline", className = "" }: SocialRowProps) {
  if (variant === "marks") {
    return (
      /*
        No gap and no wrapping. Five 48px targets plus any spacing overflow the
        256px the portrait is capped to on phones, and the row silently wrapped
        its last mark onto a second line, which threw the centring off by 42px.
        The boxes carry 14px of their own padding around a 20px mark, so butted
        together the marks still sit 28px apart.
      */
      <ul
        className={`flex flex-nowrap items-center ${className}`.trim()}
        aria-label="Perfiles y contacto"
      >
        {LINKS.map(({ href, label, icon: Icon }) => (
          <li key={label}>
            <Link
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={() => trackSocialClick(label, "profile_visit", href)}
              title={label}
              className="inline-flex h-12 w-12 touch-manipulation items-center justify-center text-paper-faint transition-colors hover:text-stamp-text focus-visible:text-stamp-text"
            >
              {/* 20px: the marks are the whole content here, so they are set at
                  reading size rather than at the 14px they take beside a label.
                  The 48px box stays for touch. */}
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul
      className={`flex flex-wrap items-center gap-x-5 gap-y-1 lg:gap-x-6 ${className}`.trim()}
      aria-label="Perfiles y contacto"
    >
      {LINKS.map(({ href, label, icon: Icon }) => (
        <li key={label}>
          <Link
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            onClick={() => trackSocialClick(label, "profile_visit", href)}
            aria-label={label}
            className={LINK_CLASS}
          >
            <Icon className={ICON_CLASS} aria-hidden="true" />
            {/*
              The label is the first thing to go on a narrow screen. Five of
              them wrapped onto two ragged lines at 390px and stacked five-tall
              in the hero's column at 768px. Hidden, not removed: the link keeps
              its accessible name through `aria-label`, so the row reads the same
              to a screen reader at every width.
            */}
            <span className="hidden lg:inline">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
