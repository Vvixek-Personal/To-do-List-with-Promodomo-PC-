import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Flame, Coffee, Sparkles } from 'lucide-react';

interface WorkViewProps {
  activeTaskTitle?: string;
  onNavigateToPlanning: () => void;
}

type Mode = 'pomodoro' | 'shortBreak' | 'longBreak';

const MODE_TIMES: Record<Mode, number> = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export function WorkView({ activeTaskTitle, onNavigateToPlanning }: WorkViewProps) {
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
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

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
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      {/* Mode Selector Pill in Liquid Glass */}
      <div className="flex items-center p-1.5 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] mb-10">
        <button
          onClick={() => switchMode('pomodoro')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
            mode === 'pomodoro'
              ? 'bg-white/20 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/25'
              : 'text-white/60 hover:text-white/90 border border-transparent'
          }`}
        >
          <Flame className="w-4 h-4 text-blue-400 stroke-[1.75]" />
          Focus (25m)
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
            mode === 'shortBreak'
              ? 'bg-white/20 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/25'
              : 'text-white/60 hover:text-white/90 border border-transparent'
          }`}
        >
          <Coffee className="w-4 h-4 text-emerald-400 stroke-[1.75]" />
          Short Break (5m)
        </button>
        <button
          onClick={() => switchMode('longBreak')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
            mode === 'longBreak'
              ? 'bg-white/20 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/25'
              : 'text-white/60 hover:text-white/90 border border-transparent'
          }`}
        >
          <Sparkles className="w-4 h-4 text-indigo-300 stroke-[1.75]" />
          Long Break (15m)
        </button>
      </div>

      {/* Main Liquid Glass Timer Card */}
      <div className="relative w-full aspect-square max-w-sm rounded-[40px] p-8 flex flex-col items-center justify-between border border-white/20 bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-white/[0.02] backdrop-blur-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),inset_0_2px_3px_rgba(255,255,255,0.4)]">
        {/* Specular gloss highlight */}
        <div 
          className="absolute inset-0 rounded-[40px] pointer-events-none opacity-40 mix-blend-screen"
          style={{
            background: 'radial-gradient(ellipse 70% 40% at 75% 10%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)'
          }}
        />

        {/* Current Active Task Tag */}
        <div className="relative z-10 w-full flex justify-between items-center text-xs text-white/70">
          <span className="font-mono tracking-wider uppercase text-white/50 text-[11px]">
            SESSION #{completedSessions + 1}
          </span>
          <button
            onClick={onNavigateToPlanning}
            className="text-[11px] font-medium text-blue-300 hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            {activeTaskTitle ? `Focus: ${activeTaskTitle}` : '+ Select Task'}
          </button>
        </div>

        {/* Giant Digital Readout */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto">
          <div className="text-7xl sm:text-8xl font-light tracking-tight text-white drop-shadow-[0_4px_24px_rgba(255,255,255,0.2)] font-sans select-none">
            {formattedTime}
          </div>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/50 font-medium">
            {isRunning ? 'Session in progress' : 'Ready to begin'}
          </p>

          {/* Progress bar line */}
          <div className="w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Timer Controls */}
        <div className="relative z-10 flex items-center gap-4">
          <button
            id="work-timer-reset"
            onClick={resetTimer}
            className="p-3.5 rounded-full border border-white/15 bg-white/[0.06] text-white/70 hover:text-white hover:bg-white/[0.12] transition-all duration-200 cursor-pointer"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5 stroke-[1.75]" />
          </button>

          <button
            id="work-timer-toggle"
            onClick={toggleTimer}
            className="px-8 py-3.5 rounded-full border border-white/30 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm shadow-[0_8px_25px_rgba(43,68,255,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-200 cursor-pointer flex items-center gap-2"
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
