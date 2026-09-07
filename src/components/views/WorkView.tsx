import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Flame, Coffee, Sparkles } from 'lucide-react';

interface WorkViewProps {
  activeTaskTitle?: string;
  onNavigateToPlanning: () => void;
  onPomodoroComplete?: () => void;
}

type Mode = 'pomodoro' | 'shortBreak' | 'longBreak';

const MODE_TIMES: Record<Mode, number> = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export function WorkView({ activeTaskTitle, onNavigateToPlanning, onPomodoroComplete }: WorkViewProps) {
  const [mode, setMode] = useState<Mode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(MODE_TIMES.pomodoro);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === 'pomodoro') {
        setCompletedSessions((c) => c + 1);
        if (onPomodoroComplete) {
          onPomodoroComplete();
        }
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, onPomodoroComplete]);

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setTimeLeft(MODE_TIMES[newMode]);
    setIsRunning(false);
  };

  const toggleTimer = () => setIsRunning((r) => !r);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(MODE_TIMES[mode]);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalSeconds = MODE_TIMES[mode];
  const progressPercent = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center font-sans">
      {/* Mode Selector Pill in Frosted Glass */}
      <div className="flex items-center p-1.5 rounded-full bg-white/70 border border-white/80 backdrop-blur-2xl shadow-[0_8px_25px_rgba(30,40,90,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] mb-8">
        <button
          onClick={() => switchMode('pomodoro')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            mode === 'pomodoro'
              ? 'bg-gradient-to-r from-[#3b5bfd] to-[#5b4eff] text-white shadow-[0_4px_16px_rgba(59,91,253,0.35)]'
              : 'text-[#64748b] hover:text-[#0f172a]'
          }`}
        >
          <Flame className="w-4 h-4 stroke-[2]" />
          Focus (25m)
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            mode === 'shortBreak'
              ? 'bg-emerald-600 text-white shadow-[0_4px_16px_rgba(16,185,129,0.35)]'
              : 'text-[#64748b] hover:text-[#0f172a]'
          }`}
        >
          <Coffee className="w-4 h-4 stroke-[2]" />
          Short Break (5m)
        </button>
        <button
          onClick={() => switchMode('longBreak')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            mode === 'longBreak'
              ? 'bg-indigo-600 text-white shadow-[0_4px_16px_rgba(79,70,229,0.35)]'
              : 'text-[#64748b] hover:text-[#0f172a]'
          }`}
        >
          <Sparkles className="w-4 h-4 stroke-[2]" />
          Long Break (15m)
        </button>
      </div>

      {/* Main Frosted Glass Timer Card */}
      <div className="relative w-full aspect-square max-w-sm rounded-[36px] p-8 flex flex-col items-center justify-between border border-white/80 bg-white/70 backdrop-blur-2xl shadow-[0_16px_45px_rgba(30,40,90,0.08),inset_0_1.5px_2px_rgba(255,255,255,0.95)]">
        
        {/* Specular gloss highlight */}
        <div 
          className="absolute inset-0 rounded-[36px] pointer-events-none opacity-60 mix-blend-overlay"
          style={{
            background: 'radial-gradient(ellipse 70% 40% at 75% 10%, rgba(255, 255, 255, 0.9) 0%, transparent 60%)'
          }}
        />

        {/* Current Active Task Tag */}
        <div className="relative z-10 w-full flex justify-between items-center text-xs">
          <span className="font-bold tracking-wider uppercase text-[#3b5bfd] text-[11px]">
            SESSION #{completedSessions + 1}
          </span>
          <button
            onClick={onNavigateToPlanning}
            className="text-[11px] font-semibold text-[#3b5bfd] hover:text-[#2546db] transition-colors underline-offset-4 hover:underline cursor-pointer truncate max-w-[200px]"
          >
            {activeTaskTitle ? `Focus: ${activeTaskTitle}` : '+ Select Task'}
          </button>
        </div>

        {/* Giant Digital Readout */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto">
          <div className="text-7xl sm:text-8xl font-bold tracking-tight text-[#0f172a] drop-shadow-sm font-sans select-none">
            {formattedTime}
          </div>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#64748b] font-semibold">
            {isRunning ? 'Session in progress' : 'Ready to begin'}
          </p>

          {/* Progress bar line */}
          <div className="w-52 h-1.5 bg-[#e2e8f0] rounded-full mt-6 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#3b5bfd] to-[#6366f1] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Timer Controls */}
        <div className="relative z-10 flex items-center gap-4">
          <button
            id="work-timer-reset"
            onClick={resetTimer}
            className="p-3.5 rounded-full border border-white/90 bg-white/80 hover:bg-white text-[#64748b] hover:text-[#0f172a] shadow-sm transition-all cursor-pointer"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5 stroke-[2]" />
          </button>

          <button
            id="work-timer-toggle"
            onClick={toggleTimer}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#3b5bfd] to-[#5b4eff] hover:from-[#324fdf] hover:to-[#4e40e6] text-white font-semibold text-sm shadow-[0_10px_25px_rgba(59,91,253,0.35)] transition-all cursor-pointer flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-white stroke-[0]" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white stroke-[0]" />
                Start Focus
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
