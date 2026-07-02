'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { CategoryCard } from './CategoryCard'

const PS_COLORS = ['#4A90D9', '#E8A020', '#5CB85C', '#D9534F']

interface CategoryData {
  hero_image_url: string
  verdicts: string[]
}

interface CategoryGridProps {
  categoryData: Record<string, CategoryData>
  categories: string[]
}

export function CategoryGrid({ categoryData, categories }: CategoryGridProps) {
  const router = useRouter()
  const [phase, setPhase] = useState<'left-grey' | 'right-grey' | 'color'>('left-grey')
  const [visible, setVisible] = useState(false)
  const [search, setSearch] = useState('')

  // 15-second cycle (5s each phase)
  useEffect(() => {
    const phases: Array<'left-grey' | 'right-grey' | 'color'> = ['left-grey', 'right-grey', 'color']
    let i = 0
    const interval = setInterval(() => {
      i = (i + 1) % phases.length
      setPhase(phases[i])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Staggered fade-up on mount
  useEffect(() => {
    setVisible(true)
  }, [])

  // Filter categories by search query
  const filtered = useMemo(() => {
    if (!search.trim()) return categories
    const q = search.toLowerCase()
    return categories.filter((cat) => cat.toLowerCase().includes(q))
  }, [categories, search])

  // Assign a unique verdict per card
  const getUniqueVerdicts = (cats: string[]) => {
    const used = new Set<string>()
    return cats.map((cat) => {
      const verdicts = categoryData[cat]?.verdicts || []
      // pick a verdict not yet used
      const available = verdicts.filter((v) => !used.has(v))
      const chosen =
        available.length > 0
          ? available[Math.floor(Math.random() * available.length)]
          : verdicts.length > 0
          ? verdicts[Math.floor(Math.random() * verdicts.length)]
          : null
      if (chosen) used.add(chosen)
      return chosen
    })
  }

  const verdicts = useMemo(() => getUniqueVerdicts(filtered), [filtered, categoryData])

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-8 max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted" />
        <input
          type="text"
          placeholder="Filter categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-theme-surface border border-theme-border rounded-full pl-10 pr-4 py-2 text-sm text-theme-text placeholder:text-theme-muted focus:outline-none focus:border-orange"
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-theme-muted py-12 text-center">
          No categories match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((category, index) => {
            const data = categoryData[category]
            if (!data) return null

            const glowColor = PS_COLORS[index % PS_COLORS.length]

            return (
              <div
                key={category}
                className={`transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CategoryCard
                  category={category}
                  hero_image_url={data.hero_image_url}
                  verdict={verdicts[index]}
                  phase={phase}
                  glowColor={glowColor}
                  onClick={() => router.push(`/?category=${encodeURIComponent(category)}`)}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}