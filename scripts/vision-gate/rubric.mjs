// scripts/vision-gate/rubric.mjs
//
// Page list + per-page expectations for the vision gate (issue #42, C영역).
// Kept small on purpose — every entry here is one screenshot + one Claude
// vision call, so the list is capped around 8-10 pages to bound API cost.

/**
 * Rubric criteria applied to every page (issue #42 spec):
 *  (a) 텍스트 겹침/잘림 없나       - no overlapping or clipped text
 *  (b) 주요 요소(내비·제목·CTA) 보이나 - key elements (nav/title/CTA) visible
 *  (c) 레이아웃 깨짐/요소 이탈 없나   - no broken layout / elements escaping their container
 *  (d) 색/대비 이상 없나           - no color/contrast anomalies
 *  (e) 페이지 의도에 부합하나        - page fulfills its intended purpose
 */
export const RUBRIC_CRITERIA = [
  {
    id: "no_overlap_or_clipping",
    label: "텍스트 겹침/잘림 없음",
    description:
      "No text overlaps other text/elements, and no text is clipped or truncated unexpectedly (ellipsis by design is fine; mid-word cutoff is not).",
  },
  {
    id: "key_elements_visible",
    label: "주요 요소 가시성",
    description:
      "Primary navigation, page title/heading, and any primary call-to-action are visible and legible.",
  },
  {
    id: "layout_integrity",
    label: "레이아웃 무결성",
    description:
      "No broken layout: no elements escaping their container, no obvious misalignment, no overlapping cards/panels.",
  },
  {
    id: "color_contrast",
    label: "색/대비 정상",
    description:
      "No color or contrast anomalies: text is readable against its background, no unstyled/raw HTML flashes, no broken theming.",
  },
  {
    id: "intent_fulfilled",
    label: "페이지 의도 부합",
    description:
      "The page visually fulfills its stated purpose (see the page's `intent` field below).",
  },
];

/**
 * Pages to screenshot + grade. Paths are relative to VISION_BASE_URL.
 * Capped at ~10 entries: home, a few top-level sections, template samples,
 * and a couple of components/patterns pages.
 */
export const PAGES = [
  { path: "/", name: "home", intent: "Landing/overview page introducing the doksam-ui design system." },
  { path: "/tokens", name: "tokens", intent: "Design token reference (colors, spacing, typography) presented as a browsable catalog." },
  { path: "/icons", name: "icons", intent: "Icon library browser — grid of icons with search/filter." },
  { path: "/components", name: "components", intent: "Component catalog listing available UI components." },
  { path: "/patterns", name: "patterns", intent: "Pattern catalog listing composed UI patterns." },
  { path: "/rules", name: "rules", intent: "Design/usage rules documentation page." },
  { path: "/profiles", name: "profiles", intent: "Theme/profile picker showing available visual profiles." },
  { path: "/templates/admin", name: "template-admin", intent: "Full admin dashboard template: sidebar nav, data tables/widgets." },
  { path: "/templates/brokerage", name: "template-brokerage", intent: "Brokerage/trading template: watchlist, screener, order entry." },
  { path: "/templates/shop", name: "template-shop", intent: "E-commerce shop template: product grid, cart affordances." },
];
