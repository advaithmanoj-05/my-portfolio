export interface RateLimitState {
  count: number;
  resetTime: number; // Unix timestamp in ms
}

const STORAGE_KEY = 'advaith_ai_chat_rate_limit';
const MAX_MESSAGES = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export function getRateLimitState(): { remaining: number; resetInSeconds: number; isLimited: boolean } {
  if (typeof window === 'undefined') {
    return { remaining: MAX_MESSAGES, resetInSeconds: 0, isLimited: false };
  }

  const now = Date.now();
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return { remaining: MAX_MESSAGES, resetInSeconds: 0, isLimited: false };
  }

  try {
    const data: RateLimitState = JSON.parse(raw);

    if (now > data.resetTime) {
      // Window expired, reset
      localStorage.removeItem(STORAGE_KEY);
      return { remaining: MAX_MESSAGES, resetInSeconds: 0, isLimited: false };
    }

    const remaining = Math.max(0, MAX_MESSAGES - data.count);
    const resetInSeconds = Math.ceil((data.resetTime - now) / 1000);

    return {
      remaining,
      resetInSeconds,
      isLimited: remaining <= 0,
    };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return { remaining: MAX_MESSAGES, resetInSeconds: 0, isLimited: false };
  }
}

export function recordMessageSent(): { remaining: number; resetInSeconds: number; isLimited: boolean } {
  if (typeof window === 'undefined') {
    return { remaining: MAX_MESSAGES - 1, resetInSeconds: 0, isLimited: false };
  }

  const now = Date.now();
  const raw = localStorage.getItem(STORAGE_KEY);
  let state: RateLimitState;

  if (!raw) {
    state = { count: 1, resetTime: now + WINDOW_MS };
  } else {
    try {
      const parsed: RateLimitState = JSON.parse(raw);
      if (now > parsed.resetTime) {
        state = { count: 1, resetTime: now + WINDOW_MS };
      } else {
        state = { count: parsed.count + 1, resetTime: parsed.resetTime };
      }
    } catch {
      state = { count: 1, resetTime: now + WINDOW_MS };
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  const remaining = Math.max(0, MAX_MESSAGES - state.count);
  const resetInSeconds = Math.ceil((state.resetTime - now) / 1000);

  return {
    remaining,
    resetInSeconds,
    isLimited: remaining <= 0,
  };
}
