'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ComicButton from '@/components/ui/ComicButton';
import ComicInput from '@/components/ui/ComicInput';
import toast from 'react-hot-toast';

export default function RegisterCollegePage() {
  const [form, setForm] = useState({
    collegeName: '',
    address: '',
    principalName: '',
    principalEmail: '',
    principalPassword: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();

    // Step 1: Sign up the principal account
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: form.principalEmail,
      password: form.principalPassword,
      options: {
        data: {
          full_name: form.principalName,
          role: 'principal',
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Step 2: If we have an active session, call the RPC to create college + profile
    if (signUpData.session) {
      const { error: rpcError } = await supabase.rpc('register_new_college', {
        p_college_name: form.collegeName,
        p_address: form.address,
        p_full_name: form.principalName,
        p_email: form.principalEmail,
      });

      if (rpcError) {
        setError(rpcError.message);
        setLoading(false);
        return;
      }

      toast.success('College registered! Redirecting to dashboard...');
      router.push('/');
    } else {
      // Email confirmation required — show success screen
      setSubmitted(true);
    }

    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--surface-bg)] p-6">
        <div className="w-full max-w-md text-center space-y-6 animate-pop-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-[var(--success)]/10 flex items-center justify-center border-3 border-[var(--success)] comic-shadow">
            <span className="material-symbols-outlined text-[40px] text-[var(--success)]">check_circle</span>
          </div>
          <h1 className="text-2xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Registration Submitted!
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            We&apos;ve sent a confirmation email to <strong>{form.principalEmail}</strong>. Check your inbox to activate your account and start your 14-day free trial.
          </p>
          <div className="comic-card p-4 text-left">
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">What&apos;s Next</p>
            <ul className="space-y-2">
              {[
                'Confirm your email address',
                'Log in with your credentials',
                'Configure branches, divisions, and semesters',
                'Invite staff and enroll students',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-[0.7rem] text-[var(--text-secondary)]">
                  <span className="w-5 h-5 rounded-full bg-[var(--primary)] text-white text-[0.55rem] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/login">
            <ComicButton size="lg" className="w-full">
              Go to Login
            </ComicButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-bg)] p-6">
      <div className="w-full max-w-lg space-y-6 animate-slide-up">
        {/* Logo */}
        <div className="flex items-center gap-3 justify-center mb-2">
          <div className="w-12 h-12 rounded-[14px] bg-[var(--primary)] flex items-center justify-center comic-shadow border-3 border-[var(--comic-border)]">
            <span className="material-symbols-outlined text-white text-[26px]">school</span>
          </div>
          <span className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            College OS
          </span>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Register Your College
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Start your free 14-day trial today
          </p>
        </div>

        {/* Trial Banner */}
        <div className="p-4 rounded-[16px] bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white border-3 border-[var(--comic-border)] comic-shadow">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[28px]">rocket_launch</span>
            <div>
              <p className="text-sm font-extrabold">14 Days Free Trial</p>
              <p className="text-[0.65rem] text-white/70">Full access, no credit card required. Cancel anytime.</p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-[12px] bg-red-50 border-2 border-red-200 text-red-700 text-[0.75rem] font-bold">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <ComicInput
            label="College Name"
            icon="apartment"
            placeholder="e.g. KLE Technological University"
            value={form.collegeName}
            onChange={(e) => setForm({ ...form, collegeName: e.target.value })}
            required
          />
          <ComicInput
            label="Address"
            icon="location_on"
            placeholder="City, State"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />
          <ComicInput
            label="Principal / Admin Name"
            icon="person"
            placeholder="e.g. Dr. B.V. Gopalakrishna"
            value={form.principalName}
            onChange={(e) => setForm({ ...form, principalName: e.target.value })}
            required
          />
          <ComicInput
            label="Principal Email"
            icon="mail"
            type="email"
            placeholder="principal@college.edu"
            value={form.principalEmail}
            onChange={(e) => setForm({ ...form, principalEmail: e.target.value })}
            required
          />
          <ComicInput
            label="Set Password"
            icon="lock"
            type="password"
            placeholder="Min 8 characters"
            value={form.principalPassword}
            onChange={(e) => setForm({ ...form, principalPassword: e.target.value })}
            required
          />
          <ComicInput
            label="Contact Phone"
            icon="phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />

          <ComicButton type="submit" size="lg" loading={loading} className="w-full">
            Start Free Trial
            {!loading && <span className="material-symbols-outlined text-[18px]">rocket_launch</span>}
          </ComicButton>
        </form>

        <p className="text-center text-sm text-[var(--text-secondary)]">
          Already registered?{' '}
          <Link href="/login" className="font-bold text-[var(--primary)] hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
