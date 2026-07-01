'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface RelatedPostCardProps {
  post: {
    slug: string
    title: string
    hero_image_url: string
    category?: string[]       // ← array
    readTime?: string
  }
}

export function RelatedPostCard({ post }: RelatedPostCardProps) {
  return (
    <Link
      href={`/post/${encodeURIComponent(post.slug)}`}
      className="group relative flex items-center gap-4 rounded-xl border border-dark-border cream:border-cream-border bg-dark-surface/50 cream:bg-cream-surface/50 p-3 transition-all duration-300 hover:border-orange hover:shadow-[0_0_15px_rgba(255,107,0,0.15)] hover:scale-[1.02]"
    >
      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={post.hero_image_url}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 min-w-0">
        {post.category && post.category.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1">
            {post.category.map((cat) => (
              <span key={cat} className="text-xs text-theme-muted">
                {cat}
              </span>
            ))}
          </div>
        )}
        <h4 className="font-heading text-sm font-semibold text-theme-text group-hover:text-orange transition-colors duration-300 line-clamp-2">
          {post.title}
        </h4>
        {post.readTime && (
          <span className="text-xs text-theme-muted mt-1 block">
            {post.readTime}
          </span>
        )}
      </div>
      <ArrowRight
        size={18}
        className="text-orange opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0"
      />
    </Link>
  )
}