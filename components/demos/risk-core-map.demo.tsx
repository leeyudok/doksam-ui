import { RiskCoreMap, type RiskEdge, type RiskNode } from "@/components/risk-core-map"

const nodes: RiskNode[] = [
  { id: "sunjin", label: "선진중공업", tier: 5, weight: 4200 },
  { id: "hanma", label: "한마전자", tier: 5, weight: 3100 },
  { id: "daeyang", label: "대양화학", tier: 4, weight: 2600 },
  { id: "kumkang", label: "금강건설", tier: 4, weight: 2200 },
  { id: "nara", label: "나라물산", tier: 4, weight: 1500 },
  { id: "sejong", label: "세종바이오", tier: 3, weight: 1800 },
  { id: "yeoul", label: "여울에너지", tier: 3, weight: 1300 },
  { id: "purme", label: "푸르메식품", tier: 3, weight: 900 },
  { id: "haneol", label: "하늘항공", tier: 2, weight: 2400 },
  { id: "miso", label: "미소리테일", tier: 2, weight: 1100 },
  { id: "dodam", label: "도담자산운용", tier: 1, weight: 1900 },
  { id: "boram", label: "보람저축은행", tier: 1, weight: 1400 },
  { id: "areum", label: "아름소재", tier: 1, weight: 700 },
]

const edges: RiskEdge[] = [
  { source: "sunjin", target: "daeyang" },
  { source: "sunjin", target: "kumkang" },
  { source: "hanma", target: "nara" },
  { source: "hanma", target: "sejong" },
  { source: "daeyang", target: "yeoul" },
  { source: "kumkang", target: "haneol" },
  { source: "nara", target: "miso" },
  { source: "sejong", target: "purme" },
  { source: "haneol", target: "dodam" },
  { source: "dodam", target: "boram" },
  { source: "boram", target: "areum" },
]

export const demo = <RiskCoreMap nodes={nodes} edges={edges} />

export const code = `import { RiskCoreMap, type RiskEdge, type RiskNode } from "@/components/risk-core-map"

const nodes: RiskNode[] = [
  { id: "sunjin", label: "선진중공업", tier: 5, weight: 4200 },
  { id: "daeyang", label: "대양화학", tier: 4, weight: 2600 },
  { id: "sejong", label: "세종바이오", tier: 3, weight: 1800 },
  { id: "dodam", label: "도담자산운용", tier: 1, weight: 1900 },
]

const edges: RiskEdge[] = [
  { source: "sunjin", target: "daeyang" },
  { source: "daeyang", target: "sejong" },
]

<RiskCoreMap
  nodes={nodes}
  edges={edges}
  onSelect={(node) => console.log(node?.label ?? "선택 해제")}
/>`

export const dos = [
  "tier(1~5, 5=고위험)로 위험등급을 넘긴다 — 높을수록 중심 밴드에 놓여 시선이 안쪽으로 모인다.",
  "weight로 중요도(익스포저 등)를 주입한다 — 값이 클수록 노드가 크고 같은 등급 안에서도 안쪽에 배치된다.",
  "onSelect로 노드 선택을 상위로 끌어올린다 — 같은 노드를 다시 누르면 null이 와서 선택 해제를 알 수 있다.",
]

export const donts = [
  "색을 하드코딩하지 않는다 — 위험 tier 색은 destructive→warning→primary 토큰이라 테마·다크모드에 자동 대응한다.",
  "한 등급에 수백 개 노드를 몰아넣지 않는다 — 서브링으로 밀려나며 반경이 축소돼 라벨이 사라진다. 상위만 도식화하고 나머지는 목록으로 보완한다.",
  "움직임 민감 맥락에서 애니메이션 제거를 따로 구현하지 않는다 — prefers-reduced-motion을 이미 존중한다.",
]
