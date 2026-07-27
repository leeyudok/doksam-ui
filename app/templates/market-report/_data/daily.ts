import type { Icon } from "@phosphor-icons/react"
import {
  BankIcon,
  BusIcon,
  CpuIcon,
  CurrencyCircleDollarIcon,
  LightbulbIcon,
  RobotIcon,
  ScalesIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr"

/**
 * 데일리 마켓 리포트(#51) 가상 데이터.
 * 수치·종목명은 전부 가상으로 합성한 데모 데이터이며 실제 시장과 무관하다.
 * 원본 스탠드얼론 HTML(market_report_0701.html)의 구조만 참고했다.
 */

/** 상단 티커 스트립 한 칸 — 지수·환율·원자재. */
export interface TickerItem {
  id: string
  /** 지표명. */
  name: string
  /** 현재값 표기 문자열(단위 포함). */
  value: string
  /** 등락률(%). 부호로 gain/loss 색이 갈린다. */
  changePercent: number
}

export const TICKERS: TickerItem[] = [
  { id: "hanbit", name: "한빛종합지수", value: "3,102.44", changePercent: 0.72 },
  { id: "cosvalue", name: "코스밸류", value: "964.18", changePercent: 1.05 },
  { id: "usdkrw", name: "원/달러", value: "1,438.20", changePercent: -0.34 },
  { id: "jpykrw", name: "원/엔(100)", value: "936.50", changePercent: 0.21 },
  { id: "semi-idx", name: "반도체지수", value: "5,120.6", changePercent: 1.67 },
  { id: "brent", name: "브렌트유", value: "$82.40", changePercent: 1.8 },
  { id: "gold", name: "국제금", value: "$2,412.6", changePercent: -0.45 },
  { id: "copper", name: "구리", value: "$4.28", changePercent: 0.92 },
  { id: "silver", name: "은", value: "$30.15", changePercent: 1.12 },
  { id: "natgas", name: "천연가스", value: "$2.86", changePercent: -1.44 },
  { id: "ust10y", name: "미10년물", value: "4.18%", changePercent: -0.06 },
  { id: "nq-fut", name: "나스닥선물", value: "18,240", changePercent: 0.55 },
  { id: "vix", name: "변동성지수", value: "14.2", changePercent: -3.1 },
  { id: "btc", name: "비트코인", value: "₩92.4M", changePercent: 2.34 },
]

/** 오늘의 이벤트 피드 한 건 — 출처 태그 + 요약. */
export interface FeedEvent {
  id: string
  /** 가상 출처 태그(연합인포·DART·외신 등). */
  source: string
  /** 이벤트 요약. */
  text: string
  /** 강조 키워드(볼드 처리). 본문에 포함된 부분 문자열이어야 한다. */
  emphasis?: string
}

export const EVENT_FEED: FeedEvent[] = [
  {
    id: "e01",
    source: "연합인포",
    text: "가온반도체, 광역 팹 클러스터 착공 — 전력·용수 인프라 국비 우선 배정 확정",
    emphasis: "국비 우선 배정",
  },
  {
    id: "e02",
    source: "DART",
    text: "누리로보틱스, CEO 직속 피지컬AI 사업부 신설 정관 변경 안건 상정",
    emphasis: "피지컬AI 사업부 신설",
  },
  {
    id: "e03",
    source: "외신",
    text: "역외 헤지펀드, 세중바이오 지분 5.2% 신규 취득 — 대량보유 보고서 제출",
    emphasis: "지분 5.2% 신규 취득",
  },
  {
    id: "e04",
    source: "한경속보",
    text: "대성중공업, 초대형 컨테이너선 12척 수주 — 연간 수주잔고 최대치 경신",
    emphasis: "12척 수주",
  },
  {
    id: "e05",
    source: "인포뱅크",
    text: "미래모빌리티, 경쟁국 보조금 축소 반사이익 기대감에 외국인 순매수 유입",
    emphasis: "외국인 순매수",
  },
  {
    id: "e06",
    source: "연합인포",
    text: "한빛에너지, 노후 원전 수명 연장 예비타당성 통과 — 데이터센터 전력 공급 확대",
    emphasis: "수명 연장 예비타당성 통과",
  },
  {
    id: "e07",
    source: "마켓워치",
    text: "글로벌 메모리 현물가 2주 연속 반등 — 하반기 슈퍼사이클 진입 관측 재부각",
    emphasis: "2주 연속 반등",
  },
  {
    id: "e08",
    source: "DART",
    text: "제일디스플레이, 3,200억 규모 유상증자 결정 — 차세대 패널 라인 증설 재원",
    emphasis: "3,200억 규모 유상증자",
  },
  {
    id: "e09",
    source: "외신",
    text: "국부펀드 리밸런싱 개시일 임박 — 대형주 중심 최대 40조 물량 부담 경계감",
    emphasis: "최대 40조 물량",
  },
  {
    id: "e10",
    source: "한경속보",
    text: "가온반도체·세중전기, 해외 소비자 담합 집단소송 피소 — 법적 불확실성 부각",
    emphasis: "집단소송 피소",
  },
  {
    id: "e11",
    source: "인포뱅크",
    text: "새한항공, 방산 자회사 민영화 인수전 참여 검토 — 신테마 후보로 부상",
    emphasis: "민영화 인수전",
  },
  {
    id: "e12",
    source: "연합인포",
    text: "동방금융지주, 상반기 순이익 컨센서스 상회 전망 — 자사주 매입 확대 시사",
    emphasis: "컨센서스 상회",
  },
  {
    id: "e13",
    source: "마켓워치",
    text: "원/달러 장중 고점 이탈 — 수출주 환율 수혜 vs 수입 원가 부담 엇갈림",
    emphasis: "장중 고점 이탈",
  },
  {
    id: "e14",
    source: "DART",
    text: "누리로보틱스, 타법인 지분 취득 결정 — 로봇 센서 소부장 수직계열화",
    emphasis: "타법인 지분 취득",
  },
  {
    id: "e15",
    source: "외신",
    text: "경쟁국 메모리 업체, 대형 클라우드에 4조 규모 공급 — 추격 구도 가시화",
    emphasis: "4조 규모 공급",
  },
  {
    id: "e16",
    source: "한경속보",
    text: "세중바이오, 글로벌 제약사와 위탁생산 파트너십 체결 — 수주 파이프라인 확대",
    emphasis: "파트너십 체결",
  },
]

/** 리스크·기회 매트릭스 카드 한 장. */
export interface MatrixCard {
  id: string
  icon: Icon
  title: string
  desc: string
  /** 카드 태그 라벨. */
  tag: string
  /** 카드 성격 — 색/강조를 가른다. */
  tone: "risk" | "oppo" | "warn" | "info"
}

export const MATRIX_CARDS: MatrixCard[] = [
  {
    id: "m1",
    icon: BankIcon,
    title: "국부펀드 리밸런싱",
    desc: "개시일 임박. 대형주 중심 최대 40조 물량이 잠재적 매도 압력으로 작용.",
    tag: "HIGH RISK",
    tone: "risk",
  },
  {
    id: "m2",
    icon: LightbulbIcon,
    title: "반도체 저가매수",
    desc: "외국인 가온반도체 재매수 신호. 현물가 2주 반등으로 저가매수 유입.",
    tag: "OPPORTUNITY",
    tone: "oppo",
  },
  {
    id: "m3",
    icon: ScalesIcon,
    title: "메모리 담합 소송",
    desc: "해외 소비자 집단소송 피소. 법적 불확실성이 밸류에이션에 부담.",
    tag: "RISK",
    tone: "risk",
  },
  {
    id: "m4",
    icon: BusIcon,
    title: "경쟁국 보조금 축소",
    desc: "오늘부터 발효. 미래모빌리티 등 국산 완성차 반사이익 단기 기대.",
    tag: "CATALYST",
    tone: "oppo",
  },
  {
    id: "m5",
    icon: CurrencyCircleDollarIcon,
    title: "환율 변동성 확대",
    desc: "원/달러 장중 고점 이탈. 수출주 수혜와 수입 원가 부담이 엇갈림.",
    tag: "MONITOR",
    tone: "warn",
  },
  {
    id: "m6",
    icon: RobotIcon,
    title: "피지컬AI 조직 격상",
    desc: "누리로보틱스 CEO 직속 사업부 신설. 로봇 경쟁 본격화 신호.",
    tag: "UPSIDE",
    tone: "oppo",
  },
  {
    id: "m7",
    icon: CpuIcon,
    title: "경쟁국 메모리 공세",
    desc: "대형 클라우드에 4조 규모 공급. 후발 업체 추격 구도 가시화.",
    tag: "WATCH",
    tone: "warn",
  },
  {
    id: "m8",
    icon: ShieldCheckIcon,
    title: "방산 민영화 이슈",
    desc: "새한항공 등 인수전 참여 검토. 방산 신테마로 오늘 첫 부각.",
    tag: "NEW THEME",
    tone: "info",
  },
]

/** 워치리스트 한 종목(가상). */
export interface WatchItem {
  rank: number
  name: string
  /** 주목 사유. */
  theme: string
  /** 시그널 라벨. */
  signal: string
  /** 시그널 성격. */
  tone: "buy" | "watch" | "alert" | "check"
}

export const WATCHLIST: WatchItem[] = [
  { rank: 1, name: "가온반도체", theme: "팹 클러스터 착공 직수혜 · 외국인 재매수", signal: "매수관심", tone: "buy" },
  { rank: 2, name: "세중전기", theme: "빅테크 부품 대형 계약 · 소부장 순환매", signal: "매수관심", tone: "buy" },
  { rank: 3, name: "누리로보틱스", theme: "CEO 직속 피지컬AI 사업부 신설", signal: "매수관심", tone: "buy" },
  { rank: 4, name: "한빛에너지", theme: "원전 수명 연장 · 데이터센터 전력 병목", signal: "눌림확인", tone: "watch" },
  { rank: 5, name: "새한항공", theme: "방산 민영화 인수전 · 신테마 선점", signal: "이슈확인", tone: "watch" },
  { rank: 6, name: "미래모빌리티", theme: "경쟁국 보조금 축소 반사이익 · 단기반등", signal: "단기반등", tone: "check" },
  { rank: 7, name: "제일디스플레이", theme: "대규모 유상증자 · 단기 희석 압력", signal: "리스크주의", tone: "alert" },
]

/** 발행 메타. */
export const DAILY_META = {
  eyebrow: "Market Intelligence",
  publishedAt: "2026.07.16 THU",
  analyzedNote: "가상 뉴스 172건 분석",
}
