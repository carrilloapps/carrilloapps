# Language

Confirmed by: José Carrillo (maintainer) — 2026-10-14

> The values below are **Documented**: they are the split `AGENTS.md` already
> records and the repository already follows, not a new decision. Confirm them
> by adding a `Confirmed by: <role or name> — <YYYY-MM-DD>` line right under
> this note, which is what turns the Phase 0 warning into a pass.

1. Artifacts (specs, plans, drafts) language: en
2. Gherkin keyword language: en
3. Epistemic labels: Verified, Documented, Proposed
4. "No attribution" phrase: no attribution available
5. Identifiers in code and file names: English, kebab-case for files and folders

## Why English for artifacts, when the product is in Spanish

The project runs a deliberate split, stated in `AGENTS.md` §4 and visible
throughout the tree:

| Layer                                            | Language        |
| ------------------------------------------------ | --------------- |
| Code identifiers                                 | `en_US`, always |
| Code comments, `docs/`, `AGENTS.md`, `DESIGN.md` | English         |
| Specs, plans, decision records                   | English         |
| UI copy, route slugs, user-facing strings        | Spanish         |
| Conversation with the maintainer                 | Spanish         |

Specs and plans sit on the engineering side of that line, so they follow the
documentation language. The site's own words stay Spanish — the slugs are
`servicios`, `sobre-mi`, `contacto`, and the writing is Spanish throughout.

Security assessments are the one exception already in use: the SAR under
`.memory/local/sar/` is written in Spanish because it was requested that way.
A per-artifact request beats this file.

Keyword tables → the skill's `frameworks/gherkin.md`.
