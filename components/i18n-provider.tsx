"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { DEFAULT_LOCALE, getMessage, isLocale, type Locale } from "@/lib/i18n";
import { LOCALE_STORAGE_KEY } from "@/lib/theme-storage";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, koDefault: string, params?: Record<string, string | number>) => string;
}

/** "{n}" 형태 플레이스홀더를 params 값으로 치환한다. */
function interpolate(text: string, params?: Record<string, string | number>): string {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (m, name: string) =>
    name in params ? String(params[name]) : m,
  );
}

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * 로케일 컨텍스트 — use-font-preset 과 같은 mount-sync 패턴.
 * 서버/첫 클라 렌더는 ko 로 고정하고, mount 후 <html lang>(FOUC 인라인
 * 스크립트가 세팅)으로 동기화한다. 비ko 로케일은 hydration 후 적용되므로
 * 짧은 ko 플래시가 허용 스펙이다(#48).
 */
export function I18nProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const docLang = document.documentElement.lang;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isLocale(docLang)) setLocaleState(docLang);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    globalThis.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    document.documentElement.lang = next;
    setLocaleState(next);
  }, []);

  const t = useCallback(
    (key: string, koDefault: string, params?: Record<string, string | number>) =>
      interpolate(getMessage(locale, key) ?? koDefault, params),
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// Provider 부재 시(고립 렌더·테스트) ko 기본으로 동작 — t 는 원문 폴백,
// setLocale 은 no-op. 실제 앱은 루트 레이아웃이 항상 Provider 를 장착한다.
const FALLBACK: I18nContextValue = {
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (_key, koDefault, params) => interpolate(koDefault, params),
};

export function useI18n(): I18nContextValue {
  return useContext(I18nContext) ?? FALLBACK;
}
