'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

function JoinContent() {
  const [code, setCode] = useState('');
  const [validating, setValidating] = useState(false);
  const [inviteData, setInviteData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState<any>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const inviteCode = searchParams.get('code');
  const action = searchParams.get('action');

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data.user) {
         // Check if they already have a profile
         const { data: profile } = await supabase.from('profiles').select('id, role').eq('auth_user_id', data.user.id).single();
         if (profile) {
            toast.error('You already belong to a college!');
            router.push('/home');
            return;
         }
         setUser(data.user);
      }
      setCheckingAuth(false);
    };
    init();
  }, [router]);

  useEffect(() => {
    if (inviteCode) {
      setCode(inviteCode);
      fetchInviteDetails(inviteCode);
    }
  }, [inviteCode]);

  useEffect(() => {
    if (action === 'claim' && inviteData && user && !checkingAuth) {
      handleJoin();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, inviteData, user, checkingAuth]);

  const fetchInviteDetails = async (codeToFetch: string) => {
    setValidating(true);
    const supabase = createClient();
    
    // We can query custom views or just the invites table, 
    // but invites table doesn't have the college name unless we join explicitly using foreign keys
    // Supabase allows joining: invites!inner(..., colleges(name, logo_url))
    const { data: invite, error } = await supabase
      .from('invites')
      .select('*, colleges(name, logo_url)')
      .eq('code', codeToFetch)
      .eq('status', 'ACTIVE')
      .single();

    if (error || !invite) {
      toast.error('Invalid or expired invite code.');
      setInviteData(null);
    } else {
      setInviteData(invite);
    }
    setValidating(false);
  };

  const handleFetchClick = () => {
    if (!code.trim()) return;
    fetchInviteDetails(code.trim().toUpperCase());
  };

  const handleJoin = async () => {
    if (!inviteData) return;

    if (!user) {
      // Not logged in -> redirect to signup, passing next param
      const nextParam = encodeURIComponent(`/join?code=${inviteData.code}&action=claim`);
      router.push(`/signup?next=${nextParam}`);
      return;
    }

    setLoading(true);
    const supabase = createClient();
    
    const { error } = await supabase.rpc('claim_invite', {
      p_code: inviteData.code,
      p_full_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
      p_email: user.email || ''
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success('Successfully joined the college!');
    router.push('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-bg)] p-6 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[30%] w-[500px] h-[500px] bg-[#6366F1]/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-5%] right-[20%] w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
        <div className="grid-pattern absolute inset-0" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 justify-center mb-8">
          <div
            className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center"
            style={{ boxShadow: '0 0 30px rgba(99,102,241,0.3)' }}
          >
            <span className="material-symbols-outlined text-white text-[26px]">school</span>
          </div>
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            College OS
          </Link>
        </div>

        {/* Main Card */}
        <div className="glass-card p-8 lg:p-10 animate-slide-up">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/10 flex items-center justify-center border border-[var(--primary)]/20">
              <span className="material-symbols-outlined text-[28px] text-[var(--primary)]">meeting_room</span>
            </div>
            <h1 className="text-2xl font-black mb-2 text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              Join College
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Enter your invite code
            </p>
          </div>

          {checkingAuth ? (
            <div className="flex justify-center p-4">
               <span className="material-symbols-outlined animate-spin text-[32px] text-[var(--primary)]">progress_activity</span>
            </div>
          ) : !inviteData ? (
            <div className="space-y-4">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[20px]">
                  key
                </span>
                <input
                  type="text"
                  placeholder="Enter 6-digit code..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-[14px] px-4 py-3 pl-11 text-sm font-medium text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]/50 transition-all uppercase"
                  maxLength={10}
                />
              </div>

              <button
                onClick={handleFetchClick}
                disabled={validating || !code.trim()}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-[16px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-extrabold text-[0.8rem] uppercase tracking-wider transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ boxShadow: '0 8px 32px rgba(99,102,241,0.3)' }}
              >
                {validating ? (
                  <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                ) : (
                  <>
                    Verify Code
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 rounded-[16px] border border-[var(--surface-border)] bg-[var(--surface-elevated)]">
                <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">You are invited to join</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-[10px] bg-white/5 flex items-center justify-center border border-white/10">
                    <span className="material-symbols-outlined text-[20px] text-white">apartment</span>
                  </div>
                  <div className="flex-1">
                     <p className="text-[0.85rem] font-black text-white">{inviteData.colleges?.name || 'Unknown College'}</p>
                     <p className="text-[0.7rem] text-[var(--text-secondary)] capitalize">Role: {inviteData.target_role.replace('_', ' ')}</p>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-[var(--success)]">verified</span>
                </div>
                {inviteData.label && (
                 <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[var(--primary)]/10 text-[var(--primary-light)]">
                   <span className="material-symbols-outlined text-[14px]">label</span>
                   <span className="text-[0.65rem] font-bold">{inviteData.label}</span>
                 </div>
                )}
              </div>
              
              <button
                onClick={handleJoin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-[16px] bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-extrabold text-[0.8rem] uppercase tracking-wider transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ boxShadow: '0 8px 32px rgba(16,185,129,0.3)' }}
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                ) : (
                  <>
                    {user ? 'Accept Invite' : 'Sign In to Join'}
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setInviteData(null)}
                disabled={loading}
                className="w-full text-center text-[0.75rem] font-bold text-[var(--text-secondary)] hover:text-white transition-colors mt-2"
              >
                Not right now
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-[0.68rem] text-[var(--text-muted)] mt-6">
          Principal/Admin?{' '}
          <Link href="/register-college" className="font-bold text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors">
            Register your college
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function JoinPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--surface-bg)]">
         <span className="material-symbols-outlined animate-spin text-[36px] text-[var(--primary)]">progress_activity</span>
      </div>
    }>
      <JoinContent />
    </Suspense>
  );
}
