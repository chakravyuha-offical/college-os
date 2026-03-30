'use client';

import { type HTMLAttributes, forwardRef } from 'react';

interface ComicCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const ComicCard = forwardRef<HTMLDivElement, ComicCardProps>(
  ({ children, hover = true, padding = 'md', className = '', ...props }, ref) => {
    const paddingStyles: Record<string, string> = {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={`comic-card ${hover ? '' : 'hover:transform-none hover:shadow-none'} ${paddingStyles[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComicCard.displayName = 'ComicCard';
export default ComicCard;
