import { CheckCircleIcon, CircleIcon, TruckIcon } from "@phosphor-icons/react/dist/ssr"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

export const demo = (
  <div className="flex max-w-sm flex-col gap-3">
    <Marker>
      <MarkerIcon>
        <CheckCircleIcon size={16} weight="fill" className="text-primary" />
      </MarkerIcon>
      <MarkerContent>7월 10일 08:12 · 주문이 접수되었습니다.</MarkerContent>
    </Marker>
    <Marker>
      <MarkerIcon>
        <TruckIcon size={16} weight="regular" />
      </MarkerIcon>
      <MarkerContent>7월 11일 14:30 · 상품이 발송되었습니다.</MarkerContent>
    </Marker>
    <Marker>
      <MarkerIcon>
        <CircleIcon size={16} weight="regular" />
      </MarkerIcon>
      <MarkerContent>도착 예정 · 7월 13일</MarkerContent>
    </Marker>
    <Marker variant="separator">오늘</Marker>
  </div>
)

export const code = `<Marker>
  <MarkerIcon>
    <CheckCircleIcon size={16} weight="fill" className="text-primary" />
  </MarkerIcon>
  <MarkerContent>7월 10일 08:12 · 주문이 접수되었습니다.</MarkerContent>
</Marker>
<Marker>
  <MarkerIcon>
    <TruckIcon size={16} weight="regular" />
  </MarkerIcon>
  <MarkerContent>7월 11일 14:30 · 상품이 발송되었습니다.</MarkerContent>
</Marker>
<Marker variant="separator">오늘</Marker>`

export const dos = [
  "타임라인처럼 시간순 이벤트를 나열할 때 MarkerIcon으로 상태(완료/진행/대기)를 구분한다.",
  "variant='separator'로 날짜·구간 경계를 시각적으로 나눈다.",
  "MarkerContent 문구에 시각·날짜 등 구체적 정보를 포함한다.",
]

export const donts = [
  "완료되지 않은 단계에 완료 아이콘(CheckCircleIcon)을 잘못 사용하지 않는다.",
  "Marker를 클릭 가능한 네비게이션 링크 대용으로 쓰지 않는다 — 상태 표시 전용이다.",
]
