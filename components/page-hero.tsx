"use client";

import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

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

export interface PageHeroProps {
  badge: {
    text: string;
    icon?: LucideIcon;
    gradientFrom?: string;
    gradientTo?: string;
    borderColor?: string;
    textColor?: string;
    shadowColor?: string;
  };
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function PageHero({ badge, title, description, children }: PageHeroProps) {
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
      className="py-8 md:py-16 space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="space-y-4 text-center" variants={itemVariants}>
        <motion.div variants={itemVariants}>
          <Badge 
            variant="outline" 
            className={`inline-flex items-center gap-2 bg-gradient-to-r ${gradientFrom} ${gradientTo} border ${borderColor} ${textColor} text-sm font-medium py-2 px-4 rounded-full backdrop-blur-sm shadow-lg ${shadowColor}`}
          >
            {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
            {badgeText}
          </Badge>
        </motion.div>
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-lg pb-2"
          variants={itemVariants}
        >
          {title}
        </motion.h1>
        <motion.p 
          className="text-xl text-zinc-400 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          {description}
        </motion.p>
      </motion.div>

      {children && (
        <>
          <motion.div className="h-6" variants={itemVariants} />
          <motion.div variants={itemVariants}>
            {children}
          </motion.div>
        </>
      )}
    </motion.section>
  );
}

