import React from 'react';
import { ArrowUpRight, BookOpen, Clock, FileText } from 'lucide-react';
import { sampleBuildNotes } from '../data/portfolioData';
import { BuildNote } from '../types/portfolio';

interface BuildNotesSectionProps {
  onSelectNote: (note: BuildNote) => void;
}

export const BuildNotesSection: React.FC<BuildNotesSectionProps> = ({ onSelectNote }) => {
  return (
    <section id="notes" className="py-16 lg:py-24 border-t border-[#E5E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-[#1E382B] bg-[#EAE5DA] px-2 py-0.5 rounded">
                07
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#1E2522] tracking-tight">
                BUILD NOTES
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#616B64]">
              Thoughts, learnings, and implementation notes from active production systems.
            </p>
          </div>

          <button
            onClick={() => onSelectNote(sampleBuildNotes[0])}
            className="self-start sm:self-auto text-xs font-semibold text-[#1E382B] hover:text-[#2A4B3A] transition-colors flex items-center gap-1.5 px-3 py-1.5 bg-[#EAE5DA] rounded-lg"
          >
            <span>View all notes</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleBuildNotes.map((note, idx) => (
            <div
              key={note.id}
              onClick={() => onSelectNote(note)}
              className="cursor-pointer group flex flex-col justify-between p-5 bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl hover:border-[#1E382B]/40 hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                {/* Visual Thumbnail */}
                <div className="relative rounded-xl overflow-hidden h-28 bg-[#232B26] border border-[#DDD7C9] flex items-center justify-center p-3">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-mono text-[#98C379] tracking-wider uppercase block">
                      NOTE 0{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-white line-clamp-1 block">
                      {note.tags[0]} · {note.tags[1]}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[9px] font-mono text-white flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{note.readTime}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#1E2522] group-hover:text-[#1E382B] transition-colors leading-snug">
                    {note.title}
                  </h3>
                  <p className="text-xs text-[#525B55] mt-1.5 line-clamp-2 leading-relaxed">
                    {note.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EAE5DA] flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-[#7A867F]">{note.date}</span>
                <span className="font-semibold text-[#1E382B] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>Read note</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
