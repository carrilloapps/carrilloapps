# Definition of Ready

Confirmed by: José Carrillo (maintainer) — 2026-10-14

> An item is Ready only when every mandatory line is ✅ **explicitly** — never
> by inference. "It's obvious" is not a ✅.

## Mandatory

1. **Problem and value stated**, in one or two sentences, with who asked for it.
   Self-originated work is attributed to the maintainer; "it would be nice" is
   not a problem statement.
2. **Acceptance criteria in Gherkin**: happy path, one negative path per failure
   mode that is actually reachable, and the edge cases that apply. For a page,
   that includes what it renders when its upstream is down — this project proxies
   GitHub, GitLab and Substack, and all three fail in practice.
3. **Out of scope explicit.** The sentence that starts "this does not…".
4. **Dependencies identified**, including upstream APIs and their failure shape.
5. **Below the split threshold** in `methodology.md` — expected to finish inside
   the 85th-percentile cycle time. Until a baseline exists (December 2026), the
   test is simpler: if it cannot ship in one sitting, split it.
6. **No blocking open question.**

## Architectural (when the item changes code)

1. **Blast radius checked with `codegraph`**, not guessed. Constitution Article 1
   makes this non-negotiable: an edit proposed without looking at the callers is
   incomplete work.
2. **Public surface delta known** — route handlers, their cache window, and
   their error shape.
3. **It does not break the shared shell** (Article 2) or the design system
   (`DESIGN.md`). A new hero, a new background, or a Tailwind palette colour is
   not Ready, it is a defect waiting to be filed.
4. If there is a `specs/<initiative>/spec.md`, it passes `check-spec`.

## Not Ready when

1. Any criterion is **Proposed** and nobody confirmed it.
2. The item depends on data or a system nobody verified this session. If the
   capability that owns the data is down, the answer is "stop and ask", never a
   value from memory.
3. It requires persistent storage. This project has **no database** by
   constitutional constraint (Article 9); a feature that needs one needs an
   architecture decision in `plans/decisions/` first, not an ad-hoc client.
4. It would publish something the public repository should not carry — an open
   vulnerability, a credential, a private person's data.

## Deliberately not required

- **A team estimate.** There is no team to estimate with (`team.md`); the split
  threshold does that job.
- **A ticket in a tracker.** None is configured (`capabilities.md`). The item
  lives in `plans/initiatives/<initiative>/tickets/`.
