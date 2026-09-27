'use client';

import { useState } from 'react';
import { RESUME_DATA } from '@/data/resumeData';

export default function TerminalContact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('transmitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="max-w-[1280px] mx-auto px-6 sm:px-8 mb-20 sm:mb-28">
      {/* Module Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs font-mono font-bold bg-panel-auralis text-auralis-primary dark:text-white px-3.5 py-1.5 rounded-full border border-auralis uppercase tracking-wider">
          Terminal & Connect
        </span>
        <div className="h-px bg-auralis flex-grow opacity-60" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Contact & Info */}
        <div className="lg:col-span-5 bg-panel-auralis rounded-3xl p-6 sm:p-8 border border-auralis flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">
              GET IN TOUCH
            </span>
            <h2 className="font-h2 text-[28px] sm:text-[36px] font-semibold text-auralis-primary dark:text-white leading-tight mb-4">
              Let&apos;s build something exceptional together
            </h2>
            <p className="text-sm text-secondary-auralis leading-relaxed mb-8">
              Open to Software Development Engineering roles, backend system design, full-stack projects, and technical collaborations.
            </p>

            <div className="space-y-4">
              <a 
                href={`mailto:${RESUME_DATA.personal.email}`}
                className="bg-card-auralis rounded-2xl p-4 border border-auralis flex items-center gap-3.5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-panel-auralis flex items-center justify-center text-auralis-primary dark:text-white shrink-0">
                  <span className="material-symbols-outlined text-lg">mail</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-secondary-auralis uppercase block">Direct Email</span>
                  <span className="text-xs sm:text-sm font-bold text-auralis-primary dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {RESUME_DATA.personal.email}
                  </span>
                </div>
              </a>

              <a 
                href={`tel:${RESUME_DATA.personal.phone}`}
                className="bg-card-auralis rounded-2xl p-4 border border-auralis flex items-center gap-3.5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-panel-auralis flex items-center justify-center text-auralis-primary dark:text-white shrink-0">
                  <span className="material-symbols-outlined text-lg">call</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-secondary-auralis uppercase block">Phone / WhatsApp</span>
                  <span className="text-xs sm:text-sm font-bold text-auralis-primary dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {RESUME_DATA.personal.phone}
                  </span>
                </div>
              </a>

              <div className="bg-card-auralis rounded-2xl p-4 border border-auralis flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-panel-auralis flex items-center justify-center text-auralis-primary dark:text-white shrink-0">
                  <span className="material-symbols-outlined text-lg">location_on</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-secondary-auralis uppercase block">Location</span>
                  <span className="text-xs sm:text-sm font-bold text-auralis-primary dark:text-white">
                    {RESUME_DATA.personal.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-auralis mt-8 flex items-center justify-between text-xs font-mono text-secondary-auralis">
            <span>Availability: Open to SDE Roles</span>
            <span>Status: P1 Active</span>
          </div>
        </div>

        {/* Right Column: Interactive Terminal Form */}
        <div className="lg:col-span-7 bg-card-auralis rounded-3xl p-6 sm:p-8 border border-auralis shadow-sm">
          {/* Terminal Window Top Bar */}
          <div className="flex justify-between items-center pb-4 mb-6 border-b border-auralis">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-xs font-mono font-bold text-secondary-auralis ml-2">
                advaith@portfolio:~ (bash)
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              HTTPS // REST ENCRYPTED
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono font-bold text-secondary-auralis uppercase tracking-wider block mb-1">
                // Your Name / Organization
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Rivera, Senior Engineering Lead"
                className="w-full bg-panel-auralis border border-auralis rounded-xl px-4 py-3 text-sm text-auralis-primary dark:text-white focus:outline-none focus:border-auralis-primary dark:focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-secondary-auralis uppercase tracking-wider block mb-1">
                // Reply Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@company.com"
                className="w-full bg-panel-auralis border border-auralis rounded-xl px-4 py-3 text-sm text-auralis-primary dark:text-white focus:outline-none focus:border-auralis-primary dark:focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-secondary-auralis uppercase tracking-wider block mb-1">
                // Message Payload
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hi Advaith, we would love to connect with you regarding our backend engineering team..."
                className="w-full bg-panel-auralis border border-auralis rounded-xl px-4 py-3 text-sm text-auralis-primary dark:text-white focus:outline-none focus:border-auralis-primary dark:focus:border-white transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-mono text-secondary-auralis">
                {status === 'transmitting' && '⚡ Transmitting payload to queue...'}
                {status === 'success' && '✅ Message delivered! Thank you.'}
                {status === 'idle' && 'READY FOR TRANSMISSION'}
              </span>

              <button
                type="submit"
                disabled={status === 'transmitting'}
                className="bg-auralis-primary text-white dark:bg-white dark:text-black px-6 py-3 rounded-full font-mono text-xs font-bold transition-all hover:opacity-90 active:scale-98 shadow-sm flex items-center gap-2"
              >
                <span>SEND MESSAGE</span>
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
