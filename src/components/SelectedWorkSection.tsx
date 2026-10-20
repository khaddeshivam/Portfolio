import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, ChevronLeft, ChevronRight, Send, Sparkles, Terminal, Code2, Database } from 'lucide-react';
import { sampleProjects } from '../data/portfolioData';
import { Project } from '../types/portfolio';

interface SelectedWorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Featured');
  
  // Interactive simulator states for Orvexa
  const [orvexaTab, setOrvexaTab] = useState<'editor' | 'terminal' | 'ai'>('editor');

  // Interactive simulator states for RAG
  const [ragQuery, setRagQuery] = useState('How does the refund policy work?');
  const [ragSubmitted, setRagSubmitted] = useState(true);

  const categories = ['Featured', 'All Projects', 'Web Apps', 'AI & ML', 'Backend', 'Tools'];

  const filteredProjects = sampleProjects.filter((p) => {
    if (activeCategory === 'Featured') return p.category === 'Featured' || p.number === '01' || p.number === '02' || p.number === '03';
    if (activeCategory === 'All Projects') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="work" className="py-16 lg:py-24 border-t border-[#E5E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-[#1E382B] bg-[#EAE5DA] px-2 py-0.5 rounded">
                02
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#1E2522] tracking-tight">
                SELECTED WORK
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#616B64]">
              Products, systems, and experiments built around real problems.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EAE5DA] rounded-xl self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-[#1E2522] shadow-xs font-semibold'
                    : 'text-[#626C65] hover:text-[#1E2522]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Bento Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: FinPilot */}
          <div className="flex flex-col justify-between bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl p-5 hover:border-[#1E382B]/30 hover:shadow-lg transition-all duration-300 group">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono tracking-wider text-[#6B756E] uppercase">
                  01 FINTECH / PRODUCT ENGINEERING
                </span>
                <button 
                  onClick={() => onSelectProject(sampleProjects[0])}
                  className="text-[#6B756E] group-hover:text-[#1E382B] transition-colors"
                  aria-label="View FinPilot details"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl font-bold text-[#1E2522] mb-1.5">
                FinPilot
              </h3>
              <p className="text-xs text-[#525B55] mb-4 leading-relaxed line-clamp-3">
                An AI-native financial workspace exploring how bill management and financial planning can become more intelligent.
              </p>

              {/* Interactive Dashboard Preview Frame */}
              <div className="bg-[#EBE7DD] rounded-xl p-3 border border-[#DBD5C6] space-y-2.5 overflow-hidden text-xs">
                {/* Metric Strip */}
                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  <div className="bg-white p-2 rounded-lg border border-[#DDD7C9]">
                    <span className="text-[#7C847E] block truncate">Total Net Worth</span>
                    <span className="font-mono font-bold text-[#1E2522]">₹84,210.55</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-[#DDD7C9]">
                    <span className="text-[#7C847E] block truncate">Upcoming Bills</span>
                    <span className="font-mono font-bold text-[#D97746]">3 due</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-[#DDD7C9]">
                    <span className="text-[#7C847E] block truncate">Monthly Budget</span>
                    <span className="font-mono font-bold text-[#1E382B]">₹40,000</span>
                  </div>
                </div>

                {/* Dashboard graphic preview */}
                <div className="relative rounded-lg overflow-hidden border border-[#D5CFBF] h-32 bg-white">
                  <img
                    src="/src/assets/images/fintech_dashboard_card_1792492425806.jpg"
                    alt="FinPilot dashboard interface"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Tags and Action Footer */}
            <div className="mt-5 pt-3 border-t border-[#EAE5DA] flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#6A746E]">
                <span>Next.js</span>
                <span>·</span>
                <span>Spring Boot</span>
                <span>·</span>
                <span>Postgres</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectProject(sampleProjects[0])}
                  className="px-2.5 py-1 text-xs font-semibold text-[#1E382B] hover:bg-[#EAE5DA] rounded-md transition-colors flex items-center gap-1"
                >
                  <span>View project</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <a
                  href="https://github.com/shivamkhadde/finpilot"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 text-[#6A746E] hover:text-[#1E2522] rounded hover:bg-[#EAE5DA]"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: RAG Chatbot */}
          <div className="flex flex-col justify-between bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl p-5 hover:border-[#1E382B]/30 hover:shadow-lg transition-all duration-300 group">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono tracking-wider text-[#6B756E] uppercase">
                  02 APPLIED AI / RAG
                </span>
                <button 
                  onClick={() => onSelectProject(sampleProjects[1])}
                  className="text-[#6B756E] group-hover:text-[#1E382B] transition-colors"
                  aria-label="View RAG details"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl font-bold text-[#1E2522] mb-1.5">
                RAG Chatbot
              </h3>
              <p className="text-xs text-[#525B55] mb-4 leading-relaxed line-clamp-3">
                A retrieval-augmented generation application for fast, useful answers from a collection of enterprise documents.
              </p>

              {/* Interactive RAG Simulation Frame */}
              <div className="bg-[#EBE7DD] rounded-xl p-3 border border-[#DBD5C6] space-y-2 text-xs">
                {/* User Prompt */}
                <div className="flex justify-end">
                  <div className="bg-[#3A6351] text-white px-2.5 py-1.5 rounded-lg text-[11px] max-w-[85%] shadow-xs">
                    {ragQuery}
                  </div>
                </div>

                {/* Grounded AI Answer */}
                <div className="bg-white p-2.5 rounded-lg border border-[#DDD7C9] space-y-1.5">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-[#3A6351] font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <span>Synthesized from 2 chunks:</span>
                  </div>
                  <p className="text-[11px] text-[#2D3631] leading-relaxed">
                    Refunds are processed within 14 business days to original payment method. Items must be in original condition.
                  </p>
                  <div className="text-[9px] font-mono text-[#7C847E] pt-1 border-t border-[#EAE5DA] flex items-center justify-between">
                    <span>Source: terms-and-conditions.pdf (p.4)</span>
                    <span className="text-[#3A6351] font-semibold">98.2% match</span>
                  </div>
                </div>

                {/* Mini Input Box */}
                <div className="relative">
                  <input
                    type="text"
                    value={ragQuery}
                    onChange={(e) => setRagQuery(e.target.value)}
                    placeholder="Ask anything about your documents..."
                    className="w-full bg-white border border-[#DDD7C9] rounded-lg pl-2.5 pr-8 py-1.5 text-[11px] text-[#1E2522] focus:outline-none focus:ring-1 focus:ring-[#1E382B]"
                  />
                  <button 
                    onClick={() => setRagSubmitted(true)}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-[#1E382B] hover:bg-[#EAE5DA] rounded"
                    aria-label="Submit question"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tags and Action Footer */}
            <div className="mt-5 pt-3 border-t border-[#EAE5DA] flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#6A746E]">
                <span>Python</span>
                <span>·</span>
                <span>LangChain</span>
                <span>·</span>
                <span>Vector DB</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectProject(sampleProjects[1])}
                  className="px-2.5 py-1 text-xs font-semibold text-[#1E382B] hover:bg-[#EAE5DA] rounded-md transition-colors flex items-center gap-1"
                >
                  <span>View project</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <a
                  href="https://github.com/shivamkhadde/rag-chatbot"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 text-[#6A746E] hover:text-[#1E2522] rounded hover:bg-[#EAE5DA]"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Orvexa */}
          <div className="flex flex-col justify-between bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl p-5 hover:border-[#1E382B]/30 hover:shadow-lg transition-all duration-300 group">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono tracking-wider text-[#6B756E] uppercase">
                  03 DEVELOPER TOOLS
                </span>
                <button 
                  onClick={() => onSelectProject(sampleProjects[2])}
                  className="text-[#6B756E] group-hover:text-[#1E382B] transition-colors"
                  aria-label="View Orvexa details"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl font-bold text-[#1E2522] mb-1.5">
                Orvexa
              </h3>
              <p className="text-xs text-[#525B55] mb-4 leading-relaxed line-clamp-3">
                A coding-focused application exploring a more useful development workflow with integrated telemetry.
              </p>

              {/* Interactive Editor / Terminal / AI Frame */}
              <div className="bg-[#1C231F] rounded-xl border border-[#2E3A32] overflow-hidden text-xs">
                {/* Tabs bar */}
                <div className="px-3 py-2 bg-[#161B18] border-b border-[#2E3A32] flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setOrvexaTab('editor')}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        orvexaTab === 'editor' ? 'bg-[#29352E] text-[#98C379]' : 'text-[#85928A] hover:text-white'
                      }`}
                    >
                      Editor
                    </button>
                    <button
                      onClick={() => setOrvexaTab('terminal')}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        orvexaTab === 'terminal' ? 'bg-[#29352E] text-[#61AFEF]' : 'text-[#85928A] hover:text-white'
                      }`}
                    >
                      Terminal
                    </button>
                    <button
                      onClick={() => setOrvexaTab('ai')}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        orvexaTab === 'ai' ? 'bg-[#29352E] text-[#E5C07B]' : 'text-[#85928A] hover:text-white'
                      }`}
                    >
                      AI Assistant
                    </button>
                  </div>
                </div>

                {/* Tab Content Display */}
                <div className="p-3 font-mono text-[11px] min-h-[140px] leading-relaxed">
                  {orvexaTab === 'editor' && (
                    <div className="space-y-1 text-[#D1DCD5]">
                      <div><span className="text-[#C678DD]">export function</span> <span className="text-[#61AFEF]">useProject</span>() &#123;</div>
                      <div className="pl-4"><span className="text-[#C678DD]">const</span> [data, setData] = <span className="text-[#E5C07B]">useState</span>(null);</div>
                      <div className="pl-4"><span className="text-[#C678DD]">const</span> fetchData = <span className="text-[#C678DD]">async</span> () =&gt; &#123;</div>
                      <div className="pl-8 text-[#98C379]">const res = await fetch("/api/v1");</div>
                      <div className="pl-8 text-[#98C379]">setData(await res.json());</div>
                      <div className="pl-4">&#125;;</div>
                      <div>&#125;</div>
                    </div>
                  )}

                  {orvexaTab === 'terminal' && (
                    <div className="space-y-1 text-[#85928A]">
                      <div className="text-[#61AFEF]">$ orvexa build --prod</div>
                      <div>&gt; Compiling TypeScript sources...</div>
                      <div>&gt; Bundled 24 modules in 142ms.</div>
                      <div className="text-[#98C379]">✔ Build succeeded. Zero warnings.</div>
                    </div>
                  )}

                  {orvexaTab === 'ai' && (
                    <div className="space-y-1.5 text-[#E0E6E2]">
                      <div className="text-[10px] text-[#E5C07B] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Suggested refactor:</span>
                      </div>
                      <p className="text-[10px] text-[#A6B2AB]">
                        Consider wrapping <code className="text-[#61AFEF]">fetchData</code> in <code className="text-[#E5C07B]">useCallback</code> to avoid redundant network triggers on parent re-renders.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tags and Action Footer */}
            <div className="mt-5 pt-3 border-t border-[#EAE5DA] flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#6A746E]">
                <span>React</span>
                <span>·</span>
                <span>TypeScript</span>
                <span>·</span>
                <span>Next.js</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectProject(sampleProjects[2])}
                  className="px-2.5 py-1 text-xs font-semibold text-[#1E382B] hover:bg-[#EAE5DA] rounded-md transition-colors flex items-center gap-1"
                >
                  <span>View project</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <a
                  href="https://github.com/shivamkhadde/orvexa"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 text-[#6A746E] hover:text-[#1E2522] rounded hover:bg-[#EAE5DA]"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
