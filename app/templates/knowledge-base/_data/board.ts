/**
 * 지식관리 콘솔 · 보드 데모 데이터 — 순수 데이터 모듈. 칸반풍 4칼럼에 배치할
 * 아이디어 카드 12건. 드래그 기능은 없고 카테고리 열로만 그룹핑한다. 전부
 * 가상 콘텐츠(실프로젝트·개인정보 미포함). 실제 연동 시 이 파일을 교체한다.
 */

/** 카드 진행 상태 배지. */
export type CardStatus = "신규" | "검토중" | "채택" | "보류"

/** 보드 카테고리 칼럼. */
export interface BoardColumn {
  id: string
  /** 칼럼 헤더 라벨. */
  label: string
  /** 상단 강조선 색 토큰 클래스(border-*). */
  accent: string
  /** 헤더 아이콘 이름(Phosphor). */
  icon: "MagnifyingGlassIcon" | "LightbulbIcon" | "FlaskIcon" | "ArchiveIcon"
}

/** 아이디어 카드. */
export interface BoardCard {
  id: string
  /** 소속 칼럼 id. */
  column: string
  /** 카드 제목. */
  title: string
  /** 한두 문장 요약. */
  summary: string
  /** 태그 목록. */
  tags: string[]
  /** 등록/갱신 일자(YYYY-MM-DD). */
  date: string
  /** 진행 상태. */
  status: CardStatus
}

export const BOARD_COLUMNS: BoardColumn[] = [
  { id: "research", label: "리서치", accent: "border-t-chart-1", icon: "MagnifyingGlassIcon" },
  { id: "idea", label: "아이디어", accent: "border-t-chart-2", icon: "LightbulbIcon" },
  { id: "experiment", label: "실험", accent: "border-t-chart-3", icon: "FlaskIcon" },
  { id: "archive", label: "아카이브", accent: "border-t-chart-4", icon: "ArchiveIcon" },
]

export const BOARD_CARDS: BoardCard[] = [
  {
    id: "c1",
    column: "research",
    title: "문서 검색 개선 조사",
    summary: "긴 문서에서 원하는 문단을 더 빨리 찾기 위한 검색 방식 후보를 정리한다.",
    tags: ["검색", "UX"],
    date: "2026-07-14",
    status: "검토중",
  },
  {
    id: "c2",
    column: "research",
    title: "온보딩 이탈 지점 분석",
    summary: "새 사용자가 어느 화면에서 멈추는지 흐름을 따라가며 병목을 찾는다.",
    tags: ["온보딩", "분석"],
    date: "2026-07-13",
    status: "신규",
  },
  {
    id: "c3",
    column: "research",
    title: "태그 남용 패턴 수집",
    summary: "비슷한 의미의 태그가 얼마나 중복되는지 사례를 모아 정리한다.",
    tags: ["태그", "품질"],
    date: "2026-07-11",
    status: "채택",
  },
  {
    id: "c4",
    column: "idea",
    title: "문서 즐겨찾기",
    summary: "자주 여는 문서를 상단에 고정해 두는 간단한 즐겨찾기 개념을 제안한다.",
    tags: ["기능", "생산성"],
    date: "2026-07-14",
    status: "신규",
  },
  {
    id: "c5",
    column: "idea",
    title: "카드 → 문서 승격 버튼",
    summary: "채택된 아이디어 카드를 한 번에 문서 초안으로 옮기는 흐름을 만든다.",
    tags: ["워크플로", "연결"],
    date: "2026-07-12",
    status: "검토중",
  },
  {
    id: "c6",
    column: "idea",
    title: "읽기 시간 표시",
    summary: "문서 상단에 예상 읽기 시간을 보여 독자가 분량을 가늠하게 한다.",
    tags: ["UX", "메타"],
    date: "2026-07-10",
    status: "채택",
  },
  {
    id: "c7",
    column: "experiment",
    title: "목차 자동 강조",
    summary: "스크롤 위치에 따라 현재 섹션을 목차에서 강조하는 방식을 시험한다.",
    tags: ["TOC", "인터랙션"],
    date: "2026-07-13",
    status: "검토중",
  },
  {
    id: "c8",
    column: "experiment",
    title: "빠른 미리보기",
    summary: "트리에서 문서를 열지 않고도 요약을 살짝 미리 보는 방식을 실험한다.",
    tags: ["프리뷰", "속도"],
    date: "2026-07-09",
    status: "신규",
  },
  {
    id: "c9",
    column: "experiment",
    title: "세션 로그 자동 요약",
    summary: "작업 기록을 짧은 요약으로 자동 정리하는 흐름을 소규모로 검증한다.",
    tags: ["로그", "요약"],
    date: "2026-07-08",
    status: "보류",
  },
  {
    id: "c10",
    column: "archive",
    title: "구버전 편집기 정리",
    summary: "더 이상 쓰지 않는 옛 편집 방식 관련 문서를 한데 모아 보관한다.",
    tags: ["정리", "레거시"],
    date: "2026-07-05",
    status: "보류",
  },
  {
    id: "c11",
    column: "archive",
    title: "중복 가이드 통합",
    summary: "내용이 겹치던 두 가이드를 하나로 합치고 나머지는 보관 처리했다.",
    tags: ["통합", "문서"],
    date: "2026-07-04",
    status: "채택",
  },
  {
    id: "c12",
    column: "archive",
    title: "초기 분류안 회고",
    summary: "처음 세웠던 분류 체계가 어떻게 바뀌었는지 기록으로 남긴다.",
    tags: ["회고", "분류"],
    date: "2026-07-02",
    status: "채택",
  },
]
