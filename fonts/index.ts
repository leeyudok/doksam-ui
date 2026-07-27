/**
 * 폰트 프리셋 레지스트리 — 테마 레지스트리(themes/index.ts)와 대칭 구조.
 *
 * 새 프리셋을 추가하려면:
 *   1. woff2 파일을 assets/fonts/<name>/ 에 커밋(라이선스 파일 포함)하고
 *      app/layout.tsx 에서 next/font/local 로 로드해 variable 지정
 *      (폐쇄망 대응 — next/font/google 은 빌드 타임 외부 fetch가 발생해 쓰지 않는다)
 *   2. 아래 FONT_PRESETS 배열에 { name, label, cssVariable } 등록
 *   3. app/globals.css 의 [data-font="<name>"] 블록에 --font-active 매핑 추가
 *      (fonts/index.ts 가 단일 진실원천 — CSS 는 동일 변수명을 손으로 미러링한다)
 *
 * 그러면 폰트 스위처와 사이트 전체에 자동으로 반영된다.
 */
export interface FontPreset {
  /** 레지스트리 키 겸 data-font 속성 값 (예: "noto-sans-kr"). */
  name: string;
  /** 스위처 UI 에 노출할 표시명 (예: "Noto Sans KR"). */
  label: string;
  /** next/font 가 생성하는 CSS 변수 이름 (예: "--font-noto-sans-kr"). */
  cssVariable: string;
}

/**
 * 폰트 프리셋 레지스트리 — 단일 진실원천.
 * 전부 무료(SIL Open Font License) 폰트만 사용한다.
 */
export const FONT_PRESETS: FontPreset[] = [
  { name: "geist", label: "Geist", cssVariable: "--font-geist-sans" },
  { name: "noto-sans-kr", label: "Noto Sans KR", cssVariable: "--font-noto-sans-kr" },
  { name: "ibm-plex-kr", label: "IBM Plex Sans KR", cssVariable: "--font-ibm-plex-kr" },
  { name: "nanum-gothic", label: "Nanum Gothic", cssVariable: "--font-nanum-gothic" },
  {
    name: "space-grotesk",
    label: "Space Grotesk (라틴 전용 — 한글은 시스템 폴백)",
    cssVariable: "--font-space-grotesk",
  },
];

export const DEFAULT_FONT_PRESET = "geist";

/** 스위처 툴팁 / /tokens 타이포 섹션에 노출하는 라이선스 한 줄 표기. */
export const FONT_LICENSE_NOTE =
  "Geist · Noto Sans KR · IBM Plex Sans KR · Nanum Gothic · Space Grotesk — 모두 SIL Open Font License(OFL) 무료 폰트이며, " +
  "assets/fonts/ 에 self-host(woff2 내장)되어 폐쇄망에서도 외부 CDN 요청 없이 동작합니다. " +
  "Space Grotesk 는 라틴 전용 폰트로 한글은 시스템 폰트로 폴백되며, mono 요소는 페어링 폰트인 Space Mono 로 함께 전환됩니다(다른 프리셋은 Geist Mono 유지).";

export function getFontPreset(name: string): FontPreset | undefined {
  return FONT_PRESETS.find((preset) => preset.name === name);
}
