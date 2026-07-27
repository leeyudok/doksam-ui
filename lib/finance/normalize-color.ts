/**
 * CSS 색상값을 hex 로 정규화하는 유틸 (news `web/components/StockChart.tsx` 이식, #18).
 *
 * doksam-ui 토큰은 oklch() 문자열인데, lightweight-charts 등 CSS 를 직접 파싱하지
 * 않는 캔버스/서드파티 렌더러는 hex/rgb 만 받아들인다. 최신 브라우저는 canvas
 * fillStyle 직렬화 시 oklch 를 보존하므로(CSS Color 4), 1x1 픽셀을 실제로 칠하고
 * getImageData 로 픽셀값을 읽어 hex 로 정규화한다 — 브라우저가 색공간 변환을
 * 대신 해주는 셈이라 별도의 OKLCH→sRGB 수식 구현이 필요 없다.
 *
 * SSR/캔버스 미지원 환경(jsdom 등)에서는 document/canvas 2d context 가 없을 수
 * 있으므로 입력값을 그대로 반환한다 — 호출부가 안전하게 폴백할 수 있게 한다.
 */
export function normalizeColor(cssColor: string): string {
  if (!cssColor) return cssColor;
  if (typeof document === "undefined") return cssColor;

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return cssColor;

  ctx.fillStyle = cssColor;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  const hex = (v: number) => v.toString(16).padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

/** CSS 커스텀 프로퍼티(--foo) 값을 읽어 hex 로 정규화한다. */
export function readCssVar(name: string): string {
  if (typeof document === "undefined") return "";
  return normalizeColor(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
}

/**
 * 유틸리티 클래스(text-gain 등)가 실제로 계산하는 color 값을 읽어 hex 로 정규화한다.
 * 임시 엘리먼트를 body 에 붙였다가 즉시 제거해서 computed style 을 읽어낸다.
 */
export function readClassColor(className: string): string {
  if (typeof document === "undefined") return "";
  const el = document.createElement("span");
  el.className = className;
  el.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;";
  document.body.appendChild(el);
  const color = getComputedStyle(el).color;
  el.remove();
  return normalizeColor(color);
}

/**
 * 다크모드/프리셋 전환("class" · "data-theme" · "data-font" 속성 변화)을 감지해
 * onChange 를 재실행하는 MutationObserver 를 붙인다. 최초 1회는 즉시 실행한다.
 * canvas/lightweight-charts 등 CSS 변수 변화를 스스로 구독하지 못하는 렌더러가
 * 테마 전환 시 색을 재해소하도록 하는 용도 — cleanup 함수를 반환한다.
 */
export function observeColorScheme(onChange: () => void): () => void {
  onChange();
  if (typeof document === "undefined" || typeof MutationObserver === "undefined") {
    return () => {};
  }
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "data-theme", "data-font"],
  });
  return () => observer.disconnect();
}
