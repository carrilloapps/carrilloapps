# KPI Directives

Confirmed by: José Carrillo (maintainer) — 2026-10-14

> The agent computes only the KPIs defined here, with the counting rules written
> here. Anything not in this table does not get a number.

| KPI               | Definition                                            | Counting rule                                                        | Source                       | Threshold (only after 2 baseline cycles) |
| ----------------- | ----------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------- | ---------------------------------------- |
| Cycle time        | First commit on the item → merged into `main`, median | Working days, 85th percentile reported alongside the median          | git history + `events.jsonl` | — (no baseline)                          |
| Throughput        | Items meeting the DoD per month                       | Counted on the month the merge landed, never on the month it started | `events.jsonl`               | — (no baseline)                          |
| WIP breaches      | Times `In progress` exceeded 1                        | One per crossing, not per day held                                   | `events.jsonl`               | — (no baseline)                          |
| Gate failures     | Pipeline runs that failed the quality gate            | Per run; a rerun of the same commit counts once                      | local `Dockerfile.validate`  | — (no baseline)                          |
| Escaped defects   | Defects found after a merge to `main`                 | Attributed to the month of the **merge**, not the month found        | `plans/decisions/` + git     | — (no baseline)                          |
| Unreachable files | Files no route reaches                                | The import walk in `docs/DESIGN_STATUS.md` §3                        | repository                   | 0 new per month                          |

## Not measured here, and why

| Removed KPI                    | Reason                                                                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Velocity                       | `not measurable — no estimation scale`. `methodology.md` forecasts from cycle time instead of points; velocity without points is a number with no unit. |
| Carry-over                     | `not measurable — no sprint boundary`. Continuous flow has nothing to carry over; the equivalent signal is cycle time's tail.                           |
| Any KPI sourced from a tracker | `not measurable — no tracker configured` (`capabilities.md`).                                                                                           |

## Gate zero

A measure that is invalid or incomplete gets **no state and no number**: write
`not measurable — <reason>`. This is the rule most likely to be broken under
pressure to show a dashboard, and breaking it is worse than an empty cell —
a wrong number gets acted on, a blank one gets asked about.

Classify work by initiative, not by commit prefix. A `fix:` prefix says what the
commit does, not which initiative paid for it.

## Baseline status

`plans/agile/metrics/events.jsonl` was created empty on **2026-10-14**. No KPI
above has a threshold and none will until two full monthly cycles are logged —
**December 2026 at the earliest**. Until then every row answers
`not measurable — no baseline`, and an agent that offers a trend is inventing
one.

## What is already measured, outside this table

These are engineering gates rather than flow KPIs, and they are enforced per
change (`definition-of-done.md`), not reported monthly:

- Lint 0 errors / 0 warnings · strict TypeScript · `npm audit` clean
- Lighthouse accessibility ≥ 95 (currently 100 on mobile)
- SonarQube: 0 bugs, 0 vulnerabilities, 0 security hotspots, duplication 0.17%
