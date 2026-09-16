/**
 * The consent decision, as data.
 *
 * This lives apart from the banner that writes it because three other places
 * need to read it — both analytics components and the footer's withdrawal
 * control — and `cookie-consent.tsx` carries Framer Motion. Importing the
 * component for a constant would pull the animation runtime into the footer
 * chunk, which is on every page, and undo the `dynamic()` the banner is loaded
 * behind. Nothing in this file imports React.
 */

/** Where the decision lives. */
export const CONSENT_STORAGE_KEY = "cookieConsent"

/** Fired after the stored decision changes, so the trackers react at once. */
export const CONSENT_CHANGED_EVENT = "cookieConsentChange"

/** Fired to reopen the banner — the footer's withdrawal control sends this. */
export const CONSENT_REOPEN_EVENT = "cookieConsentReopen"

/**
 * What the banner asked about.
 *
 * Bump it when the answer stops covering what the site actually loads — a new
 * vendor, a new purpose — and every stored decision is asked again. That is the
 * one promise the cookie policy makes about future changes, and without a
 * version there was no mechanism to keep it.
 */
export const CONSENT_VERSION = 1

export interface CookieConsentRecord {
  analytics: boolean
  functional: boolean
  version: number
  timestamp: string
}

/**
 * The stored decision, or null when there is none to honour.
 *
 * Every access is guarded. `localStorage` throws outright in a private window
 * with site data blocked, and a half-written or hand-edited value parses to
 * nonsense; both mean "no decision on file", which is the safe reading — until
 * someone says otherwise, nothing loads.
 */
export function readCookieConsent(): CookieConsentRecord | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<CookieConsentRecord>
    if (typeof parsed?.analytics !== "boolean") return null
    return {
      analytics: parsed.analytics,
      functional: parsed.functional === true,
      version: typeof parsed.version === "number" ? parsed.version : 0,
      timestamp: typeof parsed.timestamp === "string" ? parsed.timestamp : "",
    }
  } catch {
    return null
  }
}

/**
 * Record a decision and tell the page about it.
 *
 * A refusal is written down exactly like an acceptance. The previous banner
 * deliberately did not — its own comment said so: "don't save rejection, modal
 * will reappear on next page/reload… encourages acceptance" — so saying no
 * bought nothing and the question came back on every navigation until the
 * reader gave in.
 *
 * Returns whether the decision could be persisted. A `false` means storage
 * refused it and the answer will not outlive the tab; it never means the
 * decision may be ignored.
 */
export function writeCookieConsent(analytics: boolean): CookieConsentRecord {
  const record: CookieConsentRecord = {
    analytics,
    // Nothing here is gated behind a functional cookie: the only one is
    // Cal.com's, set when the reader opens the scheduler they asked for. The
    // field stays so the shape does not change under a stored decision.
    functional: true,
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
  }

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record))
  } catch {
    // Storage refused. The decision still holds for this page — the listeners
    // below act on the event, not on storage — it just cannot outlive the tab.
    // Failing to save a refusal must never become a reason to load anything.
  }

  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT))
  return record
}

/**
 * Whether measurement may run right now.
 *
 * Stricter than reading `analytics` on its own, and deliberately so: a stored
 * `true` that answered an earlier version of the question is not consent to
 * what the banner asks today. The cookie policy promises exactly this — that a
 * changed question is asked again "en lugar de dar por válida una respuesta a
 * otra pregunta" — so collection stops until the reader answers the current
 * one. Every tracker gates on this, never on the raw field.
 */
export function hasAnalyticsConsent(): boolean {
  const stored = readCookieConsent()
  return stored?.analytics === true && stored.version === CONSENT_VERSION
}

/** Reopen the banner so a decision can be changed. Safe to call anywhere. */
export function openCookiePreferences() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT))
}
