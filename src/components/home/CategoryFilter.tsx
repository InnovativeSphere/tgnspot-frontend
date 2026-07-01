'use client'

import { useTGNStore } from '@/store/useTGNStore'

interface CategoryFilterProps {
  categories: string[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const activeCategory = useTGNStore((state) => state.activeCategory)
  const setActiveCategory = useTGNStore((state) => state.setActiveCategory)

  return (
    <div className="w-full overflow-x-auto py-4 no-scrollbar">
      <div className="flex items-center gap-2 min-w-max px-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
              ${
                activeCategory === category
                  ? 'bg-orange text-white shadow-md'
                  : 'bg-dark-surface dark:bg-dark-surface cream:bg-cream-surface text-dark-muted dark:text-dark-muted cream:text-cream-muted hover:text-dark-text dark:hover:text-dark-text cream:hover:text-cream-text'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}