import { Badge } from "@/components/ui/badge"
import { PatternSample } from "@/components/showcase/pattern-sample"
import { STATS_SAMPLES } from "@/components/patterns/stats-samples"

/**
 * 아직 lib/patterns/registry.ts에 배선되지 않은 신규 패턴 페이지라 title/description을
 * 로컬 상수로 둔다 — registry 편입은 부모 세션이 여러 패턴 PR을 합칠 때 한 번에 처리한다(#33).
 */
const TITLE = "통계/KPI 패턴"
const DESCRIPTION = "값(formatWon/건수/비율) + 전기 대비 증감(rateColor/rateText) + 미니 스파크라인으로 구성하는 지표 카드 조합입니다."

export default function StatsPatternsPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Patterns
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">{TITLE}</h1>
        <p className="max-w-prose text-sm text-muted-foreground">{DESCRIPTION}</p>
      </section>

      {STATS_SAMPLES.map((sample) => (
        <PatternSample key={sample.num} {...sample} />
      ))}
    </div>
  )
}
