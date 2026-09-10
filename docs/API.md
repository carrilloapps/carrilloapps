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

### Newsletter — no route

There is no newsletter endpoint. Signups are handed to Substack's own subscribe
page with the address prefilled (`blogSubscribeUrl` in
`src/lib/substack-service.ts`), and Substack runs the captcha, records the
signup and sends the confirmation mail.

**Why there is no route, so nobody rebuilds one.** Substack publishes no public
write API for subscriptions. Its embed form posts to `${BLOG_URL}/api/v1/free`,
which is reachable — but it is gated by reCAPTCHA (`captcha_behavior:
risky_pubs_or_rate_limit`) and Cloudflare bot management, and it does not fail
loudly. A request it does not trust still answers:

- `302` to `/` with no body, or
- `200` with `{ email, prompt_to_login }` and no `subscription_id`

Neither creates a subscriber. A route that treated the status code as the
answer reported success to readers who were never subscribed, and this site
shipped that bug.

Measured while removing it: the same request, same machine, same IP, same
headers and same body is accepted from `curl` and silently dropped from Node's
`fetch`. The remaining difference is the TLS fingerprint Cloudflare sees, so
making it work from a server means impersonating a browser at the transport
level. That is not a thing to build: it is fragile, it breaks without warning,
and it fails in the one way this feature must never fail — quietly.

It is worth being precise about the mechanism, because the obvious guess is
wrong: this is **not** a captcha. The `captcha_behavior` visible on a Substack
page is `pub_creation_captcha_behavior`, and their reCAPTCHA is wired only to
login and publication creation. The signup form carries no captcha and no
`captcha_response` field, so there is no token to go and obtain. Independent
reports of the same wall run from mid-2024 through 2026, and every integration
that hit it ended up on the official embed or on a hand-off like this one.

Calling it from a server also breaches Substack's terms, which forbid reverse
engineering the product and circumventing its restrictions. That risk lands on
the publication — which is the entire subscriber list.

`prompt_to_login: true` is the other silent failure worth naming: it means the
address already has a Substack account, and it comes back `200` while adding
nobody.

An accepted signup also comes back `requires_confirmation: true`. Even where it
works, the subscriber is pending until they click the mail, so "subscribed" is
never something this site can honestly claim on its own.

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
