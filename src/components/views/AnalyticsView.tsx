import { PieChart as PieChartIcon, Clock, Award, BarChart2 } from 'lucide-react';
import { Task } from './PlanningView';

interface AnalyticsViewProps {
  tasks: Task[];
}

export function AnalyticsView({ tasks }: AnalyticsViewProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalPoms = tasks.reduce((sum, t) => sum + (t.completedPomodoros || 0), 0);
  const totalFocusHours = ((totalPoms * 25) / 60).toFixed(1);
  const efficiency = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Derive task breakdown if tasks exist
  const taskCategories = tasks.map((task, idx) => {
    const palette = ['bg-[#3b82f6]', 'bg-[#6366f1]', 'bg-[#06b6d4]', 'bg-[#10b981]', 'bg-[#f59e0b]'];
    const color = palette[idx % palette.length];
    const percentage = totalPoms > 0 
      ? Math.round(((task.completedPomodoros || 0) / totalPoms) * 100)
      : totalTasks > 0 
      ? Math.round(100 / totalTasks) 
      : 0;

    return {
      name: task.title,
      poms: task.completedPomodoros || 0,
      percentage,
      color,
    };
  });

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 font-detail">
      {/* Overview Card */}
      <div className="rounded-3xl border border-white/80 bg-white/70 backdrop-blur-2xl p-7 shadow-[0_14px_40px_rgba(30,40,90,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="font-header text-xs font-bold tracking-wider uppercase text-[#3b5bfd]">PERFORMANCE INSIGHTS</span>
            <h2 className="font-header text-2xl font-bold text-[#0f172a] tracking-tight mt-1">Focus Distribution</h2>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] border border-[#dbeafe] flex items-center justify-center text-[#3b82f6] shadow-sm">
            <PieChartIcon className="w-6 h-6 stroke-[2]" />
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#e2e8f0]">
          <div>
            <div className="font-detail text-xs font-medium text-[#64748b]">Total Focus Time</div>
            <div className="font-header text-2xl sm:text-3xl font-bold text-[#0f172a] mt-0.5 tracking-tight tabular-nums">{totalFocusHours} hrs</div>
          </div>
          <div>
            <div className="font-detail text-xs font-medium text-[#64748b]">Completed Poms</div>
            <div className="font-header text-2xl sm:text-3xl font-bold text-[#0f172a] mt-0.5 tracking-tight tabular-nums">{totalPoms} poms</div>
          </div>
          <div>
            <div className="font-detail text-xs font-medium text-[#64748b]">Efficiency</div>
            <div className="font-header text-2xl sm:text-3xl font-bold text-[#10b981] mt-0.5 tracking-tight tabular-nums">{efficiency}%</div>
          </div>
        </div>
      </div>

      {/* Breakdown Bar & Details */}
      <div className="rounded-3xl border border-white/80 bg-white/70 backdrop-blur-2xl p-7 shadow-[0_14px_40px_rgba(30,40,90,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] space-y-5">
        <h3 className="font-header text-base font-bold text-[#0f172a]">Time Allocation by Task</h3>
        
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-[#cbd5e1] bg-white/40 text-center">
            <BarChart2 className="w-8 h-8 text-[#94a3b8] mb-2 stroke-[1.5]" />
            <p className="font-content text-sm font-bold text-[#1e293b]">No analytics data yet</p>
            <p className="font-detail text-xs text-[#64748b] mt-1">Plan and complete focus sessions to see real-time distribution charts.</p>
          </div>
        ) : (
          <>
            {/* Segmented Progress Bar */}
            <div className="h-3.5 w-full bg-[#f1f5f9] rounded-full overflow-hidden flex p-0.5 border border-[#e2e8f0]">
              {taskCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className={`${cat.color} h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full`}
                  style={{ width: `${cat.percentage}%` }}
                  title={`${cat.name}: ${cat.percentage}%`}
                />
              ))}
            </div>

            {/* Category List */}
            <div className="divide-y divide-[#e2e8f0] pt-2">
              {taskCategories.map((cat, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-3 min-w-0 pr-4">
                    <div className={`w-3.5 h-3.5 rounded-full ${cat.color} shadow-sm flex-shrink-0`} />
                    <span className="font-content font-bold text-[#0f172a] truncate">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#64748b] font-detail tabular-nums flex-shrink-0">
                    <span className="font-detail text-xs font-medium">{cat.poms} poms</span>
                    <span className="w-12 text-right font-header font-bold text-xs text-[#0f172a]">{cat.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
