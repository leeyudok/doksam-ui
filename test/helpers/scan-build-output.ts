import { readdirSync, statSync } from "node:fs";
import path from "node:path";

/**
 * closed-network.test.ts / sourcemap.test.ts 공용 스캐너.
 * 순수 함수로 분리해서 "일부러 위반을 넣은 fixture가 실제로 잡히는지"를
 * 파일시스템 없이(문자열만으로) 단위 테스트할 수 있게 한다 — false negative 방지용 실증.
 *
 * #25 adversarial follow-up: 원래 구현은 <script src>/<link href> 태그와
 * 하드코딩된 5개 CDN 도메인 문자열만 검사했다 — <img>/<iframe>/srcset/인라인
 * style url()/CSS @import 문자열형/프로토콜 상대(`//host`)/JS fetch·import()
 * 호출을 모두 놓쳤다(Opus adversarial 검증에서 fixture로 실증됨). 블랙리스트
 * (하드코딩 CDN 힌트) 방식을 화이트리스트 방식으로 전환한다: "허용 목록(상대경로/
 * data:/blob:/#anchor) 외의 모든 절대 또는 프로토콜 상대 URL"을 위반으로 본다.
 */

export interface Violation {
  file: string;
  reason: string;
  match: string;
}

/**
 * 폐쇄망 "외부 리소스 0건" 원칙의 명시적 예외 — Google Analytics(gtag.js).
 * NEXT_PUBLIC_GA_ID 가 설정된 배포(ui.doksam.com)에서만 gtag 를 로드한다 — 미설정이면
 * 외부 리소스가 0건이다. 로더 호스트(googletagmanager.com)와 수집 비콘 호스트
 * (google-analytics.com)만 허용한다. 이 레포 산출물을 실제 폐쇄망에서 재사용하는
 * 다운스트림에서는 로더가 도달 불가라 gtag 가 no-op 으로 무해하게 무시된다.
 */
const ANALYTICS_ALLOWED_HOSTS = new Set([
  "www.googletagmanager.com",
  "googletagmanager.com",
  "www.google-analytics.com",
  "google-analytics.com",
]);

/** 절대/프로토콜 상대 URL에서 호스트만 추출한다(없으면 null). */
function hostOf(url: string): string | null {
  const m = /^(?:[a-z][a-z0-9+\-.]*:)?\/\/([^/?#]+)/i.exec(url.trim());
  return m ? m[1].toLowerCase() : null;
}

/**
 * URL이 폐쇄망에서도 안전한 "허용" 참조인지 판단한다.
 * 허용: 상대경로(`/_next/...`, `../media/...`, `./foo`, `foo.js`), `data:`, `blob:`,
 *       페이지 내 앵커(`#foo`), 빈 문자열, 그리고 ANALYTICS_ALLOWED_HOSTS 예외 호스트.
 * 불허(위반): 스킴을 가진 절대 URL(`https://...`, `http://...`) 및 프로토콜 상대
 *             URL(`//host/...`) — 스킴이 무엇이든(커스텀 스킴 포함) 절대/프로토콜
 *             상대 형태면 전부 막는다.
 */
export function isAllowedReference(url: string): boolean {
  const trimmed = url.trim();
  if (trimmed === "") return true;
  if (trimmed.startsWith("#")) return true;
  if (trimmed.startsWith("data:")) return true;
  if (trimmed.startsWith("blob:")) return true;
  // 스킴://... 또는 프로토콜 상대 //host 는 전부 절대 참조로 간주해 막되,
  // GA 예외 호스트(ANALYTICS_ALLOWED_HOSTS)만 허용한다.
  if (/^(?:[a-z][a-z0-9+\-.]*:)?\/\//i.test(trimmed)) {
    const host = hostOf(trimmed);
    return host !== null && ANALYTICS_ALLOWED_HOSTS.has(host);
  }
  return true;
}

/**
 * 디렉터리를 재귀 순회하며 주어진 확장자의 파일 경로를 모은다.
 * 대상 디렉터리가 없으면(빌드 미실행) 에러를 던진다 — 스캔 대상 0건인 채로
 * 테스트가 "통과"해버리는 false positive(그린인데 사실 아무것도 안 봄)를 막기 위함.
 */
export function collectFiles(dir: string, extensions: readonly string[]): string[] {
  if (!statSyncSafe(dir)) {
    throw new Error(`빌드 산출물 디렉터리가 없다: ${dir} — 스캔 전에 프로덕션 빌드가 필요하다.`);
  }
  const results: string[] = [];
  const stack = [dir];
  while (stack.length > 0) {
    const current = stack.pop() as string;
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
        results.push(full);
      }
    }
  }
  return results;
}

function statSyncSafe(p: string): boolean {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}

/** `srcset="url1 1x, url2 2x"` 형태를 개별 URL로 분리한다. */
function splitSrcset(value: string): string[] {
  return value
    .split(",")
    .map((part) => part.trim().split(/\s+/)[0])
    .filter((u): u is string => Boolean(u));
}

/** 인라인 `style="...url(...)..."` 안의 url(...) 인자를 추출한다. */
function extractStyleUrls(styleValue: string): string[] {
  const urls: string[] = [];
  const urlRe = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;
  let m: RegExpExecArray | null;
  while ((m = urlRe.exec(styleValue)) !== null) {
    urls.push(m[1]);
  }
  return urls;
}

