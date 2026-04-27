import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Clock3,
  Code2,
  Cpu,
  Gauge,
  GraduationCap,
  Hammer,
  Lightbulb,
  Mail,
  Rocket,
  Sparkles,
  Trophy,
  Users,
  Wrench
} from 'lucide-react'

const programs = [
  {
    icon: Bot,
    title: 'Robotics Cell',
    copy: 'Design, CAD, fabricate, program, test, and iterate competitive machines.',
    tags: ['FTC', 'VEX', 'Controls']
  },
  {
    icon: Code2,
    title: 'Software Studio',
    copy: 'Ship useful apps, dashboards, automation, and AI tools with real users in mind.',
    tags: ['Web', 'AI/ML', 'Data']
  },
  {
    icon: BrainCircuit,
    title: 'Research Track',
    copy: 'Turn ambitious questions into experiments, papers, fair submissions, and prototypes.',
    tags: ['ISEF', 'Papers', 'Patents']
  },
  {
    icon: Wrench,
    title: 'Build Sprints',
    copy: 'Weekend labs for electronics, sensors, 3D printing, drones, and rapid prototyping.',
    tags: ['CAD', 'Drones', 'IoT']
  }
]

const roadmap = [
  { step: '01', title: 'Apply', detail: 'Tell us what you build, what you want to learn, and how you show up.' },
  { step: '02', title: 'Interview', detail: 'We look for curiosity, follow-through, and strong team instincts.' },
  { step: '03', title: 'Launch', detail: 'Join a small build pod and start shipping in your first month.' }
]

const team = [
  { name: 'Shivmanas', role: 'President', focus: 'Systems + competition strategy' },
  { name: 'Dev', role: 'Vice President', focus: 'Engineering operations' },
  { name: 'Andrew', role: 'Outreach', focus: 'Community partnerships' },
  { name: 'Rick', role: 'Marketing', focus: 'Story, media, and launch' },
  { name: 'Vivaan', role: 'Recruitment', focus: 'Applicant experience' },
  { name: 'Dhruv', role: 'Secretary', focus: 'Documentation + logistics' }
]

const stats = [
  { value: '15', label: 'open seats' },
  { value: '4', label: 'build tracks' },
  { value: '1:1', label: 'mentor feedback' }
]

