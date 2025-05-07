"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Code, Github } from "lucide-react"

interface ProjectDialogProps {
  title: string
  description: string
  fullDescription: string
  technologies: string[]
  imageEmoji: string
  year: string
  demoUrl?: string
  repoUrl?: string
  children: React.ReactNode
  type?: string
}

export function ProjectDialog({
  title,
  description,
  fullDescription,
  technologies,
  imageEmoji,
  year,
  demoUrl,
  repoUrl,
  children,
  type,
}: ProjectDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-800 sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="text-4xl">{imageEmoji}</div>
            <DialogTitle className="text-xl sm:text-2xl">{title}</DialogTitle>
          </div>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Descripción</h3>
            <p className="text-zinc-400">{fullDescription}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Tecnologías</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="border-zinc-700 text-zinc-400">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Detalles</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-500">Año</p>
                <p className="text-zinc-300">{year}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Tipo</p>
                <p className="text-zinc-300">{type}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {demoUrl && (
              <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" asChild>
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ir al sitio
                </a>
              </Button>
            )}
            {repoUrl && (
              <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 w-full sm:w-auto" asChild>
                <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Ver código
                </a>
              </Button>
            )}
            <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 w-full sm:w-auto" asChild>
              <a href="#contact">
                <Code className="mr-2 h-4 w-4" />
                Consultar
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
