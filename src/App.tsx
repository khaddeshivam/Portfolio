import React, { useState, useEffect } from 'react';
import { LeftSidebarRail } from './components/LeftSidebarRail';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { RightProgressRail } from './components/RightProgressRail';
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
import { BottomShortcutDock } from './components/BottomShortcutDock';
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

    const sections = ['hero', 'work', 'about', 'experience', 'services', 'notes', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

      const mobileBar = document.getElementById('mobile-scroll-progress');
      if (mobileBar) {
        mobileBar.style.width = `${progress.toFixed(1)}%`;
      }

      const activeScrollY = scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (activeScrollY >= top && activeScrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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

          {/* Subtle Right Progress Rail */}
          <RightProgressRail activeSection={activeSection} />

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

      {/* Mobile Subtle Top Scroll Progress Indicator */}
      {currentView === 'portfolio' && (
        <div className="lg:hidden fixed top-0 left-0 right-0 h-[2.5px] bg-transparent z-50 pointer-events-none">
          <div
            id="mobile-scroll-progress"
            className="h-full bg-[#1E382B] transition-all duration-150 origin-left"
            style={{ width: '0%' }}
          />
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

      {/* Subtle Floating Bottom Shortcut Dock */}
      {currentView === 'portfolio' && (
        <BottomShortcutDock
          onOpenCommand={() => {
            soundEffects.playPop();
            setIsCommandOpen(true);
          }}
          onOpenResume={() => {
            soundEffects.playClick();
            setIsResumeOpen(true);
          }}
          onOpenContact={() => handleOpenContact('collaboration')}
          onScrollToTop={() => scrollToSection('hero')}
        />
      )}

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
