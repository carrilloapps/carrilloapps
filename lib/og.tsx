import { ImageResponse } from "next/og"
import { getSiteUrl } from "./env"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

const GRADIENT_FROM = "#2563eb"
const GRADIENT_TO = "#9333ea"

function BrandMarkOG({ size = 116 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="og-mark-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={GRADIENT_FROM} />
          <stop offset="100%" stopColor={GRADIENT_TO} />
        </linearGradient>
        <linearGradient id="og-mark-sheen" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" ry="14" fill="url(#og-mark-grad)" />
      <rect width="64" height="64" rx="14" ry="14" fill="url(#og-mark-sheen)" />
      <path
        d="M 28 18 L 18 32 L 28 46"
        stroke="#ffffff"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M 36 18 L 46 32 L 36 46"
        stroke="#ffffff"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

interface OgPageOptions {
  /** Eyebrow above the page title (e.g. "Servicios", "Sobre mí"). Optional. */
  eyebrow?: string
  /** Main page title (60-80px display weight). */
  title: string
  /** Subtitle / value prop. */
  subtitle?: string
  /** Tag chips at the bottom (max 5 recommended). */
  tags?: string[]
  /** Right-side accent — defaults to "Disponible para proyectos". */
  accent?: string
}

/**
 * Renders a 1200×630 OG image with the carrillo.app branding.
 * Each route can supply its own title/subtitle/tags via this helper.
 */
export function renderPageOg({ eyebrow, title, subtitle, tags = [], accent = "Disponible para proyectos" }: OgPageOptions) {
  const host = getSiteUrl().replace(/^https?:\/\//, "")
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#09090b",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, Segoe UI, Inter, sans-serif",
          position: "relative",
          padding: "72px 80px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(59, 130, 246, 0) 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -240,
            right: -240,
            width: 800,
            height: 800,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0) 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.5,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            paddingRight: 48,
          }}
        >
          <BrandMarkOG size={104} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: 22,
              fontSize: 60,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              lineHeight: 1,
              position: "relative",
            }}
          >
            <span style={{ display: "flex" }}>carrill</span>
            <span style={{ display: "flex", position: "relative" }}>
              <span style={{ display: "flex" }}>o</span>
              <span
                style={{
                  display: "flex",
                  position: "absolute",
                  top: -18,
                  right: -50,
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: "#ffffff",
                  background: `linear-gradient(135deg, ${GRADIENT_FROM} 0%, ${GRADIENT_TO} 100%)`,
                  padding: "5px 12px",
                  borderRadius: 9999,
                  lineHeight: 1,
                  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.45)",
                }}
              >
                app
              </span>
            </span>
          </div>
        </div>

        {eyebrow && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 50,
              padding: "10px 22px",
              borderRadius: 9999,
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.5)",
              color: "#34d399",
              fontSize: 22,
              fontWeight: 600,
              alignSelf: "flex-start",
            }}
          >
            <span style={{ display: "flex" }}>{eyebrow}</span>
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: eyebrow ? 28 : 56,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              backgroundImage: `linear-gradient(90deg, #ffffff 0%, #c7d2fe 55%, #e9d5ff 100%)`,
              backgroundClip: "text",
              color: "transparent",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                display: "flex",
                fontSize: 32,
                fontWeight: 500,
                color: "#cbd5e1",
                marginTop: 18,
                letterSpacing: "-0.01em",
                maxWidth: 980,
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {tags.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 36,
              flexWrap: "wrap",
            }}
          >
            {tags.slice(0, 5).map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  borderRadius: 8,
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#e2e8f0",
                  fontSize: 22,
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#64748b",
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          <span style={{ display: "flex" }}>{host}</span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#93c5fd",
            }}
          >
            <span
              style={{
                display: "flex",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#34d399",
              }}
            />
            <span style={{ display: "flex" }}>{accent}</span>
          </span>
        </div>
      </div>
    ),
    { ...ogSize }
  )
}
