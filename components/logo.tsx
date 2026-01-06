"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { memo } from "react"

interface LogoProps {
  className?: string
  linkClassName?: string
  textClassName?: string
  accentClassName?: string
  href?: string
  showDot?: boolean
  animationLevel?: "none" | "subtle" | "medium" | "playful"
  variant?: "text" | "image"
  imageSrc?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
}

// Optimized animation variants following project patterns
const logoVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: -10 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // Consistent easing from project
    }
  },
  hover: {
    y: -2,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    }
  }
}

const textVariants: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.03, // Reduced from 0.04 for smoother effect
      delayChildren: 0.1,
    }
  }
}

const letterVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    }
  }
}

const dotVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.2,
    }
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.2 }
  }
}

export const Logo = memo(function Logo({
  className = "",
  linkClassName = "",
  textClassName = "text-white",
  accentClassName = "text-blue-500",
  href = "/",
  showDot = true,
  animationLevel = "medium",
  variant = "image",
  imageSrc = "/logo.webp",
  imageAlt = "Logo de mi sitio web",
  imageWidth = 80 * 1.4,
  imageHeight = 30 * 1.4,
}: LogoProps) {
  
  // Static version for no animations or image variant without animations
  if (animationLevel === "none") {
    if (variant === "image") {
      return (
        <div className={className}>
          <Link 
          href={href} 
          className={`${linkClassName} focus:outline-none focus:ring-0 focus:border-0 hover:outline-none hover:ring-0 hover:border-0 !focus:ring-0 !focus:ring-offset-0 !focus:outline-none !active:ring-0 !active:outline-none`} 
          aria-label="Ir a la página de inicio"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            priority
            className="object-contain focus:outline-none focus:ring-0 focus:border-0 !focus:ring-0 !focus:ring-offset-0 !focus:outline-none !active:ring-0 !active:outline-none"
          />
        </Link>
        </div>
      )
    }

    return (
      <div className={`font-bold text-xl ${className}`}>
        <Link 
          href={href} 
          className={`${linkClassName} focus:outline-none focus:ring-0 focus:border-0 hover:outline-none hover:ring-0 hover:border-0 !focus:ring-0 !focus:ring-offset-0 !focus:outline-none !active:ring-0 !active:outline-none`} 
          aria-label="Ir a la página de inicio"
        >
          <span className={textClassName}>carrillo</span>
          {showDot && <span className={accentClassName}>.app</span>}
        </Link>
      </div>
    )
  }

  // Image variant with optimized animations
  if (variant === "image") {
    return (
      <motion.div
        className={className}
        variants={logoVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <Link 
          href={href} 
          className={`${linkClassName} focus:outline-none focus:ring-0 focus:border-0 hover:outline-none hover:ring-0 hover:border-0 !focus:ring-0 !focus:ring-offset-0 !focus:outline-none !active:ring-0 !active:outline-none`} 
          aria-label="Ir a la página de inicio"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            priority
            className="object-contain focus:outline-none focus:ring-0 focus:border-0 !focus:ring-0 !focus:ring-offset-0 !focus:outline-none !active:ring-0 !active:outline-none"
          />
        </Link>
      </motion.div>
    )
  }

  // Text variant with optimized animations
  const letters = "carrillo".split("")

  return (
    <motion.div
      className={`font-bold text-xl ${className}`}
      variants={logoVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <Link
        href={href}
        className={`inline-flex items-baseline ${linkClassName} focus:outline-none focus:ring-0 focus:border-0 hover:outline-none hover:ring-0 hover:border-0 !focus:ring-0 !focus:ring-offset-0 !focus:outline-none !active:ring-0 !active:outline-none`}
        aria-label="Ir a la página de inicio"
      >
        <motion.span 
          className={`inline-flex ${textClassName}`}
          variants={textVariants}
        >
          {letters.map((letter, index) => (
            <motion.span 
              key={index} 
              variants={letterVariants} 
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>

        {showDot && (
          <motion.span 
            className={accentClassName} 
            variants={dotVariants}
            whileHover="hover"
          >
            .app
          </motion.span>
        )}
      </Link>
    </motion.div>
  )
})
