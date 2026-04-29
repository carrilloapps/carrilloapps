#!/usr/bin/env node
/**
 * Brand asset generator
 *
 * Produces a coherent set of brand assets from a single SVG mark + wordmark:
 *   - app/icon.svg              -> Next.js auto-favicon (browser tabs)
 *   - public/brand/mark.svg     -> mark (no background)
 *   - public/brand/mark-dark.svg-> mark on rounded dark surface (used for PWA icons)
 *   - public/brand/wordmark.svg -> mark + "carrillo.app" wordmark (white text)
 *   - public/logo.webp          -> wordmark rasterized (replaces previous)
 *   - public/icons/{48,72,96,144,192,512,1024}.png  -> PWA icons
 *   - public/favicon.ico        -> 48x48 PNG-encoded ico for legacy browsers
 *
 * Visual language (consistent with the rest of the site):
 *   - Brand gradient: #3b82f6 (blue-500) -> #a855f7 (purple-500)
 *   - Dark surface: #09090b (zinc-950) with subtle blue glow
 *   - Geometric square "C" open to the right + dot at the mouth (the "." in .app)
 */

import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const ROOT = resolve(process.cwd());
const PUBLIC = resolve(ROOT, "public");
const APP = resolve(ROOT, "app");
const BRAND_DIR = resolve(PUBLIC, "brand");
const ICONS_DIR = resolve(PUBLIC, "icons");

// Brand gradient (matches the primary CTA gradient on the site).
const GRADIENT_FROM = "#2563eb"; // blue-600
const GRADIENT_TO = "#9333ea"; // purple-600

/**
 * Brand mark — a solid gradient block with a clean white "j" monoline.
 * The j's tittle is enlarged to act as a focal dot mirroring the "." in .app.
 *
 * Two variants:
 *   - "block" (default): the colored squircle, used wherever a self-contained
 *     icon makes sense (favicons, PWA icons, app launchers, OG image badge).
 *   - "monoline": the j drawn in gradient strokes on a transparent canvas,
 *     used over an already-coloured surface where a block would compete.
 */
// Mark geometry — `< >` dev brackets. Kept in lockstep with components/brand-mark.tsx.
const MARK_BRACKET_STROKE = 8;
const MARK_LEFT_BRACKET = "M 28 18 L 18 32 L 28 46";
const MARK_RIGHT_BRACKET = "M 36 18 L 46 32 L 36 46";

function markSvg({ size = 64, variant = "block" } = {}) {
  const vb = 64;
  const brackets = (color) => `
  <path d="${MARK_LEFT_BRACKET}" stroke="${color}" stroke-width="${MARK_BRACKET_STROKE}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="${MARK_RIGHT_BRACKET}" stroke="${color}" stroke-width="${MARK_BRACKET_STROKE}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  if (variant === "monoline") {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vb} ${vb}" width="${size}" height="${size}" fill="none" role="img" aria-label="carrillo">
  <defs>
    <linearGradient id="brand-grad" x1="10" y1="10" x2="56" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${GRADIENT_FROM}"/>
      <stop offset="100%" stop-color="${GRADIENT_TO}"/>
    </linearGradient>
  </defs>${brackets("url(#brand-grad)")}
</svg>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vb} ${vb}" width="${size}" height="${size}" fill="none" role="img" aria-label="carrillo">
  <defs>
    <linearGradient id="brand-grad" x1="0" y1="0" x2="${vb}" y2="${vb}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${GRADIENT_FROM}"/>
      <stop offset="100%" stop-color="${GRADIENT_TO}"/>
    </linearGradient>
    <linearGradient id="brand-sheen" x1="0" y1="0" x2="0" y2="${vb}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="55%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${vb}" height="${vb}" rx="14" ry="14" fill="url(#brand-grad)"/>
  <rect width="${vb}" height="${vb}" rx="14" ry="14" fill="url(#brand-sheen)"/>${brackets("#ffffff")}
</svg>`;
}

async function ensureDirs() {
  await mkdir(BRAND_DIR, { recursive: true });
  await mkdir(ICONS_DIR, { recursive: true });
}

async function writeSvgs() {
  await writeFile(resolve(BRAND_DIR, "mark.svg"), markSvg({ size: 64 }), "utf8");
  await writeFile(resolve(BRAND_DIR, "mark-dark.svg"), markSvg({ size: 512, withBackground: true }), "utf8");
  await writeFile(resolve(APP, "icon.svg"), markSvg({ size: 64 }), "utf8");
  console.log("[svg] mark, mark-dark, app/icon.svg written");
}

async function rasterIcons() {
  const sizes = [48, 72, 96, 144, 192, 512, 1024];
  const darkSvg = Buffer.from(markSvg({ size: 1024, withBackground: true }), "utf8");
  for (const size of sizes) {
    const out = resolve(ICONS_DIR, `${size}.png`);
    await sharp(darkSvg, { density: 384 })
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(out);
  }
  console.log(`[icons] rasterized PWA icons: ${sizes.join(", ")}`);
}

async function favicon() {
  // The repo's existing "favicon.ico" is actually a 48x48 PNG renamed.
  // Keep the same approach but with the new mark on transparent background
  // (browsers center it and pick a contrasting tint).
  const transparentMark = Buffer.from(markSvg({ size: 64, withBackground: false }), "utf8");
  await sharp(transparentMark, { density: 384 })
    .resize(48, 48, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(resolve(PUBLIC, "favicon.ico"));
  console.log("[favicon] public/favicon.ico (48x48 PNG)");
}

async function logoWebp() {
  // public/logo.webp is referenced as the Organization/publisher logo in JSON-LD
  // (Google requires it). Render the mark on dark surface — square 512x512 — so
  // the same asset doubles as a recognizable brand logo wherever a logo URL is
  // expected. The textual wordmark is rendered by <Logo variant="text"> in React,
  // where the Inter font is available natively.
  const darkMark = Buffer.from(markSvg({ size: 512, withBackground: true }), "utf8");
  await sharp(darkMark, { density: 384 })
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 92, alphaQuality: 100, lossless: false })
    .toFile(resolve(PUBLIC, "logo.webp"));
  console.log("[brand-logo] public/logo.webp (512x512 WebP, mark-on-dark)");
}

async function main() {
  await ensureDirs();
  await writeSvgs();
  await rasterIcons();
  await favicon();
  await logoWebp();
  console.log("\nDone.");
}

await main();
