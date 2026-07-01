'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Shuffle } from 'lucide-react'
import { RelatedPostCard } from './RelatedPostCard'

interface RelatedPostsProps {
  posts: any[]
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  const [shuffledPosts, setShuffledPosts] = useState(posts)
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle')
  const [mounted, setMounted] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMounted(true)
    setShuffledPosts(shuffleArray(posts))
  }, [posts])

  const performShuffle = useCallback(() => {
    setPhase('out')

    const cardCount = Math.min(posts.length, 3)
    const outDuration = cardCount * 100 + 400

    timeoutRef.current = setTimeout(() => {
      setShuffledPosts(shuffleArray(posts))
      setPhase('in')

      const inDuration = cardCount * 100 + 400
      timeoutRef.current = setTimeout(() => {
        setPhase('idle')
      }, inDuration)
    }, outDuration)
  }, [posts])

  useEffect(() => {
    if (posts.length <= 1) return
    const interval = setInterval(performShuffle, 15000)
    return () => clearInterval(interval)
  }, [performShuffle, posts.length])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  if (!posts || posts.length === 0) return null

  const enhancedPosts = shuffledPosts.map((p) => ({
    ...p,
    category: p.category || [],
    readTime:
      p.readTime ||
      (p.content
        ? `${Math.ceil(p.content.split(/\s+/).length / 200)} min read`
        : undefined),
  }))

  const getCardStyle = (index: number) => {
    const delay = index * 100
    const isOut = phase === 'out'
    const isIn = phase === 'in'

    return {
      transition: `opacity 0.4s ease, transform 0.4s ease`,
      transitionDelay: `${delay}ms`,
      opacity: isOut ? 0 : isIn ? 1 : 1,
      transform: isOut ? 'scale(0.95) translateY(8px)' : isIn ? 'scale(1) translateY(0)' : 'scale(1) translateY(0)',
    }
  }

  return (
    <section className="related-posts mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-heading text-2xl font-bold text-theme-text">
          Related Posts
        </h2>
        <button
          onClick={performShuffle}
          disabled={phase !== 'idle'}
          className="relative inline-flex items-center justify-center p-2 rounded-full transition-all duration-300
            border border-orange/30
            text-orange
            hover:bg-orange hover:text-white hover:shadow-[0_0_12px_rgba(255,107,0,0.4)]
            disabled:opacity-30 disabled:cursor-not-allowed"
          title="Shuffle posts"
        >
          <Shuffle
            size={18}
            className={`transition-transform duration-300 ${
              phase !== 'idle' ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
      </div>

      <div className="w-12 h-1 bg-orange mb-6 rounded-full" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {enhancedPosts.map((post, i) => (
          <div key={`${post.slug}-${i}`} style={getCardStyle(i)}>
            <RelatedPostCard post={post} />
          </div>
        ))}
      </div>
    </section>
  )
}