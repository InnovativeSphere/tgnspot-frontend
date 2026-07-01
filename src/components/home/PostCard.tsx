'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bookmark } from 'lucide-react'
import { MoodTag } from '@/components/post/MoodTag'
import { useTGNStore } from '@/store/useTGNStore'

interface PostCardProps {
  post: {
    id: number
    slug: string
    title: string
    subtitle: string
    excerpt: string
    hero_image_url: string
    category: string[]
    readTime: string
    mood_primary: string
    mood_secondary?: string
  }
}

export function PostCard({ post }: PostCardProps) {
  const { toggleBookmark, isBookmarked } = useTGNStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const bookmarked = mounted && isBookmarked(post.slug)

  return (
    <Link
      href={`/post/${encodeURIComponent(post.slug)}`}
      className="group relative block h-[400px] w-full overflow-hidden rounded-xl"
    >
      {/* PS Gradient Border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-ps-cross via-ps-circle via-ps-triangle to-ps-square bg-[length:300%_300%] animate-[ps-gradient-move_3s_ease_infinite] p-[3px]">
        <div className="relative h-full w-full rounded-[10px] overflow-hidden bg-theme-bg">
          <Image
            src={post.hero_image_url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Top-left: category pills */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
            {post.category && post.category.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.category.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full bg-dark-surface/80 backdrop-blur-sm px-2 py-0.5 text-xs text-white"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
            <MoodTag primary={post.mood_primary} secondary={post.mood_secondary} />
          </div>

          {/* Top-right: read time + bookmark */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
            <span className="rounded-full bg-dark-surface/80 backdrop-blur-sm px-3 py-1 text-xs text-white/70">
              {post.readTime}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault()
                toggleBookmark(post.slug)
              }}
              className={`
                rounded-full bg-dark-surface/80 p-1.5 backdrop-blur-sm
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                ${bookmarked ? 'text-orange' : 'text-white'}
              `}
            >
              <Bookmark size={18} fill={bookmarked ? '#FF6B00' : 'none'} />
            </button>
          </div>

          {/* Bottom: title, subtitle/excerpt */}
          <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-6 pt-12 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="font-heading text-2xl font-bold text-white leading-tight">
              {post.title}
            </h3>
            <div className="
              overflow-hidden
              max-h-0 opacity-0
              group-hover:max-h-40 group-hover:opacity-100
              transition-all duration-700 ease-out
            ">
              <p className="font-body text-white/80 text-sm mt-2 line-clamp-2">
                {post.subtitle}
              </p>
              {post.excerpt && (
                <p className="font-body text-white/60 text-xs mt-3 italic line-clamp-2">
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}