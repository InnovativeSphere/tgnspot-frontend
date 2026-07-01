'use client'

import { useEffect } from 'react'
import { useTGNStore } from '@/store/useTGNStore'
import { HeroPost } from './HeroPost'
import { CategoryFilter } from './CategoryFilter'
import { PostGrid } from './PostGrid'

interface Post {
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
  content: string
  created_at: string
}

interface HomeContentProps {
  posts: Post[]
  initialCategory?: string
  categories: string[]
}

const ALL_CATEGORIES = 'All'

export function HomeContent({ posts, initialCategory = 'All', categories }: HomeContentProps) {
  const activeCategory = useTGNStore((state) => state.activeCategory)
  const setActiveCategory = useTGNStore((state) => state.setActiveCategory)

  useEffect(() => {
    if (initialCategory && initialCategory !== ALL_CATEGORIES) {
      setActiveCategory(initialCategory)
    }
  }, [initialCategory, setActiveCategory])

  const heroPost = posts[0]

  const filteredPosts =
    activeCategory === ALL_CATEGORIES
      ? posts
      : posts.filter((p) => p.category.includes(activeCategory))

  const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : []

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <HeroPost post={heroPost} />
      <div className="mt-8">
        <CategoryFilter categories={[ALL_CATEGORIES, ...categories]} />
      </div>
      <div className="mt-8">
        {filteredPosts.length === 0 ? (
          <div className="py-12 text-center text-theme-muted">
            No posts found in this category.
          </div>
        ) : (
          <PostGrid posts={gridPosts} />
        )}
      </div>
    </div>
  )
}