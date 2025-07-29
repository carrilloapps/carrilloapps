"use client"

import { useState, useEffect } from "react"
import { publicEnv } from "@/lib/env"

interface DisqusCommentsData {
  count: number
  isLoading: boolean
  error: string | null
}

interface DisqusThread {
  id: string
  posts: number
  identifiers: string[]
}

interface DisqusApiResponse {
  response: DisqusThread[]
}

/**
 * Hook to fetch comment count from Disqus API
 * Uses multiple methods to get the most accurate count
 */
export function useDisqusComments(identifier: string): DisqusCommentsData {
  const [count, setCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!identifier || !publicEnv.DISQUS_SHORTNAME) {
      setIsLoading(false)
      setError("Missing Disqus configuration")
      return
    }

    let isMounted = true
    let countFound = false

    const fetchCommentCount = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Method 1: Check if Disqus is already loaded and has the count
        if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
          // Wait a bit for Disqus to load the count
          setTimeout(() => {
            if (!isMounted || countFound) return
            
            const threadElement = document.getElementById('disqus_thread')
            if (threadElement) {
              // Try to get count from Disqus thread data
              const disqusData = (window as any).DISQUS?.page
              if (disqusData && disqusData.identifier === identifier) {
                // This is a fallback - Disqus doesn't expose count directly
                // We'll rely on the count script method
              }
            }
          }, 1000)
        }

        // Method 2: Use Disqus count.js script (most reliable for public sites)
        await loadDisqusCountScript()
        
        // Method 3: Check for existing count elements
        const checkExistingCount = () => {
          if (!isMounted || countFound) return
          
          // Look for existing count elements
          const countSelectors = [
            `[data-disqus-identifier="${identifier}"]`,
            `.disqus-comment-count[data-disqus-identifier="${identifier}"]`,
            `a[href*="${identifier}"].disqus-comment-count`
          ]
          
          for (const selector of countSelectors) {
            const countElement = document.querySelector(selector)
            if (countElement && countElement.textContent) {
              const countText = countElement.textContent
              const countMatch = countText.match(/(\d+)/)
              if (countMatch) {
                const parsedCount = parseInt(countMatch[1], 10)
                setCount(parsedCount)
                setIsLoading(false)
                countFound = true
                return
              }
            }
          }
        }

        // Check immediately
        checkExistingCount()

        // If not found, create a temporary element and wait for Disqus to populate it
        if (!countFound && isMounted) {
          const tempElement = document.createElement("a")
          tempElement.className = "disqus-comment-count"
          tempElement.setAttribute("data-disqus-identifier", identifier)
          tempElement.setAttribute("href", `#disqus_thread`)
          tempElement.style.display = "none"
          tempElement.textContent = "0 Comments" // Default text
          document.body.appendChild(tempElement)
          
          // Wait for Disqus count script to process
          const checkCount = () => {
            if (!isMounted || countFound) return
            
            const countText = tempElement.textContent || "0"
            const countMatch = countText.match(/(\d+)/)
            const parsedCount = countMatch ? parseInt(countMatch[1], 10) : 0
            
            if (parsedCount > 0 || countText.toLowerCase().includes('comment')) {
              setCount(parsedCount)
              countFound = true
            }
            
            setIsLoading(false)
            
            // Clean up
            if (document.body.contains(tempElement)) {
              document.body.removeChild(tempElement)
            }
          }

          // Check multiple times as Disqus can be slow
          setTimeout(checkCount, 1000)
          setTimeout(checkCount, 2000)
          setTimeout(checkCount, 3000)
        }

        // Fallback: if still loading after 4 seconds, stop loading
        setTimeout(() => {
          if (isMounted && !countFound) {
            setIsLoading(false)
          }
        }, 4000)

      } catch (err) {
        if (isMounted) {
          console.warn("Error fetching Disqus comment count:", err)
          setError(err instanceof Error ? err.message : "Failed to fetch comment count")
          setIsLoading(false)
        }
      }
    }

    fetchCommentCount()

    return () => {
      isMounted = false
    }
  }, [identifier])

  return { count, isLoading, error }
}

/**
 * Load Disqus count script if not already loaded
 */
function loadDisqusCountScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="count.js"]')
    if (existingScript) {
      resolve()
      return
    }

    if (!publicEnv.DISQUS_SHORTNAME) {
      reject(new Error("Disqus shortname not configured"))
      return
    }

    const script = document.createElement("script")
    script.src = `https://${publicEnv.DISQUS_SHORTNAME}.disqus.com/count.js`
    script.async = true
    script.id = "dsq-count-scr"

    script.onload = () => {
      // Trigger count update
      if (window.DISQUSWIDGETS && typeof window.DISQUSWIDGETS.getCount === 'function') {
        window.DISQUSWIDGETS.getCount({ reset: true })
      }
      resolve()
    }
    
    script.onerror = () => {
      console.warn("Failed to load Disqus count script")
      resolve() // Don't reject, just continue without count script
    }

    document.body.appendChild(script)
  })
}

/**
 * Hook specifically for getting comment count with simpler interface
 */
export function useCommentCount(identifier: string): number {
  const { count } = useDisqusComments(identifier)
  return count
}