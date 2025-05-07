"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface LogoProps {
  className?: string
  linkClassName?: string
  textClassName?: string
  accentClassName?: string
  href?: string
  showDot?: boolean
  animationLevel?: "none" | "subtle" | "medium" | "playful"
}

export function Logo({
  className = "",
  linkClassName = "",
  textClassName = "text-white",
  accentClassName = "text-blue-500",
  href = "/",
  showDot = true,
  animationLevel = "medium",
}: LogoProps) {
  const [isClient, setIsClient] = useState(false)

  // Prevent hydration mismatch by only enabling animations after mount
  useEffect(() => {
    setIsClient(true)
  }, [])

  // No animations if specified or if we're server-side rendering
  if (animationLevel === "none" || !isClient) {
    return (
      <div className={`font-bold text-xl ${className}`}>
        <Link href={href} className={linkClassName} aria-label="carrillo.app - Página de inicio">
          <span className={textClassName}>carrillo</span>
          {showDot && <span className={accentClassName}>.app</span>}
        </Link>
      </div>
    )
  }

  // Animation variants based on the selected level
  const containerVariants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.04,
      },
    },
    hover: {
      scale: animationLevel === "playful" ? 1.05 : 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: {
      scale: 0.98,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  }

  const letterVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 10 },
    },
  }

  const dotVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10,
        delay: 0.4,
      },
    },
    hover: {
      scale: animationLevel === "playful" ? [1, 1.2, 1] : [1, 1.1, 1],
      rotate: animationLevel === "playful" ? [0, -10, 0, 10, 0] : 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        times: [0, 0.4, 0.6, 0.8, 1],
        repeat: animationLevel === "playful" ? Number.POSITIVE_INFINITY : 0,
        repeatDelay: 3,
      },
    },
  }

  const appVariants = {
    initial: { opacity: 0, x: -10 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.3,
      },
    },
    hover: {
      color: animationLevel === "playful" ? "#3b82f6" : "",
      transition: { duration: 0.3 },
    },
  }

  // Split "Carrillo" into individual letters for animation
  const letters = "carrillo".split("")

  return (
    <motion.div
      className={`font-bold text-xl ${className}`}
      initial="initial"
      animate="animate"
      variants={containerVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <Link
        href={href}
        className={`inline-flex items-baseline ${linkClassName}`}
        aria-label="carrillo.app - Página de inicio"
      >
        <span className={`inline-flex ${textClassName}`}>
          {letters.map((letter, index) => (
            <motion.span key={`letter-${index}`} variants={letterVariants} className="inline-block">
              {letter}
            </motion.span>
          ))}
        </span>

        {showDot && (
          <>
            <motion.span className={accentClassName} variants={dotVariants}>
              .
            </motion.span>

            <motion.span className={accentClassName} variants={appVariants}>
              app
            </motion.span>
          </>
        )}
      </Link>
    </motion.div>
  )
}
