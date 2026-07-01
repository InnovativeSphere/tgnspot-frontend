'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

const PS_COLORS = ['#4A90D9', '#E8A020', '#5CB85C', '#D9534F']

interface PostSlideshowProps {
  images: string[]
}

export function PostSlideshow({ images }: PostSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + images.length) % images.length)
    },
    [images.length]
  )

  // Auto‑advance every 3 seconds
  useEffect(() => {
    if (images.length <= 1) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  if (!images || images.length === 0) return null

  const currentColor = PS_COLORS[activeIndex % PS_COLORS.length]

  return (
    <div className="my-10">
      {/* Outer container with the diagonal slash line */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden group">
        {/* Diagonal gradient slash – runs from top‑left to bottom‑right */}
        <div
          className="absolute -inset-[3px] z-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom right, #4A90D9, #E8A020, #5CB85C, #D9534F, #4A90D9)`,
            backgroundSize: '300% 300%',
            animation: 'ps-gradient-move 3s ease infinite',
            clipPath: 'polygon(0% 0%, 0% 3px, calc(100% - 3px) 100%, 100% 100%, 100% calc(100% - 3px), 3px 0%)',
          }}
          aria-hidden="true"
        />

        {/* Image container */}
        <div className="relative w-full h-full rounded-xl overflow-hidden z-10">
          <Image
            src={images[activeIndex]}
            alt={`Slideshow image ${activeIndex + 1}`}
            fill
            className="object-cover transition-transform duration-500 ease-out hover:scale-105"
          />

          {/* Hover glow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300 opacity-0 hover:opacity-100"
            style={{
              boxShadow: `0 0 25px ${currentColor}40`,
            }}
          />
        </div>
      </div>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="flex justify-center gap-3 mt-4 flex-wrap">
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`relative w-16 h-10 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                i === activeIndex
                  ? 'border-orange scale-105'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={url}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}