import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      {/* Abstract 4‑point star (from logo) */}
      <svg
        width="120"
        height="120"
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

      <h1 className="font-heading text-5xl font-bold text-dark-text cream:text-cream-text mt-4">
        404
      </h1>
      <p className="mt-3 text-lg text-dark-muted cream:text-cream-muted max-w-md">
        &ldquo;This page doesn&rsquo;t exist. Neither did motion controls, and
        look how that turned out.&rdquo;
      </p>

      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-orange/90"
      >
        Back to TGNSpot
      </Link>
    </div>
  )
}