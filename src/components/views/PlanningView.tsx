import { useState, FormEvent } from 'react';
import { Plus, Check, Trash2, Flame, PlayCircle } from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  estimatedPomodoros: number;
  completedPomodoros: number;
  completed: boolean;
}

interface PlanningViewProps {
  tasks: Task[];
  activeTaskId?: string;
  onAddTask: (title: string, estimated: number) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onSelectTaskToFocus: (id: string) => void;
}

export function PlanningView({
  tasks,
  activeTaskId,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onSelectTaskToFocus,
}: PlanningViewProps) {
  const [newTitle, setNewTitle] = useState('');
  const [newEst, setNewEst] = useState(2);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddTask(newTitle.trim(), newEst);
    setNewTitle('');
    setNewEst(2);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center font-detail">
      {/* Frosted Glass Header Card & Task Input */}
      <div className="w-full rounded-3xl border border-white/80 bg-white/70 backdrop-blur-2xl p-7 shadow-[0_14px_40px_rgba(30,40,90,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] mb-6">
        <h2 className="font-header text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight mb-1">Planning & Tasks</h2>
        <p className="font-detail text-xs text-[#64748b] mb-5">Organize your action items and assign focus intervals.</p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            id="new-task-input"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="What will you work on next?"
            className="font-detail flex-1 bg-white/80 border border-white/90 rounded-2xl px-4 py-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#3b5bfd]/30 focus:border-[#3b5bfd] transition-all shadow-sm"
          />

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-white/80 border border-white/90 rounded-2xl px-3 py-3 text-xs text-[#475569] shadow-sm">
              <Flame className="w-3.5 h-3.5 text-[#3b5bfd]" />
              <span className="font-detail font-medium">Est:</span>
              <select
                value={newEst}
                onChange={(e) => setNewEst(Number(e.target.value))}
                className="font-content bg-transparent text-[#0f172a] font-bold focus:outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                  <option key={n} value={n} className="bg-white text-[#0f172a]">
                    {n} pom
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              id="add-task-btn"
              className="font-header flex items-center gap-1.5 bg-gradient-to-r from-[#3b5bfd] to-[#5b4eff] hover:from-[#324fdf] hover:to-[#4e40e6] text-white text-sm font-bold px-5 py-3 rounded-2xl shadow-[0_8px_20px_rgba(59,91,253,0.3)] transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              Add Task
            </button>
          </div>
        </form>
      </div>

      {/* Task List in Glass Cards */}
      <div className="w-full space-y-3 max-h-[440px] overflow-y-auto pr-1">
        {tasks.length === 0 ? (
          <div className="font-detail p-10 rounded-3xl border border-dashed border-white/80 bg-white/40 text-center text-[#64748b] text-sm font-medium">
            No tasks planned yet. Add your first task above!
          </div>
        ) : (
          tasks.map((task) => {
            const isFocusing = activeTaskId === task.id;

            return (
              <div
                key={task.id}
                className={`group flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  isFocusing
                    ? 'border-[#3b5bfd]/60 bg-blue-50/70 shadow-[0_8px_25px_rgba(59,91,253,0.12)]'
                    : 'border-white/90 bg-white/70 hover:bg-white/90 shadow-sm'
                } backdrop-blur-xl`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                      task.completed
                        ? 'bg-emerald-500 border-emerald-400 text-white'
                        : 'border-[#cbd5e1] hover:border-[#3b5bfd] bg-white'
                    }`}
                  >
                    {task.completed && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                  </button>

                  <div className="min-w-0">
                    <p
                      className={`font-content text-sm font-bold truncate ${
                        task.completed ? 'line-through text-[#94a3b8]' : 'text-[#0f172a]'
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-[#64748b]">
                      <span className="font-detail flex items-center gap-1 font-medium">
                        <Flame className="w-3 h-3 text-[#3b5bfd]" />
                        {task.completedPomodoros} / {task.estimatedPomodoros} poms
                      </span>
                      {isFocusing && (
                        <span className="font-header text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-[#dbeafe] text-[#1d4ed8]">
                          Active Focus
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectTaskToFocus(task.id)}
                    className={`font-header flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isFocusing
                        ? 'bg-[#3b5bfd] text-white shadow-sm'
                        : 'bg-white/80 hover:bg-white text-[#475569] hover:text-[#0f172a] border border-[#e2e8f0]'
                    }`}
                    title="Focus on this task with Pomodoro timer"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline font-bold">Focus</span>
                  </button>

                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-1.5 rounded-lg text-[#94a3b8] hover:text-rose-500 hover:bg-white transition-colors cursor-pointer"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
