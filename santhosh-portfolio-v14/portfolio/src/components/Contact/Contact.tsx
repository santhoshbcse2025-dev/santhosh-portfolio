'use client'
import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import styles from './Contact.module.css'

const EMAILJS_SERVICE  = 'service_zvmaasf'
const EMAILJS_TEMPLATE = 'template_byi3g2i'
const EMAILJS_KEY      = 'yf1Mj7Brln9VDhcPX'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({ from_name: '', from_email: '', phone: '', message: '' })
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  useEffect(() => {
    emailjs.init(EMAILJS_KEY)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add(styles.visible)),
      { threshold: 0.08 }
    )
    sectionRef.current?.querySelectorAll('.' + styles.animate).forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const validate = () => {
    const e: Partial<typeof form> = {}
    if (!form.from_name.trim()) e.from_name = 'Name is required'
    if (!form.from_email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.from_email = 'Valid email required'
    if (form.phone && !form.phone.match(/^[+\d\s-]{7,15}$/)) e.phone = 'Invalid phone number'
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message too short (min 10 chars)'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setFormState('loading')

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name:  form.from_name,
          from_email: form.from_email,
          email:      form.from_email,  // matches {{email}} in template
          phone:      form.phone || 'Not provided',
          message:    form.message,
          to_name:    'Santhosh B',
          reply_to:   form.from_email,
        },
        EMAILJS_KEY
      )
      console.log('EmailJS success:', result)
      setFormState('success')
      setForm({ from_name: '', from_email: '', phone: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setFormState('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  return (
    <section ref={sectionRef} id="contact" className={styles.section}>
      <div className={styles.container}>

        {/* ── Left info ── */}
        <div className={`${styles.left} ${styles.animate}`}>
          <span className={styles.label}>Contact</span>
          <h2 className={styles.heading}>Let&apos;s <em>Connect</em></h2>
          <p className={styles.intro}>
            I&apos;m currently open to internship opportunities, full-time roles, and interesting
            collaborations. Fill in the form and I&apos;ll get back to you within 24 hours.
          </p>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>✉</span>
              <div>
                <span className={styles.infoLabel}>Email</span>
                <a href="mailto:santhosh.bcse2025@gmail.com" className={styles.infoValue}>
                  santhosh.bcse2025@gmail.com
                </a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>☎</span>
              <div>
                <span className={styles.infoLabel}>Phone</span>
                <a href="tel:+917010823256" className={styles.infoValue}>+91 7010823256</a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>⌖</span>
              <div>
                <span className={styles.infoLabel}>Location</span>
                <span className={styles.infoValue}>Tamil Nadu, India</span>
              </div>
            </div>
          </div>
          <div className={styles.socialRow}>
            <a href="https://github.com/santhoshcse2007-lang" target="_blank" rel="noreferrer" className={styles.socialBtn}>GitHub</a>
            <a href="https://www.linkedin.com/in/santhosh-b-aa5511383" target="_blank" rel="noreferrer" className={styles.socialBtn}>LinkedIn</a>
            <a href="https://leetcode.com" target="_blank" rel="noreferrer" className={styles.socialBtn}>LeetCode</a>
          </div>
        </div>

        {/* ── Right form ── */}
        <div className={`${styles.right} ${styles.animate}`} style={{ transitionDelay: '0.15s' }}>
          {formState === 'success' ? (
            <div className={styles.successBox}>
              <span className={styles.successIcon}>✓</span>
              <h3 className={styles.successTitle}>Message Sent!</h3>
              <p className={styles.successText}>
                Thanks for reaching out! Santhosh will reply within 24 hours.
              </p>
              <button className={styles.resetBtn} onClick={() => setFormState('idle')}>
                Send Another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Full Name *</label>
                  <input
                    type="text" name="from_name" value={form.from_name}
                    onChange={handleChange} placeholder="Your full name"
                    className={`${styles.input} ${errors.from_name ? styles.inputError : ''}`}
                  />
                  {errors.from_name && <span className={styles.errorMsg}>{errors.from_name}</span>}
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Email Address *</label>
                  <input
                    type="email" name="from_email" value={form.from_email}
                    onChange={handleChange} placeholder="you@example.com"
                    className={`${styles.input} ${errors.from_email ? styles.inputError : ''}`}
                  />
                  {errors.from_email && <span className={styles.errorMsg}>{errors.from_email}</span>}
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>
                  Phone Number <span className={styles.optional}>(optional)</span>
                </label>
                <input
                  type="tel" name="phone" value={form.phone}
                  onChange={handleChange} placeholder="+91 XXXXX XXXXX"
                  className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                />
                {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Message *</label>
                <textarea
                  name="message" value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about the opportunity or project..."
                  rows={5}
                  className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                />
                {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
              </div>

              {formState === 'error' && (
                <p className={styles.errorBanner}>
                  ⚠ Failed to send. Please email directly: santhosh.bcse2025@gmail.com
                </p>
              )}

              <button type="submit" className={styles.submitBtn} disabled={formState === 'loading'}>
                {formState === 'loading'
                  ? <><span className={styles.spinner} /> Sending...</>
                  : <>Send Message <span className={styles.arrow}>→</span></>
                }
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className={styles.footer}>
        <p className={styles.footerText}>
          Designed &amp; built by <strong>Santhosh B</strong> · CSE · Chennai Institute of Technology
        </p>
        <a href="/resume.pdf" download="Santhosh_B_Resume.pdf" className={styles.downloadBtn}>
          Download Resume ↓
        </a>
      </div>
    </section>
  )
}
