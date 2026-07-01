import { getCategoryData } from '@/lib/posts'
import { CategorySplitPanel } from '@/components/category/CategorySplitPanel'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const categoryData = await getCategoryData()
  // Use only categories that have an image & verdict available
  const categories = Object.keys(categoryData)

  if (categories.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12 text-center text-theme-muted">
        No categories found.
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <CategorySplitPanel categoryData={categoryData} categories={categories} />
    </div>
  )
}