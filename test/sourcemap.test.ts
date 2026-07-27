import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { collectFiles, hasSourceMappingUrlComment } from "./helpers/scan-build-output";

/**
 * 이슈 #17 — 프로덕션 청크에 sourcemap 이 새어나가지 않는지 실증.
 * 브라우저가 실제로 받는 `.next/static/**` (스크립트/스타일 청크)만 대상으로 한다 —
 * Next.js 는 `productionBrowserSourceMaps` 기본값이 false 라 여기엔 map 이 없어야 한다.
 * (서버 전용 `.next/server/**.js.map` 은 브라우저에 서빙되지 않으므로 이 게이트 대상이 아니다.)
 */

const REPO_ROOT = path.resolve(__dirname, "..");
const STATIC_DIR = path.join(REPO_ROOT, ".next", "static");

function relLabel(file: string): string {
  return path.relative(REPO_ROOT, file);
}

describe("폐쇄망 빌드 검증 — sourcemap 부재 (실제 빌드 산출물)", () => {
  it("`.next/static` 아래 .js.map / .css.map 파일이 하나도 없다", () => {
    const mapFiles = collectFiles(STATIC_DIR, [".map"]);
    expect(mapFiles.map(relLabel)).toHaveLength(0);
  });

  it("프로덕션 JS/CSS 청크에 `//# sourceMappingURL` 주석이 없다", () => {
    const files = collectFiles(STATIC_DIR, [".js", ".css"]);
    expect(files.length).toBeGreaterThan(0);

    const offenders = files.filter((file) => hasSourceMappingUrlComment(readFileSync(file, "utf-8"))).map(relLabel);

    expect(offenders, `sourceMappingURL 주석이 남은 파일:\n${offenders.join("\n")}`).toHaveLength(0);
  });
});

describe("스캐너 자체 검증 — false negative 방지 (fixture)", () => {
  it("//# sourceMappingURL 주석이 있으면 잡아낸다", () => {
    const dirty = `console.log(1);\n//# sourceMappingURL=main.js.map\n`;
    expect(hasSourceMappingUrlComment(dirty)).toBe(true);
  });

  it("/*# sourceMappingURL (CSS 스타일 주석)도 잡아낸다", () => {
    const dirty = `.foo{color:red}\n/*# sourceMappingURL=main.css.map */\n`;
    expect(hasSourceMappingUrlComment(dirty)).toBe(true);
  });

  it("sourceMappingURL 이 없는 정상 청크는 통과한다", () => {
    const clean = `console.log("hello");\n`;
    expect(hasSourceMappingUrlComment(clean)).toBe(false);
  });
});
