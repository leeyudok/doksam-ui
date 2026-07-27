import { THEME_TOKEN_KEYS, type ThemePreset, type ThemeTokens } from "@/themes";

const INDENT = "  ";

function formatTokenBlock(selector: string, tokens: ThemeTokens): string {
  const lines = THEME_TOKEN_KEYS.map((key) => `${INDENT}--${key}: ${tokens[key]};`);
  return `${selector} {\n${lines.join("\n")}\n}`;
}

/**
 * app/globals.css 의 [data-theme="<name>"] / [data-theme="<name>"].dark
 * 블록과 동일한 텍스트를 themes/*.ts (단일 진실원천)로부터 생성한다.
 * /tokens 페이지의 "복사해 쓰는 법" 버튼이 이 텍스트를 복사해 소비 프로젝트의
 * globals.css 에 그대로 붙여넣을 수 있게 한다.
 */
export function generateThemeCss(preset: ThemePreset): string {
  const lightBlock = formatTokenBlock(`[data-theme="${preset.name}"]`, preset.light);
  const darkBlock = formatTokenBlock(`[data-theme="${preset.name}"].dark`, preset.dark);
  return `${lightBlock}\n\n${darkBlock}`;
}
