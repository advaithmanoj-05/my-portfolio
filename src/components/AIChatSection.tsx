'use client';

import { useState, useEffect, useRef } from 'react';
import { getRateLimitState, recordMessageSent } from '@/lib/rateLimiter';
import { generateAIResponseAsync, ChatMessage } from '@/lib/aiEngine';
import { RESUME_DATA } from '@/data/resumeData';

export default function AIChatSection() {
  const isEnabled = RESUME_DATA.aiChat?.enabled !== false;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! 👋 I'm **AI Advaith**, a virtual persona powered by Advaith Manoj's portfolio context.\n\nAsk me anything about my **backend architecture, FastAPI/Spring Boot projects, experience at Obsidyne/CDC**, or **job availability**!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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

  // Initialize and update rate limit status
  useEffect(() => {
    if (!isEnabled) return;
    const updateLimit = () => {
      setRateLimit(getRateLimitState());
    };
    updateLimit();
    const interval = setInterval(updateLimit, 1000);
    return () => clearInterval(interval);
  }, [isEnabled]);

  // Scroll inner chat container strictly (prevents entire page from jumping down!)
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
      // Async call with proxy / API execution & local fallback
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
        text: "I encountered a minor network issue. Switched to local engine!",
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
    <section id="ai-chat" className="max-w-[1280px] mx-auto px-6 sm:px-8 mb-20 sm:mb-28">
      {/* Module Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs font-mono font-bold bg-panel-auralis text-auralis-primary dark:text-white px-3.5 py-1.5 rounded-full border border-auralis uppercase tracking-wider">
          Interactive AI Persona
        </span>
        <div className="h-px bg-auralis flex-grow opacity-60" />
      </div>

      <div className="bg-panel-auralis rounded-[2rem] p-6 sm:p-8 border border-auralis shadow-sm">
        {/* Top Header Bar */}
        <div className="flex flex-wrap justify-between items-center gap-4 pb-6 border-b border-auralis">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-500 bg-zinc-900 flex items-center justify-center">
                <img
                  src={RESUME_DATA.personal.avatar8BitUrl}
                  alt="AI Advaith Avatar"
                  className="w-full h-full object-cover pixelated"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-panel-auralis animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-auralis-primary dark:text-white">
                  Talk with AI Advaith
                </h3>
                {/* Dynamic Active AI Engine Badge */}
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {activeEngine === 'cloudflare' && 'LIVE LLM (CLOUDFLARE WORKERS AI)'}
                  {activeEngine === 'groq' && 'LIVE LLM (GROQ LLAMA-3)'}
                  {activeEngine === 'local' && 'LOCAL ENGINE ONLINE'}
                </span>
              </div>
              <p className="text-xs text-secondary-auralis font-mono">
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
          <span className="text-xs font-mono text-secondary-auralis self-center mr-1">Try asking:</span>
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
              className="text-xs font-mono px-3 py-1 rounded-full bg-card-auralis border border-auralis text-secondary-auralis hover:text-auralis-primary dark:hover:text-white hover:border-zinc-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              💬 &quot;{promptText}&quot;
            </button>
          ))}
        </div>

        {/* Chat Messages Log Window (Strict inner scrolling, no page jumps!) */}
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
            className="flex-grow bg-card-auralis border border-auralis rounded-full px-5 py-3 text-xs sm:text-sm text-auralis-primary dark:text-white focus:outline-none focus:border-auralis-primary dark:focus:border-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={rateLimit.isLimited || !input.trim()}
            className="bg-auralis-primary text-white dark:bg-white dark:text-black px-5 py-3 rounded-full text-xs font-mono font-bold transition-all hover:opacity-90 active:scale-98 shadow-sm flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <span>SEND</span>
            <span className="material-symbols-outlined text-sm">send</span>
          </button>
        </form>
      </div>
    </section>
  );
}
