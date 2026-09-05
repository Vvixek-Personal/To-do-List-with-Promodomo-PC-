import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabId } from './types';
import { LiquidDock } from './components/LiquidDock';
import { LiquidBackground } from './components/LiquidBackground';
import { DashboardView } from './components/views/DashboardView';
import { WorkView } from './components/views/WorkView';
import { PlanningView, Task } from './components/views/PlanningView';
import { CalendarView } from './components/views/CalendarView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { SettingsView } from './components/views/SettingsView';
import { ProfileView } from './components/views/ProfileView';

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Complete Pomodoro timer app foundation', estimatedPomodoros: 2, completedPomodoros: 1, completed: false },
  { id: '2', title: 'Test liquid glass navigation bar interactions', estimatedPomodoros: 1, completedPomodoros: 1, completed: true },
  { id: '3', title: 'Plan focus intervals for weekly sprint', estimatedPomodoros: 3, completedPomodoros: 0, completed: false },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('work');
  const [activeTaskId, setActiveTaskId] = useState<string | undefined>('1');

  // Load tasks from localStorage or initialize with sample tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('todo_pomodoro_tasks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TASKS;
  });

  // Save tasks to localStorage on update
  useEffect(() => {
    try {
      localStorage.setItem('todo_pomodoro_tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  const handleAddTask = (title: string, estimatedPomodoros: number) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      estimatedPomodoros,
      completedPomodoros: 0,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    if (!activeTaskId) {
      setActiveTaskId(newTask.id);
    }
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (activeTaskId === id) {
      setActiveTaskId(undefined);
    }
  };

  const handleSelectTaskToFocus = (id: string) => {
    setActiveTaskId(id);
    setActiveTab('work');
  };

  const activeTask = tasks.find((t) => t.id === activeTaskId);

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-white select-none overflow-x-hidden">
      {/* Ambient Liquid Glass dynamic backdrop */}
      <LiquidBackground />

      {/* Main View Area (Header and bottom footer bars completely removed as requested) */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-32 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center justify-center"
          >
            {activeTab === 'dashboard' && (
              <DashboardView
                tasks={tasks}
                activeTaskTitle={activeTask?.title}
                onNavigateToWork={() => setActiveTab('work')}
                onNavigateToPlanning={() => setActiveTab('planning')}
              />
            )}

            {activeTab === 'work' && (
              <WorkView
                activeTaskTitle={activeTask?.title}
                onNavigateToPlanning={() => setActiveTab('planning')}
              />
            )}

            {activeTab === 'planning' && (
              <PlanningView
                tasks={tasks}
                activeTaskId={activeTaskId}
                onAddTask={handleAddTask}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onSelectTaskToFocus={handleSelectTaskToFocus}
              />
            )}

            {activeTab === 'calendar' && <CalendarView />}

            {activeTab === 'analytics' && <AnalyticsView />}

            {activeTab === 'settings' && <SettingsView />}

            {activeTab === 'profile' && <ProfileView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Liquid Glass Dockbar at Bottom */}
      <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <LiquidDock activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
