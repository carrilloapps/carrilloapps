"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      // Aquí irá tu lógica para manejar la suscripción
      // Por ejemplo, llamar a tu API o servicio de newsletter
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulación
      setStatus("success")
      setEmail("")
    } catch (error) {
      setStatus("error")
    }
  }

  return (
    <div className="rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-8 shadow-lg">
      <div className="flex flex-col items-center text-center space-y-4 mb-6">
        <div className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center">
          <Mail className="h-6 w-6 text-blue-500" />
        </div>
        <h3 className="text-2xl font-bold">Suscríbete al Newsletter</h3>
        <p className="text-zinc-400 max-w-md">
          Recibe las últimas actualizaciones sobre desarrollo, fintech y liderazgo técnico directamente en tu inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <Input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-zinc-800/50 border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
          />
          <Button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Suscribiendo..." : "Suscribirse"}
          </Button>
        </div>
        
        {status === "success" && (
          <p className="text-green-500 text-sm text-center">
            ¡Gracias por suscribirte! Por favor revisa tu email para confirmar.
          </p>
        )}
        
        {status === "error" && (
          <p className="text-red-500 text-sm text-center">
            Hubo un error. Por favor intenta nuevamente.
          </p>
        )}
      </form>
    </div>
  )
}