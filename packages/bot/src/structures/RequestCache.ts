export class RequestCache {
  public cache: Record<string, Set<string>>;

  constructor() {
    this.cache = {};
  }

  public add(cacheName: string, data: string): void {
    this.cache[cacheName] ??= new Set<string>();
    this.cache[cacheName].add(data);
  }

  public getRandom(cacheName: string): string {
    const lCache = (this.cache[cacheName] ??= new Set<string>());
    return [...lCache][Math.floor(Math.random() * lCache.size)];
  }

  public getCacheByName(cacheName: string): Set<string> {
    return (this.cache[cacheName] ??= new Set<string>());
  }

  public clear(): void {
    this.cache = {};
  }

  public size(): number {
    let size = 0;
    Object.keys(this.cache).forEach((i) => (size += this.cache[i].size));
    return size;
  }
}
