'use client'
import { useEffect, useRef } from 'react'
import styles from './Skills.module.css'

const skillGroups = [
  {
    category: 'Languages',
    icon: '{ }',
    skills: [
      { name: 'C', level: 82 },
      { name: 'C++', level: 85 },
      { name: 'Python', level: 80 },
    ],
  },
  {
    category: 'Web Technologies',
    icon: '</>',
    skills: [
      { name: 'HTML', level: 88 },
      { name: 'CSS', level: 85 },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: '⚙',
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'VS Code', level: 95 },
    ],
  },
  {
    category: 'Problem Solving',
    icon: '★',
    skills: [
      { name: 'LeetCode (250+ problems)', level: 80 },
      { name: 'DSA (C++)', level: 82 },
      { name: 'Communication', level: 88 },
      { name: 'Teamwork', level: 90 },
    ],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible)
            const bars = e.target.querySelectorAll('[data-level]') as NodeListOf<HTMLElement>
            bars.forEach(bar => {
              const level = bar.getAttribute('data-level')
              setTimeout(() => { bar.style.width = level + '%' }, 300)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.' + styles.animate).forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} ${styles.animate}`}>
          <span className={styles.label}>Skills</span>
          <h2 className={styles.heading}>Technical <em>Expertise</em></h2>
        </div>
        <div className={styles.grid}>
          {skillGroups.map((group, i) => (
            <div key={group.category} className={`${styles.card} ${styles.animate}`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>{group.icon}</span>
                <h3 className={styles.cardTitle}>{group.category}</h3>
              </div>
              <div className={styles.skillList}>
                {group.skills.map(skill => (
                  <div key={skill.name} className={styles.skillRow}>
                    <div className={styles.skillMeta}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillPct}>{skill.level}%</span>
                    </div>
                    <div className={styles.barTrack}>
                      <div className={styles.barFill} data-level={skill.level} style={{ width: '0%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
