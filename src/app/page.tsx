import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-[#6366F1]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#EC4899]/8 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/5 rounded-full blur-[150px]" />
          {/* Grid pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[14px] bg-[#6366F1] flex items-center justify-center border-2 border-white/20" style={{ boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}>
              <span className="material-symbols-outlined text-white text-[24px]">school</span>
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight block leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
                College OS
              </span>
              <span className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-white/40">
                Next-gen Campus Platform
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 text-[0.7rem] font-bold uppercase tracking-wider text-white/70 hover:text-white transition-colors rounded-[12px] hover:bg-white/5"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2.5 text-[0.7rem] font-bold uppercase tracking-wider bg-[#6366F1] text-white rounded-[14px] border-2 border-white/20 hover:brightness-110 transition-all"
              style={{ boxShadow: '0 4px 20px rgba(99,102,241,0.3)' }}
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-white/60">
              Now in Beta — Built for Modern Colleges
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="block text-white">The Operating</span>
            <span className="block bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              System for
            </span>
            <span className="block text-white">Your College</span>
          </h1>

          {/* Sub Heading */}
          <p className="text-base lg:text-lg text-white/50 max-w-xl mb-10 leading-relaxed">
            Timetables, attendance, assignments, exams, analytics, parent portals — everything your institution needs in one beautiful, comic-styled platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register-college"
              className="group px-8 py-4 text-[0.8rem] font-extrabold uppercase tracking-wider bg-[#6366F1] text-white rounded-[16px] border-2 border-white/20 hover:brightness-110 transition-all inline-flex items-center gap-2"
              style={{ boxShadow: '0 8px 30px rgba(99,102,241,0.3)' }}
            >
              Start Free Trial
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 text-[0.8rem] font-extrabold uppercase tracking-wider text-white/70 rounded-[16px] border-2 border-white/10 hover:bg-white/5 hover:border-white/20 transition-all inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
              Watch Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16">
            {[
              { value: '10+', label: 'Colleges' },
              { value: '5,000+', label: 'Students' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl lg:text-3xl font-extrabold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {stat.value}
                </p>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white/30 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-white/20">Scroll</span>
          <span className="material-symbols-outlined text-white/20 text-[20px]">expand_more</span>
        </div>
      </div>

      {/* Features Grid */}
      <section className="relative py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#6366F1] mb-3">Features</p>
            <h2 className="text-3xl lg:text-5xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
              Everything You Need
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'calendar_month', title: 'Smart Timetable', desc: 'Conflict detection, real-time "Now!" indicators, and day-by-day views.', color: '#6366F1' },
              { icon: 'fact_check', title: 'Live Attendance', desc: 'Teachers mark in seconds. Parents get instant SMS alerts for absences.', color: '#10B981' },
              { icon: 'assignment', title: 'Assignments', desc: 'Create, submit, grade — with deadline tracking and resubmission support.', color: '#F59E0B' },
              { icon: 'quiz', title: 'Exams & Results', desc: 'CIE & SEE management, VTU result import, and auto-calculated analytics.', color: '#EF4444' },
              { icon: 'analytics', title: 'Deep Analytics', desc: 'Attendance trends, at-risk students, engagement scores, PDF/CSV export.', color: '#8B5CF6' },
              { icon: 'family_restroom', title: 'Parent Portal', desc: 'Real-time child monitoring, teacher DM, and grade notifications.', color: '#EC4899' },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-[20px] bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all group"
              >
                <div
                  className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <span className="material-symbols-outlined text-[24px]" style={{ color: feature.color }}>
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-base font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[0.7rem] text-white/30 font-medium">
            © 2026 College OS. Built by Aditya Gothe.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[0.7rem] text-white/30 hover:text-white/60 font-medium transition-colors">Privacy</a>
            <a href="#" className="text-[0.7rem] text-white/30 hover:text-white/60 font-medium transition-colors">Terms</a>
            <a href="#" className="text-[0.7rem] text-white/30 hover:text-white/60 font-medium transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
