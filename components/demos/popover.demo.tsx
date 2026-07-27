import { ShareIcon } from "@phosphor-icons/react/dist/ssr"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const demo = (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline">
        <ShareIcon size={16} weight="regular" />
        공유
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverHeader>
        <PopoverTitle>링크 공유</PopoverTitle>
        <PopoverDescription>이 링크가 있는 사람은 누구나 볼 수 있습니다.</PopoverDescription>
      </PopoverHeader>
      <Input readOnly defaultValue="https://ui.doksam.com/components/popover" />
      <Button size="sm">링크 복사</Button>
    </PopoverContent>
  </Popover>
)

export const code = `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      <ShareIcon size={16} weight="regular" />
      공유
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>링크 공유</PopoverTitle>
      <PopoverDescription>이 링크가 있는 사람은 누구나 볼 수 있습니다.</PopoverDescription>
    </PopoverHeader>
    <Input readOnly defaultValue="https://ui.doksam.com/components/popover" />
    <Button size="sm">링크 복사</Button>
  </PopoverContent>
</Popover>`

export const dos = [
  "짧은 폼·부가 정보처럼 트리거 주변 맥락과 함께 봐야 하는 콘텐츠에 사용한다.",
  "포커스가 트리거 밖으로 나가면 자동으로 닫히는 기본 동작을 그대로 둔다.",
  "너비가 넓은 콘텐츠는 Popover 대신 Sheet·Dialog로 옮긴다.",
]

export const donts = [
  "Popover 안에 페이지 이동을 유발하는 다단계 네비게이션을 넣지 않는다.",
  "hover만으로 열리게 만들지 않는다 — 클릭/포커스 기반 트리거만 지원한다.",
]
