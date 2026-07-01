import { searchPosts } from '@/lib/posts'
import { getReadTime } from '@/lib/utils'
import { PostCard } from '@/components/home/PostCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search | TGNSpot',
  description: 'Find posts by keyword or phrase.',
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>
}) {
  const params = await searchParams
  const query = params?.q || ''
  const results = query ? await searchPosts(query) : []

  const mapped = results.map((p: any) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle || '',
    excerpt: p.content?.split('.')[0] + '.',
    hero_image_url: p.hero_image_url,
    category: p.category || ['Gaming'],
    readTime: getReadTime(p.content || ''),
    mood_primary: p.mood_primary || 'Analytical',
    mood_secondary: p.mood_secondary,
  }))

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-heading text-4xl font-bold text-theme-text">
        {query ? `Search: “${query}”` : 'Search'}
      </h1>

      {query && results.length > 0 && (
        <p className="mt-2 text-theme-muted">
          Found {results.length} {results.length === 1 ? 'post' : 'posts'}
        </p>
      )}

      <div className="mt-8">
        {!query ? (
          <p className="text-theme-muted">Enter a keyword to find posts.</p>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-theme-muted text-lg">
              Nothing here. Try a different angle.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mapped.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}