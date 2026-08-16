"use client"

import { useState } from "react"
import { Download } from "lucide-react"

import { CvDownloadModal } from "@/components/cv-download-modal"
import { trackCTAClick } from "@/lib/analytics"

interface CvDownloadButtonProps {
  /** Where the click happened — goes to analytics as the CTA location. */
  source: string
  /** `cta` (default) is the emphasised treatment; `cta-quiet` the secondary one. */
  variant?: "cta" | "cta-quiet"
  /** Override the label. The action stays the same. */
  children?: React.ReactNode
  className?: string
}

/**
 * The whole "Descargar CV" action, in one component.
 *
 * Every page that offered the CV was re-implementing the same four things: a
 * `useState`, a `<CvDownloadModal>` mounted somewhere far from the button, an
 * `onClick` that opened it, and its own `trackCTAClick` call with its own
 * spelling of the CTA name. Two pages, four places to keep in sync, and the
 * analytics label already differed between them.
 *
 * Now the button owns its modal. Drop it anywhere the CV is offered and the
 * behaviour, the copy and the tracking come with it.
 */
export function CvDownloadButton({
  source,
  variant = "cta-quiet",
  children = "Descargar CV",
  className = "",
}: CvDownloadButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => {
          trackCTAClick("Descargar CV", variant === "cta" ? "primary" : "secondary", source)
          setOpen(true)
        }}
        className={`${variant} ${className}`.trim()}
      >
        {children}
        <Download className={variant === "cta" ? "h-4 w-4" : "h-3.5 w-3.5"} aria-hidden="true" />
      </button>

      <CvDownloadModal open={open} onOpenChange={setOpen} />
    </>
  )
}
