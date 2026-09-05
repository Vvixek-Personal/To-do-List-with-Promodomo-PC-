import { useState } from 'react';
import { Sliders, Bell, Laptop, Volume2 } from 'lucide-react';

export function SettingsView() {
  const [pomDuration, setPomDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-5">
      {/* Header Card */}
      <div className="rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-white/[0.02] backdrop-blur-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]">
        <span className="text-[11px] font-mono tracking-widest uppercase text-blue-400">PREFERENCES</span>
        <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight">Timer & App Settings</h2>
      </div>

      {/* Timer Interval Settings */}
      <div className="rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-2xl p-6 space-y-5">
        <h3 className="text-sm font-medium text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-400" />
          Interval Durations (Minutes)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
            <label className="text-xs text-white/50 block mb-2">Focus Pomodoro</label>
            <input
              type="number"
              min={1}
              max={90}
              value={pomDuration}
              onChange={(e) => setPomDuration(Number(e.target.value))}
              className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-3 py-2 text-white text-base font-mono focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
            <label className="text-xs text-white/50 block mb-2">Short Break</label>
            <input
              type="number"
              min={1}
              max={30}
              value={shortBreakDuration}
              onChange={(e) => setShortBreakDuration(Number(e.target.value))}
              className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-3 py-2 text-white text-base font-mono focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
            <label className="text-xs text-white/50 block mb-2">Long Break</label>
            <input
              type="number"
              min={1}
              max={60}
              value={longBreakDuration}
              onChange={(e) => setLongBreakDuration(Number(e.target.value))}
              className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-3 py-2 text-white text-base font-mono focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="pt-4 border-t border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-white/60" />
              <div>
                <div className="text-xs sm:text-sm text-white font-medium">Chime Sound Alerts</div>
                <div className="text-[11px] text-white/40">Play gentle chime when session completes</div>
              </div>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                soundEnabled ? 'bg-blue-600' : 'bg-white/20'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-white/60" />
              <div>
                <div className="text-xs sm:text-sm text-white font-medium">Auto-start Breaks</div>
                <div className="text-[11px] text-white/40">Automatically commence rest interval</div>
              </div>
            </div>
            <button
              onClick={() => setAutoStartBreaks(!autoStartBreaks)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                autoStartBreaks ? 'bg-blue-600' : 'bg-white/20'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  autoStartBreaks ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
