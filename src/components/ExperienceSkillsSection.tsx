import React, { useState } from 'react';
import { Briefcase, GraduationCap, Compass, Layers, CheckCircle2, ChevronRight, Search, Zap } from 'lucide-react';
import { sampleExperience, sampleSkills } from '../data/portfolioData';
import { soundEffects } from '../utils/uiSound';
import { SpotlightCard } from './SpotlightCard';

export const ExperienceSkillsSection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [skillSearch, setSkillSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Backend' | 'Frontend' | 'AI / ML' | 'Tools & Others'>('All');

  const filteredCategories = sampleSkills
    .filter(cat => activeTab === 'All' || cat.category === activeTab)
    .map(cat => ({
      ...cat,
      skills: cat.skills.filter(s =>
        s.name.toLowerCase().includes(skillSearch.toLowerCase()) ||
        (s.proficiency && s.proficiency.toLowerCase().includes(skillSearch.toLowerCase()))
      )
    }))
    .filter(cat => cat.skills.length > 0);

  return (
    <section id="experience" className="py-16 lg:py-24 border-t border-[#E2DDD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Section 04: Experience & Education */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-[#1E382B] bg-[#EAE5DA] px-2 py-0.5 rounded">
                  04
                </span>
                <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#1E2522] tracking-tight">
                  EXPERIENCE &amp; EDUCATION
                </h2>
              </div>
              <p className="text-sm text-[#616B64]">My engineering journey so far.</p>
            </div>

            {/* Timeline cards */}
            <div className="space-y-4">
              {/* TecheQube Intern */}
              <SpotlightCard className="p-5 bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl hover:border-[#1E382B]/30 transition-all shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EBE7DC] flex items-center justify-center text-[#1E382B]">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#1E2522]">Software Engineering Intern</h3>
                      <p className="text-xs text-[#525B55] font-medium">TecheQube (or your company)</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#66726A] bg-[#EAE5DA] px-2.5 py-1 rounded-md shrink-0">
                    Jun 2024 – Aug 2024
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-[#4A534E] pl-2 border-l-2 border-[#DDD7C9]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#3A6351] font-bold">◆</span>
                    <span>Worked on backend services using Java and Spring Boot</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3A6351] font-bold">◆</span>
                    <span>Contributed to REST APIs, caching layers, and database optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3A6351] font-bold">◆</span>
                    <span>Collaborated closely with cross-functional teams on full-stack features</span>
                  </li>
                </ul>
              </SpotlightCard>

              {/* Bachelor of Engineering */}
              <SpotlightCard className="p-5 bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl hover:border-[#1E382B]/30 transition-all shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EBE7DC] flex items-center justify-center text-[#1E382B]">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#1E2522]">Bachelor of Engineering</h3>
                      <p className="text-xs text-[#525B55] font-medium">Computer Science and Engineering</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#66726A] bg-[#EAE5DA] px-2.5 py-1 rounded-md shrink-0">
                    2021 – 2025
                  </span>
                </div>

                <p className="text-xs text-[#505A54] leading-relaxed">
                  Relevant coursework: Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, AI/ML.
                </p>
              </SpotlightCard>

              {/* Continuous Learning */}
              <SpotlightCard className="p-5 bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl hover:border-[#1E382B]/30 transition-all shadow-xs space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EBE7DC] flex items-center justify-center text-[#1E382B]">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#1E2522]">Continuous Learning</h3>
                      <p className="text-xs text-[#525B55] font-medium">Building projects and exploring new technologies</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#66726A] bg-[#EAE5DA] px-2.5 py-1 rounded-md shrink-0">
                    2025 – Present
                  </span>
                </div>
                <p className="text-xs text-[#505A54]">
                  Focus: Java, Full-Stack, GenAI, RAG Architectures, and Product Development.
                </p>
              </SpotlightCard>
            </div>
          </div>

          {/* Section 05: Skills & Toolkit */}
          <div id="skills" className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-[#1E382B] bg-[#EAE5DA] px-2 py-0.5 rounded">
                  05
                </span>
                <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#1E2522] tracking-tight">
                  SKILLS &amp; TOOLKIT
                </h2>
              </div>
              <p className="text-sm text-[#616B64]">Disciplined technical competencies.</p>
            </div>

            {/* Interactive Search & Filter Controls */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E9B93]" />
                <input
                  type="text"
                  placeholder="Filter skills (e.g. Java, Docker, RAG)..."
                  value={skillSearch}
                  onChange={(e) => {
                    soundEffects.playKey();
                    setSkillSearch(e.target.value);
                  }}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FBF9F5] border border-[#DDD7C9] rounded-xl text-[#1E2522] placeholder:text-[#8E9B93] focus:outline-none focus:ring-1 focus:ring-[#1E382B]"
                />
              </div>

              {/* Category tabs */}
              <div className="flex flex-wrap gap-1">
                {(['All', 'Backend', 'Frontend', 'AI / ML', 'Tools & Others'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveTab(tab);
                    }}
                    className={`text-[10px] font-mono px-2.5 py-1 rounded-lg transition-all ${
                      activeTab === tab
                        ? 'bg-[#1E382B] text-white font-semibold'
                        : 'bg-[#EAE5DA] text-[#55605A] hover:bg-[#DDD7C9]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              {filteredCategories.map((category) => (
                <SpotlightCard
                  key={category.category}
                  className="p-4 bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase font-bold text-[#1E382B] tracking-wider">
                      {category.category}
                    </span>
                    <span className="text-[10px] font-mono text-[#7D8881]">
                      {category.skills.length} tools
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <button
                        key={skill.name}
                        onClick={() => {
                          soundEffects.playPop();
                          setSelectedSkill(selectedSkill === skill.name ? null : skill.name);
                        }}
                        className={`text-xs px-2.5 py-1 rounded-md border font-mono transition-all text-left active:scale-95 ${
                          selectedSkill === skill.name
                            ? 'bg-[#1E382B] text-white border-[#1E382B] shadow-xs'
                            : skill.highlight
                            ? 'bg-white border-[#DDD7C9] text-[#1E2522] hover:border-[#1E382B]'
                            : 'bg-[#F2EFE8] border-[#E2DDCF] text-[#4F5953] hover:border-[#1E382B]'
                        }`}
                        title={skill.proficiency}
                      >
                        <span>{skill.name}</span>
                        {skill.proficiency && selectedSkill === skill.name && (
                          <span className="ml-1 text-[10px] text-[#A6B2AB]">({skill.proficiency})</span>
                        )}
                      </button>
                    ))}
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
