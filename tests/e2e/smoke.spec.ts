import { test, expect } from "@playwright/test"

test.describe("smoke", () => {
  test("home page loads with the expected title", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/Carrillo/i)
    await expect(page.locator("main")).toBeVisible()
  })

  test("contact page is reachable", async ({ page }) => {
    await page.goto("/contacto")
    await expect(page.locator("main")).toBeVisible()
  })

  /*
    This test was asserting against a page that no longer existed, in two ways
    at once — and it had been failing in a way nobody saw, because the browser
    binary was missing locally and every run died before reaching the assertion.

      1. The query parameter is `src`, not `tab`. `/recursos?tab=gitlab` is a
         parameter the page ignores, so GitHub stayed selected and the test was
         really asserting "the default tab is GitLab", which was never true.
      2. The tabs are hand-built `<button role="tab">`, not Radix `<Tabs>`, so
         they carry `aria-selected` and have no `data-state` at all. The old
         assertion could only ever read `null`.

    Both halves now match `src/app/recursos/page.tsx:187,229-233`, and the
    negative assertion is there so a regression that selects *everything* still
    fails.
  */
  test("resources page reads the source tab from the URL (nuqs)", async ({ page }) => {
    await page.goto("/recursos?src=gitlab")
    await expect(page.getByRole("tab", { name: /gitlab/i })).toHaveAttribute(
      "aria-selected",
      "true",
    )
    await expect(page.getByRole("tab", { name: /github/i })).toHaveAttribute(
      "aria-selected",
      "false",
    )
  })

  test("blog index renders the Substack register", async ({ page }) => {
    await page.goto("/blog")
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    // Every title on this page links off-site; none is rendered on this domain.
    await expect(page.locator("main")).toBeVisible()
  })

  test("an invalid API parameter is rejected, not proxied upstream", async ({ request }) => {
    // SAR F-004. `username` is interpolated into a GitHub API URL, so a path
    // segment in it must never reach the fetch.
    const bad = await request.get("/api/github-repositories?username=../orgs/github")
    expect(bad.status()).toBe(422)

    const good = await request.get("/api/github-repositories?username=carrilloapps")
    expect(good.status()).toBe(200)
  })
})
