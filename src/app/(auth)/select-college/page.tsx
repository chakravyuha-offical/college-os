'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import ComicButton from '@/components/ui/ComicButton';
import toast from 'react-hot-toast';

interface College {
  id: string;
  name: string;
  address: string;
}

export default function SelectCollegePage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchColleges = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('colleges')
        .select('id, name, address')
        .order('name');

      if (!error && data) {
        setColleges(data);
      }
      setLoading(false);
    };
    fetchColleges();
  }, []);

  const filtered = colleges.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = async () => {
    if (!selected) return;
    setSubmitting(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast.error('Session expired. Please log in again.');
      router.push('/login');
      return;
    }

    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (existingProfile) {
      const { error } = await supabase
        .from('profiles')
        .update({ college_id: selected })
        .eq('auth_user_id', user.id);

      if (error) {
        toast.error(error.message);
        setSubmitting(false);
        return;
      }
    } else {
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          auth_user_id: user.id,
          college_id: selected,
          role: 'student',
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          email: user.email || '',
        });

      if (error) {
        toast.error(error.message);
        setSubmitting(false);
        return;
      }
    }

    toast.success('College selected! Welcome aboard.');
    router.push('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-bg)] p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[30%] w-[500px] h-[500px] bg-[#6366F1]/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-5%] right-[20%] w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
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
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/10 flex items-center justify-center border border-[var(--primary)]/20">
              <span className="material-symbols-outlined text-[28px] text-[var(--primary)]">apartment</span>
            </div>
            <h1 className="text-2xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Select Your College
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Choose the institution you belong to
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-[14px] px-4 py-3 pl-11 text-sm font-medium text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]/50 transition-all"
            />
          </div>

          {/* College List */}
          <div className="space-y-2 max-h-[320px] overflow-y-auto scrollbar-hide pr-1">
            {loading ? (
              <div className="text-center py-10">
                <span className="material-symbols-outlined text-[36px] text-[var(--text-muted)] animate-spin block mb-3">progress_activity</span>
                <p className="text-[0.75rem] font-bold text-[var(--text-secondary)]">Loading colleges...</p>
              </div>
            ) : (
              <>
                {filtered.map((college) => (
                  <div
                    key={college.id}
                    onClick={() => setSelected(college.id)}
                    className={`p-4 rounded-[14px] cursor-pointer transition-all duration-200 ${
                      selected === college.id
                        ? 'bg-[var(--primary)]/10 border border-[var(--primary)]/30 shadow-[0_0_20px_rgba(99,102,241,0.1)]'
                        : 'bg-[var(--surface-elevated)] border border-[var(--surface-border)] hover:border-white/12 hover:bg-[var(--surface-hover)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center ${
                        selected === college.id
                          ? 'bg-[var(--primary)] shadow-[0_0_16px_rgba(99,102,241,0.3)]'
                          : 'bg-white/5'
                      }`}>
                        <span className={`material-symbols-outlined text-[20px] ${
                          selected === college.id ? 'text-white' : 'text-[var(--text-muted)]'
                        }`}>
                          apartment
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[0.8rem] font-bold text-white truncate">{college.name}</p>
                        <p className="text-[0.65rem] text-[var(--text-muted)] truncate">{college.address}</p>
                      </div>
                      {selected === college.id && (
                        <span className="material-symbols-outlined text-[var(--primary)] text-[20px] filled shrink-0">check_circle</span>
                      )}
                    </div>
                  </div>
                ))}

                {filtered.length === 0 && !loading && (
                  <div className="text-center py-10">
                    <span className="material-symbols-outlined text-[36px] text-[var(--text-muted)] block mb-3">search_off</span>
                    <p className="text-[0.75rem] font-bold text-[var(--text-secondary)]">No colleges found</p>
                    <p className="text-[0.65rem] text-[var(--text-muted)] mt-1">
                      Ask your principal to register the college
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Continue Button */}
          <div className="mt-6">
            <ComicButton
              size="lg"
              className="w-full"
              disabled={!selected}
              loading={submitting}
              onClick={handleContinue}
            >
              Continue
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </ComicButton>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[0.68rem] text-[var(--text-muted)] mt-6">
          Can&apos;t find your college?{' '}
          <Link href="/register-college" className="font-bold text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors">
            Register it here
          </Link>
        </p>
      </div>
    </div>
  );
}
