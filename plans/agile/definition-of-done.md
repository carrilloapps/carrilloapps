# Definition of Done

Confirmed by: José Carrillo (maintainer) — 2026-10-14

> Closing an item against this list is a human decision (N0). An agent may show
> that every line passes; it may not declare the item done.
>
> **This list was adapted, not copied.** The skill's default DoD requires 100%
> unit coverage and a mutation score on changed files. This project has 23 unit
> tests and 5 end-to-end specs across 127 modules — confirming that default
> would mean every future item failed its DoD on day one, and a gate nobody can
> pass is a gate nobody uses. What follows is the gate this project actually
> holds, plus the coverage ambition recorded honestly as an ambition.

## Code

1. Implements the spec without expanding it.
2. `npm run lint` ends **0 errors and 0 warnings**. "Only warnings" is a failing
   state (constitution, Article 4).
3. `npm run build` succeeds under strict TypeScript. No `any`, no unused imports
   or variables.
4. No Tailwind palette colour, no `ring-*` utility, no hand-rolled focus ring —
   the ledger tokens and the outline (`DESIGN.md`).
5. Complexity ≤ 10, functions ≤ 30 lines, ≤ 3 parameters, nesting ≤ 3 — or the
   exception written at the call site with its reason.

## Tests

1. `npm test` and `npm run test:e2e` pass.
2. **Every bug fixed carries a regression test.** This is the rule that matters
   most here: the suite is small, so it grows by defect, not by quota. The
   unescaped-pipe bug in `language-detector.ts` lived for months precisely
   because nothing covered it.
3. Every `@P1` scenario has a passing end-to-end test.
4. No test is skipped or quarantined without a dated reason in the same file.

**Coverage — recorded ambition, not a gate.** Coverage is not measured today and
no threshold is enforced. Introducing one means first writing the tests to meet
it; until that work is scheduled, claiming a coverage gate would be theatre. The
honest statement is: _coverage is unmeasured; `src/lib/` and `src/app/api/` are
the first targets when it is._

## Review

1. Self-review of the full diff before committing — there is no second approver
   (`team.md`).
2. `/code-review` run on anything touching a route handler, the design system,
   or more than three files.
3. `devils-advocate` consulted at tier 1 or above before acting.

## Verification

1. If the item has a `specs/<initiative>/`, `verification.md` has a row per
   scenario with its evidence.
2. Verdict ✅, or ⚠️ with a dated follow-up.

## Documentation

1. Docs updated **in place**, in the same change. A second file on an existing
   topic is a violation (Article 10).
2. If a component moved, was added or removed, `src/components/AGENTS.md` is
   updated in the same commit. That file once listed thirty files that no longer
   existed; a map that lies is worse than no map.
3. Otherwise `N/A — reason`.

## Out of scope respected

1. Nothing outside the spec shipped silently. A change that "while I was in
   there" also renamed something, bumped something, or tidied something is two
   items pretending to be one — and the second one never got a Ready check.

## Security

1. `npm audit` reports no advisory at high or above.
2. No secret, token or personal datum added to source, logs, or responses — and
   none committed to a **public** repository by accident.
3. If the change touches a route handler, its input is validated before it
   reaches an upstream URL, and its failure answers an honest status code. A
   `200` carrying invented data is the defect `/api/gitlab-repositories` shipped
   for months.

## Not Done when

1. A quality gate was lowered instead of met.
2. A scenario lacks evidence.
3. A ⚠️ verdict has no follow-up plan.
4. The change works but nothing explains **why** it was made that way, in the
   place the next reader will look.
