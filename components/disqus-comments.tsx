"use client"

import { DiscussionEmbed } from 'disqus-react'
import { motion } from "@/lib/motion"
import { MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { publicEnv, getSiteUrl } from "@/lib/env"

interface DisqusCommentsProps {
  shortname?: string
  identifier: string
  title: string
  url?: string
}

export function DisqusComments({ 
  shortname = publicEnv.DISQUS_SHORTNAME, 
  identifier, 
  title, 
  url 
}: DisqusCommentsProps) {
  const siteUrl = getSiteUrl()
  const fullUrl = url || `${siteUrl}/blog/${identifier}`

  if (!shortname) {
    return null
  }

  const disqusConfig = {
    url: fullUrl,
    identifier: identifier,
    title: title,
    language: 'es_MX'
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
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <DiscussionEmbed
            shortname={shortname}
            config={disqusConfig}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
