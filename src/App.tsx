import { FormEvent, useState } from 'react'
import {
  ArrowRight,
  Atom,
  Beaker,
  Bot,
  BookOpen,
  Building2,
  ChevronRight,
  Cpu,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Mail,
  Microscope,
  Rocket,
  Users,
  Wrench
} from 'lucide-react'

const donationUrl = 'https://hcb.hackclub.com/donations/start/the-kalam-project'
const signupEndpoint = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL?.trim()

const pillars = [
  { icon: Lightbulb, name: 'Dream', detail: 'Imagine solutions that serve a real community.' },
  { icon: BookOpen, name: 'Learn', detail: 'Build STEM confidence through hands-on practice.' },
  { icon: Wrench, name: 'Innovate', detail: 'Prototype, test, research, and improve.' },
  { icon: Users, name: 'Lead', detail: 'Share skills and grow opportunities locally.' }
]

const programs = [
  {
    icon: Wrench,
    title: 'Makerspace',
    copy: 'Hands-on access to 3D printing, electronics, fabrication, CAD, and practical engineering design.',
    detail: 'Build and prototype'
  },
  {
    icon: Bot,
    title: 'Robotics',
    copy: 'Student teams learn design, programming, construction, and competition strategy together.',
    detail: 'Compete and collaborate'
  },
  {
    icon: Microscope,
    title: 'Research Papers',
    copy: 'Students investigate STEM topics, develop technical writing, and publish thoughtful work.',
    detail: 'Research and present'
  },
  {
    icon: HeartHandshake,
    title: 'Volunteering',
    copy: 'Mentor younger learners, host workshops, support outreach, and earn meaningful service experience.',
    detail: 'Serve and mentor'
  }
]

const opportunities = [
  { icon: Building2, title: 'Start a chapter', copy: 'Bring workshops, robotics, and maker learning to your school or community.' },
  { icon: Cpu, title: 'Join a robotics team', copy: 'Design, code, build, and prepare for collaborative competition projects.' },
  { icon: Beaker, title: 'Explore research', copy: 'Turn a STEM question into experimentation, writing, and presentation.' }
]

const leaders = [
  { name: 'Manas Kamarsu', role: 'President' },
  { name: 'Dhruv Agrawal', role: 'Vice President' },
  { name: 'Vihaan Sangar', role: 'Secretary' },
  { name: 'Akhil Ruddaraju', role: 'Treasurer' },
  { name: 'Vivaan Parikh', role: 'Director of Recruitment' },
  { name: 'Malcolm Hertzberg', role: 'Director of Marketing' },
  { name: 'Akaash Deepak', role: 'Director of Engineering' },
  { name: 'Brayan Nguyen', role: 'Director of Outreach' }
]

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="brand" aria-label="The Kalam Project home">
      <img src="/images/kalam-logo-crop.jpg" alt="" className={compact ? 'brand-image compact' : 'brand-image'} />
    </a>
  )
}

