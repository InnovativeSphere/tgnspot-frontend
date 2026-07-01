export function VerdictBar({ verdict }: { verdict?: string }) {
  if (!verdict) return null

  return (
    <div className="border-l-4 border-orange-500 bg-dark-surface cream:bg-cream-surface px-6 py-4 my-8 rounded-r-lg">
      <p className="font-heading text-xl font-bold text-dark-text cream:text-cream-text">
        "{verdict}"
      </p>
      <span className="text-dark-muted cream:text-cream-muted text-sm mt-2 block">— TED</span>
    </div>
  )
}