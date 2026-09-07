import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabId } from './types';
import { LiquidDock } from './components/LiquidDock';
import { LiquidBackground } from './components/LiquidBackground';
import { GoogleSignupPopup } from './components/GoogleSignupPopup';
import { DashboardView } from './components/views/DashboardView';
import { WorkView } from './components/views/WorkView';
import { PlanningView, Task } from './components/views/PlanningView';
import { CalendarView } from './components/views/CalendarView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { SettingsView } from './components/views/SettingsView';
import { ProfileView } from './components/views/ProfileView';
import { 
  auth, 
  db, 
  onAuthStateChanged, 
  signInWithGoogle, 
  signOutUser, 
  type FirebaseUser,
  handleFirestoreError,
  OperationType
} from './lib/firebase';
import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  getDoc
} from 'firebase/firestore';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [activeTaskId, setActiveTaskId] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  // Clean local tasks state with no prefilled items
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      // Clean up legacy prefilled tasks from earlier iterations
      localStorage.removeItem('todo_pomodoro_tasks');
      localStorage.removeItem('todo_pomodoro_tasks_v2');

      const saved = localStorage.getItem('todo_pomodoro_tasks_clean');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Track Firebase Auth state & show 3-second popup when not signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        // Trigger 3-second signup popup when user is not signed up
        setShowSignupPopup(true);
      } else {
        setShowSignupPopup(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Persist clean tasks to localStorage when in local/guest mode
  useEffect(() => {
    if (!user) {
      try {
        localStorage.setItem('todo_pomodoro_tasks_clean', JSON.stringify(tasks));
      } catch (e) {
        console.error(e);
      }
    }
  }, [tasks, user]);

  // Sync with Firestore when signed in
  useEffect(() => {
    if (!user) return;

    const tasksColRef = collection(db, 'users', user.uid, 'tasks');

    // Real-time listener for user's tasks in Firestore
    const unsubscribe = onSnapshot(
      tasksColRef, 
      (snapshot) => {
        const remoteTasks: Task[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            title: data.title || '',
            estimatedPomodoros: Number(data.estimatedPomodoros) || 1,
            completedPomodoros: Number(data.completedPomodoros) || 0,
            completed: Boolean(data.completed),
          };
        });
        setTasks(remoteTasks);
        if (remoteTasks.length > 0 && !activeTaskId) {
          setActiveTaskId(remoteTasks[0].id);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, `users/${user.uid}/tasks`);
      }
    );

    return () => unsubscribe();
  }, [user, activeTaskId]);

  const handleAddTask = async (title: string, estimatedPomodoros: number) => {
    const newId = Date.now().toString();
    const newTask: Task = {
      id: newId,
      title,
      estimatedPomodoros,
      completedPomodoros: 0,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setActiveTaskId(newTask.id);

    // Persist to Firestore if signed in
    if (user) {
      try {
        const taskDocRef = doc(db, 'users', user.uid, 'tasks', newId);
        await setDoc(taskDocRef, {
          id: newId,
          userId: user.uid,
          title,
          estimatedPomodoros,
          completedPomodoros: 0,
          completed: false,
          createdAt: new Date().toISOString()
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `users/${user.uid}/tasks/${newId}`);
      }
    }
  };

  const handleToggleTask = async (id: string) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);

    if (user) {
      const targetTask = updated.find((t) => t.id === id);
      if (targetTask) {
        try {
          const taskDocRef = doc(db, 'users', user.uid, 'tasks', id);
          await updateDoc(taskDocRef, {
            completed: targetTask.completed,
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}/tasks/${id}`);
        }
      }
    }
  };

  const handleDeleteTask = async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (activeTaskId === id) {
      setActiveTaskId(undefined);
    }

    if (user) {
      try {
        const taskDocRef = doc(db, 'users', user.uid, 'tasks', id);
        await deleteDoc(taskDocRef);
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `users/${user.uid}/tasks/${id}`);
      }
    }
  };

  const handleSelectTaskToFocus = (id: string) => {
    setActiveTaskId(id);
    setActiveTab('work');
  };

  const handlePomodoroComplete = async () => {
    if (!activeTaskId) return;

    const updated = tasks.map((task) => {
      if (task.id === activeTaskId) {
        const newCount = (task.completedPomodoros || 0) + 1;
        return {
          ...task,
          completedPomodoros: newCount,
          completed: newCount >= task.estimatedPomodoros ? true : task.completed,
        };
      }
      return task;
    });

    setTasks(updated);

    if (user) {
      const targetTask = updated.find((t) => t.id === activeTaskId);
      if (targetTask) {
        try {
          const taskDocRef = doc(db, 'users', user.uid, 'tasks', activeTaskId);
          await updateDoc(taskDocRef, {
            completedPomodoros: targetTask.completedPomodoros,
            completed: targetTask.completed,
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}/tasks/${activeTaskId}`);
        }
      }
    }
  };

  const activeTask = tasks.find((t) => t.id === activeTaskId);
  const totalCompletedPoms = tasks.reduce((sum, t) => sum + (t.completedPomodoros || 0), 0);
  const completedTasksCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="relative min-h-screen flex flex-col font-detail select-none overflow-x-hidden text-[#0f172a]">
      {/* Ambient Misty Mountain Lake Landscape Backdrop */}
      <LiquidBackground />

      {/* 3-Second Floating Signup Popup when unauthenticated */}
      <GoogleSignupPopup
        isOpen={showSignupPopup && !user}
        onClose={() => setShowSignupPopup(false)}
        onSignIn={async () => {
          await signInWithGoogle();
        }}
      />

      {/* Main View Area: Framed inside the soft glass window */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-5 pb-28 flex flex-col items-center justify-center">
        
        {/* Top Header Bar: Futura-crafted Wordmark & Quick Profile Pill */}
        <div className="w-full flex items-center justify-between px-2 mb-3">
          {/* Brand Wordmark (Futura customized geometric modification) */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#3b5bfd] to-[#6366f1] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(59,91,253,0.35)] group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-brand font-black tracking-tighter text-[#0f172a] text-lg sm:text-xl uppercase">
                POMOFLOW
              </span>
              <span className="font-detail text-[10px] text-[#64748b] font-semibold tracking-wider uppercase">
                Focus & Tasks
              </span>
            </div>
          </div>

          {/* Quick Profile / Status Pill */}
          {user ? (
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/75 hover:bg-white border border-white/95 text-xs font-content font-semibold text-[#0f172a] shadow-sm backdrop-blur-md transition-all cursor-pointer"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Google Profile'}
                  referrerPolicy="no-referrer"
                  className="w-4 h-4 rounded-full object-cover"
                />
              ) : (
                <div className="w-4 h-4 rounded-full bg-[#3b5bfd] text-white flex items-center justify-center text-[9px] font-bold font-header">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'G'}
                </div>
              )}
              <span className="truncate max-w-[120px] font-content font-semibold">{user.displayName || 'Google User'}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setShowSignupPopup(true);
                setActiveTab('profile');
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/75 hover:bg-white border border-white/95 text-xs font-detail font-medium text-[#475569] shadow-sm backdrop-blur-md transition-all cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span className="font-content font-medium">Guest Mode</span>
            </button>
          )}
        </div>

        {/* Outer Window Frame */}
        <div className="w-full rounded-[36px] sm:rounded-[44px] border border-white/60 bg-white/30 backdrop-blur-2xl p-5 sm:p-8 shadow-[0_24px_70px_rgba(15,23,42,0.1),inset_0_1.5px_2px_rgba(255,255,255,0.8)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
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
                  onPomodoroComplete={handlePomodoroComplete}
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

              {activeTab === 'calendar' && (
                <CalendarView 
                  tasks={tasks} 
                  onNavigateToPlanning={() => setActiveTab('planning')}
                />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsView tasks={tasks} />
              )}

              {activeTab === 'settings' && <SettingsView />}

              {activeTab === 'profile' && (
                <ProfileView 
                  user={user}
                  onSignIn={async () => { await signInWithGoogle(); }}
                  onSignOut={signOutUser}
                  completedPomodorosCount={totalCompletedPoms}
                  completedTasksCount={completedTasksCount}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Persistent Floating Liquid Glass Dockbar at Bottom */}
      <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <LiquidDock activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
