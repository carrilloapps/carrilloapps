"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import Link from "next/link"
import {
  Wrench,
  Calendar,
  ChevronDown,
  FolderOpen,
  Mail,
  User,
  Briefcase,
  Layers,
  Users,
  LineChart,
  Database,
  Shield,
  Server,
  Cpu,
} from "lucide-react"
import { Github } from "@/components/icons/social-icons"
import { motion, AnimatePresence, useReducedMotion } from "@/lib/motion"
import { usePathname } from "next/navigation"

import { CalPopupButton } from "@/components/cal-booking"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { trackNavigation } from "@/lib/analytics"
// GitLab icon component
const GitLabIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
  </svg>
)

// Navigation structure with mega menu support
interface NavItem {
  href: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  description?: string
  children?: NavItem[]
}

// No "Inicio" entry: the letterhead is the way home, the way it works on every
// modern site. A nav item pointing at the page you are already on spends the
// most valuable slot in the bar restating the logo.
const navItems: NavItem[] = [
  {
    href: "/sobre-mi",
    label: "Sobre mí",
    icon: User,
    description: "Conoce mi experiencia y trayectoria",
  },
  {
    href: "/servicios",
    label: "Servicios",
    icon: Briefcase,
    description: "Soluciones tecnológicas",
    children: [
      // One entry per route now that each service has its own page. These used
      // to be fragment links into a tab strip on /servicios — the tab they
      // pointed at was not even the one that opened, since the anchor scrolled
      // but did not select.
      {
        href: "/servicios/liderazgo-tecnico",
        label: "Liderazgo técnico",
        description: "Dirección estratégica de equipos",
        icon: Users,
      },
      {
        href: "/servicios/fintech-y-banca",
        label: "Fintech y banca",
        description: "Soluciones financieras avanzadas",
        icon: LineChart,
      },
      {
        href: "/servicios/backoffice",
        label: "Backoffice",
        description: "Automatización de procesos internos",
        icon: Database,
      },
      {
        href: "/servicios/arquitectura-de-software",
        label: "Arquitectura",
        description: "Diseño de sistemas escalables",
        icon: Layers,
      },
      {
        href: "/servicios/seguridad-y-compliance",
        label: "Seguridad y compliance",
        description: "Protección y cumplimiento normativo",
        icon: Shield,
      },
      {
        href: "/servicios/infraestructura-cloud",
        label: "Infraestructura cloud",
        description: "Infraestructuras cloud optimizadas",
        icon: Server,
      },
      {
        href: "/servicios/inteligencia-artificial",
        label: "Inteligencia artificial",
        description: "IA aplicada a sistemas financieros",
        icon: Cpu,
      },
    ],
  },
  {
    href: "/recursos",
    label: "Recursos",
    icon: FolderOpen,
    description: "Herramientas y repositorios",
    children: [
      {
        href: "/herramientas",
        label: "Herramientas",
        description: "Librerías y CLIs que mantengo",
        icon: Wrench,
      },
      {
        href: "/recursos?tab=github",
        label: "Repositorios GitHub",
        description: "Proyectos open source en GitHub",
        icon: Github,
      },
      {
        href: "/recursos?tab=gitlab",
        label: "Repositorios GitLab",
        description: "Proyectos privados y corporativos",
        icon: GitLabIcon,
      },
    ],
  },
  {
    href: "/contacto",
    label: "Contacto",
    icon: Mail,
    description: "Ponte en contacto",
  },
]

