import { SortAscendingIcon, SortDescendingIcon } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"

export const demo = (
  <div className="flex flex-wrap items-center gap-3">
    <ButtonGroup>
      <Button variant="outline" size="sm">
        <SortAscendingIcon size={14} weight="regular" />
        오름차순
      </Button>
      <Button variant="outline" size="sm">
        <SortDescendingIcon size={14} weight="regular" />
        내림차순
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <ButtonGroupText>기간</ButtonGroupText>
      <ButtonGroupSeparator />
      <Button variant="outline" size="sm">
        1개월
      </Button>
      <Button variant="outline" size="sm">
        3개월
      </Button>
      <Button variant="outline" size="sm">
        1년
      </Button>
    </ButtonGroup>
  </div>
)

export const code = `<ButtonGroup>
  <Button variant="outline" size="sm">
    <SortAscendingIcon size={14} weight="regular" />
    오름차순
  </Button>
  <Button variant="outline" size="sm">
    <SortDescendingIcon size={14} weight="regular" />
    내림차순
  </Button>
</ButtonGroup>
<ButtonGroup>
  <ButtonGroupText>기간</ButtonGroupText>
  <ButtonGroupSeparator />
  <Button variant="outline" size="sm">1개월</Button>
  <Button variant="outline" size="sm">3개월</Button>
  <Button variant="outline" size="sm">1년</Button>
</ButtonGroup>`

export const dos = [
  "정렬 방향, 기간 필터 등 서로 배타적이거나 밀접하게 관련된 액션을 묶을 때 사용한다.",
  "ButtonGroupText로 그룹 앞에 라벨을 붙여 어떤 기준의 그룹인지 알려준다.",
  "그룹 내부 버튼들은 동일한 variant/size로 통일해 시각적 일관성을 유지한다.",
]

export const donts = [
  "서로 관련 없는 액션들을 하나의 ButtonGroup에 묶지 않는다.",
  "그룹 안에서 버튼마다 다른 variant를 섞어 위계를 혼란스럽게 만들지 않는다.",
  "그룹 버튼 개수를 과도하게 늘려(6개 이상) 한 줄에 다 들어가지 않게 하지 않는다.",
]
