'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function RouteLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 600) // matches typical page transition time
    return () => clearTimeout(timeout)
  }, [pathname, searchParams])

  if (!loading) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark-bg"
      style={{ animation: 'glitch-flicker 1.5s ease-in-out infinite' }}
    >
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-4 border-dark-surface border-t-orange animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF6B00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="6" y1="7" x2="10" y2="7" />
            <line x1="8" y1="5" x2="8" y2="9" />
            <line x1="15" y1="7" x2="15.01" y2="7" />
            <line x1="18" y1="5" x2="18.01" y2="5" />
            <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
          </svg>
        </div>
      </div>
    </div>
  )
}