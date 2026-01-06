"use client";

import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
};

export interface PageHeroSplitProps {
  badge: {
    text: string;
    icon?: LucideIcon;
    gradientFrom?: string;
    gradientTo?: string;
    borderColor?: string;
    textColor?: string;
    shadowColor?: string;
  };
  title: string | ReactNode;
  subtitle?: string;
  description: string | ReactNode;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
  };
  rightContent?: ReactNode;
  actions?: ReactNode;
  additionalContent?: ReactNode;
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
  } = badge;

  return (
    <motion.section
      className="py-12 md:py-0 space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid gap-12 md:grid-cols-2 items-start">
        {/* Left Column - Content */}
        <motion.div
          className="space-y-6 order-2 md:order-1"
          variants={itemVariants}
        >
          <div className="space-y-4">
            <motion.div variants={itemVariants} className="mt-4 md:mt-28">
              <Badge
                variant="outline"
                className={`inline-flex items-center gap-2 bg-gradient-to-r ${gradientFrom} ${gradientTo} border ${borderColor} ${textColor} text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg ${shadowColor}`}
              >
                {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
                {badgeText}
              </Badge>
            </motion.div>
            {typeof title === "string" ? (
              <motion.h1
                className="text-4xl pb-2 md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-lg"
                variants={itemVariants}
              >
                {title}
              </motion.h1>
            ) : (
              <motion.h1
                className="text-4xl pb-2 md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight drop-shadow-lg"
                variants={itemVariants}
              >
                {title}
              </motion.h1>
            )}
            {subtitle && (
              <motion.p
                className="text-xl text-zinc-400"
                variants={itemVariants}
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {typeof description === "string" ? (
            <motion.p
              className="text-zinc-400 leading-relaxed"
              variants={itemVariants}
            >
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
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              {actions}
            </motion.div>
          )}
        </motion.div>

        {/* Right Column - Image or Custom Content */}
        {(image || rightContent) && (
          <motion.div
            className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-sm order-1 md:order-2"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {image ? (
              <>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-2xl border border-zinc-800/50"
                  priority={image.priority !== false}
                  {...(image.priority !== false && { fetchPriority: "high" as const })}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-[1px]" />
              </>
            ) : (
              <>{rightContent}</>
            )}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

