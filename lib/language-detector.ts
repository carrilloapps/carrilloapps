/**
 * Language Detector for Code Blocks
 * Automatically detects programming language from code content
 * Supports 30+ programming languages
 */

export function detectLanguage(code: string): string {
  const trimmedCode = code.trim()
  const firstLine = trimmedCode.split("\n")[0].trim()
  const lines = trimmedCode.split("\n")

  // JSON - Debe ser lo primero para detectar correctamente
  if ((trimmedCode.startsWith("{") || trimmedCode.startsWith("[")) && 
      (trimmedCode.endsWith("}") || trimmedCode.endsWith("]"))) {
    try {
      JSON.parse(trimmedCode)
      return "json"
    } catch {
      // No es JSON válido, continuar con otras detecciones
    }
  }

  // Go - ANTES de JavaScript porque Go también usa var, import
  // Patrones específicos de Go que no existen en JavaScript
  if (
    /^package\s+\w+/.test(firstLine) ||
    /^package\s+main/.test(code) ||
    /func\s+\w+\s*\([^)]*\)\s*\{/.test(code) ||
    /func\s+\(\w+\s+\*?\w+\)/.test(code) || // métodos con receiver
    /import\s*\(\s*\n/.test(code) || // import multi-línea de Go
    /:=/.test(code) && /func\s+/.test(code) || // := con func
    /fmt\.Print/.test(code) ||
    /\bgo\s+func\(/.test(code) || // goroutines
    /defer\s+\w+/.test(code) ||
    /make\s*\(/.test(code) && /\[\]/.test(code) || // make slices
    /type\s+\w+\s+struct\s*\{/.test(code) ||
    /graphql\.NewObject\(/.test(code) || // específico de graphql-go
    /graphql\.Field\(/.test(code) ||
    /&graphql\./.test(code)
  ) {
    return "go"
  }

  // TypeScript - Detectar antes que JavaScript por las anotaciones de tipo
  // Patrones que NO aparecen en Go
  if (
    /:\s*(string|number|boolean|any|void|never|unknown|object|Promise)\b/.test(code) && !code.includes("package ") ||
    /interface\s+\w+\s*\{/.test(code) && !code.includes("package ") ||
    /type\s+\w+\s*=\s*\{/.test(code) ||
    /<\w+>/.test(code) && /\)\s*=>/.test(code) ||
    /as\s+(string|number|boolean|const)/.test(code) ||
    /enum\s+\w+\s*\{/.test(code) ||
    /:\s*\w+\[\]/.test(code) && /function|const|let/.test(code) ||
    /import\s+type\s+/.test(code) ||
    /export\s+type\s+/.test(code)
  ) {
    return "typescript"
  }

  // JavaScript - Patrones que NO son Go
  if (
    /\b(const|let)\s+\w+\s*=/.test(code) && !code.includes("package ") ||
    /var\s+\w+\s*=/.test(code) && !code.includes("package ") && !/func\s+/.test(code) ||
    /function\s*\w*\s*\([^)]*\)\s*\{/.test(code) && !/package\s+/.test(code) ||
    /=>\s*\{?/.test(code) && !/Type:/.test(code) ||
    /require\s*\(['"']/.test(code) ||
    /import\s+\w+\s+from\s+['"']/.test(code) ||
    /export\s+(default|const)\s+/.test(code) ||
    /console\.(log|error|warn|info)/.test(code) ||
    /\.(map|filter|reduce|forEach)\(/.test(code) && !code.includes("package ") ||
    /async\s+function/.test(code) ||
    /await\s+\w+/.test(code) && !code.includes("package ")
  ) {
    return "javascript"
  }

  // Python
  if (
    /^def\s+\w+\s*\(/.test(code) ||
    /^class\s+\w+.*:/.test(code) ||
    /^import\s+\w+$/.test(firstLine) ||
    /^from\s+\w+\s+import/.test(code) ||
    /if\s+__name__\s*==\s*['"']__main__['"']/.test(code) ||
    /print\s*\([^)]*\)/.test(code) && !/fmt\.Print/.test(code) ||
    /self\.\w+/.test(code) ||
    /def\s+__init__/.test(code) ||
    /@\w+\s*\n\s*def/.test(code) || // decoradores
    /\bNone\b|\bTrue\b|\bFalse\b/.test(code)
  ) {
    return "python"
  }

  // Rust
  if (
    /fn\s+\w+/.test(code) ||
    /let\s+(mut\s+)?\w+/.test(code) && code.includes("::") ||
    /impl\s+\w+/.test(code) ||
    /pub\s+fn\s+/.test(code) ||
    /println!\s*\(/.test(code) ||
    /&str|&mut|Box<|Vec<|Option<|Result</.test(code) ||
    /use\s+std::/.test(code) ||
    /'static/.test(code)
  ) {
    return "rust"
  }

  // Kotlin
  if (
    /fun\s+\w+\s*\([^)]*\)/.test(code) && !code.includes("package main") ||
    /class\s+\w+.*\{/.test(code) && /val\s+/.test(code) ||
    /val\s+\w+\s*(:|=)/.test(code) && !code.includes("package main") ||
    /var\s+\w+\s*(:|=)/.test(code) && /fun\s+/.test(code) ||
    /companion\s+object/.test(code) ||
    /data\s+class/.test(code) ||
    /sealed\s+class/.test(code) ||
    /:\s*\w+\??/.test(code) && /fun\s+/.test(code)
  ) {
    return "kotlin"
  }

  // Java
  if (
    /public\s+(class|interface|enum)\s+\w+/.test(code) ||
    /private\s+(static\s+)?\w+\s+\w+/.test(code) && !code.includes("package main") ||
    /public\s+static\s+void\s+main/.test(code) ||
    /System\.out\.print/.test(code) ||
    /@Override/.test(code) ||
    /@Entity|@Service|@Controller|@Repository/.test(code) ||
    /extends\s+\w+/.test(code) && /public\s+class/.test(code) ||
    /new\s+\w+\s*\(/.test(code) && /public|private|protected/.test(code)
  ) {
    return "java"
  }

  // Swift
  if (
    /func\s+\w+\s*\([^)]*\)/.test(code) && (code.includes("->") || /var\s+\w+:\s*\w+/.test(code)) ||
    /var\s+\w+:\s*\w+/.test(code) && !code.includes("package ") && !code.includes("func main") ||
    /let\s+\w+:\s*\w+/.test(code) && !code.includes("package ") ||
    /import\s+(Foundation|UIKit|SwiftUI)/.test(code) ||
    /guard\s+let\b/.test(code) ||
    /protocol\s+\w+/.test(code) && /func\s+/.test(code) ||
    /@IBOutlet|@IBAction/.test(code) ||
    /\?\?/.test(code) && /var|let/.test(code) // nil coalescing operator
  ) {
    return "swift"
  }

  // PHP
  if (
    /^<\?php/.test(code) ||
    /\$\w+\s*=/.test(code) && /function\s+\w+\s*\(.*\)\s*\{/.test(code) ||
    /\$this->/.test(code) ||
    /echo\s+/.test(code) && /\$/.test(code) ||
    /namespace\s+\w+;/.test(code) && /\$/.test(code) ||
    /->\w+\(/.test(code) && /\$/.test(code)
  ) {
    return "php"
  }

  // Ruby
  if (
    /def\s+\w+/.test(code) && !/self\./.test(code) && code.includes("end") ||
    /class\s+\w+/.test(code) && code.includes("end") ||
    /puts\s+/.test(code) && !code.includes("package ") ||
    /@\w+/.test(code) && /def\s+/.test(code) ||
    /do\s+\|/.test(code) ||
    /\.each\s+do/.test(code) ||
    /require\s+['"']\w+['"']/.test(code) && code.includes("end")
  ) {
    return "ruby"
  }

  // C#
  if (
    /using\s+System/.test(code) ||
    /namespace\s+\w+/.test(code) && /class\s+\w+/.test(code) && !code.includes("package ") ||
    /public\s+class\s+\w+/.test(code) && /using\s+/.test(code) ||
    /Console\.WriteLine/.test(code) ||
    /async\s+Task</.test(code) ||
    /\[HttpGet\]|\[HttpPost\]|\[Route\(/.test(code)
  ) {
    return "csharp"
  }

  // C/C++
  if (
    /#include\s*</.test(code) ||
    /int\s+main\s*\(/.test(code) && /#include/.test(code) ||
    /printf\s*\(/.test(code) ||
    /std::(cout|cin|endl)/.test(code) ||
    /cout\s*<</.test(code) ||
    /cin\s*>>/.test(code) ||
    /nullptr/.test(code)
  ) {
    return "cpp"
  }

  // SQL
  if (
    /^SELECT\s+.*\s+FROM/i.test(code) ||
    /^(INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\s+/i.test(code) ||
    /WHERE\s+\w+\s*=/i.test(code) ||
    /JOIN\s+\w+\s+ON/i.test(code) ||
    /GROUP\s+BY|ORDER\s+BY/i.test(code)
  ) {
    return "sql"
  }

  // Bash/Shell
  if (
    /^#!\/bin\/(bash|sh)/.test(firstLine) ||
    /^\$\s+\w+/.test(firstLine) ||
    /^(npm|yarn|pnpm|git|docker|kubectl|cargo|go)\s+/.test(firstLine) ||
    /(export|source|alias)\s+\w+=/.test(code) ||
    /if\s*\[\[/.test(code) && !code.includes("package ") ||
    /elif\s+/.test(code) && /then/.test(code) ||
    /for\s+\w+\s+in\s+/.test(code) && /do\s*\n/.test(code)
  ) {
    return "bash"
  }

  // HTML
  if (
    /^<!DOCTYPE html>/i.test(firstLine) ||
    /<html[^>]*>/.test(code) ||
    /<\/\w+>/.test(code) && /<\w+[^>]*>/.test(code) && !code.includes("()") && !code.includes("func ") ||
    /<(div|span|p|a|img|header|footer|section|nav|main|article|aside)[^>]*>/.test(code) && /<\//.test(code)
  ) {
    return "markup"
  }

  // CSS/SCSS
  if (
    /\{[\s\S]*:[^:]+;[\s\S]*\}/.test(code) && !code.includes("package ") ||
    /\.\w+\s*\{/.test(code) && !code.includes("()") && !code.includes("func ") && code.includes(":") && code.includes(";") ||
    /#\w+\s*\{/.test(code) && code.includes(":") && code.includes(";") ||
    /@media|@keyframes|@import/.test(code) && code.includes("{") ||
    code.includes("@mixin") || code.includes("@include") || code.includes("@extend")
  ) {
    return code.includes("@mixin") || code.includes("@include") || code.includes("@extend") ? "scss" : "css"
  }

  // Markdown
  if (
    /^#{1,6}\s+/.test(firstLine) ||
    /\[.*\]\(.*\)/.test(code) && lines.length < 50 ||
    /^\*{1,2}[^*]+\*{1,2}/.test(code) ||
    /^```/.test(firstLine) ||
    /^[-*+]\s+/.test(firstLine) ||
    lines.filter(line => /^#{1,6}\s+/.test(line)).length > 2
  ) {
    return "markdown"
  }

  // YAML
  if (
    /^\w+:\s*.+/.test(firstLine) && !code.includes("{") && !code.includes("package ") ||
    /^---\s*$/.test(firstLine) ||
    /^\s+-\s+\w+:/.test(code) ||
    lines.filter(line => /^\w+:\s*.+/.test(line) && !line.includes("{")).length > 3
  ) {
    return "yaml"
  }

  // GraphQL
  if (
    /^(query|mutation|subscription)\s+\w*\s*\{/.test(code) ||
    /type\s+\w+\s*\{/.test(code) && code.includes(":") && !code.includes("=") && !code.includes("package ") ||
    /input\s+\w+\s*\{/.test(code) ||
    /schema\s*\{/.test(code) && /query:|mutation:/.test(code) ||
    code.includes("@") && /query|mutation|subscription/.test(code)
  ) {
    return "graphql"
  }

  // Docker
  if (
    /^FROM\s+\w+/.test(firstLine) ||
    /^(RUN|CMD|COPY|ADD|WORKDIR|ENV|EXPOSE|ENTRYPOINT)\s+/.test(code)
  ) {
    return "dockerfile"
  }

  // Nginx Config
  if (
    /server\s*\{/.test(code) && /location\s+/.test(code) ||
    /listen\s+\d+;/.test(code) ||
    /proxy_pass\s+/.test(code)
  ) {
    return "nginx"
  }

  // Terraform
  if (
    /resource\s+"[^"]+"/.test(code) ||
    /provider\s+"[^"]+"/.test(code) ||
    /variable\s+"[^"]+"/.test(code) ||
    /terraform\s*\{/.test(code)
  ) {
    return "hcl"
  }

  // Dart
  if (
    /void\s+main\s*\(/.test(code) && /print\s*\(/.test(code) && !code.includes("package main") ||
    /class\s+\w+\s+extends\s+StatelessWidget/.test(code) ||
    /import\s+'package:flutter/.test(code) ||
    /final\s+\w+\s*=/.test(code) && /Widget\s+build/.test(code)
  ) {
    return "dart"
  }

  // Elixir
  if (
    /defmodule\s+\w+/.test(code) ||
    /def\s+\w+\(.*\)\s+do/.test(code) && code.includes("end") ||
    /|>/.test(code) && /def\s+/.test(code)
  ) {
    return "elixir"
  }

  // Scala
  if (
    /object\s+\w+/.test(code) && /def\s+main/.test(code) ||
    /val\s+\w+:\s*\w+\s*=/.test(code) && code.includes("=>") ||
    /case\s+class/.test(code) ||
    /implicit\s+/.test(code)
  ) {
    return "scala"
  }

  // Perl
  if (
    /^#!\/usr\/bin\/perl/.test(firstLine) ||
    /my\s+\$\w+/.test(code) && /sub\s+\w+/.test(code) ||
    /use\s+strict;/.test(code)
  ) {
    return "perl"
  }

  // Lua
  if (
    /function\s+\w+\s*\(.*\)/.test(code) && code.includes("end") && !code.includes("package ") ||
    /local\s+\w+\s*=/.test(code) && code.includes("end") ||
    /require\s*\(['"']\w+['"']\)/.test(code) && code.includes("end")
  ) {
    return "lua"
  }

  // R
  if (
    /<-/.test(code) && /function\s*\(/.test(code) ||
    /library\s*\(\w+\)/.test(code) ||
    /data\.frame/.test(code) ||
    /\bggplot\(/.test(code)
  ) {
    return "r"
  }

  // Si no se detectó ningún lenguaje, devolver "text"
  return "text"
}

/**
 * Map language names to file extensions
 */
export function getFileExtension(lang: string): string {
  const extensions: Record<string, string> = {
    javascript: "js",
    typescript: "ts",
    jsx: "jsx",
    tsx: "tsx",
    python: "py",
    go: "go",
    golang: "go",
    rust: "rs",
    java: "java",
    kotlin: "kt",
    swift: "swift",
    php: "php",
    ruby: "rb",
    csharp: "cs",
    cpp: "cpp",
    c: "c",
    markup: "html",
    html: "html",
    css: "css",
    scss: "scss",
    sass: "sass",
    less: "less",
    json: "json",
    bash: "sh",
    shell: "sh",
    yaml: "yml",
    yml: "yml",
    markdown: "md",
    md: "md",
    sql: "sql",
    graphql: "gql",
    gql: "gql",
    dockerfile: "Dockerfile",
    docker: "Dockerfile",
    nginx: "conf",
    hcl: "tf",
    terraform: "tf",
    dart: "dart",
    elixir: "ex",
    scala: "scala",
    perl: "pl",
    lua: "lua",
    r: "R",
  }
  return extensions[lang.toLowerCase()] || lang
}
