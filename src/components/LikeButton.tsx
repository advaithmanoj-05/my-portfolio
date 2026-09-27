'use client';

import { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
}

export default function LikeButton({ className = '' }: { className?: string }) {
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const liked = localStorage.getItem('advaith_portfolio_liked') === 'true';
    setHasLiked(liked);
  }, []);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const nextLikedState = !hasLiked;
    setHasLiked(nextLikedState);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);

    localStorage.setItem('advaith_portfolio_liked', nextLikedState ? 'true' : 'false');

    // Floating particle animation
    if (nextLikedState) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const newParticle: Particle = {
        id: Date.now(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setParticles((prev) => [...prev, newParticle]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1000);
    }

    // Send POST to server (returns only success: true, count is private to Cloudflare Dashboard)
    try {
      await fetch('/api/like', { method: 'POST' });
    } catch {
      // Ignored
    }
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Clean Visitor Like Button (Zero numbers exposed to public) */}
      <button
        onClick={handleLikeClick}
        className={`px-5 py-3 rounded-full border text-xs sm:text-sm font-mono font-bold flex items-center gap-2 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 ${
          hasLiked
            ? 'bg-rose-500 text-white border-rose-400 shadow-rose-500/30'
            : 'bg-card-auralis border-auralis text-auralis-primary dark:text-white hover:border-rose-400'
        }`}
      >
        <span className={`material-symbols-outlined text-base transition-transform ${hasLiked ? 'fill text-white' : 'text-rose-500'} ${animating ? 'scale-125 rotate-12' : ''}`}>
          favorite
        </span>
        <span>{hasLiked ? 'LIKED! ❤️' : 'LIKE PORTFOLIO'}</span>
      </button>

      {/* Floating Particles Animation */}
      {particles.map((p) => (
        <span
          key={p.id}
          style={{ left: `${p.x}px`, top: `${p.y - 15}px` }}
          className="absolute pointer-events-none text-xs font-mono font-bold text-rose-500 animate-bounce transition-all duration-700 opacity-90"
        >
          +1 ❤️
        </span>
      ))}
    </div>
  );
}
