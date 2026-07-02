import { getLatestPosts, getCategories } from '@/lib/posts'
import { getReadTime } from '@/lib/utils'
import { HomeContent } from '@/components/home/HomeFeed'

interface HomePageProps {
  searchParams?: Promise<{ category?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const initialCategory = params?.category || 'All'
  const [posts, categories] = await Promise.all([getLatestPosts(20), getCategories()])

  if (!posts || posts.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mt-12 text-center text-theme-muted">
          No posts found.
        </div>
      </div>
    )
  }

  const mappedPosts = posts.map((p: any) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    excerpt: p.excerpt || p.content?.split('.')[0] + '.',
    hero_image_url: p.hero_image_url,
    category: p.category || ['Gaming'],
    readTime: getReadTime(p.content || ''),
    mood_primary: p.mood_primary || 'Analytical',
    mood_secondary: p.mood_secondary,
    content: p.content || '',
    created_at: p.created_at,
  }))

  return (
    <HomeContent
      posts={mappedPosts}
      initialCategory={initialCategory}
      categories={categories}
    />
  )
}
