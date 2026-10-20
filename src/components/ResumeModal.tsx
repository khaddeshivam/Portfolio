import React, { useState } from 'react';
import { X, Download, Printer, Check, MapPin, Mail, Github, Linkedin, Briefcase, GraduationCap } from 'lucide-react';
import { portfolioProfile, sampleExperience, sampleSkills, sampleProjects } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    // Simulate real PDF trigger
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl border border-[#DDD7C9] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="px-6 py-3.5 bg-[#F5F2EA] border-b border-[#E5E0D5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#1E382B] bg-[#EAE5DA] px-2 py-0.5 rounded">
              CV
            </span>
            <span className="text-xs font-semibold text-[#1E2522]">
              Shivam_Khadde_Resume_2025.pdf
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1E382B] rounded-lg hover:bg-[#2A4B3A] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              {downloaded ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloaded ? 'Downloaded PDF!' : 'Download PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6A756E] hover:text-[#1E2522] hover:bg-[#EAE5DA] transition-colors"
              aria-label="Close resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Document Body */}
        <div className="p-8 sm:p-10 space-y-6 overflow-y-auto bg-white font-sans text-xs sm:text-sm text-[#2A332E]">
          {/* Header */}
          <div className="border-b border-[#EAE5DA] pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1E2522] tracking-tight">{portfolioProfile.name}</h1>
              <p className="text-sm font-semibold text-[#1E382B] mt-0.5">Software Engineer · Full-Stack &amp; Applied AI</p>
              <p className="text-xs text-[#5D6761] mt-1 flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#3A6351]" />
                Pune, India · Available for global remote &amp; on-site roles
              </p>
            </div>

            <div className="space-y-1 text-right text-xs font-mono text-[#525B55]">
              <p>khaddeshivam@gmail.com</p>
              <p>github.com/shivamkhadde</p>
              <p>linkedin.com/in/shivamkhadde</p>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase font-bold text-[#1E382B] tracking-wider mb-2">
              Engineering Summary
            </h2>
            <p className="text-xs text-[#424A45] leading-relaxed">
              Software Engineer with deep expertise in Java, Spring Boot 3, modern web applications (React, Next.js, TypeScript), and Applied AI (RAG, embeddings, model orchestration). Passionate about high-concurrency microservices, data consistency, and elegant user-centric software.
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase font-bold text-[#1E382B] tracking-wider">
              Experience
            </h2>
            {sampleExperience.map((exp) => (
              <div key={exp.id} className="space-y-1.5">
                <div className="flex items-center justify-between font-medium">
                  <span className="font-bold text-[#1E2522]">{exp.role} · <span className="font-normal text-[#5A645F]">{exp.organization}</span></span>
                  <span className="text-xs font-mono text-[#7A867F]">{exp.period}</span>
                </div>
                <ul className="space-y-1 text-xs text-[#4B544F] list-disc list-inside">
                  {exp.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Selected Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase font-bold text-[#1E382B] tracking-wider">
              Key Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sampleProjects.slice(0, 4).map((p) => (
                <div key={p.id} className="p-3 bg-[#F8F6F0] rounded-xl border border-[#EAE5DA] space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#1E2522]">
                    <span>{p.title}</span>
                    <span className="text-[10px] font-mono text-[#3A6351]">{p.category}</span>
                  </div>
                  <p className="text-[11px] text-[#555E58] line-clamp-2">{p.description}</p>
                  <p className="text-[10px] font-mono text-[#7A867F] pt-1">{p.tags.join(' · ')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Toolkit */}
          <div>
            <h2 className="text-xs font-mono uppercase font-bold text-[#1E382B] tracking-wider mb-2">
              Technical Toolkit
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {sampleSkills.map((cat) => (
                <div key={cat.category} className="p-2.5 bg-[#FBF9F5] border border-[#EAE5DA] rounded-lg">
                  <span className="font-bold text-[#1E2522] block mb-1 text-[11px] font-mono">{cat.category}</span>
                  <p className="text-[11px] text-[#555E58] leading-snug">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
