import { Redis } from "@upstash/redis";

const KEY = "visitor_count";

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function POST() {
  const redis = getRedis();
  if (!redis) return Response.json({ count: null });
  const count = await redis.incr(KEY);
  return Response.json({ count });
}

export async function GET() {
  const redis = getRedis();
  if (!redis) return Response.json({ count: null });
  const count = (await redis.get<number>(KEY)) ?? 0;
  return Response.json({ count });
}
