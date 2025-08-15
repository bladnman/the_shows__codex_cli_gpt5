type CacheEntry<T> = { value: T; expiresAt: number };

export class TTLCache<T = unknown> {
  private store = new Map<string, CacheEntry<T>>();

  constructor(private defaultTtlMs: number = 60_000) {}

  get(key: string): T | undefined {
    const now = Date.now();
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt <= now) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  set(key: string, value: T, ttlMs?: number) {
    const expiresAt = Date.now() + (ttlMs ?? this.defaultTtlMs);
    this.store.set(key, { value, expiresAt });
  }

  has(key: string) {
    return this.get(key) !== undefined;
  }
}

export const tmdbCache = new TTLCache<unknown>(60_000);
