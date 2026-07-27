/**
 * Admin 템플릿 대시보드 데모 데이터 — 순수 데이터 모듈(컴포넌트 로직 없음).
 * 실제 백엔드 연동 시 이 파일을 API 응답 매핑으로 교체한다.
 */

export interface KpiMetric {
  id: string
  label: string
  value: string
  delta: number
  deltaLabel: string
  trend: "up" | "down" | "flat"
}

export const KPI_METRICS: KpiMetric[] = [
  { id: "users", label: "활성 사용자", value: "12,482", delta: 4.2, deltaLabel: "전주 대비", trend: "up" },
  { id: "orders", label: "신규 주문", value: "1,024", delta: -1.8, deltaLabel: "전주 대비", trend: "down" },
  { id: "revenue", label: "매출", value: "₩84,320,000", delta: 6.1, deltaLabel: "전주 대비", trend: "up" },
  { id: "tickets", label: "미해결 티켓", value: "37", delta: 0, deltaLabel: "변동 없음", trend: "flat" },
]

export type ServiceStatus = "operational" | "degraded" | "outage"

export interface StatusWidgetItem {
  id: string
  name: string
  status: ServiceStatus
  latencyMs: number
  uptime: string
}

export const SERVICE_STATUS: StatusWidgetItem[] = [
  { id: "api", name: "API 게이트웨이", status: "operational", latencyMs: 82, uptime: "99.98%" },
  { id: "db", name: "주문 데이터베이스", status: "operational", latencyMs: 14, uptime: "99.99%" },
  { id: "payments", name: "결제 게이트웨이", status: "degraded", latencyMs: 640, uptime: "99.42%" },
  { id: "search", name: "검색 인덱스", status: "operational", latencyMs: 45, uptime: "99.95%" },
  { id: "queue", name: "메시지 큐", status: "outage", latencyMs: 0, uptime: "97.10%" },
]

export interface RecentActivityRow {
  id: string
  actor: string
  action: string
  target: string
  time: string
}

export const RECENT_ACTIVITY: RecentActivityRow[] = [
  { id: "1", actor: "김도현", action: "주문 승인", target: "ORD-9231", time: "3분 전" },
  { id: "2", actor: "이서연", action: "환불 처리", target: "ORD-9187", time: "18분 전" },
  { id: "3", actor: "system", action: "배치 작업 완료", target: "일일 정산", time: "42분 전" },
  { id: "4", actor: "박민준", action: "사용자 정지", target: "USR-4821", time: "1시간 전" },
  { id: "5", actor: "최유진", action: "쿠폰 발급", target: "WELCOME10", time: "2시간 전" },
  { id: "6", actor: "system", action: "재고 동기화 실패", target: "SKU-1042", time: "3시간 전" },
]
