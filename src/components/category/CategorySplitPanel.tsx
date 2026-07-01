'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const PS_COLORS = ['#4A90D9', '#E8A020', '#5CB85C', '#D9534F']

interface CategoryData {
  hero_image_url: string
  verdicts: string[]
}

interface CategorySplitPanelProps {
  categoryData: Record<string, CategoryData>
  categories: string[]
}

export function CategorySplitPanel({ categoryData, categories }: CategorySplitPanelProps) {
  const router = useRouter()

  const [categoryIndex, setCategoryIndex] = useState(0)
  const [phase, setPhase] = useState<'left-grey' | 'right-grey' | 'color'>('left-grey')
  const [verdict, setVerdict] = useState<string | null>(null)

  const currentCategory = categories[categoryIndex % categories.length]
  const currentData = categoryData[currentCategory]

  // Update verdict when category changes
  useEffect(() => {
    if (currentData?.verdicts?.length > 0) {
      setVerdict(currentData.verdicts[Math.floor(Math.random() * currentData.verdicts.length)])
    } else {
      setVerdict(null)
    }
  }, [currentCategory, currentData])

  // 15‑second loop: 5s left grey → 5s right grey → 5s full color
  useEffect(() => {
    const phases: Array<'left-grey' | 'right-grey' | 'color'> = ['left-grey', 'right-grey', 'color']
    let currentPhaseIndex = 0

    const interval = setInterval(() => {
      currentPhaseIndex = (currentPhaseIndex + 1) % phases.length
      setPhase(phases[currentPhaseIndex])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Advance category every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCategoryIndex((prev) => prev + 1)
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  const handleClick = useCallback(() => {
    router.push(`/?category=${encodeURIComponent(currentCategory)}`)
  }, [router, currentCategory])

  if (!currentData) return null

  const leftGrey = phase === 'left-grey'
  const rightGrey = phase === 'right-grey'
  const glowColor = PS_COLORS[categoryIndex % PS_COLORS.length]

  return (
    <div className="relative w-full h-screen overflow-hidden bg-dark-bg cursor-pointer" onClick={handleClick}>
      {/* Full‑screen image */}
      <Image
        src={currentData.hero_image_url || '/fallback.jpg'}
        alt={currentCategory}
        fill
        className="object-cover"
        priority
      />

      {/* Left half overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          clipPath: 'polygon(0 0, 58% 0, 48% 100%, 0 100%)',
          backdropFilter: leftGrey ? 'grayscale(100%)' : 'none',
          WebkitBackdropFilter: leftGrey ? 'grayscale(100%)' : 'none',
          transition: 'backdrop-filter 0.7s ease, box-shadow 0.7s ease',
          boxShadow: leftGrey ? 'none' : `inset 0 0 80px ${glowColor}30`,
        }}
      />

      {/* Right half overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          clipPath: 'polygon(58% 0, 100% 0, 100% 100%, 48% 100%)',
          backdropFilter: rightGrey ? 'grayscale(100%)' : 'none',
          WebkitBackdropFilter: rightGrey ? 'grayscale(100%)' : 'none',
          transition: 'backdrop-filter 0.7s ease, box-shadow 0.7s ease',
          boxShadow: rightGrey ? 'none' : `inset 0 0 80px ${glowColor}30`,
        }}
      />

      {/* Text block – above everything, with blur backdrop */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-center max-w-lg px-6 py-4 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
          {currentCategory}
        </h2>

        {verdict && (
          <p className="mt-2 text-sm md:text-base italic text-white/90 drop-shadow-md transition-opacity duration-500">
            “{verdict}”
          </p>
        )}
      </div>

      {/* PS gradient diagonal line */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ps-line" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A90D9" />
            <stop offset="33%" stopColor="#E8A020" />
            <stop offset="66%" stopColor="#5CB85C" />
            <stop offset="100%" stopColor="#D9534F" />
          </linearGradient>
        </defs>
        <line
          x1="58%"
          y1="0"
          x2="48%"
          y2="100%"
          stroke="url(#ps-line)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}