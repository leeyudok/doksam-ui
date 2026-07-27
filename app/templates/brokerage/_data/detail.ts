/**
 * 종목 상세 패널(C영역, #41) 가상 데이터 — 일봉 캔들, "왜 올랐을까" AI 분석, 커뮤니티 피드.
 * 실존 종목/증권사 실명 없이 전부 가상 종목명·가상 수치로 구성한다.
 */

/** 일봉 캔들 1개 — 시가/고가/저가/종가/거래량. */
export interface Candle {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

/** "왜 올랐을까" AI 요약 카드. */
export interface AiAnalysis {
  summary: string
  generatedAt: string
}

/** 커뮤니티 피드 글 1건 — 닉네임·자산뱃지·작성시각·본문. */
export interface CommunityPost {
  id: string
  nickname: string
  assetBadge: string
  postedAt: string
  content: string
  likeCount: number
}

/** 종목 상세 전체 묶음 — 헤더(시세) + 캔들 + AI 분석 + 커뮤니티 피드. */
export interface StockDetailData {
  symbol: string
  name: string
  market: "국내" | "해외"
  currentPrice: number
  changeAmount: number
  changePercent: number
  candles: Candle[]
  aiAnalysis: AiAnalysis
  communityFeed: CommunityPost[]
}

/** 시드값 기반 결정적 의사난수 — 렌더마다 값이 흔들리지 않도록(하이드레이션 불일치 방지). */
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function buildCandles(basePrice: number, seed: number, days = 30): Candle[] {
  const rand = seededRandom(seed)
  const candles: Candle[] = []
  let prevClose = basePrice

  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(2026, 6, 12)
    date.setDate(date.getDate() - i)

    const drift = (rand() - 0.48) * basePrice * 0.03
    const open = prevClose
    const close = Math.max(open + drift, basePrice * 0.5)
    const high = Math.max(open, close) + rand() * basePrice * 0.015
    const low = Math.min(open, close) - rand() * basePrice * 0.015
    const volume = Math.round(50000 + rand() * 450000)

    candles.push({
      date: date.toISOString().slice(0, 10),
      open: Math.round(open),
      high: Math.round(high),
      low: Math.round(Math.max(low, 0)),
      close: Math.round(close),
      volume,
    })
    prevClose = close
  }

  return candles
}

