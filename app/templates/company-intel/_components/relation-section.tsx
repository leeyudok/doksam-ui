import { GraphIcon } from "@phosphor-icons/react/dist/ssr"

import { RelationNetwork } from "@/components/relation-network"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { COMPANY, RELATION_GROUPS, RELATION_NODES } from "../_data/company"

/**
 * 출자·주주 관계 섹션(#53) — 자체 그래프를 만들지 않고 공유 RelationNetwork 컴포넌트를
 * 재사용한다. weight 는 지분율(%)로 넘겨 값이 클수록 중심 가까이·크게 그려진다.
 * maxNodes 로 전부 도식화하고 계열 색은 groups 로 주입한다. 전부 가상 관계.
 */
export function RelationSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <GraphIcon className="size-4" />
          출자·주주 관계
          <span className="text-xs font-normal text-muted-foreground">{RELATION_NODES.length}개 관계</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RelationNetwork
          nodes={RELATION_NODES}
          groups={RELATION_GROUPS}
          centerLabel={COMPANY.name}
          maxNodes={RELATION_NODES.length}
        />
      </CardContent>
    </Card>
  )
}
