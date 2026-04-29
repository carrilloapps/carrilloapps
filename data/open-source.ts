/**
 * Curated open-source work — mixes NPM packages I maintain with GitHub
 * projects that don't ship to NPM but are still useful references.
 *
 * Stats (downloads/week) are illustrative; the live numbers are surfaced at
 * runtime by the home-page section calling the npm registry where applicable.
 */
export interface OpenSourceProject {
  /** Display name, ideally the package name. */
  name: string
  /** One-line description (≤ 110 chars). */
  description: string
  /** Public registry — drives the meta strip rendered in the card. */
  registry: "npm" | "github"
  /** Pretty version label shown next to the name (e.g. "v1.1.1"). */
  version?: string
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
    version: "v1.1.1",
    language: "TypeScript",
    languageColor: "#3178c6",
    tags: ["Encryption", "CLI", "Security"],
    url: "https://www.npmjs.com/package/zefer-cli",
    repoUrl: "https://github.com/carrilloapps/zefer-cli",
  },
  {
    name: "bcv-exchange-rate",
    description:
      "Librería Node.js para consultar tasas oficiales del BCV (Venezuela) y la TRM (Colombia). Cache, retries y tipado.",
    registry: "npm",
    version: "v1.0.1",
    language: "TypeScript",
    languageColor: "#3178c6",
    tags: ["Fintech", "Forex", "Node.js"],
    url: "https://www.npmjs.com/package/bcv-exchange-rate",
    repoUrl: "https://github.com/carrilloapps/bcv-exchange-rate",
  },
  {
    name: "hfo-cli",
    description:
      "TUI fullscreen para descubrir, instalar y gestionar modelos GGUF de Hugging Face desde Ollama. Auto-tuned a tu hardware.",
    registry: "npm",
    version: "v0.1.0",
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
