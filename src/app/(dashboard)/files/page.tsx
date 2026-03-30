'use client';

import { useState } from 'react';
import ComicCard from '@/components/ui/ComicCard';
import ComicBadge from '@/components/ui/ComicBadge';

type FileTab = 'shared' | 'submissions';

const MOCK_SHARED_FILES = [
  { id: 'f1', name: 'Mathematics — Unit 3 Notes.pdf', teacher: 'Prof. K.A. Kalagond', subject: 'Mathematics', size: '2.4 MB', date: '2 days ago', color: '#6366F1', type: 'pdf' },
  { id: 'f2', name: 'Physics — Optics Lecture.pptx', teacher: 'Dr. Anuradha T.', subject: 'Physics', size: '8.1 MB', date: '3 days ago', color: '#10B981', type: 'pptx' },
  { id: 'f3', name: 'Chemistry — Periodic Table Chart.png', teacher: 'Prof. R.S. Metri', subject: 'Chemistry', size: '1.2 MB', date: '5 days ago', color: '#F59E0B', type: 'image' },
  { id: 'f4', name: 'Data Structures — Linked List Tutorial.pdf', teacher: 'Prof. K.A. Kalagond', subject: 'Data Structures', size: '3.7 MB', date: '1 week ago', color: '#8B5CF6', type: 'pdf' },
  { id: 'f5', name: 'English — Essay Writing Guide.docx', teacher: 'Ms. Priya S.', subject: 'English', size: '0.8 MB', date: '1 week ago', color: '#EC4899', type: 'docx' },
];

const MOCK_SUBMISSIONS = [
  { id: 's1', name: 'Algebra Homework — Draft.pdf', assignment: 'Algebra Homework — Ch 3', status: 'SUBMITTED', date: 'Mar 28', size: '1.1 MB', type: 'pdf' },
  { id: 's2', name: 'DSA — LinkedList.c', assignment: 'Linked List Implementation', status: 'GRADED', date: 'Mar 25', size: '0.3 MB', type: 'code' },
  { id: 's3', name: 'English Essay — Final.docx', assignment: 'Technology in Education', status: 'GRADED', date: 'Mar 22', size: '0.6 MB', type: 'docx' },
];

const FILE_ICONS: Record<string, string> = {
  pdf: 'picture_as_pdf',
  pptx: 'slideshow',
  docx: 'description',
  image: 'image',
  code: 'code',
};

export default function FilesPage() {
  const [tab, setTab] = useState<FileTab>('shared');

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h2 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
          Files
        </h2>
        <p className="text-[0.7rem] text-[var(--text-muted)] mt-1">Teacher resources and your submissions</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['shared', 'submissions'] as FileTab[]).map((t) => (
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
              {t === 'shared' ? 'folder_shared' : 'upload_file'}
            </span>
            {t === 'shared' ? 'Shared Resources' : 'My Submissions'}
          </button>
        ))}
      </div>

      {/* Shared Files */}
      {tab === 'shared' && (
        <div className="space-y-2">
          {MOCK_SHARED_FILES.map((file) => (
            <div
              key={file.id}
              className="comic-card p-0 cursor-pointer"
            >
              <div className="flex items-center gap-3 p-3 lg:p-4">
                <div
                  className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${file.color}15` }}
                >
                  <span className="material-symbols-outlined text-[20px]" style={{ color: file.color }}>
                    {FILE_ICONS[file.type] || 'draft'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.75rem] font-bold truncate">{file.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[0.6rem] font-bold text-[var(--text-muted)]">{file.teacher}</span>
                    <span className="text-[0.5rem] text-[var(--text-muted)]">•</span>
                    <span className="text-[0.6rem] text-[var(--text-muted)]">{file.size}</span>
                    <span className="text-[0.5rem] text-[var(--text-muted)]">•</span>
                    <span className="text-[0.6rem] text-[var(--text-muted)]">{file.date}</span>
                  </div>
                </div>
                <button className="shrink-0 w-8 h-8 rounded-[8px] flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <span className="material-symbols-outlined text-[18px] text-[var(--text-muted)]">download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submissions */}
      {tab === 'submissions' && (
        <div className="space-y-2">
          {MOCK_SUBMISSIONS.map((file) => (
            <div key={file.id} className="comic-card p-0">
              <div className="flex items-center gap-3 p-3 lg:p-4">
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center bg-gray-100 shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-[var(--text-secondary)]">
                    {FILE_ICONS[file.type] || 'draft'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.75rem] font-bold truncate">{file.name}</p>
                  <p className="text-[0.6rem] text-[var(--text-muted)] truncate mt-0.5">{file.assignment}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[0.55rem] text-[var(--text-muted)]">{file.size}</span>
                    <span className="text-[0.5rem] text-[var(--text-muted)]">•</span>
                    <span className="text-[0.55rem] text-[var(--text-muted)]">{file.date}</span>
                  </div>
                </div>
                <ComicBadge
                  color={file.status === 'GRADED' ? 'var(--success)' : 'var(--primary)'}
                  variant="outline"
                >
                  {file.status}
                </ComicBadge>
              </div>
            </div>
          ))}

          {MOCK_SUBMISSIONS.length === 0 && (
            <ComicCard padding="lg" className="text-center">
              <span className="material-symbols-outlined text-[48px] text-[var(--text-muted)] mb-3 block">cloud_upload</span>
              <p className="font-bold text-[var(--text-secondary)]">No submissions yet</p>
              <p className="text-[0.7rem] text-[var(--text-muted)] mt-1">Your assignment submissions will appear here</p>
            </ComicCard>
          )}
        </div>
      )}
    </div>
  );
}
