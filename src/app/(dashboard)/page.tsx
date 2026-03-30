import StatCard from '@/components/ui/StatCard';
import ComicCard from '@/components/ui/ComicCard';
import ComicBadge from '@/components/ui/ComicBadge';

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Welcome Banner */}
      <div className="comic-card p-6 lg:p-8" style={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-white">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/60 mb-1">
              Good Morning
            </p>
            <h2 className="text-2xl lg:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
              Aditya Gothe
            </h2>
            <p className="text-sm text-white/70 mt-1">CSE — Division D • Semester 2</p>
          </div>
          <div className="flex items-center gap-2">
            <ComicBadge color="#FFD700" variant="filled" size="md">
              <span className="material-symbols-outlined text-[14px]">star</span>
              Rank #2
            </ComicBadge>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatCard
          title="Attendance"
          value="85%"
          icon="fact_check"
          color="#10B981"
          trend={{ value: 3, label: 'vs last week' }}
        />
        <StatCard
          title="Pending Tasks"
          value="4"
          icon="assignment"
          color="#F59E0B"
          subtitle="2 due tomorrow"
        />
        <StatCard
          title="GPA"
          value="8.6"
          icon="school"
          color="#6366F1"
          trend={{ value: 0.3, label: 'vs last sem' }}
        />
        <StatCard
          title="Notices"
          value="7"
          icon="campaign"
          color="#EF4444"
          subtitle="3 unread"
        />
      </div>

      {/* Weekly Pulse + Bulletin */}
      <div className="grid lg:grid-cols-5 gap-4 lg:gap-6">
        {/* Weekly Pulse Chart */}
        <ComicCard padding="lg" className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
                Weekly Pulse
              </h3>
              <p className="text-[0.65rem] text-[var(--text-muted)] mt-0.5">Your attendance this week</p>
            </div>
            <ComicBadge color="var(--success)" variant="outline">This Week</ComicBadge>
          </div>

          {/* Chart Placeholder — simple bar chart with CSS */}
          <div className="flex items-end gap-3 h-[160px]">
            {[
              { day: 'Mon', value: 100, classes: 5 },
              { day: 'Tue', value: 80, classes: 4 },
              { day: 'Wed', value: 100, classes: 6 },
              { day: 'Thu', value: 60, classes: 3 },
              { day: 'Fri', value: 0, classes: 0 },
            ].map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative" style={{ height: `${Math.max(d.value * 1.2, 8)}px` }}>
                  <div
                    className="absolute bottom-0 w-full rounded-t-[8px] border-2 border-[var(--comic-border)] transition-all"
                    style={{
                      height: '100%',
                      background: d.value === 100
                        ? 'var(--success)'
                        : d.value >= 75
                          ? 'var(--primary)'
                          : d.value > 0
                            ? 'var(--warning)'
                            : '#e2e8f0',
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                </div>
                <span className="text-[0.6rem] font-bold uppercase text-[var(--text-muted)]">{d.day}</span>
              </div>
            ))}
          </div>
        </ComicCard>

        {/* The Bulletin */}
        <ComicCard padding="lg" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-extrabold uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
              The Bulletin
            </h3>
            <span className="material-symbols-outlined text-[18px] text-[var(--text-muted)]">arrow_forward</span>
          </div>

          <div className="space-y-3">
            {[
              { title: 'CIE-1 Schedule Released', category: 'EXAM', time: '2h ago', urgent: true },
              { title: 'Library Timing Change', category: 'GENERAL', time: '5h ago', urgent: false },
              { title: 'Sports Day Registration', category: 'EVENT', time: '1d ago', urgent: false },
              { title: 'Fee Payment Reminder', category: 'IMPORTANT', time: '2d ago', urgent: true },
            ].map((notice, i) => (
              <div
                key={i}
                className={`p-3 rounded-[12px] border-2 cursor-pointer transition-all hover:bg-gray-50 ${notice.urgent ? 'border-[var(--danger)]/30 bg-red-50/50' : 'border-gray-200'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.75rem] font-bold truncate">{notice.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <ComicBadge
                        color={notice.urgent ? 'var(--danger)' : 'var(--primary)'}
                        variant="outline"
                        size="sm"
                      >
                        {notice.category}
                      </ComicBadge>
                      <span className="text-[0.55rem] text-[var(--text-muted)]">{notice.time}</span>
                    </div>
                  </div>
                  {notice.urgent && (
                    <span className="material-symbols-outlined text-[16px] text-[var(--danger)]">priority_high</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ComicCard>
      </div>

      {/* Today's Schedule Preview */}
      <ComicCard padding="lg">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
              Today&apos;s Schedule
            </h3>
            <p className="text-[0.65rem] text-[var(--text-muted)] mt-0.5">Monday, March 30</p>
          </div>
          <ComicBadge color="var(--primary)" variant="outline">5 Classes</ComicBadge>
        </div>

        <div className="space-y-3">
          {[
            { time: '09:00 - 10:00', subject: 'Mathematics', teacher: 'Prof. K.A. Kalagond', room: '211', color: '#6366F1', isNow: false },
            { time: '10:00 - 11:00', subject: 'Physics', teacher: 'Dr. Anuradha T.', room: '305', color: '#10B981', isNow: true },
            { time: '11:00 - 12:00', subject: 'Chemistry', teacher: 'Prof. R.S. Metri', room: 'Lab 2', color: '#F59E0B', isNow: false },
          ].map((session, i) => (
            <div
              key={i}
              className="session-card"
              style={{ '--session-color': session.color } as React.CSSProperties}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[0.75rem] font-extrabold">{session.subject}</span>
                      {session.isNow && (
                        <span className="now-indicator">
                          <span className="material-symbols-outlined text-[12px]">bolt</span>
                          Now!
                        </span>
                      )}
                    </div>
                    <p className="text-[0.65rem] text-[var(--text-muted)] mt-0.5">
                      {session.teacher} • Room {session.room}
                    </p>
                  </div>
                </div>
                <span className="text-[0.65rem] font-bold text-[var(--text-secondary)]">{session.time}</span>
              </div>
            </div>
          ))}

          {/* Lunch */}
          <div className="lunch-separator">
            <span className="text-[0.6rem] font-bold uppercase tracking-wider text-[var(--text-muted)] whitespace-nowrap">
              🍽️ Lunch Break
            </span>
          </div>

          {[
            { time: '13:00 - 14:00', subject: 'Data Structures', teacher: 'Prof. K.A. Kalagond', room: '211', color: '#8B5CF6', isNow: false },
            { time: '14:00 - 15:00', subject: 'English', teacher: 'Ms. Priya S.', room: '102', color: '#EC4899', isNow: false },
          ].map((session, i) => (
            <div
              key={i}
              className="session-card opacity-60"
              style={{ '--session-color': session.color } as React.CSSProperties}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[0.75rem] font-extrabold">{session.subject}</span>
                  <p className="text-[0.65rem] text-[var(--text-muted)] mt-0.5">
                    {session.teacher} • Room {session.room}
                  </p>
                </div>
                <span className="text-[0.65rem] font-bold text-[var(--text-secondary)]">{session.time}</span>
              </div>
            </div>
          ))}
        </div>
      </ComicCard>
    </div>
  );
}
