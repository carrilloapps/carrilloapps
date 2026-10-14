# `specs/`

Feature specifications, one directory per initiative, produced by the
[`agentic-agile`](../.claude/skills/agentic-agile/SKILL.md) skill.

Spec-kit was removed on 14 October 2026. It had been installed since August and
never used: this directory held only a README, and `import-speckit` found no
features to migrate. Its constitution moved to
[`plans/agile/constitution.md`](../plans/agile/constitution.md), which is where
`agentic-agile` expects it.

---

## Layout

`<initiative>` is kebab-case and identical here and in
`plans/initiatives/<initiative>/`.

```text
specs/<initiative>/
├── spec.md                     problem, FR-### with P1/P2/P3, Gherkin scenarios
│                               tagged @FR-### @P#, out of scope, SC-### mapped
│                               to scenarios, constraints, attributed
│                               clarifications, open questions
├── requirements-checklist.md   every FR/SC accounted for
├── design.md                   including the Constitution check
├── domain-model.md
├── contracts/                  public surfaces, defined before implementation
├── process.md
├── tasks.md
├── implementation.md           optional
├── verification.md             evidence that each FR has a passing test
└── dispatch.md + dispatch/<D###>-<slug>.md    fan-out briefs
```

## Before writing anything here

The Phase 0 gate must pass:

```bash
bash .claude/skills/agentic-agile/scripts/check-structure.sh --root .
```

It checks that `plans/agile/` is complete — methodology, definition of ready,
definition of done, ceremonies, team with capacity, capabilities, KPI
directives, language, autonomy, constitution, hooks — with no `<placeholders>`
and no `TBD`. While the gate is closed, nothing is created under `specs/` or
`plans/` except `plans/agile/` itself.

That is deliberate: a spec written against an undefined definition of done is a
document nobody can check.

## Versioning

`specs/` and `plans/` are **versioned**. They are reviewed in pull requests and
keep their history — and this repository is public, so a roadmap written here is
a roadmap published. Transcripts and anything personal go to
`.memory/local/agentic-agile/`, which is not versioned.
