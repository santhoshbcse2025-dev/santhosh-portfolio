'use client'
import { useEffect, useRef } from 'react'
import styles from './Education.module.css'

const education = [
  {
    degree: 'B.E. Computer Science & Engineering',
    institution: 'Chennai Institute of Technology',
    batch: '2023 – 2027',
    cgpa: 'Pursuing',
    coursework: ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks', 'Software Engineering', 'Machine Learning'],
  },
  {
    degree: 'Higher Secondary (12th)',
    institution: 'CEOA Matriculation Higher Secondary School, Madurai',
    batch: '2021 – 2023',
    cgpa: 'XX%',
    coursework: [],
  },
]

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add(styles.visible)),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.' + styles.animate).forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="education" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} ${styles.animate}`}>
          <span className={styles.label}>Education</span>
          <h2 className={styles.heading}>Academic <em>Background</em></h2>
        </div>
        <div className={styles.timeline}>
          {education.map((edu, i) => (
            <div key={i} className={`${styles.card} ${styles.animate}`} style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className={styles.cardLeft}>
                <div className={styles.dot} />
                {i < education.length - 1 && <div className={styles.line} />}
              </div>
              <div className={styles.cardRight}>
                <div className={styles.cardTop}>
                  <div>
                    <h3 className={styles.degree}>{edu.degree}</h3>
                    <p className={styles.institution}>{edu.institution}</p>
                  </div>
                  <div className={styles.metaRight}>
                    <span className={styles.batch}>{edu.batch}</span>
                    <span className={styles.cgpa}>{edu.cgpa}</span>
                  </div>
                </div>
                {edu.coursework.length > 0 && (
                  <div className={styles.coursework}>
                    <span className={styles.courseLabel}>Relevant Coursework</span>
                    <div className={styles.tags}>
                      {edu.coursework.map(c => <span key={c} className={styles.tag}>{c}</span>)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
