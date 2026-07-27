import { StatusCard } from "@/components/status-card"

export const demo = (
  <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
    <StatusCard name="수집 워커" status="정상" variant="success" percent={98} />
    <StatusCard name="색인 파이프라인" status="지연" variant="warning" percent={64} percentLabel="처리율" />
    <StatusCard name="외부 API 게이트웨이" status="장애" variant="danger" percent={12} percentLabel="성공률" />
  </div>
)

export const code = `<StatusCard name="수집 워커" status="정상" variant="success" percent={98} />
<StatusCard name="색인 파이프라인" status="지연" variant="warning" percent={64} percentLabel="처리율" />
<StatusCard name="외부 API 게이트웨이" status="장애" variant="danger" percent={12} percentLabel="성공률" />`

export const dos = [
  "variant 하나로 배지와 진행률 바 색이 함께 정해진다 — success/warning/danger 시맨틱만.",
  "percentLabel 로 지표 의미(가동률·처리율·성공률)를 명시한다.",
  "서버·잡·장비처럼 동종 항목 그리드에 반복 배치한다.",
]

export const donts = [
  "진행률 바 색을 variant 와 따로 지정하지 않는다 — 상태와 색이 어긋나면 오독을 만든다.",
  "percent 에 0~100 밖의 값을 넣지 않는다.",
]
