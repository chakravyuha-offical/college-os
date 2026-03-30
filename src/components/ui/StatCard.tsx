'use client';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  color: string;
  trend?: { value: number; label: string };
}

export default function StatCard({ title, value, subtitle, icon, color, trend }: StatCardProps) {
  return (
    <div className="stat-card halftone" style={{ background: `${color}08` }}>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-10 h-10 rounded-[12px] flex items-center justify-center border-2"
            style={{ backgroundColor: `${color}15`, borderColor: color }}
          >
            <span className="material-symbols-outlined text-[20px]" style={{ color }}>
              {icon}
            </span>
          </div>
          {trend && (
            <div
              className={`flex items-center gap-0.5 text-[0.6rem] font-bold uppercase ${trend.value >= 0 ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {trend.value >= 0 ? 'trending_up' : 'trending_down'}
              </span>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        <p className="text-[2rem] font-extrabold leading-none tracking-tight mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
          {value}
        </p>
        <p className="text-[0.7rem] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
          {title}
        </p>
        {subtitle && (
          <p className="text-[0.6rem] text-[var(--text-muted)] mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
