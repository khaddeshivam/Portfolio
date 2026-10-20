import React from 'react';
import { Download, Github, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react';
import { portfolioProfile } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume, onOpenContact }) => {
  return (
    <section id="about" className="py-16 lg:py-24 border-t border-[#E5E0D5] bg-[#F7F4EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative and Manifesto */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#1E382B] bg-[#EAE5DA] px-2 py-0.5 rounded">
                03
              </span>
              <span className="text-xs font-mono tracking-widest text-[#616B64] uppercase font-semibold">
                ABOUT · A LITTLE ABOUT HOW I BUILD
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#1E2522] tracking-tight leading-tight">
              Software, products and ideas that make a{' '}
              <span className="font-serif-italic font-normal text-[#1E382B] underline decoration-[#3A6351]/30">
                real difference.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#4E5852] leading-relaxed font-normal">
              {portfolioProfile.aboutLong}
            </p>

            <p className="text-sm text-[#5C6660] leading-relaxed">
              I believe great software is neither pure engineering nor pure aesthetics—it lives at the intersection. Clean architecture, dependable concurrency, and thoughtful interaction design turn complicated technical systems into empowering tools.
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={onOpenResume}
                className="px-4 py-2.5 text-xs font-semibold text-[#1E2522] bg-white border border-[#DDD7C9] rounded-xl hover:bg-[#EAE5DA] transition-all flex items-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4 text-[#1E382B]" />
                <span>Download Résumé</span>
              </button>

              <a
                href="https://github.com/shivamkhadde"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 text-xs font-semibold text-[#1E2522] bg-white border border-[#DDD7C9] rounded-xl hover:bg-[#EAE5DA] transition-all flex items-center gap-2 shadow-xs"
              >
                <Github className="w-4 h-4 text-[#1E2522]" />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/shivamkhadde"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 text-xs font-semibold text-[#1E2522] bg-white border border-[#DDD7C9] rounded-xl hover:bg-[#EAE5DA] transition-all flex items-center gap-2 shadow-xs"
              >
                <Linkedin className="w-4 h-4 text-[#0077B5]" />
                <span>LinkedIn</span>
              </a>

              <button
                onClick={onOpenContact}
                className="px-4 py-2.5 text-xs font-semibold text-[#1E2522] bg-white border border-[#DDD7C9] rounded-xl hover:bg-[#EAE5DA] transition-all flex items-center gap-2 shadow-xs"
              >
                <Mail className="w-4 h-4 text-[#D97746]" />
                <span>Email</span>
              </button>
            </div>
          </div>

          {/* Right Column: Polaroid Mountain Sunrise Portrait */}
          <div className="lg:col-span-5 relative">
            {/* Curved Header Tag */}
            <div className="text-center mb-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#737E77]">
                BUILDING A MORE MEANINGFUL INTERNET, ONE PROJECT AT A TIME.
              </span>
            </div>

            <div className="relative p-3 bg-white rounded-2xl border border-[#DDD7C9] shadow-lg transform lg:rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-[#EAE5DA]">
                <img
                  src="/src/assets/images/about_portrait_nature_1792492425530.jpg"
                  alt="Shivam Khadde looking at sunrise over hills"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-[#1E2522]/90 backdrop-blur-md rounded-xl border border-white/10 text-white space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#98C379]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#98C379] animate-ping" />
                    <span>PUNE, INDIA</span>
                    <span>·</span>
                    <span>Open to opportunities</span>
                  </div>
                  <p className="text-[11px] text-[#D1DCD5] font-medium leading-snug">
                    Java · Full-Stack · GenAI · Product-minded developer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
