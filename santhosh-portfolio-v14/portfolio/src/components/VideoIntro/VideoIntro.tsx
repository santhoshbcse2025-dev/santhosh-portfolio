'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import CinematicLayer from '../CinematicLayer/CinematicLayer'
import styles from './VideoIntro.module.css'

export default function VideoIntro() {
  const sectionRef         = useRef<HTMLElement>(null)
  const videoRef           = useRef<HTMLVideoElement>(null)
  const bgVideoRef         = useRef<HTMLVideoElement>(null)
  const overlayRef         = useRef<HTMLDivElement>(null)
  const taglineRef         = useRef<HTMLSpanElement>(null)
  const firstNameRef       = useRef<HTMLDivElement>(null)
  const lastNameRef        = useRef<HTMLDivElement>(null)
  const subtitleRef        = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const soundBadgeRef      = useRef<HTMLDivElement>(null)
  const photoRef           = useRef<HTMLDivElement>(null)
  const videoWrapRef       = useRef<HTMLDivElement>(null)
  const bgLayerRef         = useRef<HTMLDivElement>(null)

  const [videoEnded, setVideoEnded] = useState(false)
  const [showBadge, setShowBadge]   = useState(true) // always show until clicked

  // ── Entrance animation after 500ms ────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.to(sectionRef.current,         { opacity: 1, duration: 1.2, ease: 'power3.out' })
      gsap.to(overlayRef.current,         { opacity: 1, duration: 1.8, delay: 0.2, ease: 'power3.out' })
      gsap.to(taglineRef.current,         { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: 'power3.out' })
      gsap.to(firstNameRef.current,       { opacity: 1, x: 0, duration: 1, delay: 0.9, ease: 'power3.out' })
      gsap.to(lastNameRef.current,        { opacity: 1, x: 0, duration: 1, delay: 1.05, ease: 'power3.out' })
      gsap.to(subtitleRef.current,        { opacity: 1, y: 0, duration: 0.9, delay: 1.3, ease: 'power3.out' })
      gsap.to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 1.6, ease: 'power3.out' })
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // ── Pulse badge ───────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      if (soundBadgeRef.current) {
        gsap.to(soundBadgeRef.current, {
          scale: 1.06, duration: 0.9, ease: 'power1.inOut', repeat: -1, yoyo: true
        })
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // ── Scroll pulse ──────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      const pulse = scrollIndicatorRef.current?.querySelector(`.${styles.scrollPulse}`)
      if (pulse) {
        gsap.to(pulse, {
          scaleY: 0.3, opacity: 0, transformOrigin: 'top center',
          duration: 1.4, ease: 'power2.inOut', repeat: -1, yoyo: true,
        })
      }
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  // ── Video ended → show photo ──────────────────────────────────
  const handleVideoEnd = useCallback(() => {
    const v  = videoRef.current
    const bv = bgVideoRef.current
    if (!v) return
    v.pause()
    if (bv) bv.pause()
    setVideoEnded(true)
    if (videoWrapRef.current)
      gsap.to(videoWrapRef.current, { opacity: 0, duration: 1.2 })
    if (bgLayerRef.current)
      gsap.to(bgLayerRef.current,   { opacity: 0, duration: 1.2 })
    if (photoRef.current)
      gsap.fromTo(photoRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1.8, delay: 0.6 }
      )
  }, [])

  // ── Click badge → unlock audio ────────────────────────────────
  const unlockAudio = () => {
    const v = videoRef.current
    if (!v) return
    setShowBadge(false)
    gsap.killTweensOf(soundBadgeRef.current)
    gsap.to(soundBadgeRef.current, { opacity: 0, scale: 0.85, y: -16, duration: 0.5 })

    v.muted = false
    v.volume = 1
    v.loop = false
    v.currentTime = 0
    v.play().catch(() => {
      v.muted = true
      v.play()
    })
  }

  const scrollToWork = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className={styles.hero} style={{ opacity: 0 }}>

      {/* ── Blurred ambient bg ── */}
      <div ref={bgLayerRef} className={styles.bgLayer}>
        <video ref={bgVideoRef} autoPlay loop muted playsInline className={styles.bgVideo}>
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className={styles.bgScrim} />
      </div>

      {/* ── Photo after video ends ── */}
      <div ref={photoRef} className={styles.photoLayer} style={{ opacity: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/santhosh-photo.png" alt="Santhosh B" className={styles.photoImg} />
        <div className={styles.photoOverlay} />
      </div>

      {/* ── Canvas particles ── */}
      <CinematicLayer />

      {/* ── Foreground video ── */}
      <div ref={videoWrapRef} className={styles.videoWrap}>
        <video
          ref={videoRef}
          autoPlay muted playsInline
          className={styles.fgVideo}
          onEnded={handleVideoEnd}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoVignette} />
      </div>

      {/* ── Overlays ── */}
      <div ref={overlayRef} className={styles.overlays} style={{ opacity: 0 }}>
        <div className={styles.overlayTop} />
        <div className={styles.overlayBottom} />
        <div className={styles.overlayLeft} />
        <div className={styles.overlayRight} />
        <div className={styles.overlayMid} />
      </div>

      {/* ── Content ── */}
      <div className={styles.content}>
        <span ref={taglineRef} className={styles.tagline}
          style={{ opacity: 0, transform: 'translateY(16px)' }}>
          Computer Science Engineer · Full Stack Developer
        </span>
        <div className={styles.nameBlock}>
          <div ref={firstNameRef} className={styles.firstName}
            style={{ opacity: 0, transform: 'translateX(-50px)' }}>SANTHOSH</div>
          <div ref={lastNameRef} className={styles.lastName}
            style={{ opacity: 0, transform: 'translateX(50px)' }}>B</div>
        </div>
        <div ref={subtitleRef} className={styles.subtitle}
          style={{ opacity: 0, transform: 'translateY(16px)' }}>
          <span className={styles.subtitleLine}>Crafting innovative software solutions</span>
          <span className={styles.subtitleDivider}>·</span>
          <span className={styles.subtitleLine}>Full Stack · ML · Problem Solving</span>
        </div>
      </div>

      {/* ── Sound badge — always visible until clicked ── */}
      {!videoEnded && (
        <div ref={soundBadgeRef} className={styles.soundBadge} onClick={unlockAudio}>
          <span className={styles.soundIcon}>🔊</span>
          <div className={styles.soundText}>
            <span className={styles.soundTitle}>Tap to hear audio</span>
            <span className={styles.soundSub}>Click to enable sound</span>
          </div>
        </div>
      )}

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollIndicatorRef}
        className={styles.scrollIndicator}
        onClick={scrollToWork}
        style={{ opacity: 0 }}
        role="button"
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollPulse} />
        </div>
      </div>
    </section>
  )
}
