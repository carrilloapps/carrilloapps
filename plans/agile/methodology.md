# Methodology

Confirmed by: José Carrillo (maintainer) — 2026-10-14

> Kanban, continuous flow. This is a single-maintainer project, so everything
> below describes how **one person** keeps the work honest — not a ceremony
> schedule borrowed from a team that does not exist here.

## Cadence

1. Sprint length: not applicable — continuous flow
2. Report period: monthly, folder `plans/sprints/<YYYY>-M<NN>/`
3. Replenishment: on demand — the backlog is refilled when the board drops
   below the WIP limit, not on a fixed day. A weekly slot would be a meeting
   with one attendee.

## Flow

| Column      | WIP limit | Exit policy                                                  |
| ----------- | --------- | ------------------------------------------------------------ |
| Ready       | 5         | Meets `definition-of-ready.md`                               |
| In progress | 1         | Code and tests per `tasks.md`                                |
| Review      | 2         | Self-review plus `/code-review`; see `definition-of-done.md` |
| Done        | —         | Meets `definition-of-done.md`                                |

Exceeding a WIP limit is a blocker alert (N3, inform only).

**Why `In progress` is 1.** There is one pair of hands. A second item in
progress is not parallelism, it is a context switch with a nicer name, and the
cost shows up as half-finished branches. The `Review` limit is 2 because a
change can sit waiting on a deploy preview while the next one starts.

## Estimation

1. Scale: none — forecasting from cycle time (85th percentile) and weekly
   throughput
2. Split at: items expected to exceed the 85th-percentile cycle time
3. Agent forecasts: from `plans/agile/metrics/events.jsonl`, only after two full
   months of data. The log was created on 2026-10-14 and is empty, so **no
   forecast is available before December 2026**. Until then, any number an agent
   offers is `not measurable — no baseline`.

Story points are deliberately absent. They exist to let a team converge on
relative size; with one person there is nobody to converge with, and the number
would be a guess dressed as a measurement.

## Working agreements

1. **The quality gate runs before every commit, not at the end of a branch.**
   `npm run lint` at 0/0, `npm run build`, `npm test`, `npm run test:e2e`,
   `npm audit` clean. The whole set runs in a clean container —
   `Dockerfile.validate`.
2. **Ship from `main`.** Vercel deploys on push; there is no staging
   environment, so a broken `main` is a broken site.
3. **Documentation is updated in place**, in the same change. A second file on
   an existing topic is a defect (constitution, Article 10).
4. **The agent proposes; the maintainer commits.** No git write happens without
   an explicit approval of that exact operation and branch.
5. **An unknown stays an open question.** Neither the maintainer nor an agent
   fills a gap with a plausible value.

## Transcripts

1. Recording consent announced at the start of every session: not applicable —
   no meetings are recorded. Work arrives as written requests, not transcripts.
2. Retention of raw transcripts: not applicable — none are produced. If that
   changes, they go to `.memory/local/agentic-agile/transcripts/`, which is not
   versioned.
3. Classification: production-sensitive

## Language

See `language.md`.
