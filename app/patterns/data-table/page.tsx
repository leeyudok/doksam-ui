import { Badge } from "@/components/ui/badge"
import { PatternSample } from "@/components/showcase/pattern-sample"
import { DATA_TABLE_SAMPLES } from "@/components/patterns/data-table-samples"

/**
 * 아직 lib/patterns/registry.ts에 배선되지 않은 신규 패턴 페이지라 title/description을
 * 로컬 상수로 둔다 — registry 편입은 부모 세션이 여러 패턴 PR을 합칠 때 한 번에 처리한다(#33).
 */
const TITLE = "데이터 테이블 패턴"
const DESCRIPTION = "table-sortable 기반 정렬 헤더에 행 선택 체크박스 + 선택 시 일괄 액션 바 + 하단 페이지네이션을 더한 목록 화면 표준 조합입니다."

export default function DataTablePatternsPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Patterns
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">{TITLE}</h1>
        <p className="max-w-prose text-sm text-muted-foreground">{DESCRIPTION}</p>
      </section>

      {DATA_TABLE_SAMPLES.map((sample) => (
        <PatternSample key={sample.num} {...sample} />
      ))}
    </div>
  )
}
