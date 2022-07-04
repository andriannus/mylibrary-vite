export interface RouterHook {
  push(path: string): void;
  show(): void;
  replace(path: string): void;
}
