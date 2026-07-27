/** /rules 페이지의 규칙 섹션 하나 = 제목 + 항목 목록. */
export interface RulesSection {
  title: string;
  items: string[];
}

/**
 * 사용 규칙 전문의 단일 진실원천.
 * /rules 페이지의 사람용 렌더링과 AI 프롬프트용 markdown 복사 버튼이
 * 둘 다 이 구조체에서 파생된다 — 내용을 고치려면 여기만 수정하면 된다.
 */
export const RULES_SECTIONS: RulesSection[] = [
  {
    title: "컬러 · 토큰",
    items: [
      "하드코딩 색(hex, rgb, 임의 OKLCH 값 등)을 직접 쓰지 않는다 — 항상 themes/ 의 시맨틱 토큰(bg-background, text-primary 등)만 사용한다.",
      "radius 기본값은 6px이다. 임의의 radius 값을 새로 만들지 않는다.",
      "새 프리셋이 필요하면 themes/<name>.ts 파일을 추가하고 themes/index.ts 레지스트리에 등록한다. 기존 프리셋 파일이나 app/globals.css의 다른 프리셋 블록은 건드리지 않는다.",
      "시세 등락(이익/상승, 손실/하락)을 표시할 때는 text-red-600/text-blue-600 등을 직접 쓰지 않고 --gain/--loss 토큰(lib/finance/rate.ts의 rateColor/rateText)을 쓴다 — 한국식 관례로 이익=빨강, 손실=파랑이며 모든 프리셋에서 동일한 값을 쓴다(destructive/success/warning과 같은 방식).",
      "lightweight-charts·canvas 등 CSS를 직접 해석하지 못하는 렌더러에 색을 넘길 때는 CSS 변수/유틸리티 클래스 문자열을 그대로 주지 않고 lib/finance/normalize-color.ts의 normalizeColor(또는 readCssVar/readClassColor)로 hex 값을 해소해서 넘긴다. 프리셋·다크모드 전환 시 재해소가 필요하면 observeColorScheme로 <html>의 class/data-theme/data-font 변화를 구독한다.",
    ],
  },
  {
    title: "컴포넌트",
    items: [
      "UI 프리미티브는 shadcn/ui를 쓴다 — components/ui/ 아래 원본 파일은 수정하지 않는다.",
      "커스텀 동작이 필요하면 components/ui/ 밖에 별도 컴포넌트를 만들어 shadcn 프리미티브를 조합한다 — components/ui/customs 같은 하위 폴더를 만들어 components/ui/ 안에 끼워 넣지 않는다. shadcn 원본과 커스텀 조합은 디렉터리 레벨에서 분리한다(예: components/<feature>/ 또는 components/patterns/).",
      "테이블 헤더(thead th)는 app/globals.css의 전역 규칙으로 항상 볼드로 렌더링된다 — 컴포넌트마다 font-bold를 개별 지정하지 않는다.",
    ],
  },
  {
    title: "테마 초기화",
    items: [
      "다크모드/테마 프리셋/폰트 프리셋 결정은 hydration 이전에 끝낸다 — app/layout.tsx의 <head> 인라인 <script>(THEME_INIT_SCRIPT)가 localStorage 값을 읽어 <html>에 data-theme/data-font/dark 클래스를 직접 세팅하는 방식을 표준으로 쓴다.",
      "useEffect 등 mount 이후 로직만으로 다크모드·프리셋을 적용하지 않는다 — 첫 페인트가 기본값으로 그려진 뒤 바뀌는 FOUC(테마 깜빡임)가 발생한다. mount 시 useEffect는 인라인 스크립트가 이미 세팅한 <html> 상태를 React state로 동기화하는 용도로만 쓴다(hooks/use-theme-preset.ts의 mount-sync 패턴 참고).",
      "인라인 스크립트가 읽는 localStorage 키는 lib/theme-storage.ts의 상수(THEME_PRESET_STORAGE_KEY 등)를 그대로 참조한다 — 훅과 문자열이 어긋나지 않도록 값을 이원화하지 않는다. 스크립트 본문은 try/catch로 감싸 실패 시 조용히 기본값으로 폴백한다.",
      "테마 로직은 순수 함수(우선순위 계산·값 읽기)와 IO 어댑터(document/localStorage 접근)를 분리한다 — applyToDocument/readDocumentState처럼 부수효과를 별도 함수로 나눠 테스트 가능하게 유지한다.",
    ],
  },
  {
    title: "아이콘",
    items: [
      "아이콘은 Phosphor(@phosphor-icons/react)를 기본으로 쓴다 — regular가 기본, 강조·활성 상태는 duotone 또는 fill.",
      "서버 컴포넌트에서는 @phosphor-icons/react/dist/ssr 경로로 import한다.",
      "Lucide(lucide-react)는 shadcn 내장과 공존하며, 직접 쓸 때는 strokeWidth={1.5}로 Phosphor 굵기에 맞춘다.",
      "Tabler(@tabler/icons-react)는 Phosphor에 없는 특수 아이콘의 백업으로만 쓴다.",
      "이모지를 아이콘 대용으로 쓰지 않는다.",
    ],
  },
  {
    title: "페이지 · 라우팅",
    items: [
      "새 라우트를 추가하면 loading.tsx와 error.tsx를 함께 만든다.",
      "이미지는 next/image, 폰트는 next/font/local(레포 내 self-host)로 처리한다.",
    ],
  },
  {
    title: "레이아웃 · 반응형",
    items: [
      "콘텐츠 컨테이너는 데스크톱 기준 1300px(max-w-[1300px] mx-auto)로 한다 — 관리 콘솔 화면의 표준 폭이며, crawler-console 템플릿이 레퍼런스다.",
      "컨테이너는 세그먼트 layout.tsx가 소유한다 — 페이지 컴포넌트에서 max-width를 하드코딩하지 않는다(화면마다 폭이 갈라지는 원인). 폼 등 좁은 콘텐츠는 컨테이너를 줄이지 말고 페이지 내부 래퍼로 좁힌다.",
      "main 랜드마크는 layout이 렌더한다 — 페이지·loading.tsx·error.tsx에서 main을 중복 렌더하지 않는다(main 중첩은 invalid HTML). 에러 UI는 div role=\"alert\".",
      "모든 화면은 모바일(기본)·태블릿(sm:/md:)·데스크톱(lg:↑) 3모드에서 깨지지 않아야 한다 — Tailwind mobile-first로 무접두 클래스가 모바일, 접두로 넓은 화면을 확장한다(역방향 금지).",
      "넓은 콘텐츠(테이블·코드블록·차트)는 자체 overflow-x-auto 래퍼로 감싼다 — 페이지(body) 가로 스크롤이 생기면 안 된다.",
      "고정 px 폭(w-[###px])은 아이콘·뱃지 등 소품 외 금지 — 콘텐츠 영역은 flex/grid/상대 단위로 잡는다.",
    ],
  },
  {
    title: "폐쇄망 대응",
    items: [
      "금융권 등 폐쇄망 배포를 전제로 모든 리소스(폰트·아이콘·스크립트·스타일)를 self-host한다 — 빌드·런타임에 외부 CDN이나 외부 URL fetch가 없어야 한다.",
      "폰트는 next/font/google이 아닌 next/font/local을 쓰고, woff2 파일을 assets/fonts/<name>/ 에 레포로 커밋한다(라이선스 파일도 함께). npm 패키지(@fontsource 등)는 폰트 파일 취득 도구로만 쓰고 런타임 의존성으로 남기지 않는다.",
      "아이콘은 @phosphor-icons/react 등 npm 패키지로 번들한다 — 아이콘 CDN(iconify, googleapis 등) 링크를 쓰지 않는다.",
      "이미지·아바타 등 데모 콘텐츠도 외부 이미지 URL(i.pravatar.cc 등) 대신 로컬 placeholder(AvatarFallback, public/ 내 이미지)를 쓴다.",
      "next.config의 images.remotePatterns에 외부 도메인을 추가하지 않는다 — next/image는 로컬/자체 호스팅 이미지만 최적화 대상으로 둔다.",
      "빌드 산출물(.next) 외부 리소스 부재를 자동 테스트로 실증한다 — test/closed-network.test.ts가 프로덕션 정적 HTML/CSS에서 외부 <script src>/<link href>/CSS url()/CDN 힌트 문자열 0건을, test/sourcemap.test.ts가 프로덕션 청크에 sourcemap 부재를 검증한다.",
    ],
  },
  {
    title: "TypeScript",
    items: [
      "any 타입을 쓰지 않는다.",
      "TypeScript strict 모드를 유지한다.",
    ],
  },
  {
    title: "의존성 규율",
    items: [
      "새 UI 라이브러리 추가를 지양한다 — 먼저 shadcn/ui 프리미티브 조합, 아이콘 표준 3종(Phosphor 기본, Lucide, Tabler 백업), 폰트·이미지 self-host로 요구사항을 풀 수 있는지 검토한 뒤에만 새 패키지를 고려한다.",
      "새 패키지가 불가피하면 추가 전에 다음을 확인하고 PR/이슈에 근거를 남긴다: (1) 유지보수 상태(최근 커밋·이슈 대응 여부), (2) 라이선스가 MIT·Apache-2.0·BSD 계열인지(GPL 등 카피레프트 계열 제외), (3) 번들 크기·트리쉐이킹 비용, (4) 폐쇄망(금융권) 배포를 위해 self-host 가능한지(런타임에 외부 CDN·외부 URL fetch가 없는지).",
      "위 확인 항목 중 하나라도 통과하지 못하면(라이선스 불명, 유지보수 중단, self-host 불가 등) 채택하지 않는다.",
      "@tanstack/react-table·@dnd-kit(core/sortable/utilities)는 self-host 검증(MIT 라이선스, 런타임 외부 CDN/fetch 없음, 폐쇄망 빌드 테스트 그린)을 마친 승인 의존성이다 — TableSortable(#24)에서 사용한다.",
    ],
  },
  {
    title: "UI 패턴",
    items: [
      "화면을 조립할 때는 컴포넌트 단품이 아니라 ui.doksam.com/patterns 의 조합 패턴(레이아웃·데이터 시각화·카드·상태·폼 입력)을 우선 참조한다.",
      "주식·파이프라인 등 도메인 화면은 /patterns 의 Srope 확장 패턴을 참조한다.",
      "로딩·빈 목록·에러 상태는 /patterns/state 의 표준 상태 UI 패턴을 따른다.",
    ],
  },
  {
    title: "도메인 확장 (Bizinfo)",
    items: [
      "비즈니스(사업자) 관련 화면을 만들 때는 공통 컴포넌트 외에 Bizinfo 카테고리 확장을 사용한다.",
      "사업자등록번호를 화면에 표시할 때는 formatBizNo(XXX-XX-XXXXX 형태)를 쓴다 — 저장·API 전송값은 원본 10자리를 그대로 유지한다.",
      "화면 사용법 안내는 ScreenHelpDialog 패턴((?) 버튼) 을 쓴다.",
      "카탈로그는 ui.doksam.com/components 의 Bizinfo 카테고리를 참조한다.",
    ],
  },
  {
    title: "AI로 설치하기 (shadcn 커스텀 레지스트리)",
    items: [
      "doksam-ui 고유 자산(shadcn/ui 프리미티브가 아닌 것 — badge-extended, tooltip-icon-button, table-sortable, screen-help-dialog, json-tree, log-viewer, request-inspector, finance-* 유틸, format-biz-no, profile-admin/service/data/docs/console)은 코드를 복붙하지 않고 `npx shadcn add https://ui.doksam.com/r/<name>.json` 으로 설치한다.",
      "설치 가능한 전체 목록과 각 install 명령은 ui.doksam.com/llms.txt(AI 발견용 카탈로그)에서 기계적으로 읽을 수 있다 — registry.json(레포 루트)이 단일 진실원천이며 pnpm gen:llms 로 동기화한다.",
      "이 레지스트리를 프로젝트에 상시 등록해두려면 components.json의 registries에 `\"@doksam-ui\": \"https://ui.doksam.com/r/{name}.json\"` 을 추가한다 — 이후 `npx shadcn add @doksam-ui/<name>` 으로 짧게 설치할 수 있다.",
      "폰트(assets/fonts/)는 registry item으로 자동 설치되지 않는다 — 프로필(profile-admin 등) cssVars는 색·radius만 적용하고, 폰트는 fonts/index.ts 안내대로 woff2를 수동 복사 후 next/font/local로 연결한다.",
    ],
  },
  {
    title: "표준 준수 체크리스트",
    items: [
      "[ ] 브랜드 프로필 지정 (admin/service/data/docs/console 중 1 — ui.doksam.com/profiles).",
      "[ ] 프로필이 고정한 radius·density(<html data-density>)를 프로젝트에서 임의 재정의하지 않는다 — 바꿀 필요가 생기면 doksam-ui에 프로필 추가/수정으로 반영.",
      "[ ] 앱 셸 패턴 준수 (ui.doksam.com/patterns/app-shell).",
      "[ ] 하드코딩 색 0건 — 시맨틱 색상 토큰만 사용.",
      "[ ] 아이콘 표준 3종(Phosphor 기본)만, 이모지 아이콘 0건.",
      "[ ] 폰트·리소스 전부 셀프호스팅 (외부 CDN 0건).",
      "[ ] 빌드 산출물 외부 리소스 부재를 자동 테스트로 실증 (test/closed-network.test.ts, test/sourcemap.test.ts).",
      "[ ] 새 페이지에 loading/error 동반, 상태 UI는 ui.doksam.com/patterns/state 를 따른다.",
      "[ ] TypeScript strict·any 0건, Sonar Quality Gate 통과.",
    ],
  },
];

function sectionToMarkdown(section: RulesSection): string {
  const bullets = section.items.map((item) => `- ${item}`).join("\n");
  return `## ${section.title}\n\n${bullets}`;
}

/** AI 프롬프트에 그대로 붙여넣는 markdown 원문. RULES_SECTIONS 로부터 생성된다. */
export const RULES_MARKDOWN = [
  "# doksam-ui 사용 규칙",
  "doksam 프로젝트에서 UI를 만들 때 지키는 규칙입니다. ui.doksam.com 을 참고하세요.",
  ...RULES_SECTIONS.map(sectionToMarkdown),
].join("\n\n");
