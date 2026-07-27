import { Badge } from "@/components/ui/badge"
import { PatternSample } from "@/components/showcase/pattern-sample"
import { MOBILE_BANKING_ACCOUNT_SAMPLES } from "@/components/patterns/mobile-banking-account-samples"

/** #34 모바일뱅킹 계좌 패턴 — 대표계좌 잔액 카드 + 계좌 목록 + 빠른메뉴 그리드(모바일 우선). */
export default function MobileBankingAccountPatternsPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Patterns
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">모바일뱅킹 계좌 패턴</h1>
        <p className="max-w-prose text-sm text-muted-foreground">
          대표계좌 잔액, 계좌 목록, 빠른메뉴 그리드로 구성한 모바일뱅킹 홈 화면 패턴입니다. 폰 화면(360~430px)을
          기준으로 먼저 설계하고, 데스크톱에서는 카드 폭을 제한한 채 중앙 정렬합니다.
        </p>
      </section>

      {MOBILE_BANKING_ACCOUNT_SAMPLES.map((sample) => (
        <PatternSample key={sample.num} {...sample} />
      ))}
    </div>
  )
}
