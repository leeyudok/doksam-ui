import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export const demo = (
  <Collapsible className="w-full max-w-sm">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium">최근 활동 3건</p>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="sm">
          더 보기
          <CaretDownIcon size={14} weight="regular" />
        </Button>
      </CollapsibleTrigger>
    </div>
    <p className="mt-2 text-sm text-muted-foreground">이재현 님이 문서를 수정했습니다.</p>
    <CollapsibleContent className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground">
      <p>최유진 님이 댓글을 남겼습니다.</p>
      <p>정민수 님이 리뷰를 요청했습니다.</p>
    </CollapsibleContent>
  </Collapsible>
)

export const code = `<Collapsible>
  <div className="flex items-center justify-between">
    <p>최근 활동 3건</p>
    <CollapsibleTrigger asChild>
      <Button variant="ghost" size="sm">더 보기</Button>
    </CollapsibleTrigger>
  </div>
  <p>이재현 님이 문서를 수정했습니다.</p>
  <CollapsibleContent>
    <p>최유진 님이 댓글을 남겼습니다.</p>
    <p>정민수 님이 리뷰를 요청했습니다.</p>
  </CollapsibleContent>
</Collapsible>`

export const dos = [
  "콘텐츠 블록 하나를 펼치고 접는 단일 토글에 사용한다 — 여러 섹션이면 Accordion을 쓴다.",
  "CollapsibleTrigger는 asChild로 Button 등 실제 인터랙티브 요소와 결합한다.",
]

export const donts = [
  "트리거 없이 CollapsibleContent만 노출해 사용자가 펼치는 방법을 알 수 없게 하지 않는다.",
  "항상 펼쳐져 있어야 하는 핵심 정보를 CollapsibleContent 뒤에 숨기지 않는다.",
]
