"use client"

import { motion, type Variants } from "@/lib/motion"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export interface PageHeroProps {
  badge: {
    text: string
    icon?: LucideIcon
    gradientFrom?: string
    gradientTo?: string
    borderColor?: string
    textColor?: string
    shadowColor?: string
  }
  title: string
  description: string
  children?: React.ReactNode
  /** Extra classes for the hero <section> — e.g. to tune its spacing on a
   *  specific page (the section's bottom gap comes from the parent space-y). */
  className?: string
}

export function PageHero({ badge, title, description, children, className }: PageHeroProps) {
  const {
    text: badgeText,
    icon: BadgeIcon,
    gradientFrom = "from-emerald-600/20",
    gradientTo = "to-teal-600/20",
    borderColor = "border-emerald-500/30",
    textColor = "text-emerald-400",
    shadowColor = "shadow-emerald-600/10",
  } = badge

  return (
    <motion.section
      className={cn("space-y-6 py-8 md:py-16", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="space-y-4 text-center" variants={itemVariants}>
        <motion.div variants={itemVariants}>
          <Badge
            variant="outline"
            className={`inline-flex items-center gap-2 bg-gradient-to-r ${gradientFrom} ${gradientTo} border ${borderColor} ${textColor} rounded-full px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm ${shadowColor}`}
          >
            {BadgeIcon && <BadgeIcon className="h-4 w-4" />}
            {badgeText}
          </Badge>
        </motion.div>
        <motion.h1
          className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text pb-2 text-4xl leading-tight font-extrabold tracking-tighter text-transparent drop-shadow-lg md:text-5xl lg:text-6xl"
          variants={itemVariants}
        >
          {title}
        </motion.h1>
        <motion.p className="mx-auto max-w-2xl text-xl text-zinc-400" variants={itemVariants}>
          {description}
        </motion.p>
      </motion.div>

      {children && (
        <>
          <motion.div className="h-6" variants={itemVariants} />
          <motion.div variants={itemVariants}>{children}</motion.div>
        </>
      )}
    </motion.section>
  )
}
