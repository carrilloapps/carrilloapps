"use client"

import { useState, useEffect, useCallback, useRef } from "react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DynamicBackground } from "@/components/dynamic-background"
import { OpenSourceSection } from "@/components/open-source-section"
import { LatestPostsSection } from "@/components/latest-posts-section"
import { ParallaxBackdrop } from "@/components/parallax-backdrop"
import { AuroraBackdrop } from "@/components/aurora-backdrop"
import { HeroScrollIndicator } from "@/components/hero-scroll-indicator"
import { HomeHero } from "@/components/home/home-hero"
import { HomeStats } from "@/components/home/home-stats"
import { ExperienceSection } from "@/components/home/experience-section"
import { ProjectsSection } from "@/components/home/projects-section"
import { CvDownloadModal } from "@/components/cv-download-modal"
import { DynamicCompactContactSection as CompactContactSection } from "@/components/dynamic-imports"
import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/section-header"
import { MessageCircle } from "lucide-react"
import { trackScrollDepth } from "@/lib/analytics"

// Email/phone obfuscation kept inline for now since it's only used by the
// contact form that lives on this page.
const obfuscateEmail = (email: string): string =>
  btoa(email).split("").reverse().join("")

const deobfuscateEmail = (obfuscated: string): string =>
  atob(obfuscated.split("").reverse().join(""))

const obfuscatePhone = (phone: string): string =>
  phone
    .split("")
    .map((char, index) =>
      index % 2 === 0 ? char : String.fromCharCode(char.charCodeAt(0) + 1)
    )
    .join("")

const deobfuscatePhone = (obfuscated: string): string =>
  obfuscated
    .split("")
    .map((char, index) =>
      index % 2 === 0 ? char : String.fromCharCode(char.charCodeAt(0) - 1)
    )
    .join("")

const useRateLimit = (limit: number = 3, windowMs: number = 60000) => {
  const [attempts, setAttempts] = useState<number[]>([])

  const isLimited = useCallback(() => {
    const now = Date.now()
    return attempts.filter((time) => now - time < windowMs).length >= limit
  }, [attempts, limit, windowMs])

  const recordAttempt = useCallback(() => {
    const now = Date.now()
    setAttempts((prev) => [
      ...prev.filter((time) => now - time < windowMs),
      now,
    ])
  }, [windowMs])

  return { isLimited: isLimited(), recordAttempt }
}

export default function Home() {
  const [cvModalOpen, setCvModalOpen] = useState(false)

  const [emailRevealed, setEmailRevealed] = useState(false)
  const [phoneRevealed, setPhoneRevealed] = useState(false)
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  })

  const { isLimited: isContactLimited, recordAttempt: recordContactAttempt } =
    useRateLimit(3, 60000)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSubmission, setLastSubmission] = useState<number>(0)

  const contactFormRef = useRef<HTMLFormElement>(null)
  const startTime = useRef<number>(0)

  const obfuscatedEmail = obfuscateEmail("m@carrillo.app")
  const obfuscatedPhone = obfuscatePhone("+57 (300) 332 8389")

  useEffect(() => {
    startTime.current = Date.now()
  }, [])

  // Scroll depth tracking — fires once per quartile.
  useEffect(() => {
    const scrollDepths = [25, 50, 75, 100] as const
    const tracked = new Set<number>()

    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (window.scrollY / docHeight) * 100

      scrollDepths.forEach((depth) => {
        if (scrollPercent >= depth && !tracked.has(depth)) {
          trackScrollDepth(depth)
          tracked.add(depth)
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleContactInputChange = (field: string, value: string) => {
    setContactFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (contactFormData.honeypot) return
    if (isContactLimited) {
      alert(
        "Demasiados intentos. Por favor, espera un momento antes de intentar nuevamente."
      )
      return
    }
    if (Date.now() - startTime.current < 1000) return
    if (Date.now() - lastSubmission < 5000) {
      alert("Por favor, espera antes de enviar otro mensaje.")
      return
    }

    setIsSubmitting(true)
    recordContactAttempt()
    setLastSubmission(Date.now())

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setContactFormData({
        name: "",
        email: "",
        subject: contactFormData.subject || "",
        message: "",
        honeypot: "",
      })
      alert("¡Mensaje enviado exitosamente!")
    } catch (error) {
      console.error("Error sending message:", error)
      alert("Error al enviar el mensaje. Por favor, inténtalo nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <DynamicBackground />
      <SiteHeader />
      <main id="main-content" role="main" className="relative z-10">
        <HomeHero onRequestCv={() => setCvModalOpen(true)} />
        <HeroScrollIndicator />

        <HomeStats />

        {/* 01 — Open Source · transparent surface · brackets parallax */}
        <div className="relative overflow-hidden">
          <ParallaxBackdrop variant="brackets" position="top-right" speed={0.18} />
          <OpenSourceSection />
        </div>

        {/* 02 — Blog · aurora mesh (animated) — el segmento "editorial". */}
        <div className="relative overflow-hidden">
          <AuroraBackdrop tone="blog" />
          <LatestPostsSection />
        </div>

        {/* 03 — Experience · transparent surface · diagonals parallax */}
        <div className="relative overflow-hidden">
          <ParallaxBackdrop
            variant="diagonals"
            position="top-left"
            speed={0.14}
            opacityClass="opacity-[0.05]"
          />
          <ExperienceSection />
        </div>

        {/* 04 — Projects · subtle dark surface · rings parallax */}
        <div className="relative overflow-hidden bg-zinc-950/50 backdrop-blur-sm border-y border-zinc-900/60">
          <ParallaxBackdrop variant="rings" position="bottom-right" speed={0.16} />
          <ProjectsSection />
        </div>

        {/* 05 — Contact · transparent surface · brackets parallax (centred) */}
        <div className="relative overflow-hidden">
          <ParallaxBackdrop
            variant="brackets"
            position="center"
            speed={0.12}
            opacityClass="opacity-[0.04]"
          />
          <AnimatedSection
            id="contact"
            className="py-12 md:py-16 relative"
            delay={0.4}
            role="region"
            aria-labelledby="contact-heading"
          >
            <div className="container mx-auto px-4 relative z-10">
              <SectionHeader
                eyebrow="Trabajemos juntos"
                eyebrowIcon={MessageCircle}
                title="Hablemos de tu proyecto"
                description="Soluciones de pago, arquitectura de microservicios y liderazgo técnico. Cuéntame qué estás construyendo."
                headingId="contact-heading"
                align="left"
              />

              <CompactContactSection
                formData={contactFormData}
                onInputChange={handleContactInputChange}
                onSubmit={handleContactSubmit}
                isSubmitting={isSubmitting}
                isLimited={isContactLimited}
                formRef={contactFormRef}
                emailRevealed={emailRevealed}
                phoneRevealed={phoneRevealed}
                onRevealEmail={() => setEmailRevealed(true)}
                onRevealPhone={() => setPhoneRevealed(true)}
                obfuscatedEmail={obfuscatedEmail}
                obfuscatedPhone={obfuscatedPhone}
                deobfuscateEmail={deobfuscateEmail}
                deobfuscatePhone={deobfuscatePhone}
              />
            </div>
          </AnimatedSection>
        </div>

      </main>

      <CvDownloadModal open={cvModalOpen} onOpenChange={setCvModalOpen} />

      <SiteFooter />
    </div>
  )
}
