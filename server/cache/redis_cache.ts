import { createClient } from "redis";

const DEFAULT_TTL_SECONDS = 300;

type RedisClient = ReturnType<typeof createClient>;

let client: RedisClient | null = null;
let connectPromise: Promise<void> | null = null;

function getClient(): RedisClient | null {
  if (!process.env.REDIS_URL) {
    return null;
  }
  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL,
      socket: {
        connectTimeout: 2000,
        reconnectStrategy: (retries) => {
          if (retries >= 3) {
            return false;
          }
          return Math.min(retries * 200, 1000);
        },
      },
    });
    client.on("error", (err) => {
      console.error("Redis error:", err.message);
    });
    client.on("end", () => {
      connectPromise = null;
    });
  }
  return client;
}

function startConnect(redis: RedisClient): void {
  if (redis.isOpen || connectPromise) {
    return;
  }

  connectPromise = redis
    .connect()
    .then(() => undefined)
    .catch((err) => {
      connectPromise = null;
      console.error("Redis connect failed:", err.message);
      try {
        redis.destroy();
      } catch {
        // Client may already be closed after a failed connect.
      }
      if (client === redis) {
        client = null;
      }
    });
}

async function getRedisClient(): Promise<RedisClient | null> {
  const redis = getClient();
  if (!redis) {
    return null;
  }

  if (redis.isReady) {
    return redis;
  }

  startConnect(redis);
  return null;
}

export async function cacheGetJson<T>(key: string): Promise<T | null> {
  const redis = await getRedisClient();
  if (!redis) {
    return null;
  }

  try {
    const raw = await redis.get(key);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error("Redis get failed:", err);
    return null;
  }
}

export async function cacheSetJson(
  key: string,
  value: unknown,
  ttlSeconds = DEFAULT_TTL_SECONDS,
): Promise<void> {
  const redis = await getRedisClient();
  if (!redis) {
    return;
  }

  try {
    await redis.set(key, JSON.stringify(value), { EX: ttlSeconds });
  } catch (err) {
    console.error("Redis set failed:", err);
  }
}
