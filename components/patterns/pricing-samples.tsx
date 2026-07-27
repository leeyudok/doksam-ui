import type { PatternSampleData } from "@/components/showcase/pattern-sample"
import { PricingToggleDemo } from "@/components/patterns/pricing/pricing-toggle-demo"
import { PricingFeatureListDemo } from "@/components/patterns/pricing/pricing-feature-list-demo"

export const PRICING_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "3티어 가격 카드 + 월/연 토글",
    description:
      "월간/연간 결제를 Switch로 전환하면 연간 할인가가 즉시 반영되고, 추천 티어는 링 강조 + 배지로 구분합니다.",
    demo: <PricingToggleDemo />,
    code: `function priceFor(tier: PricingTier, period: BillingPeriod) {
  if (tier.monthlyPrice === 0) return 0
  if (period === "monthly") return tier.monthlyPrice
  return Math.round((tier.monthlyPrice * 12 * (1 - YEARLY_DISCOUNT_RATE)) / 12)
}

<Switch checked={isYearly} onCheckedChange={(checked) => setPeriod(checked ? "yearly" : "monthly")} />

<Card className={cn(tier.highlighted && "ring-2 ring-primary")}>
  {tier.highlighted && (
    <Badge variant="default" className="gap-1 text-[10px]">
      <SealCheckIcon size={12} weight="fill" />
      추천
    </Badge>
  )}
  <span className="text-3xl font-bold tabular-nums">
    {tier.monthlyPrice === 0 ? "무료" : \`₩\${priceFor(tier, period).toLocaleString()}\`}
  </span>
</Card>`,
    notes: [
      "할인가는 월 환산액(연 결제 총액 ÷ 12)으로 표시해 월간 카드와 숫자 자릿수를 나란히 비교할 수 있게 한다.",
      "추천 티어는 ring-2 ring-primary(카드 테두리)와 SealCheckIcon 배지 두 가지 신호를 함께 써서 다크모드에서도 눈에 띄게 한다.",
      "할인율 배지는 success 시맨틱 토큰만 사용하고, 결제 주기와 무관하게 항상 노출해 전환을 유도한다.",
      "가격 숫자는 tabular-nums로 자릿수를 고정해 토글 전환 시 레이아웃이 흔들리지 않게 한다.",
    ],
  },
  {
    num: 2,
    title: "기능 비교 표",
    description: "티어별 기능 포함 여부를 체크/마이너스 아이콘으로 압축한 비교 목록입니다.",
    demo: <PricingFeatureListDemo />,
    code: `<CheckIcon size={16} weight="bold" className={cn("text-success", isHighlighted && "text-primary")} />
<MinusIcon size={16} className="text-muted-foreground/50" />`,
    notes: [
      "포함 여부는 boolean 데이터를 아이콘으로만 매핑하고 별도 텍스트(있음/없음)는 쓰지 않아 표를 촘촘하게 유지한다.",
      "추천 티어 컬럼만 체크 아이콘 색을 primary로 올려 표 안에서도 시선이 먼저 가게 한다.",
      "좁은 화면에서는 overflow-x-auto 컨테이너로 표만 가로 스크롤되게 하고 페이지 전체 레이아웃은 유지한다.",
    ],
  },
]
