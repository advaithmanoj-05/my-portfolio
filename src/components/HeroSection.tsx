'use client';

import { useState } from 'react';
import { RESUME_DATA } from '@/data/resumeData';
import AvatarSector from './AvatarSector';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<'telemetry' | 'stack' | 'architecture'>('telemetry');

  return (
    <div className="pt-[110px] pb-12 overflow-hidden">
      {/* SECTION 1: HERO HEADLINE & CIRCULAR AVATAR SECTOR */}
      <section id="about" className="max-w-[1280px] mx-auto px-6 sm:px-8 mb-16 sm:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subtitle, CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Header Tag */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full">
                {RESUME_DATA.personal.statusText}
              </span>
              <span className="text-xs font-mono text-secondary-auralis">
                📍 {RESUME_DATA.personal.location}
              </span>
            </div>

            {/* Main Headline (Ref2 tight negative tracking style) */}
            <h1 className="font-h1 text-[42px] sm:text-[62px] lg:text-[76px] font-semibold tracking-[-0.04em] leading-[1.05] text-auralis-primary dark:text-white">
              Engineering Scalable Systems & Full-Stack Architectures
            </h1>

            {/* Bio Paragraph */}
            <p className="text-base sm:text-lg text-secondary-auralis font-normal leading-relaxed max-w-2xl">
              {RESUME_DATA.personal.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="#projects" 
                className="bg-auralis-primary text-white dark:bg-white dark:text-black px-7 py-3.5 rounded-full font-medium text-sm transition-all hover:opacity-90 shadow-sm flex items-center gap-2"
              >
                <span>View Featured Projects</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
              <a 
                href={RESUME_DATA.personal.github}
                target="_blank"
                rel="noreferrer"
                className="bg-transparent border border-auralis text-auralis-primary dark:text-white px-7 py-3.5 rounded-full font-medium text-sm transition-all hover:bg-panel-auralis flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">code</span>
                <span>GitHub @{RESUME_DATA.personal.githubHandle}</span>
              </a>
            </div>

            {/* Active Tech Stack Quick Pills */}
            <div className="pt-4 border-t border-auralis/60">
              <span className="text-[11px] font-mono uppercase tracking-widest text-secondary-auralis font-semibold block mb-3">
                Core Engineering Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {RESUME_DATA.personal.activeStack.map((tech) => (
                  <span 
                    key={tech}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-card-auralis border border-auralis text-auralis-primary dark:text-zinc-200 shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Circular Avatar Sector with 8-bit Hover Effect */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <div className="bg-card-auralis rounded-[2.5rem] p-8 border border-auralis shadow-sm w-full max-w-md relative overflow-hidden flex flex-col items-center">
              
              {/* Top Card Badge */}
              <div className="w-full flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-mono uppercase font-semibold text-secondary-auralis tracking-wider">
                    DEVELOPER PROFILE
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-auralis-primary dark:text-white bg-panel-auralis px-2.5 py-1 rounded-full border border-auralis">
                  {RESUME_DATA.personal.shortName}
                </span>
              </div>

              {/* The Circular Avatar Sector Component */}
              <AvatarSector 
                photoUrl={RESUME_DATA.personal.photoUrl}
                avatar8BitUrl={RESUME_DATA.personal.avatar8BitUrl}
                name={RESUME_DATA.personal.name}
                title={RESUME_DATA.personal.title}
                className="my-2"
              />

              {/* Quick Info Footer inside Card */}
              <div className="w-full mt-6 pt-4 border-t border-auralis text-center">
                <h3 className="font-bold text-lg text-auralis-primary dark:text-white tracking-tight">
                  {RESUME_DATA.personal.name}
                </h3>
                <p className="text-xs font-mono text-secondary-auralis mt-0.5">
                  {RESUME_DATA.personal.title}
                </p>
                <div className="flex items-center justify-center gap-4 mt-3">
                  <a 
                    href={RESUME_DATA.personal.linkedin} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-xs text-secondary-auralis hover:text-auralis-primary dark:hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">link</span>
                    <span>LinkedIn</span>
                  </a>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <a 
                    href={RESUME_DATA.personal.leetcode} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-xs text-secondary-auralis hover:text-auralis-primary dark:hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">terminal</span>
                    <span>LeetCode</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: HERO PRODUCT PANEL (Auralis System / Telemetry Interactive Widget) */}
      <section id="architecture" className="max-w-[1280px] mx-auto px-6 sm:px-8 mb-20 sm:mb-28">
        <div className="bg-panel-auralis rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 flex flex-col relative overflow-hidden border border-auralis min-h-[580px] justify-between">
          
          {/* Top Panel Bar */}
          <div className="flex flex-wrap justify-between items-center gap-4 z-10">
            {/* Tabs */}
            <div className="flex bg-card-auralis p-1 rounded-full border border-auralis shadow-2xs">
              <button 
                onClick={() => setActiveTab('telemetry')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'telemetry' 
                    ? 'bg-auralis-primary text-white dark:bg-white dark:text-black shadow-xs' 
                    : 'text-secondary-auralis hover:text-auralis-primary dark:hover:text-white'
                }`}
              >
                Telemetry Matrix
              </button>
              <button 
                onClick={() => setActiveTab('stack')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'stack' 
                    ? 'bg-auralis-primary text-white dark:bg-white dark:text-black shadow-xs' 
                    : 'text-secondary-auralis hover:text-auralis-primary dark:hover:text-white'
                }`}
              >
                Backend & Cloud API
              </button>
              <button 
                onClick={() => setActiveTab('architecture')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'architecture' 
                    ? 'bg-auralis-primary text-white dark:bg-white dark:text-black shadow-xs' 
                    : 'text-secondary-auralis hover:text-auralis-primary dark:hover:text-white'
                }`}
              >
                LAN & Edge Deployment
              </button>
            </div>

            {/* Status Pill */}
            <div className="bg-card-auralis px-4 py-2 rounded-full border border-auralis flex items-center gap-2 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono font-medium text-auralis-primary dark:text-white">
                LIVE TELEMETRY ENGINE
              </span>
            </div>
          </div>

          {/* Ambient Glowing Orbs Background (Ref2 aesthetic) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80">
            <div className="w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/30 blur-3xl absolute -ml-40" />
            <div className="w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-400/30 blur-3xl absolute ml-40 mt-10" />
            <div className="w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-cyan-400/20 to-blue-500/30 blur-3xl absolute -mt-20" />
          </div>

          {/* Center Interactive Widget (Glassmorphism Card) */}
          <div className="z-10 my-8 flex items-center justify-center">
            <div className="w-full max-w-[540px] bg-white/40 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/60 dark:border-zinc-700/60 rounded-[2rem] p-6 sm:p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] flex flex-col gap-6">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400 block mb-1">
                    SYSTEM ARCHITECTURE // V2.0
                  </span>
                  <h4 className="text-base font-bold text-auralis-primary dark:text-white tracking-tight">
                    {activeTab === 'telemetry' && 'Full-Stack Performance & Mentorship Engine'}
                    {activeTab === 'stack' && 'FastAPI + Qwen LLM Cloud Inference'}
                    {activeTab === 'architecture' && 'LAN-First Offline Healthcare Architecture'}
                  </h4>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/15 px-3 py-1.5 rounded-full border border-emerald-500/25">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider font-mono">
                    ACTIVE
                  </span>
                </div>
              </div>

              {/* Spectral Soundwave / Performance Bars (Ref2 design element) */}
              <div className="flex items-end justify-between h-20 gap-1.5 px-2 bg-black/5 dark:bg-black/30 rounded-xl p-3 border border-black/5 dark:border-white/5">
                {[35, 50, 75, 60, 90, 100, 80, 65, 85, 45, 70, 55, 40, 60, 80, 95, 70, 50].map((height, i) => (
                  <div 
                    key={i}
                    style={{ height: `${height}%` }}
                    className={`w-1.5 rounded-full transition-all duration-500 ${
                      i % 3 === 0 
                        ? 'bg-gradient-to-t from-emerald-500/40 to-emerald-400' 
                        : i % 3 === 1 
                        ? 'bg-gradient-to-t from-indigo-500/40 to-indigo-400' 
                        : 'bg-gradient-to-t from-cyan-500/40 to-teal-400'
                    }`}
                  />
                ))}
              </div>

              {/* Metrics Grid inside Widget */}
              <div className="grid grid-cols-3 gap-4 pt-1">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-secondary-auralis font-semibold">
                    API Latency
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-auralis-primary dark:text-white font-mono">18</span>
                    <span className="text-xs text-secondary-auralis font-medium">ms</span>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-secondary-auralis font-semibold">
                    CGPA Score
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-auralis-primary dark:text-white font-mono">7.80</span>
                    <span className="text-xs text-secondary-auralis font-medium">/10</span>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-secondary-auralis font-semibold">
                    Uptime
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-auralis-primary dark:text-white font-mono">99.9</span>
                    <span className="text-xs text-secondary-auralis font-medium">%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Bar with Tech Badges */}
          <div className="flex flex-wrap justify-between items-center gap-4 z-10 bg-card-auralis/80 backdrop-blur-md p-4 rounded-2xl border border-auralis">
            <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs sm:text-sm font-medium text-auralis-primary dark:text-white whitespace-nowrap">
                ⚡ FastAPI REST Services
              </span>
              <span className="text-xs sm:text-sm font-medium text-secondary-auralis whitespace-nowrap">
                ☕ Spring Boot Architecture
              </span>
              <span className="text-xs sm:text-sm font-medium text-secondary-auralis whitespace-nowrap">
                ⚛️ React / Next.js SSR
              </span>
              <span className="text-xs sm:text-sm font-medium text-secondary-auralis whitespace-nowrap">
                🐘 PostgreSQL & Supabase
              </span>
              <span className="text-xs sm:text-sm font-medium text-secondary-auralis whitespace-nowrap">
                ☁️ Cloudflare Workers
              </span>
            </div>
            <a 
              href="#contact" 
              className="bg-auralis-primary text-white dark:bg-white dark:text-black px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap hover:opacity-90 transition-opacity"
            >
              Get In Touch
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
