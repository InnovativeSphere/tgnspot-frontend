'use client'

import Link from 'next/link'
import { Bookmark } from 'lucide-react'
import { useTGNStore } from '@/store/useTGNStore'

export function BookmarkButton({ slug }: { slug?: string }) {
  const bookmarks = useTGNStore((state) => state.bookmarks)
  const count = bookmarks.length

  return (
    <Link
      href="/bookmarks"
      className="relative p-2 rounded-full transition-colors hover:bg-theme-surface text-theme-text"
      aria-label={`Bookmarks (${count})`}
    >
      <Bookmark size={20} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
          {count}
        </span>
      )}
    </Link>
  )
}