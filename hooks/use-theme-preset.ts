"use client";

import { useCallback, useEffect, useState } from "react";

import {
  THEME_MODE_STORAGE_KEY,
  THEME_PRESET_STORAGE_KEY,
  type ThemeMode,
} from "@/lib/theme-storage";
import { DEFAULT_THEME_PRESET, getThemePreset } from "@/themes";

function applyToDocument(preset: string, mode: ThemeMode): void {
  const root = document.documentElement;
  root.dataset.theme = preset;
  root.classList.toggle("dark", mode === "dark");
}

function readDocumentState(): { preset: string; mode: ThemeMode } {
  const root = document.documentElement;
  const preset = root.dataset.theme ?? DEFAULT_THEME_PRESET;
  const mode: ThemeMode = root.classList.contains("dark") ? "dark" : "light";
  return { preset, mode };
}

/**
 * 현재 테마 프리셋/다크모드 상태를 읽고 바꾸는 훅.
 * <html> 의 data-theme / dark 클래스와 localStorage 를 동시에 갱신한다.
 * 첫 렌더는 서버와 동일하게 기본값으로 시작하고, mount 후에 FOUC 방지
 * 인라인 스크립트(app/layout.tsx)가 세팅해둔 <html> 속성으로 동기화한다
 * — useState 초기값에서 document 를 읽으면 hydration 불일치가 난다.
 */
export function useThemePreset() {
  const [state, setState] = useState<{ preset: string; mode: ThemeMode }>({
    preset: DEFAULT_THEME_PRESET,
    mode: "light",
  });
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    // hydration 직후 1회, 인라인 스크립트가 세팅한 <html> 상태로 동기화.
    // 서버 렌더와 첫 클라 렌더를 일치시키기 위한 의도적 mount-sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(readDocumentState());
    setSynced(true);
  }, []);

  useEffect(() => {
    if (!synced) return;
    applyToDocument(state.preset, state.mode);
  }, [synced, state.preset, state.mode]);

  const setPreset = useCallback((name: string) => {
    if (!getThemePreset(name)) return;
    globalThis.localStorage.setItem(THEME_PRESET_STORAGE_KEY, name);
    setState((prev) => ({ ...prev, preset: name }));
  }, []);

  const setMode = useCallback((mode: ThemeMode) => {
    globalThis.localStorage.setItem(THEME_MODE_STORAGE_KEY, mode);
    setState((prev) => ({ ...prev, mode }));
  }, []);

  const toggleMode = useCallback(() => {
    setState((prev) => {
      const next: ThemeMode = prev.mode === "dark" ? "light" : "dark";
      globalThis.localStorage.setItem(THEME_MODE_STORAGE_KEY, next);
      return { ...prev, mode: next };
    });
  }, []);

  return { preset: state.preset, mode: state.mode, setPreset, setMode, toggleMode };
}
