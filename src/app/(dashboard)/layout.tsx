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
  const { user, initializeAuth } = useAuthStore();

  useEffect(() => {
    const supabase = createClient();
    initializeAuth(supabase);
  }, [initializeAuth]);

  // Fallback role for dev if not tracked yet
  const role = user?.role || 'student';

  return (
    <div className="flex min-h-screen w-full bg-[var(--surface-bg)]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0 h-screen sticky top-0">
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
