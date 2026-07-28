import registry from "@/registry.json"

/** registry.json(shadcn 배포본)에 등록된 항목 name 집합 — 단일 조회 지점. */
const REGISTRY_NAMES: ReadonlySet<string> = new Set(
  (registry as { items: { name: string }[] }).items.map((item) => item.name),
)

/** slug 가 shadcn 레지스트리에 배포돼 `npx shadcn add` 로 설치 가능한지. */
export function isInRegistry(slug: string): boolean {
  return REGISTRY_NAMES.has(slug)
}
