import type { Metadata } from 'next'
import { TravellingBorder } from '@/components/ui/TravellingBorder'

export const metadata: Metadata = {
  title: 'About | TGNSpot',
  description: 'Where gaming, tech, and culture meet.',
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-dark-bg cream:bg-cream-bg overflow-hidden">
      {/* Decorative orange polygons */}
      <div
        className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] opacity-10 pointer-events-none"
        style={{
          clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 0% 70%)',
          background: 'linear-gradient(135deg, #FF6B00 0%, #FF6B00 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] opacity-5 pointer-events-none"
        style={{
          clipPath: 'polygon(0% 100%, 0% 40%, 100% 100%)',
          background: 'linear-gradient(45deg, #4A90D9, #E8A020)',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl px-6 py-20 relative z-10">
        {/* Panel WITHOUT overflow-hidden – SVG border will render on top */}
        <div className="relative bg-dark-surface/80 cream:bg-cream-surface/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/10 cream:border-black/10 shadow-xl">
          {/* Cut corner decoration */}
          <div
            className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-2xl"
            aria-hidden="true"
          >
            <div
              className="absolute top-0 right-0 w-24 h-24 bg-orange opacity-20"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
            />
          </div>

          {/* Heading with glitch flicker */}
          <h1
            className="font-heading text-4xl md:text-5xl font-bold text-dark-text cream:text-cream-text relative z-10"
            style={{ animation: 'glitch-flicker 1.2s ease-out forwards' }}
          >
            About TGNSpot
          </h1>
          <div
            className="w-16 h-1 bg-orange mt-3 mb-8 rounded-full"
            style={{ animation: 'fade-up 0.6s ease-out 0.3s both' }}
          />

          {/* Text sections with staggered fade-up */}
          <div
            className="space-y-6 text-base leading-relaxed text-dark-muted cream:text-cream-muted relative z-10"
            style={{ animation: 'fade-up 0.8s ease-out 0.5s both' }}
          >
            <p>
              TGNSpot is where gaming, tech, and culture meet. We cover the games that
              matter — from turn‑based RPGs and tactical JRPGs to retro classics and
              hidden gems. We also talk about the hardware, tools, and ideas that
              power the people who play them.
            </p>

            <h2 className="font-heading text-xl font-bold text-dark-text cream:text-cream-text mt-10">
              Editorial Philosophy
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>No clickbait. No hype cycles. No review scores.</li>
              <li>Honest takes, written by someone who actually plays the games.</li>
              <li>Every game has an audience — if it’s not ours, we’ll say so respectfully.</li>
              <li>Depth over speed. Posts are as long as they need to be and not one word longer.</li>
            </ul>

            <p>
              We believe games teach. They teach reasoning, resource management, spatial
              thinking, and that failure is part of the process. We write for people who
              take games seriously — whatever that looks like for them.
            </p>

            <p>
              TGNSpot is independent. No corporate overlords, no algorithmic chasing.
              Just a love for gaming, a respect for craft, and a dark theme that’s easy
              on the eyes.
            </p>

            <h2 className="font-heading text-xl font-bold text-dark-text cream:text-cream-text mt-10">
              Contact
            </h2>
            <p>
              For brand inquiries, collaborations, or just to say hi, reach out at{' '}
              <a
                href="mailto:hello.tgnspot@gmail.com"
                className="text-orange hover:underline underline-offset-2"
              >
                hello.tgnspot@gmail.com
              </a>.
            </p>
          </div>

          {/* Travelling PS electricity border */}
          <TravellingBorder />
        </div>

        {/* PS button dots */}
        <div
          className="flex justify-center gap-3 mt-12"
          style={{ animation: 'fade-up 0.6s ease-out 1.3s both' }}
        >
          {['#4A90D9', '#E8A020', '#5CB85C', '#D9534F'].map((color, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}