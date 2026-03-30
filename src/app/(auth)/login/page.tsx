'use client';

import { useState } from 'react';
import Link from 'next/link';
import ComicButton from '@/components/ui/ComicButton';
import ComicInput from '@/components/ui/ComicInput';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // TODO: Replace with real Supabase auth
    // For now, simulate login
    await new Promise(r => setTimeout(r, 1000));

    // Mock: redirect to dashboard
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen flex bg-[var(--surface-bg)]">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#0a0a1a] p-12 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-[#6366F1]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-[250px] h-[250px] bg-[#EC4899]/8 rounded-full blur-[80px]" />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-[14px] bg-[#6366F1] flex items-center justify-center border-2 border-white/20" style={{ boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}>
            <span className="material-symbols-outlined text-white text-[26px]">school</span>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white block" style={{ fontFamily: 'var(--font-heading)' }}>
              College OS
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div className="relative z-10 space-y-4">
          <h2 className="text-5xl font-black text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Your Campus,<br />
            <span className="bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">Reimagined.</span>
          </h2>
          <p className="text-white/40 max-w-md leading-relaxed">
            A unified platform for attendance, timetables, assignments, exams, and real-time analytics. Built for the next generation of education.
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white/20">
            Trusted by 10+ Colleges
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div className="w-11 h-11 rounded-[14px] bg-[var(--primary)] flex items-center justify-center comic-shadow border-3 border-[var(--comic-border)]">
            <span className="material-symbols-outlined text-white text-[24px]">school</span>
          </div>
          <span className="text-lg font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            College OS
          </span>
        </div>

        <div className="w-full max-w-[420px] space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
              Welcome Back
            </h1>
            <p className="text-[var(--text-secondary)] text-sm">
              Sign in to your institutional dashboard
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-[12px] bg-red-50 border-2 border-red-200 text-red-700 text-[0.75rem] font-bold">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <ComicInput
              label="Email"
              icon="mail"
              type="email"
              placeholder="you@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <ComicInput
              label="Password"
              icon="lock"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-2 border-[var(--comic-border)] accent-[var(--primary)]" />
                <span className="text-[0.7rem] font-bold text-[var(--text-secondary)]">Remember me</span>
              </label>
              <a href="#" className="text-[0.7rem] font-bold text-[var(--primary)] hover:underline">
                Forgot password?
              </a>
            </div>

            <ComicButton
              type="submit"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Sign In
              {!loading && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
            </ComicButton>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-[2px] bg-gray-200" />
            <span className="text-[0.6rem] font-bold uppercase tracking-wider text-[var(--text-muted)]">or</span>
            <div className="flex-1 h-[2px] bg-gray-200" />
          </div>

          {/* Magic Link */}
          <ComicButton variant="outline" size="lg" className="w-full">
            <span className="material-symbols-outlined text-[18px]">magic_button</span>
            Sign in with Magic Link
          </ComicButton>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-[var(--text-secondary)]">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-bold text-[var(--primary)] hover:underline">
              Sign up
            </Link>
          </p>

          {/* Register College */}
          <div className="mt-6 p-4 rounded-[16px] bg-[var(--primary-bg)] border-2 border-[var(--primary)]/20">
            <p className="text-[0.7rem] font-bold text-[var(--primary)] mb-1">Are you a Principal?</p>
            <p className="text-[0.65rem] text-[var(--text-secondary)] mb-2">Register your college for a free trial.</p>
            <Link href="/register-college" className="text-[0.65rem] font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1">
              Register College <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
