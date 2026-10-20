import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Send, Sparkles, Terminal, Code2, Play, Check, Sliders, RefreshCw, Zap } from 'lucide-react';
import { sampleProjects } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { soundEffects } from '../utils/uiSound';
import { SpotlightCard } from './SpotlightCard';

interface SelectedWorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Featured');
  
  // FinPilot interactive state
  const [finMonthlyBudget, setFinMonthlyBudget] = useState(40000);
  const finSpent = 24320;
  const budgetPercentage = Math.min(100, Math.round((finSpent / finMonthlyBudget) * 100));

  // RAG interactive simulator state
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

  // Orvexa interactive simulator states
  const [orvexaTab, setOrvexaTab] = useState<'editor' | 'terminal' | 'ai'>('editor');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '$ orvexa --version',
    'orvexa v2.4.0 (Spring Cloud + Next.js bridge)',
    '$ type "help" or click command pills below'
  ]);
  const [terminalInput, setTerminalInput] = useState('');

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
    setTerminalInput('');
  };

  const categories = ['Featured', 'All Projects', 'Web Apps', 'AI & ML', 'Backend', 'Tools'];

  const filteredProjects = sampleProjects.filter((p) => {
    if (activeCategory === 'Featured') return p.category === 'Featured' || p.number === '01' || p.number === '02' || p.number === '03';
    if (activeCategory === 'All Projects') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="work" className="py-16 lg:py-24 border-t border-[#E2DDD2]">
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

        {/* 3-Column Bento Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: FinPilot with Interactive Budget Simulator */}
          <SpotlightCard className="flex flex-col justify-between bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl p-5 hover:border-[#1E382B]/30 hover:shadow-lg transition-all duration-300 group">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono tracking-wider text-[#6B756E] uppercase">
                  01 FINTECH / PRODUCT ENGINEERING
                </span>
                <button 
                  onClick={() => {
                    soundEffects.playClick();
                    onSelectProject(sampleProjects[0]);
                  }}
                  className="text-[#6B756E] group-hover:text-[#1E382B] transition-colors p-1 rounded hover:bg-[#EAE5DA]"
                  aria-label="View FinPilot details"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl font-bold text-[#1E2522] mb-1.5 group-hover:text-[#1E382B] transition-colors">
                FinPilot
              </h3>
              <p className="text-xs text-[#525B55] mb-4 leading-relaxed line-clamp-3">
                An AI-native financial workspace exploring how bill management and financial planning can become more intelligent.
              </p>

              {/* Interactive Dashboard Preview Frame */}
              <div className="bg-[#EBE7DD] rounded-xl p-3 border border-[#DBD5C6] space-y-2.5 text-xs">
                {/* Metric Strip with dynamic budget recalculation */}
                <div className="grid grid-cols-3 gap-1.5 text-[10px]">
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

                {/* Interactive Slider Microinteraction */}
                <div className="p-2 bg-white rounded-lg border border-[#DDD7C9] space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#616B64] flex items-center gap-1">
                      <Sliders className="w-2.5 h-2.5" />
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
                    className="w-full h-1 bg-[#E0DBCF] rounded-lg appearance-none cursor-pointer accent-[#1E382B]"
                  />
                  {/* Progress bar */}
                  <div className="w-full bg-[#EAE5DA] h-1.5 rounded-full overflow-hidden mt-1">
                    <div
                      className={`h-full transition-all duration-300 ${
                        budgetPercentage > 85 ? 'bg-[#D97746]' : 'bg-[#1E382B]'
                      }`}
                      style={{ width: `${budgetPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Dashboard graphic preview */}
                <div className="relative rounded-lg overflow-hidden border border-[#D5CFBF] h-28 bg-white">
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
                  onClick={() => {
                    soundEffects.playClick();
                    onSelectProject(sampleProjects[0]);
                  }}
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
          </SpotlightCard>

          {/* Card 2: RAG Chatbot with Interactive Preset Prompt Switcher */}
          <SpotlightCard className="flex flex-col justify-between bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl p-5 hover:border-[#1E382B]/30 hover:shadow-lg transition-all duration-300 group">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono tracking-wider text-[#6B756E] uppercase">
                  02 APPLIED AI / RAG
                </span>
                <button 
                  onClick={() => {
                    soundEffects.playClick();
                    onSelectProject(sampleProjects[1]);
                  }}
                  className="text-[#6B756E] group-hover:text-[#1E382B] transition-colors p-1 rounded hover:bg-[#EAE5DA]"
                  aria-label="View RAG details"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl font-bold text-[#1E2522] mb-1.5 group-hover:text-[#1E382B] transition-colors">
                RAG Chatbot
              </h3>
              <p className="text-xs text-[#525B55] mb-4 leading-relaxed line-clamp-3">
                A retrieval-augmented generation application for fast, useful answers from enterprise documents.
              </p>

              {/* Interactive RAG Simulation Frame */}
              <div className="bg-[#EBE7DD] rounded-xl p-3 border border-[#DBD5C6] space-y-2 text-xs">
                {/* Preset prompt pills */}
                <div className="flex flex-wrap gap-1">
                  {ragPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectRagPreset(preset)}
                      className={`text-[9px] font-mono px-2 py-0.5 rounded transition-all truncate max-w-[170px] ${
                        ragQuery === preset.q
                          ? 'bg-[#1E382B] text-white font-semibold'
                          : 'bg-white text-[#525D56] hover:bg-[#E3DDD1]'
                      }`}
                    >
                      {preset.q}
                    </button>
                  ))}
                </div>

                {/* User Prompt */}
                <div className="flex justify-end pt-1">
                  <div className="bg-[#3A6351] text-white px-2.5 py-1.5 rounded-lg text-[10px] max-w-[90%] shadow-xs font-mono">
                    {ragQuery}
                  </div>
                </div>

                {/* Grounded AI Answer */}
                <div className="bg-white p-2.5 rounded-lg border border-[#DDD7C9] space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#3A6351] font-semibold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#D97746]" />
                      Grounded Answer:
                    </span>
                    {isRagSearching && <span className="animate-pulse">Retrieving...</span>}
                  </div>
                  <p className="text-[11px] text-[#2D3631] leading-relaxed">
                    {ragSource.answer}
                  </p>
                  <div className="text-[9px] font-mono text-[#7C847E] pt-1 border-t border-[#EAE5DA] flex items-center justify-between">
                    <span className="truncate max-w-[140px]">Source: {ragSource.sourceFile}</span>
                    <span className="text-[#3A6351] font-semibold shrink-0">{ragSource.confidence}</span>
                  </div>
                </div>

                {/* Ask Anything Input with Send Button */}
                <div className="relative">
                  <input
                    type="text"
                    value={ragQuery}
                    onChange={(e) => setRagQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSelectRagPreset({
                          q: ragQuery,
                          ans: `Retrieved semantic chunk matching query "${ragQuery}" across corporate vector database.`,
                          file: "architecture_summary.pdf",
                          conf: "97.4% match"
                        });
                      }
                    }}
                    placeholder="Ask anything about docs..."
                    className="w-full bg-white border border-[#DDD7C9] rounded-lg pl-2.5 pr-8 py-1.5 text-[11px] text-[#1E2522] focus:outline-none focus:ring-1 focus:ring-[#1E382B]"
                  />
                  <button 
                    onClick={() => {
                      handleSelectRagPreset({
                        q: ragQuery,
                        ans: `Retrieved semantic chunk matching query "${ragQuery}" across corporate vector database.`,
                        file: "architecture_summary.pdf",
                        conf: "97.4% match"
                      });
                    }}
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
                  onClick={() => {
                    soundEffects.playClick();
                    onSelectProject(sampleProjects[1]);
                  }}
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
          </SpotlightCard>

          {/* Card 3: Orvexa with Runnable Terminal & Tabs */}
          <SpotlightCard className="flex flex-col justify-between bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl p-5 hover:border-[#1E382B]/30 hover:shadow-lg transition-all duration-300 group">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono tracking-wider text-[#6B756E] uppercase">
                  03 DEVELOPER TOOLS
                </span>
                <button 
                  onClick={() => {
                    soundEffects.playClick();
                    onSelectProject(sampleProjects[2]);
                  }}
                  className="text-[#6B756E] group-hover:text-[#1E382B] transition-colors p-1 rounded hover:bg-[#EAE5DA]"
                  aria-label="View Orvexa details"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl font-bold text-[#1E2522] mb-1.5 group-hover:text-[#1E382B] transition-colors">
                Orvexa
              </h3>
              <p className="text-xs text-[#525B55] mb-4 leading-relaxed line-clamp-3">
                A coding-focused application exploring a more useful development workflow with integrated telemetry.
              </p>

              {/* Interactive Editor / Terminal / AI Frame */}
              <div className="bg-[#1C231F] rounded-xl border border-[#2E3A32] overflow-hidden text-xs">
                {/* Tabs bar */}
                <div className="px-3 py-2 bg-[#161B18] border-b border-[#2E3A32] flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        soundEffects.playPop();
                        setOrvexaTab('editor');
                      }}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        orvexaTab === 'editor' ? 'bg-[#29352E] text-[#98C379] font-semibold' : 'text-[#85928A] hover:text-white'
                      }`}
                    >
                      Editor
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.playPop();
                        setOrvexaTab('terminal');
                      }}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        orvexaTab === 'terminal' ? 'bg-[#29352E] text-[#61AFEF] font-semibold' : 'text-[#85928A] hover:text-white'
                      }`}
                    >
                      Terminal
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.playPop();
                        setOrvexaTab('ai');
                      }}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        orvexaTab === 'ai' ? 'bg-[#29352E] text-[#E5C07B] font-semibold' : 'text-[#85928A] hover:text-white'
                      }`}
                    >
                      AI
                    </button>
                  </div>

                  <span className="text-[10px] text-[#6B7971]">v2.4</span>
                </div>

                {/* Tab Content Display */}
                <div className="p-3 font-mono text-[11px] min-h-[145px] leading-relaxed">
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
                    <div className="space-y-2">
                      <div className="space-y-1 text-[#85928A] max-h-24 overflow-y-auto">
                        {terminalHistory.slice(-4).map((line, i) => (
                          <div key={i} className={line.startsWith('✔') ? 'text-[#98C379]' : line.startsWith('$') ? 'text-[#61AFEF]' : ''}>
                            {line}
                          </div>
                        ))}
                      </div>

                      {/* Quick command buttons */}
                      <div className="flex flex-wrap gap-1 pt-1 border-t border-[#29352D]">
                        {['build', 'test', 'skills', 'clear'].map((cmd) => (
                          <button
                            key={cmd}
                            onClick={() => runTerminalCommand(cmd)}
                            className="px-2 py-0.5 bg-[#253229] hover:bg-[#324538] text-[9px] text-[#A2B5A8] rounded transition-colors"
                          >
                            ${cmd}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {orvexaTab === 'ai' && (
                    <div className="space-y-2 text-[#E0E6E2]">
                      <div className="text-[10px] text-[#E5C07B] flex items-center gap-1 font-semibold">
                        <Sparkles className="w-3 h-3" />
                        <span>Suggested Microservice Refactor:</span>
                      </div>
                      <p className="text-[10px] text-[#A6B2AB] leading-relaxed">
                        Wrap repository read operations in Spring <code className="text-[#61AFEF]">@Transactional(readOnly = true)</code> to bypass write locks and boost concurrency throughput by ~22%.
                      </p>
                      <button
                        onClick={() => soundEffects.playSuccess()}
                        className="px-2 py-1 bg-[#29352E] hover:bg-[#34453A] text-[10px] text-[#98C379] rounded flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        <span>Apply Suggestion</span>
                      </button>
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
                  onClick={() => {
                    soundEffects.playClick();
                    onSelectProject(sampleProjects[2]);
                  }}
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
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
