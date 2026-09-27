interface Env {
  PORTFOLIO_KV?: any;
}

let inMemoryLikes = 142; // Server-side count

// Block GET requests so nobody can read the count via browser/API/devtools
export async function onRequestGet() {
  return new Response(JSON.stringify({ error: 'Forbidden. Analytics viewable in Cloudflare Dashboard only.' }), {
    status: 403,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Secret POST endpoint: Only increments count in Cloudflare KV & returns success: true
export async function onRequestPost(context: { env: Env }) {
  try {
    const { env } = context;
    if (env.PORTFOLIO_KV) {
      const val = await env.PORTFOLIO_KV.get('likes_count');
      const count = (val ? parseInt(val, 10) : inMemoryLikes) + 1;
      await env.PORTFOLIO_KV.put('likes_count', count.toString());
    } else {
      inMemoryLikes += 1;
    }

    // Return ONLY success boolean to browser - count is completely hidden!
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
