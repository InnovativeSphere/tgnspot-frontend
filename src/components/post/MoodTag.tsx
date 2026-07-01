'use client'

interface MoodTagProps {
  primary: string
  secondary?: string
  className?: string
}

export function MoodTag({ primary, secondary, className = '' }: MoodTagProps) {
  return (
    <div
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        bg-dark-surface/80 backdrop-blur-sm
        border border-white/10
        text-white
        transition-all duration-300 ease-out
        group
        ${className}
      `}
      style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
    >
      <span>{primary}</span>
      {secondary && (
        <span
          className="
            max-w-0 overflow-hidden opacity-0
            group-hover:max-w-xs group-hover:opacity-100
            transition-all duration-300 ease-out
            ml-0 group-hover:ml-1.5
            whitespace-nowrap
          "
        >
          + {secondary}
        </span>
      )}
    </div>
  )
}