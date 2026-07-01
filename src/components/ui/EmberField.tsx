'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
  burst?: boolean
}

export function EmberField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    ctx.scale(dpr, dpr)

    const EMBER_COUNT = 20
    const COLLISION_DIST = 30

    const embers: Particle[] = []
    const sparks: Particle[] = []

    const random = (min: number, max: number) => Math.random() * (max - min) + min

    // Spawn a single ember
    const spawnEmber = (x?: number, y?: number) => ({
      x: x ?? random(0, width),
      y: y ?? random(height * 0.5, height + 50),
      vx: random(-0.2, 0.2),
      vy: random(-0.4, -0.8),
      size: random(2, 6),
      opacity: random(0.2, 0.5),
      life: 0,
      maxLife: 1000,
    })

    // Spawn spark particles from a collision point
    const spawnSparks = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        sparks.push({
          x,
          y,
          vx: random(-2, 2),
          vy: random(-3, -1),
          size: random(1, 3),
          opacity: random(0.6, 1),
          life: 0,
          maxLife: random(400, 800),
          burst: true,
        })
      }
    }

    // Initialize embers
    for (let i = 0; i < EMBER_COUNT; i++) {
      embers.push(spawnEmber())
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Update and draw embers
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i]
        e.x += e.vx
        e.y += e.vy
        e.life++

        // Wrap around if off screen
        if (e.y < -20 || e.x < -20 || e.x > width + 20) {
          const fresh = spawnEmber()
          e.x = fresh.x
          e.y = fresh.y
          e.vx = fresh.vx
          e.vy = fresh.vy
          e.size = fresh.size
          e.opacity = fresh.opacity
          e.life = 0
        }

        // Draw ember
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 107, 0, ${e.opacity})`
        ctx.fill()

        // Check collisions with other embers
        for (let j = i + 1; j < embers.length; j++) {
          const other = embers[j]
          const dx = e.x - other.x
          const dy = e.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < COLLISION_DIST && e.life > 30 && other.life > 30) {
            // Create sparks at midpoint
            const mx = (e.x + other.x) / 2
            const my = (e.y + other.y) / 2
            spawnSparks(mx, my, 5)

            // Reset both embers to avoid repeat collisions
            const fresh1 = spawnEmber()
            const fresh2 = spawnEmber()
            Object.assign(e, fresh1)
            Object.assign(other, fresh2)
          }
        }
      }

      // Update and draw spark particles
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.vx *= 0.98
        s.vy *= 0.98
        s.life++

        if (s.life > s.maxLife) {
          sparks.splice(i, 1)
          continue
        }

        const fade = 1 - s.life / s.maxLife
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 107, 0, ${s.opacity * fade})`
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}