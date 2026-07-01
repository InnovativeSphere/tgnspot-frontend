'use client'

import { useState, useEffect, useRef } from 'react'
import { Gamepad2 } from 'lucide-react'
import { useTGNStore } from '@/store/useTGNStore'

export function PulsePanel({ keywords }: { keywords: string[] }) {
  const { pulseOpen, togglePulse } = useTGNStore()
  const [index, setIndex] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!pulseOpen) return
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        togglePulse()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [pulseOpen, togglePulse])

  // Cycle through keywords
  useEffect(() => {
    if (!pulseOpen || keywords.length === 0) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % keywords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [pulseOpen, keywords])

  if (keywords.length === 0) return null

  return (
    <div className="relative flex justify-end" ref={panelRef}>
      {/* Toggle button */}
      <button
        onClick={togglePulse}
        className="relative z-10 p-2 rounded-full bg-dark-surface cream:bg-cream-surface border border-dark-border cream:border-cream-border text-dark-muted cream:text-cream-muted hover:text-orange transition-colors"
        title="Pulse"
      >
        <Gamepad2 size={20} />
        {/* Subtle pulse indicator */}
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-orange animate-pulse" />
      </button>

      {/* Expandable drawer */}
      <div
        className={`
          absolute right-0 top-12 w-56
          bg-dark-surface cream:bg-cream-surface
          border border-dark-border cream:border-cream-border
          rounded-lg shadow-lg shadow-black/20
          p-4
          transform origin-top-right
          transition-all duration-300 ease-out
          ${
            pulseOpen
              ? 'scale-100 opacity-100'
              : 'scale-95 opacity-0 pointer-events-none'
          }
        `}
      >
        <h4 className="text-xs font-semibold text-dark-muted cream:text-cream-muted uppercase tracking-wider mb-3">
          What's Buzzing
        </h4>
        <div className="relative h-8 overflow-hidden">
          <span
            className="absolute inset-0 flex items-center text-sm font-medium text-dark-text cream:text-cream-text"
            key={keywords[index]}
          >
            {keywords[index]}
          </span>
        </div>
      </div>
    </div>
  )
}