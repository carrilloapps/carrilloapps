/**
 * Validation for the query parameters that reach an upstream URL.
 *
 * SAR F-004. Four fetches used to interpolate a raw query parameter straight
 * into the path of a GitHub or GitLab API call:
 *
 *   `https://api.github.com/users/${username}/repos`
 *   `https://api.github.com/repos/${owner}/${repo}`
 *
 * The host cannot be moved — the prefix fixes the authority before the
 * interpolation point — and none of those calls carries a token, so there was
 * never a credential to leak or private data to reach. What an unvalidated
 * value did allow was worth closing anyway:
 *
 *   1. The site works as an open proxy to the public GitHub API, from the
 *      function's IP. GitHub's unauthenticated limit is per IP, so a third
 *      party can exhaust it and leave /recursos empty for real visitors.
 *   2. `unstable_cache` keys on the parameter, so every invented value mints a
 *      cache entry that lives for an hour.
 *   3. A `../` segment normalises into a different endpoint, so the code ends
 *      up calling something other than what it reads like.
 *
 * `src/app/api/npm-downloads/route.ts` already did the equivalent — it matches
 * the request against a known package list and answers 422 — so this is that
 * pattern, extracted rather than invented.
 */

/**
 * GitHub and GitLab usernames: alphanumeric plus single hyphens, no leading or
 * trailing hyphen, 39 characters maximum. Deliberately stricter than either
 * platform's full rule — this guards an outbound URL, so the cost of rejecting
 * an exotic-but-valid handle is a 422, while the cost of accepting a crafted
 * one is the list above.
 */
const USERNAME = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/

/** `owner/repo`, each side limited to the characters a repository name allows. */
const REPOSITORY = /^[A-Za-z0-9][A-Za-z0-9._-]{0,38}\/[A-Za-z0-9][A-Za-z0-9._-]{0,99}$/

export function isValidUsername(value: string): boolean {
  return USERNAME.test(value)
}

export function isValidRepository(value: string): boolean {
  return REPOSITORY.test(value)
}

/**
 * Pagination that cannot be used to walk an upstream API indefinitely.
 * `Number.parseInt` on its own returns `NaN` for junk and has no ceiling; both
 * ended up in the page arithmetic.
 */
export function parsePage(value: string | null, max = 100): number {
  const page = Number.parseInt(value ?? "1", 10)
  if (!Number.isFinite(page) || page < 1) return 1
  return Math.min(page, max)
}
