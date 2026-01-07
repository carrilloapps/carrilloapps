"use client";

import { useState, useEffect } from "react";

/**
 * Componente de fondo dinámico moderno con gradientes animados y grid pattern
 * Optimizado con lazy loading simple y rápido
 */
export function DynamicBackground() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Single RAF para defer mínimo pero garantiza que carga
    const timer = window.requestAnimationFrame(() => {
      setIsLoaded(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <>
      {/* Base black background - Always visible */}
      <div className="fixed inset-0 -z-50 bg-black" />
      
      {/* Lazy-loaded gradient effects */}
      {isLoaded && (
        <>
          {/* Animated gradient orbs - Repositioned to corners */}
          <div 
            className="fixed inset-0 -z-50 animate-in fade-in duration-500" 
            style={{ 
              contain: 'layout style paint'
            }}
          >
            <div 
              className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-3xl will-change-opacity" 
              style={{ 
                animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }} 
            />
            <div 
              className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl will-change-opacity" 
              style={{ 
                animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite', 
                animationDelay: '1.5s'
              }} 
            />
            <div 
              className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/12 rounded-full blur-3xl will-change-opacity" 
              style={{ 
                animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite', 
                animationDelay: '2.5s'
              }} 
            />
            <div 
              className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/12 rounded-full blur-3xl will-change-opacity" 
              style={{ 
                animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite', 
                animationDelay: '0.5s'
              }} 
            />
          </div>
          
          {/* Radial gradient overlay */}
          <div 
            className="fixed inset-0 -z-40 animate-in fade-in duration-500" 
            style={{ 
              contain: 'layout style paint'
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-zinc-950/60 to-black" />
          </div>
          
          {/* Animated grid pattern */}
          <div 
            className="fixed inset-0 -z-30 opacity-20 animate-in fade-in duration-700" 
            style={{ 
              contain: 'layout style paint'
            }}
          >
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
                animation: 'gridMove 20s linear infinite',
                willChange: 'transform'
              }} 
            />
          </div>
        </>
      )}
    </>
  );
}

