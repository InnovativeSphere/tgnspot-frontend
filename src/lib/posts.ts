import { query } from './db'

export async function getLatestPosts(limit = 10, category?: string) {
  let sql = 'SELECT * FROM posts'
  const params: (string | number)[] = [limit]

  if (category) {
    sql += ' WHERE category && ARRAY[$1]::text[] ORDER BY created_at DESC LIMIT $2'
    params.unshift(category)
  } else {
    sql += ' ORDER BY created_at DESC LIMIT $1'
  }

  const { rows } = await query(sql, params)
  return rows
}

export async function getPostBySlug(slug: string) {
  const { rows } = await query(
    'SELECT * FROM posts WHERE slug = $1 LIMIT 1',
    [slug]
  )
  return rows[0] || null
}

export async function getRelatedPosts(postId: number, limit = 3) {
  const { rows } = await query(
    'SELECT * FROM posts WHERE id != $1 ORDER BY created_at DESC LIMIT $2',
    [postId, limit]
  )
  return rows
}

export async function getTopPosts(limit = 3) {
  const { rows } = await query(
    `SELECT p.*, COALESCE(pp.views, 0) as views
     FROM posts p
     LEFT JOIN post_performance pp ON pp.post_id = p.id
     ORDER BY views DESC
     LIMIT $1`,
    [limit]
  )
  return rows
}

export async function getRecentKeywords(days = 7) {
  const { rows } = await query(
    `SELECT keywords_tier1, keywords_tier2 FROM posts
     WHERE created_at >= NOW() - $1::interval`,
    [`${days} days`]
  )
  const flattened = rows.flatMap((row) => [
    ...(row.keywords_tier1 || []),
    ...(row.keywords_tier2 || []),
  ])
  return Array.from(new Set(flattened))
}

export async function getCategories(): Promise<string[]> {
  const { rows } = await query(
    `SELECT DISTINCT unnest(category) AS category FROM posts ORDER BY category`
  )
  return rows.map((r) => r.category)
}

export async function getCategoryData() {
  const { rows } = await query(
    `SELECT DISTINCT ON (cat) cat as category, p.hero_image_url, p.verdict
     FROM posts p, unnest(p.category) AS cat
     ORDER BY cat, p.created_at DESC`
  )
  const map: Record<string, { hero_image_url: string; verdicts: string[] }> = {}
  for (const row of rows) {
    if (!map[row.category]) {
      map[row.category] = { hero_image_url: row.hero_image_url, verdicts: [] }
    }
    if (row.verdict) map[row.category].verdicts.push(row.verdict)
  }
  return map
}

export async function getPostsBySlugs(slugs: string[]) {
  if (!slugs || slugs.length === 0) return []
  const placeholders = slugs.map((_, i) => `$${i + 1}`).join(', ')
  const { rows } = await query(
    `SELECT id, slug, title, subtitle, content, hero_image_url, category, mood_primary, mood_secondary, created_at
     FROM posts
     WHERE slug IN (${placeholders})
     ORDER BY created_at DESC`,
    slugs
  )
  return rows
}

export async function searchPosts(q: string) {
  if (!q || q.trim().length === 0) return []

  const { rows } = await query(
    `SELECT *
     FROM posts
     WHERE to_tsvector('english', title || ' ' || subtitle || ' ' || content) @@ websearch_to_tsquery('english', $1)
     ORDER BY created_at DESC
     LIMIT 20`,
    [q.trim()]
  )
  return rows
}