'use client'

import { useRef, useEffect, useState } from 'react'
import { PostCard } from './PostCard'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const PS_COLORS = ['#4A90D9', '#E8A020', '#5CB85C', '#D9534F']

interface PostGridProps {
  posts: {
    id: number
    slug: string
    title: string
    subtitle: string
    excerpt: string
    hero_image_url: string
    category: string[]          // ← changed to array
    readTime: string
    mood_primary: string
    mood_secondary?: string
  }[]
}

export function PostGrid({ posts }: PostGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(gridRef, { threshold: 0.3 })
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const validPosts = posts.filter((p) => p.slug && p.slug.trim().length > 0)
  const totalCards = Math.min(validPosts.length, 4)

  const clearTimers = () => {
    if (delayRef.current) clearTimeout(delayRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    if (!isVisible) {
      setActiveCardIndex(null)
      setHasStarted(false)
      clearTimers()
      return
    }

    if (!hasStarted && totalCards > 0) {
      delayRef.current = setTimeout(() => {
        setHasStarted(true)
        setActiveCardIndex(0)

        if (totalCards > 1) {
          let index = 0
          intervalRef.current = setInterval(() => {
            index = (index + 1) % totalCards
            setActiveCardIndex(index)
          }, 4000) // hold each card’s glow for 4s
        }
      }, 2000) // 2‑second delay before waking
    }
  }, [isVisible, hasStarted, totalCards])

  useEffect(() => {
    return () => clearTimers()
  }, [])

  if (!validPosts || validPosts.length === 0) {
    return (
      <div className="py-12 text-center text-theme-muted">
        No posts found for this category.
      </div>
    )
  }

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {validPosts.map((post, index) => {
        const isActive = index === activeCardIndex
        const color = PS_COLORS[index % PS_COLORS.length]
        return (
          <div
            key={post.id}
            className="transition-all duration-700 ease-out rounded-xl"
            style={{
              boxShadow: isActive ? `0 0 20px ${color}` : '0 0 0px transparent',
            }}
          >
            <PostCard post={post} />
          </div>
        )
      })}
    </div>
  )
}