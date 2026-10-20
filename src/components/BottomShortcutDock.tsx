import React, { useState, useEffect } from 'react';
import { lofiEngine } from '../utils/audioSynth';
import { soundEffects } from '../utils/uiSound';

interface BottomShortcutDockProps {
  onOpenCommand: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
  onScrollToTop: () => void;
}

export const BottomShortcutDock: React.FC<BottomShortcutDockProps> = ({
  onOpenCommand,
  onOpenResume,
  onOpenContact,
  onScrollToTop,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  // Navigator vibration haptic trigger for tactile mobile feel
  const triggerHaptic = (pattern: number | number[] = 14) => {
    try {
      if (typeof window !== 'undefined' && 'navigator' in window && typeof navigator.vibrate === 'function') {
        navigator.vibrate(pattern);
      }
    } catch {
      // Graceful fallback for browsers/platforms with restricted vibration
    }
  };

  useEffect(() => {
    const handleAudioChange = (playing: boolean) => {
      setIsPlayingAudio(playing);
    };

    lofiEngine.addListener(handleAudioChange);
    setIsPlayingAudio(lofiEngine.getIsPlaying());

    const handleScroll = () => {
      // Reveal dock smoothly once visitor scrolls past initial view (120px for responsive mobile/desktop feel)
      if (window.scrollY > 120) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      lofiEngine.removeListener(handleAudioChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSound = () => {
    triggerHaptic([14, 25, 10]);
    soundEffects.playClick();
    lofiEngine.toggle();
  };

  // Minimalist, custom graphical icons with uniform 1.7 stroke weight & forest-green palette
  const primaryDockItems = [
    {
      id: 'github',
      label: 'GitHub',
      sublabel: 'khaddeshivam',
      isLink: true,
      href: 'https://github.com/shivamkhadde',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-[#1E382B] group-hover:text-[#0E1E16] transition-colors"
          aria-hidden="true"
        >
          <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2 5.4 2.3 5.4 2.3a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 8.7c0 4.6 2.7 5.7 5.5 6-.4.4-.6 1-.5 2V21" />
        </svg>
      ),
      action: () => {
        triggerHaptic(14);
        soundEffects.playClick();
      },
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      sublabel: 'Profile',
      isLink: true,
      href: 'https://linkedin.com/in/shivamkhadde',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-[#1E382B] group-hover:text-[#0E1E16] transition-colors"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M8 11v6" />
          <path d="M8 7.5v.01" />
          <path d="M12 17v-3.5a2.5 2.5 0 0 1 5 0V17" />
          <path d="M12 13.5V17" />
        </svg>
      ),
      action: () => {
        triggerHaptic(14);
        soundEffects.playClick();
      },
    },
    {
      id: 'resume',
      label: 'Résumé / CV',
      sublabel: 'PDF View',
      isLink: false,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-[#1E382B] group-hover:text-[#0E1E16] transition-colors"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      ),
      action: () => {
        triggerHaptic(14);
        soundEffects.playClick();
        onOpenResume();
      },
    },
    {
      id: 'email',
      label: 'Email',
      sublabel: "Let's Talk",
      isLink: false,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-[#1E382B] group-hover:text-[#0E1E16] transition-colors"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m3 7 8.35 5.57a1.2 1.2 0 0 0 1.3 0L21 7" />
        </svg>
      ),
      action: () => {
        triggerHaptic(14);
        soundEffects.playClick();
        onOpenContact();
      },
    },
    {
      id: 'command',
      label: 'Command',
      sublabel: '⌘K',
      isLink: false,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-[#1E382B] group-hover:text-[#0E1E16] transition-colors"
          aria-hidden="true"
        >
          <path d="M18 9a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12z" />
        </svg>
      ),
      action: () => {
        triggerHaptic([12, 30, 14]);
        soundEffects.playPop();
        onOpenCommand();
      },
    },
  ];

  const utilityDockItems = [
    {
      id: 'sound',
      label: isPlayingAudio ? 'Mute Ambient' : 'Play Ambient',
      sublabel: isPlayingAudio ? 'Active' : 'Lofi Chords',
      icon: isPlayingAudio ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5 text-[#2A523E] animate-pulse"
          aria-hidden="true"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5 text-[#5C7063] group-hover:text-[#1E382B] transition-colors"
          aria-hidden="true"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ),
      action: toggleSound,
    },
    {
      id: 'top',
      label: 'Back to Top',
      sublabel: 'Scroll',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5 text-[#5C7063] group-hover:text-[#1E382B] transition-colors"
          aria-hidden="true"
        >
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      ),
      action: () => {
        triggerHaptic([10, 25, 10]);
        soundEffects.playClick();
        onScrollToTop();
      },
    },
  ];

  return (
    <div
      className={`bottom-shortcut-dock fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[calc(100vw-1.25rem)] xs:max-w-[calc(100vw-1.5rem)] sm:max-w-max transition-all duration-300 ease-out pointer-events-auto select-none touch-manipulation ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
      }`}
      style={{
        marginBottom: 'max(0px, env(safe-area-inset-bottom, 0px))',
      }}
      role="toolbar"
      aria-label="Quick shortcut dock"
    >
      {/* High-craft Mac-inspired glass dock container */}
      <div className="mac-glass-dock relative flex items-center justify-center gap-0.5 xs:gap-1 sm:gap-1.5 p-1 xs:p-1.5 sm:p-2 rounded-2xl sm:rounded-[22px] border border-white/90 ring-1 ring-[#1E382B]/10">
        
        {/* Subtle top specular sheen reflection line */}
        <div className="absolute top-0 inset-x-4 sm:inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none opacity-90" />

        {/* Subtle bottom reflection shelf line */}
        <div className="absolute bottom-0 inset-x-6 sm:inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none opacity-70" />

        {/* Primary custom graphical icons (GitHub, LinkedIn, Resume, Email, Command Palette) */}
        {primaryDockItems.map((item) => {
          const content = (
            <>
              {item.icon}
              {/* macOS indicator dot underneath on hover (desktop only to prevent mobile clutter) */}
              <span className="hidden sm:block w-1 h-1 rounded-full bg-[#1E382B] opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-0.5 shadow-[0_0_4px_rgba(30,56,43,0.3)]" />
            </>
          );

          const buttonClass =
            'w-8.5 h-8.5 xs:w-9.5 xs:h-9.5 sm:w-11 sm:h-11 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ease-out sm:hover:-translate-y-1.5 sm:hover:scale-105 active:scale-90 active:bg-[#1E382B]/10 sm:hover:bg-[#E4ECE7]/90 sm:hover:shadow-[0_4px_12px_rgba(30,56,43,0.12),inset_0_1px_1px_rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-[#1E382B]/30';

          return (
            <div key={item.id} className="relative group flex-shrink-0">
              {item.isLink ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={item.action}
                  onTouchStart={() => triggerHaptic(12)}
                  onMouseEnter={() => setHoveredButton(item.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                  className={buttonClass}
                  aria-label={item.label}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={item.action}
                  onTouchStart={() => triggerHaptic(12)}
                  onMouseEnter={() => setHoveredButton(item.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                  className={buttonClass}
                  aria-label={item.label}
                >
                  {content}
                </button>
              )}

              {/* High-craft Floating Tooltip (Desktop only - prevents sticky tooltips on mobile taps) */}
              {hoveredButton === item.id && (
                <div className="hidden sm:flex absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2.5 py-1 bg-[#17261F]/95 text-[#F4F1EA] backdrop-blur-md rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.2)] border border-white/10 pointer-events-none animate-in fade-in zoom-in-95 duration-150 flex-col items-center whitespace-nowrap z-50">
                  <span className="text-[11px] font-mono font-medium tracking-tight">
                    {item.label}
                  </span>
                  {item.sublabel && (
                    <span className="text-[9px] font-mono text-[#A8BDB1]">
                      {item.sublabel}
                    </span>
                  )}
                  {/* Tooltip caret */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#17261F]/95" />
                </div>
              )}
            </div>
          );
        })}

        {/* Mac-style subtle vertical divider */}
        <div className="h-5 sm:h-6 w-px bg-[#D6CEBF]/70 mx-0.5 sm:mx-1 flex-shrink-0 self-center" />

        {/* Utility controls (Ambient Sound & Back to Top) */}
        {utilityDockItems.map((item) => (
          <div key={item.id} className="relative group flex-shrink-0">
            <button
              type="button"
              onClick={item.action}
              onTouchStart={() => triggerHaptic(12)}
              onMouseEnter={() => setHoveredButton(item.id)}
              onMouseLeave={() => setHoveredButton(null)}
              className="w-8 h-8 xs:w-8.5 xs:h-8.5 sm:w-10 sm:h-10 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ease-out sm:hover:-translate-y-1 sm:hover:scale-105 active:scale-90 active:bg-[#1E382B]/10 sm:hover:bg-[#E4ECE7]/90 focus:outline-none focus:ring-2 focus:ring-[#1E382B]/30"
              aria-label={item.label}
            >
              {item.icon}
              <span className="hidden sm:block w-1 h-1 rounded-full bg-[#1E382B] opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-0.5 shadow-[0_0_4px_rgba(30,56,43,0.3)]" />
            </button>

            {/* High-craft Floating Tooltip (Desktop only) */}
            {hoveredButton === item.id && (
              <div className="hidden sm:flex absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2.5 py-1 bg-[#17261F]/95 text-[#F4F1EA] backdrop-blur-md rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.2)] border border-white/10 pointer-events-none animate-in fade-in zoom-in-95 duration-150 flex-col items-center whitespace-nowrap z-50">
                <span className="text-[11px] font-mono font-medium tracking-tight">
                  {item.label}
                </span>
                {item.sublabel && (
                  <span className="text-[9px] font-mono text-[#A8BDB1]">
                    {item.sublabel}
                  </span>
                )}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#17261F]/95" />
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
};
