'use client';

import { useState } from 'react';
import { RESUME_DATA, Project } from '@/data/resumeData';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = RESUME_DATA.projects.filter(project => {
    if (activeFilter === 'all') return true;
    return project.category.includes(activeFilter);
  });

  return (
    <section id="projects" className="max-w-[1280px] mx-auto px-6 sm:px-8 mb-20 sm:mb-28">
      {/* Module Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs font-mono font-bold bg-panel-auralis text-auralis-primary dark:text-white px-3.5 py-1.5 rounded-full border border-auralis uppercase tracking-wider">
          Featured Architecture & Projects
        </span>
        <div className="h-px bg-auralis flex-grow opacity-60" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-end">
        <div className="lg:col-span-6">
          <h2 className="font-h2 text-[32px] sm:text-[44px] font-semibold text-auralis-primary dark:text-white leading-tight tracking-[-0.03em]">
            Production Applications & Technical Engineering
          </h2>
        </div>
        
        {/* Category Filter Pills */}
        <div className="lg:col-span-6 flex flex-wrap gap-2 lg:justify-end">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'featured', label: 'Featured' },
            { id: 'ai-cloud', label: 'AI & Cloud' },
            { id: 'fullstack', label: 'Full-Stack' },
            { id: 'systems', label: 'Systems & IoT' },
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-auralis-primary text-white dark:bg-white dark:text-black shadow-xs'
                  : 'bg-card-auralis text-secondary-auralis border border-auralis hover:text-auralis-primary dark:hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-card-auralis rounded-3xl p-6 border border-auralis hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-2xs hover:shadow-md"
          >
            {/* Ambient Blur Glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div>
              {/* Badge & Top Info */}
              <div className="flex justify-between items-center mb-4 z-10 relative">
                <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {project.badge}
                </span>
                <span className="text-[10px] font-mono font-bold text-secondary-auralis uppercase">
                  {project.highlightText}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-auralis-primary dark:text-white tracking-tight mb-3 z-10 relative group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-secondary-auralis leading-relaxed mb-6 z-10 relative line-clamp-4">
                {project.description}
              </p>
            </div>

            {/* Bottom Actions & Tech Tags */}
            <div className="z-10 relative pt-4 border-t border-auralis">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t) => (
                  <span 
                    key={t}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-panel-auralis border border-auralis text-secondary-auralis"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono font-bold text-auralis-primary dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">code</span>
                  <span>Source Code</span>
                </a>
                
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-mono text-secondary-auralis hover:text-auralis-primary dark:hover:text-white transition-colors flex items-center gap-0.5"
                >
                  <span>Details</span>
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card-auralis rounded-3xl p-6 sm:p-8 border border-auralis max-w-xl w-full relative shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-panel-auralis border border-auralis flex items-center justify-center text-auralis-primary dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>

            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">
              {selectedProject.badge} // {selectedProject.highlightText}
            </span>

            <h3 className="text-2xl font-bold text-auralis-primary dark:text-white mb-4">
              {selectedProject.title}
            </h3>

            <p className="text-sm text-secondary-auralis leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <div className="mb-6">
              <span className="text-xs font-mono font-bold text-secondary-auralis uppercase block mb-2">
                Tech Stack Architecture:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((t) => (
                  <span 
                    key={t}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-panel-auralis border border-auralis text-auralis-primary dark:text-zinc-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-auralis">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-full text-xs font-mono text-secondary-auralis hover:text-auralis-primary dark:hover:text-white"
              >
                Close
              </button>
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-auralis-primary text-white dark:bg-white dark:text-black px-5 py-2 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 hover:opacity-90"
              >
                <span>View Repository</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
