'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ComicButton from '@/components/ui/ComicButton';
import ComicInput from '@/components/ui/ComicInput';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
        },
        emailRedirectTo: `${window.location.origin}/select-college`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // If email confirmation is required, show a message
    if (data.user && !data.session) {
      toast.success('Check your email to confirm your account!');
      setLoading(false);
      return;
    }

    // If auto-confirmed, redirect to college selection
    toast.success('Account created! Select your college.');
    router.push('/select-college');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-[var(--surface-bg)]">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#0a0a1a] p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-[#8B5CF6]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 left-10 w-[250px] h-[250px] bg-[#10B981]/8 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-[14px] bg-[#6366F1] flex items-center justify-center border-2 border-white/20" style={{ boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}>
            <span className="material-symbols-outlined text-white text-[26px]">school</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white" style={{ fontFamily: 'var(--font-heading)' }}>College OS</span>
        </div>

        <div className="relative z-10 space-y-4">
          <h2 className="text-5xl font-black text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Join Your<br />
            <span className="bg-gradient-to-r from-[#10B981] to-[#6366F1] bg-clip-text text-transparent">Campus.</span>
          </h2>
          <p className="text-white/40 max-w-md leading-relaxed">
            Create your account and get connected to your college. Access timetables, assignments, attendance, and everything in one place.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white/20">
            Free for Students
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div className="w-11 h-11 rounded-[14px] bg-[var(--primary)] flex items-center justify-center comic-shadow border-3 border-[var(--comic-border)]">
            <span className="material-symbols-outlined text-white text-[24px]">school</span>
          </div>
          <span className="text-lg font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>College OS</span>
        </div>

        <div className="w-full max-w-[420px] space-y-7">
          <div className="space-y-2">
            <h1 className="text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>Create Account</h1>
            <p className="text-[var(--text-secondary)] text-sm">Sign up to get started with your college</p>
          </div>

          {error && (
            <div className="p-3 rounded-[12px] bg-red-50 border-2 border-red-200 text-red-700 text-[0.75rem] font-bold">{error}</div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <ComicInput
              label="Full Name"
              icon="person"
              placeholder="e.g. Aditya Gothe"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
            <ComicInput
              label="Email"
              icon="mail"
              type="email"
              placeholder="you@college.edu"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <ComicInput
              label="Password"
              icon="lock"
              type="password"
              placeholder="Min 8 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <ComicInput
              label="Confirm Password"
              icon="lock"
              type="password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
            />

            <ComicButton type="submit" size="lg" loading={loading} className="w-full">
              Create Account
              {!loading && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
            </ComicButton>
          </form>

          <p className="text-center text-sm text-[var(--text-secondary)]">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-[var(--primary)] hover:underline">Sign in</Link>
          </p>

          <p className="text-center text-[0.6rem] text-[var(--text-muted)]">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
