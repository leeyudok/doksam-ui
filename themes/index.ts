import { ember } from "./ember";
import { forest } from "./forest";
import { gold } from "./gold";
import { inkBulb } from "./ink-bulb";
import { ocean } from "./ocean";
import { rose } from "./rose";
import { slate } from "./slate";
import type { ThemePreset } from "./types";
import { violet } from "./violet";

export type { ThemePreset, ThemeTokens } from "./types";
export { THEME_TOKEN_KEYS } from "./types";

/**
 * 테마 프리셋 레지스트리 — 단일 진실원천.
 * 여기에 항목을 추가/제거하면 스위처와 사이트 전체에 자동 반영된다.
 * (CSS 변수는 app/globals.css 에 별도로 동기화해야 함 — 파일 상단 주석 참고)
 */
export const THEME_PRESETS: ThemePreset[] = [ocean, forest, violet, ember, rose, slate, gold, inkBulb];

export const DEFAULT_THEME_PRESET = "ocean";

export function getThemePreset(name: string): ThemePreset | undefined {
  return THEME_PRESETS.find((preset) => preset.name === name);
}
