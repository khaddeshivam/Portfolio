import React from 'react';
import { ArrowUpRight, Sparkles, Code2, Menu, X } from 'lucide-react';
import { portfolioProfile } from '../data/portfolioData';

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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'notes', label: 'Notes' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#E5E0D5] bg-[#F8F6F0]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Single element brand mark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1E382B] text-[#F8F6F0] flex items-center justify-center font-mono text-xs font-semibold shadow-xs group-hover:bg-[#2D4A3E] transition-colors">
              SK
            </div>
            <div>
              <span className="block text-sm font-semibold text-[#1E2522] tracking-tight whitespace-nowrap">
                {portfolioProfile.name}
              </span>
              <span className="block text-[11px] text-[#7C847E] font-medium whitespace-nowrap">
                {portfolioProfile.role}
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5A635E]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="hover:text-[#1E382B] transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#1E382B] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action + Vibe Prompt Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Blueprint Mode Switcher */}
          <div className="p-1 bg-[#EAE5DA] rounded-lg flex items-center gap-1 text-xs font-medium">
            <button
              onClick={() => onViewChange('portfolio')}
              className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentView === 'portfolio'
                  ? 'bg-white text-[#1E2522] shadow-xs font-semibold'
                  : 'text-[#6C756E] hover:text-[#1E2522]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-[#1E382B]" />
              <span className="hidden sm:inline">Live Portfolio</span>
            </button>

            <button
              onClick={() => onViewChange('blueprint')}
              className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentView === 'blueprint'
                  ? 'bg-[#1E382B] text-white shadow-xs font-semibold'
                  : 'text-[#6C756E] hover:text-[#1E2522]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D97746]" />
              <span>Prompt Studio</span>
            </button>
          </div>

          {/* Let's Talk CTA */}
          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#F8F6F0] bg-[#1E382B] rounded-lg hover:bg-[#2A4B3A] transition-colors whitespace-nowrap shadow-xs"
          >
            <span>Let's talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#1E2522] hover:bg-[#EAE5DA]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5E0D5] bg-[#F8F6F0] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-[#2E3531] hover:bg-[#EAE5DA] rounded-md"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenContact();
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#F8F6F0] bg-[#1E382B] rounded-lg"
          >
            <span>Let's talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
