# Vendored OG typefaces

Two static TTF instances, read by `loadFonts()` in [`../og.tsx`](../og.tsx) to
render the social cards.

| File                     | Family         | Weight | Source                                           |
| ------------------------ | -------------- | ------ | ------------------------------------------------ |
| `archivo-600.ttf`        | Archivo        | 600    | Google Fonts CSS2 API, `Archivo:wght@600`        |
| `jetbrains-mono-400.ttf` | JetBrains Mono | 400    | Google Fonts CSS2 API, `JetBrains+Mono:wght@400` |

Both are the same faces the app loads through `next/font/google` in
`src/app/layout.tsx`, and both are licensed under the SIL Open Font License 1.1,
which permits redistribution.

## Why they are committed rather than fetched

Satori cannot read what `next/font` installs, so the card renderer needs its own
copy. Fetching it at build time looked fine until a build silently lost the
network and shipped every card in a system fallback stack — no error, no failed
deploy, just the wrong typeface on every social preview. A file on disk cannot
fail that way.

## Why TTF and not the woff2 the browser gets

Satori parses neither woff2 nor variable fonts. Requesting the CSS2 API with a
modern `User-Agent` returns woff2; requesting a variable family returns
`Archivo[wdth,wght].ttf`, which throws
`Cannot read properties of undefined (reading '256')` and takes the build down.
A static instance asked for with a legacy `User-Agent` is the one thing that
works.

## Refreshing them

```bash
curl -H 'User-Agent: Mozilla/5.0 (Windows NT 6.1)' \
  'https://fonts.googleapis.com/css2?family=Archivo:wght@600'
```

Follow the `.ttf` URL in the response and save it over the file above. Keep the
weights in step with the `label`/title styles in `og.tsx`.
