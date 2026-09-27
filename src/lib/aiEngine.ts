import { RESUME_DATA } from '@/data/resumeData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  engineUsed?: 'cloudflare' | 'groq' | 'local';
}

export interface AIResponseResult {
  text: string;
  engineUsed: 'cloudflare' | 'groq' | 'local';
}

const SYSTEM_PROMPT = `You are AI Advaith, an AI persona representing Advaith Manoj — a Software Development Engineer specializing in FastAPI, Spring Boot, React, Next.js, PostgreSQL, Supabase, Cloudflare Workers, and Systems Architecture.
Character traits: Friendly, confident, concise, sharp engineering tone, enthusiastic about system design and algorithms.
Background details:
- Experience: Obsidyne (FastAPI backend & MySQL inventory system for live e-commerce), Child Development Centre Medical College Trivandrum (LAN-first healthcare EHR system), H&R Block (Fintech .NET API & Angular).
- Projects: AI Resume Screening Cloud API (Qwen LLM + Cloudflare), NexStep Placement Platform (Supabase + React, 200+ students), Sentry KMRL Document Arch (SIH 2025 National Qualifier), Aegis Smart Helmet (Embedded IoT HUD + SOS telemetry).
- Education & Leadership: B.Tech CSE at Mar Baselios College (7.80 CGPA), TPU Placement Coordinator & 50+ peer LeetCode mentor, IEDC COO (500+ participants, Mr. Inceptra), 2x Hackathon Winner.
- Availability: Open to SDE roles (P1 Priority). Contact: advaithmanojkumar@gmail.com, +91 8281352990.
Keep responses concise, helpful, and formatted in markdown.`;

export const generateAIResponse = generateAIResponseAsync;

/**
 * Async AI Response generator supporting Cloudflare Workers AI Proxy, Groq, and Local Fallback
 */
export async function generateAIResponseAsync(userQuery: string): Promise<AIResponseResult> {
  // 1. Try Next.js / Cloudflare Worker API proxy (/api/ai)
  try {
    const proxyRes = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userQuery }),
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (data.text) {
        return { text: data.text, engineUsed: 'cloudflare' };
      }
    }
  } catch {
    // Proxy not available (e.g. static export preview)
  }

  // 2. Try direct CORS-friendly LLM APIs (Groq, OpenRouter)
  const apiUrl = process.env.NEXT_PUBLIC_AI_API_URL || RESUME_DATA.aiChat?.apiUrl;
  const apiKey = process.env.NEXT_PUBLIC_AI_API_KEY || RESUME_DATA.aiChat?.apiKey;

  if (apiUrl) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userQuery },
          ],
          max_tokens: 350,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.choices && data.choices[0]?.message?.content) {
          return { text: data.choices[0].message.content.trim(), engineUsed: 'groq' };
        }
        if (Array.isArray(data) && data[0]?.generated_text) {
          return { text: data[0].generated_text.trim(), engineUsed: 'groq' };
        }
      }
    } catch {
      // Direct API fetch failed
    }
  }

  // 3. Seamless Fallback to Local Engine
  return {
    text: generateLocalAIResponse(userQuery),
    engineUsed: 'local',
  };
}

/**
 * Local Client-Side Intent & Knowledge Engine
 */
