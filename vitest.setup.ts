import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// Node 22+ 는 실험적 전역 localStorage(getter/setter)를 정의해두는데, 플래그
// (--localstorage-file) 없이 접근하면 undefined 로 shadow 되어 jsdom의
// window.localStorage 를 덮어써버린다. 테스트 안정성을 위해 순수 in-memory
// Storage 구현으로 명시 교체한다.
class MemoryStorage implements Storage {
  #store = new Map<string, string>();

  get length(): number {
    return this.#store.size;
  }

  clear(): void {
    this.#store.clear();
  }

  getItem(key: string): string | null {
    return this.#store.has(key) ? (this.#store.get(key) as string) : null;
  }

  key(index: number): string | null {
    return Array.from(this.#store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.#store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.#store.set(key, String(value));
  }
}

for (const target of [globalThis, window] as const) {
  Object.defineProperty(target, "localStorage", {
    value: new MemoryStorage(),
    configurable: true,
    writable: true,
  });
}
