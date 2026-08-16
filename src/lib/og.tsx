import { ImageResponse } from "next/og"

import { getSiteUrl } from "@/lib/env"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

/* -------------------------------------------------------------------------- */
/*  The ledger palette, mirrored from globals.css                             */
/* -------------------------------------------------------------------------- */

const INK = "#0b0c0e"
const INK_RAISED = "#101216"
const PAPER = "#e8e6e1"
const PAPER_DIM = "#a2a6ad"
const PAPER_FAINT = "#868b93"
const RULE = "#2a2d33"
const RULE_STRONG = "#3d424a"
const STAMP = "#c4362f"

/* -------------------------------------------------------------------------- */
/*  Typefaces                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Satori cannot read what `next/font` installs, so the card renderer keeps its
 * own copy of the same two faces in `src/lib/fonts`.
 *
 * These used to be fetched from the Google Fonts API at build time. Then a
 * build lost the network and shipped every card in a system fallback stack —
 * no error, no failed deploy, just the wrong typeface on every social preview.
 * A file on disk cannot fail that way. See `fonts/README.md` for why they are
 * static TTFs and how to refresh them.
 */
async function loadFonts() {
  const faces: { name: string; file: string; weight: 400 | 600 }[] = [
    { name: "Archivo", file: "archivo-600.ttf", weight: 600 },
    { name: "JetBrains Mono", file: "jetbrains-mono-400.ttf", weight: 400 },
  ]

  try {
    const { readFile } = await import("node:fs/promises")
    const { join } = await import("node:path")
    const dir = join(process.cwd(), "src", "lib", "fonts")

    return await Promise.all(
      faces.map(async (face) => ({
        name: face.name,
        data: await readFile(join(dir, face.file)),
        weight: face.weight,
        style: "normal" as const,
      })),
    )
  } catch {
    // A card in a system face still beats a build that dies over a typeface.
    return undefined
  }
}

/* -------------------------------------------------------------------------- */
/*  Marks                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * The prompt mark, at the exact 64-unit geometry `BrandMark` and
 * `src/app/icon.svg` draw. Satori renders inline SVG, so the paths are the
 * same ones rather than an approximation in divs.
 */
function BrandCell({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect width="64" height="64" fill={INK} />
      <path
        d="M 16 16 L 28 28 L 16 40"
        fill="none"
        stroke={PAPER}
        strokeWidth="8"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <rect x="36" y="32" width="16" height="8" fill={PAPER} />
      <rect x="0" y="56" width="64" height="8" fill={STAMP} />
    </svg>
  )
}

/**
 * The wordmark, split the way `BrandWordmark` splits it: `carrillo` carries the
 * name in paper, `.app` drops to the faint ink because it is an address, not a
 * second word in the name.
 */
function Wordmark({ size }: { size: number }) {
  return (
    <div
      style={{
        display: "flex",
        fontFamily: "Archivo",
        fontSize: size,
        fontWeight: 600,
        letterSpacing: "-0.03em",
        color: PAPER,
      }}
    >
      carrillo
      <span style={{ color: PAPER_FAINT }}>.app</span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  The card                                                                  */
/* -------------------------------------------------------------------------- */

/** One ruled cell of the particulars row: mono term over a set value. */
interface Particular {
  term: string
  value: string
}

interface OgPageOptions {
  /** Section head under the wordmark — the ledger's column label. */
  eyebrow?: string
  /** Main page title. */
  title: string
  /** Supporting line under the title. */
  subtitle?: string
  /**
   * The four ruled cells along the foot. This is the same `<dl>` the home page
   * prints under the name, so a card and the page it links to state their
   * particulars in one shape.
   */
  particulars?: Particular[]
}

/**
 * A 1200×630 statement header — the home page's document header, at card size.
 *
 * Everything here has a counterpart in the running site: the identification
 * cell from `BrandMark`, the wordmark with its faint TLD, the ruled column
 * grid, the 11px mono section head at 0.14em, the display title at -0.045em
 * tracking on a 0.88 leading, and the particulars `<dl>` ruled top and bottom.
 * Nothing is invented for the card, which is the point — someone who has seen
 * the card recognises the page.
 */
export async function renderPageOg({ eyebrow, title, subtitle, particulars = [] }: OgPageOptions) {
  const host = getSiteUrl().replace(/^https?:\/\//, "")
  const fonts = await loadFonts()
  const sans = fonts ? "Archivo" : "system-ui, sans-serif"
  const mono = fonts ? "JetBrains Mono" : "ui-monospace, monospace"
  const cells = particulars.slice(0, 4)

  /** The mono voice, used for every label and figure exactly as the site does. */
  const label = {
    fontFamily: mono,
    fontSize: 15,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    color: PAPER_FAINT,
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: INK,
        color: PAPER,
        fontFamily: sans,
        padding: "52px 64px",
        position: "relative",
      }}
    >
      {/*
          Column rules: the sheet this entry is written on. Offsets are spelled
          out rather than using `inset` — Satori's box model ignores the
          shorthand, and the container collapses to nothing with it.
        */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          width: ogSize.width,
          height: ogSize.height,
        }}
      >
        {[2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: ogSize.width * i * 0.125,
              width: 1,
              height: ogSize.height,
              background: RULE,
            }}
          />
        ))}
        {/*
            The margin rule. It sits at 40px — outside the 64px content column,
            not through it — so the sheet reads as ruled paper the entry was
            written on rather than a line struck across the name.
          */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 40,
            width: 2,
            height: ogSize.height,
            background: STAMP,
            opacity: 0.55,
          }}
        />
      </div>

      {/* Masthead: the letterhead on the left, its address on the right. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${RULE}`,
          paddingBottom: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <BrandCell size={72} />
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <Wordmark size={30} />
            <div style={{ ...label, letterSpacing: "0.14em" }}>
              {eyebrow ?? "Tech Leader · Pagos e infraestructura"}
            </div>
          </div>
        </div>

        <div style={{ ...label, color: PAPER_DIM, letterSpacing: "0.1em" }}>{host}</div>
      </div>

      {/* The entry itself. */}
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <div
          style={{
            fontFamily: sans,
            // The home sets the name at 0.86 leading and -0.045em tracking;
            // a two-line title needs the same tightness to read as one block.
            fontSize: title.length > 18 ? 74 : 104,
            fontWeight: 600,
            lineHeight: 0.88,
            letterSpacing: "-0.045em",
            color: PAPER,
            maxWidth: 1010,
          }}
        >
          {title}
        </div>

        {subtitle ? (
          <div
            style={{
              fontFamily: sans,
              fontSize: 29,
              lineHeight: 1.4,
              color: PAPER_DIM,
              maxWidth: 890,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      {/* Particulars: the home page's <dl>, ruled top and bottom. */}
      {cells.length ? (
        <div
          style={{
            display: "flex",
            borderTop: `1px solid ${RULE_STRONG}`,
            borderBottom: `1px solid ${RULE}`,
          }}
        >
          {cells.map((cell, i) => (
            <div
              key={cell.term}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 9,
                flexGrow: 1,
                flexBasis: 0,
                padding: i === 0 ? "20px 24px 20px 0" : "20px 24px",
                borderLeft: i > 0 ? `1px solid ${RULE}` : "none",
              }}
            >
              <div style={label}>{cell.term}</div>
              <div style={{ fontFamily: sans, fontSize: 27, color: PAPER }}>{cell.value}</div>
            </div>
          ))}
        </div>
      ) : null}
    </div>,
    { ...ogSize, fonts },
  )
}
