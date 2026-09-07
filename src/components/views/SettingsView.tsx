import { useState } from 'react';
import { Sliders, Bell, Volume2 } from 'lucide-react';

export function SettingsView() {
  const [pomDuration, setPomDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 font-sans">
      {/* Header Card */}
      <div className="rounded-3xl border border-white/80 bg-white/70 backdrop-blur-2xl p-7 shadow-[0_14px_40px_rgba(30,40,90,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]">
        <span className="text-xs font-bold tracking-wider uppercase text-[#3b5bfd]">PREFERENCES</span>
        <h2 className="text-2xl font-bold text-[#0f172a] tracking-tight mt-1">Timer & App Settings</h2>
      </div>

      {/* Timer Interval Settings */}
      <div className="rounded-3xl border border-white/80 bg-white/70 backdrop-blur-2xl p-7 shadow-[0_14px_40px_rgba(30,40,90,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] space-y-6">
        <h3 className="text-sm font-bold text-[#0f172a] flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#3b5bfd]" />
          Interval Durations (Minutes)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/80 border border-white/90 shadow-sm">
            <label className="text-xs font-semibold text-[#64748b] block mb-2">Focus Pomodoro</label>
            <input
              type="number"
              min={1}
              max={90}
              value={pomDuration}
              onChange={(e) => setPomDuration(Number(e.target.value))}
              className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3 py-2 text-[#0f172a] text-lg font-bold font-mono focus:outline-none focus:border-[#3b5bfd]"
            />
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-white/90 shadow-sm">
            <label className="text-xs font-semibold text-[#64748b] block mb-2">Short Break</label>
            <input
              type="number"
              min={1}
              max={30}
              value={shortBreakDuration}
              onChange={(e) => setShortBreakDuration(Number(e.target.value))}
              className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3 py-2 text-[#0f172a] text-lg font-bold font-mono focus:outline-none focus:border-[#3b5bfd]"
            />
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-white/90 shadow-sm">
            <label className="text-xs font-semibold text-[#64748b] block mb-2">Long Break</label>
            <input
              type="number"
              min={1}
              max={60}
              value={longBreakDuration}
              onChange={(e) => setLongBreakDuration(Number(e.target.value))}
              className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3 py-2 text-[#0f172a] text-lg font-bold font-mono focus:outline-none focus:border-[#3b5bfd]"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="pt-5 border-t border-[#e2e8f0] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#3b5bfd]">
                <Volume2 className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0f172a]">Chime Sound Alerts</div>
                <div className="text-xs text-[#64748b]">Play gentle notification sound when timer reaches zero</div>
              </div>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer p-0.5 ${
                soundEnabled ? 'bg-[#3b5bfd]' : 'bg-[#cbd5e1]'
              }`}
            >
              <span
                className={`block w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
                  soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Bell className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0f172a]">Auto-start Breaks</div>
                <div className="text-xs text-[#64748b]">Automatically trigger break timer after pomodoro completion</div>
              </div>
            </div>
            <button
              onClick={() => setAutoStartBreaks(!autoStartBreaks)}
              className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer p-0.5 ${
                autoStartBreaks ? 'bg-[#3b5bfd]' : 'bg-[#cbd5e1]'
              }`}
            >
              <span
                className={`block w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
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
