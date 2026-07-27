/**
 * 주간 마켓 리포트(#51) 가상 데이터.
 * 수치·종목명은 전부 가상으로 합성한 데모 데이터이며 실제 시장과 무관하다.
 * 원본 스탠드얼론 HTML(weekly_market_report.html)의 구조만 참고했다.
 */

/** 주간 핵심 테마 랭킹 한 건. */
export interface ThemeRank {
  rank: number
  name: string
  /** 부제 — 테마 한 줄 요약. */
  sub: string
  /** 주간 등락률(%). 부호로 gain/loss 색이 갈린다. */
  changePercent: number
  /** 강도(0~5). 채워진 도트 개수. */
  strength: number
  /** 관련 종목 태그(가상). */
  tags: string[]
}

export const THEME_RANKING: ThemeRank[] = [
  {
    rank: 1,
    name: "반도체 메가클러스터",
    sub: "팹 착공 · 5일 연속 주도 테마",
    changePercent: 6.4,
    strength: 5,
    tags: ["가온반도체", "세중전기", "제일디스플레이", "소부장"],
  },
  {
    rank: 2,
    name: "K바이오 위탁생산",
    sub: "글로벌 제약사 파트너십 릴레이",
    changePercent: 4.8,
    strength: 4,
    tags: ["세중바이오", "한올제약", "에이스바이오"],
  },
  {
    rank: 3,
    name: "피지컬AI · 로봇",
    sub: "CEO 직속 조직 격상 · 정책 실체화",
    changePercent: 3.2,
    strength: 4,
    tags: ["누리로보틱스", "미래모빌리티", "동방텔레콤"],
  },
  {
    rank: 4,
    name: "전력 인프라 · 원전",
    sub: "데이터센터 전력 병목 · 수명 연장",
    changePercent: 2.1,
    strength: 3,
    tags: ["한빛에너지", "대성중공업", "우진전력"],
  },
  {
    rank: 5,
    name: "금융지주 실적",
    sub: "상반기 순익 서프라이즈 · 자사주",
    changePercent: 1.4,
    strength: 3,
    tags: ["동방금융지주", "새한금융", "제일캐피탈"],
  },
  {
    rank: 6,
    name: "방산 민영화",
    sub: "인수전 참여 검토 · 신테마 부상",
    changePercent: 0.9,
    strength: 2,
    tags: ["새한항공", "가온디펜스"],
  },
  {
    rank: 7,
    name: "완성차 · 모빌리티",
    sub: "경쟁국 보조금 축소 반사이익",
    changePercent: -0.6,
    strength: 2,
    tags: ["미래모빌리티", "한빛오토"],
  },
  {
    rank: 8,
    name: "메모리 후발 추격",
    sub: "경쟁국 대형 공급 계약 · 경계감",
    changePercent: -2.3,
    strength: 1,
    tags: ["가온반도체", "세중전기"],
  },
]

/** 주간 흐름 타임라인 한 칸. */
export interface TimelineDay {
  /** 날짜 라벨(예: 7/10). */
  date: string
  /** 요일. */
  day: string
  /** 분위기 라벨. */
  mood: string
  /** 분위기 성격 — 색을 가른다. */
  tone: "up" | "down" | "flat"
  text: string
}

export const WEEK_TIMELINE: TimelineDay[] = [
  {
    date: "7/10",
    day: "월",
    mood: "충격",
    tone: "down",
    text: "지정학 리스크 재부각 + 외국인 수급 이탈로 종합지수 살얼음판 출발.",
  },
  {
    date: "7/11",
    day: "화",
    mood: "반등",
    tone: "up",
    text: "K바이오 파트너십 소식에 바이오 테마 급부상. 기술주 동반 강세 마감.",
  },
  {
    date: "7/12",
    day: "수",
    mood: "관망",
    tone: "flat",
    text: "AI 인프라 밸류에이션 우려 확산. 변동성 확대 국면 지속.",
  },
  {
    date: "7/14",
    day: "목",
    mood: "호재 발생",
    tone: "up",
    text: "팹 클러스터 착공 시그널 + 유상증자 공시로 반도체 소부장 순환매 점화.",
  },
  {
    date: "7/15",
    day: "금",
    mood: "급락",
    tone: "down",
    text: "메모리 담합 소송 피소 + 국부펀드 매도 경계로 대형주 5% 동반 조정.",
  },
  {
    date: "7/16",
    day: "토",
    mood: "혼조",
    tone: "flat",
    text: "착공 확정 재료 vs 외국인 대량 매도 쇼크 상충. 나스닥 반등으로 기대감.",
  },
]

/** 이벤트 캘린더 — 요일별 일정. */
export interface CalendarDay {
  date: string
  day: string
  events: string[]
}

export const EVENT_CALENDAR: CalendarDay[] = [
  { date: "7/13", day: "월", events: ["국부펀드 리밸런싱 개시", "6월 고용지표 발표"] },
  { date: "7/14", day: "화", events: ["동방금융지주 실적", "반도체 현물가 주간 집계"] },
  { date: "7/15", day: "수", events: ["금리 결정 회의", "누리로보틱스 신제품 공개"] },
  { date: "7/16", day: "목", events: ["옵션 만기일", "세중바이오 임상 중간결과"] },
  { date: "7/17", day: "금", events: ["대성중공업 수주 컨퍼런스콜", "주간 외국인 수급 마감"] },
]

/** DART류 공시 한 건(가상). */
export interface Disclosure {
  company: string
  /** 공시 내용 요약. */
  desc: string
  /** 공시일 라벨. */
  date: string
  /** 성격 — 도트 색을 가른다. */
  tone: "neutral" | "up" | "down" | "info"
}

export const DISCLOSURES: Disclosure[] = [
  { company: "제일디스플레이", desc: "유상증자 결정 — 차세대 패널 라인 증설 재원 3,200억", date: "07.14", tone: "down" },
  { company: "누리로보틱스", desc: "타법인 주식 취득 결정 — 로봇 센서 소부장 지분 확보", date: "07.14", tone: "info" },
  { company: "세중바이오", desc: "위탁생산 공급계약 체결 — 글로벌 제약사와 5년 장기", date: "07.13", tone: "up" },
  { company: "동방금융지주", desc: "자기주식 취득 신탁계약 체결 — 주주환원 확대", date: "07.15", tone: "up" },
  { company: "가온반도체", desc: "최대주주 주식 변동 신고 — 지배구조 변화 주목", date: "07.11", tone: "neutral" },
  { company: "대성중공업", desc: "단일판매·공급계약 — 컨테이너선 12척 수주 확정", date: "07.15", tone: "up" },
  { company: "새한항공", desc: "타법인 인수 관련 조회공시 답변 — 검토 중 사실 확인", date: "07.12", tone: "info" },
  { company: "한빛에너지", desc: "채무증권 발행 결정 — 원전 설비 투자 자금 조달", date: "07.13", tone: "neutral" },
  { company: "세중전기", desc: "소송 등의 제기 — 해외 소비자 집단소송 피소 사실", date: "07.15", tone: "down" },
]

/** 발행 메타. */
export const WEEKLY_META = {
  eyebrow: "Weekly Market Report",
  period: "2026.07.10 ~ 07.16",
  analyzedNote: "가상 뉴스 약 12,000건 · 공시 포함",
}
