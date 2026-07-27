import { CheckCircleIcon, IdentificationCardIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import { COMPANY } from "../_data/company"

/**
 * 기업 인텔리전스 헤더(#53) — 기업명·가상 사업자번호·대표자와 업종/상태/신용등급
 * 배지를 한 카드에 모은다. bizinfo DetailHeaderCard 의 배지 조합만 참고했고
 * 값은 전부 가상이다. 좌측 accent border 로 카드 위계를 준다.
 */
export function CompanyHeader() {
  return (
    <Card className="border-l-4 border-l-primary">
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{COMPANY.name}</h2>
          <Badge variant="secondary" className="gap-1">
            <CheckCircleIcon className="size-3" weight="fill" />
            {COMPANY.status}
          </Badge>
          <Badge variant="outline">{COMPANY.industry}</Badge>
          <Badge className="font-mono">신용 {COMPANY.creditGrade}</Badge>
        </div>
        <dl className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <IdentificationCardIcon className="size-4" />
            <dt className="sr-only">사업자번호</dt>
            <dd className="font-mono">{COMPANY.bizNo}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt>대표자</dt>
            <dd className="text-foreground">{COMPANY.ceo}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt>업태</dt>
            <dd className="text-foreground">{COMPANY.sector}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
