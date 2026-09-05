import { ChevronLeft, ChevronRight, Clock, Plus } from 'lucide-react';

export function CalendarView() {
  const timeSlots = [
    { time: '09:00 AM', title: 'Deep Work: Core Architecture', duration: '50m (2 poms)', color: 'border-blue-500 bg-blue-500/10 text-blue-200' },
    { time: '10:30 AM', title: 'Bug fixing & Code Review', duration: '25m (1 pom)', color: 'border-indigo-500 bg-indigo-500/10 text-indigo-200' },
    { time: '01:00 PM', title: 'Product Specification & Design', duration: '50m (2 poms)', color: 'border-cyan-500 bg-cyan-500/10 text-cyan-200' },
    { time: '03:30 PM', title: 'Email & Async Planning', duration: '25m (1 pom)', color: 'border-emerald-500 bg-emerald-500/10 text-emerald-200' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-5">
      {/* Calendar Header */}
      <div className="rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-white/[0.02] backdrop-blur-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-blue-400">FOCUS SCHEDULE</span>
            <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight">Today's Focus Blocks</h2>
          </div>
          <div className="flex items-center gap-1.5 bg-white/[0.06] border border-white/15 p-1 rounded-2xl">
            <button className="p-1.5 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-white px-2">TODAY</span>
            <button className="p-1.5 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Timeline */}
      <div className="rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-2xl p-6 divide-y divide-white/10">
        {timeSlots.map((slot, idx) => (
          <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
            <div className="w-20 pt-1 text-xs font-mono text-white/40">{slot.time}</div>
            <div className={`flex-1 p-3.5 rounded-2xl border ${slot.color} backdrop-blur-md`}>
              <div className="text-sm font-medium text-white">{slot.title}</div>
              <div className="flex items-center gap-1.5 text-xs text-white/60 mt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{slot.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
