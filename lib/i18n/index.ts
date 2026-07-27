import en from "./messages/en.json";
import es from "./messages/es.json";
import ja from "./messages/ja.json";
import zh from "./messages/zh.json";

export type Locale = "ko" | "en" | "ja" | "zh" | "es";

export const LOCALES: Locale[] = ["ko", "en", "ja", "zh", "es"];
export const DEFAULT_LOCALE: Locale = "ko";

export const LOCALE_LABEL: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "中文",
  es: "Español",
};

// ko 는 코드 인라인 원문이 SSOT — 메시지 파일이 없다.
// en/ja/zh/es 스냅샷은 번역 DB 에서 생성해 레포에 커밋한다(빌드/CI 는 이 JSON 만 사용).
const MESSAGES: Record<Exclude<Locale, "ko">, Record<string, string>> = { en, ja, zh, es };

export function isLocale(v: string): v is Locale {
  return (LOCALES as string[]).includes(v);
}

/** ko 또는 누락 키는 undefined — 호출측(t)이 ko 원문으로 폴백한다. */
export function getMessage(locale: Locale, key: string): string | undefined {
  if (locale === "ko") return undefined;
  return MESSAGES[locale][key];
}