const RAW_STOCKS: (Omit<StockDetailData, "candles"> & { seed: number; basePrice: number })[] = [
  {
    symbol: "NRE",
    name: "누리전자",
    market: "국내",
    currentPrice: 128500,
    changeAmount: 5400,
    changePercent: 4.4,
    seed: 41001,
    basePrice: 118000,
    aiAnalysis: {
      summary:
        "차세대 저전력 반도체 패키징 수율 개선 소식에 외국인·기관 순매수가 몰리며 3거래일 연속 상승했습니다. 거래대금은 전일 대비 62% 늘었습니다.",
      generatedAt: "2026-07-12 09:41",
    },
    communityFeed: [
      { id: "nre-1", nickname: "여의도불장", assetBadge: "1억원+", postedAt: "3분 전", content: "패키징 수율 얘기 나오니까 바로 반응하네요 ㄷㄷ", likeCount: 24 },
      { id: "nre-2", nickname: "장기투자자J", assetBadge: "5천만원+", postedAt: "12분 전", content: "이 정도면 목표가 상향 나올 것 같은데 다들 어떻게 보시나요", likeCount: 11 },
      { id: "nre-3", nickname: "무릎에사서어깨에", assetBadge: "3천만원+", postedAt: "27분 전", content: "오늘 거래량 실화냐... 평소의 3배는 되는듯", likeCount: 33 },
      { id: "nre-4", nickname: "누리전자홀더", assetBadge: "1억원+", postedAt: "41분 전", content: "실적 발표 전까지는 홀딩 갑니다", likeCount: 8 },
      { id: "nre-5", nickname: "초보개미77", assetBadge: "1천만원+", postedAt: "1시간 전", content: "지금 들어가도 늦지 않았을까요?", likeCount: 4 },
      { id: "nre-6", nickname: "반도체덕후", assetBadge: "10억원+", postedAt: "2시간 전", content: "수율 개선폭이 생각보다 커서 다음 분기 실적 기대됩니다", likeCount: 19 },
    ],
  },
  {
    symbol: "SJB",
    name: "선진바이오",
    market: "국내",
    currentPrice: 43200,
    changeAmount: -1850,
    changePercent: -4.1,
    seed: 41002,
    basePrice: 47000,
    aiAnalysis: {
      summary:
        "임상 2상 데이터 발표가 예상보다 지연되며 차익 실현 매물이 출회, 장중 낙폭을 키웠습니다. 개인 매수세가 낙폭을 일부 방어했습니다.",
      generatedAt: "2026-07-12 09:38",
    },
    communityFeed: [
      { id: "sjb-1", nickname: "바이오헌터", assetBadge: "5천만원+", postedAt: "5분 전", content: "임상 지연이 흔한 일이긴 한데 시장 반응이 좀 과한듯", likeCount: 15 },
      { id: "sjb-2", nickname: "존버는승리한다", assetBadge: "3천만원+", postedAt: "18분 전", content: "이럴 때 물타기 하는 게 맞나 고민되네요", likeCount: 9 },
      { id: "sjb-3", nickname: "임상러버", assetBadge: "1억원+", postedAt: "34분 전", content: "발표일 다시 잡히면 반등 가능성 충분", likeCount: 21 },
      { id: "sjb-4", nickname: "빨간양봉기원", assetBadge: "1천만원+", postedAt: "50분 전", content: "손절해야 하나 고민중", likeCount: 3 },
      { id: "sjb-5", nickname: "가치투자중", assetBadge: "10억원+", postedAt: "1시간 전", content: "펀더멘털은 그대로라 크게 걱정 안 합니다", likeCount: 12 },
    ],
  },
  {
    symbol: "CMM",
    name: "청명모빌리티",
    market: "국내",
    currentPrice: 76800,
    changeAmount: 2100,
    changePercent: 2.8,
    seed: 41003,
    basePrice: 73500,
    aiAnalysis: {
      summary:
        "자율주행 소프트웨어 파트너십 체결 소식이 전해지며 완만한 상승세를 이어가고 있습니다. 외국인 보유 비중도 소폭 확대됐습니다.",
      generatedAt: "2026-07-12 09:35",
    },
    communityFeed: [
      { id: "cmm-1", nickname: "모빌리티매니아", assetBadge: "5천만원+", postedAt: "7분 전", content: "파트너십 규모가 생각보다 크네요", likeCount: 17 },
      { id: "cmm-2", nickname: "자율주행덕후", assetBadge: "1억원+", postedAt: "22분 전", content: "이번 분기 매출 기여는 크지 않을 듯", likeCount: 6 },
      { id: "cmm-3", nickname: "청명이형", assetBadge: "3천만원+", postedAt: "39분 전", content: "장기적으로 좋게 보고 있습니다", likeCount: 14 },
      { id: "cmm-4", nickname: "테마주추적단", assetBadge: "1천만원+", postedAt: "55분 전", content: "관련 테마주들 다 같이 움직이네요", likeCount: 5 },
      { id: "cmm-5", nickname: "10년째주식", assetBadge: "10억원+", postedAt: "1시간 전", content: "꾸준히 우상향하는 모습이 좋습니다", likeCount: 10 },
    ],
  },
  {
    symbol: "DOE",
    name: "다온에너지",
    market: "국내",
    currentPrice: 21400,
    changeAmount: -320,
    changePercent: -1.5,
    seed: 41004,
    basePrice: 21900,
    aiAnalysis: {
      summary:
        "국제 에너지 가격 조정과 맞물려 완만한 하락세를 보이고 있습니다. 특별한 악재는 없어 관망세가 짙습니다.",
      generatedAt: "2026-07-12 09:30",
    },
    communityFeed: [
      { id: "doe-1", nickname: "에너지투자자", assetBadge: "3천만원+", postedAt: "9분 전", content: "이 정도 조정은 흔한 편이라 크게 신경 안씁니다", likeCount: 8 },
      { id: "doe-2", nickname: "배당사냥꾼", assetBadge: "1억원+", postedAt: "24분 전", content: "배당 매력은 여전해서 계속 보유합니다", likeCount: 13 },
      { id: "doe-3", nickname: "신규개미", assetBadge: "1천만원+", postedAt: "48분 전", content: "지금이 저가 매수 기회일까요", likeCount: 4 },
      { id: "doe-4", nickname: "장기보유파", assetBadge: "5천만원+", postedAt: "1시간 전", content: "변동성 크지 않아서 안정적으로 갑니다", likeCount: 7 },
    ],
  },
]

