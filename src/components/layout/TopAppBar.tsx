'use client';

interface TopAppBarProps {
  title: string;
  onMenuToggle?: () => void;
  showMenu?: boolean;
  children?: React.ReactNode;
}

export default function TopAppBar({ title, onMenuToggle, showMenu = true, children }: TopAppBarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b-3 border-[var(--comic-border)] bg-[var(--surface-card)] px-4 lg:px-6">
      {/* Mobile Menu Toggle */}
      {showMenu && (
        <button
          onClick={onMenuToggle}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-[12px] border-2 border-[var(--comic-border)] bg-white active-press comic-shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>
      )}

      {/* Logo (desktop) */}
      <div className="hidden lg:flex items-center gap-2">
        <div className="w-8 h-8 rounded-[10px] bg-[var(--primary)] flex items-center justify-center comic-shadow-sm border-2 border-[var(--comic-border)]">
          <span className="material-symbols-outlined text-white text-[18px]">school</span>
        </div>
        <span className="text-sm font-extrabold uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
          College OS
        </span>
      </div>

      {/* Title */}
      <h1 className="text-[0.7rem] font-extrabold uppercase tracking-[0.15em] text-[var(--text-secondary)] flex-1 truncate lg:text-center">
        {title}
      </h1>

      {/* Right Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {children}
        {/* Notifications */}
        <button className="relative flex items-center justify-center w-10 h-10 rounded-[12px] border-2 border-[var(--comic-border)] bg-white active-press comic-shadow-sm hover:bg-gray-50 transition-colors">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--danger)] text-white text-[0.55rem] font-bold flex items-center justify-center border-2 border-[var(--comic-border)]">
            3
          </span>
        </button>
        {/* Profile */}
        <button className="flex items-center justify-center w-10 h-10 rounded-full border-3 border-[var(--comic-border)] bg-[var(--primary)] text-white active-press comic-shadow-sm">
          <span className="text-[0.7rem] font-extrabold">A</span>
        </button>
      </div>
    </header>
  );
}
