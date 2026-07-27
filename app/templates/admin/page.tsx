import { PageHeading } from "./_components/page-heading"
import { KpiCard } from "./_components/kpi-card"
import { StatusWidget } from "./_components/status-widget"
import { RecentActivityTable } from "./_components/recent-activity-table"
import { KPI_METRICS, RECENT_ACTIVITY, SERVICE_STATUS } from "./_data/dashboard-data"

export default function AdminDashboardPage() {
  return (
    <div className="flex w-full max-w-6xl flex-col gap-6">
      <PageHeading
        eyebrow="Admin · 대시보드"
        title="운영 현황"
        description="핵심 지표, 서비스 상태, 최근 관리자 활동을 한눈에 확인합니다."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPI_METRICS.map((metric) => (
          <KpiCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
        <RecentActivityTable rows={RECENT_ACTIVITY} />
        <StatusWidget items={SERVICE_STATUS} />
      </div>
    </div>
  )
}
