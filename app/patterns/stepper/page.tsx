import { Badge } from "@/components/ui/badge"
import { PatternSample } from "@/components/showcase/pattern-sample"
import { STEPPER_SAMPLES } from "@/components/patterns/stepper-samples"

export default function StepperPatternsPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Patterns
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">스텝퍼 패턴</h1>
        <p className="max-w-prose text-sm text-muted-foreground">
          진행 인디케이터·단계별 폼·이전/다음/완료 내비게이션으로 구성하는 다단계 위저드 UI
          패턴입니다.
        </p>
      </section>

      {STEPPER_SAMPLES.map((sample) => (
        <PatternSample key={sample.num} {...sample} />
      ))}
    </div>
  )
}
