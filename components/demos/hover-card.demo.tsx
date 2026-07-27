import { UserCircleIcon } from "@phosphor-icons/react/dist/ssr"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"

export const demo = (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Button variant="link">@doksam</Button>
    </HoverCardTrigger>
    <HoverCardContent>
      <div className="flex items-start gap-3">
        <UserCircleIcon size={36} weight="regular" className="text-muted-foreground" />
        <div className="flex flex-col gap-1">
          <p className="font-medium">이유독</p>
          <p className="text-muted-foreground">doksam-ui 컴포넌트 라이브러리를 관리합니다.</p>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
)

export const code = `<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@doksam</Button>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="flex items-start gap-3">
      <UserCircleIcon size={36} weight="regular" className="text-muted-foreground" />
      <div className="flex flex-col gap-1">
        <p className="font-medium">이유독</p>
        <p className="text-muted-foreground">doksam-ui 컴포넌트 라이브러리를 관리합니다.</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`

export const dos = [
  "사용자 프로필·링크 미리보기처럼 클릭 전에 맥락을 미리 보여줄 때 사용한다.",
  "지연 없이 자주 열리는 요소(예: 목록 전체)에는 남용하지 않는다.",
  "터치 기기에서는 트리거를 눌렀을 때도 동일한 정보를 볼 수 있는 대안 동선을 마련한다.",
]

export const donts = [
  "HoverCard 안에 폼 입력 등 조작이 꼭 필요한 콘텐츠를 넣지 않는다.",
  "핵심 정보를 HoverCard로만 노출해 호버가 불가능한 환경에서 접근을 막지 않는다.",
]
