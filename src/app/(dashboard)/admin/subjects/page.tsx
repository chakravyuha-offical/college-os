'use client';

import { useState } from 'react';
import ComicCard from '@/components/ui/ComicCard';
import ComicButton from '@/components/ui/ComicButton';
import ComicInput from '@/components/ui/ComicInput';

const MOCK_SUBJECTS = [
  { id: 's1', name: 'Data Structures & Algorithms', code: 'CS301', credits: 4, department: 'CSE' },
  { id: 's2', name: 'Database Management Systems', code: 'CS302', credits: 4, department: 'CSE' },
  { id: 's3', name: 'Engineering Mathematics III', code: 'MA301', credits: 3, department: 'Global' },
  { id: 's4', name: 'Machine Learning Basics', code: 'AL301', credits: 4, department: 'AIML' },
];

export default function SubjectsPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', code: '', credits: '', department: '' });

  return (
    <div className="space-y-6 animate-slide-up max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
            Subjects Master
          </h2>
          <p className="text-[0.7rem] text-[var(--text-muted)] mt-1">Map subjects to departments and credits</p>
        </div>
        <ComicButton size="md" onClick={() => setShowAdd(!showAdd)}>
          <span className="material-symbols-outlined text-[16px]">{showAdd ? 'close' : 'add'}</span>
          {showAdd ? 'Cancel' : 'Add Subject'}
        </ComicButton>
      </div>

      {showAdd && (
        <ComicCard padding="lg" className="border-2 border-[var(--primary)] bg-[var(--primary)]/5 animate-pop-in">
          <h3 className="text-sm font-extrabold uppercase tracking-wider mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            New Subject
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <ComicInput
              label="Subject Code"
              placeholder="e.g. CS301"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
            />
            <ComicInput
              label="Subject Name"
              placeholder="e.g. Data Structures"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <ComicInput
              label="Credits"
              type="number"
              placeholder="e.g. 4"
              value={form.credits}
              onChange={(e) => setForm({ ...form, credits: e.target.value })}
            />
            <ComicInput
              label="Department (Optional)"
              placeholder="e.g. CSE"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />
          </div>
          <div className="flex justify-end">
            <ComicButton size="md">Save Subject</ComicButton>
          </div>
        </ComicCard>
      )}

      <div className="overflow-hidden comic-shadow-sm border-3 border-[var(--comic-border)] rounded-[16px] bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="p-4 text-[0.65rem] font-black uppercase tracking-wider text-[var(--text-secondary)]">Code</th>
              <th className="p-4 text-[0.65rem] font-black uppercase tracking-wider text-[var(--text-secondary)]">Subject Name</th>
              <th className="p-4 text-[0.65rem] font-black uppercase tracking-wider text-[var(--text-secondary)] py-4 text-center">Credits</th>
              <th className="p-4 text-[0.65rem] font-black uppercase tracking-wider text-[var(--text-secondary)]">Department</th>
              <th className="p-4 text-[0.65rem] font-black uppercase tracking-wider text-[var(--text-secondary)] text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_SUBJECTS.map((sub, i) => (
              <tr key={sub.id} className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${i === MOCK_SUBJECTS.length - 1 ? 'border-none' : ''}`}>
                <td className="p-4 text-[0.8rem] font-black font-mono">{sub.code}</td>
                <td className="p-4 text-[0.8rem] font-bold">{sub.name}</td>
                <td className="p-4 text-[0.8rem] font-extrabold text-center text-[var(--primary)]">{sub.credits}</td>
                <td className="p-4 text-[0.7rem] font-bold text-[var(--text-muted)]">{sub.department}</td>
                <td className="p-4 text-right">
                  <button className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors inline-block text-[var(--text-secondary)]">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
