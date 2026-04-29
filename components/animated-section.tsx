"use client"

import type { AriaRole, ReactNode } from "react"
import Image from "next/image"

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  className?: string
  id?: string
  backgroundImage?: string
  imagePosition?: "left" | "right" | "top" | "bottom" | "center"
  imageOpacity?: number
  role?: AriaRole
  "aria-labelledby"?: string
  "aria-label"?: string
  "aria-describedby"?: string
}

export function AnimatedSection({
  children,
  className = "",
  id,
  backgroundImage,
  imagePosition = "right",
  imageOpacity = 0.2,
  role,
  "aria-labelledby": ariaLabelledby,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
}: AnimatedSectionProps) {
  return (
    <section
      className={`${className} relative`}
      id={id}
      role={role}
      aria-labelledby={ariaLabelledby}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
    >
      {backgroundImage && (
        <div className="absolute inset-0 overflow-hidden -z-10" style={{ opacity: imageOpacity }}>
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
              src={backgroundImage}
              alt=""
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80" />
          </div>
        </div>
      )}
      {children}
    </section>
  )
}
