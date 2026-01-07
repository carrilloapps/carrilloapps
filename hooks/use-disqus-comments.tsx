"use client"

import { useState, useEffect } from "react"
import { publicEnv } from "@/lib/env"

interface DisqusCommentsData {
  count: number
  isLoading: boolean
  error: string | null
}

interface DisqusReactionsData {
  reactions: number
  hasReacted: boolean
  toggleReaction: () => void
  isLoading: boolean
  error: string | null
}

export function useDisqusComments(identifier: string): DisqusCommentsData {
  const [count, setCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!identifier || !publicEnv.DISQUS_SHORTNAME) {
      setTimeout(() => {
        setIsLoading(false)
        setError("Missing Disqus configuration")
      }, 0)
      return
    }

    let isMounted = true

    const loadCountScript = () => {
      if (document.querySelector('script[src*="count.js"]')) {
        return Promise.resolve()
      }

      return new Promise<void>((resolve, reject) => {
        const script = document.createElement("script")
        script.src = `https://${publicEnv.DISQUS_SHORTNAME}.disqus.com/count.js`
        script.id = "dsq-count-scr"
        script.async = true
        
        script.onload = () => resolve()
        script.onerror = () => reject(new Error("Failed to load Disqus count script"))
        
        document.body.appendChild(script)
      })
    }

    const fetchCommentCount = async () => {
      try {
        setIsLoading(true)
        setError(null)

        await loadCountScript()

        const tempElement = document.createElement("span")
        tempElement.className = "disqus-comment-count"
        tempElement.setAttribute("data-disqus-identifier", identifier)
        tempElement.style.display = "none"
        document.body.appendChild(tempElement)

        setTimeout(() => {
          if (!isMounted) return

          const countText = tempElement.textContent || "0"
          const countMatch = countText.match(/\d+/)
          const commentCount = countMatch ? parseInt(countMatch[0], 10) : 0

          setCount(commentCount)
          setIsLoading(false)

          document.body.removeChild(tempElement)
        }, 2000)

      } catch (err) {
        if (!isMounted) return
        
        setTimeout(() => {
          setError(err instanceof Error ? err.message : "Failed to fetch comment count")
          setIsLoading(false)
        }, 0)
      }
    }

    fetchCommentCount()

    return () => {
      isMounted = false
    }
  }, [identifier])

  return { count, isLoading, error }
}

export function useDisqusReactions(identifier: string): DisqusReactionsData {
  const [reactions, setReactions] = useState<number>(0)
  const [hasReacted, setHasReacted] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!identifier) {
      setTimeout(() => setIsLoading(false), 0)
      return
    }

    const storageKey = `disqus_reaction_${identifier}`
    const hasUserReacted = localStorage.getItem(storageKey) === 'true'
    
    const reactionsKey = `disqus_reactions_count_${identifier}`
    const storedReactions = localStorage.getItem(reactionsKey)
    const initialReactions = storedReactions ? parseInt(storedReactions, 10) : 0
    
    setTimeout(() => {
      setHasReacted(hasUserReacted)
      setReactions(initialReactions)
      setIsLoading(false)
    }, 0)
  }, [identifier])

  const toggleReaction = () => {
    const storageKey = `disqus_reaction_${identifier}`
    const reactionsKey = `disqus_reactions_count_${identifier}`
    
    if (hasReacted) {
      localStorage.removeItem(storageKey)
      const newCount = Math.max(0, reactions - 1)
      setReactions(newCount)
      localStorage.setItem(reactionsKey, newCount.toString())
      setHasReacted(false)
    } else {
      localStorage.setItem(storageKey, 'true')
      const newCount = reactions + 1
      setReactions(newCount)
      localStorage.setItem(reactionsKey, newCount.toString())
      setHasReacted(true)
    }
  }

  return { reactions, isLoading, error: null, hasReacted, toggleReaction }
}

export function useDisqusSaves(identifier: string): DisqusReactionsData & { 
  hasSaved: boolean
  toggleSave: () => void 
} {
  const [saves, setSaves] = useState<number>(0)
  const [hasSaved, setHasSaved] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!identifier) {
      setTimeout(() => setIsLoading(false), 0)
      return
    }

    const storageKey = `disqus_save_${identifier}`
    const hasUserSaved = localStorage.getItem(storageKey) === 'true'
    
    const savesKey = `disqus_saves_count_${identifier}`
    const storedSaves = localStorage.getItem(savesKey)
    const initialSaves = storedSaves ? parseInt(storedSaves, 10) : 0
    
    setTimeout(() => {
      setHasSaved(hasUserSaved)
      setSaves(initialSaves)
      setIsLoading(false)
    }, 0)
  }, [identifier])

  const toggleSave = () => {
    const storageKey = `disqus_save_${identifier}`
    const savesKey = `disqus_saves_count_${identifier}`
    
    if (hasSaved) {
      localStorage.removeItem(storageKey)
      const newCount = Math.max(0, saves - 1)
      setSaves(newCount)
      localStorage.setItem(savesKey, newCount.toString())
      setHasSaved(false)
    } else {
      localStorage.setItem(storageKey, 'true')
      const newCount = saves + 1
      setSaves(newCount)
      localStorage.setItem(savesKey, newCount.toString())
      setHasSaved(true)
    }
  }

  return { reactions: saves, isLoading, error: null, hasSaved, hasReacted: hasSaved, toggleReaction: toggleSave, toggleSave }
}
