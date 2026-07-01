'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 group p-[3px] rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      style={{
        background: 'linear-gradient(90deg, #4A90D9, #E8A020, #5CB85C, #D9534F, #4A90D9)',
        backgroundSize: '300% 300%',
        animation: 'ps-gradient-move 3s ease infinite',
      }}
      aria-label="Scroll to top"
    >
      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-dark-surface/90 backdrop-blur-md transition-colors duration-300 group-hover:bg-dark-surface">
        <ArrowUp
          size={20}
          className="text-dark-text group-hover:text-orange transition-colors duration-300"
        />
      </span>
    </button>
  )
}