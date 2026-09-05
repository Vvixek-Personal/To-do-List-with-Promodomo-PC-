import { Flame, CheckCircle2, Clock, ArrowRight, Play } from 'lucide-react';
import { Task } from './PlanningView';

interface DashboardViewProps {
  tasks: Task[];
  activeTaskTitle?: string;
  onNavigateToWork: () => void;
  onNavigateToPlanning: () => void;
}

export function DashboardView({
  tasks,
  activeTaskTitle,
  onNavigateToWork,
  onNavigateToPlanning
}: DashboardViewProps) {
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const totalPomsCompleted = tasks.reduce((sum, t) => sum + (t.completedPomodoros || 0), 0);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      {/* Welcome & Quick Action */}
      <div className="rounded-3xl border border-white/20 bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-white/[0.03] backdrop-blur-2xl p-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-blue-400">TODAY'S MOMENTUM</span>
          <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-1">Ready for deep focus</h2>
          <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-md">
            {activeTaskTitle 
              ? `Currently queued: "${activeTaskTitle}". Jump straight into your next 25m sprint.` 
              : 'Choose a task or launch your default 25-minute Pomodoro session.'}
          </p>
        </div>

        <button
          onClick={onNavigateToWork}
          className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-medium shadow-[0_6px_25px_rgba(43,68,255,0.45)] border border-white/25 transition-all cursor-pointer whitespace-nowrap"
        >
          <Play className="w-4 h-4 fill-white stroke-[0]" />
          Start Session
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/15 bg-white/[0.05] backdrop-blur-xl p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs uppercase tracking-wider font-mono">Completed Poms</span>
            <Flame className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-light text-white">{totalPomsCompleted}</div>
          <div className="text-[11px] text-white/40 mt-1">{totalPomsCompleted * 25} minutes focused</div>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/[0.05] backdrop-blur-xl p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs uppercase tracking-wider font-mono">Tasks Progress</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-light text-white">{completedTasks} / {totalTasks}</div>
          <div className="text-[11px] text-white/40 mt-1">
            {totalTasks > 0 ? `${Math.round((completedTasks / totalTasks) * 100)}% completed` : 'No active tasks'}
          </div>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/[0.05] backdrop-blur-xl p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs uppercase tracking-wider font-mono">Focus Streak</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-light text-white">4 Days</div>
          <div className="text-[11px] text-white/40 mt-1">Top 10% consistency</div>
        </div>
      </div>

      {/* Up Next List */}
      <div className="rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-white">Upcoming Tasks</h3>
          <button 
            onClick={onNavigateToPlanning}
            className="text-xs text-blue-300 hover:text-white flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2">
          {tasks.slice(0, 3).map((task) => (
            <div 
              key={task.id}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs"
            >
              <div className="flex items-center gap-2.5 text-white/80">
                <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-emerald-400' : 'bg-blue-400'}`} />
                <span className={task.completed ? 'line-through text-white/40' : ''}>{task.title}</span>
              </div>
              <span className="text-white/40">{task.estimatedPomodoros} poms</span>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="text-xs text-white/40 py-2">No tasks added yet. Head to Planning to get started.</p>
          )}
        </div>
      </div>
    </div>
  );
}
