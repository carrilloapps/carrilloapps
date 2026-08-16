"use client"

import { motion, type Variants } from "@/lib/motion"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"
import Image from "next/image"
import { ReactNode } from "react"

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

export interface PageHeroSplitProps {
  badge: {
    text: string
    icon?: LucideIcon
    gradientFrom?: string
    gradientTo?: string
    borderColor?: string
    textColor?: string
    shadowColor?: string
  }
  title: string | ReactNode
  subtitle?: string
  description: string | ReactNode
  image?: {
    src: string
    alt: string
    width?: number
    height?: number
    priority?: boolean
  }
  rightContent?: ReactNode
  actions?: ReactNode
  additionalContent?: ReactNode
}

export function PageHeroSplit({
  badge,
  title,
  subtitle,
  description,
  image,
  rightContent,
  actions,
  additionalContent,
}: PageHeroSplitProps) {
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
      className="space-y-8 py-12 md:py-0"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid items-start gap-12 md:grid-cols-2">
        {/* Left Column - Content */}
        <motion.div className="order-2 space-y-6 md:order-1" variants={itemVariants}>
          <div className="space-y-4">
            <motion.div variants={itemVariants} className="mt-4 md:mt-28">
              <Badge
                variant="outline"
                className={`inline-flex items-center gap-2 bg-gradient-to-r ${gradientFrom} ${gradientTo} border ${borderColor} ${textColor} rounded-full px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm ${shadowColor}`}
              >
                {BadgeIcon && <BadgeIcon className="h-4 w-4" />}
                {badgeText}
              </Badge>
            </motion.div>
            {typeof title === "string" ? (
              <motion.h1
                className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text pb-2 text-4xl leading-tight font-extrabold tracking-tighter text-transparent drop-shadow-lg md:text-5xl lg:text-6xl"
                variants={itemVariants}
              >
                {title}
              </motion.h1>
            ) : (
              <motion.h1
                className="pb-2 text-4xl leading-tight font-extrabold tracking-tighter drop-shadow-lg md:text-5xl lg:text-6xl"
                variants={itemVariants}
              >
                {title}
              </motion.h1>
            )}
            {subtitle && (
              <motion.p className="text-xl text-zinc-400" variants={itemVariants}>
                {subtitle}
              </motion.p>
            )}
          </div>

          {typeof description === "string" ? (
            <motion.p className="leading-relaxed text-zinc-300" variants={itemVariants}>
              {description}
            </motion.p>
          ) : (
            <motion.div variants={itemVariants}>{description}</motion.div>
          )}

          {additionalContent && (
            <motion.div variants={itemVariants}>{additionalContent}</motion.div>
          )}

          {actions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start"
            >
              {actions}
            </motion.div>
          )}
        </motion.div>

        {/* Right Column - Image or Custom Content */}
        {(image || rightContent) && (
          <motion.div
            className="relative order-1 aspect-square overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-sm md:order-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            {image ? (
              <>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-2xl border border-zinc-800/50 object-cover"
                  priority={image.priority !== false}
                  {...(image.priority !== false && {
                    fetchPriority: "high" as const,
                    loading: "eager" as const,
                  })}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </>
            ) : (
              <>{rightContent}</>
            )}
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
