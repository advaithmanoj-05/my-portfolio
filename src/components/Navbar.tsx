'use client';

import { useState, useEffect } from 'react';
import { RESUME_DATA } from '@/data/resumeData';

export default function Navbar() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-[#F7F7F5]/90 dark:bg-[#090a0c]/90 border-zinc-300/70 dark:border-zinc-800/80 shadow-sm backdrop-blur-md' 
          : 'bg-[#F7F7F5]/70 dark:bg-[#090a0c]/70 border-zinc-200/40 dark:border-zinc-800/40 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 flex justify-between items-center h-[72px]">
        {/* Brand Logo & Identifier */}
        <div className="flex items-center gap-8 sm:gap-12">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-auralis-primary text-auralis-card dark:bg-white dark:text-black flex items-center justify-center font-extrabold text-sm tracking-tighter group-hover:scale-105 transition-transform">
              AM
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tighter text-auralis-primary dark:text-white leading-none">
                {RESUME_DATA.personal.name}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-secondary-auralis uppercase font-medium mt-0.5">
                SDE // SYS.ARCH
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <a href="#about" className="text-secondary-auralis hover:text-auralis-primary dark:hover:text-white transition-colors">
              Overview
            </a>
            <a 
              href="#ai-chat" 
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/25 hover:scale-105 active:scale-98 transition-all duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>AI CHAT</span>
              <span className="text-[10px]">🤖</span>
            </a>
            <a href="#architecture" className="text-secondary-auralis hover:text-auralis-primary dark:hover:text-white transition-colors">
              Telemetry
            </a>
            <a href="#experience" className="text-secondary-auralis hover:text-auralis-primary dark:hover:text-white transition-colors">
              Experience
            </a>
            <a href="#projects" className="text-secondary-auralis hover:text-auralis-primary dark:hover:text-white transition-colors">
              Projects
            </a>
            <a href="#leadership" className="text-secondary-auralis hover:text-auralis-primary dark:hover:text-white transition-colors">
              Leadership
            </a>
            <a href="#academics" className="text-secondary-auralis hover:text-auralis-primary dark:hover:text-white transition-colors">
              Academics
            </a>
          </div>
        </div>

        {/* Right Tools & Call To Action */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Availability Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">
              {RESUME_DATA.personal.availability}
            </span>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-full border border-auralis bg-card-auralis flex items-center justify-center text-auralis-primary dark:text-white hover:bg-panel-auralis transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px] dark:hidden">dark_mode</span>
            <span className="material-symbols-outlined text-[18px] hidden dark:inline">light_mode</span>
          </button>

          {/* Contact / Terminal CTA */}
          <a 
            href="#contact" 
            className="bg-auralis-primary text-white dark:bg-white dark:text-black px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all hover:opacity-90 active:scale-98 shadow-sm flex items-center gap-1.5"
          >
            <span>Get in touch</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
