import React, { useState } from 'react';
import { ArrowRight, Monitor, LayoutGrid, Database, Cpu, Sparkles, CheckCircle2, Calculator } from 'lucide-react';
import { sampleServices } from '../data/portfolioData';
import { soundEffects } from '../utils/uiSound';
import { SpotlightCard } from './SpotlightCard';

interface ServicesSectionProps {
  onOpenInquiry: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenInquiry }) => {
  const [selectedServiceType, setSelectedServiceType] = useState('AI Prototype');
  const [selectedScope, setSelectedScope] = useState<'mvp' | 'scale'>('mvp');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Monitor': return <Monitor className="w-5 h-5 text-[#1E382B]" />;
      case 'LayoutGrid': return <LayoutGrid className="w-5 h-5 text-[#1E382B]" />;
      case 'Database': return <Database className="w-5 h-5 text-[#1E382B]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#1E382B]" />;
      default: return <Sparkles className="w-5 h-5 text-[#1E382B]" />;
    }
  };

  const getScopeDetails = () => {
    if (selectedScope === 'mvp') {
      return {
        timeline: '2 – 3 weeks',
        stack: 'Next.js 14, Spring Boot / FastAPI, Tailwind CSS, Vercel/Cloud Run',
        focus: 'Fast validation, robust core auth & DB schemas, production-ready deploy'
      };
    }
    return {
      timeline: '4 – 8 weeks',
      stack: 'Distributed Spring Cloud, PostgreSQL indexing, Redis caching, RAG Pipeline',
      focus: 'High concurrency, resilient microservice contracts, end-to-end telemetry'
    };
  };

  const scopeInfo = getScopeDetails();

  return (
    <section id="services" className="py-16 lg:py-24 border-t border-[#E2DDD2] bg-[#F7F4EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold text-[#1E382B] bg-[#EAE5DA] px-2 py-0.5 rounded">
              06
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#1E2522] tracking-tight">
              SERVICES
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#616B64]">
            WHAT I CAN HELP YOU BUILD · From a focused MVP release to distributed cloud systems.
          </p>
        </div>

        {/* 4 Cards Grid with SpotlightCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleServices.map((svc) => (
            <SpotlightCard
              key={svc.id}
              className="flex flex-col justify-between p-6 bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl hover:border-[#1E382B]/40 hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#EBE7DC] flex items-center justify-center group-hover:bg-[#1E382B] group-hover:text-white transition-colors">
                  {getIcon(svc.iconName)}
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#1E2522] mb-1.5">{svc.title}</h3>
                  <p className="text-xs text-[#525B55] leading-relaxed">{svc.description}</p>
                </div>

                <div className="pt-2 border-t border-[#EAE5DA] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#7A867F] tracking-wider block">Deliverables</span>
                  <ul className="text-[11px] text-[#4E5651] space-y-1">
                    {svc.deliverables.slice(0, 3).map((d, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-[#3A6351]">·</span>
                        <span className="truncate">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenInquiry(svc.title);
                }}
                className="mt-6 pt-3 border-t border-[#EAE5DA] flex items-center gap-1.5 text-xs font-semibold text-[#1E382B] hover:text-[#2D5A42] transition-colors"
              >
                <span>Inquire this capability</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </SpotlightCard>
          ))}
        </div>

        {/* Interactive Scope & Architecture Planner Widget */}
        <SpotlightCard className="p-6 sm:p-8 bg-[#EFEBE1] border border-[#DBD5C6] rounded-2xl shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDD7C9]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#1E382B] text-white rounded-xl">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1E2522]">Interactive Scope &amp; Architecture Planner</h3>
                <p className="text-xs text-[#5A645E]">Select target parameters to preview recommended stack and turnaround</p>
              </div>
            </div>

            {/* Scope Toggle */}
            <div className="p-1 bg-[#E2DDCF] rounded-xl flex items-center gap-1 text-xs font-mono self-start sm:self-auto">
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedScope('mvp');
                }}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedScope === 'mvp' ? 'bg-[#1E382B] text-white font-bold shadow-xs' : 'text-[#58635C] hover:text-black'
                }`}
              >
                Sprint MVP
              </button>
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedScope('scale');
                }}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedScope === 'scale' ? 'bg-[#1E382B] text-white font-bold shadow-xs' : 'text-[#58635C] hover:text-black'
                }`}
              >
                Production Scale
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 bg-white/80 rounded-xl border border-[#DDD7C9] space-y-1">
              <span className="text-[10px] text-[#7A867F] uppercase tracking-wider block">Estimated Turnaround</span>
              <span className="text-sm font-bold text-[#1E382B] block">{scopeInfo.timeline}</span>
            </div>

            <div className="p-3 bg-white/80 rounded-xl border border-[#DDD7C9] space-y-1">
              <span className="text-[10px] text-[#7A867F] uppercase tracking-wider block">Recommended Architecture</span>
              <span className="text-xs font-medium text-[#1E2522] block truncate">{scopeInfo.stack}</span>
            </div>

            <div className="p-3 bg-white/80 rounded-xl border border-[#DDD7C9] space-y-1">
              <span className="text-[10px] text-[#7A867F] uppercase tracking-wider block">Engineering Focus</span>
              <span className="text-xs font-medium text-[#3A6351] block truncate">{scopeInfo.focus}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <span className="text-xs text-[#525C56]">
              Ready to construct something reliable with considered craft?
            </span>
            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenInquiry(`Architecture Inquiry (${selectedScope === 'mvp' ? 'Sprint MVP' : 'Production Scale'})`);
              }}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#1E382B] rounded-xl hover:bg-[#2A4B3A] transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95"
            >
              <span>Discuss this scope</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};
