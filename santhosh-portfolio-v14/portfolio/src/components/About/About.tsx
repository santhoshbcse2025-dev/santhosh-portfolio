'use client'
import { useEffect, useRef } from 'react'
import styles from './About.module.css'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add(styles.visible)
        })
      },
      { threshold: 0.15 }
    )
    sectionRef.current?.querySelectorAll('.' + styles.animate).forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className={styles.section}>
      <div className={styles.container}>

        {/* Left — Photo + socials */}
        <div className={`${styles.left} ${styles.animate}`}>
          <div className={styles.photoWrap}>
            <div className={styles.photoPlaceholder}>
              <span>SB</span>
            </div>
            <div className={styles.photoGlow} />
          </div>
          <div className={styles.socials}>
            <a href="https://github.com/santhoshcse2007-lang" target="_blank" rel="noreferrer" className={styles.socialLink}>
              <GithubIcon /> santhoshcse2007-lang
            </a>
            <a href="https://www.linkedin.com/in/santhosh-b-aa5511383" target="_blank" rel="noreferrer" className={styles.socialLink}>
              <LinkedinIcon /> santhosh-b-aa5511383
            </a>
            <a href="mailto:santhosh.bcse2025@gmail.com" className={styles.socialLink}>
              <MailIcon /> santhosh.bcse2025@gmail.com
            </a>
            <a href="tel:+917010823256" className={styles.socialLink}>
              <PhoneIcon /> +91 7010823256
            </a>
          </div>
        </div>

        {/* Right — Bio */}
        <div className={styles.right}>
          <span className={`${styles.label} ${styles.animate}`}>About Me</span>
          <h2 className={`${styles.heading} ${styles.animate}`}>
            Passionate about building<br />
            <em>impactful software</em>
          </h2>
          <p className={`${styles.bio} ${styles.animate}`}>
            Hi, I&apos;m <strong>Santhosh B</strong>, a passionate and driven Computer Science &amp; Engineering
            student at <strong>Chennai Institute of Technology</strong>. I have a strong interest in web development
            and software engineering, with hands-on experience in Python and full-stack development.
          </p>
          <p className={`${styles.bio} ${styles.animate}`}>
            I love solving real-world problems through code and regularly challenge myself on LeetCode to sharpen
            my problem-solving skills — having solved <strong>250+ problems</strong> and earned the 50-day badge.
            I believe in learning every day and aim to build innovative, impactful software that makes a real difference.
          </p>
          <div className={styles.objectiveBox}>
            <span className={styles.objectiveLabel}>Career Objective</span>
            <p className={styles.objectiveText}>
              To secure a challenging role as a Software Developer where I can apply my programming skills,
              contribute to meaningful projects, and continuously grow as a technology professional while
              delivering innovative solutions to real-world problems.
            </p>
          </div>
          <div className={`${styles.statsRow} ${styles.animate}`}>
            <div className={styles.stat}>
              <span className={styles.statNum}>250+</span>
              <span className={styles.statLabel}>LeetCode Problems</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>3</span>
              <span className={styles.statLabel}>Internships</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>4</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}
function LinkedinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15v1.92z"/>
    </svg>
  )
}
