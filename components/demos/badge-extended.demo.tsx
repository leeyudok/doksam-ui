import { CheckCircleIcon, WarningIcon, XCircleIcon } from "@phosphor-icons/react/dist/ssr"

import { BadgeExtended } from "@/components/badge-extended"

export const demo = (
  <div className="flex flex-wrap items-center gap-3">
    <BadgeExtended variant="success">
      <CheckCircleIcon size={12} weight="regular" />
      승인 완료
    </BadgeExtended>
    <BadgeExtended variant="warning">
      <WarningIcon size={12} weight="regular" />
      확인 필요
    </BadgeExtended>
    <BadgeExtended variant="danger">
      <XCircleIcon size={12} weight="regular" />
      처리 실패
    </BadgeExtended>
  </div>
)

export const code = `<BadgeExtended variant="success">
  <CheckCircleIcon size={12} weight="regular" />
  승인 완료
</BadgeExtended>
<BadgeExtended variant="warning">
  <WarningIcon size={12} weight="regular" />
  확인 필요
</BadgeExtended>
<BadgeExtended variant="danger">
  <XCircleIcon size={12} weight="regular" />
  처리 실패
</BadgeExtended>`

export const dos = [
  "성공/경고/위험 3단계 상태를 표현할 때만 쓴다 — variant는 항상 시맨틱 토큰(success/warning/danger)에 대응한다.",
  "일반 라벨·카운트에는 기본 Badge를 쓰고, BadgeExtended는 상태(status) 표현에 한정한다.",
  "className으로 색을 직접 덮어써 시맨틱을 깨지 않는다.",
]

export const donts = [
  "success/warning/danger 외의 임의 색을 하드코딩해서 새 variant를 임의로 추가하지 않는다.",
  "클릭 가능한 액션 대용으로 쓰지 않는다 — Button을 사용한다.",
]
