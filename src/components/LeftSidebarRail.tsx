import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, ChevronDown, PanelLeftClose, PanelLeft } from 'lucide-react';
import { lofiEngine } from '../utils/audioSynth';
import { soundEffects } from '../utils/uiSound';

interface LeftSidebarRailProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

// Organic silhouette profile of 24 bars (inspired by udaykiran.dev waveform contour)
const BASE_BAR_WIDTHS = [
  36, 48, 68, 52, 84, 96, 72, 88, 58, 98, 76, 90,
  52, 66, 82, 94, 62, 78, 90, 56, 72, 46, 60, 38
];

export const LeftSidebarRail: React.FC<LeftSidebarRailProps> = ({
  activeSection,
  onNavigate,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // References for scroll calculation and direct DOM manipulation
  const barsContainerRef = useRef<HTMLDivElement>(null);
  const barElementsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const scrollProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const velocityRef = useRef(0);
  const scrollDirectionRef = useRef<'down' | 'up' | 'idle'>('idle');
  const animFrameIdRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);

  // Sync ref with audio state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Update waveform bar visuals based on progress, velocity, and scroll direction
  const updateBars = useCallback((
    progress: number,
    velocity: number,
    direction: 'down' | 'up' | 'idle',
    audioActive: boolean
  ) => {
    const totalBars = BASE_BAR_WIDTHS.length;
    // Directional bias: when moving down, lead slightly forward; when moving up, lead backward
    const directionOffset = direction === 'down' ? velocity * 1.2 : direction === 'up' ? -velocity * 1.2 : 0;
    const activeIndex = Math.max(0, Math.min(totalBars - 1, (progress * (totalBars - 1)) + directionOffset));
    
    // Fast scroll broadens the active trail
    const trailSpread = 1.6 + Math.min(3.0, velocity * 4.5);
    const time = performance.now() * 0.003;

    barElementsRef.current.forEach((bar, idx) => {
      if (!bar) return;

      const dist = Math.abs(idx - activeIndex);
      const baseWidth = BASE_BAR_WIDTHS[idx];

      // Proximity intensity: 1 at active index, falls off smoothly with distance
      const proximity = Math.max(0, 1 - dist / trailSpread);
      const intensity = Math.pow(proximity, 1.6);

      // Subtle audio breathing only if audio is explicitly playing
      const audioPulse = audioActive ? Math.sin(time + idx * 0.45) * 0.12 * intensity : 0;

      // Calculate width & scale
      const scaleMultiplier = 1 + intensity * 0.24 + audioPulse;
      const opacity = 0.32 + intensity * 0.68;

      // Color transition: Inactive Muted Sage (#B8C2BC) -> Forest Green (#1E382B)
      let barBg = '#B8C2BC';
      if (intensity > 0.55) {
        barBg = '#1E382B'; // Peak active forest green
      } else if (intensity > 0.18) {
        barBg = '#3A6351'; // Mid active sage
      }

      bar.style.width = `${baseWidth}%`;
      bar.style.backgroundColor = barBg;
      bar.style.opacity = opacity.toFixed(2);
      bar.style.transform = `scaleX(${scaleMultiplier.toFixed(3)})`;
    });
  }, []);

  // Scroll listener and RAF physics loop
  useEffect(() => {
    const calculateProgress = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

      // Calculate instantaneous scroll velocity & direction
      const deltaY = scrollY - lastScrollYRef.current;
      lastScrollYRef.current = scrollY;

      if (deltaY > 1) {
        scrollDirectionRef.current = 'down';
      } else if (deltaY < -1) {
        scrollDirectionRef.current = 'up';
      }

      const absDelta = Math.abs(deltaY);
      velocityRef.current = Math.min(1, velocityRef.current * 0.4 + (absDelta / 100) * 0.6);

      scrollProgressRef.current = progress;
    };

    const handleScroll = () => {
      calculateProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateProgress();
    currentProgressRef.current = scrollProgressRef.current;

    // Smooth animation loop for trailing physics and audio breathing
    const animate = () => {
      if (reducedMotion) {
        currentProgressRef.current = scrollProgressRef.current;
        velocityRef.current = 0;
        scrollDirectionRef.current = 'idle';
      } else {
        // Responsive lerp toward target scroll progress
        const diff = scrollProgressRef.current - currentProgressRef.current;
        currentProgressRef.current += diff * 0.24;

        // Decay velocity
        velocityRef.current *= 0.88;
        if (velocityRef.current < 0.005) {
          velocityRef.current = 0;
          scrollDirectionRef.current = 'idle';
        }
      }

      updateBars(
        currentProgressRef.current,
        velocityRef.current,
        scrollDirectionRef.current,
        isPlayingRef.current
      );

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [updateBars, reducedMotion]);

  // Handle independent optional audio toggle
  const toggleAudio = () => {
    soundEffects.playClick();
    const playing = lofiEngine.toggle();
    setIsPlaying(playing);
  };

  const sections = [
    { id: 'hero', number: '01', label: 'Intro' },
    { id: 'work', number: '02', label: 'Selected Work' },
    { id: 'about', number: '03', label: 'About & Ethos' },
    { id: 'experience', number: '04', label: 'Experience & Contributions' },
    { id: 'skills', number: '05', label: 'Skills & Toolkit' },
    { id: 'services', number: '06', label: 'Capabilities' },
    { id: 'notes', number: '07', label: 'Build Notes' },
    { id: 'contact', number: '08', label: 'Contact' },
  ];

  if (isCollapsed) {
    return (
      <aside className="hidden lg:flex fixed left-3 top-24 z-40 flex-col items-center gap-2 p-2 bg-[#F8F6F0]/95 backdrop-blur-md border border-[#DDD7C9] rounded-2xl shadow-lg transition-all duration-300">
        <button
          onClick={onToggleCollapse}
          className="p-2 text-[#1E382B] hover:bg-[#EAE5DA] rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#1E382B] outline-none"
          title="Expand left aesthetic rail"
          aria-label="Expand sidebar rail"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        <button
          onClick={toggleAudio}
          className={`p-2 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#1E382B] outline-none ${
            isPlaying ? 'bg-[#1E382B] text-white' : 'text-[#626C65] hover:bg-[#EAE5DA]'
          }`}
          title={isPlaying ? "Pause ambient sound" : "Play ambient sound"}
          aria-label={isPlaying ? "Pause ambient sound" : "Play ambient sound"}
          aria-pressed={isPlaying}
        >
          {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </aside>
    );
  }

  return (
    <aside 
      className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[72px] xl:w-[80px] border-r border-[#E2DDD2]/80 bg-[#F7F4EB]/90 backdrop-blur-md z-30 flex-col items-center justify-between py-6 select-none transition-all duration-300 shadow-[1px_0_12px_rgba(0,0,0,0.02)]"
      aria-label="Interactive scroll and sound indicator"
    >
      {/* Top Section: Vertical Label + Interactive Scroll Waveform */}
      <div className="flex flex-col items-center gap-3 w-full px-2">
        {/* Collapse button */}
        {onToggleCollapse && (
          <button
            onClick={() => {
              soundEffects.playClick();
              onToggleCollapse();
            }}
            className="text-[#8F9892] hover:text-[#1E2522] p-1 rounded-md hover:bg-[#EAE5DA] transition-colors focus-visible:ring-2 focus-visible:ring-[#1E382B] outline-none"
            title="Collapse sidebar rail"
            aria-label="Collapse sidebar rail"
          >
            <PanelLeftClose className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Small vertical label: SCROLL / SOUND */}
        <span className="text-[9px] font-mono tracking-widest text-[#7C8780] uppercase font-semibold rotate-180 [writing-mode:vertical-rl]">
          SCROLL / SOUND
        </span>

        {/* Vertical Scroll Waveform Container (Uday Kiran inspired) */}
        <div 
          ref={barsContainerRef}
          className="flex flex-col items-center justify-center gap-[3px] w-7 py-2 my-1"
          aria-hidden="true"
        >
          {BASE_BAR_WIDTHS.map((width, i) => (
            <span
              key={i}
              ref={(el) => {
                barElementsRef.current[i] = el;
              }}
              className="h-[2px] rounded-full transition-[background-color,opacity] duration-100 ease-out origin-center"
              style={{
                width: `${width}%`,
                backgroundColor: '#B8C2BC',
                opacity: 0.35,
              }}
            />
          ))}
        </div>

        {/* Small Restrained Audio Control Button */}
        <button
          onClick={toggleAudio}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#1E382B] outline-none shadow-2xs ${
            isPlaying
              ? 'bg-[#1E382B] text-[#F8F6F0] hover:bg-[#2A4B3A]'
              : 'bg-[#EAE5DA] text-[#6A756E] hover:text-[#1E2522] hover:bg-[#DDD7C9]'
          }`}
          title={isPlaying ? "Pause ambient sound" : "Enable ambient sound"}
          aria-label={isPlaying ? "Pause ambient sound" : "Enable ambient sound"}
          aria-pressed={isPlaying}
        >
          {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Center Section Numbers & Vertical Spine */}
      <nav aria-label="Section navigation rail" className="relative flex flex-col items-center my-auto py-2">
        {/* Subtle vertical connector guide line */}
        <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-[1px] bg-[#DDD6C8] z-0" />

        <div className="relative z-10 flex flex-col items-center gap-1.5">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  soundEffects.playPop();
                  onNavigate(sec.id);
                }}
                className="group relative flex items-center justify-center p-1 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-[#1E382B] outline-none"
                aria-label={`Jump to section ${sec.label}`}
              >
                <span
                  className={`text-[10px] font-mono px-1 py-0.5 rounded transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1E382B] text-white font-bold scale-110 shadow-xs'
                      : 'text-[#818C85] bg-[#F7F4EB] hover:text-[#1E2522] hover:bg-[#EAE5DA]'
                  }`}
                >
                  {sec.number}
                </span>

                {/* Hover Tooltip */}
                <span className="pointer-events-none absolute left-full ml-3 px-2.5 py-1 bg-[#1E2522] text-[#F8F6F0] text-[10px] font-sans font-medium rounded-md opacity-0 group-hover:opacity-100 transition-all duration-150 whitespace-nowrap shadow-md z-50 transform -translate-x-1 group-hover:translate-x-0">
                  {sec.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Exploration Cue */}
      <div
        onClick={() => {
          soundEffects.playPop();
          onNavigate('work');
        }}
        className="cursor-pointer group flex flex-col items-center gap-1 text-[#78847D] hover:text-[#1E382B] transition-colors focus-visible:ring-2 focus-visible:ring-[#1E382B] outline-none p-1 rounded"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onNavigate('work');
          }
        }}
        aria-label="Scroll to Selected Work"
      >
        <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#1E382B]" />
        <span className="text-[8px] font-mono tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
          EXPLORE
        </span>
      </div>
    </aside>
  );
};
