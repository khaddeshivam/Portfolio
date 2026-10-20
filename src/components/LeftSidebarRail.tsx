import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, ChevronDown, SkipForward, Music2, Bell, BellOff, PanelLeftClose, PanelLeft } from 'lucide-react';
import { lofiEngine, LOFI_TRACKS, LofiTrack } from '../utils/audioSynth';
import { soundEffects } from '../utils/uiSound';

interface LeftSidebarRailProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const LeftSidebarRail: React.FC<LeftSidebarRailProps> = ({
  activeSection,
  onNavigate,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<LofiTrack>(lofiEngine.getCurrentTrack());
  const [isMuted, setIsMuted] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(soundEffects.enabled);
  const [waveformBars, setWaveformBars] = useState<number[]>([]);
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    // Generate organic initial waveform bars
    const baseWave = [35, 70, 48, 85, 52, 92, 40, 75, 62, 88, 42, 78, 58, 94, 48, 64, 32, 55, 72, 44, 82, 60, 38];
    setWaveformBars(baseWave);

    const unsubscribe = lofiEngine.onTrackChange((track) => {
      setCurrentTrack(track);
    });

    let animationInterval: number;
    if (isPlaying) {
      animationInterval = window.setInterval(() => {
        setWaveformBars(prev =>
          prev.map((h, i) => {
            const time = Date.now() * 0.005;
            const variance = Math.sin(time + i * 0.45) * 35;
            return Math.min(100, Math.max(18, Math.floor(h * 0.6 + (50 + variance) * 0.4)));
          })
        );
      }, 120);
    }

    return () => {
      unsubscribe();
      if (animationInterval) clearInterval(animationInterval);
    };
  }, [isPlaying]);

  const toggleAudio = () => {
    soundEffects.playClick();
    const playing = lofiEngine.toggle();
    setIsPlaying(playing);
  };

  const handleNextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playPop();
    const next = lofiEngine.nextTrack();
    setCurrentTrack(next);
  };

  const toggleMute = () => {
    soundEffects.playClick();
    if (isMuted) {
      lofiEngine.setVolume(volume);
      setIsMuted(false);
    } else {
      lofiEngine.setVolume(0);
      setIsMuted(true);
    }
  };

  const toggleSfx = () => {
    soundEffects.enabled = !sfxEnabled;
    setSfxEnabled(!sfxEnabled);
    if (!sfxEnabled) soundEffects.playSuccess();
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (!isMuted) {
      lofiEngine.setVolume(newVol);
    }
  };

  const sections = [
    { id: 'hero', number: '01', label: 'Intro' },
    { id: 'work', number: '02', label: 'Selected Work' },
    { id: 'craft-lab', number: '03', label: 'Craft Lab' },
    { id: 'about', number: '04', label: 'About & Ethos' },
    { id: 'experience', number: '05', label: 'Journey' },
    { id: 'skills', number: '06', label: 'Skills' },
    { id: 'services', number: '07', label: 'Capabilities' },
    { id: 'notes', number: '08', label: 'Build Notes' },
    { id: 'contact', number: '09', label: 'Contact' },
  ];

  if (isCollapsed) {
    return (
      <aside className="hidden lg:flex fixed left-3 top-24 z-40 flex-col items-center gap-2 p-2 bg-[#F8F6F0]/95 backdrop-blur-md border border-[#DDD7C9] rounded-2xl shadow-lg transition-all duration-300">
        <button
          onClick={onToggleCollapse}
          className="p-2 text-[#1E382B] hover:bg-[#EAE5DA] rounded-xl transition-colors"
          title="Expand aesthetic rail"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        <button
          onClick={toggleAudio}
          className={`p-2 rounded-xl transition-colors ${isPlaying ? 'bg-[#1E382B] text-white' : 'text-[#626C65] hover:bg-[#EAE5DA]'}`}
          title={isPlaying ? "Pause lofi music" : "Play lofi music"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </aside>
    );
  }

  return (
    <aside 
      className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[76px] xl:w-[84px] border-r border-[#E2DDD2] bg-[#F7F4EB]/95 backdrop-blur-md z-40 flex-col items-center justify-between py-5 select-none transition-all duration-300 shadow-[1px_0_12px_rgba(0,0,0,0.02)]"
      aria-label="Soundscape and section track"
    >
      {/* Top Section: SCROLL / SOUND + Interactive Waveform */}
      <div className="flex flex-col items-center gap-2.5 w-full px-2">
        {/* Collapse button */}
        {onToggleCollapse && (
          <button
            onClick={() => {
              soundEffects.playClick();
              onToggleCollapse();
            }}
            className="text-[#8F9892] hover:text-[#1E2522] p-1 rounded-md hover:bg-[#EAE5DA] transition-colors"
            title="Collapse sidebar"
          >
            <PanelLeftClose className="w-3.5 h-3.5" />
          </button>
        )}

        <span className="text-[9px] font-mono tracking-widest text-[#7C8780] uppercase font-semibold rotate-180 [writing-mode:vertical-rl]">
          SCROLL / SOUND
        </span>

        {/* Waveform Card */}
        <div
          onClick={toggleAudio}
          title={isPlaying ? "Pause ambient lofi" : "Play ambient lofi"}
          className="cursor-pointer group flex flex-col items-center justify-center p-2 rounded-xl hover:bg-[#EAE5DA]/80 transition-all active:scale-95"
        >
          {/* Vertical Waveform bars */}
          <div className="flex flex-col items-center justify-center gap-[2.5px] w-6 h-28 py-1">
            {waveformBars.slice(0, 20).map((height, i) => (
              <span
                key={i}
                className={`transition-all duration-150 rounded-full ${
                  isPlaying 
                    ? 'bg-[#1E382B]' 
                    : 'bg-[#9BA39D] group-hover:bg-[#1E382B]'
                }`}
                style={{
                  height: isPlaying ? '2px' : '1.5px',
                  width: `${isPlaying ? height : Math.sin(i * 0.4) * 45 + 45}%`,
                  opacity: isPlaying ? 0.95 : 0.35,
                  transform: isPlaying ? `scaleX(${height / 80})` : 'none'
                }}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <div className="mt-2 w-7 h-7 rounded-full bg-[#E5DFD4] group-hover:bg-[#1E382B] group-hover:text-white text-[#1E382B] flex items-center justify-center transition-all shadow-xs">
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 ml-0.5" />
            )}
          </div>
        </div>

        {/* Track Info & Next Switcher */}
        <div className="text-center px-1 w-full space-y-0.5">
          <p className="text-[8px] font-mono uppercase tracking-widest text-[#8F9892]">
            NOW PLAYING
          </p>
          <p className="text-[10px] font-semibold text-[#1E2522] leading-tight truncate max-w-[70px]">
            {currentTrack.title}
          </p>
          <p className="text-[9px] text-[#707B75] truncate max-w-[70px]">
            {currentTrack.mood}
          </p>

          <div className="flex items-center justify-center gap-1.5 pt-1 text-[#7A857F]">
            <button
              onClick={handleNextTrack}
              className="p-1 hover:text-[#1E382B] hover:bg-[#EAE5DA] rounded transition-colors"
              title="Switch to next lofi track"
            >
              <SkipForward className="w-3 h-3" />
            </button>
            <button
              onClick={toggleMute}
              className="p-1 hover:text-[#1E382B] hover:bg-[#EAE5DA] rounded transition-colors"
              title={isMuted ? "Unmute lofi" : "Mute lofi"}
            >
              {isMuted ? <VolumeX className="w-3 h-3 text-[#D97746]" /> : <Volume2 className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>

      {/* Center Section Numbers & Vertical Spine */}
      <nav aria-label="Section navigation rail" className="relative flex flex-col items-center my-auto py-2">
        {/* Subtle vertical connector guide line */}
        <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-[1px] bg-[#DDD6C8] z-0" />

        <div className="relative z-10 flex flex-col items-center gap-2">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  soundEffects.playPop();
                  onNavigate(sec.id);
                }}
                className="group relative flex items-center justify-center p-1 rounded-full transition-all focus:outline-none"
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

      {/* Bottom Exploration Cue + UI Sound Toggle */}
      <div className="flex flex-col items-center gap-2 text-center">
        {/* UI Sound microinteraction toggle */}
        <button
          onClick={toggleSfx}
          className={`p-1.5 rounded-lg text-[9px] font-mono flex items-center gap-1 transition-colors ${
            sfxEnabled ? 'text-[#3A6351] hover:bg-[#EAE5DA]' : 'text-[#9AA39C] hover:bg-[#EAE5DA]'
          }`}
          title={sfxEnabled ? "UI sound effects on (click to mute SFX)" : "UI sound effects muted"}
        >
          {sfxEnabled ? <Bell className="w-3 h-3 text-[#3A6351]" /> : <BellOff className="w-3 h-3" />}
        </button>

        <div
          onClick={() => {
            soundEffects.playPop();
            onNavigate('work');
          }}
          className="cursor-pointer group flex flex-col items-center gap-1 text-[#78847D] hover:text-[#1E382B] transition-colors"
        >
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#1E382B]" />
          <span className="text-[8px] font-mono tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
            EXPLORE
          </span>
        </div>
      </div>
    </aside>
  );
};
