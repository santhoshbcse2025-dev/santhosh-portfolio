'use client'
import { useEffect, useRef } from 'react'
import styles from './Certificates.module.css'

const certificates = [
  { title: 'Full Stack Development', issuer: 'Teckkey (Internship Certificate)', year: '2026', category: 'Full Stack', link: '#' },
  { title: 'DSA with C++ Programming', issuer: 'InternPE', year: '2026', category: 'DSA / C++', link: '#' },
  { title: 'Machine Learning', issuer: 'Persevex LLP', year: '2026', category: 'ML / AI', link: '#' },
  { title: 'Solving 50 Problems in C++', issuer: 'Skill Certificates', year: '2025', category: 'Problem Solving', link: '#' },
  { title: 'Python Programming', issuer: 'Online Platform', year: '2025', category: 'Programming', link: '#' },
  { title: 'Web Development Basics', issuer: 'Online Platform', year: '2024', category: 'Web Dev', link: '#' },
]

const achievements = [
  { icon: '🏆', title: 'LeetCode — 250+ Problems Solved', desc: '50-day streak badge earned' },
  { icon: '⭐', title: 'C++ Problem Solving Certificate', desc: '50 very easy problems solved on Skill platform' },
  { icon: '💼', title: '3 Internships Completed', desc: 'Full Stack · DSA · Machine Learning' },
  { icon: '🎓', title: 'Chennai Institute of Technology', desc: 'B.E. CSE · 2023–2027' },
]

export default function Certificates() {
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
    <section ref={sectionRef} id="certificates" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} ${styles.animate}`}>
          <span className={styles.label}>Certifications & Achievements</span>
          <h2 className={styles.heading}>Credentials &amp; <em>Recognition</em></h2>
        </div>
        <div className={styles.twoCol}>
          <div>
            <h3 className={`${styles.subHeading} ${styles.animate}`}>Certifications</h3>
            <div className={styles.certGrid}>
              {certificates.map((c, i) => (
                <a key={i} href={c.link} target="_blank" rel="noreferrer" className={`${styles.certCard} ${styles.animate}`} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className={styles.certTop}>
                    <span className={styles.certCategory}>{c.category}</span>
                    <span className={styles.certYear}>{c.year}</span>
                  </div>
                  <h4 className={styles.certTitle}>{c.title}</h4>
                  <p className={styles.certIssuer}>{c.issuer}</p>
                  <span className={styles.certView}>View Certificate →</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className={`${styles.subHeading} ${styles.animate}`}>Achievements</h3>
            <div className={styles.achieveList}>
              {achievements.map((a, i) => (
                <div key={i} className={`${styles.achieveCard} ${styles.animate}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <span className={styles.achieveIcon}>{a.icon}</span>
                  <div>
                    <h4 className={styles.achieveTitle}>{a.title}</h4>
                    <p className={styles.achieveDesc}>{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
