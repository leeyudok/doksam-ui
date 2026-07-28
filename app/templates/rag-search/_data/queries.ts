/**
 * 질의별 검색 결과 목데이터. chunkId 는 corpus.ts 의 청크를 참조한다.
 * 점수는 0..1 로 정규화한 값이고, rerank 전후 순위로 재정렬 효과를 보여준다.
 */

export interface ScoreBreakdown {
  bm25: number
  vector: number
  rerank: number
  /** rerank 적용 전 순위(1-base). */
  rankBefore: number
  /** rerank 적용 후 순위(1-base). */
  rankAfter: number
}

export interface SearchHit {
  chunkId: string
  /** 최종 스코어 0..1. */
  score: number
  breakdown: ScoreBreakdown
  /** 청크 본문에서 강조할 부분 문자열. 반드시 본문에 존재해야 한다. */
  highlights: string[]
}

export interface Facet {
  key: string
  label: string
  values: { value: string; label: string; count: number }[]
}

export interface RagQuery {
  id: string
  text: string
  /** OpenSearch 쿼리 DSL — code-block 에 그대로 표시한다. */
  dsl: string
  hits: SearchHit[]
  facets: Facet[]
}

const HYBRID_DSL = `{
  "query": {
    "hybrid": {
      "queries": [
        { "match": { "text": "연체 산출 기준" } },
        { "knn": { "embedding": { "vector": "<query_vector>", "k": 20 } } }
      ]
    }
  },
  "size": 5
}`

const CSS_DSL = `{
  "query": {
    "hybrid": {
      "queries": [
        { "match": { "text": "신용평가 변수" } },
        { "knn": { "embedding": { "vector": "<query_vector>", "k": 20 } } }
      ]
    }
  },
  "size": 5
}`

export const QUERIES: RagQuery[] = [
  {
    id: "q-1",
    text: "연체는 언제부터 산출하나?",
    dsl: HYBRID_DSL,
    hits: [
      {
        chunkId: "doc-001#c2",
        score: 0.94,
        breakdown: { bm25: 0.72, vector: 0.88, rerank: 0.94, rankBefore: 2, rankAfter: 1 },
        highlights: ["연체 산출 기준", "약정 상환일 다음 영업일"],
      },
      {
        chunkId: "doc-002#c1",
        score: 0.81,
        breakdown: { bm25: 0.79, vector: 0.64, rerank: 0.81, rankBefore: 1, rankAfter: 2 },
        highlights: ["연체 산출 기준"],
      },
      {
        chunkId: "doc-001#c3",
        score: 0.67,
        breakdown: { bm25: 0.41, vector: 0.73, rerank: 0.67, rankBefore: 4, rankAfter: 3 },
        highlights: ["연체일수가 90일을 초과"],
      },
      {
        chunkId: "doc-003#c2",
        score: 0.52,
        breakdown: { bm25: 0.33, vector: 0.61, rerank: 0.52, rankBefore: 3, rankAfter: 4 },
        highlights: ["90일 초과 연체"],
      },
      {
        chunkId: "doc-002#c2",
        score: 0.38,
        breakdown: { bm25: 0.29, vector: 0.44, rerank: 0.38, rankBefore: 5, rankAfter: 5 },
        highlights: ["연체 30일 경과"],
      },
    ],
    facets: [
      {
        key: "category",
        label: "분류",
        values: [
          { value: "여신", label: "여신", count: 4 },
          { value: "리스크", label: "리스크", count: 1 },
          // 히트가 0건인 버킷 — OpenSearch 는 필터 대상 버킷을 0 으로도 돌려준다.
          // 이 값을 고르면 결과가 비어 EmptyState 가 드러난다.
          { value: "감사", label: "감사", count: 0 },
        ],
      },
    ],
  },
  {
    id: "q-2",
    text: "신용평가 모형이 쓰는 변수는?",
    dsl: CSS_DSL,
    hits: [
      {
        chunkId: "doc-003#c1",
        score: 0.91,
        breakdown: { bm25: 0.68, vector: 0.9, rerank: 0.91, rankBefore: 1, rankAfter: 1 },
        highlights: ["상환이력, 부채수준, 신용거래기간"],
      },
      {
        chunkId: "doc-003#c2",
        score: 0.74,
        breakdown: { bm25: 0.45, vector: 0.79, rerank: 0.74, rankBefore: 3, rankAfter: 2 },
        highlights: ["최근 24개월 관측치"],
      },
      {
        chunkId: "doc-001#c1",
        score: 0.49,
        breakdown: { bm25: 0.52, vector: 0.4, rerank: 0.49, rankBefore: 2, rankAfter: 3 },
        highlights: ["신용등급"],
      },
    ],
    facets: [
      {
        key: "category",
        label: "분류",
        values: [
          { value: "리스크", label: "리스크", count: 2 },
          { value: "여신", label: "여신", count: 1 },
        ],
      },
    ],
  },
]
