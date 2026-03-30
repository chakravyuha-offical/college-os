'use client';

import ComicCard from '@/components/ui/ComicCard';
import ComicButton from '@/components/ui/ComicButton';
import ComicBadge from '@/components/ui/ComicBadge';

export default function ProfilePage() {
  return (
    <div className="space-y-6 animate-slide-up max-w-4xl mx-auto">
      <div className="relative h-48 rounded-[20px] bg-gradient-to-tr from-[var(--primary)] to-[var(--primary-dark)] comic-shadow comic-border overflow-hidden">
        <div className="absolute inset-0 halftone opacity-30 mix-blend-overlay"></div>
        <div className="absolute bottom-4 right-4 flex gap-2">
          <ComicButton size="sm" variant="secondary">
            <span className="material-symbols-outlined text-[14px]">edit</span> Edit Cover
          </ComicButton>
        </div>
      </div>

      <div className="relative px-6 pb-6 -mt-16 flex flex-col md:flex-row gap-6 md:items-end">
        <div className="w-32 h-32 rounded-full border-4 border-white comic-shadow shrink-0 bg-white overflow-hidden relative z-10">
          <div className="w-full h-full bg-[var(--primary)]/10 flex items-center justify-center text-4xl font-black text-[var(--primary)]">
            A
          </div>
        </div>
        
        <div className="flex-1 pb-2">
          <h2 className="text-3xl font-black tracking-tight leading-none" style={{ fontFamily: 'var(--font-heading)' }}>Aditya Gothe</h2>
          <p className="text-[0.95rem] font-bold text-[var(--text-muted)] flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-[16px]">school</span> Grade 12 CSE-A • Class of 2026
          </p>
        </div>

        <div className="flex gap-3 pb-2 w-full md:w-auto">
          <ComicButton size="md" className="flex-1 md:flex-none justify-center">Follow</ComicButton>
          <ComicButton size="md" variant="secondary" className="flex-1 md:flex-none justify-center">Message</ComicButton>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <ComicCard padding="lg">
            <h3 className="font-black uppercase tracking-wider text-[0.8rem] text-[var(--text-secondary)] mb-4">About Me</h3>
            <p className="text-[0.85rem] font-bold leading-relaxed mb-4">
              Passionate about coding, AI, and building cool things. Looking for teammates for the upcoming hackathon!
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[0.8rem]">
                <span className="font-bold text-[var(--text-muted)]">Followers</span>
                <span className="font-black">1.2k</span>
              </div>
              <div className="flex justify-between items-center text-[0.8rem]">
                <span className="font-bold text-[var(--text-muted)]">Following</span>
                <span className="font-black">248</span>
              </div>
            </div>
          </ComicCard>

          <ComicCard padding="lg">
            <h3 className="font-black uppercase tracking-wider text-[0.8rem] text-[var(--text-secondary)] mb-4">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              <ComicBadge color="var(--primary)" variant="outline">React</ComicBadge>
              <ComicBadge color="var(--secondary)" variant="outline">Next.js</ComicBadge>
              <ComicBadge color="var(--success)" variant="outline">Supabase</ComicBadge>
            </div>
          </ComicCard>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h3 className="font-black uppercase tracking-wider text-[0.8rem] text-[var(--text-secondary)] ml-2">Recent Activity</h3>
          <ComicCard padding="lg" className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0 text-[var(--primary)]">
              <span className="material-symbols-outlined">emoji_events</span>
            </div>
            <div>
              <p className="text-[0.85rem] font-extrabold mb-1">Won 1st Place in Intra-College Hackathon!</p>
              <p className="text-[0.75rem] font-bold text-[var(--text-muted)]">Built a habit-tracking app with my team. Thanks to everyone who supported us! 🚀</p>
              <span className="text-[0.65rem] font-bold text-[var(--text-muted)] block mt-2 mt-4 uppercase tracking-wider">2 days ago</span>
            </div>
          </ComicCard>
          
          <ComicCard padding="lg" className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--secondary)]/10 flex items-center justify-center shrink-0 text-[var(--secondary)]">
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <div>
              <p className="text-[0.85rem] font-extrabold mb-1">Scored A+ in Data Structures Assignment</p>
              <p className="text-[0.75rem] font-bold text-[var(--text-muted)]">Linked Lists and Trees finally make sense.</p>
              <span className="text-[0.65rem] font-bold text-[var(--text-muted)] block mt-2 mt-4 uppercase tracking-wider">1 week ago</span>
            </div>
          </ComicCard>
        </div>
      </div>
    </div>
  );
}
