'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type NavItem, type UserRole } from '@/types';

interface SidebarProps {
  navItems: NavItem[];
  adminItems?: NavItem[];
  role: UserRole;
  onClose?: () => void;
  collegeName?: string;
}

export default function Sidebar({ navItems, adminItems, role, onClose, collegeName = 'KLE Tech' }: SidebarProps) {
  const pathname = usePathname();

  const filteredItems = navItems.filter(item => item.roles.includes(role));
  const filteredAdminItems = adminItems?.filter(item => item.roles.includes(role)) || [];

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <aside className="flex flex-col h-full w-[280px] bg-[var(--surface-card)] border-r-3 border-[var(--comic-border)] overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b-3 border-[var(--comic-border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-[12px] bg-[var(--primary)] flex items-center justify-center comic-shadow-sm border-2 border-[var(--comic-border)]">
              <span className="material-symbols-outlined text-white text-[22px]">school</span>
            </div>
            <div>
              <p className="text-sm font-extrabold uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
                College OS
              </p>
              <p className="text-[0.6rem] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                {collegeName}
              </p>
            </div>
          </div>
          {/* Close button (mobile) */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-[8px] border-2 border-[var(--comic-border)] hover:bg-gray-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-hide">
        <p className="px-3 py-2 text-[0.55rem] font-extrabold uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Main
        </p>
        {filteredItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[0.75rem] font-bold uppercase tracking-wide transition-all bouncy-transition ${
              isActive(item.href)
                ? 'bg-[var(--primary)] text-white comic-shadow-sm border-2 border-[var(--comic-border)]'
                : 'text-[var(--text-secondary)] hover:bg-gray-100 hover:text-[var(--text-primary)] border-2 border-transparent'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] ${isActive(item.href) ? 'filled' : ''}`}
            >
              {item.icon}
            </span>
            <span className="flex-1">{item.title}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="w-5 h-5 rounded-full bg-[var(--danger)] text-white text-[0.55rem] font-bold flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </Link>
        ))}

        {/* Admin Section */}
        {filteredAdminItems.length > 0 && (
          <>
            <p className="px-3 pt-4 pb-2 text-[0.55rem] font-extrabold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Admin
            </p>
            {filteredAdminItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[0.75rem] font-bold uppercase tracking-wide transition-all bouncy-transition ${
                  isActive(item.href)
                    ? 'bg-[var(--secondary)] text-white comic-shadow-sm border-2 border-[var(--comic-border)]'
                    : 'text-[var(--text-secondary)] hover:bg-gray-100 hover:text-[var(--text-primary)] border-2 border-transparent'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive(item.href) ? 'filled' : ''}`}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.title}</span>
              </Link>
            ))}
          </>
        )}
      </nav>

      {/* Footer / User Info */}
      <div className="p-4 border-t-3 border-[var(--comic-border)]">
        <div className="flex items-center gap-3 p-3 rounded-[14px] bg-gray-50 border-2 border-gray-200">
          <div className="w-9 h-9 rounded-full bg-[var(--primary)] flex items-center justify-center border-2 border-[var(--comic-border)]">
            <span className="text-[0.65rem] font-extrabold text-white">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[0.7rem] font-bold truncate capitalize">{role.replace('_', ' ')}</p>
            <p className="text-[0.55rem] text-[var(--text-muted)] font-bold uppercase tracking-wider">
              Online
            </p>
          </div>
          <button className="flex items-center justify-center w-7 h-7 rounded-[8px] hover:bg-gray-200 transition-colors">
            <span className="material-symbols-outlined text-[16px] text-[var(--text-muted)]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
