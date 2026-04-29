import type { Metadata } from "next"
import { getSiteUrl } from "./env"

const SITE_NAME = "José Carrillo"
const SITE_TWITTER = "@carrilloapps"
const DEFAULT_LOCALE = "es_CO"

type OgType = "website" | "article" | "profile" | "book"

interface PageMetadataInput {
  /** Page-specific portion of the title — the root layout's template
   *  appends " | José Carrillo" automatically, so do NOT include it here. */
  title: string
  /** SEO description — used for meta description and og/twitter description. */
  description: string
  /** Route path (e.g. "/sobre-mi"). Used to build canonical and OG URL. */
  path: string
  /** Optional OG-specific title (defaults to `title`). */
  ogTitle?: string
  /** Optional OG-specific description (defaults to `description`). */
  ogDescription?: string
  /** OG type. Defaults to "website". Use "article" for blog posts, "profile" for /sobre-mi. */
  ogType?: OgType
  /** Optional list of keywords (kept here only because some pages still want them in code; Google ignores them). */
  keywords?: string[]
  /** Override robots — useful for legal pages (cookies/privacidad/terminos) that should not be indexed. */
  robots?: Metadata["robots"]
}

const DEFAULT_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
}

/**
 * Builds a complete metadata object that:
 *   - Inherits openGraph type/siteName/locale (Next.js does NOT deep-merge
 *     these from the root layout once a child overrides openGraph).
 *   - Declares hreflang x-default + es-CO.
 *   - Always declares robots (Next 16 stops inheriting robots when a child
 *     defines any metadata fields).
 *   - Always supplies an og:image / twitter:image — points to the root
 *     /opengraph-image route by default. Routes that ship their own
 *     `opengraph-image.tsx` file will override this via Next's file-based
 *     metadata convention.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  ogType = "website",
  keywords,
  robots,
}: PageMetadataInput): Metadata {
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}${path}`
  const ogImageUrl = `${siteUrl}/opengraph-image`
  const ogImageAlt = ogTitle ?? title
  return {
    title,
    description,
    keywords,
    robots: robots ?? DEFAULT_ROBOTS,
    alternates: {
      canonical: path,
      languages: {
        "es-CO": path,
        "x-default": path,
      },
    },
    openGraph: {
      type: ogType,
      locale: DEFAULT_LOCALE,
      url: pageUrl,
      siteName: SITE_NAME,
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_TWITTER,
      creator: SITE_TWITTER,
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [
        {
          url: ogImageUrl,
          alt: ogImageAlt,
        },
      ],
    },
  }
}
