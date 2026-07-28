/**
 * 질의별 생성 답변 목데이터. 문장 단위로 근거 청크를 매달아 인용을 표현한다.
 * citationChunkIds 는 같은 질의의 히트 안에 있는 청크만 가리킨다.
 */

export interface AnswerSentence {
  id: string
  text: string
  /** 이 문장의 근거 청크. 빈 배열이면 근거 없는 문장(무근거 표시 대상). */
  citationChunkIds: string[]
}

export interface RagAnswer {
  queryId: string
  sentences: AnswerSentence[]
  /** 0..1. */
  confidence: number
  /** 신뢰도 판단 근거 한 줄. */
  confidenceNote: string
}

export const ANSWERS: RagAnswer[] = [
  {
    queryId: "q-1",
    sentences: [
      {
        id: "q1-s1",
        text: "연체는 약정 상환일의 다음 영업일부터 기산합니다.",
        citationChunkIds: ["doc-001#c2"],
      },
      {
        id: "q1-s2",
        text: "원리금 중 일부만 미납이어도 해당 여신 전액을 연체로 봅니다.",
        citationChunkIds: ["doc-001#c2"],
      },
      {
        id: "q1-s3",
        text: "연체 발생 후 5영업일 이내에 1차 안내가 발송되며, 안내문에 산출 기준이 명시됩니다.",
        citationChunkIds: ["doc-002#c1"],
      },
      {
        id: "q1-s4",
        text: "연체일수가 90일을 넘으면 고정이하 여신으로 분류됩니다.",
        citationChunkIds: ["doc-001#c3", "doc-003#c2"],
      },
    ],
    confidence: 0.88,
    confidenceNote: "근거 청크 4건이 서로 모순 없이 같은 기준을 가리킵니다.",
  },
  {
    queryId: "q-2",
    sentences: [
      {
        id: "q2-s1",
        text: "개인신용평가 모형은 상환이력·부채수준·신용거래기간을 주요 변수로 사용합니다.",
        citationChunkIds: ["doc-003#c1"],
      },
      {
        id: "q2-s2",
        text: "연체 이력은 최근 24개월 관측치를 가중해 반영합니다.",
        citationChunkIds: ["doc-003#c2"],
      },
      {
        id: "q2-s3",
        text: "여신 심사에서는 이 신용등급을 상환능력·담보가치와 함께 종합 판단합니다.",
        citationChunkIds: ["doc-001#c1"],
      },
    ],
    confidence: 0.72,
    confidenceNote: "주요 변수는 근거가 명확하나 가중 방식의 세부 수치는 문서에 없습니다.",
  },
]

const ANSWER_BY_QUERY = new Map(ANSWERS.map((a) => [a.queryId, a]))

export function getAnswer(queryId: string): RagAnswer | undefined {
  return ANSWER_BY_QUERY.get(queryId)
}
