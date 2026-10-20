import React from 'react';
import { ArrowRight, Monitor, LayoutGrid, Database, Cpu, Sparkles } from 'lucide-react';
import { sampleServices } from '../data/portfolioData';

interface ServicesSectionProps {
  onOpenInquiry: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenInquiry }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Monitor': return <Monitor className="w-5 h-5 text-[#1E382B]" />;
      case 'LayoutGrid': return <LayoutGrid className="w-5 h-5 text-[#1E382B]" />;
      case 'Database': return <Database className="w-5 h-5 text-[#1E382B]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#1E382B]" />;
      default: return <Sparkles className="w-5 h-5 text-[#1E382B]" />;
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 border-t border-[#E5E0D5] bg-[#F7F4EB]">
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

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleServices.map((svc) => (
            <div
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
                onClick={() => onOpenInquiry(svc.title)}
                className="mt-6 pt-3 border-t border-[#EAE5DA] flex items-center gap-1.5 text-xs font-semibold text-[#1E382B] hover:text-[#2D5A42] transition-colors"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Have a different idea CTA Card */}
        <div className="p-8 bg-[#EFEBE1] border border-[#DBD5C6] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1E2522]">
              Have a different idea?
            </h3>
            <p className="text-sm text-[#525C56] max-w-xl">
              Tell me about your project, timeline, and architectural challenges—let's build something genuinely useful together.
            </p>
          </div>

          <button
            onClick={() => onOpenInquiry()}
            className="px-6 py-3 text-sm font-semibold text-white bg-[#1E382B] rounded-xl hover:bg-[#2A4B3A] transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm"
          >
            <span>Start a conversation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
