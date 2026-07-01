'use client'

import { useTGNStore } from '@/store/useTGNStore'
import { MoodTag } from '@/components/post/MoodTag'
import { Bookmark } from 'lucide-react'
import { getReadTime, formatDate } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface PostHeaderProps {
  post: {
    id: number
    slug: string
    title: string
    subtitle: string
    category?: string
    mood_primary?: string
    mood_secondary?: string
    created_at: string
    content: string
  }
}

export function PostHeader({ post }: PostHeaderProps) {
  const { toggleBookmark, isBookmarked } = useTGNStore()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const bookmarked = mounted && isBookmarked(post.slug)
  const readTime = getReadTime(post.content || '')
  const dateFormatted = formatDate(post.created_at)

  return (
    <header className="space-y-4">
      {post.category && (
        <span className="inline-block rounded-full bg-dark-surface/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
          {post.category}
        </span>
      )}
      <h1 className="font-heading text-4xl md:text-5xl font-bold text-dark-text cream:text-cream-text leading-tight">
        {post.title}
      </h1>
      <p className="font-body text-lg text-dark-muted cream:text-cream-muted">
        {post.subtitle}
      </p>
      <div className="flex flex-wrap items-center gap-4 text-sm text-dark-muted cream:text-cream-muted">
        {post.mood_primary && (
          <MoodTag primary={post.mood_primary} secondary={post.mood_secondary} />
        )}
        <span>{readTime}</span>
        <span>{dateFormatted}</span>
        <button
          onClick={() => toggleBookmark(post.slug)}
          className={`ml-auto inline-flex items-center gap-1 rounded-full bg-dark-surface/80 p-1.5 backdrop-blur-sm transition-colors ${
            bookmarked ? 'text-orange' : 'text-dark-muted hover:text-dark-text'
          }`}
          aria-label="Bookmark post"
        >
          <Bookmark size={18} fill={bookmarked ? '#FF6B00' : 'none'} />
        </button>
      </div>
    </header>
  )
}