function generateLocalAIResponse(userQuery: string): string {
  const query = userQuery.toLowerCase().trim();

  if (query.match(/\b(hi|hello|hey|greetings|who are you|intro|yourself|about)\b/)) {
    return `Hey there! 👋 I'm **AI Advaith**, a virtual persona modeled after Advaith Manoj. 

I'm a **Software Development Engineer** specializing in full-stack web architectures, production REST APIs (FastAPI, Spring Boot), relational database design (PostgreSQL, MySQL), and cloud deployment. 

Feel free to ask me about my **experience at Obsidyne or Child Development Centre**, my **AI & IoT projects**, **DSA mentorship**, or **job availability**! What would you like to know?`;
  }

  if (query.match(/\b(stack|skills|technology|tech|languages|frameworks|tools|python|fastapi|java|spring boot|react|nextjs|postgres|supabase|cloudflare|docker|linux)\b/)) {
    return `My core engineering stack includes:

• **Backend & APIs:** Python (FastAPI, Flask), Java (Spring Boot), RESTful APIs, Microservices.
• **Frontend:** TypeScript, React, Next.js, TailwindCSS.
• **Databases & Cloud:** PostgreSQL, MySQL, Supabase, Cloudflare Workers / Tunnels, Hugging Face Inference, Docker, Linux.
• **Systems & Algorithms:** OOP contracts, Data Structures, System Design, C++.

I enjoy building high-throughput, low-latency backends and clean user interfaces!`;
  }

  if (query.match(/\b(experience|work|job|obsidyne|cdc|medical|h&r block|hrblock|internship|roles|company)\b/)) {
    if (query.includes('obsidyne')) {
      return `At **Obsidyne** (Mar 2025 – Present), I work as a Software Developer building production RESTful APIs with **FastAPI** for the Lytemaster e-commerce brand. I also engineered a MySQL-backed inventory management service that streamlined operations for the live store traffic.`;
    }
    if (query.includes('cdc') || query.includes('medical') || query.includes('healthcare') || query.includes('lan')) {
      return `As a freelance System Architect & Developer for **Child Development Centre (Medical College Trivandrum)**, I designed a **LAN-first, localized architecture** that guarantees offline reliability and strict patient data privacy. Built with React and FastAPI REST APIs over a PostgreSQL schema for historical medical records.`;
    }
    if (query.includes('h&r block') || query.includes('hrblock') || query.includes('fintech') || query.includes('angular')) {
      return `At **H&R Block (Technopark)**, I developed a .NET API controller managing a 30+ configurable options checklist with a JSON store, paired with an Angular frontend and polished CSS UI layout.`;
    }
    return `Here is a quick overview of my engineering roles:
1. **Obsidyne** (Mar 2025 – Present): Software Developer — FastAPI backend & MySQL inventory system for live e-commerce.
2. **Child Development Centre, Medical College Trivandrum** (Sep 2025 – Present): Freelance System Architect — LAN-first healthcare EHR with React, FastAPI & PostgreSQL.
3. **H&R Block Technopark** (Dec 2024 – Jan 2025): Software Development Intern — .NET API & Angular fintech checklist engine.`;
  }

  if (query.match(/\b(project|projects|resume screening|nexstep|sentry|kmrl|aegis|helmet|dungeon|file organizer|tax|built|github)\b/)) {
    if (query.includes('resume') || query.includes('qwen') || query.includes('llm')) {
      return `📄 **AI Resume Screening Cloud API**: Integrated the Qwen LLM via Python & FastAPI to score candidate–JD compatibility beyond simple keyword matching. Hosted inference on Hugging Face with edge routing via Cloudflare Workers & Tunnels.`;
    }
    if (query.includes('nexstep') || query.includes('placement')) {
      return `🎓 **NexStep Placement Platform**: Full-stack platform with Supabase & React powering role-based auth (Student/Alumni/Admin), automated TPO profile triggers, Google Drive OAuth, and QR-code attendance for 200+ students.`;
    }
    if (query.includes('sentry') || query.includes('kmrl') || query.includes('kochi')) {
      return `🚇 **Sentry (KMRL Document Arch)**: Proposed and architected an intelligent document management solution for Kochi Metro Rail Limited. Recognized as a **SIH 2025 National Qualifier**.`;
    }
    if (query.includes('aegis') || query.includes('helmet') || query.includes('iot')) {
      return `⛑️ **Aegis Smart Helmet**: Embedded IoT driving-assistance system featuring a Heads-Up Display (HUD), automated crash SOS alert telemetry, and real-time Google Maps integration.`;
    }
    return `Here are some of my key projects:
• **AI Resume Screening API** (Qwen LLM + Cloudflare)
• **NexStep Placement Platform** (Supabase + React, 200+ users)
• **Sentry KMRL Document Arch** (SIH 2025 National Qualifier)
• **Aegis Smart Helmet** (Embedded IoT + Navigation)
• **Dungeon Engine** (Turn-based state machine in Python)

You can check out all source code links in the Projects section above!`;
  }

  if (query.match(/\b(leadership|iedc|tpu|placement|mentor|leetcode|hackathon|sphota|trydan|sih|education|college|cgpa|mar baselios)\b/)) {
    return `Here are some highlights from my academics and leadership:
• **Mar Baselios College of Engineering**: B.Tech CSE (2022–2026), **7.80 CGPA**.
• **TPU Placement Coordinator & DSA Mentor**: Mentored **50+ peers** on LeetCode patterns (two-pointers, DP, graphs) and conducted mock technical interviews.
• **IEDC COO / Co-Lead**: Directed bootcamps & hackathons for **500+ participants**, awarded *Mr. Inceptra*.
• **Hackathon Victories**: Winner at **Sphota 24h Hackathon**, Winner at **Trydan'25 Market Masters**, and 2x **SIH 2024 & 2025 National Qualifier**.`;
  }

  if (query.match(/\b(contact|hire|email|phone|availability|open|job|role|hiring|connect|linkedin|location)\b/)) {
    return `I am currently **Open to Software Engineering Roles (P1 Priority)**! 🚀

📍 **Location:** Trivandrum, Kerala (open to relocation & remote)
📧 **Email:** advaithmanojkumar@gmail.com
📱 **Phone:** +91 8281352990
🔗 **LinkedIn:** [linkedin.com/in/advaith-manoj-023b12291](https://www.linkedin.com/in/advaith-manoj-023b12291)
💻 **GitHub:** [github.com/advaithmanoj-05](https://github.com/advaithmanoj-05)

Feel free to send a message via the Terminal Contact section below!`;
  }

  return `That's an interesting question! As **AI Advaith**, I can tell you all about Advaith Manoj's software development experience, FastAPI & Spring Boot backends, database design, and hackathon projects.

Try asking me:
1. *"What is your experience with FastAPI and PostgreSQL?"*
2. *"How did you architect the LAN-first healthcare system for Child Development Centre?"*
3. *"Tell me about your DSA mentorship and LeetCode focus."*
4. *"What is your email and LinkedIn?"*`;
}
