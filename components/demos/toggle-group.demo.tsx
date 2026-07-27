import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@phosphor-icons/react/dist/ssr"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export const demo = (
  <ToggleGroup type="single" defaultValue="left" variant="outline">
    <ToggleGroupItem value="left" aria-label="왼쪽 정렬">
      <TextAlignLeftIcon size={16} weight="regular" />
    </ToggleGroupItem>
    <ToggleGroupItem value="center" aria-label="가운데 정렬">
      <TextAlignCenterIcon size={16} weight="regular" />
    </ToggleGroupItem>
    <ToggleGroupItem value="right" aria-label="오른쪽 정렬">
      <TextAlignRightIcon size={16} weight="regular" />
    </ToggleGroupItem>
  </ToggleGroup>
)

export const code = `<ToggleGroup type="single" defaultValue="left" variant="outline">
  <ToggleGroupItem value="left" aria-label="왼쪽 정렬">
    <TextAlignLeftIcon size={16} weight="regular" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="가운데 정렬">
    <TextAlignCenterIcon size={16} weight="regular" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="오른쪽 정렬">
    <TextAlignRightIcon size={16} weight="regular" />
  </ToggleGroupItem>
</ToggleGroup>`

export const dos = [
  "상호 배타적인 상태 전환(정렬, 보기 모드 등)에는 type='single'을 사용한다.",
  "각 ToggleGroupItem에 value와 aria-label을 모두 지정해 스크린 리더에서도 구분되게 한다.",
  "관련 옵션끼리만 하나의 ToggleGroup으로 묶어 시각적 단위를 명확히 한다.",
]

export const donts = [
  "동시에 여러 상태가 가능한 필터링에 type='single'을 쓰지 않는다 (이 경우 type='multiple').",
  "선택된 항목 없이 defaultValue를 생략해 초기 상태가 모호하게 두지 않는다.",
]
