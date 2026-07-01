// components/ui/AdSlot.tsx
interface AdSlotProps {
  position: 'hero' | 'mid-article' | 'below-post' | 'sidebar'
  className?: string
}

export function AdSlot({ position, className }: AdSlotProps) {
  return (
    <div
      className={`ad-slot ad-slot--${position} ${className ?? ''}`}
      data-position={position}
    />
  )
}