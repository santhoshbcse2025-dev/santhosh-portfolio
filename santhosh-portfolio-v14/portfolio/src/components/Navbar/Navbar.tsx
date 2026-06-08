'use client'
import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Internships', href: '#internships' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        SB<span className={styles.logoDot}>.</span>
      </div>
      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {links.map(l => (
          <li key={l.label}>
            <button onClick={() => scrollTo(l.href)} className={styles.link}>
              {l.label}
            </button>
          </li>
        ))}
        <li>
          <a href="/resume.pdf" download className={styles.resumeBtn}>
            Resume
          </a>
        </li>
      </ul>
      <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span className={menuOpen ? styles.barOpen : ''} />
        <span className={menuOpen ? styles.barOpen : ''} />
        <span className={menuOpen ? styles.barOpen : ''} />
      </button>
    </nav>
  )
}
