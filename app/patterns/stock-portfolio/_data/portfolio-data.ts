/**
 * stock-portfolio 패턴 데모 데이터 — 순수 데이터 모듈(컴포넌트 로직 없음).
 * dok3node 의 API/실시간 훅 의존을 제거하고 정적 픽스처로 대체했다. 가상 종목.
 */

import type { ModuleLabel } from "../_components/bit-grid"

/** 포트폴리오 카드 픽스처 — 실시간 훅 대신 스냅샷 값. */
export interface PortfolioStock {
  name: string
  code: string
  sector: string
  market: "KOSPI" | "KOSDAQ"
  isNxt: boolean
  price: number
  changeRate: number
  /** 실시간 매수비(%). null 이면 비표시. */
  buyRatio: number | null
  signal: { label: string; tone: "danger" | "warning" | "success"; pulse?: boolean } | null
  isTracking: boolean
  newsCount: number
  prices: number[]
  targetBuyPrice?: number
  takeProfitPrice?: number
  stopLossPrice?: number
  buyPrice: number
  buyQuantity: number
  returnRate: number
  returnAmount: number
}

/** 장중 가격 시계열 생성 — 결정론(사인 합성)으로 난수 없이 자연스러운 곡선을 만든다. */
function series(base: number, drift: number, n = 60): number[] {
  const out: number[] = []
  for (let i = 0; i < n; i++) {
    const wave = Math.sin(i / 5.5) * base * 0.012 + Math.sin(i / 2.3) * base * 0.005
    out.push(Math.round(base + (drift * base * i) / (n * 100) + wave))
  }
  return out
}

export const PORTFOLIO_STOCKS: PortfolioStock[] = [
  {
    name: "한빛반도체",
    code: "042700",
    sector: "반도체",
    market: "KOSPI",
    isNxt: true,
    price: 187_500,
    changeRate: 2.35,
    buyRatio: 68,
    signal: { label: "익절 임박", tone: "success", pulse: true },
    isTracking: true,
    newsCount: 4,
    prices: series(183_000, 2.4),
    targetBuyPrice: 168_000,
    takeProfitPrice: 192_000,
    stopLossPrice: 161_000,
    buyPrice: 166_800,
    buyQuantity: 12,
    returnRate: 12.4,
    returnAmount: 248_400,
  },
  {
    name: "두리조선",
    code: "010140",
    sector: "조선",
    market: "KOSPI",
    isNxt: false,
    price: 21_350,
    changeRate: -1.62,
    buyRatio: 42,
    signal: { label: "손절 주의", tone: "danger" },
    isTracking: false,
    newsCount: 0,
    prices: series(21_900, -2.5),
    targetBuyPrice: 21_000,
    stopLossPrice: 20_400,
    buyPrice: 22_050,
    buyQuantity: 80,
    returnRate: -3.2,
    returnAmount: -56_000,
  },
]

/** 추천 종목 카드 픽스처. */
export interface Recommendation {
  stockName: string
  market: "KOSPI" | "KOSDAQ"
  isNxt: boolean
  sectorName: string
  isPolicySector: boolean
  grade: "buy" | "watch"
  conviction: number
  currentPrice: number
  changeRate: number
  tradeAmountBil: number
  positionRatio: number
  investAmount: number
  newsCount: number
  youtubeCount: number
  reportCount: number
  oneLiner: string
}

export const RECOMMENDATIONS: Recommendation[] = [
  {
    stockName: "가온바이오",
    market: "KOSDAQ",
    isNxt: true,
    sectorName: "바이오",
    isPolicySector: false,
    grade: "buy",
    conviction: 72,
    currentPrice: 812_000,
    changeRate: 4.18,
    tradeAmountBil: 1_840,
    positionRatio: 0.15,
    investAmount: 1_500_000,
    newsCount: 6,
    youtubeCount: 2,
    reportCount: 3,
    oneLiner: "임상 3상 중간 결과 발표를 앞두고 기관 수급이 유입 중. 거래대금 상위권 유지가 관건.",
  },
  {
    stockName: "서진전력",
    market: "KOSPI",
    isNxt: false,
    sectorName: "전력설비",
    isPolicySector: true,
    grade: "watch",
    conviction: 48,
    currentPrice: 54_200,
    changeRate: -0.55,
    tradeAmountBil: 620,
    positionRatio: 0,
    investAmount: 0,
    newsCount: 3,
    youtubeCount: 0,
    reportCount: 1,
    oneLiner: "정책 수혜 기대는 유효하나 단기 급등 부담. 눌림 구간 확인 후 진입 권고.",
  },
]

