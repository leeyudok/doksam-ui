import { RateColorDemo } from "./rate-color.demo.client"

export const demo = <RateColorDemo />

export const code = `import { rateColor, rateText } from "@/lib/finance/rate"

function RateBadge({ value }: { value: number }) {
  return (
    <span className={rateColor(value)}>{rateText(value)}</span>
  )
}`

export const dos = [
  "등락률·등락액을 표시할 때는 rateColor로 색을, rateText로 부호 포함 텍스트를 만든다 — 색을 text-red-600/text-blue-600 등으로 직접 하드코딩하지 않는다.",
  "rateColor는 --gain/--loss 시맨틱 토큰(text-gain/text-loss)만 참조한다 — 프리셋이 바뀌어도 규칙(이익=빨강/손실=파랑)은 항상 동일하게 유지된다.",
  "0은 rateColor가 중립(text-muted-foreground)을, rateText가 부호 없는 값을 반환하므로 별도 분기 없이 그대로 써도 된다.",
]

export const donts = [
  "부호 표시를 위해 `+${value}` 처럼 직접 문자열을 조립하지 않는다 — 음수 부호 처리·소수 자릿수가 rateText와 어긋날 수 있다.",
  "lightweight-charts, canvas 등 CSS를 직접 해석하지 않는 렌더러에는 text-gain/text-loss 클래스가 아니라 lib/finance/normalize-color의 normalizeColor로 해소한 hex 값을 넘긴다.",
]
