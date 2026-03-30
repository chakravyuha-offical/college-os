'use client';

import { useState } from 'react';
import ComicCard from '@/components/ui/ComicCard';
import ComicButton from '@/components/ui/ComicButton';
import ComicInput from '@/components/ui/ComicInput';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    attendance: true,
    assignments: true,
    notices: true,
    results: true,
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="space-y-6 animate-slide-up max-w-3xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
          Settings
        </h2>
        <p className="text-[0.7rem] text-[var(--text-muted)] mt-1">Manage your profile and preferences</p>
      </div>

      {/* Profile Section */}
      <ComicCard padding="lg">
        <h3 className="text-sm font-extrabold uppercase tracking-wider mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
          Profile
        </h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[var(--primary)] flex items-center justify-center border-3 border-[var(--comic-border)] comic-shadow">
            <span className="text-xl font-extrabold text-white">A</span>
          </div>
          <div>
            <p className="font-bold text-base">Aditya Gothe</p>
            <p className="text-[0.7rem] text-[var(--text-muted)]">aditya@college.edu • Student</p>
          </div>
          <ComicButton variant="outline" size="sm" className="ml-auto">
            Edit
          </ComicButton>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <ComicInput label="Full Name" value="Aditya Gothe" readOnly />
          <ComicInput label="Email" value="aditya@college.edu" readOnly />
          <ComicInput label="Roll Number" value="1RV22CS001" readOnly />
          <ComicInput label="Division" value="CSE — Division D" readOnly />
        </div>
      </ComicCard>

      {/* Appearance */}
      <ComicCard padding="lg">
        <h3 className="text-sm font-extrabold uppercase tracking-wider mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
          Appearance
        </h3>
        <div className="flex items-center justify-between p-3 rounded-[12px] border-2 border-gray-200">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px] text-[var(--text-secondary)]">
              {darkMode ? 'dark_mode' : 'light_mode'}
            </span>
            <div>
              <p className="text-[0.75rem] font-bold">Dark Mode</p>
              <p className="text-[0.6rem] text-[var(--text-muted)]">Switch the interface to dark theme</p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`w-12 h-7 rounded-full border-2 border-[var(--comic-border)] transition-all relative ${darkMode ? 'bg-[var(--primary)]' : 'bg-gray-200'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white border-2 border-[var(--comic-border)] absolute top-[1px] transition-transform ${darkMode ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
          </button>
        </div>
      </ComicCard>

      {/* Notifications */}
      <ComicCard padding="lg">
        <h3 className="text-sm font-extrabold uppercase tracking-wider mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
          Notifications
        </h3>
        <div className="space-y-3">
          {[
            { key: 'push', label: 'Push Notifications', desc: 'Receive push notifications on your device', icon: 'notifications' },
            { key: 'email', label: 'Email Notifications', desc: 'Get important updates via email', icon: 'mail' },
            { key: 'sms', label: 'SMS Notifications', desc: 'Receive SMS for urgent alerts', icon: 'sms' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-3 rounded-[12px] border-2 border-gray-200">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-[var(--text-secondary)]">{item.icon}</span>
                <div>
                  <p className="text-[0.75rem] font-bold">{item.label}</p>
                  <p className="text-[0.6rem] text-[var(--text-muted)]">{item.desc}</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                className={`w-12 h-7 rounded-full border-2 border-[var(--comic-border)] transition-all relative ${notifications[item.key as keyof typeof notifications] ? 'bg-[var(--primary)]' : 'bg-gray-200'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white border-2 border-[var(--comic-border)] absolute top-[1px] transition-transform ${notifications[item.key as keyof typeof notifications] ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t-2 border-gray-100">
          <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">Notify me about</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { key: 'attendance', label: 'Attendance' },
              { key: 'assignments', label: 'Assignments' },
              { key: 'notices', label: 'Notices' },
              { key: 'results', label: 'Exam Results' },
            ].map((item) => (
              <label key={item.key} className="flex items-center gap-2 p-2 rounded-[8px] hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[item.key as keyof typeof notifications]}
                  onChange={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                  className="w-4 h-4 rounded border-2 accent-[var(--primary)]"
                />
                <span className="text-[0.7rem] font-bold text-[var(--text-secondary)]">{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </ComicCard>

      {/* About & Danger Zone */}
      <ComicCard padding="lg">
        <h3 className="text-sm font-extrabold uppercase tracking-wider mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          About
        </h3>
        <div className="space-y-2 text-[0.7rem] text-[var(--text-muted)]">
          <p><strong>College OS</strong> v0.1.0-beta</p>
          <p>Built by Aditya Gothe</p>
          <p>Powered by Next.js, Supabase, and Vercel</p>
        </div>
      </ComicCard>

      <ComicCard padding="lg" className="border-[var(--danger)]">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-[var(--danger)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Danger Zone
        </h3>
        <p className="text-[0.7rem] text-[var(--text-muted)] mb-4">
          Once you sign out, you will need to log in again to access your dashboard.
        </p>
        <ComicButton variant="danger" size="md">
          <span className="material-symbols-outlined text-[16px]">logout</span>
          Sign Out
        </ComicButton>
      </ComicCard>
    </div>
  );
}
