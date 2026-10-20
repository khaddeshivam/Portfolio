import React, { useState, useEffect } from 'react';
import { LeftSidebarRail } from './components/LeftSidebarRail';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
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

export default function App() {
  const [currentView, setCurrentView] = useState<'portfolio' | 'blueprint'>('portfolio');
  const [activeSection, setActiveSection] = useState<string>('hero');

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
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (sectionId: string) => {
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
    setContactInitialType(type);
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#1E2522]">
      {/* Top Header Navbar */}
      <TopNav
        currentView={currentView}
        onViewChange={setCurrentView}
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
          />

          {/* Main Portfolio Content Stream */}
          <main className="flex-1 lg:pl-20 xl:pl-24 w-full overflow-x-hidden">
            <HeroSection
              onExploreWork={() => scrollToSection('work')}
              onDiscussProject={() => handleOpenContact('freelance')}
            />

            <SelectedWorkSection
              onSelectProject={(project) => setSelectedProject(project)}
            />

            <AboutSection
              onOpenResume={() => setIsResumeOpen(true)}
              onOpenContact={() => handleOpenContact('career')}
            />

            <ExperienceSkillsSection />

            <ServicesSection
              onOpenInquiry={(title) => handleOpenContact(title ? `Service: ${title}` : 'freelance')}
            />

            <BuildNotesSection
              onSelectNote={(note) => setSelectedNote(note)}
            />

            <ContactFooterSection
              onOpenResume={() => setIsResumeOpen(true)}
              onOpenContact={handleOpenContact}
              onOpenCommand={() => setIsCommandOpen(true)}
            />
          </main>
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
