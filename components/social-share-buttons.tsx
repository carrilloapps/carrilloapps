"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Link2, Mail } from "lucide-react"
import { motion } from "framer-motion"

interface SocialShareButtonsProps {
  title: string
  url: string
  description?: string
}

export function SocialShareButtons({ title, url, description = "" }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLinks = [
    {
      name: "X (Twitter)",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: "hover:bg-black hover:text-white",
      bgGradient: "from-black to-zinc-800"
    },
    {
      name: "Facebook",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "hover:bg-[#1877f2] hover:text-white",
      bgGradient: "from-[#1877f2] to-[#0c63d4]"
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "hover:bg-[#0077b5] hover:text-white",
      bgGradient: "from-[#0077b5] to-[#005885]"
    },
    {
      name: "WhatsApp",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      url: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
      color: "hover:bg-[#25d366] hover:text-white",
      bgGradient: "from-[#25d366] to-[#1da851]"
    },
    {
      name: "Telegram",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: "hover:bg-[#0088cc] hover:text-white",
      bgGradient: "from-[#0088cc] to-[#0077b3]"
    },
    {
      name: "Reddit",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      ),
      url: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      color: "hover:bg-[#ff4500] hover:text-white",
      bgGradient: "from-[#ff4500] to-[#cc3700]"
    },
    {
      name: "Hacker News",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-4.972l4.148-7.799h-1.749l-2.457 4.875c-.372.745-.688 1.434-.688 1.434s-.297-.708-.651-1.434L8.831 5.896h-1.88z" />
        </svg>
      ),
      url: `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`,
      color: "hover:bg-[#ff6600] hover:text-white",
      bgGradient: "from-[#ff6600] to-[#cc5200]"
    },
    {
      name: "Dev.to",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z" />
        </svg>
      ),
      url: `https://dev.to/new?prefill=${encodeURIComponent(`---\ntitle: ${title}\npublished: false\ndescription: ${description}\ntags: \n---\n\n[Leer más](${url})`)}`,
      color: "hover:bg-black hover:text-white",
      bgGradient: "from-black to-zinc-800"
    },
    {
      name: "Email",
      icon: <Mail className="h-4 w-4" />,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + "\n\n" + url)}`,
      color: "hover:bg-zinc-600 hover:text-white",
      bgGradient: "from-zinc-600 to-zinc-700"
    }
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
        Compartir artículo
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((social, index) => (
          <motion.div
            key={social.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Button
              variant="outline"
              size="sm"
              asChild
              className={`border-zinc-700/50 bg-zinc-900/50 backdrop-blur-sm ${social.color} transition-all duration-300 hover:scale-105 hover:shadow-lg gap-2`}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  // Para email, no abrir en nueva pestaña
                  if (social.name === "Email") {
                    return
                  }
                  e.preventDefault()
                  window.open(social.url, "_blank", "width=550,height=420")
                }}
              >
                {social.icon}
                <span className="hidden sm:inline text-xs font-medium">{social.name}</span>
              </a>
            </Button>
          </motion.div>
        ))}
        
        {/* Botón para copiar link */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: shareLinks.length * 0.05 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="border-zinc-700/50 bg-zinc-900/50 backdrop-blur-sm hover:bg-blue-600 hover:text-white hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span className="hidden sm:inline text-xs font-medium">Copiado</span>
              </>
            ) : (
              <>
                <Link2 className="h-4 w-4" />
                <span className="hidden sm:inline text-xs font-medium">Copiar link</span>
              </>
            )}
          </Button>
        </motion.div>
      </div>

      {/* Descripción */}
      <p className="text-xs text-zinc-500">
        Comparte este artículo con la comunidad de desarrolladores
      </p>
    </div>
  )
}
