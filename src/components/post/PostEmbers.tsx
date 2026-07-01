'use client'

import { useEffect, useState } from 'react'

interface Ember {
  id: number
  left: string
  animationDelay: string
  animationDuration: string
}

export function PostEmbers() {
  const [embers, setEmbers] = useState<Ember[]>([])

  useEffect(() => {
    // Generate random values only on the client
    const generated = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${6 + Math.random() * 6}s`,
    }))
    setEmbers(generated)
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {embers.map((ember) => (
        <div
          key={ember.id}
          className="ember"
          style={{
            left: ember.left,
            animationDelay: ember.animationDelay,
            animationDuration: ember.animationDuration,
          }}
          suppressHydrationWarning
        />
      ))}
    </div>
  )
}