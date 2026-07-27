import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    // jsdom 기본 origin(about:blank)은 opaque origin이라 localStorage가
    // 비활성화된다 — 실제 http origin을 줘야 window.localStorage 사용 가능.
    environmentOptions: {
      jsdom: {
        url: "http://localhost/",
      },
    },
    setupFiles: ["./vitest.setup.ts"],
    // 폐쇄망 검증 테스트(test/closed-network.test.ts, test/sourcemap.test.ts)가
    // `.next` 프로덕션 빌드 산출물을 스캔한다 — 없으면 1회 빌드한다(이슈 #17).
    globalSetup: ["./test/global-setup.ts"],
    // 서브에이전트 git worktree(.claude/worktrees/*)가 레포 안에 생기므로
    // 기본 exclude에 추가하지 않으면 그쪽 테스트까지 이중 실행된다.
    // e2e/**(이슈 #42, playwright.config.ts testDir)는 Playwright 전용 — vitest가
    // *.spec.ts 패턴으로 함께 주워 `test() called here` 에러를 내므로 명시 제외한다.
    exclude: ["**/node_modules/**", "**/.next/**", "**/.claude/**", "e2e/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "./coverage",
      include: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}", "themes/**/*.{ts,tsx}", "hooks/**/*.{ts,tsx}"],
      exclude: ["**/*.test.{ts,tsx}", "components/ui/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
