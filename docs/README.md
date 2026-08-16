# carrillo.app Documentation

Documentation index and **context-loading protocol** for AI agents.

`AGENTS.md` at the repo root is deliberately short: it holds identity, hard
rules and routing. The depth lives here, so an agent loads only the pages a
given task actually needs instead of carrying 700 lines of context into every
conversation.

---

## Before anything else

### 1. Query the indexes, do not guess

Constitution Principle I. Two MCP servers exist precisely so you never have to
grep blind:

| Question                                                 | Tool                                              |
| -------------------------------------------------------- | ------------------------------------------------- |
| "Where is X? What calls it? What breaks if I change it?" | **codegraph** → `codegraph_explore`               |
| "How does this project do X? Is it documented?"          | **docgraph** → `search`, `explore`, `get_related` |

`codegraph_explore` returns verbatim source **and** the blast radius in one
round-trip — treat what it returns as already read. Grep and open files only for
what the indexes cannot answer.

Setup and full tool list: [AGENT_TOOLING.md](AGENT_TOOLING.md).

### 2. Read the constitution

[`.specify/memory/constitution.md`](../.specify/memory/constitution.md) defines
the five non-negotiable principles and supersedes every other document,
including this one. `/speckit-analyze` and `/speckit-implement` check work
against it. Read it before planning, not after being told a plan violates it.

---

## Load by task

Pull the page that matches what you are doing. Do not preload the set.

| Task                                     | Read                                                                           |
| ---------------------------------------- | ------------------------------------------------------------------------------ |
| Create or restructure a page             | [PAGE_CONSISTENCY.md](PAGE_CONSISTENCY.md)                                     |
| Style, spacing, colors, motion           | [PAGE_CONSISTENCY.md](PAGE_CONSISTENCY.md) §4                                  |
| Accessibility rules                      | [PAGE_CONSISTENCY.md](PAGE_CONSISTENCY.md) §5                                  |
| Metadata, OG images, JSON-LD             | [SEO.md](SEO.md)                                                               |
| Route handlers, caching, form security   | [API.md](API.md)                                                               |
| Analytics events                         | [ANALYTICS.md](ANALYTICS.md)                                                   |
| Performance work, LCP, bundle            | [PERFORMANCE.md](PERFORMANCE.md)                                               |
| Commands, quality gate, testing          | [DEVELOPMENT.md](DEVELOPMENT.md)                                               |
| Deploy, env vars, rollback, build errors | [VERCEL.md](VERCEL.md)                                                         |
| MCP servers, skills, spec-kit            | [AGENT_TOOLING.md](AGENT_TOOLING.md)                                           |
| Blog comments                            | [DISQUS.md](DISQUS.md), [DISQUS_TROUBLESHOOTING.md](DISQUS_TROUBLESHOOTING.md) |
| Localization                             | [TRANSLATION.md](TRANSLATION.md), [LANGUAGE_DETECTOR.md](LANGUAGE_DETECTOR.md) |
| Repository integrations                  | [GITHUB.md](GITHUB.md)                                                         |
| Stack and feature overview               | [PROJECT.md](PROJECT.md)                                                       |

Directory-scoped rules live next to the code: `src/app/AGENTS.md`,
`src/components/AGENTS.md`, `src/lib/AGENTS.md`, `src/lib/data/AGENTS.md`, `src/hooks/AGENTS.md`,
`src/types/AGENTS.md`.

---

## Full index

### Core

| File                                       | Owns                                                      |
| ------------------------------------------ | --------------------------------------------------------- |
| [PROJECT.md](PROJECT.md)                   | Stack, structure, features, architecture decisions        |
| [DEVELOPMENT.md](DEVELOPMENT.md)           | Setup, commands, quality gate, testing, git workflow      |
| [PAGE_CONSISTENCY.md](PAGE_CONSISTENCY.md) | Page shell, hero components, design tokens, accessibility |
| [AGENT_TOOLING.md](AGENT_TOOLING.md)       | MCP servers, skills, spec-kit, generated state            |

### Integrations

| File                                                   | Owns                                                        |
| ------------------------------------------------------ | ----------------------------------------------------------- |
| [API.md](API.md)                                       | The five route handlers, caching conventions, form security |
| [SEO.md](SEO.md)                                       | Metadata, OG images, JSON-LD, sitemap, auditing             |
| [ANALYTICS.md](ANALYTICS.md)                           | GA4 + Microsoft Clarity, tracking helpers                   |
| [DISQUS.md](DISQUS.md)                                 | Comments integration                                        |
| [DISQUS_TROUBLESHOOTING.md](DISQUS_TROUBLESHOOTING.md) | Comments failure modes                                      |
| [GITHUB.md](GITHUB.md)                                 | Repository data and workflows                               |

### Technical

| File                                                     | Owns                                            |
| -------------------------------------------------------- | ----------------------------------------------- |
| [PERFORMANCE.md](PERFORMANCE.md)                         | LCP, caching, bundle strategy, benchmarks       |
| [JS_OPTIMIZATION_SUMMARY.md](JS_OPTIMIZATION_SUMMARY.md) | Bundle reduction work log                       |
| [VERCEL.md](VERCEL.md)                                   | Deployment, env vars, rollback, troubleshooting |
| [TRANSLATION.md](TRANSLATION.md)                         | Localization guidelines                         |
| [LANGUAGE_DETECTOR.md](LANGUAGE_DETECTOR.md)             | `src/lib/language-detector.ts`                  |

---

## ⚠️ Documentation policy

**Update the existing file. Do not create a second one on the same topic.**

Before writing any new doc:

1. Search `docs/` — use docgraph `search`, it is faster than reading filenames.
2. Check whether root or a directory `AGENTS.md` already covers it.
3. Check this index.

```
❌ BAD:  CACHE_OPTIMIZATION.md when PERFORMANCE.md has a Cache Strategy section
✅ GOOD: extend PERFORMANCE.md
```

A new file is justified only when the topic is genuinely new, or an existing
file would exceed ~1000 lines. When you add one, add it to this index in the
same commit, and reindex docgraph so the next agent can find it.
