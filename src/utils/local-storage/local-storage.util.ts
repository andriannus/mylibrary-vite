import { LocalStorageHook } from "./local-storage.model";

export function useLocalStorage(): LocalStorageHook {
  function get<T = unknown>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  function set(key: string, value: unknown = ""): void {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  function remove(key: string): void {
    localStorage.removeItem(key);
  }

  function reset(): void {
    localStorage.clear();
  }

  function isExist(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  return { get, isExist, remove, reset, set };
}
