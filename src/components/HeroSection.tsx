import React, { useState } from 'react';
import { ArrowRight, Copy, Check, Terminal, MapPin, Sparkles, Play, RefreshCw, Layers, ChevronRight, HelpCircle } from 'lucide-react';
import { portfolioProfile } from '../data/portfolioData';
import { soundEffects } from '../utils/uiSound';
import { SpotlightCard } from './SpotlightCard';

interface HeroSectionProps {
  onExploreWork: () => void;
  onDiscussProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWork, onDiscussProject }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'controller' | 'service' | 'config'>('controller');
  const [isRunningApi, setIsRunningApi] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [activeExploration, setActiveExploration] = useState<number | null>(null);

  const explorationDetails = [
    "Exploring Spring Boot 3 virtual threads (Java 21 Project Loom) to handle 50k+ concurrent requests with minimal OS thread overhead.",
    "Designing hybrid BM25 + dense vector retrieval pipelines with re-ranking to push document Q&A precision above 98%.",
    "Building fast, keyboard-first developer interfaces that eliminate context switching between microservices and logs."
  ];

  const copyCode = () => {
    soundEffects.playSuccess();
    navigator.clipboard.writeText(portfolioProfile.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunApi = () => {
    soundEffects.playKey();
    setIsRunningApi(true);
    setApiResponse(null);

    setTimeout(() => {
      soundEffects.playSuccess();
      setIsRunningApi(false);
      setApiResponse(JSON.stringify({
        status: 200,
        response: "Building useful things",
        author: "Shivam Khadde",
        system: "Spring Boot 3.3 / Java 21",
        latency: "28ms"
      }, null, 2));
    }, 450);
  };

  return (
    <section id="hero" className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#3A6351]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-48 right-10 w-80 h-80 bg-[#D97746]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Kicker with subtle badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono tracking-widest text-[#5A6E63] uppercase font-bold px-2 py-0.5 bg-[#EAE5DA] rounded-md">
            {portfolioProfile.tagline}
          </span>
        </div>

        {/* Main 2-column or split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Typographic Anchor */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-[#1A221E] tracking-tight leading-[1.14]">
              {portfolioProfile.headlinePrefix}
              <span className="font-serif-italic font-normal text-[#1E382B] px-1 underline decoration-[#3A6351]/30 decoration-2 underline-offset-6">
                {portfolioProfile.headlineEmphasized}
              </span>
              {portfolioProfile.headlineSuffix}
            </h1>

            <p className="text-lg sm:text-xl text-[#4A5550] max-w-xl font-normal leading-relaxed">
              {portfolioProfile.bio}
            </p>

            {/* CTAs with microinteraction hover feedback */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onExploreWork();
                }}
                className="px-6 py-3 text-sm font-semibold text-[#F8F6F0] bg-[#1E382B] rounded-xl hover:bg-[#2B4E3C] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 shadow-sm hover:shadow-md group active:scale-95"
              >
                <span>Explore my work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onDiscussProject();
                }}
                className="px-6 py-3 text-sm font-semibold text-[#1E2522] bg-[#EFECE4] border border-[#DBD6C9] rounded-xl hover:bg-[#E5E0D5] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all shadow-2xs"
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

            {/* Interactive Concept Node */}
            <div 
              onClick={() => soundEffects.playPop()}
              className="inline-flex items-center gap-3 p-3 bg-[#F0EDE4] border border-[#DDD8CA] rounded-xl text-xs font-mono text-[#4A5550] hover:border-[#1E382B]/40 hover:shadow-xs transition-all cursor-pointer group select-none"
              title="Click to interact"
            >
              <span className="text-[#3A6351] font-bold group-hover:scale-105 transition-transform">IDEAS</span>
              <span className="text-[#8F9A92]">→</span>
              <span className="text-[#1E382B] font-bold group-hover:scale-105 transition-transform">PRODUCTS</span>
              <span className="text-[#8F9A92]">→</span>
              <span className="text-[#D97746] font-bold group-hover:scale-105 transition-transform">IMPACT</span>
            </div>
          </div>

          {/* Right Column: Code Window, Currently Exploring, & Golden-hour Mountain Photography */}
          <div className="lg:col-span-5 space-y-5">
            {/* Interactive Spring Boot Code Window & Runner */}
            <SpotlightCard className="bg-[#1C231F] rounded-2xl border border-[#2E3A32] shadow-xl overflow-hidden">
              <div className="px-4 py-2.5 bg-[#161B18] border-b border-[#2E3A32] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E06C75]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E5C07B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#98C379]" />
                  </div>

                  {/* Code File Tabs */}
                  <div className="flex items-center gap-1 text-[11px] font-mono">
                    <button
                      onClick={() => {
                        soundEffects.playPop();
                        setActiveCodeTab('controller');
                      }}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        activeCodeTab === 'controller' ? 'bg-[#29352E] text-[#98C379] font-medium' : 'text-[#8E9B93] hover:text-white'
                      }`}
                    >
                      ApiController.java
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.playPop();
                        setActiveCodeTab('service');
                      }}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        activeCodeTab === 'service' ? 'bg-[#29352E] text-[#61AFEF] font-medium' : 'text-[#8E9B93] hover:text-white'
                      }`}
                    >
                      Service.java
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={copyCode}
                    className="text-xs font-mono text-[#8E9B93] hover:text-white flex items-center gap-1 px-2 py-0.5 rounded hover:bg-[#252E28] transition-colors"
                    title="Copy snippet"
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
                {activeCodeTab === 'controller' && (
                  <div className="grid grid-cols-[20px_1fr] gap-3">
                    <div className="select-none text-[#56635B] text-right space-y-0.5 text-[11px]">
                      <div>1</div>
                      <div>2</div>
                      <div>3</div>
                      <div>4</div>
                      <div>5</div>
                      <div>6</div>
                      <div>7</div>
                      <div>8</div>
                    </div>
                    <div className="text-[#E0E6E2] space-y-0.5 text-[11px]">
                      <div><span className="text-[#E5C07B]">@RestController</span></div>
                      <div><span className="text-[#C678DD]">public class</span> <span className="text-[#61AFEF]">ApiController</span> &#123;</div>
                      <div className="pl-4"><span className="text-[#E5C07B]">@GetMapping</span>(<span className="text-[#98C379]">"/api/v1/greet"</span>)</div>
                      <div className="pl-4"><span className="text-[#C678DD]">public</span> <span className="text-[#61AFEF]">ResponseEntity&lt;String&gt;</span> <span className="text-[#56B6C2]">greet</span>() &#123;</div>
                      <div className="pl-8"><span className="text-[#C678DD]">return</span> ResponseEntity.<span className="text-[#56B6C2]">ok</span>(</div>
                      <div className="pl-12 text-[#98C379]">"Building useful things"</div>
                      <div className="pl-8">);</div>
                      <div className="pl-4">&#125;</div>
                    </div>
                  </div>
                )}

                {activeCodeTab === 'service' && (
                  <div className="space-y-1 text-[#D1DCD5] text-[11px]">
                    <div><span className="text-[#E5C07B]">@Service</span></div>
                    <div><span className="text-[#C678DD]">public class</span> <span className="text-[#61AFEF]">ProductService</span> &#123;</div>
                    <div className="pl-4 text-[#8E9B93]">// Reactive transaction boundary</div>
                    <div className="pl-4"><span className="text-[#C678DD]">public</span> CompletableFuture&lt;Product&gt; getProduct(Long id) &#123;</div>
                    <div className="pl-8 text-[#98C379]">return repository.findById(id).toCompletableFuture();</div>
                    <div className="pl-4">&#125;</div>
                    <div>&#125;</div>
                  </div>
                )}

                {/* Live Run API Sandbox Trigger (Linear/ashutoshx7.me style) */}
                <div className="mt-4 pt-3 border-t border-[#29352D] flex items-center justify-between text-[11px]">
                  <button
                    onClick={handleRunApi}
                    disabled={isRunningApi}
                    className="px-3 py-1 bg-[#253229] hover:bg-[#314236] text-[#98C379] font-mono rounded-lg transition-colors flex items-center gap-1.5 active:scale-95 border border-[#3E5244]"
                  >
                    {isRunningApi ? (
                      <>
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        <span>Sending GET /api/v1/greet...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-current" />
                        <span>Send GET /api/v1/greet</span>
                      </>
                    )}
                  </button>

                  <span className="text-[#728077] text-[10px]">Live Spring Mock</span>
                </div>

                {/* API Response Display */}
                {apiResponse && (
                  <div className="mt-2.5 p-2.5 bg-[#121614] rounded-lg border border-[#2D3830] text-[10px] text-[#98C379] space-y-1 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-[#8E9B93]">
                      <span>HTTP 200 OK · 28ms</span>
                      <span>application/json</span>
                    </div>
                    <pre className="text-[#D1DDD5]">{apiResponse}</pre>
                  </div>
                )}
              </div>
            </SpotlightCard>

            {/* Currently Exploring Card with Interactive Details */}
            <SpotlightCard className="p-4 bg-[#F2EFE8] border border-[#DDD7C9] rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D97746]" />
                  <span className="text-xs font-mono font-bold text-[#1E2522] uppercase tracking-wider">
                    Currently Exploring
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#7A867F]">Click item to inspect</span>
              </div>

              <ul className="space-y-1.5 text-xs text-[#4A5550]">
                {portfolioProfile.currentlyExploring.map((item, idx) => (
                  <li key={idx} className="space-y-1">
                    <button
                      onClick={() => {
                        soundEffects.playPop();
                        setActiveExploration(activeExploration === idx ? null : idx);
                      }}
                      className="w-full text-left flex items-start justify-between gap-2 p-1.5 rounded-lg hover:bg-[#EAE5DA] transition-colors group"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-[#3A6351] font-bold">●</span>
                        <span className="group-hover:text-[#1E382B] transition-colors">{item}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 text-[#8E9B93] transition-transform ${activeExploration === idx ? 'rotate-90' : ''}`} />
                    </button>

                    {activeExploration === idx && (
                      <div className="p-2.5 bg-[#E8E4DA] rounded-lg text-[11px] text-[#3E4741] border border-[#DBD5C6] animate-in fade-in duration-150">
                        {explorationDetails[idx]}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </SpotlightCard>

            {/* Mountain Hiker Photo Card with Spotlight Glow & Stamp */}
            <SpotlightCard className="relative group overflow-hidden rounded-2xl border border-[#DBD6C8] shadow-md bg-[#E8E4DA]">
              <img
                src="/src/assets/images/hero_hiker_mountain_1792492424369.jpg"
                alt="Developer looking out over mountain ridge"
                className="w-full h-48 sm:h-56 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Rotated badge in corner */}
              <div 
                onClick={() => soundEffects.playPop()}
                className="absolute bottom-3 right-3 bg-[#1E2522]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#F8F6F0]/20 text-[10px] font-mono text-[#F8F6F0] tracking-wider uppercase cursor-pointer hover:bg-[#1E382B] transition-colors select-none"
              >
                {portfolioProfile.stamp}
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};
