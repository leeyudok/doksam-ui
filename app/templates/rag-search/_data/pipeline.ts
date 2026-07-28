/**
 * 색인 파이프라인 목데이터. 단계 타입은 stage-progress-board, 실패 로그 타입은
 * log-viewer 가 진실원천이라 여기서 재선언하지 않는다.
 * 실패 로그의 문서 특정은 message 문자열 안에 문서 id 를 적어 표현한다.
 */
import type { LogEntry } from "@/components/log-viewer"
import type { Stage } from "@/components/stage-progress-board"

import { CHUNKS, DOCUMENTS } from "./corpus"

export interface IndexStat {
  label: string
  value: number | string
  unit?: string
}

export const INDEX_STAGES: Stage[] = [
  {
    key: "collect",
    label: "수집",
    status: "done",
    progress: 100,
    tasks: [
      { label: "원본 저장소 스캔", done: true },
      { label: "변경분 추출", done: true },
    ],
  },
  {
    key: "convert",
    label: "변환",
    status: "done",
    progress: 100,
    tasks: [
      { label: "PDF·HWP 텍스트 추출", done: true },
      { label: "표·머리글 정규화", done: true },
    ],
  },
  {
    key: "chunk",
    label: "청킹",
    status: "done",
    progress: 100,
    tasks: [
      { label: "문단 경계 분할", done: true },
      { label: "토큰 상한 적용", done: true },
    ],
  },
  {
    key: "embed",
    label: "임베딩",
    status: "active",
    progress: 62,
    tasks: [
      { label: "배치 큐 적재", done: true },
      { label: "벡터 생성", done: false },
    ],
  },
  {
    key: "index",
    label: "색인",
    status: "pending",
    progress: 0,
    tasks: [
      { label: "벌크 색인", done: false },
      { label: "별칭 전환", done: false },
    ],
  },
]

export const INDEX_STATS: IndexStat[] = [
  { label: "색인 문서", value: DOCUMENTS.length, unit: "건" },
  { label: "색인 청크", value: CHUNKS.length, unit: "건" },
  { label: "샤드", value: "3 primary · 1 replica" },
  { label: "색인 지연", value: 1.4, unit: "초" },
]

export const INDEX_FAILURES: LogEntry[] = [
  {
    id: "f-1",
    time: "03:12:41.220",
    level: "error",
    group: 0,
    message: "doc-004 임베딩 실패 — 배치 타임아웃(30초) 초과",
  },
  {
    id: "f-2",
    time: "03:12:41.802",
    level: "warn",
    group: 1,
    message: "doc-004 재시도 큐 등록 attempt=1",
  },
  {
    id: "f-3",
    time: "03:14:07.145",
    level: "warn",
    group: 0,
    message: "doc-002 청크 2건이 토큰 상한을 초과해 재분할됨",
    count: 2,
  },
  {
    id: "f-4",
    time: "03:15:52.008",
    level: "error",
    group: 0,
    message: "doc-003 표 구조 파싱 실패 — 셀 병합 처리 불가",
  },
]
