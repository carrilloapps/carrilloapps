"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Check, Download, Eye } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DynamicDialog as Dialog,
  DynamicDialogContent as DialogContent,
  DynamicDialogDescription as DialogDescription,
  DynamicDialogHeader as DialogHeader,
  DynamicDialogTitle as DialogTitle,
} from "@/components/dynamic-imports"
import { trackButtonClick } from "@/lib/analytics"

interface CvDownloadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** PDF URL — defaults to /cv.pdf served from /public. */
  cvUrl?: string
}

interface FormState {
  name: string
  email: string
}

interface FormErrors {
  name: string
  email: string
}

/**
 * The CV request slip.
 *
 * Two steps: state who is asking, then collect the document. The previous
 * version asked for a name and an email behind one line of copy and, on
 * success, told the visitor "se ha enviado también a tu correo" — which was
 * never true, since the form has no backend. A document counter says what it
 * holds, why it needs the detail, and exactly what happens next.
 */

/** What the visitor is actually getting. Stated before they hand over a detail. */
const CONTENTS = [
  { term: "Formato", value: "PDF · 2 páginas" },
  { term: "Idioma", value: "Español" },
  { term: "Incluye", value: "Trayectoria, stack y referencias" },
]

export function CvDownloadModal({ open, onOpenChange, cvUrl = "/cv.pdf" }: CvDownloadModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [data, setData] = useState<FormState>({ name: "", email: "" })
  const [errors, setErrors] = useState<FormErrors>({ name: "", email: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validation: FormErrors = {
      name: data.name.trim().length < 2 ? "Escribe tu nombre completo." : "",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
        ? ""
        : "Escribe un correo electrónico válido.",
    }
    setErrors(validation)
    if (!validation.name && !validation.email) {
      trackButtonClick("CV solicitado", "cv-modal")
      setSubmitted(true)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-rule-strong bg-ink text-paper">
        <DialogHeader>
          <div className="flex items-baseline justify-between gap-4 border-b border-rule-strong pr-10 pb-2">
            <span className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
              {submitted ? "Documento listo" : "Solicitud de documento"}
            </span>
            <span className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
              CV · 2026
            </span>
          </div>

          <DialogTitle className="pt-4">
            {submitted ? "Tu copia está lista" : "Currículum vitae"}
          </DialogTitle>
          <DialogDescription>
            {submitted
              ? `Gracias, ${data.name.split(" ")[0]}. Puedes abrirlo en el navegador o guardarlo.`
              : "Te pido nombre y correo para saber quién lo consulta — nada más. Sin lista de correo, sin seguimiento comercial."}
          </DialogDescription>
        </DialogHeader>

        {/* The particulars of the document, stated up front. */}
        <dl className="divide-y divide-rule border-y border-rule">
          {CONTENTS.map(({ term, value }) => (
            <div key={term} className="flex items-baseline justify-between gap-4 py-2.5">
              <dt className="font-mono text-[10px] tracking-[0.12em] text-paper-faint uppercase">
                {term}
              </dt>
              <dd className="text-right font-sans text-sm text-paper-dim">{value}</dd>
            </div>
          ))}
        </dl>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-2">
              <Label
                htmlFor="cv-name"
                className="font-mono text-[10px] tracking-[0.12em] text-paper-faint uppercase"
              >
                Nombre completo
              </Label>
              <Input
                id="cv-name"
                name="name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                autoCapitalize="words"
                autoComplete="name"
                spellCheck={false}
                minLength={2}
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "cv-name-error" : undefined}
                placeholder="Tu nombre completo"
              />
              {errors.name && (
                <p id="cv-name-error" className="font-mono text-xs text-stamp-text" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="cv-email"
                className="font-mono text-[10px] tracking-[0.12em] text-paper-faint uppercase"
              >
                Correo electrónico
              </Label>
              <Input
                id="cv-email"
                name="email"
                type="email"
                inputMode="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                autoCapitalize="off"
                autoComplete="email"
                spellCheck={false}
                required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "cv-email-error" : undefined}
                placeholder="tu@correo.com"
              />
              {errors.email && (
                <p id="cv-email-error" className="font-mono text-xs text-stamp-text" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <button type="submit" className="cta w-full justify-center">
              Acceder al CV
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <p className="font-sans text-xs leading-relaxed text-paper-faint">
              Tus datos no se comparten con terceros. Consulta la{" "}
              <Link
                href="/privacidad"
                className="text-paper-dim underline decoration-rule underline-offset-4 transition-colors hover:text-stamp-text"
              >
                política de privacidad
              </Link>
              .
            </p>
          </form>
        ) : (
          <div className="space-y-5">
            <p className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-settled uppercase">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Registrado
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick("Ver CV", "cv-modal")}
                className="cta flex-1 justify-center"
              >
                <Eye className="h-4 w-4" aria-hidden="true" />
                Ver el CV
              </a>
              <a
                href={cvUrl}
                download
                onClick={() => trackButtonClick("Descargar CV", "cv-modal")}
                className="cta-quiet flex-1 justify-center"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                Descargar
              </a>
            </div>

            <p className="font-sans text-xs leading-relaxed text-paper-faint">
              ¿Prefieres conversarlo? Puedes{" "}
              <Link
                href="/agendamiento"
                className="text-paper-dim underline decoration-rule underline-offset-4 transition-colors hover:text-stamp-text"
              >
                agendar una asesoría
              </Link>{" "}
              o{" "}
              <Link
                href="/contacto"
                className="text-paper-dim underline decoration-rule underline-offset-4 transition-colors hover:text-stamp-text"
              >
                escribirme
              </Link>
              .
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
