'use server'

import { getPostsBySlugs } from '@/lib/posts'

export async function fetchBookmarkedPosts(slugs: string[]) {
  return getPostsBySlugs(slugs)
}