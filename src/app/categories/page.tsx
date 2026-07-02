import { getCategoryData } from '@/lib/posts'
import { CategoryGrid } from '@/components/category/CategoryGrid'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const categoryData = await getCategoryData()
  const categories = Object.keys(categoryData)

  if (categories.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12 text-center text-theme-muted">
        No categories found.
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-heading text-4xl font-bold text-theme-text mb-8">
        Browse by Category
      </h1>
      <CategoryGrid categoryData={categoryData} categories={categories} />
    </div>
  )
}