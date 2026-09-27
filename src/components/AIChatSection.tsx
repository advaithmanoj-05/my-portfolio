'use client';

import { useState, useEffect, useRef } from 'react';
import { getRateLimitState, recordMessageSent } from '@/lib/rateLimiter';
import { generateAIResponseAsync, ChatMessage } from '@/lib/aiEngine';
import { RESUME_DATA } from '@/data/resumeData';

export default function AIChatSection() {
  const isEnabled = RESUME_DATA.aiChat?.enabled !== false;
  const [mounted, setMounted] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! 👋 I'm **AI Advaith**, a virtual persona powered by Advaith Manoj's portfolio context.\n\nAsk me anything about my **backend architecture, FastAPI/Spring Boot projects, experience at Obsidyne/CDC**, or **job availability**!`,
      timestamp: '12:00 AM',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeEngine, setActiveEngine] = useState<'cloudflare' | 'groq' | 'local'>('local');

  const [rateLimit, setRateLimit] = useState<{ remaining: number; resetInSeconds: number; isLimited: boolean }>({
    remaining: 5,
    resetInSeconds: 0,
    isLimited: false,
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Set mounted and update timestamp/rate limit client-side
  useEffect(() => {
    setMounted(true);
    setMessages((prev) =>
      prev.map((m) =>
        m.id === 'welcome'
          ? { ...m, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          : m
      )
    );
  }, []);

  // Update rate limit status
  useEffect(() => {
    if (!isEnabled || !mounted) return;
    const updateLimit = () => {
      setRateLimit(getRateLimitState());
    };
    updateLimit();
    const interval = setInterval(updateLimit, 1000);
    return () => clearInterval(interval);
  }, [isEnabled, mounted]);

  // Scroll inner chat container strictly
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    if (!isEnabled) return;
    const query = textToSend || input;
    if (!query.trim()) return;

    // Check rate limit
    const currentLimit = getRateLimitState();
    if (currentLimit.isLimited) {
      setRateLimit(currentLimit);
      return;
    }

    // Add User Message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Consume Rate Limit Token
    const updatedLimit = recordMessageSent();
    setRateLimit(updatedLimit);

    try {
      // Async call with Cloudflare Pages Function / API execution & local fallback
      const result = await generateAIResponseAsync(query);
      setActiveEngine(result.engineUsed);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: result.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        engineUsed: result.engineUsed,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setActiveEngine('local');
      const errorMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: "Switched to local engine response.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        engineUsed: 'local',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    if (rateLimit.isLimited || !isEnabled) return;
    handleSend(promptText);
  };

  // IF KILL SWITCH IS ACTIVE (DISABLED)
  if (!isEnabled) {
    return (
      <section id="ai-chat" className="max-w-[1280px] mx-auto px-6 sm:px-8 mb-20 sm:mb-28">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs font-mono font-bold bg-panel-auralis text-auralis-primary dark:text-white px-3.5 py-1.5 rounded-full border border-auralis uppercase tracking-wider">
            AI Assistant Status
          </span>
          <div className="h-px bg-auralis flex-grow opacity-60" />
        </div>

        <div className="bg-panel-auralis rounded-[2rem] p-8 border border-auralis text-center flex flex-col items-center justify-center min-h-[220px]">
          <span className="material-symbols-outlined text-4xl text-rose-500 mb-3">power_settings_new</span>
          <h3 className="text-lg font-bold text-auralis-primary dark:text-white mb-1">
            AI Persona Engine Offline
          </h3>
          <p className="text-xs text-secondary-auralis font-mono max-w-md">
            The AI Chat assistant has been toggled OFF by the system administrator via GitHub Workflow / Feature Flag.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Floating Bottom-Right Quick Chat FAB Trigger */}
      <a
        href="#ai-chat"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-zinc-900/95 dark:bg-black/95 text-white p-2.5 pr-4 rounded-full border-2 border-emerald-400 shadow-2xl hover:scale-105 active:scale-98 transition-all duration-300 group backdrop-blur-md"
        title="Talk with AI Advaith"
      >
        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-emerald-400 bg-zinc-800 shrink-0">
          <img
            src={RESUME_DATA.personal.avatar8BitUrl}
            alt="AI Avatar"
            className="w-full h-full object-cover pixelated"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold font-mono text-emerald-400 tracking-tight leading-none group-hover:text-white transition-colors flex items-center gap-1">
            <span>Talk with AI</span>
            <span className="text-[10px]">🤖</span>
          </span>
          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
            Interactive Persona
          </span>
        </div>
      </a>

      {/* Main AI Chat Section */}
      <section id="ai-chat" className="max-w-[1280px] mx-auto px-6 sm:px-8 mb-20 sm:mb-28">
        {/* Module Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs font-mono font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Interactive AI Persona Engine</span>
          </span>
          <div className="h-px bg-auralis flex-grow opacity-60" />
        </div>

        {/* Glowing Gradient Container Box */}
        <div className="p-0.5 rounded-[2.2rem] bg-gradient-to-r from-emerald-500/50 via-teal-400/40 to-cyan-500/50 shadow-2xl shadow-emerald-500/10">
          <div className="bg-panel-auralis rounded-[2.1rem] p-6 sm:p-8 border border-auralis shadow-sm">
            {/* Top Header Bar */}
            <div className="flex flex-wrap justify-between items-center gap-4 pb-6 border-b border-auralis">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-400 bg-zinc-900 flex items-center justify-center shadow-md">
                    <img
                      src={RESUME_DATA.personal.avatar8BitUrl}
                      alt="AI Advaith Avatar"
                      className="w-full h-full object-cover pixelated"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-panel-auralis animate-pulse" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-auralis-primary dark:text-white tracking-tight">
                      Talk with AI Advaith
                    </h3>
                    {/* Dynamic Active AI Engine Badge */}
                    <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
                      {activeEngine === 'cloudflare' && 'LIVE LLM (CLOUDFLARE WORKERS AI)'}
                      {activeEngine === 'groq' && 'LIVE LLM (GROQ LLAMA-3)'}
                      {activeEngine === 'local' && 'LOCAL ENGINE ONLINE'}
                    </span>
                  </div>
                  <p className="text-xs text-secondary-auralis font-mono mt-0.5">
                    Ask questions about my experience, architecture & projects
                  </p>
                </div>
              </div>

              {/* Rate Limit Badge Indicator */}
              <div className={`px-4 py-2 rounded-full border text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                rateLimit.isLimited 
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400' 
                  : 'bg-card-auralis border-auralis text-auralis-primary dark:text-white'
              }`}>
                <span className="material-symbols-outlined text-sm">
                  {rateLimit.isLimited ? 'lock_clock' : 'electric_bolt'}
                </span>
                {rateLimit.isLimited ? (
                  <span>Rate Limit Exceeded (Resets in {rateLimit.resetInSeconds}s)</span>
                ) : (
                  <span>Rate Limit: {rateLimit.remaining}/5 Messages Remaining</span>
                )}
              </div>
            </div>

            {/* Suggested Starter Prompt Chips */}
            <div className="py-4 flex flex-wrap gap-2 border-b border-auralis/60">
              <span className="text-xs font-mono text-secondary-auralis self-center mr-1 font-semibold">Try asking:</span>
              {[
                "What is your core tech stack?",
                "Tell me about your Obsidyne experience.",
                "How does the AI Resume API work?",
                "Are you available for SDE roles?",
              ].map((promptText, i) => (
                <button
                  key={i}
                  disabled={rateLimit.isLimited}
                  onClick={() => handleQuickPrompt(promptText)}
                  className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-card-auralis border border-auralis text-secondary-auralis hover:text-auralis-primary dark:hover:text-white hover:border-emerald-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs"
                >
                  💬 &quot;{promptText}&quot;
                </button>
              ))}
            </div>

            {/* Chat Messages Log Window */}
            <div
              ref={chatContainerRef}
              className="my-6 min-h-[320px] max-h-[440px] overflow-y-auto pr-2 space-y-4 no-scrollbar scroll-smooth"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  {/* Avatar Icon */}
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-auralis bg-card-auralis flex items-center justify-center text-xs font-bold font-mono">
                    {msg.sender === 'user' ? (
                      <span className="material-symbols-outlined text-base text-secondary-auralis">person</span>
                    ) : (
                      <img
                        src={RESUME_DATA.personal.avatar8BitUrl}
                        alt="AI"
                        className="w-full h-full object-cover pixelated"
                      />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-auralis-primary text-white dark:bg-white dark:text-black rounded-tr-none'
                        : 'bg-card-auralis border border-auralis text-auralis-primary dark:text-white rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">
                      {msg.text.split('\n').map((line, idx) => (
                        <p key={idx} className={idx > 0 ? 'mt-2' : ''}>
                          {line}
                        </p>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/5 dark:border-white/5 opacity-60 text-[9px] font-mono">
                      {msg.engineUsed && (
                        <span className="uppercase font-bold">
                          [{msg.engineUsed}]
                        </span>
                      )}
                      <span className="ml-auto">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 max-w-[75%] mr-auto">
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-auralis bg-card-auralis flex items-center justify-center">
                    <img
                      src={RESUME_DATA.personal.avatar8BitUrl}
                      alt="AI"
                      className="w-full h-full object-cover pixelated"
                    />
                  </div>
                  <div className="bg-card-auralis border border-auralis px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-xs font-mono text-secondary-auralis ml-2">
                      AI Advaith is typing...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="pt-4 border-t border-auralis flex gap-3 items-center"
            >
              <input
                type="text"
                value={input}
                disabled={rateLimit.isLimited}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  rateLimit.isLimited
                    ? `Rate limit reached. Please wait ${rateLimit.resetInSeconds} seconds...`
                    : "Ask AI Advaith anything..."
                }
                className="flex-grow bg-card-auralis border border-auralis rounded-full px-5 py-3 text-xs sm:text-sm text-auralis-primary dark:text-white focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-2xs"
              />

              <button
                type="submit"
                disabled={rateLimit.isLimited || !input.trim()}
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-6 py-3 rounded-full text-xs font-mono font-bold transition-all hover:opacity-95 active:scale-98 shadow-md flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <span>SEND</span>
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
