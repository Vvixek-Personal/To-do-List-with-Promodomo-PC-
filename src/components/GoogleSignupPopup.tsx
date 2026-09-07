import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Cloud } from 'lucide-react';

interface GoogleSignupPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => Promise<void>;
}

export function GoogleSignupPopup({ isOpen, onClose, onSignIn }: GoogleSignupPopupProps) {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(3000); // 3 seconds
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setProgress(100);
      remainingTimeRef.current = 3000;
      return;
    }

    startTimeRef.current = Date.now();
    const duration = remainingTimeRef.current;

    const tick = () => {
      if (isPaused || isSigningIn) {
        startTimeRef.current = Date.now();
        animationFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = Date.now() - startTimeRef.current;
      const fraction = Math.max(0, 1 - elapsed / duration);
      setProgress(fraction * 100);

      if (fraction <= 0) {
        onClose();
      } else {
        animationFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen, isPaused, isSigningIn, onClose]);

  const handleSignInClick = async () => {
    try {
      setIsSigningIn(true);
      await onSignIn();
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="fixed top-5 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-md z-50 pointer-events-auto font-detail"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/90 bg-white/95 backdrop-blur-2xl p-5 shadow-[0_20px_50px_rgba(15,23,42,0.18),0_4px_12px_rgba(59,91,253,0.12),inset_0_1px_2px_rgba(255,255,255,0.95)]">
            
            {/* Top 3-Second Countdown Progress Bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#3b5bfd] via-[#6366f1] to-emerald-500 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Close Icon */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3.5 pr-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#3b5bfd] to-[#6366f1] flex items-center justify-center flex-shrink-0 text-white shadow-md shadow-blue-500/20">
                <Sparkles className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-header text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-50 text-[#3b5bfd] border border-blue-200/60">
                    3s Quick Prompt
                  </span>
                  <span className="font-detail text-[11px] font-medium text-slate-400">
                    Auto-closing
                  </span>
                </div>

                <h4 className="font-header text-sm font-bold text-[#0f172a] mt-1 tracking-tight">
                  Unlock More with Google Sign-in
                </h4>
                <p className="font-detail text-xs text-[#475569] mt-0.5 leading-relaxed">
                  Sign in to automatically sync your tasks and focus records across your laptop and devices.
                </p>

                <div className="mt-3.5 flex items-center gap-2.5">
                  <button
                    onClick={handleSignInClick}
                    disabled={isSigningIn}
                    className="font-header flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-xs font-bold text-[#0f172a] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.09)] transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {/* Google G Logo SVG */}
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>{isSigningIn ? 'Connecting...' : 'Sign in with Google'}</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="font-detail px-3 py-2.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
