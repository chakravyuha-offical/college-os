'use client';

import ComicCard from '@/components/ui/ComicCard';
import ComicButton from '@/components/ui/ComicButton';
import ComicBadge from '@/components/ui/ComicBadge';
import { useState } from 'react';

const PARENTS = [
  { id: '1', name: 'Ramesh Gothe', relation: 'Father', phone: '+91 9876543210', students: ['Aditya Gothe'], verified: true },
  { id: '2', name: 'Sunita Sharma', relation: 'Mother', phone: '+91 9123456780', students: ['Rahul Sharma', 'Neha Sharma'], verified: true },
  { id: '3', name: 'Vikram Singh', relation: 'Guardian', phone: '+91 9988776655', students: ['Priya Singh'], verified: false },
];

export default function ParentsRegistryPage() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-6 animate-slide-up max-w-5xl">
       <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
            Parent Registry
          </h2>
          <p className="text-[0.7rem] text-[var(--text-muted)] mt-1">Manage guardian contacts and student links</p>
        </div>
        <ComicButton size="md" onClick={() => setShowAdd(!showAdd)}>
          <span className="material-symbols-outlined text-[16px]">{showAdd ? 'close' : 'person_add'}</span>
          {showAdd ? 'Cancel' : 'Register Parent'}
        </ComicButton>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PARENTS.map(parent => (
          <ComicCard key={parent.id} padding="lg">
            <div className="flex justify-between items-start mb-3">
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center font-black text-xl">
                {parent.name.charAt(0)}
              </div>
              {parent.verified ? (
                <ComicBadge color="var(--success)" variant="filled" className="gap-1 flex items-center">
                  <span className="material-symbols-outlined text-[10px]">verified</span> Verified
                </ComicBadge>
              ) : (
                <ComicBadge color="var(--warning)" variant="outline">Pending Login</ComicBadge>
              )}
            </div>
            <h3 className="text-[1rem] font-extrabold mb-1">{parent.name}</h3>
            <p className="text-[0.7rem] font-bold text-[var(--text-muted)] mb-3 flex items-center gap-1">
              {parent.relation} • {parent.phone}
            </p>

            <div className="pt-3 border-t-2 border-gray-100 flex flex-col gap-2">
              <span className="text-[0.6rem] font-black uppercase tracking-wider text-[var(--text-secondary)]">Linked Students</span>
              <div className="flex flex-wrap gap-2">
                {parent.students.map(s => (
                  <span key={s} className="px-2 py-1 bg-gray-100 rounded-md text-[0.65rem] font-bold text-[var(--text-primary)]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
               <ComicButton size="sm" variant="secondary" className="flex-1 justify-center hidden sm:flex">Message</ComicButton>
               <ComicButton size="sm" variant="outline" className="flex-1 justify-center">Manage</ComicButton>
            </div>
          </ComicCard>
        ))}
      </div>
    </div>
  );
}
