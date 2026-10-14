# Autonomy

Confirmed by: José Carrillo (maintainer) — 2026-10-14

> Autonomy is set by the cost of being wrong, not by how capable the agent
> feels. This project ships straight to production on every push to `main` with
> no staging environment, so the cost of a wrong write is a broken public site —
> which is why nothing that writes outside this session is above N2.

## Levels per task

| Task                                     | Level | Reason for deviation from default                                                                                                                   |
| ---------------------------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Transcribe and summarise sessions        | N1    |                                                                                                                                                     |
| Draft a work item from a conversation    | N2    |                                                                                                                                                     |
| Adversarial refinement                   | N2    |                                                                                                                                                     |
| Create a defect from a thread            | N2    | Default is N3. No tracker exists, so "creating a defect" means writing a file into `plans/` — a versioned, public artifact. Drafted, then approved. |
| Monthly changelog                        | N2    | Default is N3. `CHANGELOG.md` is user-facing and public; it is drafted and read before it ships.                                                    |
| Detect blockers and notify               | N3    | Informing costs nothing and reverses instantly                                                                                                      |
| Order the backlog by impact              | N2    |                                                                                                                                                     |
| Estimate (after the vote)                | N2    | No vote to wait for; the agent's figure is a proposal with its reasoning                                                                            |
| Edit source code in the working tree     | N3    | Reversible through git, visible in the diff, and gated by lint/build/test before it can land                                                        |
| Any git write (commit, push, tag, merge) | N0    | Never delegated, regardless of session permissions or auto-approve mode                                                                             |
| Deploy                                   | N0    | Deploy is a push to `main`; see above                                                                                                               |
| Close or transition items                | N0    | never delegated                                                                                                                                     |
| Final prioritisation                     | N0    | never delegated                                                                                                                                     |
| Publish anything outside the repository  | N0    | Posting, sharing, or sending to a third party is irreversible once it leaves                                                                        |

**The one that is easy to get wrong.** Editing files is N3 and committing them
is N0, which looks inconsistent until you see where the line is: an edit sits in
the working tree where the maintainer can read the diff and `git checkout` it. A
commit enters history, and a push reaches a public repository and a live site.
The gate is at the point of no return, not at the point of typing.

## Adoption

**Current phase**: 2 — _Draft and question_ — since 2026-10-14.

The agent drafts specs, plans, reports, and code; the maintainer edits, approves,
and commits. Phase 3 (_write into the tools_) is not reachable yet: it requires a
measured baseline over two full cycles, and the event log started empty on
2026-10-14.

| #   | Precondition                                 | Status                                                                                           | Owner      |
| --- | -------------------------------------------- | ------------------------------------------------------------------------------------------------ | ---------- |
| 1   | Transcription active in recurring ceremonies | **not applicable** — no meetings are recorded                                                    | Maintainer |
| 2   | Programmatic access to transcripts           | **not applicable** — none exist                                                                  | Maintainer |
| 3   | Retention and classification policy          | ✅ `methodology.md` §Transcripts                                                                 | Maintainer |
| 4   | Recording consent announced                  | **not applicable** — nothing is recorded                                                         | Maintainer |
| 5   | Pilot scope agreed                           | ✅ this repository, under the gate in `definition-of-done.md`                                    | Maintainer |
| 6   | Third-party capabilities authorized          | ⚠️ partial — `capabilities.md` lists what is configured; the slots left open are open on purpose | Maintainer |
| 7   | Baseline over two full cycles                | ❌ not started — `events.jsonl` created empty 2026-10-14; earliest December 2026                 | Maintainer |

Precondition 7 is the one that gates Phase 3, and nothing can shortcut it: a
baseline is elapsed time, not effort.
