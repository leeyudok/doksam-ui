import { RequestInspector, type RequestEntry } from "@/components/request-inspector"

const REQUESTS: RequestEntry[] = [
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

/** RequestInspector(components/request-inspector.tsx) 데모 — 샘플 요청 목록을 렌더링한다. */
export function RequestInspectorDemo() {
  return <RequestInspector requests={REQUESTS} baseUrl="https://api.doksam.com" />
}
