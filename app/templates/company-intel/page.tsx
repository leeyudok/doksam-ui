import { Badge } from "@/components/ui/badge"

import { CompanyHeader } from "./_components/company-header"
import { KpiGrid } from "./_components/kpi-grid"
import { LocationCard } from "./_components/location-card"
import { NewsFeed } from "./_components/news-feed"
import { RelationSection } from "./_components/relation-section"
import { TagsMemo } from "./_components/tags-memo"

export default function CompanyIntelPage() {
  return (
    <div className="flex w-full max-w-6xl flex-col gap-6">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Company Intel · 기업 인텔리전스
        </Badge>
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">기업 인텔리전스 대시보드</h2>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
          가상 기업 한 곳을 KPI·소재지·뉴스·출자/주주 관계·연관 키워드로 심층 조망하는 대시보드입니다.
          출자·주주 관계는 공유 RelationNetwork 컴포넌트로 시각화하며, 표시되는 기업명·사업자번호·수치는
          전부 데모용 가상 데이터입니다.
        </p>
      </section>

      <CompanyHeader />

      <KpiGrid />

      {/* 데스크톱(lg+): 좌측 지도, 우측 뉴스 2열 → 미만 세로 스택 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <LocationCard />
        <NewsFeed />
      </div>

      <RelationSection />

      <TagsMemo />

      <footer className="border-t pt-4 text-center text-xs text-muted-foreground">가상 데이터 · 데모</footer>
    </div>
  )
}
