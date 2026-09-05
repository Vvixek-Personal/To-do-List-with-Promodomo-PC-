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
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Liquid Glass Header Card & Task Input */}
      <div className="w-full rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-white/[0.02] backdrop-blur-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] mb-6">
        <h2 className="text-xl font-medium text-white mb-1">Planning & Tasks</h2>
        <p className="text-xs text-white/50 mb-5">Organize your action items and assign focus intervals.</p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            id="new-task-input"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="What will you work on next?"
            className="flex-1 bg-white/[0.06] border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-400 focus:bg-white/[0.1] transition-all"
          />

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-white/[0.06] border border-white/15 rounded-2xl px-3 py-3 text-xs text-white/70">
              <Flame className="w-3.5 h-3.5 text-blue-400" />
              <span>Est:</span>
              <select
                value={newEst}
                onChange={(e) => setNewEst(Number(e.target.value))}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                  <option key={n} value={n} className="bg-neutral-900 text-white">
                    {n} pom
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              id="add-task-btn"
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-medium px-5 py-3 rounded-2xl border border-white/20 shadow-[0_4px_16px_rgba(43,68,255,0.4)] transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
        </form>
      </div>

      {/* Task List in Glass Cards */}
      <div className="w-full space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
        {tasks.length === 0 ? (
          <div className="p-10 rounded-2xl border border-dashed border-white/15 text-center text-white/40 text-sm">
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
                    ? 'border-blue-400/50 bg-blue-500/[0.12] shadow-[0_4px_20px_rgba(43,68,255,0.2)]'
                    : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08]'
                } backdrop-blur-xl`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                      task.completed
                        ? 'bg-emerald-500 border-emerald-400 text-white'
                        : 'border-white/30 hover:border-white/60 bg-white/[0.05]'
                    }`}
                  >
                    {task.completed && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                  </button>

                  <div className="min-w-0">
                    <p
                      className={`text-sm font-medium truncate ${
                        task.completed ? 'line-through text-white/40' : 'text-white'
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-white/50">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-blue-400" />
                        {task.completedPomodoros} / {task.estimatedPomodoros} poms
                      </span>
                      {isFocusing && (
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                          Active Focus
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectTaskToFocus(task.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      isFocusing
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/[0.08] hover:bg-white/[0.15] text-white/70 hover:text-white'
                    }`}
                    title="Focus on this task with Pomodoro timer"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Focus</span>
                  </button>

                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-1.5 rounded-lg text-white/30 hover:text-rose-400 hover:bg-white/[0.06] transition-colors"
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
