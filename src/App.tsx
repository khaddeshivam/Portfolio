import React, { useState, useEffect } from 'react';
import { LeftSidebarRail } from './components/LeftSidebarRail';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { InteractiveCraftLab } from './components/InteractiveCraftLab';
import { AboutSection } from './components/AboutSection';
import { ExperienceSkillsSection } from './components/ExperienceSkillsSection';
import { ServicesSection } from './components/ServicesSection';
import { BuildNotesSection } from './components/BuildNotesSection';
import { ContactFooterSection } from './components/ContactFooterSection';
import { PromptStudioView } from './components/PromptStudioView';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { BuildNoteModal } from './components/BuildNoteModal';
import { ResumeModal } from './components/ResumeModal';
import { ContactModal } from './components/ContactModal';
import { CommandPalette } from './components/CommandPalette';
import { Project, BuildNote } from './types/portfolio';
import { soundEffects } from './utils/uiSound';
import { lofiEngine } from './utils/audioSynth';
import { Music2, Play, Pause, ChevronUp } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'portfolio' | 'blueprint'>('portfolio');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileIsPlaying, setMobileIsPlaying] = useState(false);

  // Modal States
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedNote, setSelectedNote] = useState<BuildNote | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactInitialType, setContactInitialType] = useState<string>('career');
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Scroll spy tracking
  useEffect(() => {
    if (currentView !== 'portfolio') return;

    const sections = ['hero', 'work', 'craft-lab', 'about', 'experience', 'services', 'notes', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Global keyboard shortcuts (⌘K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        soundEffects.playPop();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (sectionId: string) => {
    soundEffects.playPop();
    if (currentView !== 'portfolio') {
      setCurrentView('portfolio');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = (type = 'career') => {
    soundEffects.playClick();
    setContactInitialType(type);
    setIsContactOpen(true);
  };

  const toggleMobileAudio = () => {
    soundEffects.playClick();
    const playing = lofiEngine.toggle();
    setMobileIsPlaying(playing);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#1E2522]">
      {/* Top Header Navbar */}
      <TopNav
        currentView={currentView}
        onViewChange={(view) => {
          soundEffects.playPop();
          setCurrentView(view);
        }}
        onNavigate={scrollToSection}
        onOpenContact={() => handleOpenContact('career')}
      />

      {currentView === 'blueprint' ? (
        <PromptStudioView onReturnToPortfolio={() => setCurrentView('portfolio')} />
      ) : (
        <div className="relative flex">
          {/* Persistent Left Aesthetic Rail */}
          <LeftSidebarRail
            activeSection={activeSection}
            onNavigate={scrollToSection}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />

          {/* Main Portfolio Content Stream */}
          <main
            className={`flex-1 transition-all duration-300 w-full overflow-x-hidden ${
              isSidebarCollapsed ? 'lg:pl-6' : 'lg:pl-[76px] xl:pl-[84px]'
            }`}
          >
            <HeroSection
              onExploreWork={() => scrollToSection('work')}
              onDiscussProject={() => handleOpenContact('freelance')}
            />

            <SelectedWorkSection
              onSelectProject={(project) => {
                soundEffects.playClick();
                setSelectedProject(project);
              }}
            />

            <InteractiveCraftLab />

            <AboutSection
              onOpenResume={() => {
                soundEffects.playClick();
                setIsResumeOpen(true);
              }}
              onOpenContact={() => handleOpenContact('career')}
            />

            <ExperienceSkillsSection />

            <ServicesSection
              onOpenInquiry={(title) => handleOpenContact(title ? `Service: ${title}` : 'freelance')}
            />

            <BuildNotesSection
              onSelectNote={(note) => {
                soundEffects.playClick();
                setSelectedNote(note);
              }}
            />

            <ContactFooterSection
              onOpenResume={() => {
                soundEffects.playClick();
                setIsResumeOpen(true);
              }}
              onOpenContact={handleOpenContact}
              onOpenCommand={() => {
                soundEffects.playPop();
                setIsCommandOpen(true);
              }}
            />
          </main>
        </div>
      )}

      {/* Mobile Floating Sound Pill (for screens where left rail is hidden) */}
      {currentView === 'portfolio' && (
        <div className="lg:hidden fixed bottom-4 left-4 z-40 flex items-center gap-2 p-1.5 bg-[#1E2522]/95 backdrop-blur-md text-white rounded-full border border-white/20 shadow-xl">
          <button
            onClick={toggleMobileAudio}
            className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white active:scale-95"
            aria-label="Toggle lofi audio"
          >
            {mobileIsPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
          <span className="text-[10px] font-mono pr-2">
            {mobileIsPlaying ? 'Playing Lofi' : 'Lofi Study'}
          </span>
        </div>
      )}

      {/* Interactive Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenInquiry={(title) => {
          setSelectedProject(null);
          handleOpenContact(`Project: ${title}`);
        }}
      />

      <BuildNoteModal
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        initialType={contactInitialType}
        onClose={() => setIsContactOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={scrollToSection}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => handleOpenContact('career')}
        onOpenPromptStudio={() => setCurrentView('blueprint')}
      />
    </div>
  );
}
