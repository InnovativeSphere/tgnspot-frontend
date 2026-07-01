'use client'

import { useEffect } from 'react'
import { useTGNStore } from '@/store/useTGNStore'
import { EyeOff } from 'lucide-react'

export function DeadSilenceToggle() {
  const { deadSilence, toggleDeadSilence } = useTGNStore()

  useEffect(() => {
    document.body.classList.toggle('dead-silence-active', deadSilence)
    return () => document.body.classList.remove('dead-silence-active')
  }, [deadSilence])

  return (
    <button
      onClick={toggleDeadSilence}
      className="fixed top-20 right-4 z-50 rounded-full bg-theme-surface/80 p-2 backdrop-blur-sm text-theme-muted hover:text-orange transition-colors"
      aria-label="Toggle Dead Silence mode"
    >
      <EyeOff size={20} />
    </button>
  )
}