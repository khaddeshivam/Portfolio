import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, Database } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenInquiry: (title?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, onOpenInquiry }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-2xl border border-[#DDD7C9] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#F5F2EA] border-b border-[#E5E0D5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#1E382B] bg-[#EAE5DA] px-2 py-0.5 rounded">
              {project.number}
            </span>
            <span className="text-xs font-mono tracking-wider text-[#6A756E] uppercase">
              {project.tagline}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#6A756E] hover:text-[#1E2522] hover:bg-[#EAE5DA] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          <div>
            <h2 className="text-2xl font-bold text-[#1E2522] mb-2">{project.title}</h2>
            <p className="text-sm text-[#505A54] leading-relaxed">{project.description}</p>
          </div>

          {/* Stats Bar */}
          {project.stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#EFECE5] rounded-xl border border-[#DDD7C9]">
              {project.stats.map((stat, i) => (
                <div key={i}>
                  <span className="text-[10px] font-mono text-[#7A867F] block uppercase truncate">{stat.label}</span>
                  <span className="text-sm font-bold font-mono text-[#1E2522]">{stat.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Key Architectural Highlights */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase font-bold text-[#1E382B] tracking-wider">
              Architectural &amp; Engineering Decisions
            </h3>
            <ul className="space-y-2 text-xs text-[#4A5550]">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 p-2 bg-white rounded-lg border border-[#EAE5DA]">
                  <CheckCircle2 className="w-4 h-4 text-[#3A6351] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Chips */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase font-bold text-[#1E382B] tracking-wider">
              Technologies &amp; Protocols
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs font-mono px-2.5 py-1 bg-white border border-[#DDD7C9] rounded-md text-[#2C3530]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#F5F2EA] border-t border-[#E5E0D5] flex items-center justify-between gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-xs font-semibold text-[#1E2522] bg-white border border-[#DDD7C9] rounded-xl hover:bg-[#EAE5DA] transition-colors flex items-center gap-1.5"
          >
            <Github className="w-4 h-4" />
            <span>View Source on GitHub</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenInquiry(project.title);
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1E382B] rounded-xl hover:bg-[#2A4B3A] transition-colors"
          >
            Inquire About Similar Build
          </button>
        </div>
      </div>
    </div>
  );
};
