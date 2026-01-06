"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Mail, Phone, MapPin, Clock, Globe, Github, Linkedin } from "lucide-react";
import { ContactInfoCard } from "@/components/contact-info-card";
import { SocialLinkCard } from "@/components/social-link-card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// X (Twitter) Icon Component
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
  // Form data and handlers
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
    honeypot: string;
  };
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  isLimited: boolean;
  formRef: React.RefObject<HTMLFormElement | null>;
  
  // Contact info
  emailRevealed: boolean;
  phoneRevealed: boolean;
  onRevealEmail: () => void;
  onRevealPhone: () => void;
  obfuscatedEmail: string;
  obfuscatedPhone: string;
  deobfuscateEmail: (value: string) => string;
  deobfuscatePhone: (value: string) => string;
}

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
  return (
    <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {/* Compact Form - Takes 2 columns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="md:col-span-2"
      >
        <Card className="bg-zinc-900/90 border-zinc-800/50 backdrop-blur-sm relative overflow-hidden group h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <CardHeader className="relative z-10 pb-1 pt-2.5 px-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-blue-500/30">
                <Send className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-base bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                  Envíame un mensaje
                </CardTitle>
                <CardDescription className="text-zinc-400 text-xs mt-0.5">
                  Te responderé lo antes posible
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10 space-y-6 px-4 pb-4">
            <form ref={formRef} onSubmit={onSubmit} className="space-y-3">
              {/* Honeypot field */}
              <input
                type="text"
                name="website"
                value={formData.honeypot}
                onChange={(e) => onInputChange('honeypot', e.target.value)}
                style={{ 
                  position: 'absolute', 
                  left: '-9999px', 
                  width: '1px', 
                  height: '1px',
                  opacity: 0,
                  pointerEvents: 'none',
                  visibility: 'hidden'
                }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Nombre</label>
                  <Input
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => onInputChange('name', e.target.value)}
                    className="bg-zinc-800/50 border-zinc-700/50 focus:border-blue-500/50 transition-colors duration-300"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Email</label>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => onInputChange('email', e.target.value)}
                    className="bg-zinc-800/50 border-zinc-700/50 focus:border-blue-500/50 transition-colors duration-300"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Asunto</label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => onInputChange('subject', value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="bg-zinc-800/50 border-zinc-700/50 focus:border-blue-500/50 transition-colors duration-300">
                    <SelectValue placeholder="Selecciona un asunto" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="consulta-general">Consulta general</SelectItem>
                    <SelectItem value="proyecto-nuevo">Nuevo proyecto</SelectItem>
                    <SelectItem value="colaboracion">Colaboración</SelectItem>
                    <SelectItem value="consultoria">Consultoría</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Mensaje</label>
                <Textarea
                  placeholder="Cuéntame más sobre tu proyecto..."
                  value={formData.message}
                  onChange={(e) => onInputChange('message', e.target.value)}
                  className="bg-zinc-800/50 border-zinc-700/50 focus:border-blue-500/50 transition-colors duration-300 min-h-[120px]"
                  rows={4}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              {isLimited && (
                <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">
                    Has alcanzado el límite de envíos. Por favor, espera un momento antes de intentar nuevamente.
                  </p>
                </div>
              )}
              
              <motion.div
                whileHover={{ scale: isSubmitting || isLimited ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting || isLimited ? 1 : 0.98 }}
              >
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-300"
                  disabled={isSubmitting || isLimited}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar mensaje
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Compact Contact Info - Takes 1 column */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="space-y-3"
      >
        {/* Contact Info Card with integrated social */}
        <Card className="bg-zinc-900/90 border-zinc-800/50 backdrop-blur-sm relative overflow-hidden group h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <CardHeader className="relative z-10 pb-2 pt-4 px-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-600/20 to-blue-600/20 flex items-center justify-center border border-emerald-500/30">
                <Mail className="w-4 h-4 text-emerald-400" />
              </div>
              <CardTitle className="text-lg bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                Contacto
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10 space-y-2.5 px-4 pb-3">
            <ContactInfoCard
              icon={Mail}
              iconColor="text-blue-400"
              iconGradientFrom="from-blue-600/20"
              iconGradientTo="to-cyan-600/20"
              title="Email"
              obfuscatedValue={obfuscatedEmail}
              deobfuscateFn={deobfuscateEmail}
              isRevealed={emailRevealed}
              onReveal={onRevealEmail}
              revealButtonText="Revelar email"
              revealButtonColor="text-blue-400 hover:text-blue-300"
              infoText="Respuesta en 24h"
              infoIcon={Clock}
            />

            <Separator className="my-2 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            <ContactInfoCard
              icon={Phone}
              iconColor="text-emerald-400"
              iconGradientFrom="from-emerald-600/20"
              iconGradientTo="to-teal-600/20"
              title="Teléfono"
              obfuscatedValue={obfuscatedPhone}
              deobfuscateFn={deobfuscatePhone}
              isRevealed={phoneRevealed}
              onReveal={onRevealPhone}
              revealButtonText="Revelar teléfono"
              revealButtonColor="text-emerald-400 hover:text-emerald-300"
              infoText="Lun-Vie 9-18h"
              infoIcon={Clock}
            />

            <Separator className="my-2 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            <ContactInfoCard
              icon={MapPin}
              iconColor="text-purple-400"
              iconGradientFrom="from-purple-600/20"
              iconGradientTo="to-pink-600/20"
              title="Ubicación"
              location="Medellín, CO"
              locationInfo="Remoto disponible"
              infoIcon={Globe}
            />

            <Separator className="my-2 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            {/* Social Links - Integrated in same card */}
            <div className="pt-1">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-xs font-medium text-zinc-400">Redes sociales</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <motion.a
                  href="https://github.com/carrilloapps"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center p-2 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/50 transition-all duration-300 group/social border border-zinc-700/30 hover:border-purple-500/30"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center border border-purple-500/30 group-hover/social:scale-110 transition-transform duration-300 mb-1.5">
                    <Github className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-xs font-medium text-zinc-300 group-hover/social:text-white transition-colors duration-300">GitHub</span>
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/carrilloapps"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center p-2 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/50 transition-all duration-300 group/social border border-zinc-700/30 hover:border-blue-500/30"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 flex items-center justify-center border border-blue-500/30 group-hover/social:scale-110 transition-transform duration-300 mb-1.5">
                    <Linkedin className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-xs font-medium text-zinc-300 group-hover/social:text-white transition-colors duration-300">LinkedIn</span>
                </motion.a>
                <motion.a
                  href="https://x.com/carrilloapps"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center p-2 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/50 transition-all duration-300 group/social border border-zinc-700/30 hover:border-cyan-500/30"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-600/20 to-teal-600/20 flex items-center justify-center border border-cyan-500/30 group-hover/social:scale-110 transition-transform duration-300 mb-1.5">
                    <XIcon className="h-4 w-4 text-cyan-400" />
                  </div>
                  <span className="text-xs font-medium text-zinc-300 group-hover/social:text-white transition-colors duration-300">X (Twitter)</span>
                </motion.a>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

