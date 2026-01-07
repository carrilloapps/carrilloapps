"use client";

import { motion } from "@/lib/motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLinkCardProps {
  href: string;
  icon: LucideIcon;
  label: string;
  iconGradientFrom: string;
  iconGradientTo: string;
  iconColor: string;
  borderHoverColor: string; // Full Tailwind class like "border-purple-500/30"
  delay?: number;
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
        "flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/50 transition-all duration-300 group/social border border-zinc-700/30",
        borderHoverColor
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center border group-hover/social:scale-110 transition-transform duration-300 mb-3",
          iconGradientFrom,
          iconGradientTo,
          iconColor
        )}
      >
        <Icon className={cn("h-6 w-6", iconColor)} />
      </div>
      <span className="text-sm font-medium text-zinc-300 group-hover/social:text-white transition-colors duration-300">
        {label}
      </span>
    </motion.a>
  );
}
