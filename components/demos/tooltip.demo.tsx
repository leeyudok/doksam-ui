import { GearIcon } from "@phosphor-icons/react/dist/ssr"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export const demo = (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon">
          <GearIcon size={16} weight="regular" />
          <span className="sr-only">설정</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>설정</TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export const code = `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <GearIcon size={16} weight="regular" />
        <span className="sr-only">설정</span>
      </Button>
    </TooltipTrigger>
    <TooltipContent>설정</TooltipContent>
  </Tooltip>
</TooltipProvider>`

export const dos = [
  "아이콘 전용 버튼처럼 레이블이 시각적으로 없는 컨트롤에 짧은 설명을 붙일 때 사용한다.",
  "TooltipProvider는 앱 최상단에 한 번만 두고, 이 데모처럼 개별 스니펫에서만 예외적으로 감싼다.",
  "내용은 한두 단어의 짧은 텍스트로 제한한다.",
]

export const donts = [
  "Tooltip 안에 버튼·링크 등 상호작용 요소를 넣지 않는다 — 필요하면 Popover를 쓴다.",
  "이미 화면에 보이는 텍스트를 그대로 Tooltip으로 중복해서 보여주지 않는다.",
]
