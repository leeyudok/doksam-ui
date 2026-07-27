import { AppWindowIcon, SidebarSimpleIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { PatternSampleData } from "@/components/showcase/pattern-sample"

const NAV_LABELS = ["홈", "Tokens", "Icons", "Components", "Patterns", "Rules"]

const SPACING_SCALE = [
  { token: "gap-4", px: "16px", usage: "카드 내부 좁은 간격 (라벨-값 등)" },
  { token: "gap-6", px: "24px", usage: "카드 내부 기본 간격, 폼 필드 그리드" },
  { token: "gap-8", px: "32px", usage: "페이지 내 섹션 간 기본 간격" },
  { token: "gap-10", px: "40px", usage: "섹션이 많은 페이지의 넉넉한 섹션 간격" },
]

const BREAKPOINTS = [
  { token: "sm", px: "640px", usage: "폼 필드 1열 → 2열" },
  { token: "md", px: "768px", usage: "폼 필드 2열 → 4열, 요약 카드 3열 → 5열" },
  { token: "lg", px: "1024px", usage: "사이드바형 셸에서 사이드바 상시 노출, 차트 1열 → 2열" },
  { token: "xl", px: "1280px", usage: "헤더형 셸 본문이 max-w-[1300px]에 도달" },
]

export const APP_SHELL_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "사이드바형 셸",
    description: "관리자·데이터 도구처럼 상시 내비게이션이 필요한 화면의 기본 셸입니다 — doksam-ui 자체가 이 구조입니다.",
    demo: (
      <div className="flex h-[160px] w-full overflow-hidden rounded-md border border-border">
        <div className="flex w-24 shrink-0 flex-col gap-1 border-r border-border bg-card px-2 py-3">
          <div className="mb-2 flex items-center gap-1 px-1">
            <SidebarSimpleIcon size={12} weight="regular" className="text-primary" />
            <span className="text-[9px] font-semibold tracking-tight">doksam-ui</span>
          </div>
          {NAV_LABELS.map((label, i) => (
            <div
              key={label}
              className={`rounded px-1.5 py-1 text-[8px] ${
                i === 4 ? "bg-accent text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-hidden px-3 py-3">
          <Badge variant="secondary" className="w-fit px-1.5 py-0 text-[8px]">
            Patterns
          </Badge>
          <p className="mt-1 text-[10px] font-semibold tracking-tight">앱 셸 패턴</p>
          <p className="mt-0.5 text-[8px] text-muted-foreground">본문은 max-w 로 폭을 제한하고 좌측 정렬합니다.</p>
          <div className="mt-2 h-[70px] rounded bg-muted/40" />
        </div>
      </div>
    ),
    code: `<div className="flex min-h-screen">
  <SiteSidebar /> {/* w-56 shrink-0, border-r border-border bg-card px-3 py-4 */}
  <main className="flex-1 px-6 py-8">
    {/* 페이지 콘텐츠 — 텍스트 위주 페이지는 max-w-3xl, 대시보드류는 max-w-6xl/w-full */}
    {children}
  </main>
</div>`,
    notes: [
      "사이드바는 폭 w-56(224px) 고정, shrink-0, border-r border-border bg-card px-3 py-4 이 기본값이다 — components/site-sidebar.tsx 참고.",
      "본문 컨테이너는 flex-1 px-6 py-8 로 셸을 채우고, 개별 페이지가 max-w-3xl(텍스트 위주)~max-w-6xl/w-full(대시보드·표)로 본문 폭을 다시 좁힌다.",
      "관리자 도구·내부 데이터 서비스·doksam-ui 자체처럼 메뉴 항목이 5개 이상이거나 상시 내비게이션이 필요한 화면에 쓴다.",
      "lg 미만에서는 사이드바를 숨김/토글(Sheet 등)로 전환하는 것을 기본으로 하되, 이 페이지 데모는 고정폭만 다룬다.",
    ],
  },
  {
    num: 2,
    title: "헤더형 셸",
    description: "메뉴가 적은 단순 서비스·모바일 우선 화면에 쓰는 셸 — 상단 헤더 + 중앙 정렬 본문입니다.",
    demo: (
      <div className="flex h-[160px] w-full flex-col overflow-hidden rounded-md border border-border">
        <div className="flex h-8 shrink-0 items-center justify-between border-b border-border bg-card px-3">
          <div className="flex items-center gap-1">
            <AppWindowIcon size={12} weight="regular" className="text-primary" />
            <span className="text-[9px] font-semibold tracking-tight">서비스명</span>
          </div>
          <span className="text-[8px] text-muted-foreground">메뉴</span>
        </div>
        <div className="flex-1 overflow-hidden px-3 py-3">
          <div className="mx-auto flex h-full max-w-[220px] flex-col gap-2">
            <Badge variant="secondary" className="w-fit px-1.5 py-0 text-[8px]">
              Section
            </Badge>
            <p className="text-[10px] font-semibold tracking-tight">중앙 정렬 콘텐츠</p>
            <div className="h-[60px] rounded bg-muted/40" />
          </div>
        </div>
      </div>
    ),
    code: `<div className="flex min-h-screen flex-col">
  <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
    <span className="text-sm font-semibold tracking-tight">서비스명</span>
    {/* 메뉴 · 사용자 액션 */}
  </header>
  <main className="flex-1 px-4 py-6">
    <div className="mx-auto flex max-w-[1300px] flex-col gap-8">
      {children}
    </div>
  </main>
</div>`,
    notes: [
      "헤더는 높이 h-14(56px) 고정, border-b border-border bg-card px-4 가 기본값이다.",
      "본문은 mx-auto max-w-[1300px] 로 중앙 정렬한다 — 사이드바형처럼 페이지마다 max-w 를 새로 정하지 않고 셸 레벨에서 한 번만 고정한다.",
      "메뉴 항목이 적은(3~5개 이내) 단순 서비스, 모바일 우선 화면, 랜딩성 페이지에 쓴다.",
      "사이드바형과 동시에 쓰지 않는다 — 한 프로젝트는 두 셸 중 하나를 프로젝트 전역 표준으로 고정한다.",
    ],
  },
  {
    num: 3,
    title: "페이지 타이틀 패턴",
    description: "셸 종류와 무관하게 모든 페이지 상단에 반복되는 타이틀 3요소 구조입니다.",
    demo: (
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Badge variant="secondary" className="w-fit px-1.5 py-0 text-[9px]">
            Patterns
          </Badge>
          <h3 className="text-lg font-semibold tracking-tight">사이드바형 페이지 제목</h3>
          <p className="text-[10px] text-muted-foreground">text-xl~2xl 크기, 대시보드·목록 등 정보 밀도가 높은 페이지.</p>
        </div>
        <div className="flex flex-col gap-1.5 border-t border-border pt-3">
          <Badge variant="secondary" className="w-fit px-1.5 py-0 text-[9px]">
            Section
          </Badge>
          <h3 className="text-base font-semibold tracking-tight">헤더형 페이지 제목</h3>
          <p className="text-[10px] text-muted-foreground">text-xl 크기, 중앙 정렬 본문의 단순 서비스 페이지.</p>
        </div>
      </div>
    ),
    code: `<section className="flex flex-col gap-3">
  <Badge variant="secondary" className="w-fit">{sectionLabel}</Badge>
  <h1 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h1>
  <p className="max-w-prose text-sm text-muted-foreground">{description}</p>
</section>`,
    notes: [
      "섹션 라벨(Badge variant=\"secondary\") → h1(font-semibold tracking-tight) → 설명(text-sm text-muted-foreground) 순서를 항상 지킨다.",
      "h1 크기는 text-xl~text-2xl 범위에서 고른다 — 정보 밀도가 높은 사이드바형 대시보드는 text-2xl, 단순 서비스·헤더형 셸은 text-xl 이 기본값이다.",
      "설명 문단은 max-w-prose 로 줄 길이를 제한해 가독성을 유지한다.",
    ],
  },
  {
    num: 4,
    title: "여백 밀도 스케일",
    description: "섹션 간격과 카드 내부 간격에 쓰는 gap 토큰 4단계입니다 — 임의의 gap 값을 새로 만들지 않는다.",
    demo: (
      <div className="flex w-full flex-col gap-3">
        {SPACING_SCALE.map((item) => (
          <div key={item.token} className="flex items-center gap-3">
            <span className="w-16 shrink-0 font-mono text-[10px] text-muted-foreground">{item.token}</span>
            <div className="h-2 rounded bg-primary/70" style={{ width: item.px }} />
            <span className="text-[9px] text-muted-foreground">{item.usage}</span>
          </div>
        ))}
      </div>
    ),
    code: `// 카드 내부
<CardContent className="flex flex-col gap-4">   {/* 좁은 간격: 라벨-값 */}
<CardContent className="flex flex-col gap-6">   {/* 기본 간격 */}

// 페이지 섹션 사이
<div className="flex flex-col gap-8">   {/* 기본 */}
<div className="flex flex-col gap-10">  {/* 섹션이 많은 페이지 */}`,
    notes: [
      "카드·필드 그룹 등 좁은 스코프의 내부 간격은 gap-4~gap-6 범위에서 고른다.",
      "페이지 내 섹션(타이틀 블록, 각 패턴 샘플 등) 사이 간격은 gap-8~gap-10 범위에서 고른다 — 이 페이지 자체가 gap-8 을 쓴다.",
      "이 4단계(gap-4/6/8/10) 밖의 임의 값(gap-5, gap-7 등)은 쓰지 않는다.",
    ],
  },
  {
    num: 5,
    title: "반응형 브레이크포인트 규칙",
    description: "셸·그리드가 열을 바꾸는 기준점을 sm/md/lg/xl 4단계로 고정합니다.",
    demo: (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-[10px]">브레이크포인트</TableHead>
            <TableHead className="text-[10px]">기준폭</TableHead>
            <TableHead className="text-[10px]">용도</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {BREAKPOINTS.map((bp) => (
            <TableRow key={bp.token}>
              <TableCell className="py-1.5 font-mono text-[10px]">{bp.token}</TableCell>
              <TableCell className="py-1.5 text-[10px] text-muted-foreground">{bp.px}</TableCell>
              <TableCell className="py-1.5 text-[10px] text-muted-foreground">{bp.usage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
    code: `<div className="grid grid-cols-2 gap-3 md:grid-cols-4">      {/* 폼 필드 */}
<div className="grid grid-cols-3 gap-1.5 md:grid-cols-5">   {/* 요약 카드 */}
<div className="grid grid-cols-1 gap-2 lg:grid-cols-2">     {/* 차트 · 사이드바 노출 */}
<div className="mx-auto max-w-[1300px]">                     {/* 헤더형 셸 본문, xl 근방에서 폭 도달 */}`,
    notes: [
      "새 그리드·셸을 만들 때 sm/md/lg/xl 4단계 밖의 임의 브레이크포인트(예: min-[900px])를 만들지 않는다.",
      "사이드바형 셸은 lg 를 기준으로 사이드바 상시 노출 여부를 가른다.",
      "표·카드 그리드의 열 수 변경은 md(4~5열 진입)와 lg(2열 이상 큰 블록)를 기본 기준으로 쓴다.",
    ],
  },
]
