import { Badge } from "@/components/ui/badge"

import { OntologyConsole } from "./_components/ontology-console"
import { EDGES, NODES, NODE_TYPES } from "./_data/graph"

export default function OntologyConsolePage() {
  return (
    <div className="flex w-full max-w-6xl flex-col gap-6">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Ontology · 지식 온톨로지
        </Badge>
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">온톨로지 지식 콘솔</h2>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
          프로젝트 에이전트 인프라의 문서 {NODES.length}개를 {NODE_TYPES.length}개 타입과 관계 {EDGES.length}
          건으로 엮은 온톨로지입니다. 같은 데이터를 사전(검색·타입 필터·하이라이트)과 그래프(force 레이아웃·이웃
          강조·참조/피참조 상세) 두 렌즈로 탐색합니다.
        </p>
      </section>

      <OntologyConsole />
    </div>
  )
}
