"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface PageLoadingOverlayProps {
  isVisible: boolean;
}

export function PageLoadingOverlay({ isVisible }: PageLoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-zinc-900/90 via-zinc-800/60 to-zinc-900/90 border border-zinc-700/50 backdrop-blur-md shadow-2xl"
          >
            <div className="relative">
              <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
              <div className="absolute inset-0 h-12 w-12 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Cargando artículo...
              </h3>
              <p className="text-sm text-zinc-400">
                Por favor espera un momento
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}