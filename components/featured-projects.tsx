"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Eye, ExternalLink, GitCommit, Tag, Calendar, Code, Hash, Layers } from "lucide-react"
import { featuredProjects, type FeaturedProject } from "@/data/featured-projects"

interface RepositoryDetails {
  id: number
  name: string
  description: string | null
  language: string | null
  stars: number
  forks: number
  watchers: number
  updated_at: string
  html_url: string
  commits_count: number
  latest_release?: {
    tag_name: string
    name: string
    published_at: string
    html_url: string
  }
  latest_commit?: {
    sha: string
    message: string
    date: string
    html_url: string
  }
}

interface ProjectWithData extends FeaturedProject {
  repositoryData?: RepositoryDetails
  loading: boolean
  error?: string
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { y: -5, transition: { duration: 0.2 } }
}

export function FeaturedProjects() {
  const [projects, setProjects] = useState<ProjectWithData[]>(
    featuredProjects.map(project => ({ ...project, loading: true }))
  )

  useEffect(() => {
    const fetchProjectData = async () => {
      const updatedProjects = await Promise.all(
        featuredProjects.map(async (project) => {
          try {
            const response = await fetch(
              `/api/repository-details?platform=${project.platform}&repository=${project.repository}`
            )
            
            if (response.ok) {
              const repositoryData: RepositoryDetails = await response.json()
              return {
                ...project,
                repositoryData,
                loading: false
              }
            } else {
              return {
                ...project,
                loading: false,
                error: 'Failed to fetch repository data'
              }
            }
          } catch {
            return {
              ...project,
              loading: false,
              error: 'Network error'
            }
          }
        })
      )
      
      setProjects(updatedProjects)
    }

    fetchProjectData()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      'TypeScript': 'bg-blue-500',
      'JavaScript': 'bg-yellow-500',
      'Go': 'bg-cyan-500',
      'Kotlin': 'bg-purple-500',
      'Python': 'bg-green-500',
      'Java': 'bg-orange-500',
    }
    return colors[language || ''] || 'bg-gray-500'
  }

  const renderIcon = (icon: FeaturedProject['icon']) => {
    if (icon.type === 'lucide' && icon.name) {
      // Render the Code icon from Lucide React
      return <Code className={`h-5 w-5 ${icon.color}`} />
    }
    
    if (icon.type === 'svg' && icon.svg) {
      return <div dangerouslySetInnerHTML={{ __html: icon.svg }} />
    }
    
    return <div className={`h-5 w-5 ${icon.color}`}>📦</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800 hover:border-zinc-700 transition-all duration-300 h-full group flex flex-col">
            {/* Header Section - Reduced padding for better proportion */}
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className={`p-2.5 rounded-lg transition-colors duration-300 ${project.icon.bgColor}`}>
                  {renderIcon(project.icon)}
                </div>
                {project.repositoryData?.name || project.name}
              </CardTitle>
              <CardDescription className="text-zinc-400 leading-relaxed text-sm mt-2">
                {project.customDescription || project.repositoryData?.description || project.description}
              </CardDescription>
            </CardHeader>
            
            {/* Content Section - Optimized spacing */}
            <CardContent className="flex-1 space-y-4 pb-4">
              {/* Language and Metadata Row - Enhanced visibility */}
              <div className="flex items-center justify-between">
                {project.repositoryData?.language && (
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getLanguageColor(project.repositoryData.language)}`}></div>
                    <span className="text-zinc-300 font-medium text-sm">{project.repositoryData.language}</span>
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
                <div className="flex items-center gap-2 w-full mb-1">
                  <Layers className="h-3 w-3 text-zinc-500" />
                  <span className="text-xs text-zinc-500 font-medium">Tecnologías</span>
                </div>
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-zinc-800/80 text-zinc-300 text-xs rounded-full border border-zinc-700/50">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Last Update Info - Cleaner presentation */}
              {project.repositoryData && (
                <div className="pt-2 border-t border-zinc-800/50">
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Actualizado {formatDate(project.repositoryData.updated_at)}</span>
                    </div>
                  </div>
                  
                  {project.repositoryData.latest_commit && (
                    <div className="flex items-start gap-2 text-xs text-zinc-600 mt-1">
                      <Hash className="h-3 w-3 text-zinc-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="font-mono text-zinc-500">{project.repositoryData.latest_commit.sha.substring(0, 7)}</span>
                        <span className="ml-2 truncate block">{project.repositoryData.latest_commit.message}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            
            {/* Footer Section - Clear separation and better balance */}
            <CardFooter className="pt-4 border-t border-zinc-800/30">
              <div className="flex items-center justify-between w-full">
                {/* Stats Section - Larger and more prominent */}
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-300 transition-colors">
                    <Star className="h-4 w-4" />
                    <span className="font-medium">
                      {project.loading ? '...' : project.repositoryData?.stars ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-300 transition-colors">
                    <Eye className="h-4 w-4" />
                    <span className="font-medium">
                      {project.loading ? '...' : project.repositoryData?.watchers ?? 0}
                    </span>
                  </div>
                </div>
                
                {/* Action Button - Better spacing and prominence */}
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-zinc-700 hover:bg-zinc-800 hover:border-${project.icon.color.split('-')[1]}-500 gap-2 transition-all duration-200 px-4`}
                  asChild
                >
                  <a 
                    href={project.repositoryData?.html_url || `https://${project.platform}.com/${project.repository}`} 
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