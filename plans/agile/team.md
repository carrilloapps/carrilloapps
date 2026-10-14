# Team

Confirmed by: José Carrillo (maintainer) — 2026-10-14

> One maintainer. Every role below is the same person, which is the single most
> important fact for an agent working here: there is nobody to hand a decision
> to, no second reviewer, and no separate QA to catch what the author missed.
> Plan accordingly — the agent's adversarial pass (`devils-advocate`) is doing
> the job a second pair of eyes would do on a team.

| Role          | Name          | Areas owned                                             | Usual capacity (days/month) | Notes                                       |
| ------------- | ------------- | ------------------------------------------------------- | --------------------------- | ------------------------------------------- |
| Maintainer    | José Carrillo | Everything: product, architecture, code, review, deploy | Variable                    | This is a side project, not a staffed team  |
| Product owner | — same person | Scope and priority                                      | Variable                    | Prioritisation is never delegated (N0)      |
| Reviewer      | — same person | Review, with `/code-review` and `devils-advocate`       | Variable                    | Self-review; no second human approver       |
| QA            | — none        | —                                                       | —                           | Covered by the automated gate, not a person |

**Capacity is `Variable` on purpose.** It is a valid answer under
`agentic-agile`, and the honest one: this is work done around a full-time job,
so hours per month are not a number anyone can commit to in advance. An agent
must not forecast delivery dates from it, and must not treat its absence as
something to fill in.

Time off and support load are not tracked. If a month's capacity matters for a
decision, it is recorded in that month's `plans/sprints/<YYYY>-M<NN>/report.md`,
not here.

## What this means in practice

- **No handoffs.** An item does not change hands; it changes state.
- **Review is structural, not social.** There is no approver to convince, so the
  gate has to be mechanical: the checks in `definition-of-done.md` either pass
  or they do not.
- **The bus factor is 1.** This is why the constitution insists on written
  reasons at the call site and why `docs/` is kept accurate — the codebase has
  to explain itself to the person who comes back to it in six months, who may
  well be an agent.
