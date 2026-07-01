export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-dark-bg">
      <div className="text-center">
        <div className="inline-block w-10 h-10 border-2 border-orange border-t-transparent rounded-full animate-spin mb-4" />
        <p
          className="font-heading text-2xl text-white"
          style={{ animation: 'glitch-flicker 1s ease-in-out infinite' }}
        >
          TGNSpot
        </p>
      </div>
    </div>
  )
}