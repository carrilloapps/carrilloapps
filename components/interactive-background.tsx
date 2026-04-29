"use client"

import { useEffect, useMemo, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

/**
 * Componente de fondo interactivo optimizado para el hero section
 * Proporciona un efecto visual dinámico y atractivo sin ser intrusivo
 */
export function InteractiveBackground() {
  const [init, setInit] = useState(false);

  // Inicialización del motor de partículas con configuración optimizada
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Callback optimizado para cuando las partículas se cargan
  const particlesLoaded = useCallback(async (container?: Container): Promise<void> => {
    if (container) {
      console.log("Interactive background loaded successfully");
    }
  }, []);

  // Configuración avanzada de partículas sin interactividad para máximo impacto visual
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: false,
          },
          resize: true,
        },
      },
      particles: {
        color: {
          value: [
            "#ffffff",
            "#f8fafc",
            "#e2e8f0",
            "#cbd5e1",
            "#94a3b8",
          ],
          animation: {
            h: {
              count: 0,
              enable: false,
              offset: 0,
              speed: 1,
              decay: 0,
              sync: true,
            },
            s: {
              count: 0,
              enable: false,
              offset: 0,
              speed: 1,
              decay: 0,
              sync: true,
            },
            l: {
              count: 0,
              enable: true,
              offset: {
                min: 20,
                max: 80,
              },
              speed: 0.5,
              decay: 0,
              sync: false,
            },
          },
        },
        links: {
          color: {
            value: "#ffffff",
          },
          distance: 120,
          enable: true,
          opacity: 0.2,
          width: 0.8,
          triangles: {
            enable: true,
            opacity: 0.05,
          },
          warp: true,
        },
        move: {
          angle: {
            offset: 0,
            value: 90,
          },
          attract: {
            distance: 200,
            enable: false,
            rotate: {
              x: 3000,
              y: 3000,
            },
          },
          center: {
            x: 50,
            y: 50,
            mode: "percent",
            radius: 0,
          },
          decay: 0,
          distance: {},
          direction: "none",
          drift: 0,
          enable: true,
          gravity: {
            acceleration: 9.81,
            enable: false,
            inverse: false,
            maxSpeed: 50,
          },
          path: {
            clamp: true,
            delay: {
              random: {
                enable: false,
                minimumValue: 0,
              },
              value: 0,
            },
            enable: false,
            options: {},
          },
          outModes: {
            default: "out",
            bottom: "out",
            left: "out",
            right: "out",
            top: "out",
          },
          random: true,
          size: false,
          speed: {
            min: 0.5,
            max: 1.2,
          },
          spin: {
            acceleration: 0,
            enable: false,
          },
          straight: false,
          trail: {
            enable: false,
            length: 10,
            fill: {},
          },
          vibrate: false,
          warp: false,
        },
        number: {
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
          limit: 0,
          value: 50,
        },
        opacity: {
          random: {
            enable: true,
            minimumValue: 0.1,
          },
          value: {
            min: 0.1,
            max: 0.6,
          },
          animation: {
            count: 0,
            enable: true,
            speed: 0.8,
            decay: 0,
            sync: false,
            destroy: "none",
            startValue: "random",
            minimumValue: 0.1,
          },
        },
        reduceDuplicates: false,
        shadow: {
          blur: 0,
          color: {
            value: "#000",
          },
          enable: false,
          offset: {
            x: 0,
            y: 0,
          },
        },
        shape: {
          close: true,
          fill: true,
          options: {},
          type: "circle",
        },
        size: {
          random: {
            enable: true,
            minimumValue: 1,
          },
          value: {
            min: 1,
            max: 3,
          },
          animation: {
            count: 0,
            enable: true,
            speed: 1.5,
            decay: 0,
            sync: false,
            destroy: "none",
            startValue: "random",
            minimumValue: 0.5,
          },
        },
        stroke: {
          width: 0,
        },
        zIndex: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: 0,
          opacityRate: 1,
          sizeRate: 1,
          velocityRate: 1,
        },
        destroy: {
          bounds: {},
          mode: "none",
          split: {
            count: 1,
            factor: {
              random: {
                enable: false,
                minimumValue: 0,
              },
              value: 3,
            },
            rate: {
              random: {
                enable: false,
                minimumValue: 0,
              },
              value: {
                min: 4,
                max: 9,
              },
            },
            sizeOffset: true,
          },
        },
        roll: {
          darken: {
            enable: false,
            value: 0,
          },
          enable: false,
          enlighten: {
            enable: false,
            value: 0,
          },
          mode: "vertical",
          speed: 25,
        },
        tilt: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: 0,
          animation: {
            enable: false,
            speed: 0,
            decay: 0,
            sync: false,
          },
          direction: "clockwise",
          enable: false,
        },
        twinkle: {
          lines: {
            enable: false,
            frequency: 0.05,
            opacity: 1,
          },
          particles: {
            enable: true,
            frequency: 0.02,
            opacity: 0.8,
          },
        },
        wobble: {
          distance: 5,
          enable: false,
          speed: {
            angle: 50,
            move: 10,
          },
        },
        life: {
          count: 0,
          delay: {
            random: {
              enable: false,
              minimumValue: 0,
            },
            value: 0,
            sync: false,
          },
          duration: {
            random: {
              enable: false,
              minimumValue: 0.0001,
            },
            value: 0,
            sync: false,
          },
        },
        rotate: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: 0,
          animation: {
            enable: false,
            speed: 0,
            decay: 0,
            sync: false,
          },
          direction: "clockwise",
          path: false,
        },
        orbit: {
          animation: {
            count: 0,
            enable: false,
            speed: 1,
            decay: 0,
            sync: false,
          },
          enable: false,
          opacity: 1,
          rotation: {
            random: {
              enable: false,
              minimumValue: 0,
            },
            value: 45,
          },
          width: 1,
        },
        links: {
          blink: false,
          color: {
            value: "#ffffff",
          },
          consent: false,
          distance: 120,
          enable: true,
          frequency: 1,
          opacity: 0.2,
          shadow: {
            blur: 5,
            color: {
              value: "#000",
            },
            enable: false,
          },
          triangles: {
            enable: true,
            frequency: 0.5,
            opacity: 0.05,
          },
          width: 0.8,
          warp: true,
        },
        repulse: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: 0,
          enabled: false,
          distance: 1,
          duration: 1,
          factor: 1,
          speed: 1,
        },
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      responsive: [],
      smooth: false,
      style: {},
      themes: [],
      zLayers: 100,
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
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options as unknown as ISourceOptions}
        className="absolute inset-0 -z-10"
      />
    );
  }

  return null;
}