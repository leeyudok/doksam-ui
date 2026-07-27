import { TrayIcon, WarningCircleIcon } from "@phosphor-icons/react/dist/ssr"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"
import type { PatternSampleData } from "@/components/showcase/pattern-sample"
import { SkeletonToggleDemo } from "@/components/patterns/state/skeleton-toggle-demo"

export const STATE_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "Skeleton 로딩",
    description: "실제 레이아웃 구조를 그대로 미러링하는 페이지 스켈레톤입니다.",
    demo: <SkeletonToggleDemo />,
    code: `<div className="space-y-1">
  <Skeleton className="h-8 w-40" />
  <Skeleton className="h-4 w-64" />
</div>
<div className="grid grid-cols-3 gap-1.5 md:grid-cols-5">
  {Array.from({ length: 5 }).map((_, i) => (
    <Card key={i}>
      <CardContent className="space-y-1 px-2 py-2">
        <Skeleton className="h-3 w-10" />
        <Skeleton className="h-5 w-16" />
      </CardContent>
    </Card>
  ))}
</div>`,
    notes: [
      "스피너 대신 실제 페이지 구조(제목·요약 카드·차트)를 그대로 미러링하는 스켈레톤을 우선 사용한다.",
      "반복 요소는 Array.from({ length: N }).map()으로 개수를 명시한다.",
      "app/<route>/loading.tsx 는 이 구조를 그대로 초안으로 재사용할 수 있다.",
    ],
  },
  {
    num: 2,
    title: "Error 상태",
    description: "Alert 컴포넌트로 표현하는 페이지/인라인 에러입니다.",
    demo: (
      <div className="flex w-full max-w-md flex-col gap-3">
        <div>
          <p className="mb-1 text-[10px] font-semibold text-muted-foreground">페이지 단위 에러 (재시도 액션 포함)</p>
          <Alert variant="destructive">
            <WarningCircleIcon size={16} weight="regular" />
            <AlertTitle>서버에 연결할 수 없습니다</AlertTitle>
            <AlertDescription>잠시 후 다시 시도해 주세요.</AlertDescription>
            <AlertAction>
              <Button size="sm" variant="outline">
                다시 시도
              </Button>
            </AlertAction>
          </Alert>
        </div>
        <div>
          <p className="mb-1 text-[10px] font-semibold text-muted-foreground">인라인 에러 (폼 필드)</p>
          <Alert variant="destructive">
            <WarningCircleIcon size={16} weight="regular" />
            <AlertDescription>비밀번호는 8자 이상이어야 합니다.</AlertDescription>
          </Alert>
        </div>
      </div>
    ),
    code: `<Alert variant="destructive">
  <WarningCircleIcon size={16} />
  <AlertTitle>서버에 연결할 수 없습니다</AlertTitle>
  <AlertDescription>잠시 후 다시 시도해 주세요.</AlertDescription>
  <AlertAction>
    <Button size="sm" variant="outline">다시 시도</Button>
  </AlertAction>
</Alert>`,
    notes: [
      "페이지 전체를 막는 에러는 재시도 액션을 AlertAction에 두어 바로 복구할 수 있게 한다.",
      "폼 인라인 에러처럼 짧은 메시지는 AlertTitle 없이 AlertDescription만 사용해도 된다.",
      "라우트 단위 에러 바운더리는 app/**/error.tsx + components/route-error.tsx 를 재사용한다.",
    ],
  },
  {
    num: 3,
    title: "Empty State",
    description: "아이콘 + 안내 메시지 + 선택적 액션으로 구성하는 빈 상태입니다.",
    demo: (
      <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>데이터 없음</EmptyTitle>
          </EmptyHeader>
        </Empty>
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <TrayIcon size={20} weight="regular" />
            </EmptyMedia>
            <EmptyTitle>아직 종목이 없습니다</EmptyTitle>
            <EmptyDescription>관심 종목을 추가하면 이 목록에 표시됩니다.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm">종목 추가</Button>
          </EmptyContent>
        </Empty>
      </div>
    ),
    code: `<Empty className="border">
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <TrayIcon size={20} />
    </EmptyMedia>
    <EmptyTitle>아직 종목이 없습니다</EmptyTitle>
    <EmptyDescription>관심 종목을 추가하면 이 목록에 표시됩니다.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button size="sm">종목 추가</Button>
  </EmptyContent>
</Empty>`,
    notes: [
      "빈 상태의 원인(데이터 없음/검색 결과 없음)에 맞는 제목·설명을 구체적으로 쓴다.",
      "가능하면 다음 행동(생성·추가·필터 해제)으로 이어지는 액션을 EmptyContent에 둔다.",
      "에러로 인한 빈 화면은 Empty가 아니라 Alert로 구분해서 보여준다.",
    ],
  },
  {
    num: 4,
    title: "Loading Spinner",
    description: "인라인 텍스트, 버튼 내부 등 짧은 대기 상태에 쓰는 스피너입니다.",
    demo: (
      <div className="flex w-full flex-wrap items-center gap-6">
        <Spinner />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner className="size-4" />
          목록을 불러오는 중입니다…
        </div>
        <Button disabled size="sm">
          <Spinner className="size-4" />
          저장 중
        </Button>
      </div>
    ),
    code: `<Spinner />
<div className="flex items-center gap-2 text-sm text-muted-foreground">
  <Spinner className="size-4" />
  목록을 불러오는 중입니다…
</div>
<Button disabled size="sm">
  <Spinner className="size-4" />
  저장 중
</Button>`,
    notes: [
      "Skeleton을 우선 사용하고, Spinner는 버튼/인라인 등 짧은 대기 상태에만 쓴다.",
      "버튼 내부에 둘 때는 버튼을 disabled로 만들어 중복 클릭을 막는다.",
      "전체 화면을 가리는 대형 스피너는 지양한다 — 부분 로딩엔 인라인으로 충분하다.",
    ],
  },
]
