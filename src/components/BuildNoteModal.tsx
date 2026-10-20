import React from 'react';
import { X, Clock, Calendar, Bookmark, Share2 } from 'lucide-react';
import { BuildNote } from '../types/portfolio';

interface BuildNoteModalProps {
  note: BuildNote | null;
  onClose: () => void;
}

export const BuildNoteModal: React.FC<BuildNoteModalProps> = ({ note, onClose }) => {
  if (!note) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-2xl border border-[#DDD7C9] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#F5F2EA] border-b border-[#E5E0D5] flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-mono text-[#6A756E]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {note.date}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {note.readTime}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#6A756E] hover:text-[#1E2522] hover:bg-[#EAE5DA] transition-colors"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {note.tags.map((t) => (
                <span key={t} className="text-[10px] font-mono uppercase bg-[#EAE5DA] text-[#1E382B] px-2 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#1E2522] leading-tight">
              {note.title}
            </h1>
            <p className="text-sm font-medium text-[#5A655F] mt-2">
              {note.subtitle}
            </p>
          </div>

          <div className="p-4 bg-[#EFECE5] rounded-xl border border-[#DDD7C9] text-xs text-[#454E48] italic leading-relaxed">
            "{note.summary}"
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#38413B] leading-relaxed">
            {note.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#F5F2EA] border-t border-[#E5E0D5] flex items-center justify-between">
          <span className="text-xs font-mono text-[#7A867F]">
            Author: Shivam Khadde · Software Engineer
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#1E382B] rounded-lg hover:bg-[#2A4B3A] transition-colors"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
