'use client';

import { useAuthStore } from '@/lib/store/auth';
import StatCard from '@/components/ui/StatCard';
import ComicCard from '@/components/ui/ComicCard';
import ComicBadge from '@/components/ui/ComicBadge';

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-[24px] p-6 lg:p-8 border border-[var(--surface-border)] shadow-[0_8px_32px_rgba(0,0,0,0.3)] bg-gradient-to-br from-[#0B0F19] to-[#1A1A2E]">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#6366F1]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#8B5CF6]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="grid-pattern absolute inset-0 opacity-50" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--primary-light)] mb-1">
              Good Morning
            </p>
            <h2 className="text-2xl lg:text-3xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              {user?.fullName || 'User'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1 capitalize">
              {user?.role.replace('_', ' ')} {user?.departmentId ? '• Department ID ' + user.departmentId.substring(0,6) : ''}
            </p>
          </div>
          {user?.role === 'student' && (
            <div className="flex items-center gap-2">
              <ComicBadge color="#F59E0B" variant="filled" size="md">
                <span className="material-symbols-outlined text-[14px]">star</span>
                Rank #2
              </ComicBadge>
            </div>
          )}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
        <StatCard
          title={user?.role === 'teacher' ? 'Classes Today' : 'Attendance'}
          value={user?.role === 'teacher' ? '4' : '85%'}
          icon={user?.role === 'teacher' ? 'menu_book' : 'fact_check'}
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
          title={user?.role === 'teacher' ? 'Submissions' : 'GPA'}
          value={user?.role === 'teacher' ? '128' : '8.6'}
          icon={user?.role === 'teacher' ? 'inbox' : 'school'}
          color="#6366F1"
          trend={user?.role === 'student' ? { value: 0.3, label: 'vs last sem' } : undefined}
          subtitle={user?.role === 'teacher' ? 'To be graded' : undefined}
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
        <ComicCard padding="lg" className="lg:col-span-3 h-full">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Weekly Pulse
              </h3>
              <p className="text-[0.65rem] text-[var(--text-muted)] mt-0.5">Activity this week</p>
            </div>
            <ComicBadge color="var(--success)" variant="outline">This Week</ComicBadge>
          </div>

          <div className="flex items-end gap-3 h-[180px]">
            {[
              { day: 'Mon', value: 100, classes: 5 },
              { day: 'Tue', value: 80, classes: 4 },
              { day: 'Wed', value: 100, classes: 6 },
              { day: 'Thu', value: 60, classes: 3 },
              { day: 'Fri', value: 0, classes: 0 },
            ].map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full relative px-1 sm:px-3 lg:px-6" style={{ height: `${Math.max(d.value * 1.5, 8)}px` }}>
                  <div
                    className="absolute bottom-0 left-0 right-0 w-full rounded-t-[6px] transition-all bg-gradient-to-t"
                    style={{
                      height: '100%',
                      backgroundImage: d.value === 100
                        ? 'linear-gradient(to top, rgba(16,185,129,0.1), rgba(16,185,129,0.8))'
                        : d.value >= 75
                          ? 'linear-gradient(to top, rgba(99,102,241,0.1), rgba(99,102,241,0.8))'
                          : d.value > 0
                            ? 'linear-gradient(to top, rgba(245,158,11,0.1), rgba(245,158,11,0.8))'
                            : 'rgba(255,255,255,0.05)',
                      borderTop: `2px solid ${d.value === 100 ? '#10B981' : d.value >= 75 ? '#6366F1' : d.value > 0 ? '#F59E0B' : 'transparent'}`,
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                </div>
                <span className="text-[0.6rem] font-bold uppercase text-[var(--text-secondary)]">{d.day}</span>
              </div>
            ))}
          </div>
        </ComicCard>

        {/* The Bulletin */}
        <ComicCard padding="lg" className="lg:col-span-2 h-full flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              The Bulletin
            </h3>
            <span className="material-symbols-outlined text-[18px] text-[var(--text-muted)] hover:text-white cursor-pointer transition-colors">arrow_forward</span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {[
              { title: 'CIE-1 Schedule Released', category: 'EXAM', time: '2h ago', urgent: true, color: 'var(--primary)' },
              { title: 'Library Timing Change', category: 'GENERAL', time: '5h ago', urgent: false, color: 'var(--secondary)' },
              { title: 'Sports Day Registration', category: 'EVENT', time: '1d ago', urgent: false, color: 'var(--success)' },
              { title: 'Fee Payment Reminder', category: 'IMPORTANT', time: '2d ago', urgent: true, color: 'var(--warning)' },
            ].map((notice, i) => (
              <div
                key={i}
                className={`p-4 rounded-[14px] border border-[var(--surface-border)] cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg ${
                  notice.urgent ? 'bg-[var(--danger)]/5 hover:border-[var(--danger)]/30' : 'bg-[var(--surface-elevated)] hover:border-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className={`text-[0.75rem] font-bold truncate ${notice.urgent ? 'text-[var(--danger)]' : 'text-white'}`}>
                      {notice.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                       <span 
                         className="text-[0.55rem] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded-[4px]" 
                         style={{ color: notice.color, backgroundColor: `color-mix(in srgb, ${notice.color} 15%, transparent)` }}
                       >
                         {notice.category}
                       </span>
                      <span className="text-[0.55rem] font-medium text-[var(--text-muted)]">{notice.time}</span>
                    </div>
                  </div>
                  {notice.urgent && (
                    <span className="material-symbols-outlined text-[16px] text-[var(--danger)] mt-0.5">priority_high</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ComicCard>
      </div>

      {/* Today's Schedule Preview */}
      <ComicCard padding="lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              Today&apos;s Schedule
            </h3>
            <p className="text-[0.65rem] text-[var(--text-muted)] mt-1">Monday, March 30</p>
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
              className={`session-card ${session.isNow ? 'bg-[var(--surface-hover)] border-white/10' : ''}`}
              style={{ '--session-color': session.color } as React.CSSProperties}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0" style={{ backgroundColor: `color-mix(in srgb, ${session.color} 15%, transparent)` }}>
                     <span className="material-symbols-outlined" style={{ color: session.color }}>menu_book</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[0.8rem] font-extrabold text-white">{session.subject}</span>
                      {session.isNow && (
                        <span className="now-indicator">
                          <span className="material-symbols-outlined text-[12px]">bolt</span>
                          Now!
                        </span>
                      )}
                    </div>
                    <p className="text-[0.65rem] text-[var(--text-muted)] mt-1 font-medium">
                      {session.teacher} <span className="mx-1 opacity-50">•</span> Room {session.room}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[0.7rem] font-extrabold" style={{ color: session.isNow ? 'var(--warning)' : 'var(--text-secondary)' }}>
                    {session.time}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Lunch */}
          <div className="lunch-separator">
            <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-muted)] whitespace-nowrap px-4 py-1.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--surface-border)]">
              🍽️ Lunch Break
            </span>
          </div>

          {[
            { time: '13:00 - 14:00', subject: 'Data Structures', teacher: 'Prof. K.A. Kalagond', room: '211', color: '#8B5CF6', isNow: false },
            { time: '14:00 - 15:00', subject: 'English', teacher: 'Ms. Priya S.', room: '102', color: '#EC4899', isNow: false },
          ].map((session, i) => (
            <div
              key={i}
              className="session-card opacity-60 hover:opacity-100"
              style={{ '--session-color': session.color } as React.CSSProperties}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0" style={{ backgroundColor: `color-mix(in srgb, ${session.color} 15%, transparent)` }}>
                     <span className="material-symbols-outlined" style={{ color: session.color }}>menu_book</span>
                  </div>
                  <div>
                    <span className="text-[0.8rem] font-extrabold text-white">{session.subject}</span>
                    <p className="text-[0.65rem] text-[var(--text-muted)] mt-1 font-medium">
                      {session.teacher} <span className="mx-1 opacity-50">•</span> Room {session.room}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[0.7rem] font-extrabold text-[var(--text-secondary)]">{session.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ComicCard>
    </div>
  );
}
