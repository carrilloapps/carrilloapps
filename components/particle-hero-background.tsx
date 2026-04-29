"use client"

import { useEffect, useMemo, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

/**
 * Componente de fondo con partículas dinámicas para el hero section
 * Inspirado en diseños modernos con efectos de cluster y movimiento suave
 */
export function ParticleHeroBackground() {
  const [init, setInit] = useState(false);

  // Inicialización del motor de partículas
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Callback cuando las partículas se cargan
  const particlesLoaded = useCallback(async (container?: Container): Promise<void> => {
    if (container) {
      console.log("Particle hero background loaded successfully");
    }
  }, []);

  // Configuración avanzada de partículas con efectos dinámicos
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: true,
            mode: "attract",
            parallax: {
              enable: true,
              force: 60,
              smooth: 10,
            },
          },
          resize: true,
        },
        modes: {
          attract: {
            distance: 200,
            duration: 0.4,
            easing: "ease-out-quad",
            factor: 1,
            maxSpeed: 50,
            speed: 1,
          },
        },
      },
      particles: {
        color: {
          value: [
            "#3b82f6", // blue-500
            "#6366f1", // indigo-500
            "#8b5cf6", // violet-500
            "#a855f7", // purple-500
            "#ffffff", // white
            "#e2e8f0", // slate-200
          ],
        },
        links: {
          color: {
            value: "#3b82f6",
          },
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
          triangles: {
            enable: true,
            opacity: 0.1,
          },
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
        number: {
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
          value: 80,
        },
        opacity: {
          value: {
            min: 0.1,
            max: 0.8,
          },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
            sync: false,
          },
        },
        shape: {
          type: ["circle", "triangle"],
        },
        size: {
          value: {
            min: 1,
            max: 4,
          },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.5,
            sync: false,
          },
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.05,
            opacity: 1,
          },
        },
        rotate: {
          value: 0,
          random: true,
          direction: "clockwise",
          animation: {
            enable: true,
            speed: 5,
            sync: false,
          },
        },
      },
      detectRetina: true,
      motion: {
        disable: false,
        reduce: {
          factor: 4,
          value: true,
        },
      },
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="particle-hero-background"
        particlesLoaded={particlesLoaded}
        options={options as unknown as ISourceOptions}
        className="absolute inset-0 -z-10"
      />
    );
  }

  return null;
}