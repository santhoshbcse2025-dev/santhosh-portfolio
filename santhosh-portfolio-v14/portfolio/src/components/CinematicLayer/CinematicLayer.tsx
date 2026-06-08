'use client'

import { useEffect, useRef } from 'react'
import styles from './CinematicLayer.module.css'

export default function CinematicLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let W = window.innerWidth
    let H = window.innerHeight

    canvas.width  = W
    canvas.height = H

    // ── Particles ──────────────────────────────────────────────
    const COUNT = 180
    type Particle = {
      x: number; y: number; z: number
      vx: number; vy: number
      size: number; opacity: number
      color: string; phase: number; speed: number
    }

    const palette = [
      'rgba(232,112,58,',   // orange
      'rgba(244,144,74,',   // warm orange
      'rgba(201,169,110,',  // gold
      'rgba(245,240,235,',  // cream
      'rgba(255,159,94,',   // amber
    ]

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x:       Math.random() * W,
      y:       Math.random() * H,
      z:       Math.random(),
      vx:      (Math.random() - 0.5) * 0.3,
      vy:      -(Math.random() * 0.4 + 0.1),
      size:    Math.random() < 0.15 ? Math.random() * 4 + 3 : Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.1,
      color:   palette[Math.floor(Math.random() * palette.length)],
      phase:   Math.random() * Math.PI * 2,
      speed:   Math.random() * 0.4 + 0.2,
    }))

    // Mouse parallax
    let mouseX = 0, mouseY = 0
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / W - 0.5) * 18
      mouseY = (e.clientY / H - 0.5) * 12
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    const onResize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    let last = performance.now()

    const draw = () => {
      animId = requestAnimationFrame(draw)
      const now  = performance.now()
      const t    = now * 0.001
      const dt   = Math.min((now - last) * 0.001, 0.05)
      last = now

      ctx.clearRect(0, 0, W, H)

      for (const p of particles) {
        // Sine float
        p.x += p.vx + Math.sin(t * p.speed + p.phase) * 0.25
        p.y += p.vy

        // Parallax offset based on depth
        const px = p.x + mouseX * p.z
        const py = p.y + mouseY * p.z

        // Wrap around edges
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W }
        if (px < -20)   p.x = W + 20
        if (px > W + 20) p.x = -20

        // Draw bokeh disc
        const r = p.size * (0.8 + p.z * 0.4)
        const grad = ctx.createRadialGradient(px, py, 0, px, py, r)
        grad.addColorStop(0,   p.color + (p.opacity) + ')')
        grad.addColorStop(0.4, p.color + (p.opacity * 0.5) + ')')
        grad.addColorStop(1,   p.color + '0)')

        ctx.globalCompositeOperation = 'lighter'
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}
