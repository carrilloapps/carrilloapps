"use client"

import { useCallback, useEffect, useState } from "react"
import { motion, AnimatePresence } from "@/lib/motion"
import Link from "next/link"

import {
  CONSENT_REOPEN_EVENT,
  CONSENT_VERSION,
  hasAnalyticsConsent,
  readCookieConsent,
  writeCookieConsent,
} from "@/lib/cookie-consent"

/**
 * The consent banner.
 *
 * It used to do two things a consent banner must never do. Rejecting did not
 * persist — the handler said so out loud, "don't save rejection, modal will
 * reappear on next page/reload… encourages acceptance" — so a reader who said
 * no was asked again on every navigation until they gave in. And the two
 * buttons were not equals: accept carried the stamp rule and full-strength ink
 * while reject sat in `text-paper-faint`, which is the visual version of the
 * same nudge.
 *
 * Both are fixed here. A refusal is a decision and is written down like any
 * other, so it is honoured for as long as an acceptance would be; the two
 * controls are the same size, the same weight and the same colour, differing
 * only in which rule sits under them. Neither is the default.
 *
 * The cost of storing a refusal is that the banner stops appearing, which
 * would leave no way back — so the decision is revocable from the footer, and
 * reopening shows what is currently on file rather than asking blind.
 */
export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  /*
    What the banner reports back, and why it is not the stored `analytics`
    field. A decision that answered an older version of the question does not
    authorise anything today — `hasAnalyticsConsent` says so and the trackers
    obey it — so printing the raw `true` would tell the reader measurement is
    running while it is stopped. `null` means nothing is on file to report.
  */
  const [analyticsActive, setAnalyticsActive] = useState<boolean | null>(null)

  const syncState = useCallback(() => {
    setAnalyticsActive(readCookieConsent() ? hasAnalyticsConsent() : null)
  }, [])

  useEffect(() => {
    const stored = readCookieConsent()
    syncState()

    // Ask when there is no decision, and again when the stored one answered an
    // older version of the question.
    if (!stored || stored.version !== CONSENT_VERSION) {
      const timer = setTimeout(() => setIsVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [syncState])

  useEffect(() => {
    const reopen = () => {
      syncState()
      setIsVisible(true)
    }
    window.addEventListener(CONSENT_REOPEN_EVENT, reopen)
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, reopen)
  }, [syncState])

  const decide = useCallback((analytics: boolean) => {
    writeCookieConsent(analytics)
    setAnalyticsActive(analytics)
    setIsVisible(false)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          exit={{ y: 60 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-rule-strong bg-ink"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
        >
          {/* A footing bar, not a card. A card at bottom-left covered a whole
              row of the tools ledger on a 390px screen — the one entry the
              first viewport exists to show. A single-line bar sits under the
              page instead of on top of it. */}
          <div className="container mx-auto flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h2 className="sr-only" id="cookie-consent-title">
                Uso de cookies
              </h2>
              <p
                className="max-w-[70ch] font-sans text-sm leading-snug text-paper-dim"
                id="cookie-consent-description"
              >
                Uso cookies para medir el tráfico del sitio. Nada se carga hasta que decidas.
                Consulta la{" "}
                <Link
                  href="/cookies"
                  className="text-paper underline decoration-rule underline-offset-4 transition-colors hover:text-stamp-text"
                >
                  política de cookies
                </Link>{" "}
                y la{" "}
                <Link
                  href="/privacidad"
                  className="text-paper underline decoration-rule underline-offset-4 transition-colors hover:text-stamp-text"
                >
                  privacidad
                </Link>
                .
                {/* Reopened from the footer: say what is on file, so changing
                    a decision does not mean guessing at the current one. */}
                {analyticsActive !== null ? (
                  <span className="text-paper-faint">
                    {" "}
                    Ahora mismo: analítica{" "}
                    <span className="text-paper">
                      {analyticsActive ? "activada" : "desactivada"}
                    </span>
                    .
                  </span>
                ) : null}
              </p>
            </div>

            {/* Equal weight on purpose. A refusal that is harder to see than an
                acceptance is not a choice, and the two differ here only by the
                rule beneath them. */}
            <div className="flex shrink-0 items-center gap-5">
              <button
                type="button"
                onClick={() => decide(false)}
                className="min-h-[48px] touch-manipulation border-b-2 border-rule-strong px-1 font-mono text-[11px] tracking-[0.1em] text-paper uppercase transition-colors hover:text-stamp-text focus-visible:text-stamp-text"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={() => decide(true)}
                className="min-h-[48px] touch-manipulation border-b-2 border-stamp px-1 font-mono text-[11px] tracking-[0.1em] text-paper uppercase transition-colors hover:text-stamp-text focus-visible:text-stamp-text"
              >
                Aceptar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
