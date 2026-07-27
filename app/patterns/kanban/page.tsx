import { Badge } from "@/components/ui/badge"
import { PatternSample } from "@/components/showcase/pattern-sample"
import { KANBAN_SAMPLES } from "@/components/patterns/kanban-samples"

export default function KanbanPatternsPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Patterns
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">칸반 보드 패턴</h1>
        <p className="max-w-prose text-sm text-muted-foreground">
          @dnd-kit로 구현한 드래그 앤 드롭 칸반 보드입니다. 컬럼 간 카드 이동, 라벨, 담당자 아바타를 지원합니다.
        </p>
      </section>

      {KANBAN_SAMPLES.map((sample) => (
        <PatternSample key={sample.num} {...sample} />
      ))}
    </div>
  )
}
