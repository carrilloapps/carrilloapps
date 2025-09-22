export interface FeaturedProject {
  id: string
  name: string
  description: string
  platform: 'github' | 'gitlab'
  repository: string // owner/repo format
  icon: {
    type: 'lucide' | 'svg'
    name?: string // for lucide icons
    svg?: string // for custom SVG
    color: string
    bgColor: string
  }
  tags: string[]
  customDescription?: string // Override API description if needed
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'carrilloapps',
    name: 'carrilloapps',
    description: 'Mi sitio web con portafolio, blog, área de recursos, contacto, agendamiento y todo lo que necesita un líder de desarrollo o desarrollador de software.',
    platform: 'github',
    repository: 'carrilloapps/carrilloapps',
    icon: {
      type: 'lucide',
      name: 'Code',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10 group-hover:bg-blue-500/20'
    },
    tags: ['Next.js', 'TailwindCSS', 'Vercel'],
    customDescription: 'Construido con Next.js, usando TailwindCSS y diferentes librerías. Tiene una integración con GitHub y GitLab para mostrar los recursos públicos automáticamente.'
  },
  {
    id: 'simple-crud-api',
    name: 'Simple CRUD Api',
    description: 'Es un CRUD simple pero bastante didáctico hecho en Go, que permite crear, leer, actualizar y eliminar registros en una base de datos.',
    platform: 'github',
    repository: 'carrilloapps/simple-crud-api',
    icon: {
      type: 'lucide',
      name: 'Code',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10 group-hover:bg-yellow-500/20'
    },
    tags: ['Go', 'MongoDB', 'JWT', 'Echo'],
    customDescription: 'Implementa autenticación JWT, compresión de datos con Snappy, conexión a MongoDB, y manejo de errores robusto. Usado en aplicaciones web de alto rendimiento.'
  },
  {
    id: 'franchises-api',
    name: 'Franchises API',
    description: 'API REST moderna para gestión de franquicias construida con Kotlin y Spring Boot con PostgreSQL y OpenAPI, completamente contenerizado en Docker.',
    platform: 'github',
    repository: 'carrilloapps/franchises-api',
    icon: {
      type: 'lucide',
      name: 'Code',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10 group-hover:bg-green-500/20'
    },
    tags: ['Kotlin', 'Spring Boot', 'PostgreSQL', 'OpenAPI'],
    customDescription: 'API robusta que aprovecha las características de Kotlin y Spring Boot para ofrecer un sistema completo de gestión de franquicias con autenticación JWT y documentación OpenAPI.'
  }
]