'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ComicCard from '@/components/ui/ComicCard';
import ComicButton from '@/components/ui/ComicButton';
import ComicInput from '@/components/ui/ComicInput';
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

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (existingProfile) {
      // Update existing profile with college_id
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
      // Create new profile
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          auth_user_id: user.id,
          college_id: selected,
          role: 'student',
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
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
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-bg)] p-6">
      <div className="w-full max-w-lg space-y-6 animate-slide-up">
        {/* Logo */}
        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="w-12 h-12 rounded-[14px] bg-[var(--primary)] flex items-center justify-center comic-shadow border-3 border-[var(--comic-border)]">
            <span className="material-symbols-outlined text-white text-[26px]">school</span>
          </div>
          <span className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            College OS
          </span>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Select Your College
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Choose the institution you belong to
          </p>
        </div>

        {/* Search */}
        <ComicInput
          icon="search"
          placeholder="Search by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* College List */}
        <div className="space-y-2 max-h-[360px] overflow-y-auto scrollbar-hide">
          {loading ? (
            <div className="text-center py-8">
              <span className="material-symbols-outlined text-[40px] text-[var(--text-muted)] animate-spin block mb-2">progress_activity</span>
              <p className="text-[0.75rem] font-bold text-[var(--text-secondary)]">Loading colleges...</p>
            </div>
          ) : (
            <>
              {filtered.map((college) => (
                <div
                  key={college.id}
                  onClick={() => setSelected(college.id)}
                  className={`p-4 rounded-[16px] border-3 cursor-pointer transition-all bouncy-transition ${
                    selected === college.id
                      ? 'border-[var(--primary)] bg-[var(--primary-bg)] comic-shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center border-2 ${
                      selected === college.id
                        ? 'bg-[var(--primary)] border-[var(--primary-dark)]'
                        : 'bg-gray-100 border-gray-200'
                    }`}>
                      <span className={`material-symbols-outlined text-[20px] ${selected === college.id ? 'text-white' : 'text-[var(--text-muted)]'}`}>
                        apartment
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[0.8rem] font-bold">{college.name}</p>
                      <p className="text-[0.65rem] text-[var(--text-muted)]">{college.address}</p>
                    </div>
                    {selected === college.id && (
                      <span className="material-symbols-outlined text-[var(--primary)] text-[20px] filled">check_circle</span>
                    )}
                  </div>
                </div>
              ))}

              {filtered.length === 0 && !loading && (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-[40px] text-[var(--text-muted)] block mb-2">search_off</span>
                  <p className="text-[0.75rem] font-bold text-[var(--text-secondary)]">No colleges found</p>
                  <p className="text-[0.65rem] text-[var(--text-muted)] mt-1">
                    Ask your principal to register the college
                  </p>
                </div>
              )}
            </>
          )}
        </div>

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

        <p className="text-center text-[0.65rem] text-[var(--text-muted)]">
          Can&apos;t find your college?{' '}
          <a href="/register-college" className="font-bold text-[var(--primary)] hover:underline">Register it here</a>
        </p>
      </div>
    </div>
  );
}
