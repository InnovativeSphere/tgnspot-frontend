import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-dark-surface cream:bg-cream-surface border-t border-dark-border cream:border-cream-border mt-auto">
      {/* PS Gradient top edge — inverted version of the Hero's bottom line */}
      <div
        className="absolute top-0 left-0 right-0 "
        style={{
          background:
            'linear-gradient(90deg, #4A90D9 25%, #E8A020 25% 50%, #5CB85C 50% 75%, #D9534F 75% 100%)',
          backgroundSize: '200% 100%',
          animation: 'ps-gradient-move 4s ease infinite',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col items-center gap-6 text-center">
        {/* Logo + Tagline */}
        <div className="flex flex-col items-center gap-3">
          <Link href="/" className="shrink-0 group">
            <Image
              src="/Logo1.jfif"
              alt="TGNSpot Logo"
              width={130}
              height={44}
              className="h-8 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </Link>
          <p className="font-body text-sm text-dark-muted cream:text-cream-muted italic max-w-xs">
            "Where gaming, tech, and culture meet."
          </p>
        </div>

        {/* Contact & Copyright */}
        <div className="flex flex-col items-center gap-1 text-xs text-dark-muted cream:text-cream-muted">
          <a
            href="mailto:hello.tgnspot@gmail.com"
            className="hover:text-dark-text cream:hover:text-cream-text transition-colors underline-offset-2 hover:underline"
          >
            hello.tgnspot@gmail.com — brand inquiries
          </a>
          <span>© {year} TGNSpot</span>
        </div>

        {/* Theme credit — very quiet */}
        <div className="pt-4 w-full text-center text-[10px] text-dark-muted/40 cream:text-cream-muted/40 tracking-wider uppercase">
          Designed with a love for gaming. Built for readers.
        </div>
      </div>
    </footer>
  )
}