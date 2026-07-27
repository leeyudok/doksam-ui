"use client";

import { useCallback, useEffect, useState } from "react";

import { DEFAULT_FONT_PRESET, getFontPreset } from "@/fonts";
import { FONT_STORAGE_KEY } from "@/lib/theme-storage";

function applyToDocument(font: string): void {
  document.documentElement.dataset.font = font;
}

function readDocumentState(): string {
  return document.documentElement.dataset.font ?? DEFAULT_FONT_PRESET;
}

/**
 * 현재 폰트 프리셋 상태를 읽고 바꾸는 훅 — hooks/use-theme-preset.ts 와 대칭.
 * <html> 의 data-font 와 localStorage 를 동시에 갱신한다.
 * 첫 렌더는 서버와 동일하게 기본값(geist)으로 시작하고, mount 후에 FOUC
 * 방지 인라인 스크립트(app/layout.tsx)가 세팅해둔 <html> 속성으로 동기화한다
 * — useState 초기값에서 document 를 읽으면 hydration 불일치가 난다.
 */
export function useFontPreset() {
  const [font, setFontState] = useState<string>(DEFAULT_FONT_PRESET);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    // hydration 직후 1회, 인라인 스크립트가 세팅한 <html> 상태로 동기화.
    // 서버 렌더와 첫 클라 렌더를 일치시키기 위한 의도적 mount-sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFontState(readDocumentState());
    setSynced(true);
  }, []);

  useEffect(() => {
    if (!synced) return;
    applyToDocument(font);
  }, [synced, font]);

  const setFont = useCallback((name: string) => {
    if (!getFontPreset(name)) return;
    globalThis.localStorage.setItem(FONT_STORAGE_KEY, name);
    setFontState(name);
  }, []);

  return { font, setFont };
}
