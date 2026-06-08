import VideoIntro from '@/components/VideoIntro/VideoIntro'
import About from '@/components/About/About'
import Education from '@/components/Education/Education'
import Skills from '@/components/Skills/Skills'
import Projects from '@/components/Projects/Projects'
import Internships from '@/components/Internships/Internships'
import Certificates from '@/components/Certificates/Certificates'
import Contact from '@/components/Contact/Contact'
import Navbar from '@/components/Navbar/Navbar'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <VideoIntro />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Internships />
      <Certificates />
      <Contact />
    </main>
  )
}
