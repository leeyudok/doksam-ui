import { InfoIcon, WarningCircleIcon } from "@phosphor-icons/react/dist/ssr"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export const demo = (
  <div className="flex w-full max-w-md flex-col gap-3">
    <Alert>
      <InfoIcon size={16} weight="regular" />
      <AlertTitle>정기 점검 안내</AlertTitle>
      <AlertDescription>
        7월 15일 02:00 ~ 04:00 사이 서비스 이용이 일시 중단됩니다.
      </AlertDescription>
    </Alert>
    <Alert variant="destructive">
      <WarningCircleIcon size={16} weight="regular" />
      <AlertTitle>결제에 실패했습니다</AlertTitle>
      <AlertDescription>
        카드 한도를 확인한 뒤 다시 시도해 주세요.
      </AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline">
          다시 시도
        </Button>
      </AlertAction>
    </Alert>
  </div>
)

export const code = `<Alert>
  <InfoIcon size={16} weight="regular" />
  <AlertTitle>정기 점검 안내</AlertTitle>
  <AlertDescription>
    7월 15일 02:00 ~ 04:00 사이 서비스 이용이 일시 중단됩니다.
  </AlertDescription>
</Alert>
<Alert variant="destructive">
  <WarningCircleIcon size={16} weight="regular" />
  <AlertTitle>결제에 실패했습니다</AlertTitle>
  <AlertDescription>카드 한도를 확인한 뒤 다시 시도해 주세요.</AlertDescription>
  <AlertAction>
    <Button size="sm" variant="outline">다시 시도</Button>
  </AlertAction>
</Alert>`

export const dos = [
  "오류·경고 상황에는 variant='destructive'와 함께 구체적인 원인·해결 방법을 적는다.",
  "복구 액션이 있으면 AlertAction에 버튼을 두어 바로 대응할 수 있게 한다.",
  "아이콘은 메시지 성격(정보/경고)에 맞는 것을 첫 자식으로 둔다.",
]

export const donts = [
  "페이지 전체를 덮는 중요 오류를 Alert만으로 처리하지 않는다 — Dialog 등으로 확실히 알린다.",
  "AlertDescription에 여러 문단의 긴 설명을 쭉 나열하지 않는다.",
]
