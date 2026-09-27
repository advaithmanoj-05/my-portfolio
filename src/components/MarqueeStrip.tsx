'use client';

const STACK_ITEMS = [
  { name: 'FastAPI', icon: 'bolt' },
  { name: 'Spring Boot', icon: 'coffee' },
  { name: 'React', icon: 'code_blocks' },
  { name: 'Next.js', icon: 'terminal' },
  { name: 'PostgreSQL', icon: 'database' },
  { name: 'Supabase', icon: 'dataset' },
  { name: 'Cloudflare', icon: 'cloud_queue' },
  { name: 'Hugging Face', icon: 'auto_awesome' },
  { name: 'Docker', icon: 'deployed_code' },
  { name: 'Linux', icon: 'computer' },
  { name: 'MySQL', icon: 'storage' },
  { name: 'C++', icon: 'memory' },
];

export default function MarqueeStrip() {
  return (
    <div className="w-full overflow-hidden mb-20 sm:mb-28 py-4 border-y border-auralis/60 bg-panel-auralis/30">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 text-center mb-6">
        <h3 className="text-xs font-mono font-bold text-secondary-auralis uppercase tracking-[0.25em]">
          CORE STACK // ARCHITECTURES & FRAMEWORKS POWERING MY WORK
        </h3>
      </div>

      <div className="flex whitespace-nowrap overflow-hidden group">
        <div className="flex items-center gap-16 sm:gap-24 animate-marquee group-hover:pause-marquee">
          {STACK_ITEMS.concat(STACK_ITEMS).map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 text-secondary-auralis/40 dark:text-zinc-600 font-bold text-lg sm:text-xl uppercase tracking-wider italic hover:text-auralis-primary dark:hover:text-white transition-colors cursor-default"
            >
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