/** 자산 참조를 낼 수 있는 태그 목록 — src/srcset 검사 대상. */
const ASSET_SRC_TAGS = ["script", "img", "iframe", "video", "audio", "source", "object", "embed"] as const;

/**
 * HTML 콘텐츠 전체를 스캔해 화이트리스트를 벗어나는 자산 참조를 찾는다.
 * 대상: script/img/iframe/video/audio/source/object/embed 의 src/srcset,
 *       link 의 href, 모든 태그의 인라인 style="...url(...)".
 */
export function findExternalHtmlReferences(fileLabel: string, html: string): Violation[] {
  const violations: Violation[] = [];

  const tagRe = /<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g;
  let tagMatch: RegExpExecArray | null;
  while ((tagMatch = tagRe.exec(html)) !== null) {
    const tagName = tagMatch[1].toLowerCase();
    const attrs = tagMatch[2];

    if (ASSET_SRC_TAGS.includes(tagName as (typeof ASSET_SRC_TAGS)[number])) {
      const srcMatch = /\bsrc=["']([^"']*)["']/i.exec(attrs);
      if (srcMatch && !isAllowedReference(srcMatch[1])) {
        violations.push({ file: fileLabel, reason: `외부 <${tagName} src>`, match: srcMatch[1] });
      }
      const srcsetMatch = /\bsrcset=["']([^"']*)["']/i.exec(attrs);
      if (srcsetMatch) {
        for (const url of splitSrcset(srcsetMatch[1])) {
          if (!isAllowedReference(url)) {
            violations.push({ file: fileLabel, reason: `외부 <${tagName} srcset>`, match: url });
          }
        }
      }
    }

    if (tagName === "link") {
      const hrefMatch = /\bhref=["']([^"']*)["']/i.exec(attrs);
      if (hrefMatch && !isAllowedReference(hrefMatch[1])) {
        violations.push({ file: fileLabel, reason: "외부 <link href>", match: hrefMatch[1] });
      }
    }

    const styleMatch = /\bstyle=["']([^"']*)["']/i.exec(attrs);
    if (styleMatch) {
      for (const url of extractStyleUrls(styleMatch[1])) {
        if (!isAllowedReference(url)) {
          violations.push({ file: fileLabel, reason: `외부 인라인 style url() (<${tagName}>)`, match: url });
        }
      }
    }
  }

  return violations;
}

/**
 * CSS 콘텐츠에서 외부 `url(...)` 와 문자열형 `@import "..."` / `@import url(...)` 를 찾는다.
 */
export function findExternalCssReferences(fileLabel: string, css: string): Violation[] {
  const violations: Violation[] = [];

  const urlRe = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;
  let m: RegExpExecArray | null;
  while ((m = urlRe.exec(css)) !== null) {
    if (!isAllowedReference(m[1])) {
      violations.push({ file: fileLabel, reason: "외부 url()", match: m[1] });
    }
  }

  // `@import "https://..."` — url() 없이 문자열만 오는 형태.
  const importStringRe = /@import\s+["']([^"']+)["']/gi;
  while ((m = importStringRe.exec(css)) !== null) {
    if (!isAllowedReference(m[1])) {
      violations.push({ file: fileLabel, reason: "외부 @import (문자열형)", match: m[1] });
    }
  }

  return violations;
}

/**
 * JS 청크에서 네트워크를 실제로 유발하는 호출(`fetch(...)`, `import(...)`,
 * `new Worker(...)`, `new EventSource(...)`, `navigator.sendBeacon(...)`)의
 * 문자열 리터럴 인자에 담긴 절대/프로토콜 상대 URL을 찾는다.
 *
 * 벤더 번들에는 `https://react.dev/errors/...`, `https://redux.js.org/Errors...`
 * 같은 "에러 메시지에 박힌 문서 링크" 문자열이나 `http://www.w3.org/2000/svg` 같은
 * XML 네임스페이스 리터럴이 매우 흔하게 섞여 있다(실측: 이 레포 산출물에도 다수
 * 존재) — 이들은 실제로 네트워크를 유발하지 않으므로, 모든 URL-형태 문자열을
 * 무차별로 잡으면 상시 오탐이 발생한다. 그래서 "네트워크를 실제로 발생시키는
 * 호출의 인자"로 범위를 좁힌다.
 */
export function findExternalJsNetworkCalls(fileLabel: string, js: string): Violation[] {
  const violations: Violation[] = [];
  const callRe = /\b(?:fetch|import|Worker|EventSource|sendBeacon)\s*\(\s*["'`]([^"'`]+)["'`]/g;
  let m: RegExpExecArray | null;
  while ((m = callRe.exec(js)) !== null) {
    const url = m[1];
    if (/^(?:[a-z][a-z0-9+\-.]*:)?\/\//i.test(url) && !isAllowedReference(url)) {
      violations.push({ file: fileLabel, reason: "JS 네트워크 호출의 외부 URL", match: url });
    }
  }
  return violations;
}

/** JS/CSS 콘텐츠에 `//# sourceMappingURL` / `/*# sourceMappingURL` 주석이 있는지. */
export function hasSourceMappingUrlComment(content: string): boolean {
  return /[/*]#\s*sourceMappingURL\s*=/.test(content);
}

export function formatViolations(violations: Violation[]): string {
  return violations.map((v) => `  - [${v.file}] ${v.reason}: ${v.match}`).join("\n");
}
