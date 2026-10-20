import React, { useState, useEffect } from 'react';
import { Terminal, FileText, Mail, ArrowUp, Volume2, VolumeX } from 'lucide-react';
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

  useEffect(() => {
    const handleAudioChange = (playing: boolean) => {
      setIsPlayingAudio(playing);
    };

    lofiEngine.addListener(handleAudioChange);
    setIsPlayingAudio(lofiEngine.getIsPlaying());

    const handleScroll = () => {
      // Show dock after scrolling past the hero fold (200px)
      if (window.scrollY > 200) {
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
    soundEffects.playClick();
    lofiEngine.toggle();
  };

  const dockItems = [
    {
      id: 'command',
      label: 'Command (⌘K)',
      icon: <Terminal className="w-4 h-4" />,
      onClick: () => {
        soundEffects.playPop();
        onOpenCommand();
      },
    },
    {
      id: 'resume',
      label: 'Resume / CV',
      icon: <FileText className="w-4 h-4" />,
      onClick: () => {
        soundEffects.playClick();
        onOpenResume();
      },
    },
    {
      id: 'sound',
      label: isPlayingAudio ? 'Mute Ambient' : 'Play Ambient',
      icon: isPlayingAudio ? <Volume2 className="w-4 h-4 text-[#3A6351] animate-pulse" /> : <VolumeX className="w-4 h-4 text-[#8E9B93]" />,
      onClick: toggleSound,
    },
    {
      id: 'contact',
      label: "Let's Talk",
      icon: <Mail className="w-4 h-4" />,
      onClick: () => {
        soundEffects.playClick();
        onOpenContact();
      },
    },
    {
      id: 'top',
      label: 'Back to Top',
      icon: <ArrowUp className="w-4 h-4" />,
      onClick: () => {
        soundEffects.playClick();
        onScrollToTop();
      },
    },
  ];

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ease-out pointer-events-auto ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'
      }`}
      role="toolbar"
      aria-label="Quick shortcut dock"
    >
      <div className="relative flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-[#FAF7F2]/85 backdrop-blur-md border border-[#DCD5C5] shadow-lg shadow-[#1E2522]/5">
        {dockItems.map((item) => (
          <div key={item.id} className="relative group">
            <button
              onClick={item.onClick}
              onMouseEnter={() => setHoveredButton(item.id)}
              onMouseLeave={() => setHoveredButton(null)}
              className="p-2 sm:px-3 sm:py-2 text-[#4A554E] hover:text-[#1E2522] hover:bg-[#EAE4D6]/70 rounded-full transition-all duration-200 flex items-center justify-center relative focus:outline-none focus:ring-1 focus:ring-[#1E382B]"
              aria-label={item.label}
            >
              {item.icon}
            </button>

            {/* Tooltip */}
            {hoveredButton === item.id && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[11px] font-mono whitespace-nowrap bg-[#1E2522] text-[#F3EFE6] rounded-md shadow-md pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                {item.label}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#1E2522]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
