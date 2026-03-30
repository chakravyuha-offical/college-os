'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/lib/store/auth';
import ComicCard from '@/components/ui/ComicCard';
import ComicButton from '@/components/ui/ComicButton';
import toast from 'react-hot-toast';

export default function InvitesPage() {
  const { user } = useAuthStore();
  const [invites, setInvites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [role, setRole] = useState('student');
  const [inviteType, setInviteType] = useState('CODE');
  const [maxUses, setMaxUses] = useState(1);
  const [label, setLabel] = useState('');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchInvites();
  }, []);

  const fetchInvites = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from('invites')
      .select('id, target_role, invite_type, code, max_uses, use_count, status, label, created_at, expires_at')
      .order('created_at', { ascending: false });
    
    setInvites(data || []);
    setLoading(false);
  };

  const generateInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setGenerating(true);

    const supabase = createClient();
    const { data, error } = await supabase.rpc('generate_invite', {
       p_target_role: role,
       p_invite_type: inviteType,
       p_max_uses: maxUses,
       p_label: label || null
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Invite generated successfully!');
      fetchInvites();
      setLabel('');
    }
    setGenerating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const revokeInvite = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from('invites').update({ status: 'REVOKED' }).eq('id', id);
    if (!error) {
      toast.success('Invite revoked.');
      fetchInvites();
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Workspace Invites
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Manage roles and onboarding for your college
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Create Invite */}
        <div className="lg:col-span-1">
           <ComicCard padding="lg" className="h-full">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-[10px] bg-[var(--primary)]/10 text-[var(--primary-light)] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">person_add</span>
                 </div>
                 <h2 className="text-sm font-extrabold uppercase tracking-widest text-white">New Invite</h2>
              </div>

              <form onSubmit={generateInvite} className="space-y-5">
                 <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-muted)]">Target Role</label>
                    <select 
                       value={role} 
                       onChange={(e) => setRole(e.target.value)}
                       className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-[12px] px-3 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                    >
                       <option value="student">Student</option>
                       <option value="teacher">Teacher</option>
                       <option value="hod">HOD</option>
                       <option value="vice_principal">Vice Principal</option>
                       {user?.role === 'super_admin' && <option value="principal">Principal</option>}
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-muted)]">Type</label>
                    <div className="flex items-center gap-3">
                       <label className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[10px] border cursor-pointer font-bold text-sm transition-all ${inviteType === 'CODE' ? 'bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary-light)]' : 'bg-transparent border-[var(--surface-border)] text-[var(--text-muted)] hover:border-white/20 hover:text-white'}`}>
                          <input type="radio" value="CODE" checked={inviteType === 'CODE'} onChange={() => setInviteType('CODE')} className="hidden" />
                          <span className="material-symbols-outlined text-[18px]">password</span>
                          Code
                       </label>
                       <label className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[10px] border cursor-pointer font-bold text-sm transition-all ${inviteType === 'LINK' ? 'bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary-light)]' : 'bg-transparent border-[var(--surface-border)] text-[var(--text-muted)] hover:border-white/20 hover:text-white'}`}>
                          <input type="radio" value="LINK" checked={inviteType === 'LINK'} onChange={() => setInviteType('LINK')} className="hidden" />
                          <span className="material-symbols-outlined text-[18px]">link</span>
                          Link
                       </label>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-muted)]">Max Uses</label>
                    <input 
                       type="number" 
                       min="1" 
                       value={maxUses} 
                       onChange={(e) => setMaxUses(parseInt(e.target.value))}
                       className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-[12px] px-3 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-muted)]">Label (Optional)</label>
                    <input 
                       type="text" 
                       placeholder="e.g. CS Faculty"
                       value={label} 
                       onChange={(e) => setLabel(e.target.value)}
                       className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-[12px] px-3 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                    />
                 </div>

                 <ComicButton size="md" className="w-full mt-2" loading={generating} disabled={generating}>
                    Generate Invite
                 </ComicButton>
              </form>
           </ComicCard>
        </div>

        {/* Existing Invites */}
        <div className="lg:col-span-2">
           <ComicCard padding="lg" className="h-full flex flex-col">
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-white mb-6">Active Invites</h2>

              {loading ? (
                <div className="flex-1 flex items-center justify-center py-10">
                   <span className="material-symbols-outlined animate-spin text-[32px] text-[var(--primary)]">progress_activity</span>
                </div>
              ) : invites.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
                   <span className="material-symbols-outlined text-[48px] text-[var(--surface-border)] mb-4">group_off</span>
                   <p className="text-sm text-[var(--text-muted)]">No invites generated yet.</p>
                </div>
              ) : (
                <div className="flex-1 overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                      <thead>
                         <tr>
                            <th className="py-3 px-4 text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--surface-border)]">Code/Label</th>
                            <th className="py-3 px-4 text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--surface-border)]">Role</th>
                            <th className="py-3 px-4 text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--surface-border)]">Usage</th>
                            <th className="py-3 px-4 text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--surface-border)] text-right">Actions</th>
                         </tr>
                      </thead>
                      <tbody>
                         {invites.map((inv) => (
                           <tr key={inv.id} className="border-b border-[var(--surface-border)] hover:bg-[var(--surface-hover)] transition-colors">
                              <td className="py-3 px-4">
                                 <div className="flex items-center gap-2">
                                    <div className={`px-2 py-1 rounded-[6px] text-[0.7rem] font-mono font-bold border ${inv.status === 'ACTIVE' ? 'bg-[var(--surface-elevated)] text-white border-white/20' : 'bg-transparent text-[var(--text-muted)] border-transparent line-through'}`}>
                                       {inv.invite_type === 'CODE' ? inv.code : 'LINK'}
                                    </div>
                                    <span className="text-[0.7rem] font-bold text-[var(--text-secondary)]">{inv.label}</span>
                                 </div>
                              </td>
                              <td className="py-3 px-4">
                                 <span className="text-[0.65rem] font-extrabold uppercase tracking-wider px-2 py-1 rounded bg-[var(--primary)]/10 text-[var(--primary-light)]">
                                    {inv.target_role.replace('_', ' ')}
                                 </span>
                              </td>
                              <td className="py-3 px-4">
                                 <div className="flex items-center gap-1.5 text-[0.7rem] font-bold text-[var(--text-secondary)]">
                                    <span className="material-symbols-outlined text-[14px]">group</span>
                                    {inv.use_count} / {inv.max_uses || '∞'}
                                 </div>
                              </td>
                              <td className="py-3 px-4 text-right">
                                 <div className="flex items-center justify-end gap-1">
                                    <button 
                                      onClick={() => copyToClipboard(inv.invite_type === 'CODE' ? inv.code : `${window.location.origin}/join?code=${inv.code}`)}
                                      className="w-8 h-8 rounded-[8px] flex items-center justify-center hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-colors"
                                      title={inv.invite_type === 'CODE' ? 'Copy Code' : 'Copy Link'}
                                    >
                                       <span className="material-symbols-outlined text-[16px]">content_copy</span>
                                    </button>
                                    {inv.status === 'ACTIVE' && (
                                      <button 
                                        onClick={() => revokeInvite(inv.id)}
                                        className="w-8 h-8 rounded-[8px] flex items-center justify-center hover:bg-[var(--danger)]/10 text-[var(--danger)] transition-colors"
                                        title="Revoke Invite"
                                      >
                                         <span className="material-symbols-outlined text-[16px]">cancel</span>
                                      </button>
                                    )}
                                 </div>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
              )}
           </ComicCard>
        </div>
      </div>
    </div>
  );
}
