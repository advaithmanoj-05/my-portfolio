'use client';

import { RESUME_DATA } from '@/data/resumeData';

export default function MetricsBar() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 sm:px-8 mb-20 sm:mb-28">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs font-mono font-bold bg-panel-auralis text-auralis-primary dark:text-white px-3.5 py-1.5 rounded-full border border-auralis uppercase tracking-wider">
          Key Performance Telemetry
        </span>
        <div className="h-px bg-auralis flex-grow opacity-60" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {RESUME_DATA.metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-card-auralis rounded-2xl p-6 border border-auralis flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 shadow-2xs group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all" />

            <div className="flex justify-between items-start mb-4 z-10">
              <span className="text-xs font-mono font-bold text-secondary-auralis uppercase tracking-wider">
                {metric.label}
              </span>
              <span className="material-symbols-outlined text-secondary-auralis group-hover:text-auralis-primary dark:group-hover:text-white transition-colors">
                {metric.icon}
              </span>
            </div>

            <div className="z-10">
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-auralis-primary dark:text-white font-mono tracking-tight">
                  {metric.value}
                </span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  {metric.unit}
                </span>
              </div>
              <p className="text-xs text-secondary-auralis">
                {metric.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
