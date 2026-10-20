import React, { useState, useEffect } from 'react';
import { Camera, Clock, Sliders, Sparkles, Download, Check, Play, Pause, RotateCcw, Zap, Layers, Image as ImageIcon } from 'lucide-react';
import { soundEffects } from '../utils/uiSound';
import { SpotlightCard } from './SpotlightCard';

export const InteractiveCraftLab: React.FC = () => {
  const [activeLabTab, setActiveLabTab] = useState<'retro' | 'focus' | 'compressor' | 'components'>('retro');

  // 1. Retro Photo Card State (inspired by samworks.vercel.app)
  const [photoCaption, setPhotoCaption] = useState('Considered Craft · Pune Ridge');
  const [photoDate, setPhotoDate] = useState('OCT 2024');
  const [photoFilter, setPhotoFilter] = useState<'alpine' | 'golden' | 'emerald' | 'mono'>('golden');
  const [cardDownloaded, setCardDownloaded] = useState(false);

  // 2. Focus Timer State (inspired by Timmo on samworks.vercel.app)
  const [focusSeconds, setFocusSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusSessionCount, setFocusSessionCount] = useState(3);

  useEffect(() => {
    let interval: number;
    if (isTimerRunning && focusSeconds > 0) {
      interval = window.setInterval(() => {
        setFocusSeconds((prev) => prev - 1);
      }, 1000);
    } else if (focusSeconds === 0) {
      soundEffects.playSuccess();
      setIsTimerRunning(false);
      setFocusSessionCount((c) => c + 1);
      setFocusSeconds(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, focusSeconds]);

  const toggleFocusTimer = () => {
    soundEffects.playClick();
    setIsTimerRunning(!isTimerRunning);
  };

  const resetFocusTimer = () => {
    soundEffects.playPop();
    setIsTimerRunning(false);
    setFocusSeconds(25 * 60);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 3. Media Compressor Simulation State (inspired by MiniFolio on samworks.vercel.app)
  const [compressionRatio, setCompressionRatio] = useState(82);
  const originalSizeMB = 4.8;
  const compressedSizeMB = (originalSizeMB * (1 - compressionRatio / 100)).toFixed(2);

  // 4. Interactive Components State
  const [toggleState, setToggleState] = useState(true);
  const [springCount, setSpringCount] = useState(42);

  const handleDownloadCard = () => {
    soundEffects.playSuccess();
    setCardDownloaded(true);
    setTimeout(() => setCardDownloaded(false), 2500);
  };

  return (
    <section id="craft-lab" className="py-16 lg:py-24 border-t border-[#E2DDD2] bg-[#F4F0E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-[#1E382B] bg-[#EAE5DA] px-2 py-0.5 rounded">
                LAB
              </span>
              <span className="text-xs font-mono tracking-widest text-[#616B64] uppercase font-semibold">
                DESIGN-ENGINEER INTERACTIVE PLAYGROUND
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#1E2522] tracking-tight">
              Craft Experiments &amp; Mini-Apps
            </h2>
            <p className="text-sm text-[#616B64] mt-1 max-w-2xl">
              Inspired by the playful, tactile design-engineering ethos of <strong>samworks.vercel.app</strong>—interactive widgets built with React, Web Audio, and thoughtful microinteractions.
            </p>
          </div>

          {/* Interactive Navigation Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#E8E2D5] rounded-xl self-start md:self-auto shadow-2xs">
            {[
              { id: 'retro', label: 'Retro Photo Card', icon: <Camera className="w-3.5 h-3.5" /> },
              { id: 'focus', label: 'Focus Timer (Timmo)', icon: <Clock className="w-3.5 h-3.5" /> },
              { id: 'compressor', label: 'Media Optimizer', icon: <Sliders className="w-3.5 h-3.5" /> },
              { id: 'components', label: 'Micro-UI Lab', icon: <Zap className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundEffects.playPop();
                  setActiveLabTab(tab.id as unknown as typeof activeLabTab);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 active:scale-95 ${
                  activeLabTab === tab.id
                    ? 'bg-[#1E382B] text-white shadow-xs'
                    : 'text-[#5B6660] hover:text-[#1E2522]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Retro Photo Card Studio */}
        {activeLabTab === 'retro' && (
          <SpotlightCard className="p-6 sm:p-8 bg-white border border-[#DDD7C9] rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Controls */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <span className="text-xs font-mono font-bold text-[#D97746] uppercase tracking-wider block mb-1">
                    01 · Retro Photo Card Generator
                  </span>
                  <h3 className="text-xl font-bold text-[#1E2522]">Nostalgic Polaroid Canvas</h3>
                  <p className="text-xs text-[#525B55] mt-1 leading-relaxed">
                    Customize your vintage analog card with warm tonal presets, dates, and bespoke typography. Directly inspired by Samiran De's Retro Photo Card tool on samworks.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-[#1E2522] block">Card Caption / Memoir</label>
                    <input
                      type="text"
                      value={photoCaption}
                      onChange={(e) => {
                        soundEffects.playKey();
                        setPhotoCaption(e.target.value);
                      }}
                      className="w-full p-2.5 bg-[#F8F6F0] border border-[#DDD7C9] rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-[#1E382B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-[#1E2522] block">Timestamp Tag</label>
                    <input
                      type="text"
                      value={photoDate}
                      onChange={(e) => {
                        soundEffects.playKey();
                        setPhotoDate(e.target.value);
                      }}
                      className="w-full p-2.5 bg-[#F8F6F0] border border-[#DDD7C9] rounded-xl font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#1E382B]"
                    />
                  </div>

                  {/* Filter Tone Preset Buttons */}
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#1E2522] block">Vintage Film Stock Tone</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'golden', label: 'Golden Hour', color: '#D97746' },
                        { id: 'alpine', label: 'Warm Alpine', color: '#8E9B93' },
                        { id: 'emerald', label: 'Pine Forest', color: '#1E382B' },
                        { id: 'mono', label: 'Leica Noir', color: '#2A332E' },
                      ].map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => {
                            soundEffects.playPop();
                            setPhotoFilter(preset.id as unknown as typeof photoFilter);
                          }}
                          className={`p-2 rounded-xl border text-center transition-all ${
                            photoFilter === preset.id
                              ? 'bg-[#1E382B] text-white border-[#1E382B] shadow-xs'
                              : 'bg-[#F8F6F0] border-[#DDD7C9] text-[#1E2522] hover:border-[#1E382B]'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full mx-auto block mb-1" style={{ backgroundColor: preset.color }} />
                          <span className="text-[10px] font-medium block truncate">{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={handleDownloadCard}
                    className="px-5 py-2.5 bg-[#1E382B] hover:bg-[#2A4B3A] text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 shadow-xs active:scale-95"
                  >
                    {cardDownloaded ? <Check className="w-3.5 h-3.5 text-[#98C379]" /> : <Download className="w-3.5 h-3.5" />}
                    <span>{cardDownloaded ? 'Polaroid Captured!' : 'Download Polaroid Photo'}</span>
                  </button>
                </div>
              </div>

              {/* Live Rendered Polaroid Card */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-72 sm:w-80 p-4 pb-6 bg-[#FCFBF7] rounded-xl border border-[#D5CFBF] shadow-xl space-y-3 transform hover:rotate-1 transition-transform duration-300">
                  {/* Photo area with filter */}
                  <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-[#2D3831] border border-black/10">
                    <img
                      src="/src/assets/images/about_portrait_nature_1792492425530.jpg"
                      alt="Polaroid preview"
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        photoFilter === 'mono'
                          ? 'grayscale contrast-125'
                          : photoFilter === 'golden'
                          ? 'sepia-[0.35] brightness-105'
                          : photoFilter === 'emerald'
                          ? 'hue-rotate-15 contrast-110'
                          : 'brightness-95 contrast-105'
                      }`}
                    />
                    {/* Vignette Overlay */}
                    <div className="absolute inset-0 bg-radial from-transparent to-black/35 pointer-events-none" />
                  </div>

                  {/* Handwritten Polaroid Bottom */}
                  <div className="pt-2 text-center space-y-0.5">
                    <p className="font-serif-italic text-base sm:text-lg text-[#1E2522] tracking-wide">
                      {photoCaption}
                    </p>
                    <p className="font-mono text-[10px] text-[#7C8780] tracking-widest uppercase">
                      {photoDate} · SHIVAM KHADDE CRAFT LAB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        )}

        {/* Tab 2: Focus & Consistency Timer (Timmo inspired) */}
        {activeLabTab === 'focus' && (
          <SpotlightCard className="p-6 sm:p-8 bg-white border border-[#DDD7C9] rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#3A6351] uppercase tracking-wider block mb-1">
                    02 · Productivity &amp; Consistency Engine
                  </span>
                  <h3 className="text-xl font-bold text-[#1E2522]">Deep-Work Focus Block</h3>
                  <p className="text-xs text-[#525B55] mt-1 leading-relaxed">
                    Modeled after Samiran De's <em>Timmo</em> project on samworks. Pair focused 25-minute engineering sprints with ambient background lofi beats.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <div className="p-3 bg-[#F8F6F0] rounded-xl border border-[#DDD7C9]">
                    <span className="text-[10px] text-[#7A867F] block uppercase">Completed</span>
                    <span className="font-bold text-base text-[#1E382B]">{focusSessionCount} sprints</span>
                  </div>
                  <div className="p-3 bg-[#F8F6F0] rounded-xl border border-[#DDD7C9]">
                    <span className="text-[10px] text-[#7A867F] block uppercase">Daily Goal</span>
                    <span className="font-bold text-base text-[#D97746]">6 sprints</span>
                  </div>
                  <div className="p-3 bg-[#F8F6F0] rounded-xl border border-[#DDD7C9]">
                    <span className="text-[10px] text-[#7A867F] block uppercase">Streak</span>
                    <span className="font-bold text-base text-[#3A6351]">14 days 🔥</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={toggleFocusTimer}
                    className="px-6 py-2.5 bg-[#1E382B] hover:bg-[#2A4B3A] text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 shadow-xs active:scale-95"
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isTimerRunning ? 'Pause Sprint' : 'Start 25-Min Sprint'}</span>
                  </button>

                  <button
                    onClick={resetFocusTimer}
                    className="p-2.5 bg-[#EFECE4] hover:bg-[#E5E0D5] text-[#1E2522] rounded-xl transition-colors border border-[#DBD6C9]"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Timer Display Widget */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-52 h-52 rounded-full border-4 border-[#EAE5DA] flex flex-col items-center justify-center p-4 bg-[#FBF9F5] shadow-inner">
                  {/* Outer animated ring */}
                  <div
                    className="absolute inset-0 rounded-full border-4 border-[#1E382B] transition-all duration-1000"
                    style={{
                      clipPath: `polygon(50% 50%, 0 0, ${((25 * 60 - focusSeconds) / (25 * 60)) * 100}% 0, 100% 0, 100% 100%, 0 100%, 0 0)`
                    }}
                  />
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-[#1E2522] tracking-tight tabular-nums">
                    {formatTimer(focusSeconds)}
                  </span>
                  <span className="text-[11px] font-mono text-[#7A867F] mt-1 uppercase tracking-widest">
                    {isTimerRunning ? 'Focus Active' : 'Ready to Build'}
                  </span>
                </div>
              </div>
            </div>
          </SpotlightCard>
        )}

        {/* Tab 3: Media Optimizer (MiniFolio inspired) */}
        {activeLabTab === 'compressor' && (
          <SpotlightCard className="p-6 sm:p-8 bg-white border border-[#DDD7C9] rounded-2xl shadow-sm">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#1E382B] uppercase tracking-wider block mb-1">
                  03 · Client-Side Compression Architecture
                </span>
                <h3 className="text-xl font-bold text-[#1E2522]">In-Browser Media Optimizer</h3>
                <p className="text-xs text-[#525B55] mt-1 max-w-2xl leading-relaxed">
                  Inspired by <em>MiniFolio</em> from samworks—high-performance in-browser WebAssembly compression that respects client privacy with zero server hops.
                </p>
              </div>

              {/* Interactive Compressor Slider */}
              <div className="p-6 bg-[#F8F6F0] rounded-2xl border border-[#DDD7C9] space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-[#1E2522]">Target Quality / Compression Rate</span>
                  <span className="font-bold text-[#1E382B] bg-[#EAE5DA] px-2.5 py-1 rounded-md">
                    {compressionRatio}% Smaller
                  </span>
                </div>

                <input
                  type="range"
                  min="40"
                  max="95"
                  value={compressionRatio}
                  onChange={(e) => {
                    soundEffects.playKey();
                    setCompressionRatio(Number(e.target.value));
                  }}
                  className="w-full h-2 bg-[#DDD7C9] rounded-lg appearance-none cursor-pointer accent-[#1E382B]"
                />

                <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs font-mono">
                  <div className="p-3 bg-white rounded-xl border border-[#DDD7C9]">
                    <span className="text-[10px] text-[#7A867F] block uppercase">Original Asset</span>
                    <span className="font-bold text-sm text-[#1E2522]">{originalSizeMB} MB</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#DDD7C9]">
                    <span className="text-[10px] text-[#7A867F] block uppercase">Optimized WebP</span>
                    <span className="font-bold text-sm text-[#3A6351]">{compressedSizeMB} MB</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#DDD7C9]">
                    <span className="text-[10px] text-[#7A867F] block uppercase">Bandwidth Saved</span>
                    <span className="font-bold text-sm text-[#D97746]">
                      {(originalSizeMB - Number(compressedSizeMB)).toFixed(2)} MB
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        )}

        {/* Tab 4: Micro-UI Lab */}
        {activeLabTab === 'components' && (
          <SpotlightCard className="p-6 sm:p-8 bg-white border border-[#DDD7C9] rounded-2xl shadow-sm">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#D97746] uppercase tracking-wider block mb-1">
                  04 · Tactile Interaction Lab
                </span>
                <h3 className="text-xl font-bold text-[#1E2522]">Microinteraction Component Primitives</h3>
                <p className="text-xs text-[#525B55] mt-1 max-w-2xl leading-relaxed">
                  Tactile primitives with buttery spring transitions, sound design feedback, and cursor magnetism.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                {/* 1. Liquid Toggle Switch */}
                <div className="p-4 bg-[#F8F6F0] rounded-xl border border-[#DDD7C9] flex flex-col justify-between space-y-3">
                  <div>
                    <span className="font-semibold text-[#1E2522] block">Liquid State Toggle</span>
                    <span className="text-[10px] text-[#7A867F]">Tactile switch with audio pop</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-mono text-[11px] text-[#424C46]">{toggleState ? 'Active State' : 'Muted State'}</span>
                    <button
                      onClick={() => {
                        soundEffects.playPop();
                        setToggleState(!toggleState);
                      }}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                        toggleState ? 'bg-[#1E382B]' : 'bg-[#DDD7C9]'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                          toggleState ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* 2. Spring Counter */}
                <div className="p-4 bg-[#F8F6F0] rounded-xl border border-[#DDD7C9] flex flex-col justify-between space-y-3">
                  <div>
                    <span className="font-semibold text-[#1E2522] block">Spring Metric Stepper</span>
                    <span className="text-[10px] text-[#7A867F]">Haptic counter microinteraction</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => {
                        soundEffects.playKey();
                        setSpringCount((c) => Math.max(0, c - 1));
                      }}
                      className="w-8 h-8 rounded-lg bg-white border border-[#DDD7C9] flex items-center justify-center font-mono font-bold hover:bg-[#EAE5DA] active:scale-90 transition-all"
                    >
                      -
                    </button>
                    <span className="font-mono text-lg font-bold text-[#1E2522]">{springCount}</span>
                    <button
                      onClick={() => {
                        soundEffects.playKey();
                        setSpringCount((c) => c + 1);
                      }}
                      className="w-8 h-8 rounded-lg bg-white border border-[#DDD7C9] flex items-center justify-center font-mono font-bold hover:bg-[#EAE5DA] active:scale-90 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 3. Magnetic Success Chime */}
                <div className="p-4 bg-[#F8F6F0] rounded-xl border border-[#DDD7C9] flex flex-col justify-between space-y-3">
                  <div>
                    <span className="font-semibold text-[#1E2522] block">Audio Chord Trigger</span>
                    <span className="text-[10px] text-[#7A867F]">3-note harmonic synthesizer</span>
                  </div>

                  <button
                    onClick={() => soundEffects.playSuccess()}
                    className="w-full py-2 bg-[#EAE5DA] hover:bg-[#1E382B] hover:text-white text-[#1E2522] font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 active:scale-95 shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D97746]" />
                    <span>Play Harmonic Chime</span>
                  </button>
                </div>
              </div>
            </div>
          </SpotlightCard>
        )}
      </div>
    </section>
  );
};
