# AGENTS.md

doksam-ui 에서 AI 에이전트가 작업할 때 먼저 읽는 문서입니다.

이 레포는 개별 화면을 만드는 앱이 아니라 **다른 doksam 프로젝트가 가져다 쓰는 UI 표준을
정의하는 카탈로그**입니다(라이브: https://ui.doksam.com). 모든 변경은 "이 화면이
좋아지는가"가 아니라 "표준으로서 일관되고 재사용 가능한가"로 판단합니다.

---

## 1. 작업 전에 읽을 것

| 무엇 | 어디 |
| --- | --- |
| **UI 작성 규칙 원문** (색·컴포넌트·테마 초기화·아이콘·라우팅·반응형·폐쇄망·TypeScript·의존성 규율) | `lib/rules-markdown.ts` 의 `RULES_SECTIONS` — **단일 진실원천** |
| 카탈로그 항목 추가/수정 절차 | `/doksam-design-guide` 스킬 (`.claude/skills/doksam-design-guide/`) |
| 레포 개요·디렉터리 구조 | `README.md` |

규칙 조항은 `lib/rules-markdown.ts` 에만 존재합니다. 이 문서를 포함해 어디에도
규칙 문장을 복제하지 않습니다 — 복제본과 원문이 어긋나면 원문이 옳습니다.
`/rules` 페이지와 AI 프롬프트용 `RULES_MARKDOWN` 이 모두 그 파일에서 파생됩니다.

---

## 2. 절대 어기지 않는 것

전체 조항은 위 파일을 읽되, 다음 네 가지는 예외 없이 적용됩니다.

- **하드코딩 색 0건** — 시맨틱 토큰만 사용합니다(`bg-background`, `text-destructive`,
  `text-chart-1`). 시세 등락은 `--gain`/`--loss` (`lib/finance/rate.ts`).
- **`components/ui/` 수정 금지** — shadcn CLI 원본입니다. 커스텀은 `components/`
  또는 `components/patterns/` 에서 조합합니다.
- **아이콘은 Phosphor 기본** — 서버 컴포넌트는 `@phosphor-icons/react/dist/ssr`.
  이모지를 아이콘 대용으로 쓰지 않습니다.
- **폐쇄망 전제** — 외부 CDN·외부 URL fetch 0건. 폰트는 `next/font/local` +
  `assets/fonts/` 벤더링, 이미지는 로컬 placeholder.

---

## 3. 카탈로그 항목을 추가할 때

컴포넌트 하나를 추가해도 **레지스트리 등록·데모·i18n 4개 로케일·배포 산출물 재생성**이
함께 따라옵니다. 파일만 만들면 카탈로그에 나타나지 않고 테스트가 깨집니다.

계층별 단계별 체크리스트는 `/doksam-design-guide` 스킬의
`references/catalog-workflow.md` 에 있습니다. 항목 추가 작업이라면 그 스킬을 먼저 엽니다.

단일 진실원천이 되는 레지스트리:

- 컴포넌트 — `lib/showcase/registry.ts` (+ `lib/showcase/demo-loaders.ts`)
- 패턴 — `lib/patterns/registry.ts`
- 템플릿 — `lib/templates/registry.ts`
- 테마 — `themes/index.ts` · 폰트 — `fonts/index.ts` · 프로필 — `profiles/index.ts`
- shadcn 배포 — `registry.json` (루트)

`public/r/`, `public/llms.txt` 는 빌드 생성물입니다. 직접 편집하지 않고
`pnpm registry:build && pnpm gen:llms` 로 재생성합니다.

---

## 4. 검증

Node 22 이상, pnpm 을 씁니다. CI 도 같은 순서로 돕니다.

```bash
pnpm typecheck      # tsc --noEmit
pnpm lint           # eslint
pnpm test           # vitest (단위·렌더)
pnpm test:e2e       # playwright
pnpm build          # 프로덕션 빌드
```

시각적 변화가 큰 작업 뒤에는 `pnpm test:vision`(Claude 비전 채점)을 추가로 돌립니다.
이 게이트는 수동이며 CI 에 포함되지 않습니다.

작업을 마치기 전 확인:

- 라이트/다크 양쪽, 다른 테마 프리셋에서 깨지지 않는지
- 모바일·태블릿·데스크톱 3모드에서 페이지 가로 스크롤이 없는지
- i18n 키를 `en` 에만 넣지 않았는지(4개 로케일 키 집합이 어긋나면 테스트 실패)
- 새 라우트에 `loading.tsx` / `error.tsx` 가 있는지

---

## 5. 규칙 자체를 바꿀 때

`lib/rules-markdown.ts` 의 `RULES_SECTIONS` 만 수정합니다. 규칙을 추가·변경했다면
`.claude/skills/doksam-design-guide/` 가 그와 모순되지 않는지 함께 확인하고,
충돌하면 스킬 쪽을 고칩니다.
