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

  test("resources page keeps filters in the URL (nuqs)", async ({ page }) => {
    await page.goto("/recursos?tab=gitlab")
    // The GitLab tab should be selected from the URL on load.
    await expect(page.getByRole("tab", { name: /gitlab/i })).toHaveAttribute("data-state", "active")
  })
})
