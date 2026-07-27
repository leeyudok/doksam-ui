import { JsonTree, type JsonValue } from "@/components/json-tree"

const SAMPLE_DATA: JsonValue = {
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
  items: Array.from({ length: 34 }, (_, i) => ({
    sku: `SKU-${1000 + i}`,
    qty: (i % 5) + 1,
  })),
  tags: ["urgent", "billing", "retry"],
}

/** JsonTree(components/json-tree.tsx) 데모 — 샘플 응답 데이터로 트리를 렌더링한다. */
export function JsonTreeDemo() {
  return <JsonTree rootLabel="response" data={SAMPLE_DATA} />
}
