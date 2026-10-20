import React, { useState } from 'react';
import { Download, Github, Linkedin, Mail, MapPin, Sparkles, Check, Coffee, Code2, Server } from 'lucide-react';
import { portfolioProfile } from '../data/portfolioData';
import { soundEffects } from '../utils/uiSound';
import { SpotlightCard } from './SpotlightCard';

interface AboutSectionProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume, onOpenContact }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    soundEffects.playSuccess();
    navigator.clipboard.writeText('khaddeshivam@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="about" className="py-16 lg:py-24 border-t border-[#E2DDD2] bg-[#F7F4EC]">
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
              {portfolioProfile.aboutPersonal}
            </p>

            <p className="text-sm text-[#5C6660] leading-relaxed">
              I believe great software is neither pure engineering nor pure aesthetics—it lives at the intersection. Clean architecture, dependable concurrency, and thoughtful interaction design turn complicated technical systems into empowering tools.
            </p>

            {/* Quick Micro-stats Strip */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <SpotlightCard className="p-3 bg-white/80 rounded-xl border border-[#DDD7C9] text-center space-y-0.5">
                <span className="font-mono text-base font-bold text-[#1E382B]">Java 21</span>
                <span className="block text-[10px] text-[#6A756E] uppercase font-mono">Core Backend</span>
              </SpotlightCard>
              <SpotlightCard className="p-3 bg-white/80 rounded-xl border border-[#DDD7C9] text-center space-y-0.5">
                <span className="font-mono text-base font-bold text-[#3A6351]">Spring + RAG</span>
                <span className="block text-[10px] text-[#6A756E] uppercase font-mono">Architecture</span>
              </SpotlightCard>
              <SpotlightCard className="p-3 bg-white/80 rounded-xl border border-[#DDD7C9] text-center space-y-0.5">
                <span className="font-mono text-base font-bold text-[#D97746]">&lt; 150ms</span>
                <span className="block text-[10px] text-[#6A756E] uppercase font-mono">Target Latency</span>
              </SpotlightCard>
            </div>

            {/* Action Bar with sound and copy email microinteraction */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenResume();
                }}
                className="px-4 py-2.5 text-xs font-semibold text-[#1E2522] bg-white border border-[#DDD7C9] rounded-xl hover:bg-[#EAE5DA] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all flex items-center gap-2 shadow-2xs"
              >
                <Download className="w-4 h-4 text-[#1E382B]" />
                <span>Download Résumé</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-2.5 text-xs font-semibold text-[#1E2522] bg-white border border-[#DDD7C9] rounded-xl hover:bg-[#EAE5DA] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all flex items-center gap-2 shadow-2xs"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-[#3A6351]" /> : <Mail className="w-4 h-4 text-[#D97746]" />}
                <span>{copiedEmail ? 'Copied Email!' : 'Copy Email'}</span>
              </button>

              <a
                href="https://github.com/shivamkhadde"
                target="_blank"
                rel="noreferrer"
                onClick={() => soundEffects.playClick()}
                className="px-4 py-2.5 text-xs font-semibold text-[#1E2522] bg-white border border-[#DDD7C9] rounded-xl hover:bg-[#EAE5DA] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all flex items-center gap-2 shadow-2xs"
              >
                <Github className="w-4 h-4 text-[#1E2522]" />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/shivamkhadde"
                target="_blank"
                rel="noreferrer"
                onClick={() => soundEffects.playClick()}
                className="px-4 py-2.5 text-xs font-semibold text-[#1E2522] bg-white border border-[#DDD7C9] rounded-xl hover:bg-[#EAE5DA] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all flex items-center gap-2 shadow-2xs"
              >
                <Linkedin className="w-4 h-4 text-[#0077B5]" />
                <span>LinkedIn</span>
              </a>
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

            <SpotlightCard className="relative p-3 bg-white rounded-2xl border border-[#DDD7C9] shadow-lg transform lg:rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-[#EAE5DA]">
                <img
                  src="/src/assets/images/about_portrait_nature_1792492425530.jpg"
                  alt="Shivam Khadde looking at sunrise over hills"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

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
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};
