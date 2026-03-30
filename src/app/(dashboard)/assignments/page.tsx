'use client';

import { useState } from 'react';
import ComicCard from '@/components/ui/ComicCard';
import ComicBadge from '@/components/ui/ComicBadge';

type FilterTab = 'all' | 'pending' | 'submitted' | 'graded';

const MOCK_ASSIGNMENTS = [
  {
    id: 'a1',
    title: 'Algebra Homework — Chapter 3',
    subject: 'Mathematics',
    subjectColor: '#6366F1',
    teacher: 'Prof. K.A. Kalagond',
    dueDate: '2026-04-01',
    priority: 'HIGH' as const,
    status: 'PENDING' as const,
    description: 'Complete exercises 3.1 through 3.5. Show all working steps.',
  },
  {
    id: 'a2',
    title: 'Physics Lab Report — Optics',
    subject: 'Physics',
    subjectColor: '#10B981',
    teacher: 'Dr. Anuradha T.',
    dueDate: '2026-03-31',
    priority: 'HIGH' as const,
    status: 'PENDING' as const,
    description: 'Write a lab report on the diffraction experiment conducted in Lab 1.',
  },
  {
    id: 'a3',
    title: 'Data Structures — Linked List Implementation',
    subject: 'Data Structures',
    subjectColor: '#8B5CF6',
    teacher: 'Prof. K.A. Kalagond',
    dueDate: '2026-04-05',
    priority: 'MEDIUM' as const,
    status: 'SUBMITTED' as const,
    description: 'Implement a doubly linked list in C with insert, delete, and search operations.',
  },
  {
    id: 'a4',
    title: 'English Essay — Technology in Education',
    subject: 'English',
    subjectColor: '#EC4899',
    teacher: 'Ms. Priya S.',
    dueDate: '2026-03-28',
    priority: 'LOW' as const,
    status: 'GRADED' as const,
    grade: 'A',
    description: 'Write a 1000-word essay on the impact of technology in modern education.',
  },
  {
    id: 'a5',
    title: 'Chemistry Worksheet — Periodic Table',
    subject: 'Chemistry',
    subjectColor: '#F59E0B',
    teacher: 'Prof. R.S. Metri',
    dueDate: '2026-03-25',
    priority: 'MEDIUM' as const,
    status: 'GRADED' as const,
    grade: 'B+',
    description: 'Complete the periodic table worksheet covering groups 1-8.',
  },
];

function getDaysLeft(dateStr: string) {
  const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return 'Overdue';
  if (diff === 0) return 'Due today';
  if (diff === 1) return 'Due tomorrow';
  return `${diff} days left`;
}

function getStatusStyle(status: string) {
  switch (status) {
    case 'PENDING': return 'status-pending';
    case 'SUBMITTED': return 'status-submitted';
    case 'GRADED': return 'status-graded';
    case 'LATE_SUBMITTED': return 'status-overdue';
    default: return '';
  }
}

function getPriorityClass(priority: string) {
  switch (priority) {
    case 'HIGH': return 'priority-high';
    case 'MEDIUM': return 'priority-medium';
    case 'LOW': return 'priority-low';
    default: return '';
  }
}

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: MOCK_ASSIGNMENTS.length },
    { key: 'pending', label: 'Pending', count: MOCK_ASSIGNMENTS.filter(a => a.status === 'PENDING').length },
    { key: 'submitted', label: 'Submitted', count: MOCK_ASSIGNMENTS.filter(a => a.status === 'SUBMITTED').length },
    { key: 'graded', label: 'Graded', count: MOCK_ASSIGNMENTS.filter(a => a.status === 'GRADED').length },
  ];

  const filtered = activeTab === 'all'
    ? MOCK_ASSIGNMENTS
    : MOCK_ASSIGNMENTS.filter(a => a.status === activeTab.toUpperCase());

  return (
    <div className="space-y-5 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
            Assignments
          </h2>
          <p className="text-[0.7rem] text-[var(--text-muted)] mt-1">Track your tasks and submissions</p>
        </div>
        <ComicBadge color="var(--warning)" variant="filled" size="md">
          {MOCK_ASSIGNMENTS.filter(a => a.status === 'PENDING').length} Pending
        </ComicBadge>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-full text-[0.65rem] font-extrabold uppercase tracking-wider border-2 transition-all bouncy-transition shrink-0 ${
              activeTab === tab.key
                ? 'bg-[var(--primary)] text-white border-[var(--comic-border)] comic-shadow-sm'
                : 'bg-white text-[var(--text-secondary)] border-gray-200 hover:border-gray-300'
            }`}
          >
            {tab.label}
            <span className={`ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full text-[0.55rem] ${
              activeTab === tab.key ? 'bg-white/20' : 'bg-gray-100'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Assignment Cards */}
      <div className="space-y-3">
        {filtered.map((assignment) => {
          const daysLeft = getDaysLeft(assignment.dueDate);
          const isOverdue = daysLeft === 'Overdue';

          return (
            <div
              key={assignment.id}
              className={`comic-card p-0 cursor-pointer ${isOverdue && assignment.status === 'PENDING' ? 'border-[var(--danger)]' : ''}`}
            >
              <div className={`border-l-[5px] p-4 lg:p-5 rounded-[17px] ${getPriorityClass(assignment.priority)}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Subject + Status Row */}
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span
                        className="subject-badge"
                        style={{ color: assignment.subjectColor, borderColor: assignment.subjectColor }}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: assignment.subjectColor }} />
                        {assignment.subject}
                      </span>
                      <span className={`burst-badge ${getStatusStyle(assignment.status)}`}>
                        <span>{assignment.status === 'GRADED' ? `Graded: ${assignment.grade}` : assignment.status}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[0.85rem] font-extrabold mb-1 truncate">{assignment.title}</h3>

                    {/* Description */}
                    <p className="text-[0.7rem] text-[var(--text-muted)] line-clamp-1 mb-2">{assignment.description}</p>

                    {/* Meta Row */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1 text-[0.6rem] font-bold text-[var(--text-muted)]">
                        <span className="material-symbols-outlined text-[14px]">person</span>
                        {assignment.teacher}
                      </span>
                      <span className={`flex items-center gap-1 text-[0.6rem] font-bold ${isOverdue && assignment.status === 'PENDING' ? 'text-[var(--danger)]' : 'text-[var(--text-muted)]'}`}>
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {daysLeft}
                      </span>
                    </div>
                  </div>

                  {/* Priority Icon */}
                  <div className="shrink-0">
                    {assignment.priority === 'HIGH' && (
                      <span className="material-symbols-outlined text-[20px] text-[var(--danger)]">priority_high</span>
                    )}
                    {assignment.status === 'GRADED' && (
                      <div className="w-10 h-10 rounded-full bg-[var(--success)]/10 flex items-center justify-center border-2 border-[var(--success)]/30">
                        <span className="text-[0.8rem] font-extrabold text-[var(--success)]">{assignment.grade}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <ComicCard padding="lg" className="text-center">
          <span className="material-symbols-outlined text-[48px] text-[var(--text-muted)] mb-3 block">task_alt</span>
          <p className="font-bold text-[var(--text-secondary)]">No assignments in this category</p>
          <p className="text-[0.7rem] text-[var(--text-muted)] mt-1">You&apos;re all caught up! 🎉</p>
        </ComicCard>
      )}
    </div>
  );
}
