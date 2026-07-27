import type { PatternSampleData } from "@/components/showcase/pattern-sample"
import { OrderFormDemo } from "@/components/patterns/stock-order/order-form-demo"

export const STOCK_ORDER_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "주문 입력",
    description: "매수/매도 탭 + 호가 클릭 반영 + 수량/주문유형 + 예상 체결금액으로 구성한 주문 입력 폼입니다.",
    demo: <OrderFormDemo />,
    code: `<Tabs value={side} onValueChange={setSide}>
  <TabsList className="w-full">
    <TabsTrigger value="buy">매수</TabsTrigger>
    <TabsTrigger value="sell">매도</TabsTrigger>
  </TabsList>
</Tabs>

{/* 호가 클릭 시 price state 를 그 값으로 반영 — 현재가 대비 등락은 rateColor 로 색을 정한다 */}
<button onClick={() => setPrice(level.price)}>
  <span className={rateColor(level.price - currentPrice)}>{level.price.toLocaleString()}</span>
</button>

const estimatedAmount = estimateOrderAmount(orderType === "market" ? currentPrice : price, quantity)
<span className="font-bold tabular-nums">{formatWon(estimatedAmount)}</span>`,
    notes: [
      "매수/매도는 shadcn Tabs를 그대로 쓰고, 매도 주문 버튼만 destructive variant로 위험 신호를 준다.",
      "호가 목록의 각 행을 클릭하면 해당 가격이 바로 주문가격 입력값으로 반영된다(호가창 클릭→가격 입력 패턴).",
      "호가 색상은 현재가 대비 등락으로 계산한다 — rateColor(level.price - currentPrice)로 gain/loss 토큰을 그대로 재사용한다.",
      "시장가 주문은 가격 입력 필드를 숨기고 현재가를 기준으로 예상 체결금액을 계산한다.",
      "예상 체결금액은 formatWon()으로 억/조 단위까지 일관되게 표시한다.",
    ],
  },
]
