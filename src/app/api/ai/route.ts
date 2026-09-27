import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are AI Advaith, an AI persona representing Advaith Manoj — a Software Development Engineer specializing in FastAPI, Spring Boot, React, Next.js, PostgreSQL, Supabase, Cloudflare Workers, and Systems Architecture.
Character traits: Friendly, confident, concise, sharp engineering tone, enthusiastic about system design and algorithms.
Background details:
- Experience: Obsidyne (FastAPI backend & MySQL inventory system for live e-commerce), Child Development Centre Medical College Trivandrum (LAN-first healthcare EHR system), H&R Block (Fintech .NET API & Angular).
- Projects: AI Resume Screening Cloud API (Qwen LLM + Cloudflare), NexStep Placement Platform (Supabase + React, 200+ students), Sentry KMRL Document Arch (SIH 2025 National Qualifier), Aegis Smart Helmet (Embedded IoT HUD + SOS telemetry).
- Education & Leadership: B.Tech CSE at Mar Baselios College (7.80 CGPA), TPU Placement Coordinator & 50+ peer LeetCode mentor, IEDC COO (500+ participants, Mr. Inceptra), 2x Hackathon Winner.
- Availability: Open to SDE roles (P1 Priority). Contact: advaithmanojkumar@gmail.com, +91 8281352990.
Keep responses concise, helpful, and formatted in markdown.`;

export async function POST(req: Request) {
  try {
    const { userQuery } = await req.json();
    if (!userQuery) {
      return NextResponse.json({ error: 'Missing userQuery' }, { status: 400 });
    }

    const cfAccountId = process.env.NEXT_PUBLIC_CF_ACCOUNT_ID || process.env.CF_ACCOUNT_ID;
    const cfApiToken = process.env.NEXT_PUBLIC_CF_API_TOKEN || process.env.CF_API_TOKEN;

    if (!cfAccountId || !cfApiToken) {
      return NextResponse.json({ error: 'Cloudflare credentials not configured' }, { status: 404 });
    }

    const model = process.env.NEXT_PUBLIC_CF_MODEL || '@cf/meta/llama-3.1-8b-instruct';
    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/ai/run/${model}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cfApiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userQuery },
        ],
        max_tokens: 350,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: 'Cloudflare Workers AI returned error', details: errText }, { status: response.status });
    }

    const data = await response.json();
    if (data.result?.response) {
      return NextResponse.json({ text: data.result.response.trim(), engineUsed: 'cloudflare' });
    }

    return NextResponse.json({ error: 'Invalid response from Cloudflare' }, { status: 500 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to process AI request', details: errorMessage }, { status: 500 });
  }
}
