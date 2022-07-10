// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce<T extends Function>(
  callback: T,
  wait: number,
): (...args: unknown[]) => void {
  let timeout: number;

  return function (this: unknown, ...args: unknown[]): void {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => callback.apply(this, args), wait);
  };
}
