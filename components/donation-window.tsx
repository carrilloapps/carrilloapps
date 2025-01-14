'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from 'lucide-react'

export function DonationWindow() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 z-50"
        onClick={() => setIsOpen(true)}
      >
        Donar
      </Button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>¿Apoyas mi trabajo?</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Puedes donar desde una taza de café para continuar haciéndolo, ofreciéndolo gratuitamente.</p>
              <div className="space-y-4">
                <Input type="number" placeholder="Monto" min="1" step="1" />
                <Button className="w-full">Apoyarte donando</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

