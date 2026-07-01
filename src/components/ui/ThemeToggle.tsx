'use client'

import { Moon, Sun } from 'lucide-react'
import { useTGNStore } from '@/store/useTGNStore'

export function ThemeToggle() {
  const theme = useTGNStore((state) => state.theme)
  const toggleTheme = useTGNStore((state) => state.toggleTheme)

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors hover:bg-theme-surface text-theme-text"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}