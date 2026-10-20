import React, { useState, useEffect } from 'react';
import { Search, Sparkles, FileText, Music, Mail, ExternalLink, Terminal, ArrowRight, X } from 'lucide-react';
import { lofiEngine } from '../utils/audioSynth';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenPromptStudio: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenResume,
  onOpenContact,
  onOpenPromptStudio
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'prompt-studio',
      title: 'Open Gemini Studio Prompt Blueprint',
      category: 'Prompt Studio',
      icon: <Sparkles className="w-4 h-4 text-[#D97746]" />,
      action: () => {
        onOpenPromptStudio();
        onClose();
      }
    },
    {
      id: 'resume',
      title: 'View & Download Résumé / CV',
      category: 'Profile',
      icon: <FileText className="w-4 h-4 text-[#1E382B]" />,
      action: () => {
        onOpenResume();
        onClose();
      }
    },
    {
      id: 'music-toggle',
      title: 'Toggle Ambient Lofi Music (Chasing Better Days)',
      category: 'Audio',
      icon: <Music className="w-4 h-4 text-[#3A6351]" />,
      action: () => {
        lofiEngine.toggle();
        onClose();
      }
    },
    {
      id: 'contact',
      title: 'Send an Inquiry / Discuss a Project',
      category: 'Contact',
      icon: <Mail className="w-4 h-4 text-[#D97746]" />,
      action: () => {
        onOpenContact();
        onClose();
      }
    },
    {
      id: 'sec-work',
      title: 'Jump to Selected Work (Projects)',
      category: 'Navigation',
      icon: <Terminal className="w-4 h-4 text-[#1E382B]" />,
      action: () => {
        onNavigate('work');
        onClose();
      }
    },
    {
      id: 'sec-about',
      title: 'Jump to About & Engineering Ethos',
      category: 'Navigation',
      icon: <Terminal className="w-4 h-4 text-[#1E382B]" />,
      action: () => {
        onNavigate('about');
        onClose();
      }
    },
    {
      id: 'sec-experience',
      title: 'Jump to Experience & Contributions',
      category: 'Navigation',
      icon: <Terminal className="w-4 h-4 text-[#1E382B]" />,
      action: () => {
        onNavigate('experience');
        onClose();
      }
    },
    {
      id: 'sec-services',
      title: 'Jump to Services & Capabilities',
      category: 'Navigation',
      icon: <Terminal className="w-4 h-4 text-[#1E382B]" />,
      action: () => {
        onNavigate('services');
        onClose();
      }
    },
    {
      id: 'sec-notes',
      title: 'Jump to Build Notes (Technical Essays)',
      category: 'Navigation',
      icon: <Terminal className="w-4 h-4 text-[#1E382B]" />,
      action: () => {
        onNavigate('notes');
        onClose();
      }
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-[#FBF9F5] rounded-2xl border border-[#DDD7C9] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="px-4 py-3 bg-white border-b border-[#E5E0D5] flex items-center gap-3">
          <Search className="w-4 h-4 text-[#7A867F]" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search sections... (ESC to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-xs sm:text-sm bg-transparent border-none outline-none text-[#1E2522] placeholder:text-[#8D9791]"
          />
          <button onClick={onClose} className="p-1 text-[#7A867F] hover:text-[#1E2522]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-72 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#7A867F]">
              No commands found matching "{query}"
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full p-2.5 rounded-xl hover:bg-[#EFECE5] text-left flex items-center justify-between text-xs transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-white border border-[#DDD7C9]">
                    {item.icon}
                  </div>
                  <div>
                    <span className="font-semibold text-[#1E2522] group-hover:text-[#1E382B] block">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#7A867F]">
                      {item.category}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#7A867F] group-hover:translate-x-1 group-hover:text-[#1E382B] transition-all" />
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 bg-[#F5F2EA] border-t border-[#E5E0D5] flex items-center justify-between text-[10px] font-mono text-[#7A867F]">
          <span>Use ⌘K to trigger anytime</span>
          <span>Considered Craft Studio</span>
        </div>
      </div>
    </div>
  );
};
