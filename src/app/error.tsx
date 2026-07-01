'use client'

import Link from 'next/link'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      {/* Logo placeholder – replace with your actual logo later if needed */}
      <svg
        width="100"
        height="100"
        viewBox="0 0 120 120"
        className="mb-6"
        aria-hidden="true"
      >
        <polygon
          points="60,10 70,50 110,60 70,70 60,110 50,70 10,60 50,50"
          fill="#FF6B00"
          opacity="0.9"
        />
      </svg>

      <h1 className="font-heading text-4xl font-bold text-theme-text">
        We’re setting up shop
      </h1>
      <p className="mt-4 text-theme-muted max-w-md">
        TGNSpot is almost ready. TED is warming up his writing chair, and the
        games are loading. Come back soon — something good is on the way.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-orange/90"
      >
        Retry
      </Link>
    </div>
  )
}