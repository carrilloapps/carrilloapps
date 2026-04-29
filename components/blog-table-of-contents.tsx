"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { List, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export interface TocHeading {
  id: string
  text: string
  level: number
}

/** Extract h2/h3 headings and generate slug IDs from HTML content */
export function extractHeadings(html: string): TocHeading[] {
  const headings: TocHeading[] = []
  const regex = /<h([23])[^>]*>(.*?)<\/h\1>/gi
  let match: RegExpExecArray | null

  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10)
    const text = match[2].replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, (entity) => {
      const el = typeof document !== "undefined"
        ? document.createElement("textarea")
        : null
      if (el) { el.innerHTML = entity; return el.value }
      return entity
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#8217;/g, "'")
        .replace(/&#8220;/g, "\u201C")
        .replace(/&#8221;/g, "\u201D")
        .replace(/&quot;/g, '"')
    }).trim()

    if (!text) continue

    const id = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")

    headings.push({ id, text, level })
  }

  return headings
}

interface BlogTableOfContentsProps {
  headings: TocHeading[]
}

export function BlogTableOfContents({ headings }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [readProgress, setReadProgress] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Track active heading with IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Find the topmost visible heading
      const visibleEntries = entries.filter(e => e.isIntersecting)
      if (visibleEntries.length > 0) {
        // Sort by position in viewport
        const sorted = visibleEntries.sort((a, b) => {
          return a.boundingClientRect.top - b.boundingClientRect.top
        })
        setActiveId(sorted[0].target.id)
      }
    }

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-80px 0px -70% 0px",
      threshold: 0,
    })

    // Wait for IDs to be injected into the DOM
    const timer = setTimeout(() => {
      headings.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) observerRef.current?.observe(el)
      })
    }, 500)

    return () => {
      clearTimeout(timer)
      observerRef.current?.disconnect()
    }
  }, [headings])

  // Track reading progress through the article
  useEffect(() => {
    const article = document.querySelector("article")
    if (!article) return

    const handleScroll = () => {
      const rect = article.getBoundingClientRect()
      const totalHeight = rect.height
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(100, Math.round((scrolled / (totalHeight - window.innerHeight)) * 100))
      setReadProgress(Math.max(0, progress))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 100
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: "smooth" })
      setActiveId(id)
    }
  }, [])

  if (headings.length === 0) return null

  const activeIndex = headings.findIndex(h => h.id === activeId)

  return (
    <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 overflow-hidden hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
      {/* Progress bar */}
      <div className="h-0.5 w-full bg-zinc-800/50">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${readProgress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <CardHeader className="pb-2 pt-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-between w-full group cursor-pointer"
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? "Expandir tabla de contenidos" : "Colapsar tabla de contenidos"}
        >
          <h3 className="text-sm font-semibold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent flex items-center gap-2">
            <List className="h-4 w-4 text-blue-400" />
            Contenido
            <span className="text-[10px] font-normal text-zinc-500 ml-1">
              {headings.length} secciones
            </span>
          </h3>
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronUp className="h-4 w-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
          </motion.div>
        </button>

        {/* Active section indicator */}
        {activeIndex >= 0 && !isCollapsed && (
          <motion.p
            className="text-[11px] text-zinc-500 mt-1 truncate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={activeId}
          >
            {activeIndex + 1} de {headings.length} · {readProgress}% leído
          </motion.p>
        )}
      </CardHeader>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <CardContent className="pt-0 pb-4">
              <nav aria-label="Tabla de contenidos">
                <ul className="space-y-0.5 relative">
                  {/* Vertical track line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-zinc-800" aria-hidden="true" />

                  {/* Active indicator on the track */}
                  {activeIndex >= 0 && (
                    <motion.div
                      className="absolute left-[5px] w-[5px] h-5 rounded-full bg-gradient-to-b from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30"
                      initial={false}
                      animate={{
                        top: `${activeIndex * 32 + 8}px`,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}

                  {headings.map((heading, index) => {
                    const isActive = heading.id === activeId
                    const isPast = activeIndex >= 0 && index < activeIndex

                    return (
                      <li key={heading.id} className="relative">
                        <button
                          onClick={() => scrollToHeading(heading.id)}
                          className={`
                            w-full text-left py-1.5 transition-all duration-200 rounded-md group/item flex items-start gap-3 cursor-pointer
                            ${heading.level === 3 ? "pl-7" : "pl-5"}
                            ${isActive
                              ? "text-blue-400"
                              : isPast
                                ? "text-zinc-500"
                                : "text-zinc-400 hover:text-zinc-200"
                            }
                          `}
                          aria-current={isActive ? "location" : undefined}
                        >
                          {/* Dot on the track */}
                          {heading.level === 2 && (
                            <span
                              className={`
                                mt-[7px] w-[5px] h-[5px] rounded-full flex-shrink-0 transition-colors duration-200 -ml-[12px]
                                ${isActive
                                  ? "bg-blue-400 shadow-sm shadow-blue-400/50"
                                  : isPast
                                    ? "bg-zinc-600"
                                    : "bg-zinc-700 group-hover/item:bg-zinc-500"
                                }
                              `}
                              aria-hidden="true"
                            />
                          )}

                          <span
                            className={`
                              text-[12px] leading-snug transition-all duration-200 line-clamp-2
                              ${heading.level === 3 ? "text-[11px]" : "font-medium"}
                              ${isActive ? "translate-x-0.5" : ""}
                            `}
                          >
                            {heading.text}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
