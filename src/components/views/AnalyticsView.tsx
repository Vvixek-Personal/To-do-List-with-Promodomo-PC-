import { PieChart as PieChartIcon, TrendingUp, Zap, Clock } from 'lucide-react';

export function AnalyticsView() {
  const categories = [
    { name: 'Deep Work / Coding', poms: 8, percentage: 55, color: 'bg-blue-500' },
    { name: 'Planning & Backlog', poms: 3, percentage: 20, color: 'bg-indigo-400' },
    { name: 'Documentation', poms: 2, percentage: 15, color: 'bg-cyan-400' },
    { name: 'Email & Reviews', poms: 1, percentage: 10, color: 'bg-teal-400' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-5">
      {/* Overview Card */}
      <div className="rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-white/[0.02] backdrop-blur-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-blue-400">PERFORMANCE INSIGHTS</span>
            <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight">Focus Distribution</h2>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.08] border border-white/15 text-blue-300">
            <PieChartIcon className="w-5 h-5 stroke-[1.75]" />
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
          <div>
            <div className="text-xs text-white/50">Total Focus Time</div>
            <div className="text-xl font-light text-white mt-0.5">5.8 hrs</div>
          </div>
          <div>
            <div className="text-xs text-white/50">Completed Poms</div>
            <div className="text-xl font-light text-white mt-0.5">14 poms</div>
          </div>
          <div>
            <div className="text-xs text-white/50">Efficiency</div>
            <div className="text-xl font-light text-emerald-400 mt-0.5">92%</div>
          </div>
        </div>
      </div>

      {/* Breakdown Bar & Details */}
      <div className="rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-2xl p-6 space-y-4">
        <h3 className="text-sm font-medium text-white">Time Allocation by Category</h3>
        
        {/* Segmented Progress Bar */}
        <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden flex">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`${cat.color} h-full transition-all duration-500`}
              style={{ width: `${cat.percentage}%` }}
              title={`${cat.name}: ${cat.percentage}%`}
            />
          ))}
        </div>

        {/* Category List */}
        <div className="divide-y divide-white/10 pt-2">
          {categories.map((cat, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                <span className="text-white/80">{cat.name}</span>
              </div>
              <div className="flex items-center gap-4 text-white/50 font-mono">
                <span>{cat.poms} poms</span>
                <span className="w-10 text-right text-white/80">{cat.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
