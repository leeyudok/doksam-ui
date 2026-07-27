// Google Analytics (gtag.js) 초기화 — 로더(googletagmanager.com/gtag/js)와 측정 ID
// (window.__GA_ID) 는 app/layout.tsx 가 NEXT_PUBLIC_GA_ID 기준으로 주입한다.
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
if (window.__GA_ID) {
  gtag("js", new Date());
  gtag("config", window.__GA_ID);
}
