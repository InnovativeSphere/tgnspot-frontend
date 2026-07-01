'use client'

import { useTGNStore } from '@/store/useTGNStore'
import { useEffect } from 'react'

export function ThemeWatcher() {
  const theme = useTGNStore((state) => state.theme)

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('data-theme', theme)
    html.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return null
}