import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"

import { GET, POST } from "@/app/api/newsletter/route"
import { BLOG_SUBSCRIBE_URL } from "@/lib/substack-service"

/**
 * The newsletter route forwards to Substack, whose endpoint is undocumented.
 * These lock the branches that matter: which upstream shapes count as success,
 * which count as the reader's mistake, and that every other outcome hands back
 * the hosted subscribe page rather than a dead end.
 */

function request(body: unknown): Request {
  return new Request("http://localhost:3000/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  })
}

/** Stand in for one upstream answer. */
function upstream(status: number, json?: unknown) {
  return vi.fn().mockResolvedValue({
    status,
    ok: status >= 200 && status < 300,
    json: async () => json ?? {},
  } as unknown as Response)
}

let fetchSpy: ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe("GET /api/newsletter", () => {
  it("reports the newsletter as always available and hands back the fallback URL", async () => {
    const res = await GET()
    expect(res.status).toBe(200)
    await expect(res.json()).resolves.toEqual({
      configured: true,
      subscribeUrl: BLOG_SUBSCRIBE_URL,
    })
  })
})

describe("POST /api/newsletter — input validation", () => {
  it("rejects a malformed body with 400 and never calls upstream", async () => {
    fetchSpy = upstream(200)
    vi.stubGlobal("fetch", fetchSpy)

    const res = await POST(request("not json at all"))

    expect(res.status).toBe(400)
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it("rejects an address that fails EMAIL_RE with 422 and never calls upstream", async () => {
    fetchSpy = upstream(200)
    vi.stubGlobal("fetch", fetchSpy)

    const res = await POST(request({ email: "no-arroba" }))

    expect(res.status).toBe(422)
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it("trims and lowercases the address before forwarding it", async () => {
    fetchSpy = upstream(200, { didSignup: true })
    vi.stubGlobal("fetch", fetchSpy)

    await POST(request({ email: "  Persona@Ejemplo.COM  " }))

    const sent = JSON.parse(fetchSpy.mock.calls[0][1].body as string)
    expect(sent.email).toBe("persona@ejemplo.com")
    // The origin tag Substack shows in the publication dashboard.
    expect(sent.source).toBe("embed")
  })
})

describe("POST /api/newsletter — upstream outcomes", () => {
  it("treats a 200 with didSignup as a fresh subscription", async () => {
    vi.stubGlobal("fetch", upstream(200, { didSignup: true }))

    const res = await POST(request({ email: "nuevo@ejemplo.com" }))

    expect(res.status).toBe(200)
    await expect(res.json()).resolves.toEqual({ ok: true })
  })

  it("reports an address already on the list as success, not an error", async () => {
    vi.stubGlobal("fetch", upstream(200, { didSignup: false }))

    const res = await POST(request({ email: "repetido@ejemplo.com" }))

    expect(res.status).toBe(200)
    await expect(res.json()).resolves.toEqual({ ok: true, alreadySubscribed: true })
  })

  it("treats the nojs redirect as the success it is", async () => {
    vi.stubGlobal("fetch", upstream(302))

    const res = await POST(request({ email: "redirigido@ejemplo.com" }))

    expect(res.status).toBe(200)
    await expect(res.json()).resolves.toEqual({ ok: true })
  })

  it("translates Substack's 400 on the email field into a 422 the reader can act on", async () => {
    // The shape observed against the live endpoint: Substack checks the domain
    // resolves, which EMAIL_RE cannot.
    vi.stubGlobal(
      "fetch",
      upstream(400, {
        errors: [
          {
            location: "body",
            param: "email",
            value: "alguien@dominio-que-no-existe.invalid",
            msg: "We were unable to validate your email domain",
          },
        ],
      }),
    )

    const res = await POST(request({ email: "alguien@dominio-que-no-existe.invalid" }))

    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.error).toMatch(/dominio no existe/)
    // A reader mistake is not an outage, so no fallback link is offered.
    expect(body.subscribeUrl).toBeUndefined()
  })

  it("falls back to the hosted subscribe page when upstream errors", async () => {
    vi.stubGlobal("fetch", upstream(500))

    const res = await POST(request({ email: "alguien@ejemplo.com" }))

    expect(res.status).toBe(502)
    await expect(res.json()).resolves.toMatchObject({ subscribeUrl: BLOG_SUBSCRIBE_URL })
  })

  it("falls back when a 400 is not about the email field", async () => {
    vi.stubGlobal("fetch", upstream(400, { errors: [{ param: "captcha", msg: "required" }] }))

    const res = await POST(request({ email: "alguien@ejemplo.com" }))

    expect(res.status).toBe(502)
    await expect(res.json()).resolves.toMatchObject({ subscribeUrl: BLOG_SUBSCRIBE_URL })
  })

  it("falls back when the network throws rather than surfacing a 500", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("ECONNREFUSED")))

    const res = await POST(request({ email: "alguien@ejemplo.com" }))

    expect(res.status).toBe(502)
    await expect(res.json()).resolves.toMatchObject({ subscribeUrl: BLOG_SUBSCRIBE_URL })
  })

  it("never echoes the upstream error text to the client", async () => {
    vi.stubGlobal("fetch", upstream(500, { detail: "internal substack stack trace" }))

    const res = await POST(request({ email: "alguien@ejemplo.com" }))
    const body = await res.json()

    expect(JSON.stringify(body)).not.toMatch(/stack trace/)
  })
})
