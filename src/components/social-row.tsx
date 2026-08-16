"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Substack, XMark } from "@/components/icons/social-icons"
import { trackSocialClick } from "@/lib/analytics"

const LINKS = [
  { href: "https://github.com/carrilloapps", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/carrilloapps", label: "LinkedIn", icon: Linkedin },
  { href: "https://x.com/carrilloapps", label: "X / Twitter", icon: XMark },
  { href: "https://carrilloapps.substack.com/", label: "Substack", icon: Substack },
  { href: "mailto:m@carrillo.app", label: "Email", icon: Mail },
]

interface SocialRowProps {
  /** Extra classes on the list, e.g. alignment for a given layout. */
  className?: string
}

/**
 * Where a letterhead prints its addresses, this ledger prints where to find the
 * same person. It sits between the name and the summary because that is the
 * order a document states its identity: who, where to reach them, then what
 * they do. Labels in mono, no icon tiles — the marks are drawn at text size and
 * inherit the entry's colour.
 *
 * Lived inside `home-hero.tsx` until /sobre-mi needed the same row. A second
 * copy would have been a second list of profile URLs to keep in step.
 */
export function SocialRow({ className = "" }: SocialRowProps) {
  return (
    <ul
      className={`flex flex-wrap items-center gap-x-6 gap-y-1 ${className}`.trim()}
      aria-label="Perfiles y contacto"
    >
      {LINKS.map(({ href, label, icon: Icon }) => {
        const external = href.startsWith("http")
        return (
          <li key={label}>
            <Link
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              onClick={() => trackSocialClick(label, "profile_visit", href)}
              className="group inline-flex min-h-[48px] touch-manipulation items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-paper-faint uppercase transition-colors hover:text-paper focus-visible:text-paper"
            >
              <Icon
                className="h-3.5 w-3.5 shrink-0 transition-colors group-hover:text-stamp-text"
                aria-hidden="true"
              />
              {label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
