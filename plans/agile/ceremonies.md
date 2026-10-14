# Ceremonies

Confirmed by: José Carrillo (maintainer) — 2026-10-14

> A ceremony is a conversation between people. With one maintainer most of them
> have no second party, and holding them anyway produces a document nobody reads
> written by the only person who already knew. What survives are the two that
> are useful alone — looking at the flow, and looking back — plus the written
> record each change leaves behind.

| Ceremony             | When                                                 | Duration | Facilitator | Recorded? | Agent output                                                                  |
| -------------------- | ---------------------------------------------------- | -------- | ----------- | --------- | ----------------------------------------------------------------------------- |
| Standup at the board | not applicable                                       | —        | —           | no        | — (one person; the board is the standup)                                      |
| Replenishment        | on demand, when WIP drops                            | 15 min   | Maintainer  | no        | `plans/initiatives/<i>/tickets/`                                              |
| Delivery review      | not applicable                                       | —        | —           | no        | — (no stakeholder to review with; the deploy is the review)                   |
| Flow review          | last working day of the month                        | 30 min   | Maintainer  | yes       | `plans/sprints/<YYYY>-M<NN>/report.md` (cycle time, throughput, WIP breaches) |
| Retro                | last working day of the month, after the flow review | 30 min   | Maintainer  | yes       | `plans/sprints/<YYYY>-M<NN>/retro.md`                                         |

## Why three are marked "not applicable"

Marking a ceremony `not applicable` is a decision, not an omission — the Phase 0
gate accepts it precisely so a team does not have to pretend.

- **Standup.** Its purpose is to surface blockers to people who can unblock
  them. There is nobody else to tell.
- **Delivery review.** Its purpose is to show increments to stakeholders and
  collect feedback. The site ships to production on every push to `main`;
  feedback arrives as analytics and as messages, not in a meeting.
- **Replenishment** is kept but reduced to a slot taken when the board empties,
  not a weekly appointment.

## What replaces them

The written trail, which an agent can read and a meeting cannot:

- Each change carries its reasoning **at the call site**, not in a ticket.
- `plans/decisions/<date>-<slug>.md` holds anything with consequences beyond one
  change — an architecture call, a vendor choice, a postmortem.
- The monthly `report.md` is where cycle time and throughput get looked at, and
  it is the only place a trend is allowed to be claimed.

## Agent participation

The agent may **draft** the monthly report and retro from
`plans/agile/metrics/events.jsonl` and the git history (N2: it drafts, a human
edits and approves). It never closes an item, commits work, or decides priority
(N0) — see `autonomy.md`.
