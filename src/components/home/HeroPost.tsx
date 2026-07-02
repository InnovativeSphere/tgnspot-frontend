import Link from 'next/link'
import Image from 'next/image'
import { MoodTag } from '@/components/post/MoodTag'
import { getReadTime } from '@/lib/utils'

interface HeroPostProps {
  post: {
    id: number
    slug: string
    title: string
    subtitle: string
    hero_image_url: string
    mood_primary: string
    mood_secondary?: string
    created_at: string
    content: string
    category: string[]
  }
}

export function HeroPost({ post }: HeroPostProps) {
  const readTime = getReadTime(post.content)

  return (
    <Link
      href={`/post/${encodeURIComponent(post.slug)}`}
      className="group relative block w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden rounded-xl"
    >
      <div className="relative w-full h-full bg-theme-bg rounded-xl overflow-hidden">
        <Image
          src={post.hero_image_url}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Top-left row: mood tag (hidden on mobile) + category pills */}
        <div className="absolute top-6 left-6 md:left-12 z-10 flex items-center gap-3 flex-wrap mb-4">
          {/* Mood tag – only visible on sm+ screens */}
          <span className="hidden sm:block">
            <MoodTag primary={post.mood_primary} secondary={post.mood_secondary} />
          </span>

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
        </div>

        {/* Read time – top right */}
        <div className="absolute top-6 right-6 md:right-12 z-10">
          <span className="rounded-full bg-dark-surface/80 backdrop-blur-sm px-3 py-1 text-xs text-white/70">
            {readTime}
          </span>
        </div>

        {/* Bottom: title & subtitle – same left alignment */}
        <div className="absolute bottom-8 left-6 right-6 md:bottom-12 md:left-12 z-10 max-w-4xl">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            {post.title}
          </h2>
          <p className="font-body text-base md:text-lg text-white/80 mt-3 max-w-2xl">
            {post.subtitle}
          </p>
        </div>
      </div>

      {/* PS Gradient Electricity Line – bottom edge only */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl"
        style={{
          background:
            'linear-gradient(90deg, #4A90D9 25%, #E8A020 25% 50%, #5CB85C 50% 75%, #D9534F 75% 100%)',
          backgroundSize: '200% 100%',
          animation: 'ps-gradient-move 4s ease infinite',
        }}
      />
    </Link>
  )
}