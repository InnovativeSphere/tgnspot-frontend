'use server'

import { getRecentKeywords, getTopPosts } from '@/lib/posts'

export async function fetchPulseData() {
  const [keywords, topPosts] = await Promise.all([
    getRecentKeywords(7),
    getTopPosts(3),
  ])
  return { keywords, topPosts }
}