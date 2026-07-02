import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | TGNSpot',
  description: 'How we handle your data — simple and honest.',
}

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-theme-bg overflow-hidden">
      {/* Subtle orange polygon (same as About, but less intense) */}
      <div
        className="absolute top-0 right-0 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] opacity-5 pointer-events-none"
        style={{
          clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 0% 70%)',
          background: 'linear-gradient(135deg, #FF6B00 0%, #FF6B00 100%)',
        }}
        aria-hidden="true"
      />

      {/* PS gradient top edge — clean, no animation */}
      <div
        className="fixed top-0 left-0 right-0 h-0.5 z-40"
        style={{
          background:
            'linear-gradient(90deg, #4A90D9 25%, #E8A020 25% 50%, #5CB85C 50% 75%, #D9534F 75% 100%)',
          backgroundSize: '200% 100%',
          animation: 'ps-gradient-move 4s ease infinite',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl px-6 py-20 relative z-10">
        {/* Clean card — no glitch, no orbit */}
        <div className="relative bg-theme-surface/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-theme-border shadow-xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-theme-text">
            Privacy Policy
          </h1>
          <div className="w-16 h-1 bg-orange mt-3 mb-8 rounded-full" />

          <div className="space-y-6 text-base leading-relaxed text-theme-muted">
            <p>
              Your privacy is important to us. This policy explains how TGNSpot handles
              your information when you visit the site.
            </p>

            <h2 className="font-heading text-xl font-bold text-theme-text mt-10">
              What we collect
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Anonymous usage data</strong> — we use Vercel Analytics to see
                which pages are popular. No personal data is ever stored or shared.
              </li>
              <li>
                <strong>Cookies</strong> — the site uses a single functional cookie to
                remember your theme preference (dark or cream). That’s it.
              </li>
            </ul>

            <h2 className="font-heading text-xl font-bold text-theme-text mt-10">
              How we use it
            </h2>
            <p>
              The anonymous data helps us understand what readers enjoy so we can write
              more of it. The theme cookie just keeps the lights how you like them.
            </p>

            <h2 className="font-heading text-xl font-bold text-theme-text mt-10">
              Third‑party services
            </h2>
            <p>
              TGNSpot may include affiliate links and, in the future, ad placements.
              These third parties may use cookies for tracking conversions or serving
              relevant ads. We recommend reviewing their privacy policies for more
              information.
            </p>

            <h2 className="font-heading text-xl font-bold text-theme-text mt-10">
              Your control
            </h2>
            <p>
              You can disable cookies in your browser settings at any time. The theme
              preference will simply reset on each visit.
            </p>

            <h2 className="font-heading text-xl font-bold text-theme-text mt-10">
              Contact
            </h2>
            <p>
              If you have any questions about this policy, reach out at{' '}
              <a
                href="mailto:hello@tgnspot.com"
                className="text-orange hover:underline underline-offset-2"
              >
                hello@tgnspot.com
              </a>.
            </p>

            <p className="text-sm mt-10 text-theme-muted opacity-60">
              Last updated: {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}