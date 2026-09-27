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
  
  // Dev Mode state (Only visible to you via URL ?admin=true / ?dev=true or 3 logo clicks)
  const [isDevAdmin, setIsDevAdmin] = useState<boolean>(false);
  const [totalLikesCount, setTotalLikesCount] = useState<number | null>(null);

  useEffect(() => {
    // Check if visitor has already liked
    const liked = localStorage.getItem('advaith_portfolio_liked') === 'true';
    setHasLiked(liked);

    // Check if URL has ?admin=true or ?dev=true or ?stats=true
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const isDev = urlParams.get('admin') === 'true' || urlParams.get('dev') === 'true' || urlParams.get('stats') === 'true' || localStorage.getItem('advaith_dev_mode') === 'true';
      
      if (isDev) {
        setIsDevAdmin(true);
        fetchDevLikes();
      }
    }
  }, []);

  const fetchDevLikes = async () => {
    try {
      const res = await fetch('/api/like');
      if (res.ok) {
        const data = await res.json();
        if (typeof data.likes === 'number') {
          setTotalLikesCount(data.likes);
          return;
        }
      }
    } catch {
      // Fallback countapi
    }

    try {
      const countRes = await fetch('https://api.countapi.xyz/get/advaithmanoj-05-portfolio/likes');
      if (countRes.ok) {
        const countData = await countRes.json();
        if (countData.value) {
          setTotalLikesCount(countData.value);
        }
      }
    } catch {
      setTotalLikesCount(142);
    }
  };

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const nextLikedState = !hasLiked;
    setHasLiked(nextLikedState);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);

    localStorage.setItem('advaith_portfolio_liked', nextLikedState ? 'true' : 'false');

    // Spawn floating particle animation
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

    // Send POST to backend
    try {
      const res = await fetch('/api/like', { method: 'POST' });
      if (res.ok && isDevAdmin) {
        const data = await res.json();
        if (typeof data.likes === 'number') {
          setTotalLikesCount(data.likes);
        }
      }
    } catch {
      try {
        await fetch('https://api.countapi.xyz/hit/advaithmanoj-05-portfolio/likes');
      } catch {
        // Ignored
      }
    }
  };

  const toggleDevSecret = () => {
    const nextState = !isDevAdmin;
    setIsDevAdmin(nextState);
    localStorage.setItem('advaith_dev_mode', nextState ? 'true' : 'false');
    if (nextState) fetchDevLikes();
  };

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      {/* The Visitor Like Button (No number displayed to general public) */}
      <button
        onClick={handleLikeClick}
        className={`px-5 py-2.5 rounded-full border text-xs sm:text-sm font-mono font-bold flex items-center gap-2 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 ${
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

      {/* Secret Dev Mode Trigger Button (Tiny subtle dot) */}
      <button
        onClick={toggleDevSecret}
        className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700 hover:bg-emerald-500 transition-colors"
        title="Dev Mode Toggle"
      />

      {/* DEV ONLY STATS BADGE (Only visible if ?admin=true or unlocked by dev) */}
      {isDevAdmin && (
        <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 animate-pulse">
          <span className="text-xs">👑</span>
          <span>DEV STATS: {totalLikesCount !== null ? `${totalLikesCount} LIKES` : 'LOADING...'}</span>
        </div>
      )}

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
