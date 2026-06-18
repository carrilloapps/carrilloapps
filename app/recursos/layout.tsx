import type React from "react"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/env"
import { buildPageMetadata } from "@/lib/seo"
import { featuredProjects } from "@/data/featured-projects"
import { queryKeys, type RepositoriesResponse } from "@/lib/queries"

const SITE_URL = getSiteUrl()

// Languages we recognize from a project's tags (first match wins).
const KNOWN_LANGUAGES = ["TypeScript", "JavaScript", "Go", "Python", "Java", "Shell", "Kotlin"]

export const metadata = buildPageMetadata({
  title: "Recursos gratuitos & código abierto",
  description:
    "Recursos gratuitos y de código abierto: repositorios destacados de GitHub y GitLab en React, Next.js, Go, TypeScript y Python.",
  path: "/recursos",
  keywords: [
    "recursos gratuitos desarrolladores",
    "código abierto finanzas",
    "repositorios github Junior Carrillo",
    "proyectos gitlab carrilloapps",
    "sistemas financieros open source",
    "medios de pago desarrollo",
    "react nextjs typescript",
    "python java javascript",
    "backoffice sistemas",
    "contribuciones open source",
    "proyectos destacados",
    "desarrollo web moderno",
    "arquitectura software",
    "fintech desarrollo",
    "carrilloapps github",
  ],
})

// JSON-LD structured data for the resources page
const resourcesJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Recursos Gratuitos & Código Abierto",
  description:
    "Colección de proyectos de software gratuitos y de código abierto especializados en sistemas financieros y medios de pago",
  url: `${SITE_URL}/recursos`,
  author: {
    "@type": "Person",
    name: "Junior Carrillo",
    url: SITE_URL,
    jobTitle: "Tech Lead & Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Yummy Inc.",
    },
    sameAs: [
      "https://github.com/carrilloapps",
      "https://gitlab.com/carrilloapps",
      "https://linkedin.com/in/carrilloapps",
    ],
  },
  publisher: {
    "@type": "Organization",
    name: "carrillo.app",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.webp`,
    },
  },
  // Real featured projects rendered on the page (imported from the same source
  // the UI uses, so the structured data always matches the visible content).
  mainEntity: {
    "@type": "ItemList",
    name: "Proyectos de código abierto destacados",
    description:
      "Repositorios y proyectos open-source destacados: cifrado, fintech y herramientas para desarrolladores.",
    numberOfItems: featuredProjects.length,
    itemListElement: featuredProjects.map((project, index) => {
      const repoUrl = `https://${project.platform}.com/${project.repository}`
      return {
        "@type": "SoftwareSourceCode",
        position: index + 1,
        name: project.name,
        description: project.customDescription || project.description,
        url: repoUrl,
        codeRepository: repoUrl,
        programmingLanguage:
          project.tags.find((tag) => KNOWN_LANGUAGES.includes(tag)) || "TypeScript",
        keywords: project.tags.join(", "),
        author: {
          "@type": "Person",
          name: "Junior Carrillo",
          url: SITE_URL,
        },
      }
    }),
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Recursos",
        item: `${SITE_URL}/recursos`,
      },
    ],
  },
  isPartOf: {
    "@type": "WebSite",
    name: "Junior Carrillo - Tech Lead & Full Stack Developer",
    url: SITE_URL,
  },
  inLanguage: "es-CO",
  dateModified: new Date("2026-05-16").toISOString(),
  keywords:
    "recursos gratuitos, código abierto, sistemas financieros, desarrollo web, github, gitlab, react, nextjs, typescript, python",
}

// Server-side prefetch of the DEFAULT repository view (GitHub, page 1, no
// filters) so the initial list is server-rendered into the HTML for SEO. The
// client (RepositoriesList) hydrates this exact query key and keeps full
// control of search / language / pagination / tab switching — identical UI/UX.
// The query key MUST match useRepositories' default state on this page.
const DEFAULT_REPOS_QUERY = {
  source: "github" as const,
  username: "carrilloapps",
  page: 1,
  language: "all",
  search: "",
}

export default async function ResourcesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // retry:false + try/catch so a transient upstream failure never breaks the
  // page — it simply falls back to the existing client-side fetch.
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  try {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.repositories(
        DEFAULT_REPOS_QUERY.source,
        DEFAULT_REPOS_QUERY.username,
        DEFAULT_REPOS_QUERY.page,
        DEFAULT_REPOS_QUERY.language,
        DEFAULT_REPOS_QUERY.search,
      ),
      queryFn: async (): Promise<RepositoriesResponse> => {
        const res = await fetch(
          `${SITE_URL}/api/github-repositories?username=${DEFAULT_REPOS_QUERY.username}&page=1&language=all&search=`,
          // Revalidate alongside the upstream API's own cache window (30 min).
          { next: { revalidate: 1800 } },
        )
        if (!res.ok) throw new Error("prefetch failed")
        return res.json()
      },
    })
  } catch {
    // Ignore — client will fetch on mount exactly as before.
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JsonLd data={resourcesJsonLd} />
      {children}
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Recursos", url: `${SITE_URL}/recursos` },
        ]}
      />
    </HydrationBoundary>
  )
}
