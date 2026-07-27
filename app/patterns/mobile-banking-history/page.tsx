import { Badge } from "@/components/ui/badge"
import { PatternSample } from "@/components/showcase/pattern-sample"
import { MOBILE_BANKING_HISTORY_SAMPLES } from "@/components/patterns/mobile-banking-history-samples"

/** #34 모바일뱅킹 거래 내역 패턴 — 입출금 gain/loss 색 + 날짜 그룹 헤더 + 유형 필터 칩(모바일 우선). */
export default function MobileBankingHistoryPatternsPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Patterns
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">모바일뱅킹 거래 내역 패턴</h1>
        <p className="max-w-prose text-sm text-muted-foreground">
          입금/출금을 gain/loss 시맨틱 색으로 구분하고, 날짜별 그룹 헤더와 유형 필터 칩으로 좁혀볼 수 있는
          거래 내역 목록입니다.
        </p>
      </section>

      {MOBILE_BANKING_HISTORY_SAMPLES.map((sample) => (
        <PatternSample key={sample.num} {...sample} />
      ))}
    </div>
  )
}
