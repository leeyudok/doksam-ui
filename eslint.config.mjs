import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
    // shadcn CLI가 생성한 원본 — 수정 금지 정책이라 lint 대상에서 제외.
    "components/ui/**",
    "hooks/use-mobile.ts",
    // 서브에이전트 git worktree가 레포 안(.claude/worktrees/)에 생김 — lint 제외.
    ".claude/**",
  ]),
]);

export default eslintConfig;