function SectionHeading({
  title,
  copy,
  centered = false
}: {
  title: string
  copy?: string
  centered?: boolean
}) {
  return (
    <div className={centered ? 'section-heading centered' : 'section-heading'}>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function App() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError('')

    if (!signupEndpoint) {
      setSubmitError('The signup form is not connected yet. Add the Google Apps Script web app URL to enable submissions.')
      return
    }

    const form = event.currentTarget
    const data = new FormData(form)
    const body = new URLSearchParams({
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      interest: String(data.get('interest') ?? ''),
      submittedAt: new Date().toISOString(),
      source: 'kalam-website'
    })

    setIsSubmitting(true)

    try {
      // Apps Script web apps do not return readable cross-origin responses without a proxy.
      await fetch(signupEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body
      })
      form.reset()
      setSubmitted(true)
    } catch {
      setSubmitError('We could not send your information right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="nav-container">
          <Logo />
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#programs">Programs</a>
            <a href="#chapters">Chapters</a>
            <a href="#team">Team</a>
            <a href="#involved">Get involved</a>
          </nav>
          <a className="button button-primary nav-button" href={donationUrl} target="_blank" rel="noreferrer">
            Donate
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="content-container hero-grid">
            <div className="hero-copy">
              <h1>
                Dream.
                <br />
                Build. Lead.
              </h1>
              <p className="hero-intro">
                The Kalam Project empowers young minds through STEM education, innovation, and values,
                creating space for students to learn by building together.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#involved">
                  Get involved <ArrowRight />
                </a>
                <a className="button button-secondary" href="#chapters">
                  Start a chapter
                </a>
              </div>
            </div>
            <figure className="hero-media">
              <img
                src="/images/students-makerspace-hero.jpg"
                alt="Students assembling a small robot together in a makerspace."
              />
              <figcaption>
                <Rocket />
                Makers build the future.
              </figcaption>
            </figure>
          </div>

          <div className="pillar-rail">
            <div className="content-container pillars">
              {pillars.map(({ icon: Icon, name, detail }) => (
                <div className="pillar" key={name}>
                  <Icon />
                  <div>
                    <p>{name}</p>
                    <span>{detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="mission content-container">
          <div className="mission-statement">
            <h2>STEM should feel possible, practical, and shared.</h2>
          </div>
          <div className="mission-copy">
            <p>
              Inspired by A. P. J. Abdul Kalam, this student-led organization gives young innovators the
              tools, mentorship, and community to solve real problems through science, technology,
              engineering, and mathematics.
            </p>
            <div className="mission-topics" aria-label="Focus areas">
              <span><Atom /> Science</span>
              <span><Cpu /> Technology</span>
              <span><Wrench /> Engineering</span>
              <span><GraduationCap /> Mathematics</span>
            </div>
          </div>
        </section>

        <section id="programs" className="programs-section">
          <div className="content-container">
            <SectionHeading
              title="Where students turn curiosity into action."
              copy="From first experiments to leadership roles, Kalam programs connect technical skills with service and collaboration."
            />
            <div className="program-grid">
              {programs.map(({ icon: Icon, title, copy, detail }) => (
                <article
                  className="program"
                  key={title}
                >
                  <Icon />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <span>{detail} <ChevronRight /></span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="chapters" className="chapters-section">
          <div className="content-container chapters-grid">
            <div>
              <SectionHeading
                title="Bring Kalam to your school."
                copy="Student-led chapters expand makerspace learning, robotics, outreach events, and small-scale engineering projects into local communities."
              />
              <a className="text-link" href="#involved">
                Start a chapter application <ArrowRight />
              </a>
            </div>
            <div className="opportunity-list">
              {opportunities.map(({ icon: Icon, title, copy }) => (
                <article key={title}>
                  <Icon />
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="research-band">
          <div className="content-container research-grid">
            <div className="research-art" aria-hidden="true">
              <Globe2 />
              <Bot />
            </div>
            <div>
              <h2>Research. Robotics. Real community impact.</h2>
              <p>
                Kalam students can investigate emerging technologies, develop technical communication,
                work on robotics projects, mentor peers, and give back through service.
              </p>
            </div>
          </div>
        </section>

        <section id="team" className="team-section content-container">
          <SectionHeading
            title="Led by students, built for students."
            copy="A growing leadership team coordinates engineering, outreach, recruiting, marketing, chapters, and youth programming."
            centered
          />
          <div className="leader-grid">
            {leaders.map((leader) => (
              <div className="leader" key={leader.name}>
                <span>{leader.name.charAt(0)}</span>
                <div>
                  <h3>{leader.name}</h3>
                  <p>{leader.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="involved" className="involved-section">
          <div className="content-container involved-grid">
            <div>
              <SectionHeading
                title="Join the work."
                copy="Volunteer, start a chapter, join a STEM initiative, or help provide tools for student builders."
              />
              <div className="support-callout">
                <HeartHandshake />
                <div>
                  <h3>Support young makers</h3>
                  <p>Donations help fund materials, tools, and hands-on learning opportunities.</p>
                  <a href={donationUrl} target="_blank" rel="noreferrer">Donate through HCB <ArrowRight /></a>
                </div>
              </div>
            </div>
            <form className="interest-form" onSubmit={handleSubmit}>
              <h3>Get involved</h3>
              {submitted ? (
                <div className="success-message" role="status">
                  <Mail />
                  <p>Thanks for reaching out. The Kalam team can follow up with next steps.</p>
                </div>
              ) : (
                <>
                  <label>
                    Name
                    <input required name="name" placeholder="Your name" />
                  </label>
                  <label>
                    Email
                    <input required name="email" type="email" placeholder="you@email.com" />
                  </label>
                  <label>
                    I am interested in
                    <select required name="interest" defaultValue="">
                      <option value="" disabled>Select one</option>
                      <option>Starting a chapter</option>
                      <option>Volunteering</option>
                      <option>Robotics or STEM programs</option>
                      <option>Supporting the organization</option>
                    </select>
                  </label>
                  {submitError && <p className="form-error" role="alert">{submitError}</p>}
                  <button className="button button-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send interest'} <ArrowRight />
                  </button>
                </>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="content-container footer-grid">
          <Logo compact />
          <p>Igniting minds. Inspiring innovation. Building a better future.</p>
          <div className="footer-links">
            <a href="#programs">Programs</a>
            <a href="#chapters">Chapters</a>
            <a href="#involved">Get involved</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
