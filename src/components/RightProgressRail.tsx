import React, { useState, useEffect } from 'react';

interface RightProgressRailProps {
  activeSection: string;
}

export const RightProgressRail: React.FC<RightProgressRailProps> = ({ activeSection }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const percentage = Math.round(scrollProgress * 100);

  return (
    <aside
      className="fixed right-3.5 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-2 select-none pointer-events-none"
      aria-label="Scroll progress rail"
    >
      {/* Percentage telemetry */}
      <span className="text-[9px] font-mono tabular-nums text-[#8E9B93] font-medium tracking-wider">
        {percentage}%
      </span>

      {/* Subtle vertical spine track */}
      <div className="relative w-[2px] h-28 bg-[#E2DDD2] rounded-full overflow-hidden">
        <div
          className="w-full bg-[#1E382B] rounded-full transition-transform duration-100 ease-out origin-top"
          style={{
            height: '100%',
            transform: `scaleY(${scrollProgress})`
          }}
        />
      </div>

      {/* Active Section Label */}
      <span className="text-[8px] font-mono tracking-widest text-[#7D8881] uppercase font-semibold [writing-mode:vertical-rl] rotate-180 mt-1 max-h-16 truncate">
        {activeSection}
      </span>
    </aside>
  );
};
