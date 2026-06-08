'use client'
import { useEffect, useRef } from 'react'
import styles from './Internships.module.css'

const internships = [
  {
    role: 'Full Stack Development Intern',
    company: 'Teckkey',
    duration: 'Dec 5, 2025 – Jan 19, 2026',
    type: 'Completed & Certified',
    skills: ['Frontend Development', 'Backend Development', 'Web Applications', 'Database Management'],
    color: 'green',
  },
  {
    role: 'DSA (C++) Programming Intern',
    company: 'InternPE',
    duration: 'May 4, 2026 – May 31, 2026 · 4 Weeks',
    type: 'Completed',
    skills: ['Data Structures & Algorithms', 'C++ Programming', 'Problem Solving'],
    color: 'blue',
  },
  {
    role: 'Machine Learning Intern',
    company: 'Persevex LLP',
    duration: 'Jul 1, 2026 – Sep 30, 2026 · 3 Months',
    type: 'Stipend: ₹15,000',
    skills: ['Machine Learning', 'Python', 'Model Building'],
    color: 'orange',
  },
]

export default function Internships() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add(styles.visible)),
      { threshold: 0.08 }
    )
    sectionRef.current?.querySelectorAll('.' + styles.animate).forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="internships" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} ${styles.animate}`}>
          <span className={styles.label}>Experience</span>
          <h2 className={styles.heading}>Internships &amp; <em>Work</em></h2>
        </div>
        <div className={styles.list}>
          {internships.map((intern, i) => (
            <div key={i} className={`${styles.card} ${styles.animate} ${styles[intern.color]}`} style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className={styles.cardLeft}>
                <div className={styles.iconWrap}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                  </svg>
                </div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <div>
                    <h3 className={styles.role}>{intern.role}</h3>
                    <p className={styles.company}>{intern.company}</p>
                  </div>
                  <div className={styles.cardMeta}>
                    <span className={styles.duration}>{intern.duration}</span>
                    <span className={styles.typeBadge}>{intern.type}</span>
                  </div>
                </div>
                <div className={styles.skillTags}>
                  {intern.skills.map(s => <span key={s} className={styles.skillTag}>{s}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
