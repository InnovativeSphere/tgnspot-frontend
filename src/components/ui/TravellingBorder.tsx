'use client'

import { useEffect, useRef, useState } from 'react'

export function TravellingBorder() {
  const svgRef = useRef<SVGSVGElement>(null)
  const rectRef = useRef<SVGRectElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Measure the parent container size and set rect dimensions
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const parent = svg.parentElement
    if (!parent) return

    const updateSize = () => {
      const rect = parent.getBoundingClientRect()
      setDimensions({ width: rect.width, height: rect.height })
    }

    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(parent)
    return () => observer.disconnect()
  }, [])

  // Once dimensions are set, measure the path length
  useEffect(() => {
    const rect = rectRef.current
    if (!rect || dimensions.width === 0) return

    // Force layout
    rect.setAttribute('width', String(dimensions.width - 4))
    rect.setAttribute('height', String(dimensions.height - 4))

    const length = rect.getTotalLength()
    if (length > 0) {
      rect.style.setProperty('--path-length', String(length))
    }
  }, [dimensions])

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ps-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4A90D9" />
          <stop offset="25%" stopColor="#E8A020" />
          <stop offset="50%" stopColor="#5CB85C" />
          <stop offset="75%" stopColor="#D9534F" />
          <stop offset="100%" stopColor="#4A90D9" />
        </linearGradient>
      </defs>

      {/* Static white/cream border */}
      <rect
        x="2"
        y="2"
        width={dimensions.width - 4 || 0}
        height={dimensions.height - 4 || 0}
        rx="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="text-white/10 cream:text-black/10"
      />

      {/* Animated PS electricity line */}
      <rect
        ref={rectRef}
        x="2"
        y="2"
        rx="16"
        fill="none"
        stroke="url(#ps-grad)"
        strokeWidth="3"
        strokeDasharray="var(--path-length, 1000)"
        strokeDashoffset="var(--path-length, 1000)"
        style={{
          animation: 'ps-border-travel 6s ease-in-out infinite',
        }}
      />
    </svg>
  )
}