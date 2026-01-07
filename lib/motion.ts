/**
 * Optimized Framer Motion exports
 * Import only what's needed to reduce bundle size
 * Use this instead of importing directly from "framer-motion"
 */

export { 
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimation,
  useInView
} from "framer-motion";

export type { Variants, Target, Transition } from "framer-motion";

/**
 * Common animation variants for consistency across the app
 */
export const commonVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },

  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    },
  },

  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
  },
} as const;
