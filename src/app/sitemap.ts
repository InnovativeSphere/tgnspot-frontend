import { getLatestPosts } from '@/lib/posts'

export default async function sitemap() {
  const baseUrl = 'https://tgnspot-frontend.vercel.app' // or your custom domain
  const posts = await getLatestPosts(100) // Pull your posts for the sitemap

  // Static pages
  const routes = ['', '/categories', '/about'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  // Dynamic post pages
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug}`,
    lastModified: new Date(post.created_at).toISOString(),
  }))

  return [...routes, ...postRoutes]
}