"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import Link from "next/link"
import { 
  Calendar, 
  ChevronDown, 
  Code, 
  BookOpen, 
  FolderOpen, 
  Mail, 
  Home, 
  User, 
  Briefcase, 
  Globe,
  Layers,
  Users,
  Sparkles,
  Zap,
  Github,
  Wrench
} from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

// Navigation structure with mega menu support
interface NavItem {
  href: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  description?: string
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Inicio",
    icon: Home,
    description: "Página principal",
  },
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
      {
        href: "/servicios#technical-leadership",
        label: "Desarrollo Web",
        description: "Aplicaciones web modernas y escalables",
        icon: Globe,
      },
      {
        href: "/servicios#consultoria",
        label: "Consultoría",
        description: "Asesoría técnica especializada",
        icon: Briefcase,
      },
      {
        href: "/servicios#arquitectura",
        label: "Arquitectura de Software",
        description: "Diseño de sistemas robustos",
        icon: Layers,
      },
      {
        href: "/servicios#mentoria",
        label: "Mentoría",
        description: "Desarrollo de equipos y talento",
        icon: Users,
      },
    ],
  },
  {
    href: "/blog",
    label: "Blog",
    icon: BookOpen,
    description: "Artículos y tutoriales",
    children: [
      {
        href: "/blog",
        label: "Desarrollo",
        description: "Tutoriales y guías de programación",
        icon: Code,
      },
      {
        href: "/blog?category=tecnologia",
        label: "Tecnología",
        description: "Tendencias y novedades tecnológicas",
        icon: Zap,
      },
      {
        href: "/blog?category=arquitectura",
        label: "Arquitectura",
        description: "Diseño y arquitectura de software",
        icon: Layers,
      },
      {
        href: "/blog?category=best-practices",
        label: "Mejores Prácticas",
        description: "Estándares y buenas prácticas",
        icon: Sparkles,
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
        href: "/recursos#repositorios",
        label: "Repositorios",
        description: "Proyectos open source",
        icon: Github,
      },
      {
        href: "/recursos#herramientas",
        label: "Herramientas",
        description: "Utilidades y recursos útiles",
        icon: Wrench,
      },
    ],
  },
  {
    href: "/contacto",
    label: "Contacto",
    icon: Mail,
    description: "Ponte en contacto",
  },
];

