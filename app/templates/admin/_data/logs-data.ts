/**
 * Admin 템플릿 "로그·관측성" 페이지 데모 데이터 — 순수 데이터 모듈.
 *
 * 타입은 registryDependency 로 함께 설치되는 컴포넌트(log-viewer · request-inspector ·
 * json-tree)가 단일 진실원천이다. 여기서 다시 선언하지 않는다.
 */
import type { JsonValue } from "@/components/json-tree"
import type { LogEntry } from "@/components/log-viewer"
import type { RequestEntry } from "@/components/request-inspector"

export const LOG_ENTRIES: LogEntry[] = [
  { id: "1", time: "10:24:01.102", level: "info", group: 0, message: "요청 시작 GET /api/orders" },
  { id: "2", time: "10:24:01.118", level: "debug", group: 1, message: "캐시 조회 miss — DB 폴백" },
  { id: "3", time: "10:24:01.204", level: "debug", group: 1, message: "쿼리 실행 320ms" },
  { id: "4", time: "10:24:01.207", level: "info", group: 0, message: "응답 200 반환" },
  { id: "5", time: "10:24:03.501", level: "warn", group: 0, message: "커넥션 풀 사용률 82%", count: 3 },
  { id: "6", time: "10:24:05.880", level: "error", group: 0, message: "결제 게이트웨이 타임아웃(5000ms)" },
  { id: "7", time: "10:24:05.881", level: "debug", group: 1, message: "재시도 큐에 등록 attempt=1" },
  { id: "8", time: "10:24:07.012", level: "info", group: 0, message: "재시도 성공" },
  { id: "9", time: "10:24:12.330", level: "warn", group: 0, message: "메시지 큐 지연 3200ms", count: 2 },
  { id: "10", time: "10:24:15.771", level: "error", group: 0, message: "재고 동기화 실패 SKU-1042" },
]

export const REQUEST_ENTRIES: RequestEntry[] = [
  {
    id: "1",
    method: "GET",
    path: "/api/orders",
    status: 200,
    durationMs: 84,
    headers: { Accept: "application/json", Authorization: "Bearer ***" },
    query: { page: "1", limit: "20" },
    payload: null,
    response: { total: 132, items: 20 },
  },
  {
    id: "2",
    method: "POST",
    path: "/api/orders",
    status: 201,
    durationMs: 212,
    headers: { "Content-Type": "application/json", Authorization: "Bearer ***" },
    query: {},
    payload: { sku: "SKU-1042", qty: 2 },
    response: { id: "ord_9f21", status: "created" },
  },
  {
    id: "3",
    method: "POST",
    path: "/api/payments",
    status: 402,
    durationMs: 5008,
    headers: { "Content-Type": "application/json", Authorization: "Bearer ***" },
    query: {},
    payload: { orderId: "ord_9f21", method: "card" },
    response: { error: "insufficient_funds" },
  },
  {
    id: "4",
    method: "GET",
    path: "/api/inventory/SKU-1042",
    status: 500,
    durationMs: 1340,
    headers: { Accept: "application/json" },
    query: {},
    payload: null,
    response: { error: "internal_server_error" },
  },
]

export const SAMPLE_RESPONSE_JSON: JsonValue = {
  requestId: "req_8f21ac",
  status: 200,
  ok: true,
  retriedAt: null,
  user: {
    id: 4821,
    name: "김도현",
    roles: ["admin", "editor"],
    profile: {
      locale: "ko-KR",
      betaFeatures: true,
    },
  },
  items: Array.from({ length: 24 }, (_, i) => ({
    sku: `SKU-${1000 + i}`,
    qty: (i % 5) + 1,
  })),
  tags: ["urgent", "billing", "retry"],
}
