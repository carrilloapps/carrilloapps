"use client"

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type PointerEvent as ReactPointerEvent,
} from "react"
import {
  Users,
  Database,
  Server,
  Layers,
  Shield,
  Cpu,
  X,
  type LucideProps,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * Globo 3D estilo agujero negro — placeholder visual del hero de /servicios.
 *
 * Capas (de fuera hacia dentro):
 *   1. Halo de acreción — radial gradient azul/violeta que pulsa lento.
 *   2. Anillos orbitales — 3 elipses sutiles que sugieren las órbitas
 *      donde viajan los tiles y las partículas.
 *   3. Singularidad — círculo central oscuro con un anillo de luz en el
 *      borde (event horizon). Es donde "cae" la luz visualmente.
 *   4. Partículas — 14 puntos pequeños distribuidos en una esfera interna,
 *      rotan más rápido que los tiles para crear parallax.
 *   5. Tiles de servicio — 6 categorías sobre una esfera externa.
 *      Cada uno hace ping a su descripción al hacer click → tooltip.
 *
 * Interacciones:
 *   • Drag horizontal/vertical rota el globo (rotateY / rotateX).
 *   • Al soltar, la velocidad acumulada se conserva como inercia y se
 *     decae con un factor de fricción 0.94 por frame.
 *   • Cuando la inercia se agota y han pasado ~600ms sin tocar, retoma
 *     una rotación lenta de showcase para mantener fluidez visual.
 *   • Click sobre un tile abre un tooltip flotante con descripción.
 *   • `prefers-reduced-motion` deshabilita la rotación automática y
 *     reduce las animaciones del halo.
 */

interface Tile {
  icon: ComponentType<LucideProps>
  label: string
  description: string
  /** Longitud (azimut) en grados — posición horizontal sobre la esfera. */
  lng: number
  /** Latitud (elevación) en grados — posición vertical sobre la esfera. */
  lat: number
}

const TILES: Tile[] = [
  {
    icon: Users,
    label: "Liderazgo",
    description:
      "Mentoría de equipos, planes de carrera técnica y dirección estratégica para áreas de ingeniería en crecimiento.",
    lng: 0,
    lat: 24,
  },
  {
    icon: Database,
    label: "Fintech",
    description:
      "Pasarelas de pago, integraciones bancarias, Open Banking y procesamiento de transacciones de alta criticidad.",
    lng: 120,
    lat: 24,
  },
  {
    icon: Server,
    label: "Backoffice",
    description:
      "Automatización de procesos internos, integraciones ERP/SAP y dashboards operativos para equipos financieros.",
    lng: 240,
    lat: 24,
  },
  {
    icon: Layers,
    label: "Arquitectura",
    description:
      "Diseño de sistemas distribuidos, microservicios y arquitecturas event-driven que escalan sin reescribir.",
    lng: 60,
    lat: -24,
  },
  {
    icon: Shield,
    label: "Seguridad",
    description:
      "Cumplimiento PCI DSS, ISO 27001, GDPR. Auditorías, gestión de identidades y protección de datos sensibles.",
    lng: 180,
    lat: -24,
  },
  {
    icon: Cpu,
    label: "Cloud & IA",
    description:
      "Infraestructura multi-cloud, infrastructure as code, optimización de costos y ML aplicado a fintech.",
    lng: 300,
    lat: -24,
  },
]

const SPHERE_RADIUS = 190 // px — radio del cascarón de tiles
const PARTICLE_RADIUS = 110 // px — radio del cascarón de partículas

/** 14 partículas distribuidas pseudo-uniformemente sobre la esfera interna. */
const PARTICLES = Array.from({ length: 14 }).map((_, i) => {
  // Spiral pattern: cada partícula avanza un ángulo dorado para distribuirse
  // de forma visualmente uniforme (Fibonacci sphere).
  const golden = Math.PI * (3 - Math.sqrt(5))
  const y = 1 - (i / 13) * 2
  const theta = golden * i
  return {
    lng: (theta * 180) / Math.PI,
    lat: (Math.asin(y) * 180) / Math.PI,
    // Tamaño y opacidad varían sutil para textura.
    size: 2 + (i % 3),
    opacity: 0.4 + (i % 4) * 0.15,
  }
})

export function ServiceGlobe() {
  const stageRef = useRef<HTMLDivElement>(null)
  const rotationRef = useRef({ x: -10, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const dragRef = useRef<{
    startX: number
    startY: number
    rx: number
    ry: number
    lastX: number
    lastY: number
    lastTime: number
  } | null>(null)
  const idleSinceRef = useRef<number>(0)

  const [rotation, setRotation] = useState({ x: -10, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [activeTile, setActiveTile] = useState<Tile | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  // Detectar prefers-reduced-motion.
  useEffect(() => {
    idleSinceRef.current = Date.now()
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = () => setReduceMotion(mq.matches)
    handler()
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Loop de animación con tres modos secuenciales:
  //   1. Drag activo → handlePointerMove dirige la rotación; el loop no
  //      hace nada (deja libre el frame).
  //   2. Post-drag con inercia → la velocidad acumulada se decae con
  //      fricción 0.94 hasta caer bajo el umbral.
  //   3. Idle (sin inercia + RESUME_DELAY ms desde la última suelta) →
  //      retoma una rotación lenta sobre Y para mantener "vida" visual.
  //
  // La rampa entre inercia y auto-rotación es continua: cuando la inercia
  // termina, AUTO_SPEED arranca desde 0 y converge suavemente con un
  // factor de easing. Esto evita el "salto" perceptible al transicionar.
  useEffect(() => {
    let raf = 0
    const FRICTION = 0.94
    const VELOCITY_EPSILON = 0.02
    const RESUME_DELAY_MS = 600
    const AUTO_TARGET_SPEED = 0.06 // °/frame en Y ≈ 3.6°/s a 60fps
    const AUTO_RAMP = 0.04 // factor de easing hacia AUTO_TARGET_SPEED
    let autoSpeed = 0

    const step = () => {
      const v = velocityRef.current
      const hasInertia =
        Math.abs(v.x) > VELOCITY_EPSILON || Math.abs(v.y) > VELOCITY_EPSILON

      if (dragRef.current) {
        // Modo drag — el loop no aplica rotación, pero resetea la rampa
        // para que al soltar la auto-rotación arranque desde 0.
        autoSpeed = 0
      } else if (hasInertia) {
        // Modo inercia — decay con fricción.
        rotationRef.current = {
          x: rotationRef.current.x + v.x,
          y: rotationRef.current.y + v.y,
        }
        velocityRef.current = { x: v.x * FRICTION, y: v.y * FRICTION }
        setRotation({ ...rotationRef.current })
        autoSpeed = 0
      } else if (
        !reduceMotion &&
        Date.now() - idleSinceRef.current > RESUME_DELAY_MS
      ) {
        // Modo auto — rotación de showcase lenta sobre Y, con rampa
        // suave para que no se sienta un arranque abrupto.
        autoSpeed += (AUTO_TARGET_SPEED - autoSpeed) * AUTO_RAMP
        rotationRef.current = {
          x: rotationRef.current.x,
          y: rotationRef.current.y + autoSpeed,
        }
        setRotation({ ...rotationRef.current })
      }

      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [reduceMotion])

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    // Dejar pasar clicks/touches sobre cualquier botón interactivo (tiles,
    // close del tooltip, etc.). Si capturáramos el pointer aquí, el click
    // no llegaría al botón porque pointer-capture redirige todos los
    // eventos al contenedor.
    if ((e.target as HTMLElement).closest("button")) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      rx: rotationRef.current.x,
      ry: rotationRef.current.y,
      lastX: e.clientX,
      lastY: e.clientY,
      lastTime: Date.now(),
    }
    velocityRef.current = { x: 0, y: 0 }
    setIsDragging(true)
  }

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag) return

    const dx = e.clientX - drag.startX
    const dy = e.clientY - drag.startY
    // Sensibilidad: 1 px = 0.4°.
    const newY = drag.ry + dx * 0.4
    const newX = Math.max(-60, Math.min(60, drag.rx - dy * 0.4)) // clamp X para no voltear el globo

    rotationRef.current = { x: newX, y: newY }
    setRotation({ x: newX, y: newY })

    // Trackear velocidad para inercia.
    const now = Date.now()
    const dt = now - drag.lastTime
    if (dt > 0) {
      velocityRef.current = {
        x: -((e.clientY - drag.lastY) / dt) * 12,
        y: ((e.clientX - drag.lastX) / dt) * 12,
      }
    }
    drag.lastX = e.clientX
    drag.lastY = e.clientY
    drag.lastTime = now
  }

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return
    e.currentTarget.releasePointerCapture(e.pointerId)
    dragRef.current = null
    setIsDragging(false)
    idleSinceRef.current = Date.now()
  }

  return (
    <div
      ref={stageRef}
      className="relative mx-auto lg:mx-0 lg:ml-auto w-full max-w-[460px] aspect-square select-none"
      style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="application"
      aria-label="Globo interactivo de servicios. Arrastrá para rotarlo, click en un tile para ver detalle."
    >
      {/* CAPA 1 — halo de acreción exterior. Pulsa lento; en reduce-motion
           queda estático. */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={
          reduceMotion
            ? {}
            : {
                opacity: [0.7, 1, 0.7],
                scale: [0.98, 1.02, 0.98],
              }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.28) 0%, rgba(168, 85, 247, 0.16) 40%, transparent 70%)",
          filter: "blur(28px)",
        }}
        aria-hidden="true"
      />

      {/* CAPA 2 — anillos orbitales (sugieren rutas de las partículas). */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
        style={{
          transform: `rotateX(${65 + rotation.x * 0.3}deg) rotateZ(${rotation.y * 0.2}deg)`,
        }}
      >
        {[0.55, 0.75, 0.95].map((scale, i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: `${SPHERE_RADIUS * 2 * scale}px`,
              height: `${SPHERE_RADIUS * 2 * scale}px`,
              borderColor: `rgba(96, 165, 250, ${0.18 - i * 0.04})`,
              borderWidth: "1px",
              boxShadow: `0 0 30px rgba(96, 165, 250, ${0.1 - i * 0.02}) inset`,
            }}
          />
        ))}
      </div>

      {/* CAPA 3 — singularidad central. Núcleo oscuro con anillo brillante. */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="relative rounded-full"
          style={{
            width: "120px",
            height: "120px",
            background:
              "radial-gradient(circle at 35% 35%, rgba(15, 23, 42, 0.95) 0%, rgba(2, 6, 23, 1) 60%)",
            boxShadow:
              "0 0 0 2px rgba(96, 165, 250, 0.5), 0 0 60px rgba(96, 165, 250, 0.4), inset 0 0 30px rgba(0, 0, 0, 0.9)",
          }}
        >
          {/* Anillo de luz interior — el "borde del horizonte". */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, transparent 60%, rgba(168, 85, 247, 0.5) 75%, transparent 85%)",
              animation: reduceMotion
                ? undefined
                : "globePulse 4s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Stage con la rotación interactiva — todo lo que orbita va aquí. */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isDragging ? "none" : "transform 0.05s linear",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {/* CAPA 4 — partículas orbitales sobre la esfera interna. */}
        {PARTICLES.map((p, idx) => (
          <div
            key={idx}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(-50%, -50%) rotateY(${p.lng}deg) rotateX(${p.lat}deg) translateZ(${PARTICLE_RADIUS}px)`,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="rounded-full bg-blue-300"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: p.opacity,
                boxShadow: `0 0 ${p.size * 2}px rgba(147, 197, 253, 0.8)`,
              }}
            />
          </div>
        ))}

        {/* CAPA 5 — tiles de servicio sobre el cascarón externo. */}
        {TILES.map((tile, idx) => (
          <GlobeTile
            key={tile.label}
            tile={tile}
            index={idx}
            isActive={activeTile?.label === tile.label}
            onSelect={() =>
              setActiveTile((cur) =>
                cur?.label === tile.label ? null : tile
              )
            }
          />
        ))}
      </div>

      {/* Tooltip flotante — aparece al hacer click sobre un tile. */}
      <AnimatePresence>
        {activeTile && (
          <motion.div
            key={activeTile.label}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 bottom-2 md:bottom-4 w-[88%] max-w-[360px] z-20"
            role="tooltip"
          >
            <div className="surface-card p-4 md:p-5 relative">
              <button
                type="button"
                onClick={() => setActiveTile(null)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 border border-white/15 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-black/60 transition-colors"
                aria-label="Cerrar detalle"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <div className="flex items-start gap-3 pr-7">
                <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                  <activeTile.icon
                    className="w-4 h-4 text-blue-300"
                    aria-hidden="true"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-blue-300 font-medium">
                    Servicio
                  </p>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {activeTile.label}
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {activeTile.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint de interacción — chip flotante en la esquina superior. */}
      {!activeTile && (
        <div
          className="absolute top-2 right-2 z-10 inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-zinc-400 pointer-events-none"
          aria-hidden="true"
        >
          <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
          Arrastrá · Click
        </div>
      )}

      {/* Lista accesible para screen readers. */}
      <ul className="sr-only">
        {TILES.map((tile) => (
          <li key={tile.label}>
            <strong>{tile.label}:</strong> {tile.description}
          </li>
        ))}
      </ul>
    </div>
  )
}

function GlobeTile({
  tile,
  index,
  isActive,
  onSelect,
}: {
  tile: Tile
  index: number
  isActive: boolean
  onSelect: () => void
}) {
  const Icon = tile.icon
  return (
    <div
      className="absolute top-1/2 left-1/2 group/tile"
      style={{
        transform: `translate(-50%, -50%) rotateY(${tile.lng}deg) rotateX(${tile.lat}deg) translateZ(${SPHERE_RADIUS}px)`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <button
        type="button"
        data-tile-button
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        className={`relative w-[92px] h-[92px] md:w-[100px] md:h-[100px] flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-slate-950/85 backdrop-blur-md border transition-all duration-200 cursor-pointer ${
          isActive
            ? "border-blue-400/80 bg-slate-900/90 scale-110 shadow-[0_0_0_2px_rgba(96,165,250,0.3),0_18px_40px_-10px_rgba(59,130,246,0.6)]"
            : "border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_8px_24px_-12px_rgba(0,0,0,0.6)] hover:border-blue-400/60 hover:bg-slate-900/85 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_12px_28px_-8px_rgba(59,130,246,0.4)]"
        }`}
        style={{ transitionDelay: `${index * 20}ms` }}
        aria-label={`Servicio: ${tile.label}. ${isActive ? "Cerrar detalle." : "Click para ver detalle."}`}
        aria-pressed={isActive}
      >
        <div
          className={`w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center transition-colors ${isActive ? "border-blue-400/60 bg-blue-500/20" : "group-hover/tile:border-blue-400/50"}`}
        >
          <Icon className="w-4 h-4 text-blue-300" aria-hidden="true" />
        </div>
        <span className="text-[10px] md:text-[11px] font-semibold text-zinc-100 leading-tight text-center">
          {tile.label}
        </span>
      </button>
    </div>
  )
}
