import { describe, it, expect } from "vitest"

import { BLOG_SUBSCRIBE_URL, BLOG_URL, blogSubscribeUrl } from "@/lib/substack-service"

/**
 * The newsletter has no backend: every form on the site hands the address to
 * Substack through this URL. It is the whole contract, so it is worth locking —
 * the previous implementation posted to an endpoint that answered `200` while
 * subscribing nobody, and the site reported success for weeks.
 */
describe("blogSubscribeUrl", () => {
  it("points at the publication's own subscribe page", () => {
    expect(BLOG_URL).toBe("https://blog.carrillo.app")
    expect(BLOG_SUBSCRIBE_URL).toBe("https://blog.carrillo.app/subscribe")
  })

  it("carries the address in the query string, so Substack prefills the field", () => {
    expect(blogSubscribeUrl("alguien@ejemplo.com")).toBe(
      "https://blog.carrillo.app/subscribe?email=alguien%40ejemplo.com",
    )
  })

  it("encodes an address that would otherwise break the query string", () => {
    // A plus address is the common case, and a bare `+` decodes as a space.
    expect(blogSubscribeUrl("junior+boletin@carrillo.app")).toBe(
      "https://blog.carrillo.app/subscribe?email=junior%2Bboletin%40carrillo.app",
    )
  })

  it("falls back to the bare subscribe page when there is no address", () => {
    expect(blogSubscribeUrl()).toBe(BLOG_SUBSCRIBE_URL)
    expect(blogSubscribeUrl("")).toBe(BLOG_SUBSCRIBE_URL)
  })
})
