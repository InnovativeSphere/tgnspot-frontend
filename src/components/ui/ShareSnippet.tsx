// components/ui/ShareSnippet.tsx
'use client'

import { useEffect, useState, useCallback } from 'react'

export function ShareSnippet({ slug }: { slug: string }) {
  const [selection, setSelection] = useState('')
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleMouseUp = useCallback(() => {
    // Delay to allow the selection to finalize
    setTimeout(() => {
      const sel = window.getSelection()
      const text = sel?.toString().trim()
      if (text && text.length > 0) {
        const range = sel?.getRangeAt(0)
        const rect = range?.getBoundingClientRect()
        if (rect) {
          // Position near the end of the selection, centered horizontally
          const x = rect.right + window.scrollX - 50
          const y = rect.bottom + window.scrollY + 10
          setSelection(text)
          setPosition({ x, y })
          setVisible(true)
          setCopied(false)
        }
      } else {
        setVisible(false)
      }
    }, 50) // tiny delay
  }, [])

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp)
    return () => document.removeEventListener('mouseup', handleMouseUp)
  }, [handleMouseUp])

  const handleCopy = async () => {
    const url = `${window.location.origin}/post/${slug}`
    await navigator.clipboard.writeText(
      `"${selection}"\n\n— TED, TGNSpot\n${url}`
    )
    setCopied(true)
    setTimeout(() => setVisible(false), 800)
  }

  if (!visible) return null

  return (
    <button
      onClick={handleCopy}
      className="fixed z-[100] bg-orange text-white text-xs px-3 py-1.5 rounded-full shadow-lg shadow-black/30 transition-all hover:bg-orange/90"
      style={{ left: position.x, top: position.y }}
    >
      {copied ? 'Copied!' : 'Share this take'}
    </button>
  )
}