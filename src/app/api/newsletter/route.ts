import { NextResponse } from "next/server"
import { BLOG_SUBSCRIBE_URL, BLOG_URL } from "@/lib/substack-service"
import { getSiteUrl } from "@/lib/env"

// Node runtime so the upstream call and its manual redirect handling behave
// the same in development and on Vercel.
export const runtime = "nodejs"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * The endpoint Substack's own embed form posts to.
 *
 * This is the form at `${BLOG_URL}/embed`, whose markup posts to
 * `/api/v1/free?nojs=true` with an `email` field. It is NOT a documented or
 * versioned API — Substack publishes no public write API for subscriptions —
 * so it can change or start demanding a challenge without notice. Everything
 * below is written to fail into `BLOG_SUBSCRIBE_URL` rather than to trust a
 * particular response shape.
 */
const SUBSCRIBE_ENDPOINT = `${BLOG_URL}/api/v1/free`

/**
 * Newsletter subscription, forwarded to Substack.
 *
 * The subscriber lands in the same list that powers blog.carrillo.app, so the
 * site and the publication never hold two diverging audiences, and Substack
 * sends its own confirmation mail — this route stores no address anywhere.
 *
 * Rule 5 of AGENTS.md puts every upstream call in a route handler, which is
 * also what makes the swap invisible: the client contract below is unchanged
 * from the Mailchimp version, so `useNewsletterSubscribe` never noticed.
 */
export async function POST(request: Request) {
  let email = ""
  try {
    const body = await request.json()
    email = String(body?.email ?? "")
      .trim()
      .toLowerCase()
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 })
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Correo electrónico inválido." }, { status: 422 })
  }

  const site = getSiteUrl()

  try {
    const res = await fetch(SUBSCRIBE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        // The hidden fields Substack's embed form carries. `source` is what
        // tags the subscriber's origin in the publication's dashboard.
        source: "embed",
        first_url: site,
        current_url: site,
        first_referrer: "",
        current_referrer: "",
      }),
      // The `nojs` path answers with a 302 to a confirmation page. Following it
      // would turn a success into an opaque HTML fetch, so redirects are read
      // as the success they are.
      redirect: "manual",
    })

    /*
      Observed against the live endpoint: an accepted address answers `302` with
      `location: /`, and it answers that way whether the address is new or
      already on the list — Substack does not distinguish the two here, even
      when the request asks for JSON. A 2xx is accepted on the same terms in
      case the endpoint ever answers in the shape its name suggests; either way
      the caller learns only that it worked.
    */
    if (res.status >= 200 && res.status < 400) {
      return NextResponse.json({ ok: true })
    }

    /*
      Substack answers a rejected address with 400 and
      `{ "errors": [{ "param": "email", "msg": "..." }] }`. That is the reader's
      problem, not an outage: their validation checks the domain resolves, which
      EMAIL_RE above cannot. Surfacing it as 422 lets them fix the typo instead
      of being told the newsletter is down.
    */
    if (res.status === 400) {
      const data = (await res.json().catch(() => ({}))) as {
        errors?: { param?: string; msg?: string }[]
      }
      if (data?.errors?.some((e) => e.param === "email")) {
        return NextResponse.json(
          { error: "Ese correo no es válido o su dominio no existe." },
          { status: 422 },
        )
      }
    }

    console.error("Substack subscribe failed:", res.status)
  } catch (error) {
    console.error("Substack subscribe request failed:", error)
  }

  /*
    The undocumented endpoint moved, started challenging, or the network died.
    Rather than tell the reader the newsletter is broken, hand back the hosted
    subscribe page so the UI can send them somewhere that always works.
  */
  return NextResponse.json(
    {
      error: "No pudimos completar la suscripción aquí.",
      subscribeUrl: BLOG_SUBSCRIBE_URL,
    },
    { status: 502 },
  )
}
