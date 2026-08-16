# specs/

Feature specifications produced by the `speckit-*` skills. One directory per
feature, created by `.specify/scripts/bash/create-new-feature.sh` (invoked by
`/speckit-specify`), numbered sequentially:

```text
specs/001-<feature-slug>/
  spec.md        # /speckit-specify  — what and why, no implementation detail
  plan.md        # /speckit-plan     — technical approach and design artifacts
  tasks.md       # /speckit-tasks    — dependency-ordered, actionable work items
  checklists/    # /speckit-checklist (optional)
```

Every artifact here is checked against `.specify/memory/constitution.md`.
The toolchain that generates them lives in `.specify/` and is regenerated with
`npm run skills:speckit`; only this directory and the constitution are
versioned.
