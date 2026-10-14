# Capabilities

Confirmed by: José Carrillo (maintainer) — 2026-10-14

> Filled by the team. Which tool fills each capability slot, and which third-party capabilities are authorized. Never put secrets here.
>
> When the team confirms this file, add a line `Confirmed by: <role or name> — <YYYY-MM-DD>` right below this note.

## Slots

Every slot is answered. `none` and `not applicable` are real answers under
`agentic-agile`, not blanks — a slot nobody fills is an open question that keeps
the Phase 0 gate closed, while a slot answered `none` is a decision an agent can
act on. The difference matters: `none` tells `fanout` to ask instead of assume.

| Slot                       | Tool / MCP                                 | Version | Config file (project-level) | Owning or enrichment |
| -------------------------- | ------------------------------------------ | ------- | --------------------------- | -------------------- |
| Tracker                    | none                                       | —       | —                           | owning               |
| Docs                       | `docs/` in-repo                            | —       | —                           | owning               |
| Chat                       | none                                       | —       | —                           | enrichment           |
| Observability              | Vercel Analytics · GA4 · Microsoft Clarity | —       | `src/components/analytics/` | enrichment           |
| Transcript source          | not applicable                             | —       | —                           | owning (for drafts)  |
| Warehouse / semantic layer | none                                       | —       | —                           | enrichment           |
| Code graph                 | `codegraph` (MCP)                          | latest  | `.mcp.json`                 | enrichment           |
| Doc / memory graph         | `docgraph` (MCP)                           | latest  | `.mcp.json`                 | enrichment           |
| Search                     | none                                       | —       | —                           | enrichment           |
| Model · small              | not applicable                             | —       | —                           | owning               |
| Model · default            | not applicable                             | —       | —                           | owning               |
| Model · deep               | not applicable                             | —       | —                           | owning               |
| Agent runner               | Claude Code                                | —       | `.mcp.json`, `.claude/`     | owning               |

## Why several slots are `none`

Not gaps — the shape of a single-maintainer side project:

- **Tracker.** No issue tracker is configured. Work items live in
  `plans/initiatives/<initiative>/tickets/`, versioned in this repository. Any
  KPI that would be sourced from a tracker is `not measurable` by definition
  (`kpi-directives.md`).
- **Chat.** There is no team channel to read from, so there are no threads to
  turn into drafts and no transcripts to normalise.
- **Warehouse / Search.** The site has **no database** (constitution,
  Article 9). Its data comes from static arrays in `src/lib/data/` and from
  route handlers proxying GitHub, GitLab and Substack. There is nothing to
  query and nothing to index.
- **Transcript source.** No meetings are recorded (`methodology.md`).

## Why the three model slots are `not applicable`

`scripts/fanout` reads them to route a brief to the cheapest capable model. This
project does not fan work out across models — one agent session does the work
end to end — so declaring a routing table would describe a pipeline that does
not exist. With `not applicable`, fanout asks for the model at the time instead
of assuming one, which is the behaviour the skill documents for exactly this
case.

**Observability** deserves one caveat: GA4, Clarity and Vercel Analytics measure
_visitors_, not system health. There is no error-rate alert and no uptime check,
so an agent must not answer a question about production health from them. That
gap is recorded in the constitution as Article 7, which is **Proposed** rather
than confirmed precisely because it is not yet true.

## Authorized third-party capabilities (four questions)

| Name | Provider | Version | Data reached | Write permissions | Processing & retention | Internal owner | Approved on | Approved by | Review on |
| ---- | -------- | ------- | ------------ | ----------------- | ---------------------- | -------------- | ----------- | ----------- | --------- |

## Team capability catalogue

| Capability                 | Have it? | Maturity | Procedure |
| -------------------------- | -------- | -------- | --------- |
| Conversation → work item   |          |          |           |
| Adversarial refinement     |          |          |           |
| Defect from a thread       |          |          |           |
| Sprint summary             |          |          |           |
| Estimation against history |          |          |           |
| Blocker detection          |          |          |           |
| Changelog                  |          |          |           |
| Decision record            |          |          |           |
