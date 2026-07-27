import { FormatWonDemo } from "./format-won.demo.client"

export const demo = <FormatWonDemo />

export const code = `import { formatWon } from "@/lib/finance/format-won"

function AmountCell({ won }: { won: number }) {
  return <span className="font-mono">{formatWon(won)}</span>
}`

export const dos = [
  "1억 미만은 원 단위(천단위 콤마), 1억 이상은 억, 반올림 후 10,000억 이상이면 조로 자동 축약된다 — 구간별 분기를 직접 짜지 않는다.",
  "조 전환은 반올림된 억 값 기준으로 판단하므로 9,999.6억처럼 경계에 걸친 값도 '10,000억'으로 새지 않고 정확히 '1.0조'로 표시된다.",
  "NaN·Infinity 같은 비정상 입력에는 '-'를 반환하므로 화면에 NaN이 그대로 노출될 걱정 없이 바로 써도 된다.",
]

export const donts = [
  "formatWon 결과를 정렬·계산에 쓰지 않는다 — 억/조 단위 문자열이라 원본 숫자(원 단위)를 별도로 보관해야 한다.",
  "formatWon은 100만원 미만 소수 단위(만원 등) 축약은 지원하지 않는다 — 억 미만 표시가 세밀해야 하면 toLocaleString을 직접 쓴다.",
]
