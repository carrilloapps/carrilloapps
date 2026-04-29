export interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  technologies: string[]
  imageEmoji: string
  year: string
  demoUrl?: string
  repoUrl?: string
  image?: string
  imageAlt?: string
  shortTitle: string
  shortDescription: string
}