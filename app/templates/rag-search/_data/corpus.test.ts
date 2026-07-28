import { describe, expect, it } from "vitest"

import { ANSWERS, getAnswer } from "./answers"
import { CHUNKS, DOCUMENTS, getChunk, getDocument } from "./corpus"
import { QUERIES } from "./queries"

describe("rag-search 목데이터 정합성", () => {
  it("문서의 chunkIds 가 모두 실제 청크를 가리킨다", () => {
    for (const doc of DOCUMENTS) {
      for (const chunkId of doc.chunkIds) {
        expect(getChunk(chunkId), `${doc.id} 의 ${chunkId} 누락`).toBeDefined()
      }
    }
  })

  it("청크의 docId 가 모두 실제 문서를 가리킨다", () => {
    for (const chunk of CHUNKS) {
      expect(getDocument(chunk.docId), `${chunk.id} 의 ${chunk.docId} 누락`).toBeDefined()
    }
  })

  it("질의의 히트가 모두 실제 청크를 가리킨다", () => {
    for (const query of QUERIES) {
      expect(query.hits.length).toBeGreaterThan(0)
      for (const hit of query.hits) {
        expect(getChunk(hit.chunkId), `${query.id} 의 ${hit.chunkId} 누락`).toBeDefined()
      }
    }
  })

  it("히트 하이라이트는 해당 청크 본문에 실제로 존재하는 부분 문자열이다", () => {
    for (const query of QUERIES) {
      for (const hit of query.hits) {
        const chunk = getChunk(hit.chunkId)!
        for (const h of hit.highlights) {
          expect(chunk.text, `${hit.chunkId} 에 "${h}" 없음`).toContain(h)
        }
      }
    }
  })

  it("점수는 0..1 범위이고 rerank 전후 순위가 1-base 다", () => {
    for (const query of QUERIES) {
      for (const { score, breakdown } of query.hits) {
        for (const v of [score, breakdown.bm25, breakdown.vector, breakdown.rerank]) {
          expect(v).toBeGreaterThanOrEqual(0)
          expect(v).toBeLessThanOrEqual(1)
        }
        expect(breakdown.rankBefore).toBeGreaterThanOrEqual(1)
        expect(breakdown.rankAfter).toBeGreaterThanOrEqual(1)
      }
    }
  })

  it("패싯 카테고리 값이 실제 문서 category 집합에 포함된다", () => {
    const categories = new Set(DOCUMENTS.map((d) => d.category))
    for (const query of QUERIES) {
      const facet = query.facets.find((f) => f.key === "category")
      expect(facet, `${query.id} 에 category 패싯 없음`).toBeDefined()
      for (const v of facet!.values) expect(categories).toContain(v.value)
    }
  })

  it("답변 문장의 인용이 모두 실제 청크를 가리킨다", () => {
    for (const answer of ANSWERS) {
      for (const sentence of answer.sentences) {
        for (const chunkId of sentence.citationChunkIds) {
          expect(getChunk(chunkId), `${sentence.id} 의 ${chunkId} 누락`).toBeDefined()
        }
      }
    }
  })

  it("모든 질의에 답변이 있고 신뢰도가 0..1 이다", () => {
    for (const query of QUERIES) {
      const answer = getAnswer(query.id)
      expect(answer, `${query.id} 답변 누락`).toBeDefined()
      expect(answer!.confidence).toBeGreaterThanOrEqual(0)
      expect(answer!.confidence).toBeLessThanOrEqual(1)
      expect(answer!.sentences.length).toBeGreaterThan(0)
    }
  })

  it("답변의 인용 청크는 그 질의의 히트 안에 있다", () => {
    for (const query of QUERIES) {
      const hitIds = new Set(query.hits.map((h) => h.chunkId))
      for (const sentence of getAnswer(query.id)!.sentences) {
        for (const chunkId of sentence.citationChunkIds) {
          expect(hitIds, `${query.id}: ${chunkId} 가 히트에 없음`).toContain(chunkId)
        }
      }
    }
  })
})
