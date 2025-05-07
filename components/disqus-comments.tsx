"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

interface DisqusCommentsProps {
  shortname: string
  identifier: string
  title: string
  url?: string
}

declare global {
  interface Window {
    DISQUS?: any
    disqus_config?: any
  }
}

export function DisqusComments({ shortname, identifier, title, url }: DisqusCommentsProps) {
  const pathname = usePathname()
  const fullUrl = url || (typeof window !== "undefined" ? window.location.href : "")

  useEffect(() => {
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
    document.body.appendChild(script)

    return () => {
      // Clean up script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [shortname, identifier, title, fullUrl, pathname])

  return (
    <div className="mt-12 pt-8 border-t border-zinc-800">
      <h2 className="text-2xl font-bold mb-6">Comentarios</h2>
      <div id="disqus_thread" className="bg-zinc-900 p-4 rounded-lg min-h-[300px]"></div>
      <noscript>
        Por favor habilita JavaScript para ver los <a href="https://disqus.com/?ref_noscript">comentarios de Disqus.</a>
      </noscript>
    </div>
  )
}
