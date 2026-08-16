import { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/env"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  // Bumped after the structured-data / SEO overhaul so Google is prompted to
  // recrawl the updated pages.
  const lastModified = new Date("2026-06-18")

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
