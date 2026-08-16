"use client"

/**
 * The page's ground: ledger paper, inverted.
 *
 * Accounting paper is ruled, never lit. This replaces the previous four
 * gradient orbs — a glow field belongs to a different world and would put
 * colour into the text field, which this one keeps achromatic. What remains is
 * the column structure the entries sit on and a single stamp-red margin rule.
 *
 * Everything here is a 1px hairline at low opacity, painted once with CSS
 * gradients: no blur, no animation, no paint cost on scroll.
 */
export function DynamicBackground() {
  return (
    <div aria-hidden="true">
      {/* Ink ground. */}
      <div className="fixed inset-0 -z-50 bg-ink" />

      {/* Column rules — the ledger's vertical structure. */}
      <div
        className="fixed inset-0 -z-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, var(--ledger-rule) 0 1px, transparent 1px 12.5%)",
          opacity: 0.28,
        }}
      />

      {/* Row rules — wider than the columns, so the grid reads as a ledger
          rather than as graph paper. */}
      <div
        className="fixed inset-0 -z-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--ledger-rule) 0 1px, transparent 1px 8rem)",
          opacity: 0.16,
        }}
      />

      {/* The margin rule. One stamp-red line, the only colour in the ground.
          It sits just inside the container gutter so it rules a margin rather
          than slicing through the writing. */}
      <div
        className="fixed inset-y-0 -z-30 hidden w-px xl:block"
        style={{
          left: "max(1.25rem, calc((100vw - 1400px) / 2 + 1.25rem))",
          backgroundColor: "var(--ledger-stamp)",
          opacity: 0.3,
        }}
      />

      {/* Vignette: the sheet falls off at the edges so long pages do not read
          as an infinite grid. */}
      <div
        className="fixed inset-0 -z-30"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, transparent 40%, var(--ledger-ink) 100%)",
        }}
      />
    </div>
  )
}
