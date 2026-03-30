'use client';

import { type InputHTMLAttributes, forwardRef } from 'react';

interface ComicInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
}

const ComicInput = forwardRef<HTMLInputElement, ComicInputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[20px]">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`w-full bg-white border-3 border-[var(--comic-border)] rounded-[14px] px-4 py-3 text-sm font-medium text-[var(--text-primary)] placeholder:text-[var(--text-muted)] placeholder:font-medium focus:outline-none focus:ring-3 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all ${icon ? 'pl-10' : ''} ${error ? 'border-[var(--danger)] focus:ring-[var(--danger)]/20' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-[0.65rem] font-bold text-[var(--danger)] uppercase tracking-wide">
            {error}
          </p>
        )}
      </div>
    );
  }
);

ComicInput.displayName = 'ComicInput';
export default ComicInput;
