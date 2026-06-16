/**
 * Curated open-source work — mixes NPM packages I maintain with GitHub
 * projects that don't ship to NPM but are still useful references.
 *
 * Versions are NOT hard-coded: for npm packages the card renders a live
 * shields.io version badge derived from the package slug, so the number always
 * tracks the latest published release (same approach as each project's README).
 */
export interface OpenSourceProject {
  /** Display name shown on the card. */
  name: string
  /** Optional npm package slug when it differs from the display `name`
   *  (e.g. the "zefer" product whose package is "zefer-cli"). The live version
   *  badge is built from this when present, otherwise from `name`. */
  packageName?: string
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
    name: "zefer",
    packageName: "zefer-cli",
    description:
      "Cifrado AES-256-GCM zero-knowledge end-to-end: app web + CLI en zefer.carrillo.app. El servidor nunca ve tus datos.",
    registry: "npm",
    language: "TypeScript",
    languageColor: "#3178c6",
    tags: ["Encryption", "Web", "CLI"],
    url: "https://www.npmjs.com/package/zefer-cli",
    repoUrl: "https://github.com/carrilloapps/zefer",
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
]
