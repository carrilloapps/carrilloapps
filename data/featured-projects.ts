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
    id: 'hfo',
    name: 'hfo',
    description: 'TUI fullscreen y CLI headless para descubrir, instalar y gestionar modelos GGUF de Hugging Face sobre Ollama.',
    platform: 'github',
    repository: 'carrilloapps/hfo',
    icon: {
      type: 'lucide',
      name: 'Code',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10 group-hover:bg-cyan-500/20'
    },
    tags: ['TypeScript', 'LLM', 'Ollama', 'TUI'],
    customDescription: 'Detecta tu hardware y auto-ajusta los parámetros del modelo. Distribuido en npm como hfo-cli, con interfaz interactiva en Ink y modo CLI scripteable.'
  },
  {
    id: 'zefer',
    name: 'zefer',
    description: 'Herramienta de cifrado end-to-end y zero-knowledge que corre 100% en tu navegador — el servidor nunca ve tus datos.',
    platform: 'github',
    repository: 'carrilloapps/zefer',
    icon: {
      type: 'lucide',
      name: 'Code',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10 group-hover:bg-emerald-500/20'
    },
    tags: ['TypeScript', 'Next.js', 'Web Crypto', 'PWA'],
    customDescription: 'Cifrado AES-256-GCM del lado del cliente con Web Crypto API. Instalable como PWA y acompañada por su CLI oficial (zefer-cli) para flujos desde la terminal.'
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