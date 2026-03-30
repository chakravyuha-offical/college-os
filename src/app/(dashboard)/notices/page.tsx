'use client';

import { useState } from 'react';
import ComicCard from '@/components/ui/ComicCard';
import ComicBadge from '@/components/ui/ComicBadge';

const MOCK_NOTICES = [
  {
    id: 'n1',
    title: 'CIE-1 Examination Schedule Released',
    body: 'The CIE-1 examinations for Semester 2 will begin from April 7th, 2026. Students must carry their ID cards. No electronic devices are permitted inside the examination hall.',
    category: 'EXAM' as const,
    priority: 'URGENT' as const,
    author: 'Exam Cell',
    authorRole: 'coordinator',
    time: '2 hours ago',
    imageUrl: null,
    hasAttachment: true,
  },
  {
    id: 'n2',
    title: 'Annual Sports Day — Registration Open',
    body: 'Register for the Annual Sports Day 2026! Events include athletics, cricket, football, badminton, and chess. Last date of registration: April 3rd.',
    category: 'EVENT' as const,
    priority: 'IMPORTANT' as const,
    author: 'Sports Committee',
    authorRole: 'teacher',
    time: '5 hours ago',
    imageUrl: null,
    hasAttachment: false,
  },
  {
    id: 'n3',
    title: 'Library Timing Change — Effective Monday',
    body: 'Starting from next Monday, the library will operate from 8:00 AM to 8:00 PM on all working days. Saturday hours remain unchanged (9 AM - 5 PM).',
    category: 'GENERAL' as const,
    priority: 'NORMAL' as const,
    author: 'Admin Office',
    authorRole: 'principal',
    time: '1 day ago',
    imageUrl: null,
    hasAttachment: false,
  },
  {
    id: 'n4',
    title: 'Fee Payment Deadline — March 31st',
    body: 'All pending semester fees must be paid by March 31st, 2026. Late payment will attract a fine of ₹500. Contact the accounts office for installment options.',
    category: 'IMPORTANT' as const,
    priority: 'URGENT' as const,
    author: 'Accounts Office',
    authorRole: 'principal',
    time: '2 days ago',
    imageUrl: null,
    hasAttachment: true,
  },
  {
    id: 'n5',
    title: 'Cultural Fest "Crescendo" — Call for Volunteers',
    body: 'The annual cultural festival Crescendo is looking for student volunteers. If you are interested in organizing, designing, or performing, please sign up at the Student Council office.',
    category: 'CULTURAL' as const,
    priority: 'NORMAL' as const,
    author: 'Student Council',
    authorRole: 'student',
    time: '3 days ago',
    imageUrl: null,
    hasAttachment: false,
  },
  {
    id: 'n6',
    title: 'Holiday Notice — Ugadi Festival',
    body: 'The college will remain closed on April 10th, 2026 on account of Ugadi. Regular classes resume on April 11th.',
    category: 'HOLIDAY' as const,
    priority: 'NORMAL' as const,
    author: 'Admin Office',
    authorRole: 'principal',
    time: '4 days ago',
    imageUrl: null,
    hasAttachment: false,
  },
];

const CATEGORY_CONFIG: Record<string, { color: string; icon: string }> = {
  EXAM: { color: '#EF4444', icon: 'quiz' },
  EVENT: { color: '#6366F1', icon: 'celebration' },
  GENERAL: { color: '#3B82F6', icon: 'info' },
  IMPORTANT: { color: '#F59E0B', icon: 'warning' },
  CULTURAL: { color: '#EC4899', icon: 'palette' },
  HOLIDAY: { color: '#10B981', icon: 'beach_access' },
  ACADEMIC: { color: '#8B5CF6', icon: 'school' },
  SPORTS: { color: '#14B8A6', icon: 'sports_soccer' },
};

export default function NoticesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', ...Object.keys(CATEGORY_CONFIG)];

  const filtered = selectedCategory === 'ALL'
    ? MOCK_NOTICES
    : MOCK_NOTICES.filter(n => n.category === selectedCategory);

  return (
    <div className="space-y-5 animate-slide-up">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
          Campus Bulletin
        </h2>
        <p className="text-[0.7rem] text-[var(--text-muted)] mt-1">Notices, events, and announcements</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => {
          const config = CATEGORY_CONFIG[cat];
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-[0.6rem] font-extrabold uppercase tracking-wider border-2 transition-all bouncy-transition shrink-0 ${
                selectedCategory === cat
                  ? 'text-white border-[var(--comic-border)] comic-shadow-sm'
                  : 'bg-white text-[var(--text-secondary)] border-gray-200 hover:border-gray-300'
              }`}
              style={selectedCategory === cat ? { backgroundColor: config?.color || 'var(--primary)' } : {}}
            >
              {cat === 'ALL' ? 'All' : cat.charAt(0) + cat.slice(1).toLowerCase()}
            </button>
          );
        })}
      </div>

      {/* Notice Cards */}
      <div className="space-y-4">
        {filtered.map((notice) => {
          const catConfig = CATEGORY_CONFIG[notice.category] || { color: '#3B82F6', icon: 'info' };
          const isUrgent = notice.priority === 'URGENT';

          return (
            <ComicCard
              key={notice.id}
              padding="none"
              className={`overflow-hidden cursor-pointer ${isUrgent ? 'border-[var(--danger)]' : ''}`}
            >
              {/* Urgent Banner */}
              {isUrgent && (
                <div className="bg-[var(--danger)] px-4 py-1.5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-white text-[14px]">priority_high</span>
                  <span className="text-[0.6rem] font-extrabold uppercase tracking-wider text-white">Urgent Notice</span>
                </div>
              )}

              <div className="p-4 lg:p-5">
                {/* Category + Time Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-[10px] flex items-center justify-center"
                      style={{ backgroundColor: `${catConfig.color}15` }}
                    >
                      <span className="material-symbols-outlined text-[16px]" style={{ color: catConfig.color }}>
                        {catConfig.icon}
                      </span>
                    </div>
                    <ComicBadge color={catConfig.color} variant="outline" size="sm">
                      {notice.category}
                    </ComicBadge>
                  </div>
                  <span className="text-[0.6rem] font-bold text-[var(--text-muted)]">{notice.time}</span>
                </div>

                {/* Title */}
                <h3 className="text-[0.9rem] font-extrabold mb-2">{notice.title}</h3>

                {/* Body */}
                <p className="text-[0.75rem] text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-3">
                  {notice.body}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t-2 border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                      <span className="text-[0.5rem] font-extrabold text-[var(--primary)]">
                        {notice.author.charAt(0)}
                      </span>
                    </div>
                    <span className="text-[0.65rem] font-bold text-[var(--text-muted)]">{notice.author}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {notice.hasAttachment && (
                      <span className="flex items-center gap-1 text-[0.6rem] font-bold text-[var(--text-muted)]">
                        <span className="material-symbols-outlined text-[14px]">attach_file</span>
                        Attachment
                      </span>
                    )}
                    <button className="flex items-center gap-1 text-[0.6rem] font-bold text-[var(--primary)] hover:underline">
                      Read more
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </ComicCard>
          );
        })}
      </div>
    </div>
  );
}
