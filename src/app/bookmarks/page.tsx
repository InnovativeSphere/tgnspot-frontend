'use client'

import { useEffect, useState } from 'react'
import { useTGNStore } from '@/store/useTGNStore'
import { PostCard } from '@/components/home/PostCard'
import { fetchBookmarkedPosts } from './actions'
import { getReadTime } from '@/lib/utils'

export default function BookmarksPage() {
  const bookmarks = useTGNStore((state) => state.bookmarks)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      // Deduplicate slugs just in case
      const uniqueSlugs = [...new Set(bookmarks)]

      if (uniqueSlugs.length > 0) {
        try {
          const fetched = await fetchBookmarkedPosts(uniqueSlugs)
          const mapped = fetched.map((p: any) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            subtitle: p.subtitle || '',
            excerpt: p.content?.split('.')[0] + '.',
            hero_image_url: p.hero_image_url,
            category: p.category || 'Gaming',
            readTime: getReadTime(p.content || ''),
            mood_primary: p.mood_primary || 'Analytical',
            mood_secondary: p.mood_secondary,
          }))
          setPosts(mapped)
        } catch (error) {
          console.error('Failed to load bookmarked posts:', error)
          setPosts([])
        }
      } else {
        setPosts([])
      }
      setLoading(false)
    }
    load()
  }, [bookmarks])

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-heading text-4xl font-bold text-theme-text">
        Your Bookmarks
      </h1>
      {loading ? (
        <p className="mt-4 text-theme-muted">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="mt-4 text-theme-muted">
          You haven&apos;t bookmarked any posts yet. Click the bookmark icon on
          any post to save it here.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}