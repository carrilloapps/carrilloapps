"use client"

import { useState } from "react"
import parse, { Element, type HTMLReactParserOptions, type DOMNode } from "html-react-parser"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { detectLanguage, getFileExtension } from "@/lib/language-detector"

interface BlogContentRendererProps {
  content: string
}

// Tema VS Code con colores vibrantes
const vsCodeTheme: { [key: string]: React.CSSProperties } = {
  'code[class*="language-"]': {
    color: "#D4D4D4",
    background: "#1E1E1E",
    fontFamily: "Consolas, 'Courier New', monospace",
    fontSize: "14px",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    lineHeight: "1.5",
    tabSize: 4,
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    color: "#D4D4D4",
    background: "#1E1E1E",
    fontFamily: "Consolas, 'Courier New', monospace",
    fontSize: "14px",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    lineHeight: "1.5",
    tabSize: 4,
    hyphens: "none",
    padding: "1em",
    margin: ".5em 0",
    overflow: "auto",
  },
  'comment': { color: "#6A9955", fontStyle: "italic" },
  'prolog': { color: "#6A9955" },
  'doctype': { color: "#569CD6" },
  'cdata': { color: "#6A9955" },
  'punctuation': { color: "#D4D4D4" },
  'property': { color: "#9CDCFE" },
  'tag': { color: "#569CD6" },
  'boolean': { color: "#569CD6" },
  'number': { color: "#B5CEA8" },
  'constant': { color: "#4FC1FF" },
  'symbol': { color: "#4EC9B0" },
  'deleted': { color: "#CE9178" },
  'selector': { color: "#D7BA7D" },
  'attr-name': { color: "#9CDCFE" },
  'string': { color: "#CE9178" },
  'char': { color: "#CE9178" },
  'builtin': { color: "#4EC9B0" },
  'inserted': { color: "#B5CEA8" },
  'operator': { color: "#D4D4D4" },
  'entity': { color: "#4EC9B0" },
  'url': { color: "#9CDCFE" },
  'variable': { color: "#9CDCFE" },
  'atrule': { color: "#C586C0" },
  'attr-value': { color: "#CE9178" },
  'function': { color: "#DCDCAA" },
  'class-name': { color: "#4EC9B0" },
  'keyword': { color: "#C586C0" },
  'regex': { color: "#D16969" },
  'important': { color: "#569CD6", fontWeight: "bold" },
  'bold': { fontWeight: "bold" },
  'italic': { fontStyle: "italic" },
}

// Componente para el bloque de código con estilo VS Code
function VSCodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="not-prose relative group my-6 rounded-lg overflow-hidden border border-zinc-800/50 shadow-2xl bg-[#1E1E1E]">
      {/* VS Code Window Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#2D2D30] border-b border-zinc-800/50">
        <div className="flex items-center gap-2">
          {/* Window control buttons */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          {/* File name */}
          <span className="ml-3 text-xs text-zinc-400 font-medium">
            example.{getFileExtension(language)}
          </span>
        </div>
        
        {/* Language badge and copy button */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {language.toUpperCase()}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2 text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs">Copiar</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Code content */}
      <SyntaxHighlighter
        language={language}
        style={vsCodeTheme}
        showLineNumbers={code.split("\n").length > 3}
        wrapLines={true}
        customStyle={{
          margin: 0,
          padding: "1.25rem",
          background: "#1E1E1E",
          fontSize: "0.875rem",
          lineHeight: "1.6",
        }}
        lineNumberStyle={{
          minWidth: "3em",
          paddingRight: "1.5em",
          color: "#858585",
          userSelect: "none",
          borderRight: "1px solid #2d2d30",
          marginRight: "1em",
        }}
        codeTagProps={{
          style: {
            fontFamily: "Consolas, 'Courier New', Monaco, monospace",
          }
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export function BlogContentRenderer({ content }: BlogContentRendererProps) {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === "pre") {
        const getTextContent = (node: DOMNode | string): string => {
          if (typeof node === "string") return node
          if ("type" in node && node.type === "text" && "data" in node) return node.data as string
          if ("name" in node && node.name === "br") return "\n"
          if ("children" in node && Array.isArray(node.children)) {
            return node.children.map((child: DOMNode) => getTextContent(child)).join("")
          }
          return ""
        }

        // Caso 1: <pre><code class="language-xxx">...</code></pre>
        const codeChild = domNode.children?.find(
          (child) => child instanceof Element && child.name === "code"
        )

        if (codeChild && codeChild instanceof Element) {
          const code = getTextContent(codeChild).trim()
          const classList = codeChild.attribs?.class?.split(" ") || []
          const languageClass = classList.find((cls: string) => cls.startsWith("language-"))
          let language = languageClass ? languageClass.replace("language-", "") : "text"

          const languageMap: Record<string, string> = {
            js: "javascript",
            ts: "typescript",
            jsx: "jsx",
            tsx: "tsx",
            golang: "go",
            py: "python",
            rb: "ruby",
            sh: "bash",
            shell: "bash",
            yml: "yaml",
            html: "markup",
            md: "markdown",
          }

          language = languageMap[language.toLowerCase()] || language
          return <VSCodeBlock code={code} language={language} />
        }

        // Caso 2: <pre>código directo</pre> (sin <code>)
        if (domNode.children && domNode.children.length > 0) {
          const code = getTextContent(domNode).trim()
          
          // Si tiene contenido, mostrarlo como bloque de código genérico
          if (code) {
            // Detectar el lenguaje por el contenido
            const language = detectLanguage(code)
            return <VSCodeBlock code={code} language={language} />
          }
        }
      }
    },
  }

  return (
    <div className="prose prose-invert prose-blue max-w-none 
      prose-headings:font-bold prose-headings:text-white
      prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-10 
      prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-10 prose-h2:border-b prose-h2:border-zinc-800 prose-h2:pb-3
      prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
      prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:my-4
      prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 hover:prose-a:underline
      prose-strong:text-white prose-strong:font-semibold
      prose-code:text-emerald-400 prose-code:bg-zinc-800/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0
      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-zinc-900/40 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:italic prose-blockquote:text-zinc-400
      prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
      prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
      prose-li:text-zinc-300 prose-li:my-1
      prose-img:rounded-lg prose-img:shadow-xl prose-img:my-6
      prose-hr:border-zinc-800 prose-hr:my-8">
      {parse(content, options)}
    </div>
  )
}


