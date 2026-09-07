import { ChevronLeft, ChevronRight, Clock, CalendarDays, PlusCircle } from 'lucide-react';
import { Task } from './PlanningView';

interface CalendarViewProps {
  tasks: Task[];
  onNavigateToPlanning?: () => void;
}

export function CalendarView({ tasks, onNavigateToPlanning }: CalendarViewProps) {
  // Dynamically map real user tasks into focus schedule blocks
  const scheduledBlocks = tasks.map((task, idx) => {
    const baseHour = 9 + idx;
    const period = baseHour >= 12 ? 'PM' : 'AM';
    const displayHour = baseHour > 12 ? baseHour - 12 : baseHour;
    const timeStr = `${String(displayHour).padStart(2, '0')}:00 ${period}`;
    const poms = task.estimatedPomodoros;
    const durationStr = `${poms * 25}m (${poms} ${poms === 1 ? 'pom' : 'poms'})`;

    const colors = [
      { border: 'border-blue-200 bg-blue-50/80 text-blue-900', badge: 'bg-blue-100 text-blue-700' },
      { border: 'border-indigo-200 bg-indigo-50/80 text-indigo-900', badge: 'bg-indigo-100 text-indigo-700' },
      { border: 'border-cyan-200 bg-cyan-50/80 text-cyan-900', badge: 'bg-cyan-100 text-cyan-700' },
      { border: 'border-emerald-200 bg-emerald-50/80 text-emerald-900', badge: 'bg-emerald-100 text-emerald-700' },
    ];
    const colorStyle = colors[idx % colors.length];

    return {
      id: task.id,
      time: timeStr,
      title: task.title,
      duration: durationStr,
      completed: task.completed,
      ...colorStyle,
    };
  });

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 font-detail">
      {/* Calendar Header */}
      <div className="rounded-3xl border border-white/80 bg-white/70 backdrop-blur-2xl p-7 shadow-[0_14px_40px_rgba(30,40,90,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-header text-xs font-bold tracking-wider uppercase text-[#3b5bfd]">FOCUS SCHEDULE</span>
            <h2 className="font-header text-2xl font-bold text-[#0f172a] tracking-tight mt-1">Today's Focus Blocks</h2>
          </div>
          <div className="flex items-center gap-1.5 bg-white/80 border border-white/90 p-1 rounded-2xl shadow-sm">
            <button className="p-1.5 rounded-xl hover:bg-white text-[#64748b] hover:text-[#0f172a] transition-colors cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-header text-xs font-bold text-[#0f172a] px-2 tracking-wider">TODAY</span>
            <button className="p-1.5 rounded-xl hover:bg-white text-[#64748b] hover:text-[#0f172a] transition-colors cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Timeline */}
      <div className="rounded-3xl border border-white/80 bg-white/70 backdrop-blur-2xl p-7 shadow-[0_14px_40px_rgba(30,40,90,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]">
        {scheduledBlocks.length === 0 ? (
          <div 
            onClick={onNavigateToPlanning}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-[#cbd5e1] bg-white/40 hover:bg-white/60 text-center cursor-pointer transition-colors"
          >
            <CalendarDays className="w-8 h-8 text-[#94a3b8] mb-2 stroke-[1.5]" />
            <p className="font-content text-sm font-bold text-[#1e293b]">No focus blocks scheduled yet</p>
            <p className="font-detail text-xs text-[#64748b] mt-1">Create tasks in Planning to generate your daily focus schedule automatically.</p>
            <span className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1d4ed8] text-xs font-header font-bold border border-blue-200">
              <PlusCircle className="w-3.5 h-3.5" /> Plan Tasks
            </span>
          </div>
        ) : (
          <div className="divide-y divide-[#e2e8f0]">
            {scheduledBlocks.map((slot) => (
              <div key={slot.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                <div className="w-24 pt-2 text-xs font-detail tabular-nums font-semibold text-[#64748b] flex-shrink-0">{slot.time}</div>
                <div className={`flex-1 p-4 rounded-2xl border ${slot.border} shadow-sm backdrop-blur-md`}>
                  <div className={`font-content text-sm font-bold text-[#0f172a] ${slot.completed ? 'line-through text-[#94a3b8]' : ''}`}>
                    {slot.title}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#475569] mt-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#3b5bfd]" />
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${slot.badge}`}>
                      {slot.duration}
                    </span>
                    {slot.completed && (
                      <span className="font-header text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
