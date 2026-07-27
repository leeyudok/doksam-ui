import { Badge } from "@/components/ui/badge"
import { PatternSample } from "@/components/showcase/pattern-sample"
import { PRICING_SAMPLES } from "@/components/patterns/pricing-samples"

export default function PricingPatternsPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Patterns
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">가격 카드 패턴</h1>
        <p className="max-w-prose text-sm text-muted-foreground">
          3티어 가격 카드와 월/연 결제 토글, 기능 비교 표 등 요금제 안내 화면에서 반복되는 UI 2종입니다.
        </p>
      </section>

      {PRICING_SAMPLES.map((sample) => (
        <PatternSample key={sample.num} {...sample} />
      ))}
    </div>
  )
}
