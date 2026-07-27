/**
 * 지식관리 콘솔 · 로그 데모 데이터 — 순수 데이터 모듈. 날짜별로 그룹핑된 작업
 * 세션 10건. 타임라인(날짜 구분선 + 시각·요약·태그) 렌더에 쓴다. 전부 가상
 * 콘텐츠(실프로젝트·개인정보 미포함). 실제 연동 시 이 파일을 교체한다.
 */

/** 세션 종류 — 아이콘·색 구분에 쓴다. */
export type SessionKind = "문서" | "리뷰" | "정리" | "실험"

/** 작업 세션 한 건. */
export interface LogSession {
  id: string
  /** 그룹 키(YYYY-MM-DD). */
  date: string
  /** 시각(HH:MM, 24시간). */
  time: string
  /** 세션 제목. */
  title: string
  /** 한 문장 요약. */
  summary: string
  /** 세션 종류. */
  kind: SessionKind
  /** 태그 목록. */
  tags: string[]
}

/**
 * 세션 원본(시간 역순 아님 — 그룹핑 함수가 정렬한다). 날짜별로 묶어 최신
 * 날짜가 위로 오도록 타임라인에 표시한다.
 */
export const LOG_SESSIONS: LogSession[] = [
  {
    id: "s1",
    date: "2026-07-14",
    time: "16:20",
    title: "문서 작성 규칙 개정",
    summary: "헤딩 계층을 2단계로 제한하는 문장을 추가하고 예시를 다듬었다.",
    kind: "문서",
    tags: ["규칙", "개정"],
  },
  {
    id: "s2",
    date: "2026-07-14",
    time: "11:05",
    title: "검색 개선 카드 리뷰",
    summary: "리서치 칼럼의 검색 개선 아이디어를 검토중으로 옮기고 의견을 남겼다.",
    kind: "리뷰",
    tags: ["보드", "검색"],
  },
  {
    id: "s3",
    date: "2026-07-13",
    time: "15:42",
    title: "목차 강조 실험 착수",
    summary: "스크롤 위치에 따른 목차 강조 방식을 작은 범위에서 시험하기 시작했다.",
    kind: "실험",
    tags: ["TOC", "실험"],
  },
  {
    id: "s4",
    date: "2026-07-13",
    time: "09:30",
    title: "온보딩 흐름 점검",
    summary: "새 사용자 시작 문서의 다음 단계 안내 순서를 재정렬했다.",
    kind: "문서",
    tags: ["온보딩"],
  },
  {
    id: "s5",
    date: "2026-07-11",
    time: "14:18",
    title: "태그 중복 정리",
    summary: "의미가 겹치던 태그 몇 개를 대표 태그로 합치고 문서를 다시 걸었다.",
    kind: "정리",
    tags: ["태그", "품질"],
  },
  {
    id: "s6",
    date: "2026-07-11",
    time: "10:02",
    title: "리뷰 절차 초안 검토",
    summary: "승인 기준 세 항목이 실제 문서에 적용되는지 사례로 확인했다.",
    kind: "리뷰",
    tags: ["절차", "리뷰"],
  },
  {
    id: "s7",
    date: "2026-07-09",
    time: "17:11",
    title: "빠른 미리보기 스케치",
    summary: "트리에서 문서를 열지 않고 요약을 보여 주는 방식을 러프하게 그려 봤다.",
    kind: "실험",
    tags: ["프리뷰"],
  },
  {
    id: "s8",
    date: "2026-07-09",
    time: "13:47",
    title: "용어 사전 보강",
    summary: "상태 값 설명에 초안·검토중·정식의 차이를 추가했다.",
    kind: "문서",
    tags: ["용어"],
  },
  {
    id: "s9",
    date: "2026-07-05",
    time: "16:55",
    title: "구버전 문서 보관",
    summary: "더 이상 쓰지 않는 편집기 관련 문서를 아카이브 칼럼으로 옮겼다.",
    kind: "정리",
    tags: ["정리", "레거시"],
  },
  {
    id: "s10",
    date: "2026-07-05",
    time: "09:12",
    title: "중복 가이드 통합",
    summary: "겹치던 두 가이드를 하나로 합치고 링크를 새 문서로 갱신했다.",
    kind: "정리",
    tags: ["통합", "문서"],
  },
]

/** 날짜 그룹(최신 날짜 우선). */
export interface LogGroup {
  date: string
  sessions: LogSession[]
}

/** 세션을 날짜별로 묶어 최신 날짜·최신 시각이 먼저 오도록 정렬한다. */
export function groupLogsByDate(sessions: LogSession[]): LogGroup[] {
  const byDate = new Map<string, LogSession[]>()
  for (const session of sessions) {
    const bucket = byDate.get(session.date) ?? []
    bucket.push(session)
    byDate.set(session.date, bucket)
  }
  return [...byDate.entries()]
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([date, group]) => ({
      date,
      sessions: [...group].sort((a, b) => (a.time < b.time ? 1 : -1)),
    }))
}
