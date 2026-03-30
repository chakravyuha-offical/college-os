'use client';

import { type ButtonHTMLAttributes, forwardRef } from 'react';

interface ComicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
}

const ComicButton = forwardRef<HTMLButtonElement, ComicButtonProps>(
  ({ children, variant = 'primary', size = 'md', loading, className = '', disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wide transition-all duration-200';

    const variantStyles: Record<string, string> = {
      primary: 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white border border-white/10 hover:brightness-110 shadow-[0_4px_20px_rgba(99,102,241,0.25)]',
      secondary: 'bg-[var(--secondary)] text-white border border-white/10 hover:brightness-110 shadow-[0_4px_20px_rgba(139,92,246,0.25)]',
      outline: 'bg-transparent text-[var(--text-primary)] border border-white/10 hover:bg-white/5 hover:border-white/20',
      ghost: 'bg-transparent text-[var(--text-secondary)] hover:bg-white/5 hover:text-white',
      danger: 'bg-[var(--danger)] text-white border border-white/10 hover:brightness-110',
    };

    const sizeStyles: Record<string, string> = {
      sm: 'px-3 py-1.5 text-[0.65rem] rounded-[10px]',
      md: 'px-5 py-2.5 text-[0.75rem] rounded-[14px]',
      lg: 'px-8 py-3.5 text-[0.8rem] rounded-[16px]',
      icon: 'p-2.5 rounded-[12px]',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled || loading ? 'opacity-50 pointer-events-none' : ''} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
        )}
        {children}
      </button>
    );
  }
);

ComicButton.displayName = 'ComicButton';
export default ComicButton;
