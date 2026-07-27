import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react/dist/ssr"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"

export const demo = (
  <div className="flex w-full max-w-sm flex-col gap-3">
    <InputGroup>
      <InputGroupAddon>
        <MagnifyingGlassIcon size={16} weight="regular" />
      </InputGroupAddon>
      <InputGroupInput placeholder="종목명 또는 종목코드 검색" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton aria-label="검색어 지우기">
          <XIcon size={14} weight="regular" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="ui.doksam.com" />
    </InputGroup>
  </div>
)

export const code = `<InputGroup>
  <InputGroupAddon>
    <MagnifyingGlassIcon size={16} weight="regular" />
  </InputGroupAddon>
  <InputGroupInput placeholder="종목명 또는 종목코드 검색" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton aria-label="검색어 지우기">
      <XIcon size={14} weight="regular" />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`

export const dos = [
  "아이콘 전용 InputGroupButton에는 aria-label로 동작을 설명한다.",
  "접두 텍스트(https:// 등)는 InputGroupText로 감싸 입력값과 시각적으로 분리한다.",
  "InputGroupInput만 사용하고 일반 Input을 InputGroup 안에 직접 넣지 않는다.",
]

export const donts = [
  "애드온을 3개 이상 겹쳐 넣어 입력창을 지나치게 좁게 만들지 않는다.",
  "InputGroup 테두리 색을 className으로 임의 변경하지 않는다.",
]
