import { Badge } from "@/components/ui/badge"
import { PatternSample } from "@/components/showcase/pattern-sample"
import { CONCEPT_EXPLAINER_SAMPLES } from "@/components/patterns/concept-explainer-samples"

const TITLE = "개념 설명 인포그래픽 패턴"
const DESCRIPTION =
  "어려운 기술 개념을 친숙한 비유로 풀어내는 교육용 인포그래픽 조합입니다. 개념 설명 카드 + 아키텍처 흐름 도식 + 증상▶대응 대응표 3종으로 구성합니다."

export default function ConceptExplainerPatternsPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Patterns
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">{TITLE}</h1>
        <p className="max-w-prose text-sm text-muted-foreground">{DESCRIPTION}</p>
      </section>

      {CONCEPT_EXPLAINER_SAMPLES.map((sample) => (
        <PatternSample key={sample.num} {...sample} />
      ))}
    </div>
  )
}