/** 브로커리지 C영역에서 다루는 전체 종목 상세 데이터셋(4종). */
export const STOCK_DETAILS: StockDetailData[] = RAW_STOCKS.map(({ seed, basePrice, ...rest }) => ({
  ...rest,
  candles: buildCandles(basePrice, seed),
}))

/** symbol 을 못 찾았을 때 쓰는 기본 종목(누리전자). */
export const DEFAULT_STOCK_DETAIL: StockDetailData = STOCK_DETAILS[0]

/** symbol 로 상세 데이터를 조회한다. 없으면 기본 종목을 반환한다. */
export function findStockDetail(symbol?: string): StockDetailData {
  if (!symbol) return DEFAULT_STOCK_DETAIL
  return STOCK_DETAILS.find((stock) => stock.symbol === symbol) ?? DEFAULT_STOCK_DETAIL
}

/** 스크리너에서 선택한 종목의 최소 시세 정보 — 상세를 생성하는 입력. */
export interface StockDetailInput {
  symbol: string
  name: string
  market: "국내" | "해외"
  currentPrice: number
  changeAmount: number
  changePercent: number
}

function symbolSeed(symbol: string): number {
  let h = 0
  for (const ch of symbol) h = (h * 31 + ch.charCodeAt(0)) % 2147483647
  return h + 1
}

const RISE_SUMMARIES = [
  "외국인·기관 순매수가 몰리며 거래대금이 크게 늘어 상승했습니다. 관련 업종 전반이 강세를 보였습니다.",
  "실적 기대감과 수급 개선이 겹치며 매수세가 유입됐습니다. 저가 매수 관점의 유입도 관측됐습니다.",
  "업황 개선 신호에 투자심리가 회복되며 3거래일 연속 상승 흐름을 이어갔습니다.",
]
const FALL_SUMMARIES = [
  "차익 실현 매물이 출회되며 낙폭을 키웠습니다. 개인 매수세가 하단을 일부 방어했습니다.",
  "업종 전반의 조정과 맞물려 약세를 보였습니다. 특별한 개별 악재는 확인되지 않았습니다.",
  "단기 급등에 따른 되돌림으로 매도 우위 흐름이 나타났습니다.",
]
const NICKS = ["여의도불장", "장기투자자J", "무릎에사서어깨에", "초보개미77", "가치투자중", "존버는승리"]
const BADGES = ["1억원+", "5천만원+", "3천만원+", "1천만원+", "10억원+"]
const TIMES = ["3분 전", "12분 전", "27분 전", "41분 전", "1시간 전", "2시간 전"]
const RISE_POSTS = ["오늘 거래량 실화냐 ㄷㄷ", "이 정도면 목표가 상향 나올 듯", "지금 들어가도 될까요?", "수급이 확 붙네요"]
const FALL_POSTS = ["이 정도 조정은 흔하죠", "물타기 고민되네요", "펀더멘털은 그대로라 홀딩", "손절해야 하나…"]

/** 스크리너에서 선택한 종목으로 상세를 만든다 — 큐레이션 4종은 그대로, 그 외는 심볼 시드로 결정론 생성. */
export function buildStockDetail(input?: StockDetailInput): StockDetailData {
  if (!input) return DEFAULT_STOCK_DETAIL
  const curated = STOCK_DETAILS.find((s) => s.symbol === input.symbol)
  if (curated) return curated

  const seed = symbolSeed(input.symbol)
  const rand = seededRandom(seed)
  const up = input.changePercent >= 0
  const summaries = up ? RISE_SUMMARIES : FALL_SUMMARIES
  const posts = up ? RISE_POSTS : FALL_POSTS
  const feedCount = 4 + Math.floor(rand() * 2)

  return {
    symbol: input.symbol,
    name: input.name,
    market: input.market,
    currentPrice: input.currentPrice,
    changeAmount: input.changeAmount,
    changePercent: input.changePercent,
    candles: buildCandles(input.currentPrice, seed),
    aiAnalysis: {
      summary: summaries[seed % summaries.length],
      generatedAt: "2026-07-12 09:40",
    },
    communityFeed: Array.from({ length: feedCount }, (_, i) => ({
      id: `${input.symbol}-${i}`,
      nickname: NICKS[(seed + i) % NICKS.length],
      assetBadge: BADGES[(seed + i) % BADGES.length],
      postedAt: TIMES[i % TIMES.length],
      content: posts[(seed + i) % posts.length],
      likeCount: 3 + Math.floor(rand() * 30),
    })),
  }
}
