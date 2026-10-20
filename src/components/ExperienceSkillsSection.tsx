import React, { useState } from 'react';
import { Briefcase, GraduationCap, GitPullRequest, Award, BookOpen, Search, CheckCircle2 } from 'lucide-react';
import { sampleExperience, sampleContributions, sampleEducation, sampleSkills } from '../data/portfolioData';
import { soundEffects } from '../utils/uiSound';
import { SpotlightCard } from './SpotlightCard';

export const ExperienceSkillsSection: React.FC = () => {
  const [selectedJourneyTab, setSelectedJourneyTab] = useState<'work' | 'contributions' | 'education'>('work');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [skillSearch, setSkillSearch] = useState('');
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('All');

  const filteredCategories = sampleSkills
    .filter(cat => activeSkillCategory === 'All' || cat.category.toLowerCase().includes(activeSkillCategory.toLowerCase()))
    .map(cat => ({
      ...cat,
      skills: cat.skills.filter(s =>
        s.name.toLowerCase().includes(skillSearch.toLowerCase()) ||
        (s.proficiency && s.proficiency.toLowerCase().includes(skillSearch.toLowerCase()))
      )
    }))
    .filter(cat => cat.skills.length > 0);

  const marqueeTrack1 = [
    { name: 'Java', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
    { name: 'Spring Boot', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
    { name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'React', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { name: 'Next.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
    { name: 'PostgreSQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
    { name: 'Redis', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
    { name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { name: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
    { name: 'GraphQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg' },
    { name: 'FastAPI', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
    { name: 'C++', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  ];

  const marqueeTrack2 = [
    { name: 'Docker', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    { name: 'Kubernetes', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg' },
    { name: 'Apache Kafka', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg' },
    { name: 'Prometheus', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg' },
    { name: 'Grafana', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg' },
    { name: 'AWS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
    { name: 'Tailwind CSS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Git', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { name: 'GitHub', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
    { name: 'Linux', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
    { name: 'MongoDB', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
    { name: 'Nginx', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg' },
  ];

  return (
    <section id="experience" className="py-16 lg:py-24 border-t border-[#E2DDD2] bg-[#F7F4EB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Section 04: Experience, Contributions & Education (Build With Yash inspired) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-[#1E382B] bg-[#EAE5DA] px-2 py-0.5 rounded">
                  04
                </span>
                <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#1E2522] tracking-tight">
                  EXPERIENCE &amp; CONTRIBUTIONS
                </h2>
              </div>
              <p className="text-sm text-[#616B64]">
                Production internships, open-source work, and technical credentials.
              </p>
            </div>

            {/* Sub-navigation tabs (Build With Yash inspired) */}
            <div className="flex items-center gap-1.5 p-1 bg-[#EAE5DA] rounded-xl self-start max-w-fit shadow-2xs">
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedJourneyTab('work');
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all active:scale-95 flex items-center gap-1.5 ${
                  selectedJourneyTab === 'work'
                    ? 'bg-white text-[#1E2522] shadow-xs font-semibold'
                    : 'text-[#616B64] hover:text-[#1E2522]'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-[#1E382B]" />
                <span>Work Experience</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedJourneyTab('contributions');
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all active:scale-95 flex items-center gap-1.5 ${
                  selectedJourneyTab === 'contributions'
                    ? 'bg-white text-[#1E2522] shadow-xs font-semibold'
                    : 'text-[#616B64] hover:text-[#1E2522]'
                }`}
              >
                <GitPullRequest className="w-3.5 h-3.5 text-[#3A6351]" />
                <span>Open Source &amp; Impact</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedJourneyTab('education');
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all active:scale-95 flex items-center gap-1.5 ${
                  selectedJourneyTab === 'education'
                    ? 'bg-white text-[#1E2522] shadow-xs font-semibold'
                    : 'text-[#616B64] hover:text-[#1E2522]'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#D97746]" />
                <span>Education</span>
              </button>
            </div>

            {/* Tab 1: Work Experience */}
            {selectedJourneyTab === 'work' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {sampleExperience.map((exp) => (
                  <SpotlightCard
                    key={exp.id}
                    className="p-6 bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl hover:border-[#1E382B]/30 transition-all shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#EBE7DC] flex items-center justify-center text-[#1E382B] shrink-0">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-[#1E2522]">{exp.role}</h3>
                          <p className="text-xs text-[#525B55] font-medium">{exp.organization} · {exp.location}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#66726A] bg-[#EAE5DA] px-2.5 py-1 rounded-md self-start">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs text-[#4A534E] pl-2 border-l-2 border-[#DDD7C9]/80">
                      {exp.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-[#3A6351] font-bold">◆</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2 border-t border-[#EAE5DA] flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#616C65]">
                      <span className="text-[#1E382B] font-semibold">Technologies:</span>
                      {exp.technologies.map((t) => (
                        <span key={t} className="bg-[#EFECE5] px-2 py-0.5 rounded text-[#38433C]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            )}

            {/* Tab 2: Open Source & Contributions */}
            {selectedJourneyTab === 'contributions' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {sampleContributions.map((c) => (
                  <SpotlightCard
                    key={c.id}
                    className="p-6 bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl hover:border-[#1E382B]/30 transition-all shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#EBE7DC] flex items-center justify-center text-[#3A6351] shrink-0">
                          {c.type === 'Open Source' ? (
                            <GitPullRequest className="w-5 h-5" />
                          ) : c.type === 'Hackathon' ? (
                            <Award className="w-5 h-5 text-[#D97746]" />
                          ) : (
                            <BookOpen className="w-5 h-5 text-[#1E382B]" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-[#1E2522]">{c.title}</h3>
                          <p className="text-xs text-[#525B55] font-medium">{c.organization}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#1E382B] bg-[#EAE5DA] px-2.5 py-1 rounded-md self-start">
                        {c.period}
                      </span>
                    </div>

                    <p className="text-xs text-[#4A534E] leading-relaxed">
                      {c.description}
                    </p>

                    {c.metrics && (
                      <div className="pt-2 border-t border-[#EAE5DA] flex items-center gap-1.5 text-xs font-mono text-[#1E382B] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3A6351]" />
                        <span>{c.metrics}</span>
                      </div>
                    )}
                  </SpotlightCard>
                ))}
              </div>
            )}

            {/* Tab 3: Education */}
            {selectedJourneyTab === 'education' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {sampleEducation.map((edu) => (
                  <SpotlightCard
                    key={edu.id}
                    className="p-6 bg-[#FBF9F5] border border-[#DDD7C9] rounded-2xl hover:border-[#1E382B]/30 transition-all shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#EBE7DC] flex items-center justify-center text-[#D97746] shrink-0">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-[#1E2522]">{edu.degree}</h3>
                          <p className="text-xs text-[#525B55] font-medium">{edu.institution}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#66726A] bg-[#EAE5DA] px-2.5 py-1 rounded-md self-start">
                        {edu.period}
                      </span>
                    </div>

                    <p className="text-xs text-[#505A54] leading-relaxed">
                      {edu.details}
                    </p>

                    {edu.grade && (
                      <div className="pt-2 border-t border-[#EAE5DA] text-xs font-mono text-[#1E382B] font-semibold">
                        Honors: {edu.grade}
                      </div>
                    )}
                  </SpotlightCard>
                ))}
              </div>
            )}
          </div>

          {/* Section 05: Skills & Toolkit (Zero-Pill Discipline & Verified Proficiencies) */}
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

            {/* Two Premium Infinite Marquees (With Official Logos/Images) */}
            <div className="rounded-2xl p-2.5 sm:p-3 bg-[#EBE7DC]/70 border border-[#DDD7C9] space-y-2.5 overflow-hidden relative shadow-2xs">
              {/* Fade gradient masks on both sides */}
              <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#ECE8DE] via-[#ECE8DE]/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#ECE8DE] via-[#ECE8DE]/80 to-transparent z-10 pointer-events-none" />

              {/* Marquee Track 1 (Scrolling Left - Systems & Languages Images) */}
              <div className="overflow-hidden">
                <div className="animate-marquee-left flex items-center gap-2.5 select-none py-1">
                  {[...marqueeTrack1, ...marqueeTrack1].map((skill, idx) => (
                    <button
                      key={`m1-${skill.name}-${idx}`}
                      onClick={() => {
                        soundEffects.playPop();
                        setSkillSearch(skill.name);
                      }}
                      className="group relative shrink-0 w-12 h-12 rounded-xl bg-white border border-[#D5CFBF] hover:border-[#1E382B] shadow-2xs hover:shadow-md flex items-center justify-center p-2.5 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#1E382B]"
                      title={skill.name}
                      aria-label={skill.name}
                    >
                      <img
                        src={skill.iconUrl}
                        alt={skill.name}
                        className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-200"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      {/* Micro hover tooltip */}
                      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-mono whitespace-nowrap bg-[#1E2522] text-[#F3EFE6] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-md">
                        {skill.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Marquee Track 2 (Scrolling Right - AI & Infrastructure Images) */}
              <div className="overflow-hidden">
                <div className="animate-marquee-right flex items-center gap-2.5 select-none py-1">
                  {[...marqueeTrack2, ...marqueeTrack2].map((skill, idx) => (
                    <button
                      key={`m2-${skill.name}-${idx}`}
                      onClick={() => {
                        soundEffects.playPop();
                        setSkillSearch(skill.name);
                      }}
                      className="group relative shrink-0 w-12 h-12 rounded-xl bg-[#FAF8F2] border border-[#D5CFBF] hover:border-[#D97746] shadow-2xs hover:shadow-md flex items-center justify-center p-2.5 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#D97746]"
                      title={skill.name}
                      aria-label={skill.name}
                    >
                      <img
                        src={skill.iconUrl}
                        alt={skill.name}
                        className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-200"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      {/* Micro hover tooltip */}
                      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-mono whitespace-nowrap bg-[#1E2522] text-[#F3EFE6] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-md">
                        {skill.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
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
                {['All', 'Backend', 'Frontend', 'AI', 'DevOps'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveSkillCategory(cat);
                    }}
                    className={`text-[10px] font-mono px-2.5 py-1 rounded-lg transition-all ${
                      activeSkillCategory === cat
                        ? 'bg-[#1E382B] text-white font-semibold'
                        : 'bg-[#EAE5DA] text-[#55605A] hover:bg-[#DDD7C9]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills Categories with Zero-Pill Discipline */}
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
                      {category.skills.length} skills
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