// Memoized navigation item component for performance
const NavLink = memo(({ item, isActive, onClose }: { item: NavItem; isActive: boolean; onClose?: () => void }) => {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={`group relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black ${
        isActive
          ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30"
          : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {Icon && <Icon className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />}
      <span>{item.label}</span>
    </Link>
  )
})
NavLink.displayName = "NavLink"

// Mega menu component
const MegaMenu = memo(({ item, isOpen, onClose, onKeepOpen }: { item: NavItem; isOpen: boolean; onClose: () => void; onKeepOpen?: () => void }) => {
  const shouldReduceMotion = useReducedMotion()
  const menuRef = useRef<HTMLDivElement>(null)

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
          className="absolute top-full left-0 mt-2 w-[560px] bg-black/70 backdrop-blur-2xl rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden"
          style={{
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          }}
        >
          {/* Subtle glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
          
          <div 
            className="relative z-10 p-5"
            onMouseEnter={() => onKeepOpen?.()}
            onMouseLeave={() => {
              // Delay to allow mouse to return to button
              setTimeout(() => {
                onClose()
              }, 300)
            }}
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
                        onClick={onClose}
                        className="group flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800/40 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-blue-500/50 relative"
                      >
                        {/* Icon */}
                        {ChildIcon && (
                          <div className="flex-shrink-0">
                            <ChildIcon className="w-5 h-5 text-zinc-400 group-hover:text-blue-400 transition-colors duration-300" />
                          </div>
                        )}
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors duration-300 text-sm">
                            {child.label}
                          </h3>
                          {child.description && (
                            <p className="text-zinc-500 text-xs group-hover:text-zinc-400 transition-colors duration-300 leading-relaxed mt-0.5 line-clamp-2">
                              {child.description}
                            </p>
                          )}
                        </div>
                        
                        {/* Subtle arrow indicator */}
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ChevronDown className="w-4 h-4 text-blue-400 rotate-[-90deg]" />
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
})
MegaMenu.displayName = "MegaMenu"

export function SiteHeader() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()
  
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)

  // Handle scroll effect - hide/show header based on scroll direction
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrolled = currentScrollY > 10
      
      setScrolled(isScrolled)

      // Hide header when scrolling down, show when scrolling up
      // Always show header at the top of the page
      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down - hide header (reduced threshold from 100 to 50)
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsVisible(true)
      }
      // If scroll position hasn't changed, maintain current visibility state

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

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

      const menuItems = mobileMenuRef.current?.querySelectorAll<HTMLElement>('a[href], button')
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
  const isItemActive = useCallback((item: NavItem): boolean => {
    if (pathname === item.href) return true
    if (item.children) {
      return item.children.some((child) => pathname === child.href || pathname.startsWith(child.href))
    }
    return false
  }, [pathname])

  if (!mounted)
    return (
      <header
        className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-black/80 backdrop-blur-md h-16"
        role="banner"
        aria-label="Cargando encabezado"
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="opacity-0" aria-hidden="true">Loading...</div>
        </div>
      </header>
    )

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "CarrilloApps",
            url: "https://carrillo.app",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://carrillo.app/blog?search={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <motion.header
        initial={false}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`sticky top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-black/20 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-black/20"
            : "bg-black/10 backdrop-blur-xl border-b border-white/5"
        }`}
        role="banner"
        itemScope
        itemType="https://schema.org/WPHeader"
      >
        {/* Subtle glassmorphism overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />
        <div className="container flex h-16 items-center justify-between relative z-10">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          >
            <Logo animationLevel="none" variant="image" />
          </motion.div>

          {/* Desktop Navigation */}
          <nav
            ref={navRef}
            className="hidden lg:flex items-center gap-1"
            aria-label="Navegación principal"
            itemScope
            itemType="https://schema.org/SiteNavigationElement"
          >
            {navItems.map((item) => {
              const isActive = isItemActive(item);
              const hasChildren = item.children && item.children.length > 0;
              const isMegaMenuOpen = openMegaMenu === item.href;

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => hasChildren && setOpenMegaMenu(item.href)}
                  onMouseLeave={() => {
                    if (hasChildren) {
                      // Delay to allow mouse to move to mega menu
                      setTimeout(() => {
                        if (openMegaMenu !== item.href) {
                          setOpenMegaMenu(null);
                        }
                      }, 300);
                    }
                  }}
                >
                  {hasChildren ? (
                    <button
                      type="button"
                      onClick={() => handleMegaMenuToggle(item.href)}
                      className={`group relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black ${
                        isActive
                          ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                      }`}
                      aria-expanded={isMegaMenuOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
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
              );
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
                className="relative overflow-hidden bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 text-white hover:from-blue-500/30 hover:to-purple-500/30 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 group"
                asChild
              >
                <Link href="/agendamiento">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
                  <Calendar
                    className="h-4 w-4 mr-2 relative z-10"
                    aria-hidden="true"
                  />
                  <span className="relative z-10">Agéndame</span>
                </Link>
              </Button>
            </motion.div>

            {/* Mobile CTA */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-zinc-800/50 transition-colors"
                asChild
              >
                <Link href="/agendamiento" aria-label="Agendar cita">
                  <Calendar className="h-5 w-5" aria-hidden="true" />
                </Link>
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
                className="text-white hover:bg-zinc-800/50 transition-colors"
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
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 lg:hidden"
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
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-black/20 backdrop-blur-2xl border-l border-white/20 flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced glassmorphism overlay for mobile menu */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none" />

              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-800/50 relative z-10">
                <Logo animationLevel="playful" />
                <Button
                  ref={closeButtonRef}
                  variant="ghost"
                  size="icon"
                  onClick={closeMobileMenu}
                  aria-label="Cerrar menú"
                  className="text-white hover:bg-zinc-800/50"
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
              <div className="flex-1 overflow-y-auto py-6 px-4 relative z-10">
                <nav className="space-y-1" aria-label="Navegación móvil">
                  {navItems.map((item, index) => {
                    const isActive = isItemActive(item);
                    const hasChildren =
                      item.children && item.children.length > 0;
                    const isExpanded = openMegaMenu === item.href;
                    const isFirstItem = index === 0;

                    return (
                      <div key={item.href}>
                        <Link
                          ref={isFirstItem ? firstMenuItemRef : undefined}
                          href={item.href}
                          className={`flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300 ease-out group focus:outline-none focus:ring-2 focus:ring-blue-500/50 relative ${
                            isActive
                              ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30"
                              : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                          }`}
                          onClick={
                            hasChildren
                              ? (e) => {
                                  e.preventDefault();
                                  handleMegaMenuToggle(item.href);
                                }
                              : closeMobileMenu
                          }
                          aria-current={isActive ? "page" : undefined}
                        >
                          <div className="flex items-center gap-3">
                            {item.icon && (
                              <item.icon
                                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                                aria-hidden="true"
                              />
                            )}
                            <span className="font-medium">{item.label}</span>
                          </div>
                          {hasChildren && (
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-300 ${
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
                                <div className="py-2 pl-12 space-y-1">
                                  {item.children?.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={closeMobileMenu}
                                      className="group/item flex items-center gap-3 py-3 px-4 text-sm rounded-lg transition-all duration-300 ease-out hover:bg-zinc-800/40"
                                    >
                                      {child.icon && (
                                        <div className="flex-shrink-0">
                                          <child.icon className="w-5 h-5 text-zinc-400 group-hover/item:text-blue-400 transition-colors duration-300" />
                                        </div>
                                      )}
                                      <div className="flex-1 min-w-0">
                                        <div className="font-medium text-white group-hover/item:text-blue-400 transition-colors duration-300">
                                          {child.label}
                                        </div>
                                        {child.description && (
                                          <div className="text-xs text-zinc-500 group-hover/item:text-zinc-400 transition-colors duration-300 leading-relaxed mt-0.5 line-clamp-2">
                                            {child.description}
                                          </div>
                                        )}
                                      </div>
                                      <div className="flex-shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                        <ChevronDown className="w-4 h-4 text-blue-400 rotate-[-90deg]" />
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Footer */}
              <div className="p-4 border-t border-zinc-800/50 relative z-10">
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 transition-all duration-200 relative overflow-hidden group/btn backdrop-blur-sm border border-blue-500/30 shadow-lg shadow-blue-500/20"
                  asChild
                >
                  <Link href="/agendamiento" onClick={closeMobileMenu}>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 group-hover/btn:via-white/20 transition-all duration-300" />
                    <Calendar
                      className="h-4 w-4 mr-2 relative z-10"
                      aria-hidden="true"
                    />
                    <span className="relative z-10">Agéndame</span>
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
