import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  collectFiles,
  findExternalCssReferences,
  findExternalHtmlReferences,
  findExternalJsNetworkCalls,
  formatViolations,
  isAllowedReference,
  type Violation,
} from "./helpers/scan-build-output";

/**
 * 이슈 #17 — 폐쇄망 빌드 검증 자동 테스트.
 * #25 — Opus adversarial 검증에서 원래 스캐너(script/link 태그 + 하드코딩 5개 CDN
 * 힌트)가 다수의 벡터를 놓친다는 게 fixture로 실증됨 → 화이트리스트 방식으로 전환.
 *
 * 프로덕션 빌드(`pnpm build`) 산출물의 정적 HTML/CSS/JS를 스캔해서 "허용 목록
 * (상대경로/data:/blob:/#anchor/자기 오리진) 외의 모든 절대·프로토콜 상대 URL"이
 * 0건임을 실증한다.
 *
 * 스캔 대상은 실제 배포되는 산출물만이다:
 *  - `.next/server/app/**‍/*.html`  — 프리렌더된 정적 HTML (App Router SSG/ISR 페이지)
 *  - `.next/static/**‍/*.css`      — 브라우저가 `/_next/static/...` 로 직접 받는 CSS 청크
 *  - `.next/static/**‍/*.js`       — 브라우저가 실행하는 JS 청크
 * dev 서버 캐시(`.next/cache`, `.next/dev`)는 프로덕션에 배포되지 않으므로 제외한다.
 */

const REPO_ROOT = path.resolve(__dirname, "..");
const APP_HTML_DIR = path.join(REPO_ROOT, ".next", "server", "app");
const STATIC_DIR = path.join(REPO_ROOT, ".next", "static");

function relLabel(file: string): string {
  return path.relative(REPO_ROOT, file);
}

describe("폐쇄망 빌드 검증 — 외부 리소스 0건 (실제 빌드 산출물)", () => {
  it("프리렌더 HTML에 화이트리스트를 벗어나는 자산 참조가 없다", () => {
    const files = collectFiles(APP_HTML_DIR, [".html"]);
    expect(files.length).toBeGreaterThan(0);

    const violations: Violation[] = [];
    for (const file of files) {
      const content = readFileSync(file, "utf-8");
      violations.push(...findExternalHtmlReferences(relLabel(file), content));
    }

    expect(violations, `외부 리소스 참조 발견:\n${formatViolations(violations)}`).toHaveLength(0);
  });

  it("정적 CSS 청크에 화이트리스트를 벗어나는 url()/@import 가 없다", () => {
    const files = collectFiles(STATIC_DIR, [".css"]);
    expect(files.length).toBeGreaterThan(0);

    const violations: Violation[] = [];
    for (const file of files) {
      const content = readFileSync(file, "utf-8");
      violations.push(...findExternalCssReferences(relLabel(file), content));
    }

    expect(violations, `외부 CSS url()/@import 발견:\n${formatViolations(violations)}`).toHaveLength(0);
  });

  it("정적 JS 청크에 외부 호스트로의 fetch/import()/Worker 등 네트워크 호출이 없다", () => {
    const files = collectFiles(STATIC_DIR, [".js"]);
    expect(files.length).toBeGreaterThan(0);

    const violations: Violation[] = [];
    for (const file of files) {
      const content = readFileSync(file, "utf-8");
      violations.push(...findExternalJsNetworkCalls(relLabel(file), content));
    }

    expect(violations, `JS 외부 네트워크 호출 발견:\n${formatViolations(violations)}`).toHaveLength(0);
  });
});

