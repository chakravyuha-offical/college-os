'use client';

import { useState } from 'react';
import ComicCard from '@/components/ui/ComicCard';
import ComicButton from '@/components/ui/ComicButton';
import ComicInput from '@/components/ui/ComicInput';

const MOCK_CLASSES = [
  { id: 'c1', name: 'Grade 12', section: 'CSE-A', department: 'CSE', students: 58, teacher: 'Prof. K.A. Kalagond' },
  { id: 'c2', name: 'Grade 12', section: 'CSE-B', department: 'CSE', students: 62, teacher: 'Dr. Anuradha T.' },
  { id: 'c3', name: 'Grade 12', section: 'AIML-A', department: 'AIML', students: 55, teacher: 'Dr. Rajesh K.' },
];

export default function ClassesPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', section: '', department: '', year: '2026' });

  return (
    <div className="space-y-6 animate-slide-up max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
            Classes & Divisions
          </h2>
          <p className="text-[0.7rem] text-[var(--text-muted)] mt-1">Manage batches and class rosters</p>
        </div>
        <ComicButton size="md" onClick={() => setShowAdd(!showAdd)}>
          <span className="material-symbols-outlined text-[16px]">{showAdd ? 'close' : 'add'}</span>
          {showAdd ? 'Cancel' : 'Create Class'}
        </ComicButton>
      </div>

      {showAdd && (
        <ComicCard padding="lg" className="border-2 border-[var(--primary)] bg-[var(--primary)]/5 animate-pop-in">
          <h3 className="text-sm font-extrabold uppercase tracking-wider mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            New Class
          </h3>
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <ComicInput
              label="Academic Year"
              placeholder="e.g. 2026"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />
            <ComicInput
              label="Department"
              placeholder="e.g. CSE"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />
            <ComicInput
              label="Class Name / Sem"
              placeholder="e.g. Sem 3"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <ComicInput
              label="Section / Division"
              placeholder="e.g. A"
              value={form.section}
              onChange={(e) => setForm({ ...form, section: e.target.value })}
            />
          </div>
          <div className="flex justify-end">
            <ComicButton size="md">Save Class</ComicButton>
          </div>
        </ComicCard>
      )}

      <div className="space-y-3">
        {MOCK_CLASSES.map((cls) => (
          <ComicCard key={cls.id} padding="none" className="cursor-pointer">
            <div className="flex items-center justify-between p-4 lg:p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[12px] bg-[var(--secondary)]/10 flex flex-col items-center justify-center border-2 border-[var(--secondary)]/20 shrink-0">
                  <span className="text-[0.6rem] font-black tracking-wider uppercase text-[var(--secondary)]">{cls.department}</span>
                  <span className="text-[0.85rem] font-extrabold">{cls.section.split('-')[1]}</span>
                </div>
                <div>
                  <h3 className="text-[0.9rem] font-extrabold">{cls.name} — {cls.department} Div {cls.section.split('-')[1]}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[0.65rem] font-bold text-[var(--text-muted)] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">group</span>
                      {cls.students} Enrolled
                    </span>
                    <span className="text-[0.65rem] font-bold text-[var(--text-muted)] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">person_check</span>
                      Class Teacher: {cls.teacher}
                    </span>
                  </div>
                </div>
              </div>
              <ComicButton variant="outline" size="sm">Manage Roster</ComicButton>
            </div>
          </ComicCard>
        ))}
      </div>
    </div>
  );
}
