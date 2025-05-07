"use client"

import { useState, useEffect, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

// Componente principal que envuelve con Suspense
export function PageLoader() {
  return (
    <Suspense fallback={<div className="hidden"></div>}>
      <PageLoaderContent />
    </Suspense>
  )
}

function PageLoaderContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  // Efecto para detectar cambios de ruta
  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true)
    }

    const handleComplete = () => {
      setIsLoading(false)
    }

    // Simular un tiempo mínimo de carga para evitar flashes
    let timer: NodeJS.Timeout
    if (isLoading) {
      timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [pathname, searchParams, isLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-zinc-900 p-6 rounded-lg shadow-xl border border-zinc-800 flex flex-col items-center"
      >
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
        <p className="text-white text-lg font-medium">Cargando...</p>
      </motion.div>
    </div>
  )
}