describe("스캐너 자체 검증 — false negative 방지 (fixture)", () => {
  describe("isAllowedReference", () => {
    it("상대경로/data:/blob:/#anchor/빈 문자열을 허용한다", () => {
      expect(isAllowedReference("/_next/static/chunks/main.js")).toBe(true);
      expect(isAllowedReference("../media/foo.woff2")).toBe(true);
      expect(isAllowedReference("./foo.png")).toBe(true);
      expect(isAllowedReference("foo.png")).toBe(true);
      expect(isAllowedReference("data:image/png;base64,AAAA")).toBe(true);
      expect(isAllowedReference("blob:https://example.com/uuid")).toBe(true);
      expect(isAllowedReference("#section")).toBe(true);
      expect(isAllowedReference("")).toBe(true);
    });

    it("절대 URL과 프로토콜 상대 URL을 막는다", () => {
      expect(isAllowedReference("https://cdn.example.com/a.js")).toBe(false);
      expect(isAllowedReference("http://cdn.example.com/a.js")).toBe(false);
      expect(isAllowedReference("//cdn.example.com/a.js")).toBe(false);
    });

    // 폐쇄망 원칙의 명시적 예외 — Google Analytics(gtag.js), NEXT_PUBLIC_GA_ID 설정 시에만 로드.
    it("Google Analytics 호스트(로더/비콘)는 예외로 허용한다", () => {
      expect(isAllowedReference("https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX")).toBe(true);
      expect(isAllowedReference("https://www.google-analytics.com/g/collect")).toBe(true);
      expect(isAllowedReference("https://google-analytics.com/analytics.js")).toBe(true);
    });

    it("GA 를 사칭한 유사 호스트는 여전히 막는다", () => {
      expect(isAllowedReference("https://googletagmanager.com.evil.com/gtag/js")).toBe(false);
      expect(isAllowedReference("https://evil-google-analytics.com/collect")).toBe(false);
    });
  });

  describe("findExternalHtmlReferences", () => {
    it("외부 <script src> 가 있으면 잡아낸다", () => {
      const dirty = `<html><head><script src="https://cdn.jsdelivr.net/npm/foo@1/dist/foo.min.js"></script></head></html>`;
      expect(findExternalHtmlReferences("fixture.html", dirty)).toHaveLength(1);
    });

    it("로컬 <script src>만 있으면 위반 0건이다", () => {
      const clean = `<html><head><script src="/_next/static/chunks/main.js"></script></head></html>`;
      expect(findExternalHtmlReferences("fixture.html", clean)).toHaveLength(0);
    });

    it("외부 <link href> (폰트 CDN)가 있으면 잡아낸다", () => {
      const dirty = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter">`;
      expect(findExternalHtmlReferences("fixture.html", dirty)).toHaveLength(1);
    });

    it("외부 <img src> 가 있으면 잡아낸다", () => {
      const dirty = `<img src="https://images.example.com/logo.png" alt="logo">`;
      expect(findExternalHtmlReferences("fixture.html", dirty)).toHaveLength(1);
    });

    it("로컬 <img src> 는 위반이 아니다", () => {
      const clean = `<img src="/logo.png" alt="logo">`;
      expect(findExternalHtmlReferences("fixture.html", clean)).toHaveLength(0);
    });

    it("<img srcset> 안에 외부 URL이 섞여 있으면 잡아낸다", () => {
      const dirty = `<img src="/a.png" srcset="/a.png 1x, https://cdn.example.com/a@2x.png 2x">`;
      expect(findExternalHtmlReferences("fixture.html", dirty)).toHaveLength(1);
    });

    it("<iframe src>가 외부면 잡아낸다", () => {
      const dirty = `<iframe src="https://youtube.com/embed/xyz"></iframe>`;
      expect(findExternalHtmlReferences("fixture.html", dirty)).toHaveLength(1);
    });

    it("<video>/<audio>/<source> src가 외부면 잡아낸다", () => {
      const dirty = `<video><source src="https://media.example.com/clip.mp4"></video>`;
      expect(findExternalHtmlReferences("fixture.html", dirty)).toHaveLength(1);
    });

    it("<object>/<embed> src가 외부면 잡아낸다", () => {
      expect(findExternalHtmlReferences("fixture.html", `<object src="https://example.com/a.pdf"></object>`)).toHaveLength(1);
      expect(findExternalHtmlReferences("fixture.html", `<embed src="https://example.com/a.swf">`)).toHaveLength(1);
    });

    it("프로토콜 상대(//host) <script src>도 잡아낸다", () => {
      const dirty = `<script src="//cdn.example.com/a.js"></script>`;
      expect(findExternalHtmlReferences("fixture.html", dirty)).toHaveLength(1);
    });

    it("인라인 style=\"...url(https://...)\" 를 잡아낸다", () => {
      const dirty = `<div style="background-image:url(https://cdn.example.com/bg.png)"></div>`;
      expect(findExternalHtmlReferences("fixture.html", dirty)).toHaveLength(1);
    });

    it("인라인 style의 상대/data: url()은 위반이 아니다", () => {
      const clean = `<div style="background-image:url(/bg.png)"></div><span style="background:url(data:image/png;base64,AAAA)"></span>`;
      expect(findExternalHtmlReferences("fixture.html", clean)).toHaveLength(0);
    });
  });

  describe("findExternalCssReferences", () => {
    it("CSS url(http...) 이 있으면 잡아낸다", () => {
      const dirty = `@font-face{src:url(https://fonts.gstatic.com/s/foo.woff2) format('woff2');}`;
      expect(findExternalCssReferences("fixture.css", dirty)).toHaveLength(1);
    });

    it("CSS 상대경로 url()은 위반이 아니다", () => {
      const clean = `@font-face{src:url(../media/foo.woff2) format('woff2');}`;
      expect(findExternalCssReferences("fixture.css", clean)).toHaveLength(0);
    });

    it("프로토콜 상대 CSS url(//host)도 잡아낸다", () => {
      const dirty = `@font-face{src:url(//fonts.gstatic.com/s/foo.woff2);}`;
      expect(findExternalCssReferences("fixture.css", dirty)).toHaveLength(1);
    });

    it("문자열형 @import \"https://...\" (url() 없음)를 잡아낸다", () => {
      const dirty = `@import "https://fonts.googleapis.com/css2?family=Inter";`;
      expect(findExternalCssReferences("fixture.css", dirty)).toHaveLength(1);
    });

    it("상대경로 @import는 위반이 아니다", () => {
      const clean = `@import "./tokens.css";`;
      expect(findExternalCssReferences("fixture.css", clean)).toHaveLength(0);
    });
  });

  describe("findExternalJsNetworkCalls", () => {
    it("fetch(\"https://...\") 를 잡아낸다", () => {
      const dirty = `async function load(){return fetch("https://api.example.com/data").then(r=>r.json())}`;
      expect(findExternalJsNetworkCalls("fixture.js", dirty)).toHaveLength(1);
    });

    it("동적 import(\"https://...\") 를 잡아낸다", () => {
      const dirty = `import("https://esm.sh/left-pad@1").then(m=>m.default)`;
      expect(findExternalJsNetworkCalls("fixture.js", dirty)).toHaveLength(1);
    });

    it("프로토콜 상대 fetch(\"//host\") 도 잡아낸다", () => {
      const dirty = `fetch("//api.example.com/data")`;
      expect(findExternalJsNetworkCalls("fixture.js", dirty)).toHaveLength(1);
    });

    it("new Worker(...) / new EventSource(...) / sendBeacon(...) 외부 URL도 잡아낸다", () => {
      expect(findExternalJsNetworkCalls("fixture.js", `new Worker("https://cdn.example.com/worker.js")`)).toHaveLength(1);
      expect(findExternalJsNetworkCalls("fixture.js", `new EventSource("https://sse.example.com/stream")`)).toHaveLength(1);
      expect(findExternalJsNetworkCalls("fixture.js", `navigator.sendBeacon("https://analytics.example.com/hit")`)).toHaveLength(1);
    });

    it("로컬 상대경로 fetch/import()는 위반이 아니다", () => {
      const clean = `fetch("/api/data");import("./chunk.js")`;
      expect(findExternalJsNetworkCalls("fixture.js", clean)).toHaveLength(0);
    });

    // 원본 5개 힌트 하드코딩 방식은 이 케이스(힌트 목록에 없는 CDN)를 놓쳤다.
    it("힌트 목록에 없던 임의의 외부 호스트(분석/에러추적 등)도 잡아낸다", () => {
      const dirty = `fetch("https://sentry.io/api/1/envelope/")`;
      expect(findExternalJsNetworkCalls("fixture.js", dirty)).toHaveLength(1);
    });

    // 벤더 번들에 흔한 "에러 메시지 속 문서 링크"는 실제 네트워크 호출이 아니므로
    // 오탐이면 안 된다(이 레포의 실제 산출물에도 이런 문자열이 다수 존재함을 확인).
    it("fetch/import 호출이 아닌 URL 문자열(에러 메시지 속 문서 링크 등)은 위반이 아니다", () => {
      const clean = `function err(code){return "Minified Redux error #"+code+"; visit https://redux.js.org/Errors?code="+code}`;
      expect(findExternalJsNetworkCalls("fixture.js", clean)).toHaveLength(0);
    });

    it("XML 네임스페이스 문자열(createElementNS 등)은 위반이 아니다", () => {
      const clean = `document.createElementNS("http://www.w3.org/2000/svg","svg")`;
      expect(findExternalJsNetworkCalls("fixture.js", clean)).toHaveLength(0);
    });
  });
});
