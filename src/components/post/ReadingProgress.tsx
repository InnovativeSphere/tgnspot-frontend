'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const article = document.getElementById('post-body')
      if (!article) return
      const { top, height } = article.getBoundingClientRect()
      const scrolled = Math.min(Math.max(-top / (height - window.innerHeight), 0), 1)
      setWidth(scrolled * 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 z-50 h-0.5 w-full bg-dark-border">
      <div
        className="h-full bg-orange transition-all duration-150 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  )
}