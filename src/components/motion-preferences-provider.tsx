"use client"

import { MotionConfig } from "framer-motion"
import type { ReactNode } from "react"

/**
 * Envuelve la app en un `<MotionConfig>` con `reducedMotion="user"` — esto
 * hace que TODO motion component (`motion.div`, `motion.section`, etc.)
 * detecte automáticamente la preferencia `prefers-reduced-motion: reduce`
 * del usuario y deshabilite las animaciones de transform/opacity sin que
 * cada componente tenga que importar `useReducedMotion()` por su cuenta.
 *
 * Las animaciones CSS puras (mesh aurora, marquees) ya manejan su propia
 * media query en `app/globals.css`.
 */
export function MotionPreferencesProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
