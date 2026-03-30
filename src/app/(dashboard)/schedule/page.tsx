'use client';

import { useState } from 'react';
import ComicCard from '@/components/ui/ComicCard';
import ComicBadge from '@/components/ui/ComicBadge';
import { WEEKDAYS } from '@/lib/constants';

const MOCK_TIMETABLE = {
  MON: [
    { time: '09:00 - 10:00', subject: 'Mathematics', teacher: 'Prof. K.A. Kalagond', room: '211', color: '#6366F1' },
    { time: '10:00 - 11:00', subject: 'Physics', teacher: 'Dr. Anuradha T.', room: '305', color: '#10B981' },
    { time: '11:00 - 12:00', subject: 'Chemistry Lab', teacher: 'Prof. R.S. Metri', room: 'Lab 2', color: '#F59E0B' },
    { time: 'LUNCH', subject: '', teacher: '', room: '', color: '' },
    { time: '13:00 - 14:00', subject: 'Data Structures', teacher: 'Prof. K.A. Kalagond', room: '211', color: '#8B5CF6' },
    { time: '14:00 - 15:00', subject: 'English', teacher: 'Ms. Priya S.', room: '102', color: '#EC4899' },
  ],
  TUE: [
    { time: '09:00 - 10:00', subject: 'Physics', teacher: 'Dr. Anuradha T.', room: '305', color: '#10B981' },
    { time: '10:00 - 11:00', subject: 'Mathematics', teacher: 'Prof. K.A. Kalagond', room: '211', color: '#6366F1' },
    { time: '11:00 - 12:00', subject: 'English', teacher: 'Ms. Priya S.', room: '102', color: '#EC4899' },
    { time: 'LUNCH', subject: '', teacher: '', room: '', color: '' },
    { time: '13:00 - 15:00', subject: 'Physics Lab', teacher: 'Dr. Anuradha T.', room: 'Lab 1', color: '#10B981' },
  ],
  WED: [
    { time: '09:00 - 10:00', subject: 'Data Structures', teacher: 'Prof. K.A. Kalagond', room: '211', color: '#8B5CF6' },
    { time: '10:00 - 11:00', subject: 'Chemistry', teacher: 'Prof. R.S. Metri', room: '305', color: '#F59E0B' },
    { time: '11:00 - 12:00', subject: 'Mathematics', teacher: 'Prof. K.A. Kalagond', room: '211', color: '#6366F1' },
    { time: 'LUNCH', subject: '', teacher: '', room: '', color: '' },
    { time: '13:00 - 14:00', subject: 'English', teacher: 'Ms. Priya S.', room: '102', color: '#EC4899' },
  ],
  THU: [
    { time: '09:00 - 11:00', subject: 'Chemistry Lab', teacher: 'Prof. R.S. Metri', room: 'Lab 2', color: '#F59E0B' },
    { time: '11:00 - 12:00', subject: 'Physics', teacher: 'Dr. Anuradha T.', room: '305', color: '#10B981' },
    { time: 'LUNCH', subject: '', teacher: '', room: '', color: '' },
    { time: '13:00 - 14:00', subject: 'Data Structures', teacher: 'Prof. K.A. Kalagond', room: '211', color: '#8B5CF6' },
    { time: '14:00 - 15:00', subject: 'Mathematics', teacher: 'Prof. K.A. Kalagond', room: '211', color: '#6366F1' },
  ],
  FRI: [
    { time: '09:00 - 10:00', subject: 'English', teacher: 'Ms. Priya S.', room: '102', color: '#EC4899' },
    { time: '10:00 - 11:00', subject: 'Data Structures', teacher: 'Prof. K.A. Kalagond', room: '211', color: '#8B5CF6' },
    { time: '11:00 - 12:00', subject: 'Physics', teacher: 'Dr. Anuradha T.', room: '305', color: '#10B981' },
    { time: 'LUNCH', subject: '', teacher: '', room: '', color: '' },
    { time: '13:00 - 14:00', subject: 'Chemistry', teacher: 'Prof. R.S. Metri', room: '305', color: '#F59E0B' },
  ],
  SAT: [],
};

