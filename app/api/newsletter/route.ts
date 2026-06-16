import { NextResponse } from "next/server"
import crypto from "node:crypto"
import { privateEnv } from "@/lib/env"

// Mailchimp's Marketing API requires a Node runtime (crypto + Buffer + Basic auth).
export const runtime = "nodejs"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isConfigured(): boolean {
  return Boolean(
    privateEnv.MAILCHIMP_API_KEY &&
      privateEnv.MAILCHIMP_AUDIENCE_ID &&
      privateEnv.MAILCHIMP_SERVER_PREFIX
  )
}

/**
 * Lightweight probe so the client can render the right UI without exposing any
 * secret: returns only whether the newsletter is wired up. When false, the
 * form shows a "coming soon" state and disables the subscribe button.
 */
export async function GET() {
  return NextResponse.json({ configured: isConfigured() })
}

/**
 * Newsletter subscription endpoint backed by Mailchimp's Marketing API.
 *
 * The integration is fully wired — it only needs credentials in the
 * environment to go live:
 *   - MAILCHIMP_API_KEY        (e.g. "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us21")
 *   - MAILCHIMP_AUDIENCE_ID    (the target list / audience id)
 *   - MAILCHIMP_SERVER_PREFIX  (the datacenter suffix of the key, e.g. "us21")
 *
 * Until those are set the route responds 503 so the UI can show a friendly
 * "not configured yet" message instead of failing silently.
 */
export async function POST(request: Request) {
  let email = ""
  try {
    const body = await request.json()
    email = String(body?.email ?? "").trim().toLowerCase()
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 })
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Correo electrónico inválido." }, { status: 422 })
  }

  const { MAILCHIMP_API_KEY: apiKey, MAILCHIMP_AUDIENCE_ID: audienceId, MAILCHIMP_SERVER_PREFIX: serverPrefix } =
    privateEnv

  if (!apiKey || !audienceId || !serverPrefix) {
    return NextResponse.json(
      { error: "El newsletter aún no está configurado." },
      { status: 503 }
    )
  }

  // Mailchimp addresses members by the MD5 hash of the lowercased email; using
  // PUT on that resource upserts the member idempotently (no duplicates).
  const subscriberHash = crypto.createHash("md5").update(email).digest("hex")
  const endpoint = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`
  const auth = Buffer.from(`anystring:${apiKey}`).toString("base64")

  try {
    const res = await fetch(endpoint, {
      method: "PUT",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        // status_if_new only applies to brand-new members; existing members
        // keep their current status. Switch to "pending" for double opt-in.
        status_if_new: "subscribed",
      }),
    })

    if (res.ok) {
      return NextResponse.json({ ok: true })
    }

    const data = (await res.json().catch(() => ({}))) as {
      title?: string
      detail?: string
    }

    // Address was previously subscribed — treat as success for the user.
    if (data?.title === "Member Exists") {
      return NextResponse.json({ ok: true, alreadySubscribed: true })
    }

    console.error("Mailchimp error:", res.status, data?.title, data?.detail)
    return NextResponse.json(
      { error: "No pudimos completar la suscripción." },
      { status: 502 }
    )
  } catch (error) {
    console.error("Mailchimp request failed:", error)
    return NextResponse.json(
      { error: "No pudimos completar la suscripción." },
      { status: 502 }
    )
  }
}
