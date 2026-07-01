'use client'

import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'

export function CategoryEmptyToast() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const lastCategoryRef = useRef<string | null>(null)

  useEffect(() => {
    // Only trigger if a category is selected and it's not 'All'
    if (category && category !== 'All') {
      // Prevent duplicate toasts for the same category
      if (lastCategoryRef.current === category) return
      lastCategoryRef.current = category

      // Show the toast once
      toast.error(`No posts found under "${category}".`, {
        icon: '🧐',
      })
    } else {
      // Reset ref when switching to 'All' or clearing filter
      lastCategoryRef.current = null
    }
  }, [category])

  return null
}