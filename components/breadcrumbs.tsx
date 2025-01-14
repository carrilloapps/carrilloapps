'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function Breadcrumbs() {
  const pathname = usePathname()

  // If pathname is undefined or we're on the home page or in the docs section, don't render breadcrumbs
  if (!pathname || pathname === '/' || pathname.startsWith('/mi')) {
    return null
  }

  const pathSegments = pathname.split('/').filter(segment => segment !== '')

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`
    return {
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href
    }
  })

  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <Home className="w-4 h-4 mr-2" />
            Inicio
          </Link>
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={item.href}>
            <div className="flex items-center">
              <ChevronRight className="w-6 h-6 text-gray-400" />
              <Link
                href={item.href}
                className={`ml-1 text-sm font-medium ${
                  index === breadcrumbItems.length - 1
                    ? 'text-gray-500 dark:text-gray-400'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'
                }`}
                aria-current={index === breadcrumbItems.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

