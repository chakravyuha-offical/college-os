'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    const urlParams = new URLSearchParams(window.location.search);
    const nextParam = urlParams.get('next');

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback${nextParam ? `?next=${encodeURIComponent(nextParam)}` : ''}`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (authError) {
      setError(authError.message);
      toast.error('Sign in failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--surface-bg)] relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-[#6366F1]/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-5%] left-[5%] w-[400px] h-[400px] bg-[#EC4899]/5 rounded-full blur-[120px]" />
        <div className="grid-pattern absolute inset-0" />
      </div>

      {/* Left Panel — Branding (desktop) */}
      <div className="hidden lg:flex flex-col justify-between w-[48%] p-14 relative z-10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-[350px] h-[350px] bg-[#6366F1]/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-[280px] h-[280px] bg-[#8B5CF6]/6 rounded-full blur-[100px]" />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center"
            style={{ boxShadow: '0 0 30px rgba(99,102,241,0.3)' }}
          >
            <span className="material-symbols-outlined text-white text-[26px]">school</span>
          </div>
          <Link href="/" className="text-xl font-extrabold tracking-tight text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            College OS
          </Link>
        </div>

        {/* Tagline */}
        <div className="relative z-10 space-y-5">
          <h2 className="text-5xl font-black text-white leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>
            Your Campus,<br />
            <span className="gradient-text">Reimagined.</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-md leading-relaxed text-[0.95rem]">
            A unified platform for attendance, timetables, assignments, exams, and real-time analytics. Built for the next generation of education.
          </p>

          {/* Trust badges */}
          <div className="flex items-center gap-6 pt-2">
            {[
              { icon: 'verified', text: 'Trusted by 10+ Colleges' },
              { icon: 'lock', text: 'Enterprise Security' },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[var(--primary)]">{badge.icon}</span>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]/60">
            © 2026 College OS
          </p>
        </div>
      </div>

      {/* Right Panel — Login */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-16 relative z-10">
        <div className="w-full max-w-[420px]">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-12 justify-center">
            <div
              className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center"
              style={{ boxShadow: '0 0 24px rgba(99,102,241,0.3)' }}
            >
              <span className="material-symbols-outlined text-white text-[22px]">school</span>
            </div>
            <Link href="/" className="text-lg font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              College OS
            </Link>
          </div>

          {/* Card */}
          <div className="glass-card p-8 lg:p-10 animate-slide-up">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/10 flex items-center justify-center border border-[var(--primary)]/20">
                <span className="material-symbols-outlined text-[28px] text-[var(--primary)]">waving_hand</span>
              </div>
              <h1 className="text-2xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Welcome Back
              </h1>
              <p className="text-[var(--text-secondary)] text-sm">
                Sign in to your institutional dashboard
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-[12px] bg-[var(--danger)]/10 border border-[var(--danger)]/20 text-[var(--danger)] text-[0.75rem] font-bold mb-6 text-center">
                {error}
              </div>
            )}

            {/* Google Sign In */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-[16px] bg-white text-[#1a1a2e] font-bold text-[0.85rem] tracking-wide hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              {loading ? 'Signing in...' : 'Continue with Google'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-[0.6rem] font-bold uppercase tracking-wider text-[var(--text-muted)]">info</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Info */}
            <p className="text-center text-[0.72rem] text-[var(--text-secondary)] leading-relaxed">
              Use your college or personal Google account. Your role will be assigned by your institution administrator.
            </p>
          </div>

          {/* Register CTA */}
          <div className="mt-6 glass-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#6366F1]/15 to-[#8B5CF6]/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px] text-[var(--primary)]">domain_add</span>
              </div>
              <div className="flex-1">
                <p className="text-[0.72rem] font-bold text-white">Are you a Principal?</p>
                <p className="text-[0.62rem] text-[var(--text-muted)]">Register your college for a free trial.</p>
              </div>
              <Link
                href="/register-college"
                className="text-[0.65rem] font-bold text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors inline-flex items-center gap-0.5"
              >
                Register <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Terms */}
          <p className="text-center text-[0.58rem] text-[var(--text-muted)] mt-5">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
