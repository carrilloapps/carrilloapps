"use client"

import type { ReactNode } from "react"
import { motion } from "@/lib/motion"
import Image from "next/image"

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  className?: string
  id?: string
  backgroundImage?: string
  imagePosition?: "left" | "right" | "top" | "bottom" | "center"
  imageOpacity?: number
}

export function AnimatedSection({
  children,
  delay = 0,
  className = "",
  id,
  backgroundImage,
  imagePosition = "right",
  imageOpacity = 0.2,
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`${className} relative`}
      id={id}
    >
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 overflow-hidden -z-10"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: imageOpacity, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: delay + 0.3,
            ease: "easeOut",
          }}
        >
          <div
            className={`absolute ${
              imagePosition === "left"
                ? "left-0 top-0 bottom-0 w-1/2"
                : imagePosition === "right"
                  ? "right-0 top-0 bottom-0 w-1/2"
                  : imagePosition === "top"
                    ? "top-0 left-0 right-0 h-1/2"
                    : imagePosition === "bottom"
                      ? "bottom-0 left-0 right-0 h-1/2"
                      : "inset-0"
            }`}
          >
            <Image
              src={backgroundImage || "/placeholder.svg"}
              alt=""
              fill
              className="object-cover"
              priority={delay === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80" />
          </div>
        </motion.div>
      )}
      {children}
    </motion.section>
  )
}
