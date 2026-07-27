import { TrayIcon } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export const demo = (
  <Empty className="border">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <TrayIcon size={20} weight="regular" />
      </EmptyMedia>
      <EmptyTitle>받은 문의가 없습니다</EmptyTitle>
      <EmptyDescription>
        새 문의가 접수되면 이 목록에 표시됩니다.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button size="sm">문의 링크 공유하기</Button>
    </EmptyContent>
  </Empty>
)

export const code = `<Empty className="border">
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <TrayIcon size={20} weight="regular" />
    </EmptyMedia>
    <EmptyTitle>받은 문의가 없습니다</EmptyTitle>
    <EmptyDescription>
      새 문의가 접수되면 이 목록에 표시됩니다.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button size="sm">문의 링크 공유하기</Button>
  </EmptyContent>
</Empty>`

export const dos = [
  "빈 상태의 원인(데이터 없음/검색 결과 없음/에러)에 맞는 제목·설명을 구체적으로 쓴다.",
  "가능하면 다음 행동(생성·초대·필터 해제 등)으로 이어지는 액션을 EmptyContent에 둔다.",
  "로딩 중 상태와 혼동되지 않도록 데이터 확정 후에만 렌더링한다.",
]

export const donts = [
  "'데이터가 없습니다' 같은 모호한 문구만 두고 다음 행동을 안내하지 않는다.",
  "에러로 인한 빈 상태를 정상적인 빈 상태처럼 표시하지 않는다 — Alert 등으로 구분한다.",
]
