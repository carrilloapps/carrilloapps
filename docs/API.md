# API Documentation

Five route handlers under `src/app/api/`. They exist for one reason: **no client
component may call a third-party API directly** (Constitution, Technology
Constraints). Every upstream call, its cache window and its error shape live
here.

There is **no authentication layer** — every endpoint is public and read-mostly.
Secrets stay server-side, read through `privateEnv` from `src/lib/env.ts`.

Base URL: `https://carrillo.app/api` (locally `http://localhost:3000/api`).

---

## Conventions

Follow these on any new handler.

**Always return structured JSON plus a real status code.** Never a bare string,
never a naked `throw`.

```ts
return NextResponse.json({ error: "Correo electrónico inválido." }, { status: 422 })
```

**Declare the cache window explicitly.**

| Mechanism                                        | Where                       | Example                       |
| ------------------------------------------------ | --------------------------- | ----------------------------- |
| `export const revalidate`                        | route-level, whole response | `latest-posts` → 1800s        |
| `unstable_cache(fn, keys, { revalidate, tags })` | per upstream call           | `github-repositories` → 3600s |

Tagged caches (`tags: ['github-repositories']`) can be invalidated
selectively — prefer them over a blanket route revalidate when a handler makes
several upstream calls with different volatility.

**Pick the runtime deliberately.** `newsletter` sets `export const runtime = "nodejs"`
so the upstream call and its manual redirect handling behave the same locally
and on Vercel. Handlers that do not need Node APIs should leave the default.

**Degrade instead of failing.** `latest-posts` returns `{ posts: [] }` on error
so the home page renders without the section rather than exploding.
`newsletter` returns `subscribeUrl` on failure so the UI can offer Substack's
own subscribe page instead of a dead end.

**Respect the Vercel limits.** `vercel.json` caps `src/app/api/**` at
`maxDuration: 10` seconds and `memory: 512`. A handler that can exceed 10s
needs a different design, not a bigger timeout.

---

## Endpoints

### `GET /api/github-repositories`

Repositories for a GitHub user, filtered, searched and paginated server-side.

| Param         | Default        | Notes                       |
| ------------- | -------------- | --------------------------- |
| `username`    | `carrilloapps` |                             |
| `page`        | `1`            | 6 per page                  |
| `language`    | `all`          | case-insensitive match      |
| `search`      | —              | matches name or description |
| `pinned_only` | `false`        | returns only the pinned set |

"Pinned" is synthesized: the top 6 repos by star count, since the REST API does
not expose GitHub's pinned selection.

```json
{
  "repositories": [
    {
      "id": 1,
      "name": "repo",
      "description": "",
      "language": "TypeScript",
      "stars": 0,
      "forks": 0,
      "updated_at": "…",
      "html_url": "…",
      "pinned": false
    }
  ],
  "totalCount": 42,
  "totalPages": 7,
  "pinnedRepos": []
}
```

Cache 3600s via `unstable_cache`, tags `github-repositories` / `github-user-info`.
Errors return `{ "error": "Failed to fetch repositories" }` with 500.

### `GET /api/gitlab-repositories`

GitLab equivalent, same response shape so `src/components/repositories-list.tsx`
can consume either source.

### `GET /api/repository-details`

Detail view for a single repository. Cache 1800s.

### `GET /api/latest-posts`

The four most recent Substack posts via `getSubstackPosts(4)` from
`src/lib/substack-service.ts`. `export const revalidate = 1800`.

Consumed through TanStack Query (`latestPosts` in `src/lib/queries.ts`), rendered by
`src/components/latest-posts-section.tsx`. Also feeds `src/app/rss.xml/route.ts`.

Returns `{ posts: [] }` on any upstream failure — never an error status.

### `POST /api/newsletter`

Substack subscription. Runtime `nodejs`.

```json
{ "email": "someone@example.com" }
```

| Status | Body                                                                        | Meaning                          |
| ------ | --------------------------------------------------------------------------- | -------------------------------- |
| 200    | `{ "ok": true }`                                                            | Subscribed (new or repeat)       |
| 400    | `{ "error": "Solicitud inválida." }`                                        | Malformed JSON                   |
| 422    | `{ "error": "Correo electrónico inválido." }`                               | Failed `EMAIL_RE`                |
| 422    | `{ "error": "Ese correo no es válido o su dominio no existe." }`            | Substack rejected the address    |
| 502    | `{ "error": "...", "subscribeUrl": "https://blog.carrillo.app/subscribe" }` | Substack rejected or unreachable |

Requires no environment variables. The publication origin is `BLOG_URL` in
`src/lib/substack-service.ts`, which also derives the feed and subscribe URLs.

**The upstream endpoint is undocumented.** Substack publishes no public write
API for subscriptions; the route posts to `${BLOG_URL}/api/v1/free`, which is
where Substack's own embed form at `${BLOG_URL}/embed` posts. It can change or
start demanding a challenge without notice, so the handler treats any 2xx _or_
3xx as success (the `nojs` path answers with a redirect) and, on any failure,
returns `subscribeUrl` so the client can send the reader to Substack's hosted
subscribe page instead of a dead end. The footer form renders that as a toast
action.

Two shapes were observed against the live endpoint and are worth recording,
because neither is what the JSON-ish name suggests:

- **An accepted address answers `302` with `location: /`** — not JSON, even
  when the request sets `Accept: application/json`. It answers the same way for
  an address already on the list, so the two are indistinguishable from here
  and the route reports both as plain success — there is no "already
  subscribed" state to report, and the UI copy is written to be true of both.
- **A rejected address answers `400`** with
  `{ "errors": [{ "param": "email", "msg": "..." }] }`, and Substack checks the
  domain resolves — which `EMAIL_RE` cannot. That is translated to a `422` so
  the reader fixes the typo rather than being told the service is down.

`tests/unit/newsletter-route.test.ts` locks all of it.

Nothing is stored on this side — Substack owns the list and sends its own
confirmation mail, so the site and the publication never hold two diverging
audiences.

---

## Form security

Contact and scheduling forms (`src/app/contacto/page.tsx`, `src/app/page.tsx`,
`src/components/compact-contact-section.tsx`) submit through WhatsApp deep links
(`src/lib/whatsapp.ts`), not through an API route. They still carry three defenses.
Reuse all three on any new form:

1. **Email obfuscation** — `obfuscateEmail()` / `deobfuscateEmail()` so the
   address is never in the DOM in plain text for scrapers.
2. **Honeypot field** — a hidden input real users never fill. Any value means
   a bot.
3. **Rate limiting + time-based validation** — `useRateLimit()` plus a minimum
   elapsed time between render and submit, which rejects instant bot posts.

Server-side, `newsletter` validates with `EMAIL_RE` before touching Substack
and never echoes upstream error details to the client — failures are logged
with `console.error` and returned as a generic message. The footer newsletter
form carries the honeypot, dwell and throttle defenses too.

---

## Related

- Caching and performance budgets → [PERFORMANCE.md](PERFORMANCE.md)
- Environment variables → [VERCEL.md](VERCEL.md), `.env.example`
- Data flow overview → [PROJECT.md](PROJECT.md)
