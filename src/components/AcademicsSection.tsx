'use client';

import { RESUME_DATA } from '@/data/resumeData';

export default function AcademicsSection() {
  const { education, certifications } = RESUME_DATA;

  return (
    <section id="academics" className="max-w-[1280px] mx-auto px-6 sm:px-8 mb-20 sm:mb-28">
      {/* Module Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs font-mono font-bold bg-panel-auralis text-auralis-primary dark:text-white px-3.5 py-1.5 rounded-full border border-auralis uppercase tracking-wider">
          Academics & Certifications
        </span>
        <div className="h-px bg-auralis flex-grow opacity-60" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Education Card */}
        <div className="lg:col-span-7 bg-card-auralis rounded-3xl p-6 sm:p-8 border border-auralis flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                {education.semester}
              </span>
              <span className="text-xs font-mono font-bold text-auralis-primary dark:text-white bg-panel-auralis px-3 py-1 rounded-full border border-auralis">
                CGPA: {education.cgpa}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-auralis-primary dark:text-white mb-1">
              {education.degree}
            </h3>
            <p className="text-sm font-semibold text-secondary-auralis mb-3">
              {education.institution} — {education.location}
            </p>
            <p className="text-xs sm:text-sm text-secondary-auralis leading-relaxed mb-6">
              {education.details}
            </p>
          </div>

          <div className="pt-4 border-t border-auralis flex items-center justify-between text-xs font-mono text-secondary-auralis">
            <span>Timeline: {education.timeline}</span>
            <span>Specialization: CSE Systems</span>
          </div>
        </div>

        {/* Certifications Card List */}
        <div className="lg:col-span-5 bg-panel-auralis rounded-3xl p-6 sm:p-8 border border-auralis flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-mono font-bold text-secondary-auralis uppercase tracking-[0.2em] mb-4">
              VERIFIED CERTIFICATIONS
            </h4>

            <div className="space-y-4">
              {certifications.map((cert) => (
                <div 
                  key={cert.id}
                  className="bg-card-auralis rounded-2xl p-4 border border-auralis flex items-center justify-between hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-auralis-primary dark:text-white leading-tight">
                      {cert.title}
                    </h5>
                    <p className="text-[11px] font-mono text-secondary-auralis mt-0.5">
                      {cert.issuer} • {cert.detail}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-emerald-500 text-lg shrink-0 ml-2">
                    verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
