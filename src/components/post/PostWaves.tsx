'use client'

import { useEffect, useState } from 'react'

interface Wave {
  id: number
  top: string
  animationDuration: string
  animationDelay: string
}

export function PostWaves() {
  const [waves, setWaves] = useState<Wave[]>([])

  useEffect(() => {
    const generated = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      top: `${10 + Math.random() * 70}%`,
      animationDuration: `${10 + Math.random() * 15}s`,
      animationDelay: `${-Math.random() * 20}s`,
    }))
    setWaves(generated)
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {waves.map((wave) => (
        <div
          key={wave.id}
          className="absolute top-0 left-0 w-[200vw] h-0.5 opacity-30 blur-sm"
          style={{
            background: 'linear-gradient(90deg, transparent, #FF6B00 20%, #FF6B00 80%, transparent)',
            clipPath: 'polygon(0% 0%, 2% 20%, 4% 0%, 6% 20%, 8% 0%, 10% 20%, 12% 0%, 14% 20%, 16% 0%, 18% 20%, 20% 0%, 22% 20%, 24% 0%, 26% 20%, 28% 0%, 30% 20%, 32% 0%, 34% 20%, 36% 0%, 38% 20%, 40% 0%, 42% 20%, 44% 0%, 46% 20%, 48% 0%, 50% 20%, 52% 0%, 54% 20%, 56% 0%, 58% 20%, 60% 0%, 62% 20%, 64% 0%, 66% 20%, 68% 0%, 70% 20%, 72% 0%, 74% 20%, 76% 0%, 78% 20%, 80% 0%, 82% 20%, 84% 0%, 86% 20%, 88% 0%, 90% 20%, 92% 0%, 94% 20%, 96% 0%, 98% 20%, 100% 0%)',
            top: wave.top,
            animation: `wave-drift ${wave.animationDuration} linear infinite`,
            animationDelay: wave.animationDelay,
          }}
          suppressHydrationWarning
        />
      ))}
    </div>
  )
}