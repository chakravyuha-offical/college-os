'use client';

import ComicCard from '@/components/ui/ComicCard';
import ComicBadge from '@/components/ui/ComicBadge';
import StatCard from '@/components/ui/StatCard';

const SUBJECT_PERFORMANCE = [
  { name: 'Mathematics', cie1: 38, cie2: 42, total: 50, color: '#6366F1' },
  { name: 'Physics', cie1: 32, cie2: 35, total: 50, color: '#10B981' },
  { name: 'Chemistry', cie1: 28, cie2: 30, total: 50, color: '#F59E0B' },
  { name: 'Data Structures', cie1: 44, cie2: 46, total: 50, color: '#8B5CF6' },
  { name: 'English', cie1: 40, cie2: 43, total: 50, color: '#EC4899' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
          Analytics
        </h2>
        <p className="text-[0.7rem] text-[var(--text-muted)] mt-1">Your performance overview and insights</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="GPA" value="8.6" icon="school" color="#6366F1" trend={{ value: 0.3, label: 'vs last sem' }} />
        <StatCard title="Attendance" value="85%" icon="fact_check" color="#10B981" trend={{ value: 3, label: 'vs last month' }} />
        <StatCard title="Assignments" value="92%" icon="assignment" color="#F59E0B" subtitle="Completion rate" />
        <StatCard title="Rank" value="#2" icon="leaderboard" color="#8B5CF6" subtitle="In your division" />
      </div>

      {/* CIE Performance Comparison */}
      <ComicCard padding="lg">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-extrabold uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
            CIE Performance
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-[var(--primary)]/30 border border-[var(--primary)]" />
              <span className="text-[0.6rem] font-bold text-[var(--text-muted)]">CIE-1</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-[var(--primary)] border border-[var(--primary)]" />
              <span className="text-[0.6rem] font-bold text-[var(--text-muted)]">CIE-2</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {SUBJECT_PERFORMANCE.map((subject) => (
            <div key={subject.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
                  <span className="text-[0.75rem] font-bold">{subject.name}</span>
                </div>
                <div className="flex items-center gap-3 text-[0.6rem] font-bold">
                  <span className="text-[var(--text-muted)]">CIE-1: {subject.cie1}/{subject.total}</span>
                  <span style={{ color: subject.color }}>CIE-2: {subject.cie2}/{subject.total}</span>
                  {subject.cie2 > subject.cie1 ? (
                    <span className="text-[var(--success)] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">trending_up</span>
                      +{subject.cie2 - subject.cie1}
                    </span>
                  ) : (
                    <span className="text-[var(--danger)] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">trending_down</span>
                      {subject.cie2 - subject.cie1}
                    </span>
                  )}
                </div>
              </div>
              {/* Dual bar */}
              <div className="flex gap-1 h-4">
                <div className="relative flex-1 bg-gray-100 rounded-l-full border-2 border-gray-200 overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-l-full opacity-40"
                    style={{ width: `${(subject.cie1 / subject.total) * 100}%`, backgroundColor: subject.color }}
                  />
                </div>
                <div className="relative flex-1 bg-gray-100 rounded-r-full border-2 border-gray-200 overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-r-full"
                    style={{ width: `${(subject.cie2 / subject.total) * 100}%`, backgroundColor: subject.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ComicCard>

      {/* Engagement Score */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ComicCard padding="lg">
          <h3 className="text-sm font-extrabold uppercase tracking-wider mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Engagement Score
          </h3>
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-40">
              {/* Circular progress placeholder */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                <circle
                  cx="64" cy="64" r="56" fill="none"
                  stroke="var(--primary)" strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${0.88 * 2 * Math.PI * 56} ${2 * Math.PI * 56}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>88</span>
                <span className="text-[0.55rem] font-bold uppercase tracking-wider text-[var(--text-muted)]">out of 100</span>
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              { label: 'Attendance', value: '85%', color: 'var(--success)' },
              { label: 'Submissions', value: '92%', color: 'var(--primary)' },
              { label: 'CIE Avg', value: '76%', color: 'var(--secondary)' },
            ].map(item => (
              <div key={item.label} className="text-center p-2 rounded-[10px] bg-gray-50 border border-gray-200">
                <p className="text-[0.8rem] font-extrabold" style={{ color: item.color }}>{item.value}</p>
                <p className="text-[0.55rem] font-bold uppercase tracking-wider text-[var(--text-muted)]">{item.label}</p>
              </div>
            ))}
          </div>
        </ComicCard>

        {/* Quick Insights */}
        <ComicCard padding="lg">
          <h3 className="text-sm font-extrabold uppercase tracking-wider mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Quick Insights
          </h3>
          <div className="space-y-3">
            {[
              { icon: 'trending_up', text: 'CIE-2 scores improved in 5/5 subjects', type: 'good' as const },
              { icon: 'schedule', text: 'Chemistry attendance needs attention (79%)', type: 'warning' as const },
              { icon: 'star', text: 'Highest score: Data Structures (46/50)', type: 'good' as const },
              { icon: 'warning', text: '2 assignments pending with close deadlines', type: 'warning' as const },
              { icon: 'emoji_events', text: 'You rank #2 in your division', type: 'good' as const },
            ].map((insight, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-[12px] border-2 ${
                  insight.type === 'good' ? 'border-[var(--success)]/20 bg-green-50/50' : 'border-[var(--warning)]/20 bg-amber-50/50'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ color: insight.type === 'good' ? 'var(--success)' : 'var(--warning)' }}
                >
                  {insight.icon}
                </span>
                <p className="text-[0.7rem] font-bold text-[var(--text-secondary)]">{insight.text}</p>
              </div>
            ))}
          </div>
        </ComicCard>
      </div>
    </div>
  );
}
