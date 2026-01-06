"use client";

import { useState, useEffect } from "react";

/**
 * Componente de fondo dinámico moderno con gradientes animados y grid pattern
 * Optimizado con lazy loading para mejor performance sin sacrificar características visuales
 */
export function DynamicBackground() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Defer background rendering hasta después del initial paint
    const timer = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsLoaded(true);
      });
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <>
      {/* Base black background - Always visible */}
      <div className="fixed inset-0 -z-50 bg-black" />
      
      {/* Lazy-loaded gradient effects - Full visual characteristics */}
      {isLoaded && (
        <>
          {/* Animated gradient orbs - Repositioned to avoid hero section */}
          <div className="fixed inset-0 -z-50 animate-in fade-in duration-700" style={{ contain: 'layout style paint' }}>
            <div 
              className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-3xl will-change-opacity" 
              style={{ 
                animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                contentVisibility: 'auto'
              }} 
            />
            <div 
              className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl will-change-opacity" 
              style={{ 
                animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite', 
                animationDelay: '1.5s',
                contentVisibility: 'auto'
              }} 
            />
            <div 
              className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/12 rounded-full blur-3xl will-change-opacity" 
              style={{ 
                animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite', 
                animationDelay: '2.5s',
                contentVisibility: 'auto'
              }} 
            />
            <div 
              className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/12 rounded-full blur-3xl will-change-opacity" 
              style={{ 
                animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite', 
                animationDelay: '0.5s',
                contentVisibility: 'auto'
              }} 
            />
          </div>
          
          {/* Radial gradient overlay - Original intensity */}
          <div className="fixed inset-0 -z-40 animate-in fade-in duration-700" style={{ contain: 'layout style paint' }}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-zinc-950/60 to-black" />
          </div>
          
          {/* Animated grid pattern - Original opacity */}
          <div className="fixed inset-0 -z-30 opacity-20 animate-in fade-in duration-1000" style={{ contain: 'layout style paint' }}>
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

