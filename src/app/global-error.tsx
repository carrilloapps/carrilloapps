"use client"

/**
 * The last resort.
 *
 * `error.tsx` covers a route that throws; this covers the root layout itself
 * throwing, which replaces the whole document — including the `<html>` element
 * and every stylesheet the layout imported. So there is no Tailwind here and no
 * shared header: the palette is written inline, because a class name would
 * resolve to nothing and the visitor would get unstyled black text on white
 * with no way back.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "#0b0c0e",
          color: "#e8e6e1",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <main style={{ maxWidth: "34rem" }}>
          <p
            style={{
              margin: 0,
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#e0574e",
            }}
          >
            Error crítico
          </p>

          <h1
            style={{
              margin: "0.75rem 0 0",
              fontSize: "2.5rem",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              fontWeight: 600,
            }}
          >
            La aplicación no pudo arrancar
          </h1>

          <p style={{ margin: "1.5rem 0 0", lineHeight: 1.6, color: "#a2a6ad" }}>
            Falló algo en la raíz del sitio, no solo en esta página. Reintenta; si persiste,
            escríbeme a{" "}
            <a href="mailto:m@carrillo.app" style={{ color: "#e8e6e1" }}>
              m@carrillo.app
            </a>{" "}
            con el identificador.
          </p>

          <p
            style={{
              margin: "1.5rem 0 0",
              paddingTop: "1rem",
              borderTop: "1px solid #2a2d33",
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: "13px",
              color: "#868b93",
              wordBreak: "break-all",
            }}
          >
            {error.digest ?? "sin identificador"}
          </p>

          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 0",
              minHeight: 48,
              background: "none",
              border: "none",
              borderBottom: "2px solid #c4362f",
              color: "#e8e6e1",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Reintentar
          </button>
        </main>
      </body>
    </html>
  )
}
