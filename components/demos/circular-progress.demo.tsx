import { CircularProgress } from "@/components/circular-progress"

export const demo = (
  <div className="flex flex-wrap items-center gap-6">
    <CircularProgress value={32} size={48} strokeWidth={4} />
    <CircularProgress value={68} />
    <CircularProgress value={100} size={80} strokeWidth={8} />
    <CircularProgress value={45} label="45/100" />
  </div>
)

export const code = `<CircularProgress value={32} size={48} strokeWidth={4} />
<CircularProgress value={68} />
<CircularProgress value={100} size={80} strokeWidth={8} />
<CircularProgress value={45} label="45/100" />`

export const dos = [
  "0~100 범위의 value를 명시적으로 넘긴다 — 컴포넌트가 범위를 clamp하지만 의도는 호출부에서 보장한다.",
  "여러 개를 나란히 둘 때는 size/strokeWidth를 통일해 시각적 리듬을 맞춘다.",
  "퍼센트 외 값(N/100 등)을 보여줘야 하면 label prop으로 대체 텍스트를 넘긴다.",
]

export const donts = [
  "무기한 대기(값을 알 수 없는 로딩)에는 쓰지 않는다 — 값이 확정되지 않으면 Spinner류를 쓴다.",
  "strokeWidth를 size에 비해 지나치게 두껍게 줘 라벨이 가려지게 하지 않는다.",
]
