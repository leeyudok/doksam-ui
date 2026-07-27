import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

// 폐쇄망 대응(#10)으로 next/font/google → next/font/local 전환. localFont()는
// 호출 시 넘긴 옵션의 variable 을 그대로 돌려주는 mock으로 충분 — 실제 woff2
// 로딩/서브셋팅은 next 빌드 파이프라인의 책임이라 유닛 테스트 범위 밖이다.
vi.mock("next/font/local", () => ({
  default: (options: { variable: string }) => ({ variable: options.variable }),
}));
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: () => {}, replace: () => {}, prefetch: () => {} }),
}));

import RootLayout from "@/app/layout";
import { DEFAULT_FONT_PRESET } from "@/fonts";
import { FONT_STORAGE_KEY, THEME_MODE_STORAGE_KEY, THEME_PRESET_STORAGE_KEY } from "@/lib/theme-storage";
import { DEFAULT_THEME_PRESET } from "@/themes";

describe("RootLayout", () => {
  it("renders the top nav, theme switcher, and page content", () => {
    const html = renderToStaticMarkup(<RootLayout>{"page-content-marker"}</RootLayout>);

    expect(html).toContain("page-content-marker");
    // 상단 내비 브랜드 링크
    expect(html).toContain("doksam-ui");
    // 다크모드 토글 버튼 (기본은 light → "다크 모드로 전환" 라벨)
    expect(html).toContain("다크 모드로 전환");
    // 폰트 프리셋 선택
    expect(html).toContain("폰트 프리셋");
  });

  it("sets the default theme/font preset on <html> and embeds the FOUC-prevention script", () => {
    const html = renderToStaticMarkup(<RootLayout>{"child"}</RootLayout>);

    expect(html).toContain(`data-theme="${DEFAULT_THEME_PRESET}"`);
    expect(html).toContain(`data-font="${DEFAULT_FONT_PRESET}"`);
    expect(html).toContain(THEME_PRESET_STORAGE_KEY);
    expect(html).toContain(THEME_MODE_STORAGE_KEY);
    expect(html).toContain(FONT_STORAGE_KEY);
    expect(html).toContain("prefers-color-scheme: dark");
  });
});
