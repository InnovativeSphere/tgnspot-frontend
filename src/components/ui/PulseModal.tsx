'use client'

import { useEffect, useState } from 'react'
import { X, Gamepad2 } from 'lucide-react'
import { useTGNStore } from '@/store/useTGNStore'
import { fetchPulseData } from '@/lib/pulse'
import { KeywordPulse } from '@/components/home/KeywordPulse'
import { SidebarPostCard } from '@/components/home/SidebarPostCard'

interface TopPost {
  id: number
  slug: string
  title: string
  hero_image_url: string
  category: string
  views: number
}

export function PulseModal() {
  const { pulseModalOpen, togglePulseModal } = useTGNStore()
  const [keywords, setKeywords] = useState<string[]>([])
  const [topPosts, setTopPosts] = useState<TopPost[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (pulseModalOpen) {
      setLoading(true)
      fetchPulseData()
        .then((data) => {
          setKeywords(data.keywords)
          setTopPosts(data.topPosts)
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [pulseModalOpen])

  if (!pulseModalOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={togglePulseModal}
      />

      <div
        className="relative w-full max-w-md bg-theme-bg border border-theme-border rounded-2xl shadow-2xl p-6"
        style={{ animation: `scale-in 0.2s ease-out forwards`, zIndex: 101 }}
        data-theme="dark"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
            <Gamepad2 size={22} className="text-orange" />
            What&apos;s Buzzing
          </h2>
          <button
            onClick={togglePulseModal}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-dark-surface transition-colors"
            aria-label="Close pulse"
          >
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <div className="inline-block w-6 h-6 border-2 border-orange border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-5">
            {keywords.length > 0 && (
              <div className="bg-dark-surface rounded-xl p-4">
                <KeywordPulse keywords={keywords} />
              </div>
            )}

            {topPosts.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-heading text-sm font-semibold text-white/60 uppercase tracking-wider">
                  This Week
                </h3>
                <div className="space-y-2">
                  {topPosts.map((post) => (
                    <SidebarPostCard
                      key={post.id}
                      post={post}
                      isPerforming={Boolean(post.views)}
                    />
                  ))}
                </div>
              </div>
            )}

            {keywords.length === 0 && topPosts.length === 0 && (
              <p className="text-sm text-white/70 text-center py-8">
                Nothing buzzing yet. Check back soon.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}