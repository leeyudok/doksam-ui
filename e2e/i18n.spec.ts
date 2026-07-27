import { test, expect } from "@playwright/test";

/**
 * 다국어(i18n) E2E (#48).
 *
 * 로케일 전환은 localStorage + 클라이언트 컨텍스트라 vitest(jsdom)만으로는
 * FOUC 인라인 스크립트 → <html lang> → Provider 동기화의 전체 경로를 못 본다.
 * 여기서 실제 브라우저로 ① 기본 ko ② localStorage 복원 ③ 헤더 토글 전환을 검증한다.
 */

const LOCALE_KEY = "doksam-ui-locale";

test.describe("다국어 전환", () => {
  test("기본 ko — 홈 h1 이 한국어로 렌더된다", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1").first()).toContainText("doksam 프로젝트 공통 UI 표준 사이트");
    expect(await page.evaluate(() => document.documentElement.lang)).toBe("ko");
  });

  test("localStorage 의 ja 가 재방문 시 복원된다 (FOUC 스크립트 경로)", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(([k]) => localStorage.setItem(k, "ja"), [LOCALE_KEY]);
    await page.reload();
    expect(await page.evaluate(() => document.documentElement.lang)).toBe("ja");
    await expect(page.locator("h1").first()).not.toContainText("doksam 프로젝트 공통 UI 표준 사이트");
  });

  test("헤더 토글로 en 전환 시 홈 카피·카탈로그 설명이 번역된다", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "언어 선택" }).click();
    await page.getByRole("menuitemradio", { name: "English" }).click();
    await expect(page.locator("h1").first()).toContainText("doksam Project Shared UI Standard Site");

    await page.goto("/components");
    expect(await page.evaluate(() => document.documentElement.lang)).toBe("en");
    // 카테고리 라벨 번역 (ko "Form" 은 원래 영문이라 카드 설명으로 판정)
    await expect(page.locator("h1").first()).not.toContainText("컴포넌트 카탈로그");
  });

  test("es 로케일에서 patterns 인덱스가 번역 렌더된다", async ({ page }) => {
    await page.goto("/patterns");
    await page.evaluate(([k]) => localStorage.setItem(k, "es"), [LOCALE_KEY]);
    await page.reload();
    await expect(page.locator("h1").first()).not.toContainText("자주 쓰는 UI 패턴 모음");
    expect(await page.evaluate(() => document.documentElement.lang)).toBe("es");
  });
});
