'use client'

import { useEffect, useState } from 'react'

export function KeywordPulse({ keywords }: { keywords: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (keywords.length === 0) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % keywords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [keywords])

  if (keywords.length === 0) return null

  return (
    <div className="text-sm font-medium text-theme-text text-center">
      <span className="transition-opacity duration-300" key={keywords[index]}>
        {keywords[index]}
      </span>
    </div>
  )
}