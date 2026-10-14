"use client"

import { DiscussionEmbed } from "disqus-react"
import { motion } from "@/lib/motion"
import { MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { publicEnv, getSiteUrl } from "@/lib/env"
import { useSyncExternalStore } from "react"

const emptySubscribe = () => () => {}
const getIsLocalhost = () =>
  typeof window !== "undefined" && window.location.hostname === "localhost"
const getServerSnapshot = () => false

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
  url,
}: DisqusCommentsProps) {
  const siteUrl = getSiteUrl()
  const fullUrl = url || `${siteUrl}/blog/${identifier}`
  const isLocalhost = useSyncExternalStore(emptySubscribe, getIsLocalhost, getServerSnapshot)

  if (!shortname || isLocalhost) {
    return null
  }

  const disqusConfig = {
    url: fullUrl,
    identifier: identifier,
    title: title,
    language: "es_MX",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12 pt-8"
    >
      <Card className="surface-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-support/35 bg-support/10">
                <MessageSquare className="h-5 w-5 text-support" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-paper">Comentarios</h2>
                <p className="text-sm text-paper-dim">Comparte tu opinión sobre este artículo</p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <DiscussionEmbed shortname={shortname} config={disqusConfig} />
        </CardContent>
      </Card>
    </motion.div>
  )
}
