import { getFontPreset } from "@/fonts";
import { generateThemeCss } from "@/lib/theme-css";
import type { BrandProfile } from "@/profiles";
import { getThemePreset } from "@/themes";

/**
 * 프로필 하나를 소비 프로젝트에 그대로 적용할 수 있는 코드 블록으로 직렬화한다.
 * lib/theme-css.ts(generateThemeCss)가 만드는 프리셋 CSS 변수 블록에 프로필
 * 선언 주석과 <html data-theme data-font> 지정 스니펫을 덧붙인다.
 * theme/font 참조가 레지스트리에 없으면(레지스트리 불일치) 빈 문자열을 반환한다.
 */
export function generateProfileCode(profile: BrandProfile): string {
  const theme = getThemePreset(profile.theme);
  const font = getFontPreset(profile.font);
  if (!theme || !font) return "";

  const comment = `/* 프로필: ${profile.label} (${profile.name}) — ${profile.description} */`;
  const themeCss = generateThemeCss(theme);
  // app/globals.css 의 밀도 토큰 층(#65)과 동일 값 — 소비 프로젝트가 그대로 복사한다.
  const densityCss = [
    "/* 밀도(density) 토큰 층 — <html data-density> 가 소비 */",
    "[data-density] {",
    "  --control-h: 2rem;",
    "  --cell-py: 0.5rem;",
    "  --stack-gap: 1.5rem;",
    "}",
    '[data-density="compact"] {',
    "  --control-h: 1.75rem;",
    "  --cell-py: 0.25rem;",
    "  --stack-gap: 1rem;",
    "}",
    '[data-density] [data-slot="input"] {',
    "  height: var(--control-h);",
    "}",
    '[data-density] [data-slot="table-cell"] {',
    "  padding-block: var(--cell-py);",
    "}",
  ].join("\n");
  const htmlAttrs = [
    `data-theme="${profile.theme}"`,
    `data-font="${profile.font}"`,
    `data-density="${profile.density}"`,
    `style="--radius: ${profile.radius}"`,
  ];
  const htmlTag =
    profile.defaultMode === "dark"
      ? `<html ${htmlAttrs.join(" ")} class="dark">`
      : `<html ${htmlAttrs.join(" ")}>`;

  return [
    comment,
    themeCss,
    "",
    densityCss,
    "",
    `<!-- app/layout.tsx 의 <html> 태그에 그대로 지정 -->`,
    htmlTag,
  ].join("\n");
}
