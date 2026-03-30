'use client';

interface TopAppBarProps {
  title: string;
  onMenuToggle?: () => void;
  showMenu?: boolean;
  children?: React.ReactNode;
}

export default function TopAppBar({ title, onMenuToggle, showMenu = true, children }: TopAppBarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 bg-[var(--surface-bg)]/80 backdrop-blur-xl border-b border-[var(--surface-border)] px-4 lg:px-8">
      {/* Mobile Menu Toggle */}
      {showMenu && (
        <button
          onClick={onMenuToggle}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-[10px] bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-white hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>
      )}

      {/* Logo (desktop) */}
      <div className="hidden lg:flex items-center gap-3">
        <div className="w-8 h-8 rounded-[8px] bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
          <span className="material-symbols-outlined text-white text-[16px]">school</span>
        </div>
        <span className="text-sm font-black uppercase tracking-wider text-white" style={{ fontFamily: 'var(--font-heading)' }}>
          College OS
        </span>
      </div>

      <div className="hidden lg:block h-5 w-px bg-[var(--surface-border)] mx-2" />

      {/* Title */}
      <h1 className="text-[0.75rem] font-extrabold uppercase tracking-[0.15em] text-[var(--text-secondary)] flex-1 truncate">
        {title}
      </h1>

      {/* Right Actions */}
      <div className="flex items-center gap-3 shrink-0">
        {children}
        
        {/* Search */}
        <button className="hidden lg:flex items-center justify-center w-10 h-10 rounded-[10px] bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-[var(--text-muted)] hover:text-white transition-colors">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>

        {/* Notifications */}
        <button className="relative flex items-center justify-center w-10 h-10 rounded-[10px] bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-[var(--text-muted)] hover:text-white transition-colors">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-[var(--danger)] text-white text-[0.55rem] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.4)]">
            3
          </span>
        </button>
        
      </div>
    </header>
  );
}
