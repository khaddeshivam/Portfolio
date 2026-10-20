import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, ChevronDown } from 'lucide-react';
import { lofiEngine } from '../utils/audioSynth';

interface LeftSidebarRailProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const LeftSidebarRail: React.FC<LeftSidebarRailProps> = ({ activeSection, onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [waveformBars, setWaveformBars] = useState<number[]>([]);

  useEffect(() => {
    // Generate initial wave heights
    const bars = [30, 65, 45, 80, 50, 95, 40, 70, 60, 85, 35, 75, 55, 90, 45, 60, 30, 50, 70, 40, 80, 60, 35];
    setWaveformBars(bars);

    let animationInterval: number;
    if (isPlaying) {
      animationInterval = window.setInterval(() => {
        setWaveformBars(prev =>
          prev.map(h => Math.min(100, Math.max(20, Math.floor(h + (Math.random() - 0.5) * 35))))
        );
      }, 180);
    }

    return () => {
      if (animationInterval) clearInterval(animationInterval);
    };
  }, [isPlaying]);

  const toggleAudio = () => {
    const playing = lofiEngine.toggle();
    setIsPlaying(playing);
  };

  const toggleMute = () => {
    if (isMuted) {
      lofiEngine.setVolume(0.25);
      setIsMuted(false);
    } else {
      lofiEngine.setVolume(0);
      setIsMuted(true);
    }
  };

  const sections = [
    { id: 'hero', number: '01', label: 'Intro' },
    { id: 'work', number: '02', label: 'Work' },
    { id: 'about', number: '03', label: 'About' },
    { id: 'experience', number: '04', label: 'Journey' },
    { id: 'skills', number: '05', label: 'Toolkit' },
    { id: 'services', number: '06', label: 'Services' },
    { id: 'notes', number: '07', label: 'Notes' },
    { id: 'contact', number: '08', label: 'Contact' },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-20 xl:w-24 border-r border-[#E5E0D5] bg-[#F5F2EB]/90 backdrop-blur-md z-40 flex-col items-center justify-between py-6 select-none">
      {/* Top Sound & Waveform */}
      <div className="flex flex-col items-center gap-3 w-full px-2">
        <span className="text-[10px] font-mono tracking-widest text-[#7C847E] uppercase rotate-180 [writing-mode:vertical-rl]">
          SCROLL / SOUND
        </span>

        {/* Waveform graphic */}
        <div 
          onClick={toggleAudio}
          title={isPlaying ? "Click to pause ambient lofi" : "Click to play ambient lofi"}
          className="cursor-pointer group flex flex-col items-center justify-center p-2 rounded-lg hover:bg-[#EAE5DA] transition-colors"
        >
          <div className="flex flex-col items-center justify-center gap-[2px] w-6 h-28 py-1">
            {waveformBars.slice(0, 19).map((height, i) => (
              <span
                key={i}
                className={`w-full transition-all duration-150 rounded-full ${
                  isPlaying 
                    ? 'bg-[#1E382B]' 
                    : 'bg-[#9DA49E] group-hover:bg-[#1E382B]'
                }`}
                style={{
                  height: isPlaying ? '2px' : '1.5px',
                  width: `${isPlaying ? height : Math.sin(i * 0.4) * 40 + 50}%`,
                  opacity: isPlaying ? 0.9 : 0.4
                }}
              />
            ))}
          </div>

          <button 
            type="button"
            className="mt-2 w-7 h-7 rounded-full bg-[#E5E0D5] flex items-center justify-center text-[#1E382B] group-hover:bg-[#1E382B] group-hover:text-[#F8F6F0] transition-colors shadow-xs"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
        </div>

        {/* Track Label */}
        <div className="text-center px-1">
          <p className="text-[9px] font-mono uppercase tracking-wider text-[#8A928C]">NOW PLAYING</p>
          <p className="text-[10px] font-medium text-[#1E2522] leading-tight truncate max-w-[70px]">Chasing Better Days</p>
          <p className="text-[9px] text-[#7C847E]">Lofi Study</p>
          {isPlaying && (
            <button 
              onClick={toggleMute}
              className="mt-1 text-[#7C847E] hover:text-[#1E382B] transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3 h-3 mx-auto" /> : <Volume2 className="w-3 h-3 mx-auto" />}
            </button>
          )}
        </div>
      </div>

      {/* Center Section Numbers */}
      <nav aria-label="Quick section navigation" className="flex flex-col items-center gap-1.5 my-auto">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onNavigate(sec.id)}
              className="group relative flex items-center justify-center p-1"
              aria-label={`Jump to section ${sec.label}`}
            >
              <span
                className={`text-[11px] font-mono transition-colors ${
                  isActive
                    ? 'font-bold text-[#1E382B] scale-110'
                    : 'text-[#8A928C] hover:text-[#1E2522]'
                }`}
              >
                {sec.number}
              </span>
              {/* Tooltip on hover */}
              <span className="pointer-events-none absolute left-full ml-3 px-2 py-0.5 bg-[#1E2522] text-[#F8F6F0] text-[10px] font-sans rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md z-50">
                {sec.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Explore Cue */}
      <div 
        onClick={() => onNavigate('work')}
        className="cursor-pointer group flex flex-col items-center gap-1.5 text-center text-[#7C847E] hover:text-[#1E382B] transition-colors"
      >
        <ChevronDown className="w-4 h-4 animate-bounce text-[#1E382B]" />
        <span className="text-[8px] font-mono tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
          LET'S EXPLORE
        </span>
      </div>
    </aside>
  );
};
