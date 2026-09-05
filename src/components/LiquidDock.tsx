import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Calendar, 
  PieChart, 
  Settings, 
  User 
} from 'lucide-react';
import { TabId, NavItem } from '../types';

interface LiquidDockProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Overview of your productivity, active sessions, and priorities'
  },
  {
    id: 'work',
    label: 'Work',
    icon: Briefcase,
    description: 'Deep focus interval timer and active Pomodoro session control'
  },
  {
    id: 'planning',
    label: 'Planning',
    icon: CheckSquare,
    description: 'Task organization, backlog, and estimated workload management'
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: Calendar,
    description: 'Schedule focus blocks, daily agenda, and timeline distribution'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: PieChart,
    description: 'Focus metrics, completed intervals, and weekly productivity trends'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    description: 'Timer intervals, sound alerts, display mode, and system preferences'
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    description: 'Account status, streaks, badges, and personal productivity goals'
  }
];

export function LiquidDock({ activeTab, onTabChange }: LiquidDockProps) {
  return (
    <div className="relative z-50 flex items-center justify-center pointer-events-auto select-none">
      {/* Liquid Glass Capsule Bar */}
      <div className="relative flex items-center p-1.5 sm:p-2 rounded-full border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65),inset_0_1.5px_2px_rgba(255,255,255,0.45),inset_0_-1px_2px_rgba(255,255,255,0.1)] bg-gradient-to-b from-white/[0.16] via-white/[0.07] to-white/[0.03] backdrop-blur-2xl overflow-hidden transition-all duration-300">
        
        {/* Specular Liquid Glare / Glass Refraction Curve (matching reference image) */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen"
          style={{
            background: 'radial-gradient(ellipse 65% 50% at 75% 20%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.05) 55%, transparent 80%)'
          }}
        />

        {/* Ambient Top Rim Highlight */}
        <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />

        {/* Navigation Items */}
        <div className="relative flex items-center gap-1 sm:gap-1.5 z-10">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`dock-tab-${item.id}`}
                onClick={() => onTabChange(item.id)}
                className={`
                  relative group flex items-center justify-center rounded-full px-3 py-2.5 sm:px-3.5 sm:py-2.5 
                  transition-colors duration-200 outline-none cursor-pointer
                  ${isActive ? 'text-white' : 'text-white/60 hover:text-white/95'}
                `}
                title={item.label}
              >
                {/* Active Liquid Pill Backdrop Animation */}
                {isActive && (
                  <motion.div
                    layoutId="liquidActivePill"
                    className="absolute inset-0 rounded-full bg-white/[0.15] border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_16px_rgba(0,0,0,0.25)] backdrop-blur-md"
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 35
                    }}
                  />
                )}

                {/* Content Container: Label placed strictly to the LEFT of the icon */}
                <div className="relative z-10 flex items-center">
                  <AnimatePresence initial={false} mode="wait">
                    {isActive && (
                      <motion.span
                        key={`label-${item.id}`}
                        initial={{ opacity: 0, width: 0, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, width: 'auto', filter: 'blur(0px)' }}
                        exit={{ opacity: 0, width: 0, filter: 'blur(4px)' }}
                        transition={{
                          width: { type: 'spring', stiffness: 450, damping: 35 },
                          opacity: { duration: 0.18, ease: 'easeOut' },
                          filter: { duration: 0.18 }
                        }}
                        className="overflow-hidden whitespace-nowrap text-xs sm:text-sm font-medium tracking-wide pr-2 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Outlined Icon for Premium Aesthetic */}
                  <motion.div
                    animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="flex items-center justify-center"
                  >
                    <Icon 
                      className={`w-[19px] h-[19px] sm:w-5 sm:h-5 transition-transform duration-200 stroke-[1.65] ${
                        isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : ''
                      }`} 
                    />
                  </motion.div>
                </div>

                {/* Subtle hover indicator when inactive */}
                {!isActive && (
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-white/[0.06] transition-opacity duration-200" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
