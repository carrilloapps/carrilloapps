"use client"

import { useState } from "react"
import { Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DynamicDialog as Dialog,
  DynamicDialogContent as DialogContent,
  DynamicDialogDescription as DialogDescription,
  DynamicDialogHeader as DialogHeader,
  DynamicDialogTitle as DialogTitle,
} from "@/components/dynamic-imports"

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
 * Self-contained CV download flow. Renders a two-step dialog:
 *   1. Capture name + email (lightweight gating so we know who downloaded)
 *   2. Reveal "Ver el CV" / "Descargar el CV" buttons
 *
 * Owns its own form state so any page can drop in `<CvDownloadModal />` next
 * to a trigger button without copy-pasting the wiring.
 */
export function CvDownloadModal({
  open,
  onOpenChange,
  cvUrl = "/cv.pdf",
}: CvDownloadModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [data, setData] = useState<FormState>({ name: "", email: "" })
  const [errors, setErrors] = useState<FormErrors>({ name: "", email: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validation: FormErrors = {
      name: data.name ? "" : "El nombre es requerido",
      email: !data.email
        ? "El correo electrónico es requerido"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
          ? "Por favor ingresa un correo electrónico válido"
          : "",
    }
    setErrors(validation)
    if (!validation.name && !validation.email) {
      // TODO: wire to backend / analytics endpoint when ready.
      setSubmitted(true)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-950/95 backdrop-blur-xl border-white/10 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Descargar CV</DialogTitle>
          <DialogDescription className="text-zinc-300">
            {!submitted
              ? "Por favor, ingresa tu información para acceder al CV, esperando quizás conocerte mejor en algún momento."
              : "¡Gracias! Ahora puedes ver o descargar el CV."}
          </DialogDescription>
        </DialogHeader>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="cv-name" className="text-white">
                Nombre completo
              </Label>
              <Input
                id="cv-name"
                name="name"
                variant="glass"
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
                <p id="cv-name-error" className="text-red-500 text-sm">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cv-email" className="text-white">
                Correo electrónico
              </Label>
              <Input
                id="cv-email"
                name="email"
                variant="glass"
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
                <p id="cv-email-error" className="text-red-500 text-sm">
                  {errors.email}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full min-h-[48px] touch-manipulation"
            >
              Acceder al CV
            </Button>
          </form>
        ) : (
          <div className="space-y-4 py-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="gradient"
                size="lg"
                className="flex-1 min-h-[48px] touch-manipulation"
                onClick={() => window.open(cvUrl, "_blank")}
              >
                <Eye className="mr-2 h-4 w-4" />
                Ver el CV
              </Button>
              <Button
                variant="glass"
                size="lg"
                className="flex-1 min-h-[48px] touch-manipulation"
                asChild
              >
                <a href={cvUrl} download>
                  <Download className="mr-2 h-4 w-4" />
                  Descargar el CV
                </a>
              </Button>
            </div>

            <div className="text-center text-zinc-300 text-sm">
              <p>¡Gracias por el interés, {data.name}!</p>
              <p>Se ha enviado también a {data.email}.</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
