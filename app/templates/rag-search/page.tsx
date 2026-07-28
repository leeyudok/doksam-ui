import { Badge } from "@/components/ui/badge"

import { RagConsole } from "./_components/rag-console"
import { CHUNKS, DOCUMENTS } from "./_data/corpus"
import { QUERIES } from "./_data/queries"

export default function RagSearchPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          RAG Search · OpenSearch 검색 콘솔
        </Badge>
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">검색 · 답변 · 색인 콘솔</h2>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
          하이브리드 검색으로 근거를 찾고 그 근거로 답변을 만드는 과정을 한 화면에서 보여주는 데모입니다. 검색 탭은
          BM25·벡터·rerank 점수 분해를, 답변 탭은 문장별 인용과 원문 청크를, 색인 탭은 파이프라인과 인덱스 상태를
          다룹니다. 문서 {DOCUMENTS.length}건 · 청크 {CHUNKS.length}건 · 질의 {QUERIES.length}건이 담겨 있습니다.
        </p>
      </section>

      <RagConsole />
    </div>
  )
}
