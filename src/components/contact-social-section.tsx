"use client"

import { motion } from "@/lib/motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "lucide-react"
import { Github, Linkedin, Substack } from "@/components/icons/social-icons"
import { SocialLinkCard } from "@/components/social-link-card"

export function ContactSocialSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      whileHover={{ y: -4 }}
    >
      <Card className="surface-card group">
        {/* Card Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <CardHeader className="relative z-10">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
              <Globe className="h-5 w-5 text-purple-400" />
            </div>
            <CardTitle className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-2xl text-transparent">
              Mis redes sociales
            </CardTitle>
          </div>
          <CardDescription className="text-zinc-300">
            Conéctate conmigo o explora mi trabajo en línea.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-2 gap-4">
            <SocialLinkCard
              href="https://github.com/carrilloapps"
              icon={Github}
              label="GitHub"
              iconGradientFrom="from-purple-600/20"
              iconGradientTo="to-pink-600/20"
              iconColor="text-purple-400"
              borderHoverColor="border-purple-500/30"
              delay={0.1}
            />
            <SocialLinkCard
              href="https://linkedin.com/in/carrilloapps"
              icon={Linkedin}
              label="LinkedIn"
              iconGradientFrom="from-blue-600/20"
              iconGradientTo="to-cyan-600/20"
              iconColor="text-blue-400"
              borderHoverColor="border-blue-500/30"
              delay={0.2}
            />
            <SocialLinkCard
              href="https://x.com/carrilloapps"
              icon={Globe}
              label="Twitter"
              iconGradientFrom="from-cyan-600/20"
              iconGradientTo="to-teal-600/20"
              iconColor="text-cyan-400"
              borderHoverColor="border-cyan-500/30"
              delay={0.3}
            />
            <SocialLinkCard
              href="https://carrilloapps.substack.com/"
              icon={Substack}
              label="Substack"
              iconGradientFrom="from-orange-600/20"
              iconGradientTo="to-amber-600/20"
              iconColor="text-orange-400"
              borderHoverColor="border-orange-500/30"
              delay={0.4}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
