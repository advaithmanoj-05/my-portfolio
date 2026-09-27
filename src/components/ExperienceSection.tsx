'use client';

import { useState } from 'react';
import { RESUME_DATA } from '@/data/resumeData';

export default function ExperienceSection() {
  const [selectedId, setSelectedId] = useState<string>(RESUME_DATA.experiences[0].id);

  const activeExp = RESUME_DATA.experiences.find(e => e.id === selectedId) || RESUME_DATA.experiences[0];

  return (
    <section id="experience" className="max-w-[1280px] mx-auto px-6 sm:px-8 mb-20 sm:mb-28">
      {/* Module Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs font-mono font-bold bg-panel-auralis text-auralis-primary dark:text-white px-3.5 py-1.5 rounded-full border border-auralis uppercase tracking-wider">
          Experience & Engineering Roles
        </span>
        <div className="h-px bg-auralis flex-grow opacity-60" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-5">
          <h2 className="font-h2 text-[32px] sm:text-[44px] font-semibold text-auralis-primary dark:text-white leading-tight tracking-[ -0.03em]">
            Production Backend & Healthcare Architecture
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 flex items-end">
          <p className="text-base text-secondary-auralis leading-relaxed">
            Hands-on software development across enterprise fintech, live e-commerce REST APIs, and localized LAN-first medical record systems.
          </p>
        </div>
      </div>

      {/* Experience Showcase Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Company Selector Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {RESUME_DATA.experiences.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setSelectedId(exp.id)}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                selectedId === exp.id
                  ? 'bg-card-auralis border-auralis-primary dark:border-white shadow-sm ring-1 ring-auralis-primary/20 dark:ring-white/20'
                  : 'bg-panel-auralis/60 border-auralis hover:bg-card-auralis text-secondary-auralis'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {exp.badge}
                </span>
                <span className="text-[11px] font-mono text-secondary-auralis">
                  {exp.timeline}
                </span>
              </div>
              <h4 className="font-bold text-base text-auralis-primary dark:text-white">
                {exp.company}
              </h4>
              <p className="text-xs text-secondary-auralis font-mono mt-0.5">
                {exp.role}
              </p>
            </button>
          ))}
        </div>

        {/* Selected Experience Detail Panel */}
        <div className="lg:col-span-8 bg-card-auralis rounded-3xl p-6 sm:p-8 border border-auralis shadow-sm min-h-[380px] flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="flex flex-wrap justify-between items-start gap-4 pb-6 border-b border-auralis">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">
                  {activeExp.badge} // {activeExp.location}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-auralis-primary dark:text-white">
                  {activeExp.role}
                </h3>
                <p className="text-sm font-medium text-secondary-auralis mt-0.5">
                  {activeExp.company}
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-panel-auralis px-3 py-1.5 rounded-full border border-auralis text-auralis-primary dark:text-white">
                🗓️ {activeExp.timeline}
              </span>
            </div>

            {/* Key Highlights */}
            <div className="py-6 flex flex-col gap-4">
              <span className="text-xs font-mono uppercase font-bold text-secondary-auralis tracking-widest">
                Key Accomplishments & System Deliverables:
              </span>
              <ul className="space-y-3">
                {activeExp.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-auralis-primary dark:text-zinc-200">
                    <span className="material-symbols-outlined text-emerald-500 text-lg mt-0.5 shrink-0">
                      check_circle
                    </span>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills Badges */}
          <div className="pt-4 border-t border-auralis flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-secondary-auralis mr-2">Technologies:</span>
            {activeExp.skills.map((skill) => (
              <span 
                key={skill}
                className="text-xs font-mono px-3 py-1 rounded-full bg-panel-auralis border border-auralis text-auralis-primary dark:text-zinc-300"
              >
                {skill}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
