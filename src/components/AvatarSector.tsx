'use client';

import { useState } from 'react';
import Image from 'next/image';

interface AvatarSectorProps {
  photoUrl: string;
  avatar8BitUrl: string;
  name: string;
  title?: string;
  className?: string;
}

export default function AvatarSector({
  photoUrl,
  avatar8BitUrl,
  name,
  title = "Software Engineer",
  className = "",
}: AvatarSectorProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mode, setMode] = useState<'auto' | '8bit'>('auto');

  const activeIs8Bit = mode === '8bit' || isHovered;

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Outer Ambient Glow Ring */}
      <div 
        className={`absolute -inset-4 rounded-full blur-xl transition-all duration-700 pointer-events-none ${
          activeIs8Bit 
            ? 'bg-gradient-to-r from-emerald-500/40 via-teal-400/40 to-cyan-500/40 opacity-100 scale-110' 
            : 'bg-gradient-to-r from-indigo-500/25 via-purple-500/25 to-pink-500/25 opacity-70 scale-100'
        }`}
      />

      {/* Floating Retro 8-bit Speech Bubble */}
      <div 
        className={`absolute -top-12 z-20 transition-all duration-300 transform pointer-events-none ${
          activeIs8Bit ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90'
        }`}
      >
        <div className="bg-emerald-950/95 dark:bg-emerald-900/95 text-emerald-300 border-2 border-emerald-400 px-3 py-1 rounded-lg text-xs font-mono font-bold tracking-wider shadow-lg flex items-center gap-1.5 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>HI! 👋 WELCOME!</span>
        </div>
        {/* Tail */}
        <div className="w-3 h-3 bg-emerald-950 dark:bg-emerald-900 border-r-2 border-b-2 border-emerald-400 rotate-45 mx-auto -mt-1.5" />
      </div>

      {/* Circular Avatar Container with 3D Flip */}
      <div
        className="relative group cursor-pointer perspective-1000"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setMode(mode === '8bit' ? 'auto' : '8bit')}
        title="Click to toggle 8-bit mode!"
      >
        <div 
          className={`w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full p-1.5 bg-gradient-to-tr transition-all duration-500 shadow-xl ${
            activeIs8Bit 
              ? 'from-emerald-400 via-teal-300 to-cyan-400 shadow-emerald-500/20' 
              : 'from-zinc-300 via-zinc-400 to-zinc-200 dark:from-zinc-700 dark:via-zinc-600 dark:to-zinc-800'
          }`}
        >
          <div className="w-full h-full rounded-full overflow-hidden relative bg-auralis-panel border-2 border-white/80 dark:border-zinc-900">
            
            {/* Real Avatar Photo */}
            <div 
              className={`absolute inset-0 transition-all duration-500 ${
                activeIs8Bit ? 'opacity-0 scale-95 rotate-6' : 'opacity-100 scale-100 rotate-0'
              }`}
            >
              <img
                src={photoUrl}
                alt={name}
                className="w-full h-full object-cover object-[center_top] scale-105"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* 8-Bit Pixel Art Avatar */}
            <div 
              className={`absolute inset-0 transition-all duration-500 flex items-center justify-center bg-zinc-900 ${
                activeIs8Bit ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-95 -rotate-6'
              }`}
            >
              <img
                src={avatar8BitUrl}
                alt={`${name} 8-Bit Pixel Avatar`}
                className="w-full h-full object-cover object-center pixelated"
              />
              {/* Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
            </div>

            {/* Hover Indicator Overlay Badge */}
            <div 
              className={`absolute inset-x-0 bottom-0 py-1 bg-black/60 backdrop-blur-xs text-center text-[10px] font-mono font-semibold text-white/90 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {activeIs8Bit ? '8-BIT MODE ON 🕹️' : 'REAL PHOTO 📷'}
            </div>
          </div>
        </div>

        {/* Live Status Radar Dot */}
        <div className="absolute bottom-1 right-2 bg-zinc-900/90 dark:bg-black/90 p-1.5 rounded-full border border-zinc-700 shadow-md flex items-center gap-1.5 px-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${activeIs8Bit ? 'bg-emerald-400' : 'bg-blue-400'} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${activeIs8Bit ? 'bg-emerald-500' : 'bg-blue-500'}`} />
          </span>
          <span className="font-mono text-[10px] font-bold text-zinc-300 tracking-wider">
            {activeIs8Bit ? '8-BIT' : 'ONLINE'}
          </span>
        </div>
      </div>

      {/* Helper text under avatar */}
      <div className="mt-3 text-center">
        <p className="text-[11px] font-mono text-secondary-auralis flex items-center gap-1 justify-center">
          <span className="material-symbols-outlined text-xs text-emerald-600 dark:text-emerald-400">touch_app</span>
          <span>Hover / tap for 8-Bit Avatar</span>
        </p>
      </div>
    </div>
  );
}
