import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const demo = (
  <div className="flex w-full flex-col gap-6">
    <PageHeader title="포트폴리오" description="보유 종목과 수익률을 한눈에 봅니다." />
    <PageHeader title="UI 표준" description="디자인 시스템 패턴 쇼케이스">
      <Badge variant="secondary" className="text-[10px]">
        50개 샘플
      </Badge>
      <Button size="sm" variant="outline" className="ml-auto">
        내보내기
      </Button>
    </PageHeader>
  </div>
)

export const code = `<PageHeader title="포트폴리오" description="보유 종목과 수익률을 한눈에 봅니다." />

<PageHeader title="UI 표준" description="디자인 시스템 패턴 쇼케이스">
  <Badge variant="secondary">50개 샘플</Badge>
  <Button size="sm" variant="outline" className="ml-auto">내보내기</Button>
</PageHeader>`

export const dos = [
  "페이지당 정확히 한 번, 본문 최상단에 둔다 — h1 시맨틱을 이 컴포넌트가 소유한다.",
  "children 슬롯엔 타이틀을 수식하는 배지나 페이지 수준 액션 버튼만 올린다(우측 정렬은 ml-auto).",
  "description 이 문자열이면 muted 문단으로, 복합 구성이면 ReactNode 로 넘긴다.",
]

export const donts = [
  "섹션 제목에 쓰지 않는다 — 섹션은 h2 이하를 직접 쓴다.",
  "children 에 필터·검색 같은 툴바를 넣지 않는다 — 툴바는 헤더 아래 별도 행으로.",
]
