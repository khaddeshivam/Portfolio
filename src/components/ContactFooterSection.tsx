import React from 'react';
import { Mail, Briefcase, Sparkles, Github, Linkedin, FileText, Command, ArrowRight, MapPin } from 'lucide-react';
import { portfolioProfile } from '../data/portfolioData';

interface ContactFooterSectionProps {
  onOpenResume: () => void;
  onOpenContact: (type?: string) => void;
  onOpenCommand: () => void;
}

export const ContactFooterSection: React.FC<ContactFooterSectionProps> = ({
  onOpenResume,
  onOpenContact,
  onOpenCommand,
}) => {
  return (
    <footer id="contact" className="relative text-white overflow-hidden pt-20 pb-28">
      {/* Background image & gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/footer_dusk_mountains_1792492424920.jpg"
          alt="Twilight mountains panorama"
          className="w-full h-full object-cover object-bottom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1511] via-[#15201A]/85 to-[#F8F6F0]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Header */}
        <div className="max-w-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#A3B899] bg-white/10 px-2 py-0.5 rounded backdrop-blur-xs">
              08
            </span>
            <span className="text-xs font-mono tracking-widest text-[#CCD7CD] uppercase">
              CONTACT
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            Let's make something{' '}
            <span className="font-serif-italic font-normal text-[#D6E6DB] underline decoration-[#98C379]/40">
              useful.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#D0DAD3] leading-relaxed">
            Building a team or working on a high-intent product idea? Tell me what you're trying to solve.
          </p>

          <div className="flex items-center gap-2 text-xs font-mono text-[#A7B7AD]">
            <MapPin className="w-3.5 h-3.5 text-[#98C379]" />
            <span>PUNE, INDIA · AVAILABLE GLOBALLY</span>
          </div>
        </div>

        {/* 2 Prominent Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {/* Card 1: Career Opportunities */}
          <div className="p-6 rounded-2xl bg-[#1D2721]/90 backdrop-blur-md border border-white/15 hover:border-white/30 transition-all flex flex-col justify-between space-y-4 group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#98C379] shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">Career opportunities</h3>
                <p className="text-xs text-[#B2C0B7] leading-relaxed">
                  I'm open to engineering roles, backend systems, and full-stack product positions.
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenContact('career')}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors border border-white/10"
            >
              <Mail className="w-3.5 h-3.5 text-[#98C379]" />
              <span>Email me →</span>
            </button>
          </div>

          {/* Card 2: Freelance Projects */}
          <div className="p-6 rounded-2xl bg-[#1D2721]/90 backdrop-blur-md border border-white/15 hover:border-white/30 transition-all flex flex-col justify-between space-y-4 group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#E5C07B] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">Freelance projects</h3>
                <p className="text-xs text-[#B2C0B7] leading-relaxed">
                  Let's discuss your product idea, MVP architecture, or AI integration.
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenContact('freelance')}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors border border-white/10"
            >
              <Mail className="w-3.5 h-3.5 text-[#E5C07B]" />
              <span>Email me →</span>
            </button>
          </div>
        </div>

        {/* Floating Bottom Quick Action Dock */}
        <div className="pt-8 flex flex-col items-center justify-center gap-6">
          <div className="inline-flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 bg-[#1B241E]/95 backdrop-blur-lg border border-white/20 rounded-full shadow-2xl">
            <a
              href="https://github.com/shivamkhadde"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-full hover:bg-white/10 text-xs font-medium text-[#D1DDD5] flex items-center gap-1.5 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/shivamkhadde"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-full hover:bg-white/10 text-xs font-medium text-[#D1DDD5] flex items-center gap-1.5 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#61AFEF]" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>

            <button
              onClick={onOpenResume}
              className="px-3 py-1.5 rounded-full hover:bg-white/10 text-xs font-medium text-[#D1DDD5] flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#98C379]" />
              <span className="hidden sm:inline">Résumé</span>
            </button>

            <button
              onClick={() => onOpenContact()}
              className="px-3 py-1.5 rounded-full hover:bg-white/10 text-xs font-medium text-[#D1DDD5] flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#E5C07B]" />
              <span className="hidden sm:inline">Email</span>
            </button>

            <div className="w-[1px] h-4 bg-white/20 mx-1" />

            <button
              onClick={onOpenCommand}
              className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-xs font-mono font-medium text-white flex items-center gap-1.5 transition-colors shadow-xs"
              title="Open Command Palette (⌘K)"
            >
              <Command className="w-3 h-3" />
              <span>⌘K</span>
            </button>
          </div>

          {/* Copyright & Stamp */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E9E94] border-t border-white/10 pt-6 gap-2">
            <p>© 2024 Shivam Khadde · Built with Google AI Studio</p>
            <p className="font-mono text-[11px] tracking-wider uppercase text-[#B5C7BB]">
              {portfolioProfile.stamp}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
