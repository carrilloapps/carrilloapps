"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { MessageSquare, Users, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { publicEnv, getSiteUrl } from "@/lib/env"

interface DisqusCommentsProps {
  shortname?: string
  identifier: string
  title: string
  url?: string
}

interface DisqusConfig {
  page: {
    identifier: string
    url: string
    title: string
  }
}

declare global {
  interface Window {
    DISQUS?: {
      reset: (config: { reload: boolean; config: () => void }) => void
    }
    disqus_config?: () => void
    DISQUSWIDGETS?: {
      getCount: (config: { reset: boolean }) => void
    }
  }
}

export function DisqusComments({ 
  shortname = publicEnv.DISQUS_SHORTNAME, 
  identifier, 
  title, 
  url 
}: DisqusCommentsProps) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [commentCount, setCommentCount] = useState<number | null>(null)
  
  const siteUrl = getSiteUrl()
  const fullUrl = url || `${siteUrl}${pathname}`

  // Fetch comment count
  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        // This will be populated by Disqus widgets script
        const countElement = document.querySelector(`[data-disqus-identifier="${identifier}"]`)
        if (countElement) {
          const count = countElement.textContent?.match(/\d+/)?.[0]
          if (count) {
            setCommentCount(parseInt(count))
          }
        }
      } catch (error) {
        console.warn("Could not fetch comment count:", error)
      }
    }

    // Load Disqus count script
    if (!document.querySelector('script[src*="count.js"]')) {
      const countScript = document.createElement("script")
      countScript.src = `https://${shortname}.disqus.com/count.js`
      countScript.async = true
      document.body.appendChild(countScript)
    }

    fetchCommentCount()
  }, [shortname, identifier])

  useEffect(() => {
    if (!shortname) {
      setHasError(true)
      setIsLoading(false)
      return
    }

    const loadDisqus = () => {
      try {
        // Reset Disqus if it's already loaded
        if (window.DISQUS) {
          window.DISQUS.reset({
            reload: true,
            config: function () {
              this.page.identifier = identifier
              this.page.url = fullUrl
              this.page.title = title
            },
          })
          setIsLoading(false)
          return
        }

        // Configure Disqus
        window.disqus_config = function () {
          this.page.identifier = identifier
          this.page.url = fullUrl
          this.page.title = title
        }

        // Load Disqus script
        const script = document.createElement("script")
        script.src = `https://${shortname}.disqus.com/embed.js`
        script.setAttribute("data-timestamp", Date.now().toString())
        script.async = true
        
        script.onload = () => {
          setIsLoading(false)
          setHasError(false)
        }
        
        script.onerror = () => {
          setHasError(true)
          setIsLoading(false)
        }
        
        document.body.appendChild(script)

        return () => {
          // Clean up script when component unmounts
          if (document.body.contains(script)) {
            document.body.removeChild(script)
          }
        }
      } catch (error) {
        console.error("Error loading Disqus:", error)
        setHasError(true)
        setIsLoading(false)
      }
    }

    const timer = setTimeout(loadDisqus, 100)
    return () => clearTimeout(timer)
  }, [shortname, identifier, title, fullUrl, pathname])

  if (!shortname) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-12 pt-8"
      >
        <Card className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 backdrop-blur-sm border border-amber-700/30">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-amber-100 mb-2">
              Configuración de comentarios pendiente
            </h3>
            <p className="text-amber-200/80 text-sm">
              Para habilitar los comentarios, configura la variable de entorno <code className="bg-amber-900/30 px-2 py-1 rounded">NEXT_PUBLIC_DISQUS_SHORTNAME</code>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12 pt-8"
    >
      <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-blue-600/30">
                <MessageSquare className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Comentarios
                </h2>
                <p className="text-sm text-zinc-400">
                  Comparte tu opinión sobre este artículo
                </p>
              </div>
            </div>
            
            {commentCount !== null && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Badge 
                  variant="outline" 
                  className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 text-blue-100"
                >
                  <Users className="h-3 w-3 mr-1" />
                  {commentCount} {commentCount === 1 ? 'comentario' : 'comentarios'}
                </Badge>
              </motion.div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 space-y-4"
            >
              <div className="flex items-center justify-center gap-3 text-zinc-400">
                <Clock className="h-5 w-5 animate-spin" />
                <span>Cargando comentarios...</span>
              </div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-zinc-800 rounded-full animate-pulse" />
                      <div className="h-4 bg-zinc-800 rounded w-24 animate-pulse" />
                      <div className="h-3 bg-zinc-800 rounded w-16 animate-pulse" />
                    </div>
                    <div className="ml-11 space-y-2">
                      <div className="h-3 bg-zinc-800 rounded w-full animate-pulse" />
                      <div className="h-3 bg-zinc-800 rounded w-3/4 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {hasError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 text-center"
            >
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-100 mb-2">
                Error al cargar comentarios
              </h3>
              <p className="text-red-200/80 text-sm mb-4">
                No se pudieron cargar los comentarios. Verifica tu conexión a internet.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.reload()}
                className="border-red-700/50 bg-red-900/20 hover:bg-red-800/30 text-red-100"
              >
                Reintentar
              </Button>
            </motion.div>
          )}

          <div className="p-6">
            <div 
              id="disqus_thread" 
              className="min-h-[400px] rounded-lg"
              data-disqus-identifier={identifier}
            />
          </div>
        </CardContent>
      </Card>

      <noscript>
        <Card className="mt-4 bg-gradient-to-br from-amber-900/20 to-orange-900/20 backdrop-blur-sm border border-amber-700/30">
          <CardContent className="p-4 text-center">
            <p className="text-amber-200">
              Por favor habilita JavaScript para ver los{" "}
              <a 
                href="https://disqus.com/?ref_noscript" 
                className="text-amber-100 underline hover:text-amber-50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                comentarios de Disqus
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </noscript>
    </motion.div>
  )
}
