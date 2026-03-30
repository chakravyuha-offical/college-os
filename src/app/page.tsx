import Link from 'next/link';

const features = [
  {
    icon: 'calendar_month',
    title: 'Smart Timetable',
    desc: 'Conflict detection, real-time "Now!" indicators, and day-by-day views.',
    gradient: 'from-indigo-500 to-blue-500',
    glow: 'rgba(99, 102, 241, 0.15)',
  },
  {
    icon: 'fact_check',
    title: 'Live Attendance',
    desc: 'Teachers mark in seconds. Parents get instant SMS alerts for absences.',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16, 185, 129, 0.15)',
  },
  {
    icon: 'assignment',
    title: 'Assignments',
    desc: 'Create, submit, grade — with deadline tracking and resubmission support.',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'rgba(245, 158, 11, 0.15)',
  },
  {
    icon: 'quiz',
    title: 'Exams & Results',
    desc: 'CIE & SEE management, VTU result import, and auto-calculated analytics.',
    gradient: 'from-rose-500 to-red-500',
    glow: 'rgba(239, 68, 68, 0.15)',
  },
  {
    icon: 'analytics',
    title: 'Deep Analytics',
    desc: 'Attendance trends, at-risk students, engagement scores, PDF/CSV export.',
    gradient: 'from-violet-500 to-purple-500',
    glow: 'rgba(139, 92, 246, 0.15)',
  },
  {
    icon: 'family_restroom',
    title: 'Parent Portal',
    desc: 'Real-time child monitoring, teacher DM, and grade notifications.',
    gradient: 'from-pink-500 to-rose-500',
    glow: 'rgba(236, 72, 153, 0.15)',
  },
];

const stats = [
  { value: '10+', label: 'Colleges', icon: 'apartment' },
  { value: '5,000+', label: 'Students', icon: 'groups' },
  { value: '99.9%', label: 'Uptime', icon: 'speed' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--surface-bg)] text-[var(--text-primary)] overflow-hidden">
      {/* ===== HERO ===== */}
      <div className="relative min-h-screen flex flex-col">
        {/* Background FX */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#6366F1]/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#EC4899]/6 rounded-full blur-[140px]" />
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-[#8B5CF6]/4 rounded-full blur-[160px]" />
          <div className="grid-pattern absolute inset-0" />
        </div>

        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between px-6 lg:px-16 py-5">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center"
              style={{ boxShadow: '0 0 24px rgba(99,102,241,0.35)' }}
            >
              <span className="material-symbols-outlined text-white text-[22px]">school</span>
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight block leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
                College OS
              </span>
              <span className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Campus Platform
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-white transition-colors rounded-[12px] hover:bg-white/5"
            >
              Sign In
            </Link>
            <Link
              href="/register-college"
              className="px-6 py-2.5 text-[0.72rem] font-bold uppercase tracking-wider bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-[14px] hover:brightness-110 transition-all"
              style={{ boxShadow: '0 4px 24px rgba(99,102,241,0.3)' }}
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pb-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-light mb-10">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
              Now in Beta — Built for Modern Colleges
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black leading-[1] tracking-tight mb-7"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="block text-white">The Operating</span>
            <span className="block gradient-text animate-gradient py-1">
              System for
            </span>
            <span className="block text-white">Your College</span>
          </h1>

          {/* Sub */}
          <p className="text-base lg:text-lg text-[var(--text-secondary)] max-w-xl mb-12 leading-relaxed">
            Timetables, attendance, assignments, exams, analytics, parent portals
            — everything your institution needs in one platform.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register-college"
              className="group relative px-8 py-4 text-[0.8rem] font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-[16px] hover:brightness-110 transition-all inline-flex items-center gap-2 overflow-hidden"
              style={{ boxShadow: '0 8px 32px rgba(99,102,241,0.3)' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Free Trial
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </span>
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 text-[0.8rem] font-extrabold uppercase tracking-wider text-[var(--text-secondary)] rounded-[16px] border border-white/8 hover:bg-white/5 hover:border-white/15 hover:text-white transition-all inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">explore</span>
              Explore Features
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-10 mt-20">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[18px] text-[var(--primary)]">{stat.icon}</span>
                  <p className="text-2xl lg:text-3xl font-extrabold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                    {stat.value}
                  </p>
                </div>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]/40">Scroll</span>
          <span className="material-symbols-outlined text-[var(--text-muted)]/40 text-[18px]">expand_more</span>
        </div>
      </div>

      {/* ===== FEATURES ===== */}
      <section id="features" className="relative py-28 px-6 lg:px-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#6366F1]/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-light mb-5">
              <span className="material-symbols-outlined text-[14px] text-[var(--primary)]">auto_awesome</span>
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                Features
              </span>
            </div>
            <h2
              className="text-3xl lg:text-5xl font-black"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Everything You Need
            </h2>
            <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto">
              A complete suite of tools designed to streamline every aspect of campus management.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group relative p-6 rounded-[20px] glass-card hover:border-white/12 transition-all duration-300 cursor-default"
                style={{
                  animationDelay: `${i * 80}ms`,
                }}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 60px ${feature.glow}` }}
                />

                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-[14px] bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                    style={{ boxShadow: `0 4px 20px ${feature.glow}` }}
                  >
                    <span className="material-symbols-outlined text-white text-[22px]">
                      {feature.icon}
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-[0.82rem] text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-28 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="glass-card p-12 lg:p-16 relative overflow-hidden">
            {/* BG glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#6366F1]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#EC4899]/8 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <span className="material-symbols-outlined text-[48px] text-[var(--primary)] mb-6 block animate-float">
                rocket_launch
              </span>
              <h2
                className="text-3xl lg:text-4xl font-black mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Ready to Transform
                <span className="gradient-text"> Your Campus?</span>
              </h2>
              <p className="text-[var(--text-secondary)] max-w-lg mx-auto mb-8">
                Join colleges already using College OS. Start your 14-day free trial — no credit card required.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/register-college"
                  className="px-8 py-4 text-[0.8rem] font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-[16px] hover:brightness-110 transition-all inline-flex items-center gap-2"
                  style={{ boxShadow: '0 8px 32px rgba(99,102,241,0.3)' }}
                >
                  Register Your College
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-4 text-[0.8rem] font-extrabold uppercase tracking-wider text-white/70 rounded-[16px] border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/5 py-10 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[16px]">school</span>
            </div>
            <p className="text-[0.72rem] text-[var(--text-muted)] font-medium">
              © 2026 College OS. Built by Aditya Gothe.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[0.72rem] text-[var(--text-muted)] hover:text-[var(--text-secondary)] font-medium transition-colors">Privacy</a>
            <a href="#" className="text-[0.72rem] text-[var(--text-muted)] hover:text-[var(--text-secondary)] font-medium transition-colors">Terms</a>
            <a href="#" className="text-[0.72rem] text-[var(--text-muted)] hover:text-[var(--text-secondary)] font-medium transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
