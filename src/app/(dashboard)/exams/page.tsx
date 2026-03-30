'use client';

import { useState } from 'react';
import ComicCard from '@/components/ui/ComicCard';
import ComicBadge from '@/components/ui/ComicBadge';

type ExamTab = 'schedule' | 'results';

const MOCK_SCHEDULE = [
  { subject: 'Mathematics', date: '2026-04-07', time: '09:00 AM - 12:00 PM', room: 'Hall A', type: 'CIE1' as const, color: '#6366F1' },
  { subject: 'Physics', date: '2026-04-09', time: '09:00 AM - 12:00 PM', room: 'Hall B', type: 'CIE1' as const, color: '#10B981' },
  { subject: 'Chemistry', date: '2026-04-11', time: '09:00 AM - 12:00 PM', room: 'Lab 2', type: 'CIE1' as const, color: '#F59E0B' },
  { subject: 'Data Structures', date: '2026-04-14', time: '02:00 PM - 05:00 PM', room: 'Hall A', type: 'CIE1' as const, color: '#8B5CF6' },
  { subject: 'English', date: '2026-04-16', time: '09:00 AM - 11:00 AM', room: 'Hall C', type: 'CIE1' as const, color: '#EC4899' },
];

const MOCK_RESULTS = [
  { subject: 'Mathematics', marks: 38, total: 50, type: 'CIE1' as const, color: '#6366F1', date: '2026-03-10' },
  { subject: 'Physics', marks: 32, total: 50, type: 'CIE1' as const, color: '#10B981', date: '2026-03-10' },
  { subject: 'Chemistry', marks: 28, total: 50, type: 'CIE1' as const, color: '#F59E0B', date: '2026-03-10' },
  { subject: 'Data Structures', marks: 44, total: 50, type: 'CIE1' as const, color: '#8B5CF6', date: '2026-03-10' },
  { subject: 'English', marks: 40, total: 50, type: 'CIE1' as const, color: '#EC4899', date: '2026-03-10' },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
}

function getDaysUntil(dateStr: string) {
  const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return 'Completed';
  if (diff === 0) return 'Today!';
  if (diff === 1) return 'Tomorrow';
  return `${diff} days`;
}

function gradeColor(marks: number, total: number) {
  const pct = (marks / total) * 100;
  if (pct >= 80) return 'var(--success)';
  if (pct >= 60) return 'var(--primary)';
  if (pct >= 40) return 'var(--warning)';
  return 'var(--danger)';
}

export default function ExamsPage() {
  const [tab, setTab] = useState<ExamTab>('schedule');

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h2 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
          Exams
        </h2>
        <p className="text-[0.7rem] text-[var(--text-muted)] mt-1">Exam schedule and results</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['schedule', 'results'] as ExamTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-[12px] text-[0.7rem] font-extrabold uppercase tracking-wider border-2 transition-all bouncy-transition ${
              tab === t
                ? 'bg-[var(--primary)] text-white border-[var(--comic-border)] comic-shadow-sm'
                : 'bg-white text-[var(--text-secondary)] border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] mr-1 align-middle">
              {t === 'schedule' ? 'event' : 'grading'}
            </span>
            {t === 'schedule' ? 'Schedule' : 'Results'}
          </button>
        ))}
      </div>

      {/* Schedule Tab */}
      {tab === 'schedule' && (
        <div className="space-y-3">
          {MOCK_SCHEDULE.map((exam, i) => {
            const countdown = getDaysUntil(exam.date);
            return (
              <ComicCard key={i} padding="none">
                <div className="flex border-l-[5px] rounded-[17px] p-4 lg:p-5" style={{ borderLeftColor: exam.color }}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="subject-badge" style={{ color: exam.color, borderColor: exam.color }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: exam.color }} />
                        {exam.subject}
                      </span>
                      <ComicBadge color={exam.color} variant="outline">{exam.type}</ComicBadge>
                    </div>
                    <div className="flex items-center gap-4 text-[0.65rem] font-bold text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                        {formatDate(exam.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {exam.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">room</span>
                        {exam.room}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col items-center justify-center text-center">
                    <p className="text-[0.6rem] font-bold uppercase text-[var(--text-muted)]">In</p>
                    <p className="text-[0.9rem] font-extrabold" style={{ color: exam.color }}>{countdown}</p>
                  </div>
                </div>
              </ComicCard>
            );
          })}
        </div>
      )}

      {/* Results Tab */}
      {tab === 'results' && (
        <div className="space-y-3">
          <ComicCard padding="md" className="bg-[var(--primary-bg)] border-[var(--primary)]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-wider text-[var(--text-muted)]">CIE-1 Total</p>
                <p className="text-2xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>
                  {MOCK_RESULTS.reduce((s, r) => s + r.marks, 0)}/{MOCK_RESULTS.reduce((s, r) => s + r.total, 0)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[0.6rem] font-bold uppercase tracking-wider text-[var(--text-muted)]">Average</p>
                <p className="text-2xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>
                  {Math.round(MOCK_RESULTS.reduce((s, r) => s + (r.marks / r.total) * 100, 0) / MOCK_RESULTS.length)}%
                </p>
              </div>
            </div>
          </ComicCard>

          {MOCK_RESULTS.map((result, i) => (
            <ComicCard key={i} padding="none">
              <div className="flex items-center border-l-[5px] rounded-[17px] p-4 lg:p-5" style={{ borderLeftColor: result.color }}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[0.8rem] font-extrabold">{result.subject}</span>
                    <ComicBadge color={result.color} variant="outline" size="sm">{result.type}</ComicBadge>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-gray-100 border border-gray-200 mt-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${(result.marks / result.total) * 100}%`, backgroundColor: gradeColor(result.marks, result.total) }}
                    />
                  </div>
                </div>
                <div className="shrink-0 ml-4 text-center">
                  <p className="text-xl font-black" style={{ color: gradeColor(result.marks, result.total), fontFamily: 'var(--font-heading)' }}>
                    {result.marks}
                  </p>
                  <p className="text-[0.5rem] font-bold text-[var(--text-muted)]">/{result.total}</p>
                </div>
              </div>
            </ComicCard>
          ))}
        </div>
      )}
    </div>
  );
}
