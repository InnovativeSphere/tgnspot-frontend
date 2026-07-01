import Image from 'next/image'
import { MoodTag } from '@/components/post/MoodTag'
import { getReadTime } from '@/lib/utils'

interface PostHeroProps {
  hero_image_url: string
  title: string
  subtitle: string
  category?: string[]
  mood_primary?: string
  mood_secondary?: string
  created_at: string
  content: string
  slug: string
}

export function PostHero({
  hero_image_url,
  title,
  subtitle,
  category = [],
  mood_primary,
  mood_secondary,
  created_at,
  content,
  slug,
}: PostHeroProps) {
  const readTime = getReadTime(content)

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden rounded-xl mb-10">
      <Image
        src={hero_image_url}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-orange/10" />

      {/* Decorative abstract orange shape */}
      <div
        className="absolute top-0 right-0 w-64 h-64 bg-orange opacity-10 blur-3xl rounded-full"
        aria-hidden="true"
      />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
        {category.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {category.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-dark-surface/80 backdrop-blur-sm px-3 py-1 text-xs text-white"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl">
          {title}
        </h1>
        <p className="font-body text-lg text-white/80 mt-2 max-w-2xl">
          {subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-white/70">
          {mood_primary && (
            <MoodTag primary={mood_primary} secondary={mood_secondary} />
          )}
          <span>{readTime}</span>
          <span>{new Date(created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</span>
        </div>
      </div>
    </div>
  )
}