import React, { useState } from 'react';
import { ArrowRight, Copy, Check, Terminal, MapPin, Sparkles, ExternalLink } from 'lucide-react';
import { portfolioProfile } from '../data/portfolioData';

interface HeroSectionProps {
  onExploreWork: () => void;
  onDiscussProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWork, onDiscussProject }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'controller' | 'service'>('controller');

  const copyCode = () => {
    navigator.clipboard.writeText(portfolioProfile.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#3A6351]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-48 right-10 w-80 h-80 bg-[#D97746]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Kicker */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono tracking-widest text-[#5A6E63] uppercase font-semibold">
            {portfolioProfile.tagline}
          </span>
        </div>

        {/* Main 2-column or split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Typographic Anchor */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-[#1A221E] tracking-tight leading-[1.12]">
              {portfolioProfile.headlinePrefix}
              <span className="font-serif-italic font-normal text-[#1E382B] px-1 underline decoration-[#3A6351]/30 decoration-2 underline-offset-4">
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
                onClick={onExploreWork}
                className="px-6 py-3 text-sm font-semibold text-[#F8F6F0] bg-[#1E382B] rounded-xl hover:bg-[#2B4E3C] transition-all flex items-center gap-2 shadow-sm hover:shadow-md group"
              >
                <span>Explore my work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onDiscussProject}
                className="px-6 py-3 text-sm font-semibold text-[#1E2522] bg-[#EFECE4] border border-[#DBD6C9] rounded-xl hover:bg-[#E5E0D5] transition-all"
              >
                Discuss a project
              </button>
            </div>

            {/* Location & Status Bar */}
            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-[#626C65]">
              <span className="w-2 h-2 rounded-full bg-[#3A6351] animate-pulse" />
              <MapPin className="w-3.5 h-3.5 text-[#3A6351]" />
              <span className="font-semibold text-[#2D3832]">PUNE, INDIA</span>
              <span>·</span>
              <span>BUILDING &amp; EXPLORING</span>
            </div>

            {/* Hand-drawn style concept node */}
            <div className="inline-flex items-center gap-3 p-3 bg-[#F0EDE4] border border-[#DDD8CA] rounded-xl text-xs font-mono text-[#4A5550]">
              <span className="text-[#3A6351] font-bold">IDEAS</span>
              <span>→</span>
              <span className="text-[#1E382B] font-bold">PRODUCTS</span>
              <span>→</span>
              <span className="text-[#D97746] font-bold">IMPACT</span>
            </div>
          </div>

          {/* Right Column: Code Window, Currently Exploring, & Golden-hour Mountain Photography */}
          <div className="lg:col-span-5 space-y-4">
            {/* Interactive Spring Boot Code Window */}
            <div className="bg-[#1C231F] rounded-2xl border border-[#2D3730] shadow-xl overflow-hidden">
              <div className="px-4 py-3 bg-[#161B18] border-b border-[#2D3730] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E06C75]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E5C07B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#98C379]" />
                  </div>
                  <span className="ml-2 text-xs font-mono text-[#8E9B93] flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-[#98C379]" />
                    Spring Boot 3
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyCode}
                    className="text-xs font-mono text-[#8E9B93] hover:text-[#D1DCD5] flex items-center gap-1 px-2 py-0.5 rounded hover:bg-[#252E28] transition-colors"
                    title="Copy code"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3 h-3 text-[#98C379]" />
                        <span className="text-[#98C379]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code editor content */}
              <div className="p-4 font-mono text-xs overflow-x-auto leading-relaxed bg-[#191F1B]">
                <div className="grid grid-cols-[24px_1fr] gap-3">
                  <div className="select-none text-[#56635B] text-right space-y-0.5">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                  </div>
                  <div className="text-[#E0E6E2] space-y-0.5">
                    <div><span className="text-[#E5C07B]">@RestController</span></div>
                    <div><span className="text-[#C678DD]">public class</span> <span className="text-[#61AFEF]">ApiController</span> &#123;</div>
                    <div className="pl-4"><span className="text-[#E5C07B]">@GetMapping</span>(<span className="text-[#98C379]">"/api"</span>)</div>
                    <div className="pl-4"><span className="text-[#C678DD]">public</span> <span className="text-[#61AFEF]">ResponseEntity&lt;String&gt;</span> <span className="text-[#56B6C2]">greet</span>() &#123;</div>
                    <div className="pl-8"><span className="text-[#C678DD]">return</span> ResponseEntity.<span className="text-[#56B6C2]">ok</span>(</div>
                    <div className="pl-12 text-[#98C379]">"Building useful things"</div>
                    <div className="pl-8">);</div>
                    <div className="pl-4">&#125;</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Currently Exploring Card */}
            <div className="p-4 bg-[#F2EFE8] border border-[#DDD7C9] rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D97746]" />
                <span className="text-xs font-mono font-semibold text-[#1E2522] uppercase tracking-wider">
                  Currently Exploring
                </span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#4A5550]">
                {portfolioProfile.currentlyExploring.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#3A6351] font-bold">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mountain Hiker Photo Card with Editorial Stamp */}
            <div className="relative group overflow-hidden rounded-2xl border border-[#DBD6C8] shadow-md bg-[#E8E4DA]">
              <img
                src="/src/assets/images/hero_hiker_mountain_1792492424369.jpg"
                alt="Developer looking out over mountain ridge"
                className="w-full h-48 sm:h-56 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Rotated badge in corner */}
              <div className="absolute bottom-3 right-3 bg-[#1E2522]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#F8F6F0]/20 text-[10px] font-mono text-[#F8F6F0] tracking-wider uppercase">
                {portfolioProfile.stamp}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
