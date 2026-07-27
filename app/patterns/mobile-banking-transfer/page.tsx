import { Badge } from "@/components/ui/badge"
import { PatternSample } from "@/components/showcase/pattern-sample"
import { MOBILE_BANKING_TRANSFER_SAMPLES } from "@/components/patterns/mobile-banking-transfer-samples"

/** #34 모바일뱅킹 이체 패턴 — 받는사람 선택 → 금액 입력(키패드) → 확인 단계 전환(모바일 우선). */
export default function MobileBankingTransferPatternsPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Patterns
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">모바일뱅킹 이체 패턴</h1>
        <p className="max-w-prose text-sm text-muted-foreground">
          받는사람 선택 → 금액 입력 → 확인으로 이어지는 이체 플로우입니다. 숫자 키패드형 금액 입력과 단계
          전환을 폰 화면 폭(max-w-sm) 기준으로 설계했습니다.
        </p>
      </section>

      {MOBILE_BANKING_TRANSFER_SAMPLES.map((sample) => (
        <PatternSample key={sample.num} {...sample} />
      ))}
    </div>
  )
}
