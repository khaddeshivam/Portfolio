import React, { useState } from 'react';
import { Copy, Check, Sparkles, Terminal, Palette, Layout, Compass, Type, Layers, Eye, Users, FileCode, Sliders, ArrowRight } from 'lucide-react';
import { masterVibePromptBlueprint } from '../data/portfolioData';

interface PromptStudioViewProps {
  onReturnToPortfolio: () => void;
}

export const PromptStudioView: React.FC<PromptStudioViewProps> = ({ onReturnToPortfolio }) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'breakdown' | 'customizer'>('prompt');

  // Customizer state for generating dynamic personalized prompts
  const [devName, setDevName] = useState('Shivam Khadde');
  const [devRole, setDevRole] = useState('Full-Stack Software Engineer & Applied AI');
  const [primaryTech, setPrimaryTech] = useState('Java, Spring Boot 3, Next.js, and RAG Architecture');
  const [themeStyle, setThemeStyle] = useState<'organic-craft' | 'neo-brutalist' | 'minimal-slate' | 'cyber-terminal'>('organic-craft');

  const generateDynamicPrompt = () => {
    return `### SYSTEM / VIBE CODING PROMPT FOR GOOGLE GEMINI STUDIO:
Target: Production-Grade Developer & Designer Portfolio

Role: You are an elite digital designer and senior software engineer. Create a distinctive, high-craft, fully responsive portfolio application with tactile interactive states, authentic typography, and intentional aesthetics.

---
[PORTFOLIO BLUEPRINT & SPECIFICATION]

1. Overall Theme:
${themeStyle === 'organic-craft' ? 'Considered Software Craftsmanship & Organic Modernism. A blend of warm, tactile editorial print design with high-concurrency backend engineering precision. Evokes deep thoughtfulness, natural calm, and master-level craft.' : themeStyle === 'minimal-slate' ? 'Architectural Precision & Stark Monochrome. Ultra-clean Swiss grid typography, deep slate surfaces, subtle hairline borders, and zero decorative fluff.' : themeStyle === 'neo-brutalist' ? 'Neo-Brutalist Technical Index. High-contrast monospaced data grids, tactile brutalist outlines, bold editorial labels, and raw mechanical authenticity.' : 'Cyber-Terminal Applied AI Workspace. Deep obsidian palette with subtle phosphor green and amber accents, real-time telemetry vibes, and interactive command interfaces.'}

2. Color Palette:
- 60% Dominant Neutral Canvas: Warm Alabaster Oat (#F8F6F0) - soft, readable, natural paper feel.
- 30% Structural Surfaces & Cards: Soft Oat Card Surfaces (#EFECE6 / #FBF9F5) with subtle hairline borders (#DDD7C9).
- 10% High-Intent Focal Accent: Deep Pine Forest Green (#1E382B) for primary actions, active tabs, and navigation anchors.
- Micro-Accents: Terracotta Warm Amber (#D97746) for exploratory highlights and code tokens; Sage Moss (#3A6351) for location and status badges.
- Primary Contrast Typography: Charcoal Slate (#1E2522) with optical compensation.

3. Layout Structure:
- Desktop baseline: 1440px viewport with multi-axis responsive grid.
- Persistent Left Aesthetic Rail: 80px fixed vertical bar containing:
  * SCROLL / SOUND indicator
  * Web Audio API ambient lofi music synthesizer with live audio waveform bars ('Chasing Better Days - Lofi Study')
  * Section scroll-spy jump indicators (01 Intro, 02 Work, 03 About, 04 Journey, 05 Toolkit, 06 Services, 07 Notes, 08 Contact)
  * Interactive play/pause and volume controls.
- Top Bar Contract: 3-zone header: [Single-element brand mark: "${devName} / ${devRole}"] - [4-5 clean text nav links: Home, Work, Services, About, Notes, Contact] - [Primary CTA: "Let's talk →"].
- Bento Grid for Selected Work: 3 interactive featured cards featuring live interactive previews (FinPilot net-worth stats, RAG question answering simulator, Orvexa tabbed code/terminal editor).
- Two-Column About Section: Left editorial manifesto paired with right polaroid-framed mountain sunrise portrait.
- Dual-Column Experience & Skills: Chronological education & internship timeline alongside a categorized technical skill matrix.
- Horizontal Build Notes Rack: 3 technical essays with thumbnail previews and full reading modal support.
- Full-bleed Twilight Horizon Footer: Panoramic alpine landscape backdrop with dual inquiry cards (Career vs Freelance) and floating glass bottom dock.

4. Navigation Style:
- Synchronized multi-tier navigation:
  * Persistent left scroll-spy rail with numeric jump buttons (01-08)
  * Top navigation bar with single-line text links and hover underline micro-animations
  * Floating bottom glassmorphic dock with links to GitHub, LinkedIn, Résumé modal, Email, and ⌘K Command Palette
  * Keyboard shortcut ⌘K Command Palette for quick site navigation and audio controls.

5. Typography Preferences:
- Display & Emotional Accent: 'Instrument Serif' or 'Playfair Display' italic for emotive anchor words (e.g. "software that feels as considered as it works").
- Interface & Primary Prose: 'Plus Jakarta Sans' (400 Regular, 500 Medium, 600 SemiBold) for crystal-clear readability and modern layout balance.
- Code & Telemetry: 'JetBrains Mono' for Spring Boot code blocks, terminal tabs, metrics (tabular-nums), and section indices.

6. Key Sections to Include:
- 01. Hero Section: Big typographic headline ("I build software that feels as considered as it works"), Spring Boot code preview card, "Currently exploring" sticky note, mountain photography card, and Pune location tag.
- 02. Selected Work: Interactive Bento grid showcasing ${primaryTech} projects (FinPilot, RAG Chatbot, Orvexa) with interactive tabs, category filters, and live preview modals.
- 03. About & Philosophy: In-depth narrative on systems architecture, empathy, and craft with portrait photo and résumé trigger.
- 04. Experience & Education: Software Engineering Intern experience, Computer Science & Engineering degree, and continuous research.
- 05. Skills & Toolkit: Grouped into Backend (Java, Spring Boot), Frontend (React, Next.js), AI/ML (Python, RAG), and Tools (Docker, Git).
- 06. Services ("What I Can Help You Build"): Business Websites, Web Applications, Backend APIs, AI Prototypes + custom inquiry trigger.
- 07. Build Notes: Technical blog articles on Spring Boot API design, RAG implementation trade-offs, and architecture reflections with modal readers.
- 08. Contact & Horizon Footer: Twilight mountain panorama, Career vs Freelance email cards, floating action dock, and copyright.

7. Specific Visual Elements:
- Working Web Audio API ambient lofi music synthesizer with animated soundwave visualizer.
- Interactive tabbed code workspace (Editor, Terminal, AI Assistant).
- Interactive RAG document question simulator with live confidence and source citations.
- Analog/polaroid-framed photography cards with subtle rotation and mountain nature themes.
- Floating glassmorphic bottom dock with ⌘K Command Palette.
- Strict Zero-Pill Discipline: Unboxed metadata text separated by '·' or '/', reserving pill buttons strictly for interactive filter controls.

8. Target Audience:
- Technical hiring managers, engineering leads, tech founders, design engineers, and clients seeking thoughtful full-stack engineering and applied AI systems.

Developer Profile:
Name: ${devName}
Role: ${devRole}
Specialty: ${primaryTech}
`;
  };

  const copyFullPrompt = () => {
    navigator.clipboard.writeText(generateDynamicPrompt());
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const copyJsonBlueprint = () => {
    navigator.clipboard.writeText(JSON.stringify(masterVibePromptBlueprint, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-[#DDD7C9] rounded-2xl shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-[#1E382B] bg-[#EAE5DA] px-2 py-0.5 rounded">
                GEMINI STUDIO VIBE CODING
              </span>
              <span className="text-xs font-mono text-[#7A867F]">PROMPT SPECIFICATION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1E2522]">
              Portfolio Prompt Blueprint &amp; Generator
            </h1>
            <p className="text-xs sm:text-sm text-[#5A645E] mt-1">
              A comprehensive, battle-tested prompt blueprint satisfying every design and functional parameter for Google Gemini Studio.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onReturnToPortfolio}
              className="px-4 py-2 text-xs font-semibold text-[#1E2522] bg-[#EFEBE1] border border-[#DDD7C9] rounded-xl hover:bg-[#E5E0D5] transition-colors"
            >
              ← Back to Live Portfolio
            </button>

            <button
              onClick={copyFullPrompt}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#1E382B] rounded-xl hover:bg-[#2A4B3A] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? 'Copied to Clipboard!' : 'Copy Master Prompt'}</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-[#DDD7C9] pb-2">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'prompt'
                ? 'bg-[#1E382B] text-white shadow-xs'
                : 'text-[#6A756E] hover:text-[#1E2522]'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Master Vibe Coding Prompt</span>
          </button>

          <button
            onClick={() => setActiveTab('breakdown')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'breakdown'
                ? 'bg-[#1E382B] text-white shadow-xs'
                : 'text-[#6A756E] hover:text-[#1E2522]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>8 Required Elements Breakdown</span>
          </button>

          <button
            onClick={() => setActiveTab('customizer')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'customizer'
                ? 'bg-[#1E382B] text-white shadow-xs'
                : 'text-[#6A756E] hover:text-[#1E2522]'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Interactive Customizer</span>
          </button>
        </div>

        {/* Tab 1: Master Prompt */}
        {activeTab === 'prompt' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#1C231F] text-[#D1DCD5] rounded-2xl border border-[#2D3830] font-mono text-xs overflow-x-auto leading-relaxed shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-[#2D3830] mb-3 text-[11px] text-[#8E9B93]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#98C379]" />
                  <span>gemini-studio-portfolio-prompt.md</span>
                </div>
                <button
                  onClick={copyFullPrompt}
                  className="hover:text-white flex items-center gap-1 transition-colors px-2 py-0.5 rounded bg-[#27322B]"
                >
                  {copiedPrompt ? <Check className="w-3 h-3 text-[#98C379]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPrompt ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <pre className="whitespace-pre-wrap font-mono text-[11px] sm:text-xs text-[#E0E6E2]">
                {generateDynamicPrompt()}
              </pre>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F0EDE4] border border-[#DDD7C9] rounded-xl text-xs text-[#525B55]">
              <span>Need the raw JSON representation for configuration?</span>
              <button
                onClick={copyJsonBlueprint}
                className="px-3 py-1.5 bg-white border border-[#DDD7C9] rounded-lg text-[#1E382B] font-semibold hover:bg-[#EAE5DA] transition-colors flex items-center gap-1.5"
              >
                {copiedJson ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedJson ? 'Copied JSON!' : 'Copy JSON Blueprint'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Detailed 8 Elements Breakdown */}
        {activeTab === 'breakdown' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Overall Theme */}
            <div className="p-6 bg-white border border-[#DDD7C9] rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-[#1E382B]">
                <Sparkles className="w-5 h-5 text-[#D97746]" />
                <h3 className="text-base font-bold text-[#1E2522]">1. Overall Theme</h3>
              </div>
              <p className="text-sm font-semibold text-[#1E382B]">
                {masterVibePromptBlueprint.overallTheme}
              </p>
              <p className="text-xs text-[#525B55] leading-relaxed">
                Replaces stereotypical clinical tech templates with a warm, tactile, editorial monograph aesthetic. Marries natural organic tranquility (mountain horizons, lofi chords, warm paper grain) with rigorous, uncompromising software engineering (Spring Boot microservices, high-recall RAG pipelines, and strict type safety).
              </p>
            </div>

            {/* 2. Color Palette */}
            <div className="p-6 bg-white border border-[#DDD7C9] rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-[#1E382B]">
                <Palette className="w-5 h-5 text-[#3A6351]" />
                <h3 className="text-base font-bold text-[#1E2522]">2. Color Palette</h3>
              </div>
              <div className="space-y-2">
                {masterVibePromptBlueprint.colorPalette.map((c) => (
                  <div key={c.name} className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-[#F8F6F0] border border-[#EAE5DA]">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: c.hex.split('/')[0].trim() }} />
                      <span className="font-semibold text-[#1E2522]">{c.name}</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#6A756E]">{c.percentage}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#525B55]">
                Strict adherence to the 60-30-10 rule: 60% neutral canvas, 30% structural surfaces, 10% high-intent focal accent.
              </p>
            </div>

            {/* 3. Layout Structure */}
            <div className="p-6 bg-white border border-[#DDD7C9] rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-[#1E382B]">
                <Layout className="w-5 h-5 text-[#1E382B]" />
                <h3 className="text-base font-bold text-[#1E2522]">3. Layout Structure</h3>
              </div>
              <ul className="space-y-1.5 text-xs text-[#525B55]">
                {masterVibePromptBlueprint.layoutStructure.slice(0, 5).map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#3A6351] font-bold">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Navigation Style */}
            <div className="p-6 bg-white border border-[#DDD7C9] rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-[#1E382B]">
                <Compass className="w-5 h-5 text-[#D97746]" />
                <h3 className="text-base font-bold text-[#1E2522]">4. Navigation Style</h3>
              </div>
              <ul className="space-y-1.5 text-xs text-[#525B55]">
                {masterVibePromptBlueprint.navigationStyle.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#3A6351] font-bold">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. Typography Preferences */}
            <div className="p-6 bg-white border border-[#DDD7C9] rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-[#1E382B]">
                <Type className="w-5 h-5 text-[#1E382B]" />
                <h3 className="text-base font-bold text-[#1E2522]">5. Typography Preferences</h3>
              </div>
              <div className="space-y-2">
                {masterVibePromptBlueprint.typographyPreferences.map((t) => (
                  <div key={t.role} className="p-2 bg-[#F8F6F0] border border-[#EAE5DA] rounded-lg text-xs space-y-0.5">
                    <div className="flex items-center justify-between font-semibold text-[#1E2522]">
                      <span>{t.role}</span>
                      <span className="font-mono text-[10px] text-[#3A6351]">{t.fontFamily}</span>
                    </div>
                    <p className="text-[11px] text-[#6A756E]">{t.usage}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Key Sections */}
            <div className="p-6 bg-white border border-[#DDD7C9] rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-[#1E382B]">
                <Layers className="w-5 h-5 text-[#3A6351]" />
                <h3 className="text-base font-bold text-[#1E2522]">6. Key Sections to Include</h3>
              </div>
              <div className="space-y-1.5 text-xs text-[#525B55]">
                {masterVibePromptBlueprint.keySections.map((sec) => (
                  <div key={sec.sectionNumber} className="flex items-start gap-2">
                    <span className="font-mono font-bold text-[#1E382B] shrink-0">{sec.sectionNumber}.</span>
                    <div>
                      <span className="font-semibold text-[#1E2522]">{sec.title}</span>
                      <p className="text-[11px] text-[#6A756E]">{sec.purpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Specific Visual Elements */}
            <div className="p-6 bg-white border border-[#DDD7C9] rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-[#1E382B]">
                <Eye className="w-5 h-5 text-[#D97746]" />
                <h3 className="text-base font-bold text-[#1E2522]">7. Specific Visual Elements</h3>
              </div>
              <ul className="space-y-1 text-xs text-[#525B55]">
                {masterVibePromptBlueprint.specificVisualElements.map((el, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#3A6351] font-bold">✔</span>
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 8. Target Audience */}
            <div className="p-6 bg-white border border-[#DDD7C9] rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-[#1E382B]">
                <Users className="w-5 h-5 text-[#1E382B]" />
                <h3 className="text-base font-bold text-[#1E2522]">8. Target Audience</h3>
              </div>
              <ul className="space-y-1.5 text-xs text-[#525B55]">
                {masterVibePromptBlueprint.targetAudience.map((aud, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#3A6351] font-bold">◆</span>
                    <span>{aud}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Interactive Customizer */}
        {activeTab === 'customizer' && (
          <div className="p-6 bg-white border border-[#DDD7C9] rounded-2xl space-y-6 shadow-xs">
            <div>
              <h2 className="text-xl font-bold text-[#1E2522]">Personalize &amp; Re-Generate Master Prompt</h2>
              <p className="text-xs text-[#525B55] mt-1">
                Customize your name, primary stack, and aesthetic archetype to generate a tailored Gemini Studio prompt instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#1E2522]">Developer Name</label>
                <input
                  type="text"
                  value={devName}
                  onChange={(e) => setDevName(e.target.value)}
                  className="w-full p-2.5 bg-[#F8F6F0] border border-[#DDD7C9] rounded-xl text-xs font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#1E2522]">Target Professional Title</label>
                <input
                  type="text"
                  value={devRole}
                  onChange={(e) => setDevRole(e.target.value)}
                  className="w-full p-2.5 bg-[#F8F6F0] border border-[#DDD7C9] rounded-xl text-xs"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-semibold text-[#1E2522]">Primary Technologies &amp; Specialties</label>
                <input
                  type="text"
                  value={primaryTech}
                  onChange={(e) => setPrimaryTech(e.target.value)}
                  className="w-full p-2.5 bg-[#F8F6F0] border border-[#DDD7C9] rounded-xl text-xs"
                />
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label className="font-semibold text-[#1E2522]">Vibe &amp; Aesthetic Preset</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'organic-craft', label: 'Organic Craft', desc: 'Warm oat & forest green' },
                    { id: 'minimal-slate', label: 'Minimal Slate', desc: 'Stark monochrome Swiss grid' },
                    { id: 'neo-brutalist', label: 'Neo-Brutalist', desc: 'Tactile borders & bold tags' },
                    { id: 'cyber-terminal', label: 'Cyber Terminal', desc: 'Obsidian & phosphor green' },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setThemeStyle(preset.id as unknown as typeof themeStyle)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        themeStyle === preset.id
                          ? 'bg-[#1E382B] text-white border-[#1E382B] shadow-xs'
                          : 'bg-[#F8F6F0] border-[#DDD7C9] text-[#1E2522] hover:border-[#1E382B]'
                      }`}
                    >
                      <span className="block font-semibold text-xs">{preset.label}</span>
                      <span className={`block text-[10px] mt-0.5 ${themeStyle === preset.id ? 'text-[#D1DCD5]' : 'text-[#6A756E]'}`}>
                        {preset.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generated snippet preview */}
            <div className="p-4 bg-[#1C231F] text-[#D1DCD5] rounded-xl border border-[#2D3830] font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#8E9B93]">
                <span>Updated Prompt Preview</span>
                <button
                  onClick={copyFullPrompt}
                  className="hover:text-white flex items-center gap-1 bg-[#27322B] px-2.5 py-1 rounded text-white"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Customized Prompt</span>
                </button>
              </div>
              <p className="line-clamp-4 text-[11px] text-[#A6B2AB]">
                {generateDynamicPrompt()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
