import { getLatestPosts } from '@/lib/posts'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tgnspot-frontend.vercel.app'

  // Static pages - explicitly typed
  const routes: MetadataRoute.Sitemap = ['', '/categories', '/about'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  // Dynamic post pages - explicitly typed so TS is happy
  let postRoutes: MetadataRoute.Sitemap = []

  try {
    const posts = await getLatestPosts(100)
    postRoutes = posts.map((post) => ({
      url: `${baseUrl}/post/${post.slug}`,
      lastModified: new Date(post.created_at).toISOString(),
    }))
  } catch (error) {
    // If the DB fails, just log it and keep the static pages
    console.error('Sitemap DB fetch failed (safe to ignore):', error)
  }

  return [...routes, ...postRoutes]
}