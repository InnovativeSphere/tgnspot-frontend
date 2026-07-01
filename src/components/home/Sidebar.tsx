import { SidebarPostCard } from './SidebarPostCard'
import { PulsePanel } from './PulsePanel'

interface TopPost {
  id: number
  slug: string
  title: string
  hero_image_url: string
  category: string
  views: number
}

interface SidebarProps {
  topPosts: TopPost[]
  keywords: string[]
}

export function Sidebar({ topPosts, keywords }: SidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Pulse toggle (gamepad icon) */}
      <PulsePanel keywords={keywords} />

      {/* Top performing posts */}
      {topPosts.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-dark-text cream:text-cream-text">
            This Week
          </h3>
          <div className="space-y-3">
            {topPosts.map((post) => (
              <SidebarPostCard
                key={post.id}
                post={post}
                isPerforming={Boolean(post.views)}
              />
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}