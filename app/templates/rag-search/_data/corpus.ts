/**
 * RAG 검색 콘솔 템플릿의 코퍼스 목데이터 — 문서와 청크의 진실원천.
 * queries · answers · pipeline 모듈은 여기의 id 를 참조만 하고 재정의하지 않는다.
 */

export interface RagDocument {
  id: string
  title: string
  /** 원본 파일명. */
  source: string
  /** 패싯 필터 대상. */
  category: string
  updatedAt: string
  chunkIds: string[]
}

export interface RagChunk {
  id: string
  docId: string
  /** 문서 내 청크 순번(1-base). */
  ordinal: number
  text: string
  tokens: number
}

export const DOCUMENTS: RagDocument[] = [
  {
    id: "doc-001",
    title: "여신 심사 내규",
    source: "여신심사내규_v12.pdf",
    category: "여신",
    updatedAt: "2026-07-14",
    chunkIds: ["doc-001#c1", "doc-001#c2", "doc-001#c3"],
  },
  {
    id: "doc-002",
    title: "연체 채권 관리 지침",
    source: "연체채권관리지침.hwp",
    category: "여신",
    updatedAt: "2026-06-30",
    chunkIds: ["doc-002#c1", "doc-002#c2"],
  },
  {
    id: "doc-003",
    title: "개인신용평가 모형 설명서",
    source: "CSS_모형설명서_2026.docx",
    category: "리스크",
    updatedAt: "2026-05-21",
    chunkIds: ["doc-003#c1", "doc-003#c2"],
  },
  {
    id: "doc-004",
    title: "내부통제 점검 매뉴얼",
    source: "내부통제_점검매뉴얼.pdf",
    category: "감사",
    updatedAt: "2026-04-02",
    chunkIds: ["doc-004#c1"],
  },
]

export const CHUNKS: RagChunk[] = [
  {
    id: "doc-001#c1",
    docId: "doc-001",
    ordinal: 1,
    text: "본 내규는 여신 취급의 심사 기준과 절차를 정한다. 심사역은 차주의 상환능력, 담보가치, 신용등급을 종합해 판단한다.",
    tokens: 62,
  },
  {
    id: "doc-001#c2",
    docId: "doc-001",
    ordinal: 2,
    text: "연체 산출 기준은 약정 상환일 다음 영업일부터 기산한다. 원리금 중 일부라도 미납이면 해당 여신 전액을 연체로 본다.",
    tokens: 58,
  },
  {
    id: "doc-001#c3",
    docId: "doc-001",
    ordinal: 3,
    text: "연체일수가 90일을 초과하면 고정이하 여신으로 분류하고, 담보평가액을 재산정한다.",
    tokens: 44,
  },
  {
    id: "doc-002#c1",
    docId: "doc-002",
    ordinal: 1,
    text: "연체 발생 시 5영업일 이내에 1차 안내를 발송한다. 안내에는 연체 산출 기준과 미납 원리금을 명시한다.",
    tokens: 51,
  },
  {
    id: "doc-002#c2",
    docId: "doc-002",
    ordinal: 2,
    text: "연체 30일 경과 시 채권관리부로 이관하며, 이관 시점의 연체일수와 잔액을 기록한다.",
    tokens: 47,
  },
  {
    id: "doc-003#c1",
    docId: "doc-003",
    ordinal: 1,
    text: "개인신용평가 모형은 상환이력, 부채수준, 신용거래기간을 주요 변수로 사용한다.",
    tokens: 43,
  },
  {
    id: "doc-003#c2",
    docId: "doc-003",
    ordinal: 2,
    text: "연체 이력은 최근 24개월 관측치를 가중해 반영하며, 90일 초과 연체는 별도 플래그로 관리한다.",
    tokens: 49,
  },
  {
    id: "doc-004#c1",
    docId: "doc-004",
    ordinal: 1,
    text: "점검자는 여신 취급 표본을 추출해 내규 준수 여부를 확인하고 예외 사항을 기록한다.",
    tokens: 45,
  },
]

const CHUNK_BY_ID = new Map(CHUNKS.map((c) => [c.id, c]))
const DOC_BY_ID = new Map(DOCUMENTS.map((d) => [d.id, d]))

export function getChunk(id: string): RagChunk | undefined {
  return CHUNK_BY_ID.get(id)
}

export function getDocument(id: string): RagDocument | undefined {
  return DOC_BY_ID.get(id)
}
