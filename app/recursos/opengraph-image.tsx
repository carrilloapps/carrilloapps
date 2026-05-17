import { renderPageOg, ogSize, ogContentType } from "@/lib/og"

export const alt = "Recursos — Junior Carrillo"
export const size = ogSize
export const contentType = ogContentType

export default function OpenGraphImage() {
  return renderPageOg({
    eyebrow: "Recursos",
    title: "Código abierto & herramientas",
    subtitle: "Repositorios destacados de GitHub y GitLab. Proyectos modernos en React, Next.js, Go, TypeScript y Python.",
    tags: ["GitHub", "GitLab", "Open Source", "React", "Go"],
  })
}
