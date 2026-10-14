"use client"

import { useCallback, useState } from "react"

/**
 * Client-side submit throttle: by default three attempts a minute.
 *
 * This existed twice, character for character, in `src/app/contacto/page.tsx`
 * and `src/components/newsletter-form.tsx` — the second copy even carried the
 * comment "as on /contacto", which is a duplicate announcing itself. Two copies
 * of a rule means the day someone tunes one, the forms silently disagree.
 *
 * What it is and is not: this stops a careless double-submit and a naive bot.
 * It does not stop anyone who reloads the page, and it cannot — the state lives
 * in React. The forms it guards compose a WhatsApp message or hand off to
 * Substack rather than writing anywhere, so there is nothing behind them to
 * protect; real rate limiting for the route handlers belongs at the edge
 * (Cloudflare / Vercel WAF), not here.
 */
export function useRateLimit(limit = 3, windowMs = 60_000) {
  const [attempts, setAttempts] = useState<number[]>([])

  const isLimited = useCallback(
    () => attempts.filter((t) => Date.now() - t < windowMs).length >= limit,
    [attempts, limit, windowMs],
  )

  const recordAttempt = useCallback(
    () => setAttempts((prev) => [...prev.filter((t) => Date.now() - t < windowMs), Date.now()]),
    [windowMs],
  )

  return { isLimited: isLimited(), recordAttempt }
}
