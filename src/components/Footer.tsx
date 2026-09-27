'use client';

import { RESUME_DATA } from '@/data/resumeData';

export default function Footer() {
  return (
    <footer className="w-full border-t border-auralis py-12 bg-panel-auralis/30 mt-auto">
      {/* Sign-off Banner Section */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 mb-12 text-center flex flex-col items-center">
        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.25em] mb-3">
          SYSTEM SIGN-OFF
        </span>
        <h2 className="font-h2 text-[32px] sm:text-[48px] font-semibold text-auralis-primary dark:text-white mb-6 max-w-2xl leading-tight tracking-[-0.03em]">
          Ready to engineer high-impact solutions together
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <a
            href="#contact"
            className="bg-auralis-primary text-white dark:bg-white dark:text-black px-7 py-3 rounded-full text-xs sm:text-sm font-medium transition-all hover:opacity-90 shadow-sm"
          >
            Get started
          </a>
          <a
            href={RESUME_DATA.personal.github}
            target="_blank"
            rel="noreferrer"
            className="bg-transparent border border-auralis text-auralis-primary dark:text-white px-7 py-3 rounded-full text-xs sm:text-sm font-medium transition-all hover:bg-panel-auralis"
          >
            Explore GitHub
          </a>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 pt-8 border-t border-auralis/60 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-7 h-7 rounded-md bg-auralis-primary text-white dark:bg-white dark:text-black flex items-center justify-center font-extrabold text-xs">
            AM
          </div>
          <span className="text-xs text-secondary-auralis font-mono">
            © 2026 Advaith Manoj. Engineered for Cloudflare Pages.
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-secondary-auralis">
          <a 
            href={RESUME_DATA.personal.github} 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-auralis-primary dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a 
            href={RESUME_DATA.personal.linkedin} 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-auralis-primary dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href={RESUME_DATA.personal.leetcode} 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-auralis-primary dark:hover:text-white transition-colors"
          >
            LeetCode
          </a>
          <a 
            href={`mailto:${RESUME_DATA.personal.email}`} 
            className="hover:text-auralis-primary dark:hover:text-white transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
