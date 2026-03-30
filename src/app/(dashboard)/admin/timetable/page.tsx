'use client';

import { useState } from 'react';
import ComicCard from '@/components/ui/ComicCard';
import ComicButton from '@/components/ui/ComicButton';
import ComicBadge from '@/components/ui/ComicBadge';
import { WEEKDAYS } from '@/lib/constants';

const MOCK_CLASSES = ['CSE-A (Sem 3)', 'CSE-B (Sem 3)', 'AIML-A (Sem 3)'];

const MOCK_SLOTS = [
  { id: 't1', day: 'MON', start: '09:00', end: '10:00', subject: 'Data Structures', teacher: 'Prof. K.A. Kalagond', room: '211', color: '#8B5CF6' },
  { id: 't2', day: 'MON', start: '10:00', end: '11:00', subject: 'Database Systems', teacher: 'Dr. Anuradha T.', room: '305', color: '#10B981' },
];

export default function TimetableEditorPage() {
  const [selectedClass, setSelectedClass] = useState(MOCK_CLASSES[0]);
  const [selectedDay, setSelectedDay] = useState('MON');
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-6 animate-slide-up max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
            Timetable Editor
          </h2>
          <p className="text-[0.7rem] text-[var(--text-muted)] mt-1">Manage master schedules and detect conflicts</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedClass} 
            onChange={e => setSelectedClass(e.target.value)}
            className="px-4 py-2 rounded-[12px] border-2 border-[var(--comic-border)] text-[0.75rem] font-bold focus:outline-none focus:ring-2 ring-[var(--primary)]/30"
          >
            {MOCK_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <ComicButton size="md" variant="primary">Publish</ComicButton>
        </div>
      </div>

      {/* Editor Main Canvas */}
      <ComicCard padding="lg" className="min-h-[500px]">
        {/* Day Tabs */}
        <div className="flex gap-2 border-b-2 border-gray-100 pb-4 mb-4 overflow-x-auto scrollbar-hide">
          {WEEKDAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-2 rounded-full text-[0.65rem] font-extrabold uppercase tracking-wider transition-all bouncy-transition shrink-0 border-2 ${
                selectedDay === day
                  ? 'bg-[var(--primary)] text-white border-[var(--primary-dark)] comic-shadow-sm'
                  : 'bg-white text-[var(--text-secondary)] border-gray-200 hover:border-gray-300'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Timetable Slots for Day */}
        <div className="space-y-3">
          {MOCK_SLOTS.filter(s => s.day === selectedDay).map((slot) => (
            <div key={slot.id} className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-[16px] hover:border-[var(--primary)] transition-colors group">
              <div className="w-16 shrink-0 text-center">
                <p className="text-[0.8rem] font-black">{slot.start}</p>
                <p className="text-[0.6rem] font-bold text-[var(--text-muted)]">{slot.end}</p>
              </div>
              
              <div className="w-2 h-12 rounded-full shrink-0" style={{ backgroundColor: slot.color }} />
              
              <div className="flex-1 min-w-0">
                <p className="text-[0.85rem] font-extrabold">{slot.subject}</p>
                <div className="flex items-center gap-3 mt-1 text-[0.65rem] font-bold text-[var(--text-muted)]">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">person</span>{slot.teacher}</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">room</span>{slot.room}</span>
                </div>
              </div>

              <div className="shrink-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 flex items-center justify-center rounded-[8px] hover:bg-gray-100 text-[var(--text-secondary)]">
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-[8px] hover:bg-red-50 text-[var(--danger)]">
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </div>
          ))}

          {/* Add New Slot Pattern */}
          <button 
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-[16px] flex items-center justify-center gap-2 text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors bouncy-transition"
            onClick={() => setShowAdd(true)}
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span className="text-[0.75rem] font-bold uppercase tracking-wider">Add Session</span>
          </button>
        </div>
      </ComicCard>
    </div>
  );
}
