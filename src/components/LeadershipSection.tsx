'use client';

import { RESUME_DATA } from '@/data/resumeData';

export default function LeadershipSection() {
  return (
    <section id="leadership" className="max-w-[1280px] mx-auto px-6 sm:px-8 mb-20 sm:mb-28">
      {/* Module Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs font-mono font-bold bg-panel-auralis text-auralis-primary dark:text-white px-3.5 py-1.5 rounded-full border border-auralis uppercase tracking-wider">
          Leadership & Hackathons
        </span>
        <div className="h-px bg-auralis flex-grow opacity-60" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5">
          <h2 className="font-h2 text-[32px] sm:text-[44px] font-semibold text-auralis-primary dark:text-white leading-tight tracking-[-0.03em]">
            Peer Mentorship & Organizational Impact
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 flex items-end">
          <p className="text-base text-secondary-auralis leading-relaxed">
            Directing technical workshops, DSA mentorship, and leading engineering teams across university organizations and hackathon challenges.
          </p>
        </div>
      </div>

      {/* Leadership Roles Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {RESUME_DATA.leadership.map((role) => (
          <div
            key={role.id}
            className="bg-card-auralis rounded-3xl p-6 border border-auralis flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 shadow-2xs group"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {role.unit}
                </span>
              </div>

              <h3 className="text-lg font-bold text-auralis-primary dark:text-white mb-1">
                {role.title}
              </h3>
              <p className="text-xs font-mono text-secondary-auralis mb-4">
                {role.organization}
              </p>

              <ul className="space-y-2.5">
                {role.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-secondary-auralis leading-relaxed">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Hackathons & Awards Strip */}
      <div className="bg-panel-auralis rounded-3xl p-6 sm:p-8 border border-auralis">
        <h3 className="text-xs font-mono font-bold text-secondary-auralis uppercase tracking-[0.2em] mb-6">
          🏆 HACKATHON VICTORIES & NATIONAL RECOGNITIONS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESUME_DATA.achievements.map((ach) => (
            <div 
              key={ach.id} 
              className="bg-card-auralis rounded-2xl p-5 border border-auralis flex flex-col justify-between hover:shadow-xs transition-shadow"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    ach.badgeType === 'winner' 
                      ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30' 
                      : 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30'
                  }`}>
                    {ach.badge}
                  </span>
                  <span className="material-symbols-outlined text-amber-500 text-lg">emoji_events</span>
                </div>

                <h4 className="font-bold text-base text-auralis-primary dark:text-white mb-1">
                  {ach.title}
                </h4>
                <p className="text-xs text-secondary-auralis leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
