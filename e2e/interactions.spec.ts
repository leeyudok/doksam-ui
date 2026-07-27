import { test, expect } from "@playwright/test";

/**
 * 핵심 인터랙션 실브라우저 E2E (#42 B영역).
 * 레이아웃 불변식(e2e/invariants.spec.ts)과 달리, 클릭·타이핑 이후 상태
 * 전이(URL·DOM 속성·텍스트 갱신)가 실제로 일어나는지를 검증한다.
 * 셀렉터는 role/text 우선 — 구현 디테일(클래스명)에 의존하지 않는다.
 */

test.describe("커맨드 팔레트 (⌘K)", () => {
  test("검색 버튼 클릭 → 팔레트 열림 → 항목 클릭 → 이동", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.getByRole("button", { name: "검색" }).click();

    const dialog = page.getByRole("dialog", { name: "검색" });
    await expect(dialog).toBeVisible();

    const input = dialog.getByRole("combobox");
    await input.fill("Tokens");

    await page.getByRole("option", { name: /Tokens/ }).click();

    await expect(page).toHaveURL(/\/tokens$/);
    await expect(dialog).toBeHidden();
  });

  test("⌘K(Ctrl+K) 단축키로 팔레트가 열리고, 타이핑한 항목을 클릭하면 이동한다", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.keyboard.press("ControlOrMeta+k");

    const dialog = page.getByRole("dialog", { name: "검색" });
    await expect(dialog).toBeVisible();

    const input = dialog.getByRole("combobox");
    await input.fill("Trading Dashboard");
    await page.getByRole("option", { name: /Trading Dashboard/ }).click();

    await expect(page).toHaveURL(/\/templates\/trading$/);
  });
});

test.describe("/profiles — 프로필 미리보기", () => {
  test("프로필 미리보기 클릭 → html data-theme/data-font 전환", async ({ page }) => {
    await page.goto("/profiles");
    await page.waitForLoadState("networkidle");

    const html = page.locator("html");

    // "Data" 프로필 카드 — theme: violet, font: space-grotesk (다른 프리셋과 확실히 구분됨).
    // CardTitle 은 시맨틱 heading 이 아닌 div 라 [data-slot="card"](shadcn 표준 슬롯 속성) +
    // 카드 제목 텍스트로 카드를 찾는다.
    const dataCard = page.locator('[data-slot="card"]').filter({ hasText: "Data" });
    await dataCard.getByRole("button", { name: "이 프로필 미리보기" }).click();

    await expect(html).toHaveAttribute("data-theme", "violet");
    await expect(html).toHaveAttribute("data-font", "space-grotesk");

    // admin 프로필(slate/geist)로 바꾸면 실제로 값이 달라지는지도 확인 — 고정값 우연 통과 방지.
    const adminCard = page.locator('[data-slot="card"]').filter({ hasText: "Admin" });
    await adminCard.getByRole("button", { name: /이 프로필 미리보기|적용됨/ }).click();

    await expect(html).toHaveAttribute("data-theme", "slate");
    await expect(html).toHaveAttribute("data-font", "geist");
  });
});

test.describe("/templates/brokerage — 스크리너 행 클릭 → 종목상세 갱신", () => {
  test("행 클릭 시 가운데 종목상세 제목이 클릭한 종목명으로 바뀐다", async ({ page }) => {
    await page.goto("/templates/brokerage");
    await page.waitForLoadState("networkidle");

    const rows = page.getByRole("row");
    // 첫 행(rows.nth(0))은 헤더 — 첫 데이터 행과 두 번째 데이터 행을 비교해
    // "아무 텍스트나 있으면 통과"가 아니라 실제로 선택에 따라 바뀌는지 확인한다.
    const firstDataRow = rows.nth(1);
    const secondDataRow = rows.nth(2);

    // "종목" 열(두 번째 td) 안의 두 번째 span 이 종목명 — 첫 번째 span 은 로고 이니셜(aria-hidden).
    const firstStockName = await firstDataRow.locator("td").nth(1).locator("span").nth(1).innerText();
    const secondStockName = await secondDataRow.locator("td").nth(1).locator("span").nth(1).innerText();
    expect(firstStockName).not.toEqual(secondStockName);

    // StockDetail 패널의 제목(CardTitle text-xl)만 특정한다 — 스크리너 테이블 행에도 같은
    // 종목명 텍스트가 있어 일반 getByText 만으로는 "패널이 갱신됐는지"를 구분 못 한다.
    const detailTitle = page.locator('[data-slot="card-title"].text-xl');

    await firstDataRow.click();
    await expect(detailTitle).toHaveText(firstStockName);

    await secondDataRow.click();
    await expect(detailTitle).toHaveText(secondStockName);
  });
});

test.describe("/components — layer 필터 탭", () => {
  test("Composition 탭 클릭 → doksam 배지 카드만 남는다", async ({ page }) => {
    await page.goto("/components");
    await page.waitForLoadState("networkidle");

    const tablist = page.getByRole("tablist", { name: "계층 필터" });
    await expect(tablist).toBeVisible();

    // 카드 배지만 특정한다 — 상단 소개문단에도 "shadcn"/"doksam" 이 인라인 코드로
    // 항상 등장해서 일반 getByText 로는 필터 후에도 텍스트가 안 사라진다.
    const shadcnBadges = page.locator('[data-slot="badge"]').filter({ hasText: "shadcn" });
    const doksamBadges = page.locator('[data-slot="badge"]').filter({ hasText: "doksam" });

    // 필터 전에는 shadcn 배지 카드도 존재해야 한다(그래야 필터가 실제로 뭔가를 줄인 것).
    await expect(shadcnBadges.first()).toBeVisible();
    expect(await shadcnBadges.count()).toBeGreaterThan(0);

    await tablist.getByRole("tab", { name: "Composition" }).click();

    await expect(shadcnBadges).toHaveCount(0);
    await expect(doksamBadges.first()).toBeVisible();
    expect(await doksamBadges.count()).toBeGreaterThan(0);
  });
});

test.describe("/templates — DevicePreview 토글", () => {
  test("모바일 토글 클릭 → 프리뷰 컨테이너 폭이 좁아진다", async ({ page }) => {
    await page.goto("/templates");
    await page.waitForLoadState("networkidle");

    const previewGroup = page.getByRole("group", { name: "디바이스 프리뷰 폭 전환" });
    await expect(previewGroup).toBeVisible();

    const frame = page.locator("[data-device-mode]");
    const desktopBox = await frame.boundingBox();
    expect(desktopBox).not.toBeNull();

    await previewGroup.getByRole("button", { name: "모바일" }).click();
    await expect(frame).toHaveAttribute("data-device-mode", "mobile");

    // 애니메이션(transition-[width]) 종료를 기다렸다가 폭을 잰다.
    await page.waitForTimeout(300);
    const mobileBox = await frame.boundingBox();
    expect(mobileBox).not.toBeNull();

    expect(mobileBox!.width).toBeLessThan(desktopBox!.width);
    expect(mobileBox!.width).toBeLessThanOrEqual(390 + 1);
  });
});
