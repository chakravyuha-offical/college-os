'use client';

import { useState } from 'react';
import ComicCard from '@/components/ui/ComicCard';
import ComicButton from '@/components/ui/ComicButton';
import ComicInput from '@/components/ui/ComicInput';
import ComicBadge from '@/components/ui/ComicBadge';

const MOCK_DEPARTMENTS = [
  { id: 'd1', name: 'Computer Science & Engineering', code: 'CSE', hod: 'Dr. Meena B.', activeClasses: 12 },
  { id: 'd2', name: 'Artificial Intelligence & ML', code: 'AIML', hod: 'Dr. Rajesh K.', activeClasses: 8 },
  { id: 'd3', name: 'Electronics & Communication', code: 'ECE', hod: 'Dr. Suresh V.', activeClasses: 10 },
];

export default function BranchesPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', code: '', hod: '' });

  return (
    <div className="space-y-6 animate-slide-up max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
            Departments
          </h2>
          <p className="text-[0.7rem] text-[var(--text-muted)] mt-1">Manage academic branches and HODs</p>
        </div>
        <ComicButton size="md" onClick={() => setShowAdd(!showAdd)}>
          <span className="material-symbols-outlined text-[16px]">{showAdd ? 'close' : 'add'}</span>
          {showAdd ? 'Cancel' : 'Add Department'}
        </ComicButton>
      </div>

      {showAdd && (
        <ComicCard padding="lg" className="border-2 border-[var(--primary)] bg-[var(--primary)]/5 animate-pop-in">
          <h3 className="text-sm font-extrabold uppercase tracking-wider mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            New Department
          </h3>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <ComicInput
              label="Department Name"
              placeholder="e.g. Computer Science"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <ComicInput
              label="Branch Code"
              placeholder="e.g. CSE"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
            />
            <ComicInput
              label="Assign HOD (Optional)"
              placeholder="Search teachers..."
              value={form.hod}
              onChange={(e) => setForm({ ...form, hod: e.target.value })}
            />
          </div>
          <div className="flex justify-end">
            <ComicButton size="md">Save Department</ComicButton>
          </div>
        </ComicCard>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_DEPARTMENTS.map((dept) => (
          <ComicCard key={dept.id} padding="lg" className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-[14px] bg-[var(--primary)]/10 flex items-center justify-center border-2 border-[var(--primary)]/20 text-[var(--primary)] font-black text-lg">
                {dept.code}
              </div>
              <ComicBadge color="var(--success)" variant="outline">
                {dept.activeClasses} Classes
              </ComicBadge>
            </div>
            
            <h3 className="text-[1rem] font-extrabold mb-1 line-clamp-2 leading-tight">{dept.name}</h3>
            <div className="mt-auto pt-4 border-t-2 border-gray-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[var(--text-muted)]">person_filled</span>
              <span className="text-[0.65rem] font-bold text-[var(--text-secondary)]">
                HOD: <span className="text-[var(--text-primary)]">{dept.hod}</span>
              </span>
            </div>
          </ComicCard>
        ))}
      </div>
    </div>
  );
}
