interface Env {
  PORTFOLIO_KV?: any;
}

let inMemoryLikes = 142; // Baseline start count

export async function onRequestGet(context: { env: Env }) {
  try {
    const { env } = context;
    if (env.PORTFOLIO_KV) {
      const val = await env.PORTFOLIO_KV.get('likes_count');
      const count = val ? parseInt(val, 10) : inMemoryLikes;
      return new Response(JSON.stringify({ likes: count }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    return new Response(JSON.stringify({ likes: inMemoryLikes }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch {
    return new Response(JSON.stringify({ likes: inMemoryLikes }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}

export async function onRequestPost(context: { env: Env }) {
  try {
    const { env } = context;
    if (env.PORTFOLIO_KV) {
      const val = await env.PORTFOLIO_KV.get('likes_count');
      const count = (val ? parseInt(val, 10) : inMemoryLikes) + 1;
      await env.PORTFOLIO_KV.put('likes_count', count.toString());
      return new Response(JSON.stringify({ success: true, likes: count }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    inMemoryLikes += 1;
    return new Response(JSON.stringify({ success: true, likes: inMemoryLikes }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch {
    inMemoryLikes += 1;
    return new Response(JSON.stringify({ success: true, likes: inMemoryLikes }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
