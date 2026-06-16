"use client"

import { motion } from "@/lib/motion"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Eye, ExternalLink, GitCommit, Tag, Calendar, Code, Hash, Layers } from "lucide-react"
import { featuredProjects, type FeaturedProject } from "@/data/featured-projects"
import { useRepositoryDetails } from "@/lib/queries"

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { y: -5, transition: { duration: 0.2 } },
}

export function FeaturedProjects() {
  const results = useRepositoryDetails(featuredProjects)
  const projects = featuredProjects.map((project: FeaturedProject, index) => ({
    ...project,
    repositoryData: results[index]?.data,
    loading: results[index]?.isLoading ?? false,
    error: results[index]?.isError ? "Failed to fetch repository data" : undefined,
  }))

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      TypeScript: "bg-blue-500",
      JavaScript: "bg-yellow-500",
      Go: "bg-cyan-500",
      Kotlin: "bg-purple-500",
      Python: "bg-green-500",
      Java: "bg-orange-500",
    }
    return colors[language || ""] || "bg-gray-500"
  }

  const renderIcon = (icon: FeaturedProject["icon"]) => {
    if (icon.type === "lucide" && icon.name) {
      // Render the Code icon from Lucide React
      return <Code className={`h-5 w-5 ${icon.color}`} />
    }

    if (icon.type === "svg" && icon.svg) {
      return <div dangerouslySetInnerHTML={{ __html: icon.svg }} />
    }

    return <div className={`h-5 w-5 ${icon.color}`}>📦</div>
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ delay: index * 0.1 }}
        >
          <Card className="surface-card group flex h-full flex-col">
            {/* Header Section - Reduced padding for better proportion */}
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div
                  className={`rounded-lg p-2.5 transition-colors duration-300 ${project.icon.bgColor}`}
                >
                  {renderIcon(project.icon)}
                </div>
                {project.repositoryData?.name || project.name}
              </CardTitle>
              <CardDescription className="mt-2 text-sm leading-relaxed text-zinc-300">
                {project.customDescription ||
                  project.repositoryData?.description ||
                  project.description}
              </CardDescription>
            </CardHeader>

            {/* Content Section - Optimized spacing */}
            <CardContent className="flex-1 space-y-4 pb-4">
              {/* Language and Metadata Row - Enhanced visibility */}
              <div className="flex items-center justify-between">
                {project.repositoryData?.language && (
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${getLanguageColor(project.repositoryData.language)}`}
                    ></div>
                    <span className="text-sm font-medium text-zinc-300">
                      {project.repositoryData.language}
                    </span>
                  </div>
                )}

                {/* Repository Stats - Moved to prominent position */}
                {project.repositoryData && (
                  <div className="flex items-center gap-3 text-xs text-zinc-500">
                    <div className="flex items-center gap-1">
                      <GitCommit className="h-3 w-3" />
                      <span>{project.repositoryData.commits_count}</span>
                    </div>
                    {project.repositoryData.latest_release && (
                      <div className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        <span>{project.repositoryData.latest_release.tag_name}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Tags Section - Improved spacing */}
              <div className="flex flex-wrap gap-1.5">
                <div className="mb-1 flex w-full items-center gap-2">
                  <Layers className="h-3 w-3 text-zinc-500" />
                  <span className="text-xs font-medium text-zinc-500">Tecnologías</span>
                </div>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-700/50 bg-zinc-800/80 px-2.5 py-1 text-xs text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Last Update Info - Cleaner presentation */}
              {project.repositoryData && (
                <div className="border-t border-zinc-800/50 pt-2">
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Actualizado {formatDate(project.repositoryData.updated_at)}</span>
                    </div>
                  </div>

                  {project.repositoryData.latest_commit && (
                    <div className="mt-1 flex items-start gap-2 text-xs text-zinc-600">
                      <Hash className="mt-0.5 h-3 w-3 shrink-0 text-zinc-500" />
                      <div className="min-w-0 flex-1">
                        <span className="font-mono text-zinc-500">
                          {project.repositoryData.latest_commit.sha.substring(0, 7)}
                        </span>
                        <span className="ml-2 block truncate">
                          {project.repositoryData.latest_commit.message}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>

            {/* Footer Section - Clear separation and better balance */}
            <CardFooter className="border-t border-zinc-800/30 pt-4">
              <div className="flex w-full items-center justify-between">
                {/* Stats Section - Larger and more prominent */}
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-zinc-300">
                    <Star className="h-4 w-4" />
                    <span className="font-medium">
                      {project.loading ? "..." : (project.repositoryData?.stars ?? 0)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-zinc-300">
                    <Eye className="h-4 w-4" />
                    <span className="font-medium">
                      {project.loading ? "..." : (project.repositoryData?.watchers ?? 0)}
                    </span>
                  </div>
                </div>

                {/* Action Button - Better spacing and prominence */}
                <Button variant="glass" size="sm" className="gap-2 px-4" asChild>
                  <a
                    href={
                      project.repositoryData?.html_url ||
                      `https://${project.platform}.com/${project.repository}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Ver proyecto
                  </a>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
