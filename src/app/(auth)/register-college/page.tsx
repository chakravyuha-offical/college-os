'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export default function RegisterCollegePage() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [form, setForm] = useState({
    collegeName: '',
    address: '',
    principalName: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Check if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        setUser({
          email: authUser.email || '',
          name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || '',
        });
        setForm((prev) => ({
          ...prev,
          principalName: authUser.user_metadata?.full_name || authUser.user_metadata?.name || '',
        }));
      }
    };
    checkAuth();
  }, []);

  const handleGoogleAuth = async () => {
    setAuthLoading(true);
    setError('');

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/register-college`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setAuthLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');

    const supabase = createClient();

    const { error: rpcError } = await supabase.rpc('register_new_college', {
      p_college_name: form.collegeName,
      p_address: form.address,
      p_full_name: form.principalName,
      p_email: user.email,
    });

    if (rpcError) {
      setError(rpcError.message);
      setLoading(false);
      return;
    }

    toast.success('College registered! Redirecting to dashboard...');
    setSubmitted(true);
    setTimeout(() => router.push('/home'), 1500);
    setLoading(false);
  };

  // === Success screen ===
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--surface-bg)] p-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#10B981]/8 rounded-full blur-[140px]" />
          <div className="grid-pattern absolute inset-0" />
        </div>

        <div className="w-full max-w-md text-center relative z-10 animate-pop-in">
          <div className="glass-card p-10">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#10B981]/15 flex items-center justify-center border border-[#10B981]/20 mb-6">
              <span className="material-symbols-outlined text-[40px] text-[#10B981]">check_circle</span>
            </div>
            <h1 className="text-2xl font-black mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Registration Complete!
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mb-8">
              Your college has been registered. Setting up your dashboard...
            </p>

            <div className="glass-light rounded-[16px] p-5 text-left mb-6">
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">What&apos;s Next</p>
              <ul className="space-y-2.5">
                {[
                  'Configure branches & semesters',
                  'Invite staff & faculty',
                  'Set up timetables',
                  'Enroll students',
                ].map((step, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[0.72rem] text-[var(--text-secondary)]">
                    <span className="w-5 h-5 rounded-full bg-[var(--primary)] text-white text-[0.55rem] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-center gap-2 text-[var(--text-muted)]">
              <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
              <span className="text-[0.7rem] font-medium">Redirecting to dashboard...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === Main registration form ===
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-bg)] p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#6366F1]/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-5%] right-[15%] w-[400px] h-[400px] bg-[#EC4899]/5 rounded-full blur-[120px]" />
        <div className="grid-pattern absolute inset-0" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 justify-center mb-8">
          <div
            className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center"
            style={{ boxShadow: '0 0 30px rgba(99,102,241,0.3)' }}
          >
            <span className="material-symbols-outlined text-white text-[26px]">school</span>
          </div>
          <Link href="/" className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            College OS
          </Link>
        </div>

        {/* Main Card */}
        <div className="glass-card p-8 lg:p-10 animate-slide-up">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Register Your College
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Start your free 14-day trial today
            </p>
          </div>

          {/* Trial Banner */}
          <div className="p-4 rounded-[16px] bg-gradient-to-r from-[#6366F1]/15 to-[#8B5CF6]/10 border border-[var(--primary)]/20 mb-8">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[26px] text-[var(--primary)] animate-float">rocket_launch</span>
              <div>
                <p className="text-sm font-extrabold text-white">14 Days Free Trial</p>
                <p className="text-[0.65rem] text-[var(--text-muted)]">Full access, no credit card required. Cancel anytime.</p>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-[12px] bg-[var(--danger)]/10 border border-[var(--danger)]/20 text-[var(--danger)] text-[0.75rem] font-bold mb-6 text-center">
              {error}
            </div>
          )}

          {/* Step 1: Google Auth */}
          {!user ? (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-[var(--primary)] flex items-center justify-center">
                  <span className="text-[0.6rem] font-extrabold text-white">1</span>
                </div>
                <span className="text-[0.8rem] font-bold text-white">Sign in with Google first</span>
              </div>

              <button
                onClick={handleGoogleAuth}
                disabled={authLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-[16px] bg-white text-[#1a1a2e] font-bold text-[0.85rem] tracking-wide hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
              >
                {authLoading ? (
                  <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )}
                {authLoading ? 'Authenticating...' : 'Continue with Google'}
              </button>

              <p className="text-center text-[0.65rem] text-[var(--text-muted)]">
                This will be used as your principal login for College OS.
              </p>
            </div>
          ) : (
            /* Step 2: College Details */
            <div className="space-y-6">
              {/* Authenticated indicator */}
              <div className="flex items-center gap-3 p-3 rounded-[14px] bg-[#10B981]/10 border border-[#10B981]/20">
                <span className="material-symbols-outlined text-[20px] text-[#10B981]">check_circle</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.72rem] font-bold text-[#10B981]">Authenticated as</p>
                  <p className="text-[0.65rem] text-[var(--text-secondary)] truncate">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[var(--primary)] flex items-center justify-center">
                  <span className="text-[0.6rem] font-extrabold text-white">2</span>
                </div>
                <span className="text-[0.8rem] font-bold text-white">Enter college details</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    College Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[20px]">apartment</span>
                    <input
                      type="text"
                      placeholder="e.g. KLE Technological University"
                      value={form.collegeName}
                      onChange={(e) => setForm({ ...form, collegeName: e.target.value })}
                      required
                      className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-[14px] px-4 py-3 pl-11 text-sm font-medium text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[20px]">location_on</span>
                    <input
                      type="text"
                      placeholder="City, State"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      required
                      className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-[14px] px-4 py-3 pl-11 text-sm font-medium text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Principal / Admin Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[20px]">person</span>
                    <input
                      type="text"
                      placeholder="e.g. Dr. B.V. Gopalakrishna"
                      value={form.principalName}
                      onChange={(e) => setForm({ ...form, principalName: e.target.value })}
                      required
                      className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-[14px] px-4 py-3 pl-11 text-sm font-medium text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Contact Phone
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[20px]">phone</span>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                      className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-[14px] px-4 py-3 pl-11 text-sm font-medium text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]/50 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 mt-2 rounded-[16px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-extrabold text-[0.8rem] uppercase tracking-wider hover:brightness-110 transition-all disabled:opacity-50"
                  style={{ boxShadow: '0 8px 32px rgba(99,102,241,0.3)' }}
                >
                  {loading ? (
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  ) : (
                    <>
                      Start Free Trial
                      <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Sign in link */}
        <p className="text-center text-sm text-[var(--text-secondary)] mt-6">
          Already registered?{' '}
          <Link href="/login" className="font-bold text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
