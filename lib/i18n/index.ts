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
// en/ja/zh/es 는 이 레포에 커밋된 JSON 이 진실원천이다(#73). 정적 import 라 번들에
// 인라인되고 런타임에 외부 조회가 없다 — 폐쇄망 원칙과 일관된다. 번역을 추가·수정할
// 때는 네 파일을 직접 고치면 되고, 대상 키 목록은 scripts/i18n/extract.mjs 가 코드에서
// 뽑아 두는 scripts/i18n/ko-catalog.json 에서 확인한다.
const MESSAGES: Record<Exclude<Locale, "ko">, Record<string, string>> = { en, ja, zh, es };

export function isLocale(v: string): v is Locale {
  return (LOCALES as string[]).includes(v);
}

/** ko 또는 누락 키는 undefined — 호출측(t)이 ko 원문으로 폴백한다. */
export function getMessage(locale: Locale, key: string): string | undefined {
  if (locale === "ko") return undefined;
  return MESSAGES[locale][key];
}
