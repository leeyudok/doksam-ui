import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export const demo = (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">
        내 계정
        <CaretDownIcon size={14} weight="regular" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>doksam@doksam.com</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          프로필 설정
          <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>결제 정보</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">로그아웃</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

export const code = `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      내 계정
      <CaretDownIcon size={14} weight="regular" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>doksam@doksam.com</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>
        프로필 설정
        <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>결제 정보</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">로그아웃</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`

export const dos = [
  "관련 액션은 DropdownMenuGroup으로 묶고 성격이 다른 액션은 Separator로 구분한다.",
  "트리거는 asChild로 실제 Button과 결합해 스타일·포커스 링을 일관되게 유지한다.",
  "로그아웃처럼 맥락이 다른 액션은 별도 그룹 + destructive variant로 시각적으로 분리한다.",
]

export const donts = [
  "메뉴 항목이 10개를 넘어가면 그대로 나열하지 말고 Command(검색형)로 전환한다.",
  "DropdownMenuContent 안에 긴 문단·폼 입력처럼 무거운 콘텐츠를 넣지 않는다.",
]
