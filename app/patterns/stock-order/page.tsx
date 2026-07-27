import { Badge } from "@/components/ui/badge"
import { PatternSample } from "@/components/showcase/pattern-sample"
import { STOCK_ORDER_SAMPLES } from "@/components/patterns/stock-order-samples"

/** #34 주식 주문 패턴 — 매수/매도 탭 + 호가 클릭 반영 + 수량/주문유형 + 예상 체결금액. */
export default function StockOrderPatternsPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Patterns
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">주식 주문 패턴</h1>
        <p className="max-w-prose text-sm text-muted-foreground">
          매수/매도 탭, 클릭하면 가격이 반영되는 호가 목록, 수량·주문유형 선택, 예상 체결금액으로 구성한
          주문 입력 화면입니다.
        </p>
      </section>

      {STOCK_ORDER_SAMPLES.map((sample) => (
        <PatternSample key={sample.num} {...sample} />
      ))}
    </div>
  )
}
