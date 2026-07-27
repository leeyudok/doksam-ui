#!/usr/bin/env node
// llms.txt(AI 발견용 카탈로그) 생성기(#26).
//
// registry.json(루트 — shadcn build 입력, 단일 진실원천)의 items[]를 그대로 순회해
// public/llms.txt 를 만든다. 새 registry item을 추가/수정해도 이 스크립트를 다시
// 실행하면 llms.txt가 항상 동기화된다 — 수기 하드코딩 금지.
//
// 사용: node scripts/gen-llms.mjs (또는 pnpm gen:llms)

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const HOMEPAGE = "https://ui.doksam.com";

const TYPE_LABEL = {
  "registry:component": "컴포넌트",
  "registry:lib": "라이브러리/유틸",
  "registry:theme": "프로필(테마+폰트+radius)",
  "registry:style": "스타일",
  "registry:ui": "UI 프리미티브",
  "registry:hook": "훅",
  "registry:block": "블록",
};

function main() {
  const registryPath = path.join(ROOT, "registry.json");
  const registry = JSON.parse(readFileSync(registryPath, "utf-8"));

  const groups = new Map();
  for (const item of registry.items) {
    const label = TYPE_LABEL[item.type] ?? item.type;
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(item);
  }

  const lines = [];
  lines.push(`# ${registry.name}`);
  lines.push("");
  lines.push(
    `> doksam 프로젝트 공통 UI 표준 사이트. shadcn/ui 기반 디자인 토큰 + 전 컴포넌트 쇼케이스를 ` +
      `한곳에 모은 레퍼런스이며, 이 카탈로그의 항목은 self-host shadcn 커스텀 레지스트리로 직접 설치할 수 있습니다.`,
  );
  lines.push("");
  lines.push(
    `AI 에이전트/사람 모두를 위한 발견용 문서입니다. 아래 각 항목은 ` +
      `\`npx shadcn add ${HOMEPAGE}/r/<name>.json\` 명령으로 즉시 설치됩니다 — ` +
      `components.json이 없는 새 프로젝트라면 \`npx shadcn@latest init\`을 먼저 실행하세요.`,
  );
  lines.push("");
  lines.push(`전체 사용 규칙(코딩 컨벤션·시맨틱 토큰·접근성 규칙)은 [${HOMEPAGE}/rules](${HOMEPAGE}/rules) 를 참고하세요 — AI 프롬프트에 그대로 붙여넣을 수 있는 markdown 원문을 제공합니다.`);
  lines.push("");

  for (const [label, items] of groups) {
    lines.push(`## ${label}`);
    lines.push("");
    for (const item of items) {
      const title = item.title ?? item.name;
      const desc = item.description ?? "";
      lines.push(`### ${title} (\`${item.name}\`)`);
      lines.push("");
      if (desc) lines.push(desc);
      lines.push("");
      lines.push("```");
      lines.push(`npx shadcn add ${HOMEPAGE}/r/${item.name}.json`);
      lines.push("```");
      if (item.registryDependencies?.length) {
        lines.push("");
        lines.push(`registryDependencies: ${item.registryDependencies.join(", ")}`);
      }
      if (item.dependencies?.length) {
        lines.push("");
        lines.push(`npm dependencies: ${item.dependencies.join(", ")}`);
      }
      lines.push("");
    }
  }

  lines.push("## 링크");
  lines.push("");
  lines.push(`- 전체 컴포넌트 쇼케이스: ${HOMEPAGE}/components`);
  lines.push(`- 패턴(관측성/데이터뷰/폼 등 복합 조합): ${HOMEPAGE}/patterns`);
  lines.push(`- 브랜드 프로필: ${HOMEPAGE}/profiles`);
  lines.push(`- 디자인 토큰: ${HOMEPAGE}/tokens`);
  lines.push(`- AI 프롬프트용 사용 규칙: ${HOMEPAGE}/rules`);
  lines.push(`- 레지스트리 인덱스(JSON): ${HOMEPAGE}/r/registry.json`);
  lines.push("");

  const output = lines.join("\n");
  const outPath = path.join(ROOT, "public", "llms.txt");
  writeFileSync(outPath, output, "utf-8");
  console.log(`✔ wrote ${path.relative(ROOT, outPath)} (${registry.items.length} items)`);
}

main();
