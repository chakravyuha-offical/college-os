import { type NavItem, type UserRole } from '@/types';

// ============================================
// Role Definitions & Labels
// ============================================
export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  principal: 'Principal',
  vice_principal: 'Vice Principal',
  coordinator: 'Coordinator',
  hod: 'HOD',
  teacher: 'Teacher',
  student: 'Student',
  parent: 'Parent',
};

export const ROLE_COLORS: Record<UserRole, string> = {
  super_admin: '#EF4444',
  principal: '#8B5CF6',
  vice_principal: '#7C3AED',
  coordinator: '#F59E0B',
  hod: '#10B981',
  teacher: '#3B82F6',
  student: '#6366F1',
  parent: '#EC4899',
};

// ============================================
// Navigation Items (role-filtered)
// ============================================
export const DASHBOARD_NAV_ITEMS: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: 'dashboard', roles: ['principal', 'vice_principal', 'coordinator', 'hod', 'teacher', 'student', 'parent'] },
  { title: 'Schedule', href: '/schedule', icon: 'calendar_month', roles: ['principal', 'vice_principal', 'coordinator', 'hod', 'teacher', 'student', 'parent'] },
  { title: 'Attendance', href: '/attendance', icon: 'fact_check', roles: ['principal', 'vice_principal', 'coordinator', 'hod', 'teacher', 'student', 'parent'] },
  { title: 'Assignments', href: '/assignments', icon: 'assignment', roles: ['principal', 'vice_principal', 'coordinator', 'hod', 'teacher', 'student', 'parent'] },
  { title: 'Exams', href: '/exams', icon: 'quiz', roles: ['principal', 'vice_principal', 'coordinator', 'hod', 'teacher', 'student', 'parent'] },
  { title: 'Files', href: '/files', icon: 'folder_open', roles: ['principal', 'vice_principal', 'coordinator', 'hod', 'teacher', 'student'] },
  { title: 'Notices', href: '/notices', icon: 'campaign', roles: ['principal', 'vice_principal', 'coordinator', 'hod', 'teacher', 'student', 'parent'] },
  { title: 'Analytics', href: '/analytics', icon: 'analytics', roles: ['principal', 'vice_principal', 'coordinator', 'hod', 'teacher', 'student', 'parent'] },
  { title: 'Classes', href: '/classes', icon: 'groups', roles: ['principal', 'vice_principal', 'coordinator', 'hod', 'teacher'] },
  { title: 'Messages', href: '/messages', icon: 'chat', roles: ['student', 'parent', 'teacher'] },
  { title: 'Parents', href: '/parents', icon: 'family_restroom', roles: ['principal', 'vice_principal', 'coordinator', 'hod', 'teacher'] },
  { title: 'Settings', href: '/settings', icon: 'settings', roles: ['principal', 'vice_principal', 'coordinator', 'hod', 'teacher', 'student', 'parent'] },
];

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { title: 'Branches', href: '/admin/branches', icon: 'account_tree', roles: ['principal', 'vice_principal', 'coordinator'] },
  { title: 'Semesters', href: '/admin/semesters', icon: 'date_range', roles: ['principal', 'vice_principal', 'coordinator'] },
  { title: 'Subjects', href: '/admin/subjects', icon: 'menu_book', roles: ['principal', 'vice_principal', 'coordinator', 'hod'] },
  { title: 'Timetable Mgmt', href: '/admin/timetable', icon: 'edit_calendar', roles: ['principal', 'vice_principal', 'coordinator', 'hod'] },
];

export const SUPERADMIN_NAV_ITEMS: NavItem[] = [
  { title: 'Tenants', href: '/superadmin/tenants', icon: 'domain', roles: ['super_admin'] },
  { title: 'Billing', href: '/superadmin/billing', icon: 'payments', roles: ['super_admin'] },
  { title: 'System', href: '/superadmin/system', icon: 'settings_suggest', roles: ['super_admin'] },
];

// ============================================
// Role-based Redirect Paths
// ============================================
export const ROLE_REDIRECT: Record<UserRole, string> = {
  super_admin: '/superadmin/tenants',
  principal: '/',
  vice_principal: '/',
  coordinator: '/',
  hod: '/',
  teacher: '/schedule',
  student: '/',
  parent: '/',
};

// ============================================
// Days of the Week
// ============================================
export const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;

// ============================================
// Subject Colors (for badges/cards)
// ============================================
export const SUBJECT_COLORS = [
  '#6366F1', // indigo
  '#8B5CF6', // violet
  '#EC4899', // pink
  '#EF4444', // red
  '#F97316', // orange
  '#F59E0B', // amber
  '#10B981', // emerald
  '#14B8A6', // teal
  '#06B6D4', // cyan
  '#3B82F6', // blue
] as const;