/** 옵티마이저 추천 카드 픽스처. */
export interface OptimRecommendation {
  stockName: string
  stockCode: string
  prevClose: number
  conviction: number
  positionRatio: number
  reason: string
  entryRange: [number, number]
  partialSellPrice: number
  partialSellRatio: number
  stopLossPrice: number
  trailingStopPct: number
  maxHoldingDays: number
  tracking: {
    return1d: number | null
    hit1d: number | null
    return3d: number | null
    hit3d: number | null
    return5d: number | null
    hit5d: number | null
  }
}

export const OPTIM_RECOMMENDATION: OptimRecommendation = {
  stockName: "누리에너지",
  stockCode: "322000",
  prevClose: 38_450,
  conviction: 64,
  positionRatio: 0.2,
  reason: "수급 필터 + 돌파 시그널 동시 충족",
  entryRange: [38_100, 38_900],
  partialSellPrice: 41_200,
  partialSellRatio: 0.5,
  stopLossPrice: 36_700,
  trailingStopPct: 3,
  maxHoldingDays: 5,
  tracking: {
    return1d: 1.84,
    hit1d: 1,
    return3d: -0.42,
    hit3d: 0,
    return5d: null,
    hit5d: null,
  },
}

/** 비트 모듈 정의 — F(필터)/S(매수)/X(매도)/R(회전) 4그룹 12모듈. */
export const MODULE_IDS = ["F01", "F02", "F03", "F04", "S01", "S02", "S03", "X01", "X02", "X03", "R01", "R02"]

export const MODULE_LABELS: Record<string, ModuleLabel> = {
  F01: { group: "F", short: "거래대금", description: "일 거래대금 하한 필터 — 유동성 부족 종목 제외" },
  F02: { group: "F", short: "시총", description: "시가총액 범위 필터" },
  F03: { group: "F", short: "변동성", description: "최근 20일 변동성 상한 필터" },
  F04: { group: "F", short: "테마", description: "정책·테마 섹터 가점 필터" },
  S01: { group: "S", short: "돌파", description: "전고점 돌파 매수 시그널" },
  S02: { group: "S", short: "수급", description: "기관·외인 순매수 시그널" },
  S03: { group: "S", short: "눌림", description: "이평선 눌림목 반등 시그널" },
  X01: { group: "X", short: "익절", description: "목표 수익률 도달 시 부분 매도" },
  X02: { group: "X", short: "손절", description: "손절가 이탈 시 전량 매도" },
  X03: { group: "X", short: "트레일", description: "최고가 대비 트레일링 스탑" },
  R01: { group: "R", short: "회전", description: "보유일 초과 시 종가 청산" },
  R02: { group: "R", short: "리밸런스", description: "비중 상한 초과분 동적 축소" },
}

export const ACTIVE_BITS = ["F01", "F04", "S01", "S02", "X01", "X02", "X03", "R01"]

/** 종목 뉴스 패널 픽스처. */
export interface StockNewsItem {
  id: number
  tradeDate: string
  source: string
  sentiment: "positive" | "negative" | "neutral"
  title: string
  oneLiner: string
  hasUrl: boolean
}

export const STOCK_NEWS: StockNewsItem[] = [
  {
    id: 1,
    tradeDate: "2026-07-21",
    source: "연합인포",
    sentiment: "positive",
    title: "한빛반도체, 차세대 HBM 공급 계약 체결…하반기 실적 기대감 확대",
    oneLiner: "대형 고객사향 공급 계약으로 3분기 매출 가이던스 상향 전망.",
    hasUrl: true,
  },
  {
    id: 2,
    tradeDate: "2026-07-21",
    source: "이데일리풍",
    sentiment: "neutral",
    title: "반도체 장비주 혼조…수출 지표 발표 앞두고 관망세",
    oneLiner: "업종 전반 거래대금 감소, 방향성 탐색 구간.",
    hasUrl: true,
  },
  {
    id: 3,
    tradeDate: "2026-07-18",
    source: "매경류",
    sentiment: "negative",
    title: "환율 급등에 소재 수입 원가 부담…마진 축소 우려",
    oneLiner: "원달러 급등 구간에서 원가율 상승 리스크 부각.",
    hasUrl: false,
  },
]
