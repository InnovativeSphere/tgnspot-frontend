// components/ui/PSDivider.tsx
export function PSDivider() {
  const colors = ['#4A90D9', '#E8A020', '#5CB85C', '#D9534F']
  return (
    <div className="flex items-center justify-center gap-3 my-10">
      {colors.map((color, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
        />
      ))}
    </div>
  )
}