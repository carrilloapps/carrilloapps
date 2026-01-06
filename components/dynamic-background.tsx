"use client";

/**
 * Componente de fondo dinámico moderno con gradientes animados y grid pattern
 * Usado en todas las páginas del proyecto para mantener consistencia visual
 */
export function DynamicBackground() {
  return (
    <>
      {/* Modern dynamic background - Optimized for performance */}
      <div className="fixed inset-0 -z-50 bg-black">
        {/* Animated gradient orbs - Reduced blur for better performance */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-2xl will-change-opacity" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-2xl will-change-opacity" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl will-change-opacity" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-2xl will-change-opacity" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '0.5s' }} />
      </div>
      
      {/* Radial gradient overlay */}
      <div className="fixed inset-0 -z-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-zinc-950/60 to-black" />
      </div>
      
      {/* Animated grid pattern */}
      <div className="fixed inset-0 -z-30 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>
    </>
  );
}

