import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Send, Sparkles, Terminal, Code2, Play, Check, Sliders, RefreshCw, Zap, Shield, Server, Activity } from 'lucide-react';
import { sampleProjects } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { soundEffects } from '../utils/uiSound';
import { SpotlightCard } from './SpotlightCard';

interface SelectedWorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Featured');
  
  // 1. FinPilot interactive state
  const [finMonthlyBudget, setFinMonthlyBudget] = useState(40000);
  const finSpent = 24320;
  const budgetPercentage = Math.min(100, Math.round((finSpent / finMonthlyBudget) * 100));

  // 2. RAG interactive simulator state
  const [ragQuery, setRagQuery] = useState('How does the refund policy work?');
  const [ragSource, setRagSource] = useState({
    answer: "Refunds are processed within 14 business days to original payment method. Items must be in original condition.",
    sourceFile: "terms-and-conditions.pdf (p.4)",
    confidence: "98.2% match"
  });
  const [isRagSearching, setIsRagSearching] = useState(false);

  const ragPresets = [
    {
      q: "How does the refund policy work?",
      ans: "Refunds are processed within 14 business days to original payment method. Items must be in original condition.",
      file: "terms-and-conditions.pdf (p.4)",
      conf: "98.2% match"
    },
    {
      q: "What is the token latency in production?",
      ans: "Mean TTFT (time-to-first-token) is 142ms via streaming SSE endpoints with Redis semantic cache hit at 98ms.",
      file: "benchmarks_v3.pdf (p.12)",
      conf: "99.1% match"
    },
    {
      q: "Which vector database is deployed?",
      ans: "Pinecone serverless vector index with HNSW index configuration and hybrid BM25 sparse re-ranking.",
      file: "infrastructure_specs.md",
      conf: "96.7% match"
    }
  ];

  const handleSelectRagPreset = (preset: typeof ragPresets[0]) => {
    soundEffects.playKey();
    setRagQuery(preset.q);
    setIsRagSearching(true);
    setTimeout(() => {
      soundEffects.playSuccess();
      setRagSource({
        answer: preset.ans,
        sourceFile: preset.file,
        confidence: preset.conf
      });
      setIsRagSearching(false);
    }, 280);
  };

  // 3. Orvexa interactive simulator states
  const [orvexaTab, setOrvexaTab] = useState<'editor' | 'terminal' | 'ai'>('editor');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '$ orvexa --version',
    'orvexa v2.4.0 (Spring Cloud + Next.js bridge)',
    '$ type "help" or click command pills below'
  ]);

  const runTerminalCommand = (cmd: string) => {
    soundEffects.playKey();
    const cleanCmd = cmd.trim().toLowerCase();
    const newLogs = [...terminalHistory, `$ ${cmd}`];

    if (cleanCmd === 'help') {
      newLogs.push('Available commands: build, test, skills, contact, clear');
    } else if (cleanCmd === 'build') {
      newLogs.push('> Compiling TypeScript & Spring services...');
      newLogs.push('✔ Build completed in 142ms. Zero errors.');
    } else if (cleanCmd === 'test') {
      newLogs.push('> Running 48 test suites...');
      newLogs.push('✔ 48 passed, 0 failed (concurrency verified).');
    } else if (cleanCmd === 'skills') {
      newLogs.push('Core Stack: Java 21, Spring Boot 3, Next.js, RAG Pipelines, Docker.');
    } else if (cleanCmd === 'contact') {
      newLogs.push('Direct email: khaddeshivam@gmail.com');
    } else if (cleanCmd === 'clear') {
      setTerminalHistory(['$ terminal cleared']);
      return;
    } else {
      newLogs.push(`Command not recognized: "${cmd}". Type "help".`);
    }

    setTerminalHistory(newLogs);
  };

  // 4. StreamGate Rate Limiter state
  const [streamTokens, setStreamTokens] = useState(8400);
  const maxTokens = 10000;
  const [burstStatus, setBurstStatus] = useState<string | null>(null);

  const triggerBurstTraffic = () => {
    soundEffects.playClick();
    const consumed = 1200;
    const remaining = Math.max(0, streamTokens - consumed);
    setStreamTokens(remaining);
    setBurstStatus('1,200 req burst accepted · p95: 3.4ms · Redis Lua OK');
    setTimeout(() => {
      setBurstStatus(null);
      // Auto refill
      setStreamTokens((prev) => Math.min(maxTokens, prev + 800));
    }, 2200);
  };

  const categories = ['Featured', 'All Projects', 'Web Apps', 'AI & ML', 'Backend', 'Tools'];

  const filteredProjects = sampleProjects.filter((p) => {
    if (activeCategory === 'Featured') return true;
    if (activeCategory === 'All Projects') return true;
    if (activeCategory === 'Web Apps') return p.id === 'finpilot';
    if (activeCategory === 'AI & ML') return p.category === 'AI & ML';
    if (activeCategory === 'Backend') return p.category === 'Backend' || p.id === 'streamgate';
    if (activeCategory === 'Tools') return p.category === 'Tools' || p.id === 'orvexa';
    return true;
  });

  return (
    <section id="work" className="py-16 lg:py-24 border-t border-[#E2DDD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
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
              Production systems, architecture case studies, and focused applications.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EAE5DA] rounded-xl self-start md:self-auto shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEffects.playPop();
                  setActiveCategory(cat);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all active:scale-95 ${
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

        {/* 2x2 Grid of In-Depth Project Case Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: FinPilot */}
          {filteredProjects.some(p => p.id === 'finpilot') && (
            <SpotlightCard className="flex flex-col justify-between bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl p-6 hover:border-[#1E382B]/40 hover:shadow-lg transition-all duration-300 group">
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono tracking-wider text-[#6B756E] uppercase">
                    01 · FINTECH / PRODUCT ENGINEERING
                  </span>
                  <button 
                    onClick={() => {
                      soundEffects.playClick();
                      onSelectProject(sampleProjects[0]);
                    }}
                    className="text-[#6B756E] group-hover:text-[#1E382B] transition-colors p-1.5 rounded-lg hover:bg-[#EAE5DA]"
                    title="View case study"
                    aria-label="View FinPilot details"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-2xl font-bold text-[#1E2522] mb-1.5 group-hover:text-[#1E382B] transition-colors">
                  FinPilot
                </h3>
                <p className="text-xs sm:text-sm text-[#525B55] mb-5 leading-relaxed">
                  An AI-native financial workspace exploring how recurring bill management, cash-flow forecasting, and budget planning become proactive and trustworthy.
                </p>

                {/* Interactive Dashboard Frame */}
                <div className="bg-[#EBE7DD] rounded-xl p-3.5 border border-[#DBD5C6] space-y-3 text-xs">
                  <div className="grid grid-cols-3 gap-2 text-[10px]">
                    <div className="bg-white p-2 rounded-lg border border-[#DDD7C9]">
                      <span className="text-[#7C847E] block truncate">Total Spent</span>
                      <span className="font-mono font-bold text-[#1E2522]">₹{finSpent.toLocaleString()}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-[#DDD7C9]">
                      <span className="text-[#7C847E] block truncate">Remaining</span>
                      <span className="font-mono font-bold text-[#3A6351]">
                        ₹{Math.max(0, finMonthlyBudget - finSpent).toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-[#DDD7C9]">
                      <span className="text-[#7C847E] block truncate">Utilization</span>
                      <span className="font-mono font-bold text-[#D97746]">{budgetPercentage}%</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-[#DDD7C9] space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#616B64] flex items-center gap-1.5">
                        <Sliders className="w-3 h-3 text-[#1E382B]" />
                        Adjust Monthly Budget
                      </span>
                      <span className="font-bold text-[#1E382B]">₹{finMonthlyBudget.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="25000"
                      max="75000"
                      step="5000"
                      value={finMonthlyBudget}
                      onChange={(e) => {
                        soundEffects.playKey();
                        setFinMonthlyBudget(Number(e.target.value));
                      }}
                      className="w-full h-1.5 bg-[#E0DBCF] rounded-lg appearance-none cursor-pointer accent-[#1E382B]"
                    />
                    <div className="w-full bg-[#EAE5DA] h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          budgetPercentage > 85 ? 'bg-[#D97746]' : 'bg-[#1E382B]'
                        }`}
                        style={{ width: `${budgetPercentage}%` }}
                      />
                    </div>
                  </div>

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

              {/* Tags & Action Footer */}
              <div className="mt-5 pt-3.5 border-t border-[#EAE5DA] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#6A746E]">
                  <span>Java 21</span>
                  <span>·</span>
                  <span>Spring Boot 3</span>
                  <span>·</span>
                  <span>Next.js</span>
                  <span>·</span>
                  <span>PostgreSQL</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      onSelectProject(sampleProjects[0]);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-[#1E382B] hover:bg-[#EAE5DA] rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>Explore Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="https://github.com/shivamkhadde/finpilot"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-[#6A746E] hover:text-[#1E2522] rounded-lg hover:bg-[#EAE5DA]"
                    aria-label="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </SpotlightCard>
          )}

          {/* Card 2: RAG Documentation Engine */}
          {filteredProjects.some(p => p.id === 'rag-chatbot') && (
            <SpotlightCard className="flex flex-col justify-between bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl p-6 hover:border-[#1E382B]/40 hover:shadow-lg transition-all duration-300 group">
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono tracking-wider text-[#6B756E] uppercase">
                    02 · APPLIED AI / RETRIEVAL PIPELINE
                  </span>
                  <button 
                    onClick={() => {
                      soundEffects.playClick();
                      onSelectProject(sampleProjects[1]);
                    }}
                    className="text-[#6B756E] group-hover:text-[#1E382B] transition-colors p-1.5 rounded-lg hover:bg-[#EAE5DA]"
                    title="View case study"
                    aria-label="View RAG details"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-2xl font-bold text-[#1E2522] mb-1.5 group-hover:text-[#1E382B] transition-colors">
                  RAG Documentation Engine
                </h3>
                <p className="text-xs sm:text-sm text-[#525B55] mb-5 leading-relaxed">
                  A production retrieval-augmented generation system designed for fast, grounded answers from dense multi-page technical manuals and enterprise PDFs.
                </p>

                {/* Interactive RAG Simulation Frame */}
                <div className="bg-[#EBE7DD] rounded-xl p-3.5 border border-[#DBD5C6] space-y-2.5 text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {ragPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectRagPreset(preset)}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-md transition-all truncate max-w-[200px] ${
                          ragQuery === preset.q
                            ? 'bg-[#1E382B] text-white font-semibold'
                            : 'bg-white text-[#525D56] hover:bg-[#E3DDD1]'
                        }`}
                      >
                        {preset.q}
                      </button>
                    ))}
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-[#DDD7C9] space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono border-b border-[#EAE5DA] pb-1.5">
                      <span className="text-[#3A6351] font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Grounded Answer
                      </span>
                      <span className="text-[#7A867F] font-mono">{ragSource.confidence}</span>
                    </div>

                    <p className="text-xs text-[#2A332E] leading-relaxed">
                      {isRagSearching ? (
                        <span className="text-[#7A867F] italic animate-pulse">Running hybrid vector + BM25 search...</span>
                      ) : (
                        ragSource.answer
                      )}
                    </p>

                    <div className="pt-1.5 border-t border-[#F0ECE4] flex items-center justify-between text-[10px] font-mono text-[#6A756E]">
                      <span>Source: <strong className="text-[#1E382B] font-semibold">{ragSource.sourceFile}</strong></span>
                      <span className="text-[#3A6351]">100% Verifiable</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags & Action Footer */}
              <div className="mt-5 pt-3.5 border-t border-[#EAE5DA] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#6A746E]">
                  <span>Python</span>
                  <span>·</span>
                  <span>FastAPI</span>
                  <span>·</span>
                  <span>LangChain</span>
                  <span>·</span>
                  <span>Pinecone</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      onSelectProject(sampleProjects[1]);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-[#1E382B] hover:bg-[#EAE5DA] rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>Explore Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="https://github.com/shivamkhadde/rag-chatbot"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-[#6A746E] hover:text-[#1E2522] rounded-lg hover:bg-[#EAE5DA]"
                    aria-label="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </SpotlightCard>
          )}

          {/* Card 3: Orvexa */}
          {filteredProjects.some(p => p.id === 'orvexa') && (
            <SpotlightCard className="flex flex-col justify-between bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl p-6 hover:border-[#1E382B]/40 hover:shadow-lg transition-all duration-300 group">
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono tracking-wider text-[#6B756E] uppercase">
                    03 · DEVELOPER TOOLS / DISTRIBUTED SYSTEMS
                  </span>
                  <button 
                    onClick={() => {
                      soundEffects.playClick();
                      onSelectProject(sampleProjects[2]);
                    }}
                    className="text-[#6B756E] group-hover:text-[#1E382B] transition-colors p-1.5 rounded-lg hover:bg-[#EAE5DA]"
                    title="View case study"
                    aria-label="View Orvexa details"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-2xl font-bold text-[#1E2522] mb-1.5 group-hover:text-[#1E382B] transition-colors">
                  Orvexa
                </h3>
                <p className="text-xs sm:text-sm text-[#525B55] mb-5 leading-relaxed">
                  A developer command interface and telemetry viewer that bridges terminal sessions with microservice health logs to eliminate context switching.
                </p>

                {/* Interactive Editor / Terminal / AI Frame */}
                <div className="bg-[#1C231F] rounded-xl border border-[#2E3A32] overflow-hidden text-xs">
                  <div className="px-3.5 py-2 bg-[#161B18] border-b border-[#2E3A32] flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-1.5">
                      {(['editor', 'terminal', 'ai'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => {
                            soundEffects.playPop();
                            setOrvexaTab(tab);
                          }}
                          className={`px-2.5 py-0.5 rounded transition-colors uppercase text-[10px] ${
                            orvexaTab === tab ? 'bg-[#29352E] text-[#98C379] font-bold' : 'text-[#85928A] hover:text-white'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    <span className="text-[10px] text-[#6B7971]">v2.4 WebSocket</span>
                  </div>

                  <div className="p-3 font-mono text-[11px] min-h-[145px] leading-relaxed">
                    {orvexaTab === 'editor' && (
                      <div className="space-y-1 text-[#D1DCD5]">
                        <div><span className="text-[#C678DD]">export function</span> <span className="text-[#61AFEF]">useServiceCluster</span>() &#123;</div>
                        <div className="pl-4"><span className="text-[#C678DD]">const</span> stream = <span className="text-[#E5C07B]">useWebSocket</span>(<span className="text-[#98C379]">"/ws/telemetry"</span>);</div>
                        <div className="pl-4"><span className="text-[#C678DD]">return</span> &#123; latency: stream.p95, health: <span className="text-[#98C379]">"UP"</span> &#125;;</div>
                        <div>&#125;</div>
                      </div>
                    )}

                    {orvexaTab === 'terminal' && (
                      <div className="space-y-2">
                        <div className="space-y-1 text-[#85928A] max-h-24 overflow-y-auto">
                          {terminalHistory.slice(-4).map((line, i) => (
                            <div key={i} className={line.startsWith('✔') ? 'text-[#98C379]' : line.startsWith('$') ? 'text-[#61AFEF]' : ''}>
                              {line}
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-[#29352D]">
                          {['build', 'test', 'skills', 'clear'].map((cmd) => (
                            <button
                              key={cmd}
                              onClick={() => runTerminalCommand(cmd)}
                              className="px-2 py-0.5 bg-[#253229] hover:bg-[#324538] text-[10px] text-[#A2B5A8] rounded transition-colors"
                            >
                              ${cmd}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {orvexaTab === 'ai' && (
                      <div className="space-y-2 text-[#E0E6E2]">
                        <div className="text-[11px] text-[#E5C07B] flex items-center gap-1.5 font-semibold">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Suggested Microservice Refactor:</span>
                        </div>
                        <p className="text-[10px] text-[#A6B2AB] leading-relaxed">
                          Wrap repository read operations in Spring <code className="text-[#61AFEF]">@Transactional(readOnly = true)</code> to bypass write locks and boost concurrency throughput by ~22%.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tags & Action Footer */}
              <div className="mt-5 pt-3.5 border-t border-[#EAE5DA] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#6A746E]">
                  <span>React</span>
                  <span>·</span>
                  <span>TypeScript</span>
                  <span>·</span>
                  <span>WebSockets</span>
                  <span>·</span>
                  <span>Spring Cloud</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      onSelectProject(sampleProjects[2]);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-[#1E382B] hover:bg-[#EAE5DA] rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>Explore Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="https://github.com/shivamkhadde/orvexa"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-[#6A746E] hover:text-[#1E2522] rounded-lg hover:bg-[#EAE5DA]"
                    aria-label="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </SpotlightCard>
          )}

          {/* Card 4: StreamGate API Gateway */}
          {filteredProjects.some(p => p.id === 'streamgate') && (
            <SpotlightCard className="flex flex-col justify-between bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl p-6 hover:border-[#1E382B]/40 hover:shadow-lg transition-all duration-300 group">
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono tracking-wider text-[#6B756E] uppercase">
                    04 · HIGH-CONCURRENCY BACKEND / GATEWAY
                  </span>
                  <button 
                    onClick={() => {
                      soundEffects.playClick();
                      onSelectProject(sampleProjects[3]);
                    }}
                    className="text-[#6B756E] group-hover:text-[#1E382B] transition-colors p-1.5 rounded-lg hover:bg-[#EAE5DA]"
                    title="View case study"
                    aria-label="View StreamGate details"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-2xl font-bold text-[#1E2522] mb-1.5 group-hover:text-[#1E382B] transition-colors">
                  StreamGate API Gateway
                </h3>
                <p className="text-xs sm:text-sm text-[#525B55] mb-5 leading-relaxed">
                  High-throughput reverse proxy and API rate limiter built on Spring Cloud Gateway with distributed Redis token-bucket filters.
                </p>

                {/* Interactive Token-Bucket Rate Limiter Frame */}
                <div className="bg-[#EBE7DD] rounded-xl p-3.5 border border-[#DBD5C6] space-y-3 text-xs">
                  <div className="grid grid-cols-3 gap-2 text-[10px]">
                    <div className="bg-white p-2 rounded-lg border border-[#DDD7C9]">
                      <span className="text-[#7C847E] block truncate">Bucket Capacity</span>
                      <span className="font-mono font-bold text-[#1E2522]">10,000 req</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-[#DDD7C9]">
                      <span className="text-[#7C847E] block truncate">Refill Rate</span>
                      <span className="font-mono font-bold text-[#3A6351]">500 req/sec</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-[#DDD7C9]">
                      <span className="text-[#7C847E] block truncate">Current Tokens</span>
                      <span className="font-mono font-bold text-[#1E382B]">{streamTokens.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-[#DDD7C9] space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#616B64] flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-[#3A6351]" />
                        Token Reserve Gauge
                      </span>
                      <span className="font-bold text-[#1E382B]">{Math.round((streamTokens / maxTokens) * 100)}%</span>
                    </div>

                    <div className="w-full bg-[#EAE5DA] h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1E382B] transition-all duration-300"
                        style={{ width: `${(streamTokens / maxTokens) * 100}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={triggerBurstTraffic}
                        className="px-3 py-1 bg-[#1E382B] hover:bg-[#2A4B3A] text-white text-[10px] font-mono font-semibold rounded-md transition-all active:scale-95 flex items-center gap-1.5"
                      >
                        <Zap className="w-3 h-3 text-[#E5C07B]" />
                        <span>Simulate 1,200 Req Burst</span>
                      </button>

                      <span className="text-[10px] font-mono text-[#3A6351]">Redis Lua Script</span>
                    </div>

                    {burstStatus && (
                      <p className="text-[10px] font-mono text-[#1E382B] bg-[#EAE5DA] p-1.5 rounded animate-in fade-in">
                        ✔ {burstStatus}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Tags & Action Footer */}
              <div className="mt-5 pt-3.5 border-t border-[#EAE5DA] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#6A746E]">
                  <span>Java 21</span>
                  <span>·</span>
                  <span>Spring Cloud</span>
                  <span>·</span>
                  <span>Redis</span>
                  <span>·</span>
                  <span>Micrometer</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      onSelectProject(sampleProjects[3]);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-[#1E382B] hover:bg-[#EAE5DA] rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>Explore Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="https://github.com/shivamkhadde/streamgate"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-[#6A746E] hover:text-[#1E2522] rounded-lg hover:bg-[#EAE5DA]"
                    aria-label="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </SpotlightCard>
          )}
        </div>
      </div>
    </section>
  );
};
