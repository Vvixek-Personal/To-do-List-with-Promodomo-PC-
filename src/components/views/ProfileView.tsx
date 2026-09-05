import { User, Award, ShieldCheck, Laptop, Zap } from 'lucide-react';

export function ProfileView() {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-5">
      {/* Profile Card */}
      <div className="rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-white/[0.02] backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-2 border-blue-400/60 p-1 bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-[0_0_25px_rgba(59,130,246,0.5)] flex items-center justify-center">
            <User className="w-10 h-10 text-white stroke-[1.75]" />
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#0a0d20] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-xl font-medium text-white">Focus Master</h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30 w-fit mx-auto sm:mx-0">
              <Zap className="w-3 h-3 text-blue-400 fill-blue-400" />
              Level 4
            </span>
          </div>
          <p className="text-xs text-white/50 mt-1">Personal Laptop Workspace &bull; Local Storage Mode</p>
          <div className="flex items-center justify-center sm:justify-start gap-4 mt-4 text-xs text-white/70">
            <div>
              <span className="font-mono text-white font-medium">84</span> Poms Completed
            </div>
            <div>&bull;</div>
            <div>
              <span className="font-mono text-white font-medium">12</span> Day Streak
            </div>
          </div>
        </div>
      </div>

      {/* Badges / Laptop integration status */}
      <div className="rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-2xl p-6 space-y-4">
        <h3 className="text-sm font-medium text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          Earned Badges
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
            <div className="text-2xl mb-1">🔥</div>
            <div className="text-xs font-medium text-white">Early Bird</div>
            <div className="text-[10px] text-white/40 mt-0.5">3 sessions before 9 AM</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-xs font-medium text-white">Hyperfocus</div>
            <div className="text-[10px] text-white/40 mt-0.5">4 consecutive intervals</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-xs font-medium text-white">Zero Distraction</div>
            <div className="text-[10px] text-white/40 mt-0.5">Full task completed</div>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
          <div className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-blue-400" />
            <span>Laptop Browser Storage: Active & Persistent</span>
          </div>
          <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" /> Synchronized
          </span>
        </div>
      </div>
    </div>
  );
}
