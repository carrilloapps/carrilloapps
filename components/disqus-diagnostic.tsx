"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, Copy, ExternalLink } from "lucide-react"
import { publicEnv, getSiteUrl, vercelEnv } from "@/lib/env"

interface DiagnosticResult {
  name: string
  status: 'success' | 'error' | 'warning'
  message: string
  details?: string
}

export function DisqusDiagnostic() {
  const pathname = usePathname()
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runDiagnostics = async () => {
    setIsRunning(true)
    const results: DiagnosticResult[] = []

    // Check environment variables
    results.push({
      name: "NEXT_PUBLIC_DISQUS_SHORTNAME",
      status: publicEnv.DISQUS_SHORTNAME ? 'success' : 'error',
      message: publicEnv.DISQUS_SHORTNAME 
        ? `Configurado: ${publicEnv.DISQUS_SHORTNAME}` 
        : "No configurado",
      details: publicEnv.DISQUS_SHORTNAME 
        ? undefined 
        : "Esta variable es requerida para que Disqus funcione"
    })

    // Check site URL
    const siteUrl = getSiteUrl()
    results.push({
      name: "Site URL",
      status: siteUrl.includes('localhost') ? 'warning' : 'success',
      message: `URL actual: ${siteUrl}`,
      details: siteUrl.includes('localhost') 
        ? "Usando localhost - asegúrate de que esté en dominios confiables de Disqus"
        : "URL de producción detectada"
    })

    // Check Vercel environment
    if (vercelEnv.IS_VERCEL) {
      results.push({
        name: "Entorno Vercel",
        status: 'success',
        message: `Ejecutándose en Vercel (${vercelEnv.VERCEL_ENV})`,
        details: `URL de Vercel: ${vercelEnv.VERCEL_URL || 'No disponible'}`
      })
    } else {
      results.push({
        name: "Entorno Local",
        status: 'warning',
        message: "Ejecutándose en desarrollo local",
        details: "Asegúrate de que localhost esté en dominios confiables de Disqus"
      })
    }

    // Check if Disqus script can be loaded
    try {
      const response = await fetch(`https://${publicEnv.DISQUS_SHORTNAME}.disqus.com/embed.js`, {
        method: 'HEAD',
        mode: 'no-cors'
      })
      results.push({
        name: "Script de Disqus",
        status: 'success',
        message: "Script de Disqus accesible",
        details: `URL: https://${publicEnv.DISQUS_SHORTNAME}.disqus.com/embed.js`
      })
    } catch (error) {
      results.push({
        name: "Script de Disqus",
        status: 'error',
        message: "No se puede acceder al script de Disqus",
        details: `Verifica que el shortname '${publicEnv.DISQUS_SHORTNAME}' sea correcto`
      })
    }

    // Check current page configuration
    const currentUrl = `${siteUrl}${pathname}`
    results.push({
      name: "Configuración de página",
      status: 'success',
      message: "Configuración generada",
      details: `URL: ${currentUrl}\nIdentifier: ${pathname}`
    })

    setDiagnostics(results)
    setIsRunning(false)
  }

  useEffect(() => {
    runDiagnostics()
  }, [pathname])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusIcon = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />
    }
  }

  const getStatusColor = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-900/20 border-green-700/30 text-green-100'
      case 'error':
        return 'bg-red-900/20 border-red-700/30 text-red-100'
      case 'warning':
        return 'bg-yellow-900/20 border-yellow-700/30 text-yellow-100'
    }
  }

  return (
    <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Diagnóstico de Disqus
          </CardTitle>
          <Button 
            onClick={runDiagnostics} 
            disabled={isRunning}
            size="sm"
            variant="outline"
          >
            {isRunning ? 'Ejecutando...' : 'Ejecutar diagnóstico'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {diagnostics.map((result, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border ${getStatusColor(result.status)}`}
          >
            <div className="flex items-start gap-3">
              {getStatusIcon(result.status)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{result.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {result.status}
                  </Badge>
                </div>
                <p className="text-sm opacity-90 mb-2">{result.message}</p>
                {result.details && (
                  <div className="bg-black/20 p-2 rounded text-xs font-mono whitespace-pre-wrap">
                    {result.details}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
          <h3 className="font-semibold text-blue-100 mb-2">Configuración recomendada para Vercel</h3>
          <div className="space-y-2 text-sm text-blue-200">
            <div className="flex items-center justify-between">
              <span>NEXT_PUBLIC_DISQUS_SHORTNAME:</span>
              <div className="flex items-center gap-2">
                <code className="bg-blue-900/30 px-2 py-1 rounded">{publicEnv.DISQUS_SHORTNAME}</code>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => copyToClipboard(publicEnv.DISQUS_SHORTNAME)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>NEXT_PUBLIC_SITE_URL:</span>
              <div className="flex items-center gap-2">
                <code className="bg-blue-900/30 px-2 py-1 rounded">{getSiteUrl()}</code>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => copyToClipboard(getSiteUrl())}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-blue-700/30">
            <p className="text-xs text-blue-300 mb-2">
              Pasos para configurar en Vercel:
            </p>
            <ol className="text-xs text-blue-200 space-y-1 list-decimal list-inside">
              <li>Ve a tu proyecto en Vercel Dashboard</li>
              <li>Settings → Environment Variables</li>
              <li>Agrega las variables mostradas arriba</li>
              <li>Configura diferentes valores para Development/Preview/Production</li>
              <li>Redeploy tu aplicación</li>
            </ol>
            
            <div className="mt-3 flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('https://vercel.com/dashboard', '_blank')}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Vercel Dashboard
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open(`https://${publicEnv.DISQUS_SHORTNAME}.disqus.com/admin/settings/general/`, '_blank')}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Disqus Settings
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}