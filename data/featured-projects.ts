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
    id: 'bcv-exchange-rate',
    name: 'bcv-exchange-rate',
    description: 'Librería Node.js y servidor MCP para consultar tasas oficiales del BCV (Venezuela), TRM (Colombia) y PTAX (Brasil).',
    platform: 'github',
    repository: 'carrilloapps/bcv-exchange-rate',
    icon: {
      type: 'lucide',
      name: 'Code',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10 group-hover:bg-amber-500/20'
    },
    tags: ['TypeScript', 'Fintech', 'MCP', 'Node.js'],
    customDescription: 'Scraping resiliente con cache, reintentos y tipado estricto. Publicada en npm (~700 descargas/mes) y disponible como servidor MCP para integraciones con IA.'
  }
]