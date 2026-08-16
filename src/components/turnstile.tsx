"use client"

import Script from "next/script"
import { useEffect, useId, useRef, useState } from "react"

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string
          theme?: "light" | "dark" | "auto"
          language?: string
          callback: (token: string) => void
          "expired-callback"?: () => void
          "error-callback"?: () => void
        },
      ) => string
      remove: (id: string) => void
      reset: (id?: string) => void
    }
  }
}

interface TurnstileProps {
  /** Fires with the token, or with "" when it expires or fails. */
  onVerify: (token: string) => void
  className?: string
}

/**
 * Cloudflare Turnstile, wired but dormant.
 *
 * The widget only mounts when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set. Without
 * it this renders nothing and the form behaves exactly as it does today, so the
 * integration can sit in the codebase until the key exists — which is the point:
 * adding the captcha later becomes one environment variable, not a code change
 * under time pressure.
 *
 * Two things will need doing on the day the key lands:
 *   1. Allow `https://challenges.cloudflare.com` in `script-src` and `frame-src`
 *      in the CSP in `next.config.mjs`. Turnstile renders inside an iframe from
 *      that origin and the current policy would block it.
 *   2. Verify the token server-side. A token that only the browser checks is
 *      decoration; the check belongs in a route handler that calls
 *      `siteverify` before the message is accepted.
 */
export function Turnstile({ onVerify, className = "" }: TurnstileProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const [ready, setReady] = useState(false)
  const hostRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const reactId = useId()

  useEffect(() => {
    if (!siteKey || !ready || !hostRef.current || widgetId.current) return

    widgetId.current =
      window.turnstile?.render(hostRef.current, {
        sitekey: siteKey,
        theme: "dark",
        language: "es",
        callback: (token) => onVerify(token),
        "expired-callback": () => onVerify(""),
        "error-callback": () => onVerify(""),
      }) ?? null

    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current)
      widgetId.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey, ready])

  if (!siteKey) return null

  return (
    <div className={className}>
      <p className="font-mono text-[10px] tracking-[0.16em] text-paper-faint uppercase">
        Verificación
      </p>
      <div ref={hostRef} id={`turnstile-${reactId}`} className="mt-3" />
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="lazyOnload"
        onReady={() => setReady(true)}
      />
    </div>
  )
}

/** True when the captcha is configured, so a form can require its token. */
export const isTurnstileEnabled = () => !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
