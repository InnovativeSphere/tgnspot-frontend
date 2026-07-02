import Image from 'next/image'

interface CategoryCardProps {
  category: string
  hero_image_url: string
  verdict: string | null
  phase: 'left-grey' | 'right-grey' | 'color'
  glowColor: string
  onClick: () => void
}

export function CategoryCard({
  category,
  hero_image_url,
  verdict,
  phase,
  glowColor,
  onClick,
}: CategoryCardProps) {
  const leftGrey = phase === 'left-grey'
  const rightGrey = phase === 'right-grey'

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl aspect-video cursor-pointer transition-all duration-500 hover:scale-[1.02]"
    >
      {/* PS gradient border on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-ps-cross via-ps-circle via-ps-triangle to-ps-square bg-[length:300%_300%] animate-[ps-gradient-move_3s_ease_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[3px]">
        <div className="h-full w-full rounded-[10px] overflow-hidden bg-theme-bg">
          <InnerCard
            hero_image_url={hero_image_url}
            leftGrey={leftGrey}
            rightGrey={rightGrey}
            category={category}
            verdict={verdict}
          />
        </div>
      </div>

      {/* Default state without border */}
      <div className="absolute inset-0 rounded-xl overflow-hidden bg-theme-bg group-hover:opacity-0 transition-opacity duration-500">
        <InnerCard
          hero_image_url={hero_image_url}
          leftGrey={leftGrey}
          rightGrey={rightGrey}
          category={category}
          verdict={verdict}
        />
      </div>
    </div>
  )
}

function InnerCard({
  hero_image_url,
  leftGrey,
  rightGrey,
  category,
  verdict,
}: {
  hero_image_url: string
  leftGrey: boolean
  rightGrey: boolean
  category: string
  verdict: string | null
}) {
  return (
    <div className="relative w-full h-full">
      {/* Background image */}
      <Image
        src={hero_image_url || '/fallback.jpg'}
        alt={category}
        fill
        className="object-cover"
      />

      {/* Greyscale overlays */}
      <div
        className="absolute inset-0 z-10"
        style={{
          clipPath: 'polygon(0 0, 58% 0, 48% 100%, 0 100%)',
          backdropFilter: leftGrey ? 'grayscale(100%)' : 'none',
          WebkitBackdropFilter: leftGrey ? 'grayscale(100%)' : 'none',
          transition: 'backdrop-filter 0.7s ease',
        }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          clipPath: 'polygon(58% 0, 100% 0, 100% 100%, 48% 100%)',
          backdropFilter: rightGrey ? 'grayscale(100%)' : 'none',
          WebkitBackdropFilter: rightGrey ? 'grayscale(100%)' : 'none',
          transition: 'backdrop-filter 0.7s ease',
        }}
      />

      {/* Dark overlay for text readability – z-20 */}
      <div className="absolute inset-0 bg-black/30 z-20" />

      {/* Blurred diagonal line – z-30, above dark overlay, below text */}
      <svg
        className="absolute inset-0 w-full h-full z-30 pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <filter id="blur-line">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
          </filter>
        </defs>
        <line
          x1="58%"
          y1="0"
          x2="48%"
          y2="100%"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#blur-line)"
        />
      </svg>

      {/* Text – z-40, always above everything */}
      <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-4 text-center">
        <h2 className="font-heading text-xl md:text-2xl font-bold text-white drop-shadow-lg">
          {category}
        </h2>
        {verdict && (
          <p className="mt-1 text-sm text-white/80 italic line-clamp-2 max-w-[80%]">
            “{verdict}”
          </p>
        )}
      </div>
    </div>
  )
}