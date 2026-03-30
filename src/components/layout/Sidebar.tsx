'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type NavItem, type UserRole } from '@/types';
import { useAuthStore } from '@/lib/store/auth';

interface SidebarProps {
  navItems: NavItem[];
  adminItems?: NavItem[];
  role: UserRole;
  onClose?: () => void;
  collegeName?: string;
}

export default function Sidebar({ navItems, adminItems, role, onClose, collegeName = 'KLE Tech' }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const filteredItems = navItems.filter(item => item.roles.includes(role));
  const filteredAdminItems = adminItems?.filter(item => item.roles.includes(role)) || [];

  // Super admins have special routes
  if (role === 'super_admin') {
     filteredItems.push({ title: 'Tenants', href: '/superadmin/tenants', icon: 'domain', roles: ['super_admin'] });
  }

  // Adding invite route dynamically for permitted roles
  if (['principal', 'vice_principal', 'coordinator', 'hod', 'teacher'].includes(role)) {
     if (filteredAdminItems.findIndex(i => i.href === '/admin/invites') === -1) {
       filteredAdminItems.push({ title: 'Invites', href: '/admin/invites', icon: 'group_add', roles: ['principal', 'vice_principal', 'coordinator', 'hod', 'teacher'] });
     }
  }

  const isActive = (href: string) => {
    if (href === '/home') return pathname === '/home';
    return pathname.startsWith(href);
  };

  return (
    <aside className="flex flex-col h-full w-[280px] bg-[var(--surface-bg)] border-r border-[var(--surface-border)] overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-[#6366F1]/5 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-[0_4px_16px_rgba(99,102,241,0.2)]">
              <span className="material-symbols-outlined text-white text-[22px]">school</span>
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                College OS
              </p>
              <p className="text-[0.65rem] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                {collegeName}
              </p>
            </div>
          </div>
          {/* Close button (mobile) */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-[8px] bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] hover:text-white transition-colors border border-white/5"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5 scrollbar-hide relative z-10">
        <p className="px-3 pb-2 pt-1 text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Main
        </p>
        {filteredItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-[12px] text-[0.75rem] font-bold uppercase tracking-wide transition-all ${
              isActive(item.href)
                ? 'bg-gradient-to-r from-[#6366F1]/15 to-transparent text-white border border-[#6366F1]/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                : 'text-[var(--text-secondary)] hover:bg-[#ffffff05] hover:text-[var(--text-primary)] border border-transparent'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] ${isActive(item.href) ? 'filled text-[#818CF8]' : ''}`}
            >
              {item.icon}
            </span>
            <span className="flex-1">{item.title}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="w-5 h-5 rounded-full bg-[var(--danger)]/20 border border-[var(--danger)]/30 text-[var(--danger)] text-[0.6rem] font-bold flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </Link>
        ))}

        {/* Admin Section */}
        {filteredAdminItems.length > 0 && (
          <>
            <p className="px-3 pt-6 pb-2 text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Admin
            </p>
            {filteredAdminItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-[12px] text-[0.75rem] font-bold uppercase tracking-wide transition-all ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-[#10B981]/15 to-transparent text-white border border-[#10B981]/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                    : 'text-[var(--text-secondary)] hover:bg-[#ffffff05] hover:text-[var(--text-primary)] border border-transparent'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive(item.href) ? 'filled text-[#34D399]' : ''}`}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.title}</span>
              </Link>
            ))}
          </>
        )}
      </nav>

      {/* Footer / User Info */}
      <div className="p-4 border-t border-[var(--surface-border)] relative z-10 bg-[var(--surface-card)]">
        <div className="flex items-center gap-3 p-3 rounded-[14px] bg-[var(--surface-elevated)] border border-[var(--surface-border)] hover:border-white/10 transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center shadow-inner">
            <span className="text-[0.7rem] font-black text-white">
              {user?.fullName.charAt(0).toUpperCase() || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[0.75rem] font-bold text-white truncate capitalize">{user?.fullName || 'Loading...'}</p>
            <p className="text-[0.6rem] text-[var(--text-muted)] font-bold uppercase tracking-wider truncate">
              {role.replace('_', ' ')}
            </p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-white/5 hover:bg-[var(--danger)]/20 hover:text-[var(--danger)] transition-colors border border-transparent hover:border-[var(--danger)]/30"
            title="Log out"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
