import React from 'react';
import { ArrowRight, MapPin, Terminal, Server, Cpu, Database, CheckCircle2 } from 'lucide-react';
import { portfolioProfile } from '../data/portfolioData';
import { soundEffects } from '../utils/uiSound';
import { SpotlightCard } from './SpotlightCard';

interface HeroSectionProps {
  onExploreWork: () => void;
  onDiscussProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWork, onDiscussProject }) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-12 left-1/3 w-96 h-96 bg-[#3A6351]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Kicker */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono tracking-widest text-[#5A6E63] uppercase font-semibold">
            {portfolioProfile.tagline}
          </span>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Typographic & Personal Anchor */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-[#1A221E] tracking-tight leading-[1.12]">
              {portfolioProfile.headlinePrefix}
              <span className="font-serif-italic font-normal text-[#1E382B] px-1 underline decoration-[#3A6351]/30 decoration-2 underline-offset-6">
                {portfolioProfile.headlineEmphasized}
              </span>
              {portfolioProfile.headlineSuffix}
            </h1>

            <p className="text-lg sm:text-xl text-[#4A5550] max-w-xl font-normal leading-relaxed">
              {portfolioProfile.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onExploreWork();
                }}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#F8F6F0] bg-[#1E382B] rounded-xl hover:bg-[#2B4E3C] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 shadow-sm group active:scale-95"
              >
                <span>Explore Case Studies</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onDiscussProject();
                }}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#1E2522] bg-[#EFECE4] border border-[#DBD6C9] rounded-xl hover:bg-[#E5E0D5] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all shadow-2xs"
              >
                Get in Touch
              </button>
            </div>

            {/* Location & Status Bar */}
            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-[#626C65]">
              <span className="w-2 h-2 rounded-full bg-[#3A6351] animate-pulse" />
              <MapPin className="w-3.5 h-3.5 text-[#3A6351]" />
              <span className="font-semibold text-[#2D3832]">PUNE, INDIA</span>
              <span>·</span>
              <span>AVAILABLE FOR ROLES &amp; SELECT PROJECTS</span>
            </div>
          </div>

          {/* Right Column: Authentic Engineering Architecture & Systems Overview */}
          <div className="lg:col-span-5 space-y-4">
            <SpotlightCard className="p-6 bg-white border border-[#DDD7C9] rounded-2xl shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE5DA]">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-[#1E382B]" />
                  <span className="text-xs font-mono font-bold text-[#1E2522] uppercase tracking-wider">
                    Core Production Stack
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#3A6351] font-semibold bg-[#EAE5DA] px-2 py-0.5 rounded">
                  Java 21 · Spring Boot 3
                </span>
              </div>

              {/* Stack breakdown */}
              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[#1E2522] font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-[#3A6351]" />
                      Backend &amp; Microservices
                    </span>
                    <span className="font-mono text-[10px] text-[#7A867F]">Java · Spring · Postgres · Redis</span>
                  </div>
                  <p className="text-[11px] text-[#555E57] leading-relaxed">
                    ACID transactional boundaries, Spring Cloud Gateway filters, and HikariCP connection pool optimization.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-[#F0EDE5]">
                  <div className="flex items-center justify-between text-[#1E2522] font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#D97746]" />
                      Applied AI &amp; Retrieval
                    </span>
                    <span className="font-mono text-[10px] text-[#7A867F]">LangChain · BM25 · Embeddings</span>
                  </div>
                  <p className="text-[11px] text-[#555E57] leading-relaxed">
                    Hybrid dense + lexical retrieval pipelines with cross-encoder re-ranking and verifiable inline source citations.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-[#F0EDE5]">
                  <div className="flex items-center justify-between text-[#1E2522] font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#1E382B]" />
                      Frontend Interfaces
                    </span>
                    <span className="font-mono text-[10px] text-[#7A867F]">Next.js · React · TypeScript</span>
                  </div>
                  <p className="text-[11px] text-[#555E57] leading-relaxed">
                    High-craft editorial web applications with zero-pill metadata discipline, keyboard navigation, and optimistic state.
                  </p>
                </div>
              </div>

              {/* Quick Verified Invariants */}
              <div className="p-3 bg-[#F8F6F0] rounded-xl border border-[#EAE5DA] grid grid-cols-2 gap-2 text-[10px] font-mono text-[#4A554E]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3A6351]" />
                  <span>Sub-30ms REST Latency</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3A6351]" />
                  <span>Strict Type Safety</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3A6351]" />
                  <span>Zero-Hallucination Citations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3A6351]" />
                  <span>Responsive Web Standards</span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};
