export interface CacheConfig {
  path: string;
  ttl?: number;
}

export interface CachedResponse {
  body: string;
  bodyGzip?: string;  // base64 encoded compressed body
  headers: Record<string, string>;
  timestamp: number;
}
