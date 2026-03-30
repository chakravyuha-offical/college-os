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
      'inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wide transition-all active-press comic-shadow-sm';

    const variantStyles: Record<string, string> = {
      primary: 'bg-[var(--primary)] text-white border-3 border-[var(--comic-border)] hover:bg-[var(--primary-dark)]',
      secondary: 'bg-[var(--secondary)] text-white border-3 border-[var(--comic-border)] hover:brightness-110',
      outline: 'bg-white text-[var(--text-primary)] border-3 border-[var(--comic-border)] hover:bg-gray-50',
      ghost: 'bg-transparent text-[var(--text-secondary)] hover:bg-gray-100 shadow-none',
      danger: 'bg-[var(--danger)] text-white border-3 border-[var(--comic-border)] hover:brightness-110',
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