export default function SchedulePage() {
  const today = new Date().getDay(); // 0=Sun, 1=Mon, ...
  const defaultDay = today >= 1 && today <= 5 ? WEEKDAYS[today - 1] : 'MON';
  const [selectedDay, setSelectedDay] = useState<string>(defaultDay);

  const schedule = MOCK_TIMETABLE[selectedDay as keyof typeof MOCK_TIMETABLE] || [];

  // Determine which session is "now" based on current time
  const currentHour = new Date().getHours();
  const getNowIndex = () => {
    if (selectedDay !== defaultDay) return -1;
    const realSlots = schedule.filter(s => s.time !== 'LUNCH');
    for (let i = 0; i < realSlots.length; i++) {
      const startHour = parseInt(realSlots[i].time.split(':')[0]);
      const endHour = parseInt(realSlots[i].time.split(' - ')[1]?.split(':')[0] || '0');
      if (currentHour >= startHour && currentHour < endHour) return i;
    }
    return -1;
  };

  let realIndex = 0;

  return (
    <div className="space-y-5 animate-slide-up">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
          Schedule
        </h2>
        <p className="text-[0.7rem] text-[var(--text-muted)] mt-1">Your weekly timetable</p>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {WEEKDAYS.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-5 py-2.5 rounded-[12px] text-[0.7rem] font-extrabold uppercase tracking-wider border-2 transition-all bouncy-transition shrink-0 ${
              selectedDay === day
                ? 'bg-[var(--primary)] text-white border-[var(--comic-border)] comic-shadow-sm'
                : 'bg-white text-[var(--text-secondary)] border-gray-200 hover:border-[var(--comic-border)] hover:bg-gray-50'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Cards */}
      {schedule.length === 0 ? (
        <ComicCard padding="lg" className="text-center">
          <span className="material-symbols-outlined text-[48px] text-[var(--text-muted)] mb-3 block">weekend</span>
          <p className="font-bold text-[var(--text-secondary)]">No classes today!</p>
          <p className="text-[0.7rem] text-[var(--text-muted)] mt-1">Enjoy your day off 🎉</p>
        </ComicCard>
      ) : (
        <div className="space-y-3">
          {schedule.map((session, i) => {
            if (session.time === 'LUNCH') {
              return (
                <div key={`lunch-${i}`} className="lunch-separator">
                  <span className="text-[0.6rem] font-bold uppercase tracking-wider text-[var(--text-muted)] whitespace-nowrap">
                    🍽️ Lunch Break
                  </span>
                </div>
              );
            }

            const isNow = realIndex === getNowIndex();
            const isPast = selectedDay === defaultDay && !isNow && parseInt(session.time.split(':')[0]) < currentHour;
            const currentIndex = realIndex;
            realIndex++;

            return (
              <div
                key={i}
                className={`session-card ${isPast ? 'opacity-50' : ''}`}
                style={{ '--session-color': session.color } as React.CSSProperties}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Time Badge */}
                    <div className="w-16 shrink-0 text-center">
                      <p className="text-[0.6rem] font-bold text-[var(--text-muted)] leading-tight">
                        {session.time.split(' - ')[0]}
                      </p>
                      <p className="text-[0.55rem] text-[var(--text-muted)]">
                        {session.time.split(' - ')[1]}
                      </p>
                    </div>

                    {/* Subject Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="subject-badge" style={{ color: session.color, borderColor: session.color }}>
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: session.color }} />
                          {session.subject}
                        </span>
                        {isNow && (
                          <span className="now-indicator">
                            <span className="material-symbols-outlined text-[12px]">bolt</span>
                            Now!
                          </span>
                        )}
                      </div>
                      <p className="text-[0.65rem] text-[var(--text-muted)] mt-1 truncate">
                        {session.teacher} • Room {session.room}
                      </p>
                    </div>
                  </div>

                  {/* Status Icon */}
                  <div className="shrink-0">
                    {isPast && (
                      <span className="material-symbols-outlined text-[20px] text-[var(--success)]">check_circle</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
