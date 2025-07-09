"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/sobre-mi", label: "Sobre mí" },
    { href: "/blog", label: "Blog" },
    { href: "/recursos", label: "Recursos" },
    { href: "/servicios", label: "Servicios" },
    { href: "/contacto", label: "Contacto" },
  ]

  // Handle scroll effect
  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if we've scrolled enough to change the header appearance
      const isScrolled = currentScrollY > 10
      setScrolled(isScrolled)

      // Always show header at the top of the page
      if (currentScrollY < 10) {
        setVisible(true)
      } else {
        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && visible) {
          // Scrolling down & header is visible -> hide it
          setVisible(false)
        } else if (currentScrollY < lastScrollY && !visible) {
          // Scrolling up & header is hidden -> show it
          setVisible(true)
        }
      }

      // Update last scroll position
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY, visible])

  // Initialize scroll position
  useEffect(() => {
    const initialScrollY = window.scrollY
    setScrolled(initialScrollY > 10)
    setLastScrollY(initialScrollY)
  }, [])

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
      // Always show header when menu is open
      setVisible(true)
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Animation variants
  const headerVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    hidden: {
      opacity: 0,
      y: -100,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  }

  const navItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.7,
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  if (!mounted)
    return (
      <header
        className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/75 backdrop-blur-md h-16"
        role="banner"
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="opacity-0">Loading...</div>
        </div>
      </header>
    )

  return (
    <>
      <motion.header
        initial="visible"
        animate={visible || mobileMenuOpen ? "visible" : "hidden"}
        variants={headerVariants}
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          scrolled 
            ? "bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-blue-500/5" 
            : "bg-black/10 backdrop-blur-lg border-b border-white/5"
        }`}
        style={{
          background: scrolled 
            ? 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(15,23,42,0.4) 50%, rgba(0,0,0,0.3) 100%)'
            : 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(15,23,42,0.2) 50%, rgba(0,0,0,0.1) 100%)'
        }}
        role="banner"
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Logo animationLevel="none" />
          </motion.div>

          <nav className="hidden md:flex items-center gap-2" aria-label="Navegación principal">
            {navItems.map((item, i) => {
              const isActive = pathname === item.href

              return (
                <motion.div key={item.href} custom={i} initial="initial" animate="animate" variants={navItemVariants}>
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl group ${
                      isActive 
                        ? "text-white font-semibold bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg shadow-blue-500/10" 
                        : "text-zinc-400 hover:text-white hover:bg-white/5 hover:backdrop-blur-sm hover:border hover:border-white/10"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              className="hidden md:block"
            >
              <Button
                variant="outline"
                size="sm"
                className="relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/20 text-white hover:from-blue-500/20 hover:to-purple-500/20 hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group"
                asChild
              >
                <Link href="/agendamiento">
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 15 }}
                    transition={{ duration: 0.2 }}
                    className="mr-2 relative z-10"
                  >
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                  </motion.div>
                  <span className="relative z-10 font-medium">Agéndame</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/20 group-hover:to-blue-500/10 transition-all duration-500" />
                </Link>
              </Button>
            </motion.div>

            <div className="flex items-center gap-2">
              <AnimatePresence>
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  className="md:hidden"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/20 text-white hover:from-blue-500/20 hover:to-purple-500/20 hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group"
                    asChild
                  >
                    <Link href="/agendamiento">
                      <motion.div 
                        initial={{ rotate: 0 }} 
                        whileHover={{ rotate: 15 }} 
                        transition={{ duration: 0.2 }}
                        className="relative z-10"
                      >
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                      </motion.div>
                      <span className="sr-only">Agéndame</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/20 group-hover:to-blue-500/10 transition-all duration-500" />
                    </Link>
                  </Button>
                </motion.div>
              </AnimatePresence>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMobileMenu}
                  aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                  className="text-white hover:bg-zinc-800/50 transition-colors rounded-full relative"
                >
                  <motion.div animate={{ rotate: mobileMenuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                    {mobileMenuOpen ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 180 }} exit={{ scale: 0 }}>
                        <span className="sr-only">Cerrar menú</span>
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
                        >
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                      </motion.div>
                    ) : (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <span className="sr-only">Abrir menú</span>
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
                        >
                          <line x1="4" x2="20" y1="12" y2="12"></line>
                          <line x1="4" x2="20" y1="6" y2="6"></line>
                          <line x1="4" x2="20" y1="18" y2="18"></line>
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu (Simplified) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999]"
              style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed inset-0 z-[10000] flex flex-col overflow-hidden"
                style={{ 
                  position: "fixed", 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(15,23,42,0.98) 50%, rgba(0,0,0,0.95) 100%)',
                  backdropFilter: 'blur(20px)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
                  <Logo animationLevel="playful" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Cerrar menú"
                    className="text-white hover:bg-zinc-800/50 rounded-full"
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
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </Button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-10 px-4">
                  <nav className="space-y-3 max-w-md mx-auto">
                    {navItems.map((item, index) => {
                      const isActive = pathname === item.href
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <Link
                            href={item.href}
                            className={`flex items-center justify-between py-4 px-5 rounded-xl transition-all duration-300 group ${
                              isActive
                                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-white/20 backdrop-blur-sm shadow-lg shadow-blue-500/10"
                                : "text-zinc-300 hover:bg-white/5 hover:text-white hover:backdrop-blur-sm hover:border hover:border-white/10"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="font-medium text-lg relative z-10">{item.label}</span>
                            {isActive ? (
                              <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg shadow-blue-500/50"
                              />
                            ) : (
                              <div className="h-3 w-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300" />
                            )}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
                          </Link>
                        </motion.div>
                      )
                    })}
                  </nav>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-gradient-to-r from-black/20 to-slate-900/30 backdrop-blur-sm">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      className="w-full relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-6 text-lg shadow-2xl shadow-blue-500/30 border border-white/20 backdrop-blur-sm group"
                      asChild
                    >
                      <Link href="/agendamiento" onClick={() => setMobileMenuOpen(false)}>
                        <motion.div
                          initial={{ rotate: 0 }}
                          whileHover={{ rotate: 15 }}
                          transition={{ duration: 0.2 }}
                          className="mr-3 relative z-10"
                        >
                          <Calendar className="h-5 w-5" />
                        </motion.div>
                        <span className="font-medium relative z-10">Agéndame</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 group-hover:via-white/20 transition-all duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%]" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
