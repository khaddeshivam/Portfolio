import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles, Code2, Menu, X, Clock, Sun, Moon } from 'lucide-react';
import { portfolioProfile } from '../data/portfolioData';
import { soundEffects } from '../utils/uiSound';

interface TopNavProps {
  currentView: 'portfolio' | 'blueprint';
  onViewChange: (view: 'portfolio' | 'blueprint') => void;
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentView,
  onViewChange,
  onNavigate,
  onOpenContact
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [puneTime, setPuneTime] = useState('');
  const [isDaytime, setIsDaytime] = useState(true);

  // Live Pune Time Clock (Asia/Kolkata GMT+5:30)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        };
        const formatter = new Intl.DateTimeFormat([], options);
        setPuneTime(formatter.format(now));

        // Get Pune hour to show sun/moon
        const hourFormatter = new Intl.DateTimeFormat([], { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false });
        const hour = parseInt(hourFormatter.format(now), 10);
        setIsDaytime(hour >= 6 && hour < 18);
      } catch {
        setPuneTime('Pune, IN (IST)');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection for dynamic glassmorphic elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'craft-lab', label: 'Lab' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'notes', label: 'Notes' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F8F6F0]/75 backdrop-blur-xl shadow-[0_4px_24px_-2px_rgba(30,56,43,0.06)] border-b border-white/60'
          : 'bg-[#F8F6F0]/65 backdrop-blur-md border-b border-[#E2DDD2]/50'
      }`}
      style={{
        boxShadow: isScrolled
          ? '0 10px 30px -10px rgba(0, 0, 0, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 0 rgba(0, 0, 0, 0.03)'
          : 'inset 0 1px 0 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 0 rgba(0, 0, 0, 0.02)',
      }}
    >
      {/* Subtle top border-light refraction line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Single element brand mark + Live Pune Clock */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => {
              soundEffects.playPop();
              onNavigate('hero');
            }}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1E382B] text-[#F8F6F0] flex items-center justify-center font-mono text-xs font-semibold shadow-xs group-hover:bg-[#2D4A3E] group-hover:scale-105 active:scale-95 transition-all">
              SK
            </div>
            <div>
              <span className="block text-sm font-semibold text-[#1E2522] tracking-tight whitespace-nowrap group-hover:text-[#1E382B] transition-colors">
                {portfolioProfile.name}
              </span>
              <span className="block text-[11px] text-[#78847D] font-medium whitespace-nowrap">
                {portfolioProfile.role}
              </span>
            </div>
          </button>

          {/* Live Pune IST clock widget (ashutoshx7.me style) */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-[#EFEBE2] border border-[#DDD7C9] rounded-full text-[11px] font-mono text-[#525D56] shadow-2xs">
            {isDaytime ? (
              <Sun className="w-3 h-3 text-[#D97746] animate-spin-slow" />
            ) : (
              <Moon className="w-3 h-3 text-[#4A6B82]" />
            )}
            <span className="text-[#3A6351] font-semibold">PUNE:</span>
            <span className="tabular-nums font-medium">{puneTime}</span>
          </div>
        </div>

        {/* Zone 2: 4-5 single-line nav links with tactile click sound */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57615B]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                soundEffects.playClick();
                onNavigate(link.id);
              }}
              className="hover:text-[#1E382B] transition-colors whitespace-nowrap shrink-0 relative py-1 hover:-translate-y-0.5 active:translate-y-0 text-xs font-semibold tracking-wide uppercase font-mono after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1E382B] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action + Vibe Prompt Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Status Dot */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#4A554E] px-2.5 py-1 bg-[#EBE7DE] rounded-full border border-[#DDD7C9]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3A6351] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3A6351]"></span>
            </span>
            <span className="text-[11px]">Open to roles</span>
          </div>

          {/* Blueprint Mode Switcher */}
          <div className="p-1 bg-[#E8E3D8] rounded-xl flex items-center gap-1 text-xs font-medium">
            <button
              onClick={() => {
                soundEffects.playPop();
                onViewChange('portfolio');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 active:scale-95 ${
                currentView === 'portfolio'
                  ? 'bg-white text-[#1E2522] shadow-xs font-semibold'
                  : 'text-[#626C65] hover:text-[#1E2522]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-[#1E382B]" />
              <span className="hidden sm:inline">Portfolio</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playPop();
                onViewChange('blueprint');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 active:scale-95 ${
                currentView === 'blueprint'
                  ? 'bg-[#1E382B] text-white shadow-xs font-semibold'
                  : 'text-[#626C65] hover:text-[#1E2522]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D97746]" />
              <span>Prompt Studio</span>
            </button>
          </div>

          {/* Primary Let's Talk CTA */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenContact();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#F8F6F0] bg-[#1E382B] rounded-xl hover:bg-[#2A4B3A] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all whitespace-nowrap shadow-xs"
          >
            <span>Let's talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-lg text-[#1E2522] hover:bg-[#E8E3D8]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with matching glassmorphism */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/60 bg-[#F8F6F0]/85 backdrop-blur-xl px-4 py-4 space-y-2 animate-in slide-in-from-top-2 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8E3D8]/70 text-xs font-mono text-[#525D56]">
            <span>PUNE, INDIA: {puneTime}</span>
            <span className="text-[#3A6351] font-semibold">● Available</span>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                soundEffects.playClick();
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-[#2E3531] hover:bg-[#EAE5DA]/80 rounded-md font-mono transition-colors"
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenContact();
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#F8F6F0] bg-[#1E382B] rounded-xl shadow-xs active:scale-95 transition-all"
          >
            <span>Let's talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