function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches

    if (reduceMotion || coarsePointer) {
      return
    }

    const dot = dotRef.current
    const halo = haloRef.current
    const spotlight = spotlightRef.current

    if (!dot || !halo || !spotlight) {
      return
    }

    const root = document.documentElement
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let haloX = targetX
    let haloY = targetY
    let animationFrame = 0

    const setTransform = (element: HTMLDivElement, x: number, y: number) => {
      element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }

    const animate = () => {
      haloX += (targetX - haloX) * 0.16
      haloY += (targetY - haloY) * 0.16
      setTransform(dot, targetX, targetY)
      setTransform(halo, haloX, haloY)
      setTransform(spotlight, haloX, haloY)
      animationFrame = window.requestAnimationFrame(animate)
    }

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      root.style.setProperty('--cursor-x', `${targetX}px`)
      root.style.setProperty('--cursor-y', `${targetY}px`)
      root.style.setProperty('--grid-shift-x', `${(targetX / window.innerWidth - 0.5) * 18}px`)
      root.style.setProperty('--grid-shift-y', `${(targetY / window.innerHeight - 0.5) * 18}px`)
      root.classList.add('cursor-active')

      const target = event.target
      const isInteractive =
        target instanceof Element &&
        Boolean(target.closest('a, button, input, textarea, select, [role="button"]'))

      root.classList.toggle('cursor-hover', isInteractive)
    }

    const handlePointerLeave = () => {
      root.classList.remove('cursor-active', 'cursor-hover', 'cursor-pressed')
    }

    const handlePointerDown = () => root.classList.add('cursor-pressed')
    const handlePointerUp = () => root.classList.remove('cursor-pressed')

    animationFrame = window.requestAnimationFrame(animate)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      root.classList.remove('cursor-active', 'cursor-hover', 'cursor-pressed')
    }
  }, [])

  return (
    <>
      <div ref={haloRef} className="cursor-halo" />
      <div ref={dotRef} className="cursor-dot" />
      <div ref={spotlightRef} className="cursor-spotlight" />
    </>
  )
}

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: '',
    message: ''
  })

  const progressBars = useMemo(() => [74, 48, 91, 63], [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Application received. We\'ll be in touch.')
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#fffaf0] text-[#241300]">
      <CursorEffect />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_10%,rgba(250,204,21,0.14),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(249,115,22,0.12),transparent_26%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.06] technical-grid" />

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#f4b24a]/10 bg-[#fffaf0]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-10">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden border-2 border-[#f97316] bg-[#facc15] shadow-[0_8px_24px_rgba(249,115,22,0.22)]">
              <img src="/kalam-project.jpeg" alt="Kalam Project" className="logo-warm h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-[#241300] sm:text-base">The Kalam Project</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#6b3f00]/55">Student engineering collective</p>
            </div>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {['About', 'Programs', 'Spots', 'Team'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="border border-transparent px-4 py-2 text-sm font-medium text-[#6b3f00]/72 transition hover:border-[#f4b24a]/20 hover:text-[#241300]"
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 border border-[#facc15] bg-[#facc15] px-4 py-2 text-sm font-bold text-[#241300] transition hover:bg-white"
          >
            Apply
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </nav>

      <main id="top" className="relative z-10">
        <section className="border-b border-[#f4b24a]/10 px-5 pt-32 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-8 pb-16 lg:min-h-[740px] lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              <p className="mb-5 inline-flex items-center gap-2 border border-[#facc15]/45 bg-[#facc15]/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f97316]">
                <Sparkles className="h-4 w-4" />
                15 spots available
              </p>
              <h1 className="max-w-4xl text-5xl font-black leading-[0.94] tracking-tight text-[#241300] sm:text-6xl lg:text-8xl">
                Build the impossible.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6b3f00]/72 sm:text-xl">
                Kalam is a selective student-run engineering lab for builders who want real projects,
                tough feedback, and teammates who move fast.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center gap-2 bg-[#facc15] px-6 py-4 font-black text-[#241300] transition hover:bg-white"
                >
                  Start application
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="#programs"
                  className="inline-flex items-center justify-center border border-[#f4b24a]/25 px-6 py-4 font-bold text-[#241300] transition hover:border-[#f4b24a] hover:bg-[#facc15]/20"
                >
                  Explore tracks
                </a>
              </div>
              <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="border border-[#f4b24a]/14 bg-white/80 p-4">
                    <p className="text-3xl font-black text-[#241300] sm:text-4xl">{stat.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#6b3f00]/55">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="relative"
            >
              <div className="absolute -inset-4 border border-[#facc15]/20" />
              <div className="relative border border-[#f4b24a]/18 bg-white/90 shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#f4b24a]/10 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 bg-[#ea580c]" />
                    <span className="h-2.5 w-2.5 bg-[#facc15]" />
                    <span className="h-2.5 w-2.5 bg-[#f97316]" />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6b3f00]/45">Kalam command</p>
                </div>
                <div className="grid gap-4 p-5 sm:grid-cols-2">
                  {[
                    ['Build queue', '04 active pods', Cpu],
                    ['Competition mode', 'FTC + ISEF', Trophy],
                    ['Lab hours', 'Sat + Sun', Clock3],
                    ['Mentor review', 'weekly', GraduationCap]
                  ].map(([label, value, Icon]) => (
                    <div key={label as string} className="border border-[#f4b24a]/12 bg-white/80 p-4">
                      <Icon className="mb-5 h-6 w-6 text-[#f97316]" />
                      <p className="text-xs uppercase tracking-[0.16em] text-[#6b3f00]/45">{label as string}</p>
                      <p className="mt-2 text-xl font-black text-[#241300]">{value as string}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#f4b24a]/10 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-semibold text-[#241300]">Project velocity</p>
                    <p className="font-mono text-sm text-[#f97316]">LIVE</p>
                  </div>
                  <div className="space-y-4">
                    {['Robot CAD', 'AI prototype', 'Outreach deck', 'Sensor rig'].map((label, index) => (
                      <div key={label}>
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="text-[#6b3f00]/70">{label}</span>
                          <span className="font-mono text-[#6b3f00]/50">{progressBars[index]}%</span>
                        </div>
                        <div className="h-2 bg-[#facc15]/20">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressBars[index]}%` }}
                            transition={{ duration: 1, delay: 0.35 + index * 0.1 }}
                            className="h-full bg-[#facc15]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid border-t border-[#f4b24a]/10 sm:grid-cols-3">
                  {roadmap.map((item) => (
                    <div key={item.step} className="border-[#f4b24a]/10 p-5 sm:border-r sm:last:border-r-0">
                      <p className="font-mono text-sm text-[#f97316]">{item.step}</p>
                      <p className="mt-2 font-bold text-[#241300]">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="px-5 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="section-kicker">Our Mission</p>
              <h2 className="section-title">Not a club. A build floor.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#6b3f00]/68">
                Kalam gives motivated students a place to practice like engineers: sketch the idea,
                test the prototype, learn from the failure, and come back with a stronger version.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Hammer, title: 'Build', copy: 'Real hardware, real code, real iteration cycles.' },
                { icon: Trophy, title: 'Compete', copy: 'Prepare for fairs, robotics events, and hackathons.' },
                { icon: Rocket, title: 'Ship', copy: 'Turn prototypes into useful public work.' }
              ].map(({ icon: Icon, title, copy }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group border border-[#f4b24a]/14 bg-white/80 p-6 transition hover:-translate-y-1 hover:border-[#facc15]/60 hover:bg-[#fff3d6]"
                >
                  <Icon className="h-8 w-8 text-[#f97316] transition group-hover:text-[#f97316]" />
                  <h3 className="mt-8 text-2xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#6b3f00]/62">{copy}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="programs" className="border-y border-[#f4b24a]/10 bg-[#ffffff] px-5 py-20 text-[#241300] sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f97316]">Programs</p>
                <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">A cleaner path from idea to artifact.</h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-[#704214]">
                Members join focused tracks with clear expectations, shared equipment time, and
                enough room to turn ambitious ideas into visible work.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-4">
              {programs.map(({ icon: Icon, title, copy, tags }) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border border-[#f3c56b] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#f97316] hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-[#fffaf0] text-[#f97316]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-8 text-xl font-black">{title}</h3>
                  <p className="mt-3 min-h-[96px] text-sm leading-6 text-[#704214]">{copy}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="border border-[#f3c56b] px-2.5 py-1 text-xs font-bold text-[#7c4a03]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="spots" className="px-5 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="section-kicker">Limited Spots</p>
              <h2 className="section-title">Small on purpose.</h2>
              <p className="mt-5 text-base leading-8 text-[#6b3f00]/68">
                Kalam stays intentionally small so every member gets attention, accountability, and
                a team that notices when the work slows down.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { grade: '6th Grade', spots: 2, tone: 'border-[#f97316]/50' },
                { grade: '7th Grade', spots: 2, tone: 'border-[#facc15]/55' },
                { grade: '8th Grade', spots: 3, tone: 'border-[#f97316]/45' },
                { grade: 'High School+', spots: 8, tone: 'border-[#ea580c]/45' }
              ].map((item) => (
                <div key={item.grade} className={`border ${item.tone} bg-white/80 p-6`}>
                  <p className="text-sm uppercase tracking-[0.14em] text-[#6b3f00]/48">{item.grade}</p>
                  <div className="mt-6 flex items-end justify-between">
                    <p className="text-5xl font-black">{item.spots}</p>
                    <p className="pb-2 text-sm font-semibold text-[#6b3f00]/62">spots</p>
                  </div>
                </div>
              ))}
              <div className="border border-[#facc15]/40 bg-[#facc15]/10 p-6 sm:col-span-2">
                <div className="grid gap-5 sm:grid-cols-3">
                  {roadmap.map((item) => (
                    <div key={item.step}>
                      <p className="font-mono text-sm text-[#f97316]">{item.step}</p>
                      <h3 className="mt-2 text-xl font-black">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#6b3f00]/62">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="bg-[#fff3d6] px-5 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="section-kicker">Leadership</p>
                <h2 className="section-title">People behind the pace.</h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-[#6b3f00]/62">
                The leadership team keeps projects moving, supports new members, and turns big ideas
                into organized build cycles.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group border border-[#f4b24a]/14 bg-white/80 p-6 transition hover:border-[#facc15]/55 hover:bg-[#fff3d6]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center bg-[#facc15] text-2xl font-black text-[#241300]">
                      {member.name[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-black">{member.name}</h3>
                      <p className="text-sm font-semibold text-[#f97316]">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-6 border-t border-[#f4b24a]/10 pt-5 text-sm leading-6 text-[#6b3f00]/62">{member.focus}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="apply" className="px-5 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="section-kicker">Join Us</p>
              <h2 className="section-title">Bring the project you cannot stop thinking about.</h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  ['Consistency', Gauge],
                  ['Collaboration', Users],
                  ['Initiative', Lightbulb]
                ].map(([value, Icon]) => (
                  <div key={value as string} className="flex items-center gap-3 border border-[#f4b24a]/14 bg-white/80 p-4">
                    <Icon className="h-5 w-5 text-[#f97316]" />
                    <span className="text-sm font-bold uppercase tracking-[0.12em] text-[#6b3f00]/72">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="border border-[#f4b24a]/14 bg-white/80 p-5 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-field"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-field"
                  required
                />
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="form-field sm:col-span-2"
                  required
                >
                  <option value="">Select Grade</option>
                  <option value="6th">6th Grade</option>
                  <option value="7th">7th Grade</option>
                  <option value="8th">8th Grade</option>
                  <option value="hs">High School+</option>
                </select>
                <textarea
                  placeholder="Why Kalam? What do you want to build?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="form-field resize-none sm:col-span-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-[#facc15] px-8 py-5 text-lg font-black text-[#241300] transition hover:bg-white"
              >
                Submit application
                <Mail className="h-5 w-5" />
              </button>
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#f4b24a]/10 px-5 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden border-2 border-[#f97316] bg-[#facc15]">
              <img src="/kalam-project.jpeg" alt="Kalam Project" className="logo-warm h-full w-full object-cover" />
            </div>
            <p className="text-sm font-semibold text-[#6b3f00]/70">The Kalam Project</p>
          </div>
          <p className="text-sm text-[#6b3f00]/45">2026 student engineering collective. Built for ambitious makers.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
