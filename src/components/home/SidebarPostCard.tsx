import Link from 'next/link'
import Image from 'next/image'

interface SidebarPostCardProps {
  post: {
    slug: string
    title: string
    hero_image_url: string
    category?: string
    views?: number
  }
  isPerforming?: boolean
}

export function SidebarPostCard({ post, isPerforming = false }: SidebarPostCardProps) {
  return (
    <Link
      href={`/post/${post.slug}`}
      className={`group relative block rounded-lg overflow-hidden ${
        isPerforming ? 'p-[3px]' : 'border border-theme-border'
      }`}
    >
      {isPerforming ? (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-ps-cross via-ps-circle via-ps-triangle to-ps-square bg-[length:300%_300%] animate-[ps-gradient-move_3s_ease_infinite]">
          <div className="h-full w-full rounded-[7px] overflow-hidden bg-theme-bg">
            <CardContent post={post} />
          </div>
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden bg-theme-bg">
          <CardContent post={post} />
        </div>
      )}
    </Link>
  )
}

function CardContent({ post }: { post: SidebarPostCardProps['post'] }) {
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-dark-surface/50 transition-colors">
      <div className="relative w-14 h-14 flex-shrink-0 rounded-md overflow-hidden">
        <Image
          src={post.hero_image_url}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="min-w-0">
        <h4 className="font-heading text-sm font-semibold text-theme-text line-clamp-2">
          {post.title}
        </h4>
        {post.category && (
          <span className="text-xs text-theme-muted mt-0.5 block">
            {post.category}
          </span>
        )}
      </div>
    </div>
  )
}