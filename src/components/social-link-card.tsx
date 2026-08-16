"use client"

import type { ComponentType, SVGProps } from "react"
import { motion } from "@/lib/motion"
import { cn } from "@/lib/utils"

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>

interface SocialLinkCardProps {
  href: string
  icon: IconComponent
  label: string
  iconGradientFrom: string
  iconGradientTo: string
  iconColor: string
  borderHoverColor: string // Full Tailwind class like "border-purple-500/30"
  delay?: number
}

export function SocialLinkCard({
  href,
  icon: Icon,
  label,
  iconGradientFrom,
  iconGradientTo,
  iconColor,
  borderHoverColor,
  delay = 0,
}: SocialLinkCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "surface-card-subtle group/social flex flex-col items-center justify-center p-4",
        borderHoverColor,
      )}
    >
      <div
        className={cn(
          "mb-3 flex h-12 w-12 items-center justify-center rounded-xl border bg-gradient-to-r transition-transform duration-300 group-hover/social:scale-110",
          iconGradientFrom,
          iconGradientTo,
          iconColor,
        )}
      >
        <Icon className={cn("h-6 w-6", iconColor)} />
      </div>
      <span className="text-sm font-medium text-zinc-300 transition-colors duration-300 group-hover/social:text-white">
        {label}
      </span>
    </motion.a>
  )
}
