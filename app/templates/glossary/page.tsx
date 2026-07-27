import { Badge } from "@/components/ui/badge"

import { GlossaryExplorer } from "./_components/glossary-explorer"
import { CATEGORIES, TERMS } from "./_data/terms"

export default function GlossaryExplorerPage() {
  return (
    <div className="flex w-full max-w-6xl flex-col gap-6">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Glossary · 지식 그래프
        </Badge>
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">용어 네트워크 탐색기</h2>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
          SDLC·AI 개발 도메인의 용어 {TERMS.length}개를 {CATEGORIES.length}개 카테고리와 관계로 엮은 지식 그래프입니다.
          노드를 클릭하면 이웃 용어가 강조되고 상세 패널에 정의·관련 용어가 표시됩니다. 검색으로 매칭 노드를 찾거나 범례
          칩으로 카테고리를 걸러낼 수 있습니다.
        </p>
      </section>

      <GlossaryExplorer />
    </div>
  )
}
