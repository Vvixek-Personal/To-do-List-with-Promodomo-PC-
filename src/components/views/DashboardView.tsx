import { Flame, CheckCircle2, ChevronRight, Play, PlusCircle } from 'lucide-react';
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
  const taskProgressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const streakDays = totalPomsCompleted > 0 ? 1 : 0;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 font-detail">
      {/* Top Welcome / Momentum Card */}
      <div className="rounded-3xl border border-white/80 bg-white/70 backdrop-blur-2xl p-7 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-[0_14px_40px_rgba(30,40,90,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]">
        <div>
          <span className="font-header text-xs font-extrabold tracking-wider uppercase text-[#3b5bfd]">
            TODAY'S MOMENTUM
          </span>
          <h1 className="font-header text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight mt-1.5">
            Ready for deep focus
          </h1>
          <p className="font-detail text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed max-w-lg">
            {activeTaskTitle 
              ? `Currently queued: "${activeTaskTitle}". Jump straight into your next 25m sprint.`
              : totalTasks > 0
              ? 'Select a task from your backlog to begin your next focus sprint.'
              : 'No tasks currently queued. Add your first task in Planning or start an open focus sprint.'}
          </p>
        </div>

        <button
          onClick={totalTasks === 0 ? onNavigateToPlanning : onNavigateToWork}
          className="font-header flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#3b5bfd] to-[#5b4eff] hover:from-[#324fdf] hover:to-[#4e40e6] text-white text-sm font-bold shadow-[0_10px_25px_rgba(59,91,253,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap"
        >
          {totalTasks === 0 ? (
            <>
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              Add First Task
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white stroke-[0]" />
              Start Session
            </>
          )}
        </button>
      </div>

      {/* Metrics Row: 3 Frosted Glass Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Card 1: Completed Poms */}
        <div 
          onClick={onNavigateToWork}
          className="group rounded-3xl border border-white/80 bg-white/70 backdrop-blur-2xl p-6 flex items-center justify-between shadow-[0_14px_40px_rgba(30,40,90,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_16px_45px_rgba(30,40,90,0.09)] transition-all cursor-pointer"
        >
          <div className="flex items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#eff6ff] border border-[#dbeafe] flex items-center justify-center flex-shrink-0 mr-4 shadow-sm">
              <CheckCircle2 className="w-7 h-7 text-[#3b82f6] stroke-[2]" />
            </div>
            <div>
              <div className="font-header text-[11px] font-extrabold tracking-wider uppercase text-[#3b82f6]">
                COMPLETED POMS
              </div>
              <div className="font-header text-3xl sm:text-4xl font-black text-[#0f172a] mt-0.5 tracking-tight">
                {totalPomsCompleted}
              </div>
              <div className="font-detail text-xs text-[#64748b] mt-0.5">
                {totalPomsCompleted > 0 ? `${totalPomsCompleted * 25}m of focus harnessed` : '0m of focus harnessed'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#94a3b8] group-hover:text-[#3b82f6] group-hover:translate-x-0.5 transition-all" />
        </div>

        {/* Card 2: Tasks Progress */}
        <div 
          onClick={onNavigateToPlanning}
          className="group rounded-3xl border border-white/80 bg-white/70 backdrop-blur-2xl p-6 flex items-center justify-between shadow-[0_14px_40px_rgba(30,40,90,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_16px_45px_rgba(30,40,90,0.09)] transition-all cursor-pointer"
        >
          <div className="flex items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#ecfdf5] border border-[#d1fae5] flex items-center justify-center flex-shrink-0 mr-4 shadow-sm">
              <svg className="w-7 h-7 text-[#10b981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="4" height="4" rx="1" />
                <path d="M10 7h11" />
                <rect x="3" y="11" width="4" height="4" rx="1" />
                <path d="M10 13h11" />
                <rect x="3" y="17" width="4" height="4" rx="1" />
                <path d="M10 19h11" />
              </svg>
            </div>
            <div>
              <div className="font-header text-[11px] font-extrabold tracking-wider uppercase text-[#10b981]">
                TASKS PROGRESS
              </div>
              <div className="font-header text-3xl sm:text-4xl font-black text-[#0f172a] mt-0.5 tracking-tight">
                {totalTasks > 0 ? `${completedTasks} / ${totalTasks}` : '0 / 0'}
              </div>
              <div className="font-detail text-xs text-[#64748b] mt-0.5">
                {totalTasks > 0 ? `${taskProgressPercent}% completed` : 'No tasks created yet'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#94a3b8] group-hover:text-[#10b981] group-hover:translate-x-0.5 transition-all" />
        </div>

        {/* Card 3: Focus Streak */}
        <div 
          onClick={onNavigateToWork}
          className="group rounded-3xl border border-white/80 bg-white/70 backdrop-blur-2xl p-6 flex items-center justify-between shadow-[0_14px_40px_rgba(30,40,90,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_16px_45px_rgba(30,40,90,0.09)] transition-all cursor-pointer"
        >
          <div className="flex items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#fff7ed] border border-[#ffedd5] flex items-center justify-center flex-shrink-0 mr-4 shadow-sm">
              <Flame className="w-7 h-7 text-[#f97316] fill-[#f97316]/20 stroke-[2]" />
            </div>
            <div>
              <div className="font-header text-[11px] font-extrabold tracking-wider uppercase text-[#ea580c]">
                FOCUS STREAK
              </div>
              <div className="font-header text-3xl sm:text-4xl font-black text-[#0f172a] mt-0.5 tracking-tight">
                {streakDays} {streakDays === 1 ? 'Day' : 'Days'}
              </div>
              <div className="font-detail text-xs text-[#64748b] mt-0.5">
                {totalPomsCompleted > 0 ? 'Active focus streak' : 'Complete a session to start streak'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#94a3b8] group-hover:text-[#ea580c] group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>

      {/* Upcoming Tasks Section */}
      <div className="rounded-3xl border border-white/80 bg-white/70 backdrop-blur-2xl p-7 shadow-[0_14px_40px_rgba(30,40,90,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-header text-lg font-bold text-[#0f172a]">Upcoming Tasks</h2>
          <button 
            onClick={onNavigateToPlanning}
            className="font-header text-xs font-bold text-[#3b5bfd] hover:text-[#2546db] flex items-center gap-1 transition-colors cursor-pointer"
          >
            View all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {tasks.length === 0 ? (
          <div 
            onClick={onNavigateToPlanning}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-[#cbd5e1] bg-white/40 hover:bg-white/60 text-center cursor-pointer transition-colors"
          >
            <p className="font-content text-sm font-bold text-[#1e293b]">No tasks planned yet</p>
            <p className="font-detail text-xs text-[#64748b] mt-1">Click to create your first action item and assign estimated pomodoros.</p>
            <span className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1d4ed8] text-xs font-header font-bold border border-blue-200">
              <PlusCircle className="w-3.5 h-3.5" /> Plan New Task
            </span>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.slice(0, 3).map((task, idx) => {
              const dotColor = idx % 2 === 1 ? 'bg-[#10b981]' : 'bg-[#3b82f6]';
              const badgeStyle = idx % 2 === 1 
                ? 'bg-[#d1fae5]/80 text-[#047857]' 
                : 'bg-[#dbeafe]/80 text-[#1d4ed8]';

              return (
                <div 
                  key={task.id}
                  onClick={onNavigateToPlanning}
                  className="group flex items-center justify-between p-4 rounded-2xl bg-white/60 hover:bg-white/85 border border-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.04)] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-3 h-3 rounded-full ${dotColor} flex-shrink-0 shadow-sm`} />
                    <span className={`font-content text-sm font-semibold truncate ${task.completed ? 'line-through text-[#94a3b8]' : 'text-[#1e293b]'}`}>
                      {task.title}
                    </span>
                  </div>
                  <span className={`font-detail text-xs font-semibold px-3 py-1.5 rounded-full ${badgeStyle} flex-shrink-0 ml-4`}>
                    {task.completedPomodoros} / {task.estimatedPomodoros} poms
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
