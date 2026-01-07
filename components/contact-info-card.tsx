"use client";

import { motion } from "@/lib/motion";
import { LucideIcon, Eye } from "lucide-react";

interface ContactInfoCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconGradientFrom: string;
  iconGradientTo: string;
  title: string;
  value?: string;
  obfuscatedValue?: string;
  deobfuscateFn?: (value: string) => string;
  isRevealed?: boolean;
  onReveal?: () => void;
  revealButtonText?: string;
  revealButtonColor?: string;
  infoText?: string;
  infoIcon?: LucideIcon;
  location?: string;
  locationInfo?: string;
}

export function ContactInfoCard({
  icon: Icon,
  iconColor,
  iconGradientFrom,
  iconGradientTo,
  title,
  value,
  obfuscatedValue,
  deobfuscateFn,
  isRevealed,
  onReveal,
  revealButtonText,
  revealButtonColor,
  infoText,
  infoIcon: InfoIcon,
  location,
  locationInfo,
}: ContactInfoCardProps) {
  return (
    <motion.div
      className="flex items-start space-x-3 p-2.5 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/50 transition-all duration-300 group/item"
      whileHover={{ x: 2 }}
    >
      <div
        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${iconGradientFrom} ${iconGradientTo} flex items-center justify-center border ${iconColor} group-hover/item:scale-110 transition-transform duration-300 flex-shrink-0`}
      >
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div className="space-y-0.5 flex-1 min-w-0">
        <p className="font-semibold text-white text-sm">{title}</p>
        {location ? (
          <>
            <p className="text-zinc-300 text-sm">{location}</p>
            {locationInfo && (
              <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                {InfoIcon && <InfoIcon className="w-3 h-3" />}
                <span>{locationInfo}</span>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              {isRevealed && value ? (
                <p className="text-zinc-300 font-mono select-all text-sm">{value}</p>
              ) : isRevealed && obfuscatedValue && deobfuscateFn ? (
                <p className="text-zinc-300 font-mono select-all text-sm">
                  {deobfuscateFn(obfuscatedValue)}
                </p>
              ) : onReveal && revealButtonText && revealButtonColor ? (
                <button
                  onClick={onReveal}
                  className={`flex items-center gap-1.5 ${revealButtonColor} hover:opacity-80 transition-colors duration-200`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="text-xs">{revealButtonText}</span>
                </button>
              ) : null}
            </div>
            {infoText && (
              <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                {InfoIcon && <InfoIcon className="w-3 h-3" />}
                <span>{infoText}</span>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

