import { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/env"
import { SERVICES } from "@/lib/data/services"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  // Bumped after the OG/icon/metadata rebuild so Google is prompted to recrawl
  // the rewritten titles, descriptions and social cards.
  const lastModified = new Date("2026-08-17")

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { "es-CO": baseUrl, "x-default": baseUrl } },
    },
    {
      url: `${baseUrl}/sobre-mi`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: { "es-CO": `${baseUrl}/sobre-mi`, "x-default": `${baseUrl}/sobre-mi` },
      },
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: { "es-CO": `${baseUrl}/servicios`, "x-default": `${baseUrl}/servicios` },
      },
    },
    // One entry per service. They used to be fragments of /servicios, which a
    // crawler treats as the same URL — seven pages' worth of copy competing for
    // one listing. Spread from the same catalogue the pages render, so adding a
    // service can never leave it out of the sitemap.
    ...SERVICES.map((service) => {
      const url = `${baseUrl}/servicios/${service.slug}`
      return {
        url,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages: { "es-CO": url, "x-default": url } },
      }
    }),
    {
      url: `${baseUrl}/herramientas`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          "es-CO": `${baseUrl}/herramientas`,
          "x-default": `${baseUrl}/herramientas`,
        },
      },
    },
    {
      url: `${baseUrl}/recursos`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: { "es-CO": `${baseUrl}/recursos`, "x-default": `${baseUrl}/recursos` },
      },
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: { "es-CO": `${baseUrl}/contacto`, "x-default": `${baseUrl}/contacto` },
      },
    },
    {
      url: `${baseUrl}/agendamiento`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: { "es-CO": `${baseUrl}/agendamiento`, "x-default": `${baseUrl}/agendamiento` },
      },
    },
  ]
}
