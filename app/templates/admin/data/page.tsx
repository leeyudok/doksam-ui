import { PageHeading } from "../_components/page-heading"
import { DataExplorer } from "../_components/data-explorer"

export default function AdminDataPage() {
  return (
    <div className="flex w-full max-w-6xl flex-col gap-6">
      <PageHeading
        eyebrow="Admin · 데이터 관리"
        title="사용자 관리"
        description="검색·필터로 사용자를 좁히고, 컬럼 정렬·표시 토글·드래그 재정렬이 가능한 테이블에서 확인합니다."
      />
      <DataExplorer />
    </div>
  )
}
