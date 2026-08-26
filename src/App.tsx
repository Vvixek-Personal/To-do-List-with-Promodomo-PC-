/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CheckCircle2, Timer, Settings } from 'lucide-react';

type TabId = 'timer' | 'tasks' | 'settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('timer');

  const tabs = [
    { 
      id: 'timer', 
      label: 'Timer', 
      icon: Timer,
      desc: 'Pomodoro timer will go here. A modular environment for deep focus sessions and interval training.'
    },
    { 
      id: 'tasks', 
      label: 'Tasks', 
      icon: CheckCircle2,
      desc: 'Todo list and task management will go here. Organize and estimate your workload.'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings,
      desc: 'App preferences and timer durations will go here. Customize your workspace.'
    },
  ] as const;

  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto] overflow-hidden bg-bg text-ink font-inter antialiased">
      <header className="flex justify-between items-end p-[2rem_4vw] border-b-[1.5px] border-ink">
        <div className="font-space text-[0.65rem] uppercase tracking-[0.15em] text-ink-muted hidden sm:block">
          [ ST-24 // AI STUDIO ]
        </div>
        <nav className="flex gap-6 mx-auto sm:mx-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex items-center gap-2 py-[0.5rem] bg-transparent border-none cursor-pointer
                  font-space text-[0.75rem] uppercase tracking-[0.1em] transition-colors duration-300
                  ${isActive ? 'text-ink' : 'text-ink-muted hover:text-ink/80'}
                `}
              >
                <Icon className="w-[14px] h-[14px] stroke-[1.5px]" />
                {tab.label}
                {isActive && (
                  <div className="absolute -bottom-[2rem] left-0 w-full h-[3px] bg-ink" />
                )}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="flex flex-col justify-center items-center p-[4vw] text-center">
        {tabs.map((tab) => {
          if (activeTab !== tab.id) return null;
          const Icon = tab.icon;
          
          return (
            <div key={tab.id} className="animate-in fade-in zoom-in-95 duration-700">
              <div className="mb-12 opacity-80 flex justify-center">
                <Icon className="w-16 h-16 stroke-[1px]" />
              </div>
              <h1 className="font-cormorant text-[clamp(4rem,10vw,12rem)] leading-[0.85] tracking-[-0.04em] mb-8">
                {tab.label} View
              </h1>
              <p className="text-[1.1rem] leading-[1.6] max-w-[45ch] text-ink-muted mx-auto">
                {tab.desc}
              </p>
            </div>
          );
        })}
      </main>

      <footer className="flex justify-between p-[1.5rem_4vw] border-t border-ink-faint font-space text-[0.6rem] uppercase tracking-[0.1em] text-ink-muted">
        <div>V 1.0.4 - SYSTEM ACTIVE</div>
        <div className="hidden sm:block">ST-TIME-MODULE_001</div>
        <div>LOC / INT-VIEWPORT</div>
      </footer>
    </div>
  );
}
