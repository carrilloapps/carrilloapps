/**
 * Curated open-source work — mixes NPM packages I maintain with GitHub
 * projects that don't ship to NPM but are still useful references.
 *
 * Versions are NOT hard-coded: for npm packages the card renders a live
 * shields.io version badge derived from `name`, so the number always tracks
 * the latest published release (same approach as each project's README).
 */
export interface OpenSourceProject {
  /** Display name. For npm packages this MUST equal the package slug — the
   *  live version badge is built from it (`img.shields.io/npm/v/<name>`). */
  name: string
  /** One-line description (≤ 110 chars). */
  description: string
  /** Public registry — drives the meta strip + version badge in the card. */
  registry: "npm" | "github"
  /** Primary language (shows as a coloured dot + label). */
  language: string
  /** Hex colour for the language dot. */
  languageColor: string
  /** Topical chips. Keep ≤ 3 to avoid card clutter. */
  tags: string[]
  /** External link — npm package page or GitHub repo. */
  url: string
  /** Optional GitHub repo URL when the primary link is npm. */
  repoUrl?: string
}

export const openSourceProjects: OpenSourceProject[] = [
  {
    name: "zefer-cli",
    description:
      "CLI para Zefer — cifrado AES-256-GCM de archivos y texto desde la terminal. Zero-knowledge, end-to-end.",
    registry: "npm",
    language: "TypeScript",
    languageColor: "#3178c6",
    tags: ["Encryption", "CLI", "Security"],
    url: "https://www.npmjs.com/package/zefer-cli",
    repoUrl: "https://github.com/carrilloapps/zefer-cli",
  },
  {
    name: "bcv-exchange-rate",
    description:
      "Librería Node.js + servidor MCP para tasas oficiales del BCV (Venezuela), TRM (Colombia) y PTAX (Brasil).",
    registry: "npm",
    language: "TypeScript",
    languageColor: "#3178c6",
    tags: ["Fintech", "Forex", "MCP"],
    url: "https://www.npmjs.com/package/bcv-exchange-rate",
    repoUrl: "https://github.com/carrilloapps/bcv-exchange-rate",
  },
  {
    name: "skill-rules",
    description:
      "Sincroniza skills de agentes IA entre Claude Code, Cursor, Windsurf y más — activa reglas por entorno con un comando.",
    registry: "npm",
    language: "JavaScript",
    languageColor: "#f1e05a",
    tags: ["AI", "CLI", "DX"],
    url: "https://www.npmjs.com/package/skill-rules",
    repoUrl: "https://github.com/carrilloapps/skill-rules",
  },
  {
    name: "ai-sync-cli",
    description:
      "Sincroniza configuración, skills y sesiones entre 20+ agentes IA y 12+ IDEs, con soporte MCP nativo.",
    registry: "npm",
    language: "TypeScript",
    languageColor: "#3178c6",
    tags: ["AI", "Sync", "MCP"],
    url: "https://www.npmjs.com/package/ai-sync-cli",
    repoUrl: "https://github.com/carrilloapps/ai-sync-cli",
  },
  {
    name: "hfo-cli",
    description:
      "TUI fullscreen para descubrir, instalar y gestionar modelos GGUF de Hugging Face desde Ollama. Auto-tuned a tu hardware.",
    registry: "npm",
    language: "TypeScript",
    languageColor: "#3178c6",
    tags: ["LLM", "TUI", "Ollama"],
    url: "https://www.npmjs.com/package/hfo-cli",
    repoUrl: "https://github.com/carrilloapps/hfo",
  },
  {
    name: "zefer",
    description:
      "App web de cifrado end-to-end zero-knowledge. Toda la operación corre en tu navegador — el servidor nunca ve tus datos.",
    registry: "github",
    language: "TypeScript",
    languageColor: "#3178c6",
    tags: ["Encryption", "Web", "Privacy"],
    url: "https://github.com/carrilloapps/zefer",
  },
  {
    name: "skills",
    description:
      "Compuerta adversarial de riesgo para agentes IA — bloquea acciones hasta que las apruebas. Compatible con 40+ agentes.",
    registry: "github",
    language: "Shell",
    languageColor: "#89e051",
    tags: ["AI", "Security", "Agents"],
    url: "https://github.com/carrilloapps/skills",
  },
  {
    name: "evolution-api-on-dokku",
    description:
      "Deployment production-ready de Evolution API (WhatsApp REST) en Dokku. PostgreSQL, Redis y persistencia incluidos.",
    registry: "github",
    language: "Docker",
    languageColor: "#2496ed",
    tags: ["WhatsApp", "Dokku", "DevOps"],
    url: "https://github.com/carrilloapps/evolution-api-on-dokku",
  },
  {
    name: "picoclaw-dotfiles",
    description:
      "Convierte un Android viejo en un asistente IA 24/7. Setup one-click con Termux, modelos locales y acceso remoto.",
    registry: "github",
    language: "Shell",
    languageColor: "#89e051",
    tags: ["AI", "Mobile", "Self-hosted"],
    url: "https://github.com/carrilloapps/picoclaw-dotfiles",
  },
]
