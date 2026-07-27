import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

/**
 * closed-network.test.ts / sourcemap.test.ts 는 `.next` 프로덕션 빌드 산출물을 스캔한다.
 * vitest globalSetup 은 워커 프로세스 fan-out 전, 전체 실행에 딱 1회만 돈다 — 두 테스트
 * 파일이 각자 beforeAll 에서 빌드하면 병렬 워커에서 `next build` 가 동시에 같은
 * `.next` 디렉터리에 경합하는 문제가 생기므로 여기로 모았다(이슈 #17).
 *
 * CI는 매 잡마다 클린 체크아웃(`GIT_CLEAN_FLAGS: -ffdx`)이라 `.next`가 없는 상태로
 * 시작한다 — 이 경우 여기서 1회 `pnpm build`를 돌려 산출물을 만든다.
 * 로컬에서 이미 `pnpm build`를 실행해둔 상태(BUILD_ID 존재)라면 재빌드를 건너뛰고
 * 기존 산출물을 그대로 스캔한다 — "사전 빌드 가정" 경로. 최신 소스를 반영한 스캔이
 * 필요하면 테스트 전에 수동으로 `pnpm build`를 다시 돌리면 된다.
 */
export default async function setup(): Promise<void> {
  const repoRoot = path.resolve(__dirname, "..");
  const buildIdPath = path.join(repoRoot, ".next", "BUILD_ID");

  if (existsSync(buildIdPath)) {
    return;
  }

  execSync("pnpm build", {
    cwd: repoRoot,
    stdio: "inherit",
  });
}
