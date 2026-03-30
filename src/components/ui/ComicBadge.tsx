'use client';

interface ComicBadgeProps {
  children: React.ReactNode;
  color?: string;
  variant?: 'filled' | 'outline' | 'burst';
  size?: 'sm' | 'md';
  className?: string;
}

export default function ComicBadge({
  children,
  color = 'var(--primary)',
  variant = 'filled',
  size = 'sm',
  className = '',
}: ComicBadgeProps) {
  if (variant === 'burst') {
    return (
      <span
        className={`burst-badge ${size === 'sm' ? 'text-[0.6rem] px-2 py-0.5' : 'text-[0.7rem] px-3 py-1'} ${className}`}
        style={{ color, borderColor: color }}
      >
        <span>{children}</span>
      </span>
    );
  }

  const baseStyles =
    size === 'sm'
      ? 'px-2.5 py-0.5 text-[0.6rem] rounded-full'
      : 'px-3.5 py-1 text-[0.7rem] rounded-full';

  if (variant === 'outline') {
    return (
      <span
        className={`inline-flex items-center gap-1 font-bold uppercase tracking-wide border-2 ${baseStyles} ${className}`}
        style={{ color, borderColor: color }}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 font-bold uppercase tracking-wide border-2 ${baseStyles} ${className}`}
      style={{ backgroundColor: color, color: 'white', borderColor: color }}
    >
      {children}
    </span>
  );
}
