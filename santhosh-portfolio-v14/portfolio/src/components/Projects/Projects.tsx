'use client'
import { useEffect, useRef } from 'react'
import styles from './Projects.module.css'

const projects = [
  {
    number: '01',
    title: 'Skill Swap Platform',
    description: 'A peer-to-peer skill exchange platform where users can offer their expertise and learn new skills from others — no money involved, just knowledge sharing. Built to democratize learning in communities.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Python'],
    role: 'Full Stack Developer',
    github: 'https://github.com/santhoshbcse2025-dev',
    demo: '#',
    tag: 'Web App',
  },
  {
    number: '02',
    title: 'AI Crop Disease Detection',
    description: 'An AI-powered system using CNN (TensorFlow) to detect diseases from leaf images. Features Tamil voice output, offline mode for rural areas, WhatsApp alerts, nearby pesticide shop finder, weather-based disease risk prediction, and a Tamil farmer community chat.',
    tech: ['Python', 'TensorFlow', 'CNN', 'Flask', 'OpenCV'],
    role: 'ML Engineer & Backend Developer',
    github: 'https://github.com/santhoshbcse2025-dev',
    demo: '#',
    tag: 'Machine Learning',
    highlight: true,
  },
  {
    number: '03',
    title: 'Hospital Queue Management',
    description: 'A smart queue management system for hospitals that reduces patient waiting time by intelligently assigning tokens, tracking doctor availability, and sending real-time status updates to patients.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Python'],
    role: 'Full Stack Developer',
    github: 'https://github.com/santhoshbcse2025-dev',
    demo: '#',
    tag: 'Web App',
  },
  {
    number: '04',
    title: 'Cybersecurity Malicious Link Detection',
    description: 'A machine learning model that detects and classifies malicious URLs in real time. Helps protect users from phishing, malware, and scam links by analyzing URL patterns and features with high accuracy.',
    tech: ['Python', 'Scikit-learn', 'Flask', 'ML'],
    role: 'ML Developer',
    github: 'https://github.com/santhoshbcse2025-dev',
    demo: '#',
    tag: 'Cybersecurity',
  },
]

export default function Projects() {
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
    <section ref={sectionRef} id="projects" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} ${styles.animate}`}>
          <span className={styles.label}>Projects</span>
          <h2 className={styles.heading}>What I&apos;ve <em>Built</em></h2>
        </div>
        <div className={styles.grid}>
          {projects.map((p, i) => (
            <article
              key={p.number}
              className={`${styles.card} ${styles.animate} ${p.highlight ? styles.highlighted : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className={styles.cardTop}>
                <span className={styles.number}>{p.number}</span>
                <span className={styles.tag}>{p.tag}</span>
              </div>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.desc}>{p.description}</p>
              <div className={styles.roleLine}>
                <span className={styles.roleLabel}>Role</span>
                <span className={styles.roleVal}>{p.role}</span>
              </div>
              <div className={styles.techRow}>
                {p.tech.map(t => <span key={t} className={styles.techTag}>{t}</span>)}
              </div>
              <div className={styles.links}>
                <a href={p.github} target="_blank" rel="noreferrer" className={styles.linkBtn}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  GitHub
                </a>
                <a href={p.demo} target="_blank" rel="noreferrer" className={`${styles.linkBtn} ${styles.linkBtnAlt}`}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Live Demo
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
