'use client'

import Link from 'next/link'
import { useTheme } from '@/providers/theme-provider'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center gap-0.5">
            <span className="ml-3 text-2xl font-semibold">carrillo</span>
            <div className="flex flex-row items-center gap-0.5">
              <div className="rounded-full mt-1 h-4 w-4 bg-primary" />
              <span className="text-2xl font-semibold">app</span>
            </div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-foreground/80">Inicio</Link>
          <Link href="/conoceme" className="transition-colors hover:text-foreground/80">Conóceme</Link>
          <Link href="/blog" className="transition-colors hover:text-foreground/80">Blog</Link>
          <Link href="/recursos" className="transition-colors hover:text-foreground/80">Recursos</Link>
          <Link href="/soporte" className="transition-colors hover:text-foreground/80">Soporte</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4 text-white" />}
          </Button>
          <Button asChild>
            <Link href="/get-started">Solicitar asesoría</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

