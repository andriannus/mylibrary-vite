export interface LocalStorageHook {
  get<T = unknown>(key: string): T | null;
  isExist(key: string): boolean;
  remove(key: string): void;
  reset(): void;
  set(key: string, value: unknown): void;
}
