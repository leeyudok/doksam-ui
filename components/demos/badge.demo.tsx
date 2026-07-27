import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"

export const demo = (
  <div className="flex flex-wrap items-center gap-3">
    <Badge>신규</Badge>
    <Badge variant="secondary">진행중</Badge>
    <Badge variant="outline">보류</Badge>
    <Badge variant="destructive">
      <XCircleIcon size={12} weight="regular" />
      결제 실패
    </Badge>
    <Badge variant="secondary">
      <ClockIcon size={12} weight="regular" />
      배송 준비중
    </Badge>
    <Badge>
      <CheckCircleIcon size={12} weight="regular" />
      정산 완료
    </Badge>
  </div>
)

export const code = `<Badge>신규</Badge>
<Badge variant="secondary">진행중</Badge>
<Badge variant="outline">보류</Badge>
<Badge variant="destructive">
  <XCircleIcon size={12} weight="regular" />
  결제 실패
</Badge>
<Badge variant="secondary">
  <ClockIcon size={12} weight="regular" />
  배송 준비중
</Badge>
<Badge>
  <CheckCircleIcon size={12} weight="regular" />
  정산 완료
</Badge>`

export const dos = [
  "상태를 나타낼 때는 variant를 의미에 맞게 구분해서 사용한다(destructive는 실패·오류).",
  "짧은 라벨(1~4글자)에 사용하고, 긴 문장은 다른 컴포넌트를 쓴다.",
  "아이콘을 곁들일 때는 size=12 내외로 텍스트와 균형을 맞춘다.",
]

export const donts = [
  "배지 배경색을 className으로 직접 바꿔 variant 의미 체계를 깨지 않는다.",
  "클릭 가능한 액션 버튼 대용으로 Badge를 쓰지 않는다 — Button을 사용한다.",
]
