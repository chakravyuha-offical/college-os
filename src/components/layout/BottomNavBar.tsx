'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type UserRole } from '@/types';

interface BottomNavItem {
  title: string;
  href: string;
  icon: string;
}

// Mobile bottom nav: Home, Schedule, Tasks, Files, Settings
const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { title: 'Home', href: '/', icon: 'dashboard' },
  { title: 'Schedule', href: '/schedule', icon: 'calendar_month' },
  { title: 'Tasks', href: '/assignments', icon: 'assignment' },
  { title: 'Files', href: '/files', icon: 'folder_open' },
  { title: 'Settings', href: '/settings', icon: 'settings' },
];

interface BottomNavBarProps {
  role: UserRole;
}

export default function BottomNavBar({ role }: BottomNavBarProps) {
  const pathname = usePathname();

  // Parents don't see Files
  const items = role === 'parent'
    ? BOTTOM_NAV_ITEMS.filter(i => i.href !== '/files')
    : BOTTOM_NAV_ITEMS;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="bottom-nav lg:hidden">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`bottom-nav-item ${isActive(item.href) ? 'active' : ''}`}
        >
          <span
            className={`material-symbols-outlined text-[22px] ${isActive(item.href) ? 'filled' : ''}`}
          >
            {item.icon}
          </span>
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}
