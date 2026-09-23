import React from 'react';
import { Droplets } from 'lucide-react';

interface Props {
  scrollProgress: number; // 0 to 1
}

export const GlassBackgroundAnimation: React.FC<Props> = ({ scrollProgress }) => {
  const cleanPercentage = Math.min(100, Math.max(0, Math.round(scrollProgress * 100)));

  return (
    <div
      id="glass-animation-container"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* 1. Pristine Clean Glass Atmosphere (Matte Obsidian & Subtle Steel Sheen) */}
      <div
        id="pristine-glass-layer"
        className="absolute inset-0 bg-[#090b0e]"
      >
        {/* Subtle executive dark gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_0%,rgba(38,42,54,0.35),transparent)]" />
        
        {/* Discreet titanium glass reflection */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(125deg,transparent_30%,rgba(255,255,255,0.06)_45%,rgba(220,225,235,0.04)_50%,transparent_65%)]" />
      </div>

      {/* 2. Dirty Post-Construction Glass Overlay (Wiped clean as user scrolls down) */}
      <div
        id="dirty-glass-layer"
        className="absolute inset-0 transition-[clip-path] duration-150 ease-out"
        style={{
          clipPath: `inset(${cleanPercentage}% 0 0 0)`,
          background: 'rgba(12, 14, 18, 0.90)',
          backdropFilter: 'blur(2.5px)'
        }}
      >
        {/* Post-construction fine dust pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dust-pattern-clean" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="25" r="2" fill="#e2e8f0" opacity="0.4" />
              <ellipse cx="80" cy="65" rx="4" ry="2.5" fill="#94a3b8" opacity="0.3" />
              <circle cx="105" cy="100" r="1.5" fill="#cbd5e1" opacity="0.3" />
              <circle cx="45" cy="85" r="1" fill="#f8fafc" opacity="0.35" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dust-pattern-clean)" />
        </svg>
      </div>

      {/* 3. Sleek Titanium Squeegee Line */}
      <div
        id="squeegee-blade-bar"
        className="absolute left-0 right-0 z-10 transition-[top] duration-150 ease-out pointer-events-none"
        style={{
          top: `${cleanPercentage}%`,
          transform: 'translateY(-50%)'
        }}
      >
        {/* Titanium blade glint */}
        <div className="h-[1.5px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-80 shadow-[0_0_8px_rgba(255,255,255,0.35)]" />
      </div>

      {/* 4. Desktop Status Pill */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-auto hidden sm:flex items-center gap-2 bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg">
        <Droplets className="w-3.5 h-3.5 text-zinc-300" />
        <span className="text-[11px] text-zinc-400">Vidro:</span>
        <span className="text-xs font-semibold text-zinc-200 tabular-nums">{cleanPercentage}% Limpo</span>
      </div>
    </div>
  );
};
