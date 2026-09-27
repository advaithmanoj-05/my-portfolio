# ⚡ Advaith Manoj — Developer Portfolio v2

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-f38020?style=for-the-badge&logo=cloudflare)](https://pages.cloudflare.com/)
[![Cloudflare Workers AI](https://img.shields.io/badge/AI%20Engine-Workers%20AI%20%28Llama%203.1%29-f38020?style=for-the-badge&logo=cloudflare)](https://developers.cloudflare.com/workers-ai/)

Welcome to **Version 2** of my personal developer portfolio and systems architecture showcase. Designed with an **engineered softness** aesthetic (Ref2 Auralis System), this portfolio features interactive real-time telemetry, a dual-state 8-bit avatar sector, an embedded **AI Persona Assistant** powered by **Cloudflare Workers AI**, client-side rate limiting, and an encrypted terminal contact suite.

---

## 🌟 Key Features

### 🕹️ 1. Interactive Dual-State Circular Avatar Sector
- **Default State**: High-resolution studio headshot photograph.
- **Hover State**: Flips and crossfades smoothly into a custom 8-bit retro arcade avatar (`/images/avatar-8bit.png`) wearing round sunglasses with a pixelated speech bubble ("*HI! 👋 WELCOME!*"), scanline shader overlays, and an active status radar pulse.

### 🤖 2. Interactive AI Persona ("Talk with AI Advaith")
- **Cloudflare Workers AI Integration**: Calls Meta's **Llama 3.1 8B Instruct** (`@cf/meta/llama-3.1-8b-instruct`) running on Cloudflare's global edge network.
- **Rate-Limiting Protection**: Enforces a strict **5 messages per 10-minute** sliding window via `localStorage` to prevent API spam, complete with a live countdown timer when rate-limited.
- **Instant Fallback Engine**: If network connection drops or external LLMs are unavailable, seamlessly falls back to a high-speed local client-side knowledge engine in `< 0.1s`.
- **Admin Kill Switch**: Toggle the AI assistant ON/OFF anytime via GitHub Actions workflow dispatches, Cloudflare environment variables (`NEXT_PUBLIC_ENABLE_AI_CHAT=false`), or local configuration.

### 📊 3. Live Telemetry & Systems Matrix
- Interactive dashboard widget showcasing performance metrics:
  - **7.80 / 10** B.Tech CSE CGPA at Mar Baselios College of Engineering.
  - **50+ Peers** mentored in LeetCode algorithmic patterns & DSA.
  - **2x Winner** at Sphota 24h Hackathon & Trydan'25 Market Masters.
  - **500+ Developers** impacted through IEDC COO leadership.

### 💼 4. Production Engineering Showcase
- **Obsidyne**: Production e-commerce REST APIs built with FastAPI & MySQL inventory services.
- **Child Development Centre (Medical College Trivandrum)**: LAN-first offline healthcare EHR system built with React, FastAPI, and PostgreSQL.
- **H&R Block Technopark**: Enterprise fintech checklist controller with .NET API & Angular.
- **AI Resume Screening Cloud API**: Qwen LLM semantic scoring deployed on Hugging Face & Cloudflare Workers.
- **NexStep Placement Platform**: Supabase + React platform with Google Drive OAuth & QR attendance for 200+ students.
- **Sentry (KMRL Document Architecture)**: Kochi Metro Rail document management solution (SIH 2025 National Qualifier).
- **Aegis Smart Helmet**: Embedded IoT driving assistance with Heads-Up Display (HUD) & SOS telemetry.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS, CSS Modules, Material Symbols
- **AI & Cloud**: Cloudflare Workers AI, Hugging Face Inference, Cloudflare Pages
- **Backend Languages**: Python (FastAPI, Flask), Java (Spring Boot), C++
- **Databases**: PostgreSQL, MySQL, Supabase

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/advaithmanoj-05/my-portfolio.git
cd my-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables (Optional for Cloudflare Workers AI)
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_ENABLE_AI_CHAT=true
NEXT_PUBLIC_CF_ACCOUNT_ID=your_cloudflare_account_id
NEXT_PUBLIC_CF_API_TOKEN=your_cloudflare_workers_ai_api_token
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Cloudflare Pages

1. Push code to your GitHub repository.
2. Go to **Cloudflare Dashboard** -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Select `advaithmanoj-05/my-portfolio` and set:
   - **Framework Preset**: `Next.js (Static Export)`
   - **Build Command**: `npx next build`
   - **Build Output Directory**: `out`
4. Add Environment Variables under **Settings -> Environment variables**:
   - `NEXT_PUBLIC_ENABLE_AI_CHAT`: `true`
   - `NEXT_PUBLIC_CF_ACCOUNT_ID`: Your Cloudflare Account ID
   - `NEXT_PUBLIC_CF_API_TOKEN`: Your Cloudflare API Token

---

## 🛡️ AI Kill Switch Configuration

To turn off the AI Chat Assistant at any time:
- Set `NEXT_PUBLIC_ENABLE_AI_CHAT` to `false` in Cloudflare Pages settings, or trigger a manual build in GitHub Actions with `enable_ai_chat = false`.

---

## 📜 License

Distributed under the MIT License. Built with precision by **Advaith Manoj**.
