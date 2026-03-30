'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopAppBar from '@/components/layout/TopAppBar';
import BottomNavBar from '@/components/layout/BottomNavBar';
import { DASHBOARD_NAV_ITEMS, ADMIN_NAV_ITEMS } from '@/lib/constants';
import { useAuthStore } from '@/lib/store/auth';
import { createClient } from '@/lib/supabase/client';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, initializeAuth, isLoading } = useAuthStore();

  useEffect(() => {
    const supabase = createClient();
    initializeAuth(supabase);
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full bg-[var(--surface-bg)] items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-pulse">
           <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-[0_4px_24px_rgba(99,102,241,0.4)]">
             <span className="material-symbols-outlined text-white text-[28px]">school</span>
           </div>
           <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Loading Workspace...</p>
        </div>
      </div>
    );
  }

  // Fallback role for dev if not tracked yet
  const role = user?.role || 'student';

  return (
    <div className="flex min-h-screen w-full bg-[var(--surface-bg)]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0 h-screen sticky top-0 z-30">
        <Sidebar
          navItems={DASHBOARD_NAV_ITEMS}
          adminItems={ADMIN_NAV_ITEMS}
          role={role}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 animate-fade-in"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full animate-slide-in-right">
            <Sidebar
              navItems={DASHBOARD_NAV_ITEMS}
              adminItems={ADMIN_NAV_ITEMS}
              role={role}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopAppBar
          title="Dashboard"
          onMenuToggle={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8 page-transition">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Nav */}
        <BottomNavBar role={role} />
      </div>
    </div>
  );
}