// Memoized navigation item component for performance
const NavLink = memo(
  ({ item, isActive, onClose }: { item: NavItem; isActive: boolean; onClose?: () => void }) => {
    const Icon = item.icon
    const isExternal = item.href.startsWith("http")

    const handleClick = () => {
      trackNavigation(item.label, item.href, "header")
      onClose?.()
    }

    return (
      <Link
        href={item.href}
        onClick={handleClick}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`group relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-stamp ${
          isActive
            ? "border-b-2 border-stamp text-paper"
            : "text-paper-dim hover:bg-rule/40 hover:text-paper"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {Icon && (
          <Icon
            className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          />
        )}
        <span>{item.label}</span>
      </Link>
    )
  },
)
NavLink.displayName = "NavLink"

// Mega menu component
const MegaMenu = memo(
  ({
    item,
    isOpen,
    onClose,
    onKeepOpen,
  }: {
    item: NavItem
    isOpen: boolean
    onClose: () => void
    onKeepOpen?: () => void
  }) => {
    const shouldReduceMotion = useReducedMotion()
    const menuRef = useRef<HTMLDivElement>(null)
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
      if (isOpen && menuRef.current) {
        const handleClickOutside = (e: MouseEvent) => {
          if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            onClose()
          }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [isOpen, onClose])

    const handleMouseLeave = useCallback(() => {
      closeTimeoutRef.current = setTimeout(() => {
        onClose()
      }, 150)
    }, [onClose])

    const handleMouseEnter = useCallback(() => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
        closeTimeoutRef.current = null
      }
      onKeepOpen?.()
    }, [onKeepOpen])

    if (!item.children || item.children.length === 0) return null

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 z-50 mt-2 w-[560px] overflow-hidden border border-rule bg-ink-raised shadow-[0_24px_48px_-24px_rgba(0,0,0,0.9)]"
            style={{
              backdropFilter: "blur(32px) saturate(180%)",
              WebkitBackdropFilter: "blur(32px) saturate(180%)",
            }}
          >
            {/* Subtle glassmorphism overlay */}

            <div
              className="relative z-10 p-5"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="space-y-0">
                {item.children?.map((child, index) => {
                  const ChildIcon = child.icon
                  return (
                    <div key={child.href}>
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03, duration: 0.15 }}
                      >
                        <Link
                          href={child.href}
                          onClick={() => {
                            trackNavigation(child.label, child.href, "header")
                            onClose()
                          }}
                          className="group relative flex items-center gap-3 px-4 py-3 transition-all duration-300 ease-out hover:bg-rule/40 focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-stamp"
                        >
                          {/* Icon */}
                          {ChildIcon && (
                            <div className="shrink-0">
                              <ChildIcon className="h-5 w-5 text-paper-dim transition-colors duration-300 group-hover:text-stamp-text" />
                            </div>
                          )}

                          {/* Content */}
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-medium text-paper transition-colors duration-300 group-hover:text-stamp-text">
                              {child.label}
                            </h3>
                            {child.description && (
                              <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-paper-faint transition-colors duration-300 group-hover:text-paper-dim">
                                {child.description}
                              </p>
                            )}
                          </div>

                          {/* Subtle arrow indicator */}
                          <div className="shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <ChevronDown className="h-4 w-4 rotate-[-90deg] text-stamp-text" />
                          </div>
                        </Link>
                      </motion.div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  },
)
MegaMenu.displayName = "MegaMenu"

export function SiteHeader() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  /** 0–1 position through the document, drawn as the bar's bottom rule. */
  const [progress, setProgress] = useState(0)
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null)
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()

  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const ticking = useRef(false)
  const menuCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle scroll effect - hide/show header based on scroll direction
  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // The bar stays put — it used to translate off-screen on scroll-down,
          // which fought sticky positioning and left a dead band behind. What
          // changes with scroll is its density and its progress mark.
          const y = window.scrollY
          const scrollable = document.documentElement.scrollHeight - window.innerHeight
          setScrolled(y > 10)
          setProgress(scrollable > 0 ? Math.min(y / scrollable, 1) : 0)
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
      const mainContent = document.getElementById("main-content")
      if (mainContent) {
        mainContent.setAttribute("aria-hidden", "true")
      }
    } else {
      document.body.style.overflow = ""
      const mainContent = document.getElementById("main-content")
      if (mainContent) {
        mainContent.removeAttribute("aria-hidden")
      }
    }

    return () => {
      document.body.style.overflow = ""
      const mainContent = document.getElementById("main-content")
      if (mainContent) {
        mainContent.removeAttribute("aria-hidden")
      }
    }
  }, [mobileMenuOpen])

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mobileMenuOpen) {
          setMobileMenuOpen(false)
        }
        if (openMegaMenu) {
          setOpenMegaMenu(null)
        }
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [mobileMenuOpen, openMegaMenu])

  // Focus trap for mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      const menuItems = mobileMenuRef.current?.querySelectorAll<HTMLElement>("a[href], button")
      if (!menuItems || menuItems.length === 0) return

      const firstItem = menuItems[0]
      const lastItem = menuItems[menuItems.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstItem) {
          e.preventDefault()
          lastItem.focus()
        }
      } else {
        if (document.activeElement === lastItem) {
          e.preventDefault()
          firstItem.focus()
        }
      }
    }

    document.addEventListener("keydown", handleTabKey)
    return () => document.removeEventListener("keydown", handleTabKey)
  }, [mobileMenuOpen])

  // Focus first menu item when mobile menu opens
  useEffect(() => {
    if (mobileMenuOpen) {
      setTimeout(() => {
        firstMenuItemRef.current?.focus()
      }, 100)
    }
  }, [mobileMenuOpen])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  const handleMegaMenuToggle = useCallback((href: string) => {
    setOpenMegaMenu((prev) => (prev === href ? null : href))
  }, [])

  const handleMegaMenuClose = useCallback(() => {
    setOpenMegaMenu(null)
  }, [])

  // Check if pathname matches item or any child
  const isItemActive = useCallback(
    (item: NavItem): boolean => {
      if (pathname === item.href) return true
      if (item.children) {
        return item.children.some(
          (child) => pathname === child.href || pathname.startsWith(child.href),
        )
      }
      return false
    },
    [pathname],
  )

  if (!mounted)
    return (
      <header
        className="sticky top-0 z-50 h-16 w-full border-b border-rule bg-ink"
        role="banner"
        aria-label="Cargando encabezado"
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="opacity-0" aria-hidden="true">
            Loading...
          </div>
        </div>
      </header>
    )

  return (
    <>
      <header
        data-scrolled={scrolled ? "true" : "false"}
        className={`sticky top-0 z-50 w-full border-b transition-[background-color,border-color] duration-200 ${
          scrolled
            ? "border-rule-strong bg-ink/95 supports-[backdrop-filter]:bg-ink/85 supports-[backdrop-filter]:backdrop-blur-sm"
            : "border-rule bg-ink"
        }`}
        role="banner"
        itemScope
        itemType="https://schema.org/WPHeader"
      >
        {/* Reading progress: the ledger's travelling rule, reporting position
            in the document rather than an indeterminate wait. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-[-1px] block h-px origin-left bg-stamp transition-opacity duration-200"
          style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
        />
        {/* Subtle glassmorphism overlay effect */}
        <div
          className={`relative z-10 container flex items-center justify-between gap-6 transition-[height] duration-200 ${
            scrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          >
            <Logo showMark size={scrolled ? 26 : 30} />
          </motion.div>

          {/* Desktop Navigation */}
          <nav
            ref={navRef}
            className="hidden items-center gap-1 lg:flex"
            aria-label="Navegación principal"
            itemScope
            itemType="https://schema.org/SiteNavigationElement"
          >
            {navItems.map((item) => {
              const isActive = isItemActive(item)
              const hasChildren = item.children && item.children.length > 0
              const isMegaMenuOpen = openMegaMenu === item.href

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    if (hasChildren) {
                      if (menuCloseTimeoutRef.current) {
                        clearTimeout(menuCloseTimeoutRef.current)
                        menuCloseTimeoutRef.current = null
                      }
                      setOpenMegaMenu(item.href)
                    }
                  }}
                  onMouseLeave={() => {
                    if (hasChildren) {
                      menuCloseTimeoutRef.current = setTimeout(() => {
                        setOpenMegaMenu(null)
                      }, 150)
                    }
                  }}
                >
                  {hasChildren ? (
                    <button
                      type="button"
                      onClick={() => handleMegaMenuToggle(item.href)}
                      className={`group relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-stamp ${
                        isActive
                          ? "border-b-2 border-stamp text-paper"
                          : "text-paper-dim hover:bg-rule/40 hover:text-paper"
                      }`}
                      aria-expanded={isMegaMenuOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          isMegaMenuOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    <NavLink item={item} isActive={isActive} />
                  )}
                  {hasChildren && (
                    <MegaMenu
                      item={item}
                      isOpen={isMegaMenuOpen}
                      onClose={handleMegaMenuClose}
                      onKeepOpen={() => setOpenMegaMenu(item.href)}
                    />
                  )}
                </div>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Desktop CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                delay: 0.1,
              }}
              className="hidden lg:block"
            >
              <Button
                variant="outline"
                size="sm"
                className="group relative border-b-2 border-stamp text-paper transition-all duration-200 hover:border-stamp"
                asChild
              >
                <CalPopupButton source="header-desktop" aria-label="Agendar una asesoría">
                  <Calendar className="relative z-10 mr-2 h-4 w-4" aria-hidden="true" />
                  <span className="relative z-10">Agéndame</span>
                </CalPopupButton>
              </Button>
            </motion.div>

            {/* Mobile CTA */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-paper transition-colors hover:bg-rule/50"
                asChild
              >
                <CalPopupButton source="header-mobile-icon" aria-label="Agendar una asesoría">
                  <Calendar className="h-5 w-5" aria-hidden="true" />
                </CalPopupButton>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                className="text-paper transition-colors hover:bg-rule/50"
              >
                <motion.div
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                >
                  {mobileMenuOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="4" x2="20" y1="12" y2="12"></line>
                      <line x1="4" x2="20" y1="6" y2="6"></line>
                      <line x1="4" x2="20" y1="18" y2="18"></line>
                    </svg>
                  )}
                </motion.div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-50 bg-ink/95 lg:hidden"
            onClick={closeMobileMenu}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación móvil"
          >
            <motion.div
              ref={mobileMenuRef}
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
                duration: shouldReduceMotion ? 0 : undefined,
              }}
              className="fixed top-0 right-0 flex h-full w-full max-w-sm flex-col overflow-hidden border-l border-rule-strong bg-ink"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced glassmorphism overlay for mobile menu */}

              {/* Mobile Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-rule p-4">
                <Logo showMark markOnly={false} />
                <Button
                  ref={closeButtonRef}
                  variant="ghost"
                  size="icon"
                  onClick={closeMobileMenu}
                  aria-label="Cerrar menú"
                  className="text-paper hover:bg-rule/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </Button>
              </div>

              {/* Mobile Navigation */}
              <div className="relative z-10 flex-1 overflow-y-auto px-4 py-6">
                <nav className="space-y-1" aria-label="Navegación móvil">
                  {navItems.map((item, index) => {
                    const isActive = isItemActive(item)
                    const hasChildren = item.children && item.children.length > 0
                    const isExpanded = openMegaMenu === item.href
                    const isFirstItem = index === 0

                    return (
                      <div key={item.href}>
                        <Link
                          ref={isFirstItem ? firstMenuItemRef : undefined}
                          href={item.href}
                          className={`group relative flex items-center justify-between px-4 py-3 transition-all duration-300 ease-out focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-stamp ${
                            isActive
                              ? "border-b-2 border-stamp text-paper"
                              : "text-paper-dim hover:bg-rule/40 hover:text-paper"
                          }`}
                          onClick={
                            hasChildren
                              ? (e) => {
                                  e.preventDefault()
                                  handleMegaMenuToggle(item.href)
                                }
                              : () => {
                                  trackNavigation(item.label, item.href, "header")
                                  closeMobileMenu()
                                }
                          }
                          aria-current={isActive ? "page" : undefined}
                        >
                          <div className="flex items-center gap-3">
                            {item.icon && (
                              <item.icon
                                className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                                aria-hidden="true"
                              />
                            )}
                            <span className="font-medium">{item.label}</span>
                          </div>
                          {hasChildren && (
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-300 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                              aria-hidden="true"
                            />
                          )}
                        </Link>
                        {hasChildren && (
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: shouldReduceMotion ? 0 : 0.2,
                                }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-1 py-2 pl-12">
                                  {item.children?.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() => {
                                        trackNavigation(child.label, child.href, "header")
                                        closeMobileMenu()
                                      }}
                                      className="group/item flex items-center gap-3 px-4 py-3 text-sm transition-all duration-300 ease-out hover:bg-rule/40"
                                    >
                                      {child.icon && (
                                        <div className="shrink-0">
                                          <child.icon className="h-5 w-5 text-paper-dim transition-colors duration-300 group-hover/item:text-stamp-text" />
                                        </div>
                                      )}
                                      <div className="min-w-0 flex-1">
                                        <div className="font-medium text-paper transition-colors duration-300 group-hover/item:text-stamp-text">
                                          {child.label}
                                        </div>
                                        {child.description && (
                                          <div className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-paper-faint transition-colors duration-300 group-hover/item:text-paper-dim">
                                            {child.description}
                                          </div>
                                        )}
                                      </div>
                                      <div className="shrink-0 opacity-0 transition-opacity duration-300 group-hover/item:opacity-100">
                                        <ChevronDown className="h-4 w-4 rotate-[-90deg] text-stamp-text" />
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    )
                  })}
                </nav>
              </div>

              {/* Mobile Footer */}
              <div className="relative z-10 border-t border-rule p-4">
                <Button
                  className="group/btn relative w-full border border-stamp bg-transparent py-3 font-mono text-xs tracking-[0.08em] text-paper uppercase transition-colors duration-200 hover:bg-stamp hover:text-ink"
                  asChild
                >
                  <CalPopupButton
                    source="mobile-menu-footer"
                    aria-label="Agendar una asesoría"
                    className="inline-flex w-full items-center justify-center"
                  >
                    <Calendar className="relative z-10 mr-2 h-4 w-4" aria-hidden="true" />
                    <span className="relative z-10">Agéndame</span>
                  </CalPopupButton>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
