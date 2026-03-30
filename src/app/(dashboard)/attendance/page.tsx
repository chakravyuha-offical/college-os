'use client';

import ComicCard from '@/components/ui/ComicCard';
import ComicBadge from '@/components/ui/ComicBadge';
import StatCard from '@/components/ui/StatCard';

const MOCK_ATTENDANCE = {
  overall: 85,
  total_classes: 120,
  present: 102,
  absent: 14,
  late: 4,
  subjects: [
    { name: 'Mathematics', percentage: 92, present: 22, total: 24, color: '#6366F1' },
    { name: 'Physics', percentage: 83, present: 20, total: 24, color: '#10B981' },
    { name: 'Chemistry', percentage: 79, present: 19, total: 24, color: '#F59E0B' },
    { name: 'Data Structures', percentage: 88, present: 21, total: 24, color: '#8B5CF6' },
    { name: 'English', percentage: 92, present: 22, total: 24, color: '#EC4899' },
  ],
  recentDays: [
    { date: 'Mon, Mar 24', status: 'present', classes: 5, attended: 5 },
    { date: 'Tue, Mar 25', status: 'present', classes: 5, attended: 4 },
    { date: 'Wed, Mar 26', status: 'present', classes: 5, attended: 5 },
    { date: 'Thu, Mar 27', status: 'absent', classes: 5, attended: 3 },
    { date: 'Fri, Mar 28', status: 'present', classes: 4, attended: 4 },
  ],
};

function getBarColor(pct: number) {
  if (pct >= 90) return 'var(--success)';
  if (pct >= 75) return 'var(--primary)';
  if (pct >= 60) return 'var(--warning)';
  return 'var(--danger)';
}

export default function AttendancePage() {
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
          Attendance
        </h2>
        <p className="text-[0.7rem] text-[var(--text-muted)] mt-1">Your attendance summary and history</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="Overall" value={`${MOCK_ATTENDANCE.overall}%`} icon="fact_check" color="#6366F1" />
        <StatCard title="Present" value={MOCK_ATTENDANCE.present} icon="check_circle" color="#10B981" />
        <StatCard title="Absent" value={MOCK_ATTENDANCE.absent} icon="cancel" color="#EF4444" />
        <StatCard title="Late" value={MOCK_ATTENDANCE.late} icon="schedule" color="#F59E0B" />
      </div>

      {/* Subject Breakdown */}
      <ComicCard padding="lg">
        <h3 className="text-sm font-extrabold uppercase tracking-wider mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
          Subject Breakdown
        </h3>

        <div className="space-y-4">
          {MOCK_ATTENDANCE.subjects.map((subject) => (
            <div key={subject.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
                  <span className="text-[0.75rem] font-bold">{subject.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[0.6rem] font-bold text-[var(--text-muted)]">
                    {subject.present}/{subject.total}
                  </span>
                  <span
                    className="text-[0.7rem] font-extrabold"
                    style={{ color: getBarColor(subject.percentage) }}
                  >
                    {subject.percentage}%
                  </span>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-gray-100 border-2 border-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${subject.percentage}%`,
                    backgroundColor: getBarColor(subject.percentage),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </ComicCard>

      {/* Recent Days */}
      <ComicCard padding="lg">
        <h3 className="text-sm font-extrabold uppercase tracking-wider mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
          Recent Days
        </h3>

        <div className="space-y-3">
          {MOCK_ATTENDANCE.recentDays.map((day, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-[12px] border-2 border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center border-2 ${
                  day.attended === day.classes
                    ? 'bg-[var(--success)]/10 border-[var(--success)]/30'
                    : day.attended >= day.classes * 0.6
                      ? 'bg-[var(--warning)]/10 border-[var(--warning)]/30'
                      : 'bg-[var(--danger)]/10 border-[var(--danger)]/30'
                }`}>
                  <span className="material-symbols-outlined text-[18px]" style={{
                    color: day.attended === day.classes ? 'var(--success)' : day.attended >= day.classes * 0.6 ? 'var(--warning)' : 'var(--danger)'
                  }}>
                    {day.attended === day.classes ? 'check_circle' : 'info'}
                  </span>
                </div>
                <div>
                  <p className="text-[0.75rem] font-bold">{day.date}</p>
                  <p className="text-[0.6rem] text-[var(--text-muted)]">
                    {day.attended}/{day.classes} classes attended
                  </p>
                </div>
              </div>
              <ComicBadge
                color={day.attended === day.classes ? 'var(--success)' : day.attended >= day.classes * 0.6 ? 'var(--warning)' : 'var(--danger)'}
                variant="outline"
              >
                {Math.round((day.attended / day.classes) * 100)}%
              </ComicBadge>
            </div>
          ))}
        </div>
      </ComicCard>

      {/* Warning Banner */}
      {MOCK_ATTENDANCE.overall < 75 && (
        <div className="comic-card border-[var(--danger)] p-4 bg-red-50 flex items-start gap-3">
          <span className="material-symbols-outlined text-[var(--danger)] text-[24px] shrink-0">warning</span>
          <div>
            <p className="text-[0.8rem] font-extrabold text-[var(--danger)]">Attendance Below 75%</p>
            <p className="text-[0.7rem] text-[var(--text-secondary)] mt-1">
              You are at risk of being detained. Please attend all upcoming classes to improve your attendance.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
