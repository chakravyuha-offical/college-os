'use client';

import Link from 'next/link';
import ComicCard from '@/components/ui/ComicCard';
import ComicBadge from '@/components/ui/ComicBadge';
import StatCard from '@/components/ui/StatCard';
import ComicButton from '@/components/ui/ComicButton';

const MOCK_TENANTS = [
  { id: '1', name: 'KLE Technological University', students: 1320, staff: 85, status: 'ACTIVE', plan: 'PAID', trialEnds: null },
  { id: '2', name: 'RV College of Engineering', students: 950, staff: 62, status: 'TRIAL', plan: 'TRIAL', trialEnds: '2026-04-12' },
  { id: '3', name: 'BMS College of Engineering', students: 0, staff: 1, status: 'TRIAL', plan: 'TRIAL', trialEnds: '2026-04-20' },
];

export default function SuperAdminTenantsPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-bg)]">
      {/* Superadmin Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b-3 border-[var(--comic-border)] bg-[var(--surface-card)] px-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[10px] bg-[#EF4444] flex items-center justify-center border-2 border-[var(--comic-border)] comic-shadow-sm">
            <span className="material-symbols-outlined text-white text-[18px]">admin_panel_settings</span>
          </div>
          <div>
            <span className="text-sm font-extrabold uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
              Super Admin
            </span>
            <span className="text-[0.55rem] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
              College OS Control Panel
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[0.65rem] font-bold text-[var(--primary)] hover:underline">
            ← Back to Dashboard
          </Link>
          <div className="w-9 h-9 rounded-full bg-[#EF4444] flex items-center justify-center border-2 border-[var(--comic-border)]">
            <span className="text-[0.6rem] font-extrabold text-white">SA</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 lg:p-8 space-y-6 animate-slide-up">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard title="Total Colleges" value={MOCK_TENANTS.length} icon="domain" color="#6366F1" />
          <StatCard title="Active Users" value="2,350+" icon="group" color="#10B981" />
          <StatCard title="Revenue (MRR)" value="₹28K" icon="payments" color="#F59E0B" />
          <StatCard title="Trial Colleges" value={MOCK_TENANTS.filter(t => t.status === 'TRIAL').length} icon="hourglass_top" color="#EF4444" />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
            Tenant Registry
          </h2>
          <ComicButton variant="primary" size="md">
            <span className="material-symbols-outlined text-[16px]">add</span>
            Add College
          </ComicButton>
        </div>

        {/* Tenant List */}
        <div className="space-y-3">
          {MOCK_TENANTS.map((tenant) => (
            <ComicCard key={tenant.id} padding="none" className="cursor-pointer">
              <div className="p-4 lg:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-[14px] bg-[var(--primary)]/10 flex items-center justify-center border-2 border-[var(--primary)]/20">
                      <span className="material-symbols-outlined text-[24px] text-[var(--primary)]">apartment</span>
                    </div>
                    <div>
                      <h3 className="text-[0.85rem] font-extrabold">{tenant.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[0.6rem] font-bold text-[var(--text-muted)] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">group</span>
                          {tenant.students} students
                        </span>
                        <span className="text-[0.6rem] font-bold text-[var(--text-muted)] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">badge</span>
                          {tenant.staff} staff
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ComicBadge
                      color={tenant.status === 'ACTIVE' ? 'var(--success)' : 'var(--warning)'}
                      variant="filled"
                    >
                      {tenant.status}
                    </ComicBadge>
                    {tenant.trialEnds && (
                      <span className="text-[0.55rem] font-bold text-[var(--text-muted)]">
                        expires {new Date(tenant.trialEnds).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    )}
                  </div>
                </div>

                {/* Revenue Row */}
                <div className="mt-3 pt-3 border-t-2 border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-[0.6rem] font-bold text-[var(--text-muted)]">
                      Revenue: <strong className="text-[var(--text-primary)]">₹{(tenant.students * 10 + tenant.staff * 15).toLocaleString()}/mo</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ComicButton variant="ghost" size="sm">Manage</ComicButton>
                    <ComicButton variant="outline" size="sm">
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </ComicButton>
                  </div>
                </div>
              </div>
            </ComicCard>
          ))}
        </div>
      </main>
    </div>
  );
}
