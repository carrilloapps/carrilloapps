"use client";

import { type ReactNode, useState } from "react";
import Link from "next/link";
import { motion } from "@/lib/motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Eye,
  type LucideIcon,
} from "lucide-react";
import { Github, Linkedin, Substack } from "@/components/icons/social-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface CompactContactSectionProps {
  formData: {
    name: string;
    email: string;
    whatsapp: string;
    company: string;
    subject: string;
    message: string;
    honeypot: string;
  };
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  isLimited: boolean;
  formRef: React.RefObject<HTMLFormElement | null>;
  emailRevealed: boolean;
  phoneRevealed: boolean;
  onRevealEmail: () => void;
  onRevealPhone: () => void;
  obfuscatedEmail: string;
  obfuscatedPhone: string;
  deobfuscateEmail: (value: string) => string;
  deobfuscatePhone: (value: string) => string;
}

/**
 * Two-column contact block: form (2/3) + direct-contact card (1/3).
 *
 * Both top-level cards use `<SurfaceCard>` so they share the canonical glassy
 * slate surface with the rest of the home. Inner contact rows + social pills
 * use `surface-card-subtle` — same colour family, no halo, visually
 * subordinate to the parent. One blue accent for every icon (no purple/pink/
 * cyan/emerald soup).
 */
export function CompactContactSection({
  formData,
  onInputChange,
  onSubmit,
  isSubmitting,
  isLimited,
  formRef,
  emailRevealed,
  phoneRevealed,
  onRevealEmail,
  onRevealPhone,
  obfuscatedEmail,
  obfuscatedPhone,
  deobfuscateEmail,
  deobfuscatePhone,
}: CompactContactSectionProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <div className="grid lg:grid-cols-3 gap-6 w-full">
      {/* Form — spans 2 columns on lg+. */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        whileHover={{ y: -4 }}
        className="group lg:col-span-2"
      >
        <SurfaceCard className="h-full">
          <div className="p-6 md:p-8 space-y-6">
            <CardHead
              icon={Send}
              title="Envíame un mensaje"
              description="Te respondo en menos de 24 horas."
            />

            <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
              {/* Honeypot — off-screen, hidden from AT and tab order. */}
              <input
                type="text"
                name="website"
                value={formData.honeypot}
                onChange={(e) => onInputChange("honeypot", e.target.value)}
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  opacity: 0,
                  pointerEvents: "none",
                  visibility: "hidden",
                }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  id="contact-name"
                  label="Nombre"
                >
                  <Input
                    id="contact-name"
                    name="name"
                    variant="glass"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={(e) => onInputChange("name", e.target.value)}
                    required
                    disabled={isSubmitting}
                    autoComplete="name"
                    autoCapitalize="words"
                    spellCheck={false}
                    minLength={2}
                  />
                </Field>
                <Field id="contact-email" label="Email">
                  <Input
                    id="contact-email"
                    name="email"
                    variant="glass"
                    type="email"
                    inputMode="email"
                    placeholder="tu@correo.com"
                    value={formData.email}
                    onChange={(e) => onInputChange("email", e.target.value)}
                    required
                    disabled={isSubmitting}
                    autoComplete="email"
                    autoCapitalize="off"
                    spellCheck={false}
                  />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="contact-whatsapp" label="WhatsApp">
                  <Input
                    id="contact-whatsapp"
                    name="whatsapp"
                    variant="glass"
                    type="tel"
                    inputMode="tel"
                    placeholder="+57 300 000 0000"
                    value={formData.whatsapp}
                    onChange={(e) => onInputChange("whatsapp", e.target.value)}
                    required
                    disabled={isSubmitting}
                    autoComplete="tel"
                    spellCheck={false}
                  />
                </Field>
                <Field id="contact-company" label="Empresa" optional>
                  <Input
                    id="contact-company"
                    name="company"
                    variant="glass"
                    placeholder="Tu empresa"
                    value={formData.company}
                    onChange={(e) => onInputChange("company", e.target.value)}
                    disabled={isSubmitting}
                    autoComplete="organization"
                    autoCapitalize="words"
                    spellCheck={false}
                  />
                </Field>
              </div>

              <Field id="subject-select" label="Asunto">
                <Select
                  value={formData.subject}
                  onValueChange={(value) => onInputChange("subject", value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="subject-select" variant="glass">
                    <SelectValue placeholder="Selecciona un asunto" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950/95 backdrop-blur-xl border-white/10">
                    <SelectItem value="consulta-general">
                      Consulta general
                    </SelectItem>
                    <SelectItem value="proyecto-nuevo">
                      Nuevo proyecto
                    </SelectItem>
                    <SelectItem value="colaboracion">Colaboración</SelectItem>
                    <SelectItem value="consultoria">Consultoría</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field id="contact-message" label="Mensaje">
                <Textarea
                  id="contact-message"
                  name="message"
                  variant="glass"
                  placeholder="Cuéntame sobre tu proyecto: contexto, escala, plazo…"
                  value={formData.message}
                  onChange={(e) => onInputChange("message", e.target.value)}
                  rows={5}
                  required
                  disabled={isSubmitting}
                  minLength={10}
                  maxLength={2000}
                />
              </Field>

              {isLimited && (
                <div
                  className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                  role="alert"
                >
                  <p className="text-red-400 text-sm">
                    Has alcanzado el límite de envíos. Espera un momento antes
                    de intentar nuevamente.
                  </p>
                </div>
              )}

              <label className="flex items-start gap-3 cursor-pointer group/terms">
                <input
                  type="checkbox"
                  id="terms-accepted"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  disabled={isSubmitting}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border border-zinc-600 bg-zinc-800/60 accent-blue-500 cursor-pointer disabled:opacity-50"
                  aria-required="true"
                />
                <span className="text-sm text-zinc-400 leading-snug group/terms-hover:text-zinc-300 transition-colors">
                  He leído y acepto los{" "}
                  <Link
                    href="/terminos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link
                    href="/privacidad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Política de privacidad
                  </Link>
                </span>
              </label>

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full min-h-[48px] touch-manipulation"
                disabled={isSubmitting || isLimited || !termsAccepted}
                aria-label="Enviar mensaje de contacto"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                    Enviar mensaje
                  </>
                )}
              </Button>
            </form>
          </div>
        </SurfaceCard>
      </motion.div>

      {/* Direct contact info — single column. */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ y: -4 }}
        className="group"
      >
        <SurfaceCard className="h-full">
          <div className="p-6 md:p-8 flex flex-col gap-6 h-full">
            <CardHead
              icon={Mail}
              title="Contacto directo"
              description="Otros canales para hablar."
            />

            <div className="space-y-3">
              <ContactRow
                icon={Mail}
                label="Email"
                infoIcon={Clock}
                infoText="Respuesta en 24h"
              >
                {emailRevealed ? (
                  <p className="text-zinc-200 font-mono text-sm select-all break-all">
                    {deobfuscateEmail(obfuscatedEmail)}
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={onRevealEmail}
                    className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                    Revelar email
                  </button>
                )}
              </ContactRow>

              <ContactRow
                icon={Phone}
                label="Teléfono"
                infoIcon={Clock}
                infoText="Lun–Vie 9–18h"
              >
                {phoneRevealed ? (
                  <p className="text-zinc-200 font-mono text-sm select-all">
                    {deobfuscatePhone(obfuscatedPhone)}
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={onRevealPhone}
                    className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                    Revelar teléfono
                  </button>
                )}
              </ContactRow>

              <ContactRow
                icon={MapPin}
                label="Ubicación"
                infoIcon={Globe}
                infoText="Remoto disponible"
              >
                <p className="text-zinc-200 text-sm">Medellín, CO</p>
              </ContactRow>
            </div>

            <div className="mt-auto pt-5 border-t border-zinc-800/60">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 font-medium mb-3">
                Redes sociales
              </p>
              <div className="grid grid-cols-2 gap-2">
                <SocialLink
                  href="https://github.com/carrilloapps"
                  label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </SocialLink>
                <SocialLink
                  href="https://linkedin.com/in/carrilloapps"
                  label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </SocialLink>
                <SocialLink
                  href="https://x.com/carrilloapps"
                  label="X / Twitter"
                >
                  <XIcon className="w-4 h-4" />
                </SocialLink>
                <SocialLink
                  href="https://carrilloapps.substack.com/"
                  label="Substack"
                >
                  <Substack className="w-4 h-4" />
                </SocialLink>
              </div>
            </div>
          </div>
        </SurfaceCard>
      </motion.div>
    </div>
  );
}

