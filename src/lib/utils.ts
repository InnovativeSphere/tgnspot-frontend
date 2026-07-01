import { format } from 'date-fns'

export function getReadTime(body: string): string {
  const words = body.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return format(date, 'MMMM d, yyyy') // e.g., "June 28, 2026"
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}