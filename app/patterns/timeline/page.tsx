import { Badge } from "@/components/ui/badge"
import { PatternSample } from "@/components/showcase/pattern-sample"
import { TIMELINE_SAMPLES } from "@/components/patterns/timeline-samples"

/**
 * 아직 lib/patterns/registry.ts에 배선되지 않은 신규 패턴 페이지라 title/description을
 * 로컬 상수로 둔다 — registry 편입은 부모 세션이 여러 패턴 PR을 합칠 때 한 번에 처리한다(#33).
 */
const TITLE = "타임라인 패턴"
const DESCRIPTION = "아이콘 노드 + 시각 + 제목/설명을 세로로 나열하는 활동 타임라인 — 날짜별 그룹과 컴팩트 변형 2종입니다."

export default function TimelinePatternsPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Patterns
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">{TITLE}</h1>
        <p className="max-w-prose text-sm text-muted-foreground">{DESCRIPTION}</p>
      </section>

      {TIMELINE_SAMPLES.map((sample) => (
        <PatternSample key={sample.num} {...sample} />
      ))}
    </div>
  )
}
