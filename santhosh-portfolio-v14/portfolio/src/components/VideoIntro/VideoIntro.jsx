'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from './VideoIntro.module.css';

const CinematicLayer = dynamic(
  () => import('../CinematicLayer/CinematicLayer'),
  { ssr: false }
);

export default function VideoIntro({ videoSrc = '/hero-video.mp4', nextSectionId = 'about' }) {
  const videoRef      = useRef(null);
  const bgVideoRef    = useRef(null);
  const heroRef       = useRef(null);
  const contentRef    = useRef(null);
  const soundBadgeRef = useRef(null);

  const [isMuted,   setIsMuted]   = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded,  setIsLoaded]  = useState(false);
  const [showSound, setShowSound] = useState(true);

  // ── GSAP entrance ────────────────────────────────────────────────
  useEffect(() => {
    let gsap, ctx;

    async function runAnimations() {
      const mod = await import('gsap');
      gsap = mod.gsap || mod.default;

      if (!contentRef.current) return;

      const tl = gsap.timeline({ delay: 0.6 });

      tl.fromTo(
        contentRef.current.querySelector(`.${styles.tagline}`),
        { opacity: 0, y: 20, letterSpacing: '0.4em' },
        { opacity: 1, y: 0, letterSpacing: '0.25em', duration: 1.4, ease: 'power3.out' }
      )
      .fromTo(
        contentRef.current.querySelector(`.${styles.firstName}`),
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'expo.out' },
        '-=0.9'
      )
      .fromTo(
        contentRef.current.querySelector(`.${styles.lastName}`),
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'expo.out' },
        '-=1.1'
      )
      .fromTo(
        contentRef.current.querySelector(`.${styles.role}`),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
        '-=0.7'
      )
      .fromTo(
        contentRef.current.querySelector(`.${styles.divider}`),
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.9, ease: 'power2.inOut' },
        '-=0.8'
      )
      .fromTo(
        contentRef.current.querySelector(`.${styles.description}`),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
        '-=0.6'
      );
    }

    if (isLoaded) runAnimations();
    return () => { if (ctx) ctx.revert(); };
  }, [isLoaded]);

  // ── Auto-hide sound hint ──────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setShowSound(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // ── Video load ────────────────────────────────────────────────────
  const handleVideoLoad = useCallback(() => setIsLoaded(true), []);

  // ── Controls ──────────────────────────────────────────────────────
  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    setShowSound(false);
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      bgVideoRef.current?.play();
      setIsPlaying(true);
    } else {
      v.pause();
      bgVideoRef.current?.pause();
      setIsPlaying(false);
    }
  }, []);

  const scrollToNext = useCallback(() => {
    const el = document.getElementById(nextSectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  }, [nextSectionId]);

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* ── Ambient blurred BG video ── */}
      <div className={styles.bgLayer}>
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          aria-hidden="true"
        />
        <div className={styles.bgBlur} />
      </div>

      {/* ── Gradient overlays ── */}
      <div className={styles.gradientBottom} />
      <div className={styles.gradientTop} />
      <div className={styles.gradientLeft} />
      <div className={styles.vignetteEdge} />

      {/* ── Foreground video ── */}
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          className={styles.mainVideo}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          aria-label="Portfolio hero video"
        />
        <div className={styles.videoGlow} />
      </div>

      {/* ── Three.js cinematic layer ── */}
      <CinematicLayer />

      {/* ── Film grain overlay ── */}
      <div className={styles.grain} aria-hidden="true" />

      {/* ── Content ── */}
      <div className={`${styles.content} ${isLoaded ? styles.contentVisible : ''}`} ref={contentRef}>
        <span className={styles.tagline}>Full-Stack Engineer &amp; Creative Technologist</span>

        <h1 className={styles.nameStack}>
          <span className={styles.firstName}>ALEX</span>
          <span className={styles.lastName}>MORGAN</span>
        </h1>

        <div className={styles.divider} />

        <p className={styles.role}>
          Building immersive digital experiences at the intersection of
          <em> engineering</em> and <em>design</em>
        </p>

        <p className={styles.description}>
          Specializing in React · Next.js · Three.js · Motion Design
        </p>
      </div>

      {/* ── Controls ── */}
      <div className={styles.controls}>
        <button
          className={styles.controlBtn}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          className={styles.controlBtn}
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0017.73 19L19 20.27 20.27 19 5.27 4 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Sound hint badge ── */}
      <div className={`${styles.soundBadge} ${showSound ? styles.soundVisible : ''}`} ref={soundBadgeRef}>
        <span className={styles.soundDot} />
        Tap for sound
      </div>

      {/* ── Scroll indicator ── */}
      <button className={styles.scrollIndicator} onClick={scrollToNext} aria-label="Scroll to next section">
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine}>
          <span className={styles.scrollPulse} />
        </span>
      </button>
    </section>
  );
}