function CardHead({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-blue-400" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-white leading-tight">
          {title}
        </h3>
        <p className="text-sm text-zinc-400 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  optional = false,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-zinc-300 flex items-center gap-2">
        {label}
        {optional && (
          <span className="text-[11px] font-normal text-zinc-500 uppercase tracking-wide">
            opcional
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  infoIcon: InfoIcon,
  infoText,
  children,
}: {
  icon: LucideIcon;
  label: string;
  infoIcon?: LucideIcon;
  infoText?: string;
  children: ReactNode;
}) {
  return (
    <div className="surface-card-subtle flex items-start gap-3 p-3">
      <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
        <Icon className="h-4 w-4 text-blue-400" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <p className="text-[11px] uppercase tracking-[0.14em] text-zinc-500 font-medium">
          {label}
        </p>
        {children}
        {infoText && (
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            {InfoIcon && <InfoIcon className="w-3 h-3" aria-hidden="true" />}
            <span>{infoText}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="surface-card-subtle flex flex-col items-center justify-center gap-1.5 p-3 text-zinc-400 hover:text-blue-300"
      aria-label={`Visitar mi perfil de ${label} (se abre en nueva ventana)`}
    >
      {children}
      <span className="text-[11px] font-medium">{label}</span>
    </motion.a>
  );
}
