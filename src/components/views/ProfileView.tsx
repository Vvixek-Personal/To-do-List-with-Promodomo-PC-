import { useState } from 'react';
import { User, Award, ShieldCheck, Laptop, Zap, LogOut, CheckCircle2, AlertCircle, Lock, Sparkles, Cloud } from 'lucide-react';
import type { FirebaseUser } from '../../lib/firebase';

interface ProfileViewProps {
  user: FirebaseUser | null;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  completedPomodorosCount: number;
  completedTasksCount?: number;
}

export function ProfileView({
  user,
  onSignIn,
  onSignOut,
  completedPomodorosCount,
  completedTasksCount = 0
}: ProfileViewProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await onSignIn();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      setLoading(true);
      await onSignOut();
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const streakDays = completedPomodorosCount > 0 ? 1 : 0;

  // Real milestone-based badges
  const badges = [
    {
      icon: '🌱',
      name: 'First Focus',
      description: 'Complete 1 pomodoro session',
      unlocked: completedPomodorosCount >= 1,
    },
    {
      icon: '⚡',
      name: 'Hyperfocus',
      description: 'Complete 4 pomodoro sessions',
      unlocked: completedPomodorosCount >= 4,
    },
    {
      icon: '🎯',
      name: 'Task Finisher',
      description: 'Mark 1 task completed',
      unlocked: completedTasksCount >= 1,
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 font-detail">
      {/* Profile Card */}
      <div className="rounded-3xl border border-white/80 bg-white/70 backdrop-blur-2xl p-7 sm:p-8 shadow-[0_14px_40px_rgba(30,40,90,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <div className="relative">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'User profile'}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-2xl border-2 border-white object-cover shadow-[0_8px_20px_rgba(59,91,253,0.3)]"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl border-2 border-white bg-gradient-to-tr from-[#3b5bfd] to-[#6366f1] shadow-[0_8px_20px_rgba(59,91,253,0.35)] flex items-center justify-center">
              <User className="w-10 h-10 text-white stroke-[2]" />
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-sm">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 justify-center sm:justify-start">
            <h2 className="font-header text-2xl font-black text-[#0f172a] truncate tracking-tight">
              {user?.displayName || (user ? 'Focus Explorer' : 'Guest Explorer')}
            </h2>
            <span className="font-header inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-100 text-[#1d4ed8] w-fit mx-auto sm:mx-0 flex-shrink-0">
              <Zap className="w-3.5 h-3.5 fill-[#3b5bfd] text-[#3b5bfd]" />
              {user ? 'Cloud Sync' : 'Guest'}
            </span>
          </div>

          <p className="font-detail text-xs text-[#64748b] mt-1 font-medium truncate">
            {user?.email ? user.email : 'Local Storage • Guest Mode'}
          </p>

          <div className="font-detail flex items-center justify-center sm:justify-start gap-4 mt-4 text-xs font-medium text-[#475569]">
            <div>
              <span className="font-header font-black text-[#0f172a] text-sm">{completedPomodorosCount}</span> Poms Completed
            </div>
            <div>&bull;</div>
            <div>
              <span className="font-header font-black text-[#0f172a] text-sm">{streakDays}</span> {streakDays === 1 ? 'Day' : 'Days'} Streak
            </div>
          </div>
        </div>

        {/* Action: Only Sign Out appears in this header card when signed in */}
        {user && (
          <div className="flex-shrink-0">
            <button
              onClick={handleGoogleSignOut}
              disabled={loading}
              className="font-header flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/80 hover:bg-white border border-[#e2e8f0] text-xs font-bold text-[#475569] hover:text-rose-600 shadow-sm transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="font-detail flex items-center gap-2 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Dedicated Showcase Div: "Unlock More with Google Sign-in" */}
      {!user && (
        <div className="rounded-3xl border border-white/90 bg-gradient-to-br from-white/95 via-blue-50/40 to-indigo-50/60 backdrop-blur-2xl p-7 sm:p-8 shadow-[0_16px_45px_rgba(30,40,90,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="font-header inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase bg-blue-100 text-[#3b5bfd] border border-blue-200/60">
                <Sparkles className="w-3.5 h-3.5" /> Google Integration
              </span>
              <h3 className="font-header text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight mt-2.5">
                Unlock More with Google Sign-in
              </h3>
              <p className="font-detail text-xs sm:text-sm text-[#475569] mt-1.5 leading-relaxed">
                Connect your Google account to enable secure cloud backups, synchronizing your focus records and tasks seamlessly across all your devices.
              </p>

              {/* 4 Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/80 border border-white/90 shadow-sm">
                  <Cloud className="w-4 h-4 text-[#3b5bfd] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-content text-xs font-bold text-[#0f172a]">Real-Time Cloud Sync</div>
                    <div className="font-detail text-[11px] text-[#64748b]">Access your tasks on your laptop, phone, or tablet.</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/80 border border-white/90 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-content text-xs font-bold text-[#0f172a]">Automatic Safe Backup</div>
                    <div className="font-detail text-[11px] text-[#64748b]">Never lose tasks if you clear browser data.</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/80 border border-white/90 shadow-sm">
                  <Award className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-content text-xs font-bold text-[#0f172a]">Cross-Device Badges</div>
                    <div className="font-detail text-[11px] text-[#64748b]">Preserve your focus streaks & milestones.</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/80 border border-white/90 shadow-sm">
                  <Zap className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-content text-xs font-bold text-[#0f172a]">1-Click Instant Sign-In</div>
                    <div className="font-detail text-[11px] text-[#64748b]">Fast, secure authentication with Google.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Single Prominent Google Sign In Button */}
            <div className="flex flex-col items-center sm:items-start lg:items-end justify-center flex-shrink-0">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="font-header flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-[#cbd5e1] text-xs sm:text-sm font-bold text-[#0f172a] shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>{loading ? 'Connecting...' : 'Sign in with Google'}</span>
              </button>
              <span className="font-detail text-[11px] text-[#64748b] mt-2 font-medium">Free • Instant cross-device sync</span>
            </div>
          </div>
        </div>
      )}

      {/* Badges */}
      <div className="rounded-3xl border border-white/80 bg-white/70 backdrop-blur-2xl p-7 shadow-[0_14px_40px_rgba(30,40,90,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] space-y-5">
        <h3 className="font-header text-base font-bold text-[#0f172a] flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Earned Badges
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {badges.map((badge, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-2xl border text-center transition-all ${
                badge.unlocked 
                  ? 'bg-white/80 border-white/90 shadow-sm' 
                  : 'bg-slate-100/50 border-slate-200/60 opacity-60'
              }`}
            >
              <div className="text-2xl mb-1 flex items-center justify-center gap-1">
                <span>{badge.icon}</span>
                {!badge.unlocked && <Lock className="w-3.5 h-3.5 text-[#94a3b8]" />}
              </div>
              <div className="font-content text-xs font-bold text-[#0f172a]">{badge.name}</div>
              <div className="font-detail text-[10px] text-[#64748b] mt-0.5 font-medium">{badge.description}</div>
              <div className="mt-2">
                <span className={`font-header text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  badge.unlocked ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                }`}>
                  {badge.unlocked ? 'Unlocked' : 'In Progress'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#e2e8f0] flex items-center justify-between text-xs text-[#64748b] font-medium">
          <div className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-[#3b5bfd]" />
            <span className="font-detail">
              {user ? 'Google Cloud Storage: Active & Synchronized' : 'Laptop Browser Storage: Local Mode'}
            </span>
          </div>
          <span className="font-header text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1">
            {user ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Google Synced
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5" /> Local Ready
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
