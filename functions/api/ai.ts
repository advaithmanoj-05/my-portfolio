interface Env {
  NEXT_PUBLIC_CF_ACCOUNT_ID?: string;
  NEXT_PUBLIC_CF_API_TOKEN?: string;
  CF_ACCOUNT_ID?: string;
  CF_API_TOKEN?: string;
  AI?: any;
}

const SYSTEM_PROMPT = `You are AI Advaith, an AI persona representing Advaith Manoj — a Software Development Engineer specializing in FastAPI, Spring Boot, React, Next.js, PostgreSQL, Supabase, Cloudflare Workers, and Systems Architecture.
Character traits: Friendly, confident, concise, sharp engineering tone, enthusiastic about system design and algorithms.
Background details:
- Experience: Obsidyne (FastAPI backend & MySQL inventory system for live e-commerce), Child Development Centre Medical College Trivandrum (LAN-first healthcare EHR system), H&R Block (Fintech .NET API & Angular).
- Projects: AI Resume Screening Cloud API (Qwen LLM + Cloudflare), NexStep Placement Platform (Supabase + React, 200+ students), Sentry KMRL Document Arch (SIH 2025 National Qualifier), Aegis Smart Helmet (Embedded IoT HUD + SOS telemetry).
- Education & Leadership: B.Tech CSE at Mar Baselios College (7.80 CGPA), TPU Placement Coordinator & 50+ peer LeetCode mentor, IEDC COO (500+ participants, Mr. Inceptra), 2x Hackathon Winner.
- Availability: Open to SDE roles (P1 Priority). Contact: advaithmanojkumar@gmail.com, +91 8281352990.
Keep responses concise, helpful, and formatted in markdown.`;

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;
    const { userQuery } = await request.json() as { userQuery?: string };

    if (!userQuery) {
      return new Response(JSON.stringify({ error: 'Missing userQuery' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cfAccountId = env.NEXT_PUBLIC_CF_ACCOUNT_ID || env.CF_ACCOUNT_ID;
    const cfApiToken = env.NEXT_PUBLIC_CF_API_TOKEN || env.CF_API_TOKEN;

    // Direct Cloudflare Workers AI Binding if available
    if (env.AI) {
      const aiResponse = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userQuery },
        ],
        max_tokens: 350,
      });
      return new Response(JSON.stringify({ text: aiResponse.response.trim(), engineUsed: 'cloudflare' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // REST API call with environment tokens
    if (cfAccountId && cfApiToken) {
      const endpoint = `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`;
      const apiRes = await fetch(endpoint, {
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

      if (apiRes.ok) {
        const data = await apiRes.json() as any;
        if (data.result?.response) {
          return new Response(JSON.stringify({ text: data.result.response.trim(), engineUsed: 'cloudflare' }), {
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }
    }

    return new Response(JSON.stringify({ error: 'Cloudflare AI credentials not available' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Execution error', details: err?.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
