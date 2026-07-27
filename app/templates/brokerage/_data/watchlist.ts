/**
 * 관심종목 사이드바(C영역, #41) 가상 데이터 — 탭별 TOP 10 종목 리스트.
 * 실존 종목/증권사 실명 없이 가상 종목명·가상 수치로 구성한다.
 */

export type WatchlistTabId = "myInvest" | "watch" | "recent" | "live"

export interface WatchlistTab {
  id: WatchlistTabId
  label: string
}

export const WATCHLIST_TABS: WatchlistTab[] = [
  { id: "myInvest", label: "내투자" },
  { id: "watch", label: "관심" },
  { id: "recent", label: "최근본" },
  { id: "live", label: "실시간" },
]

/** 관심종목 리스트 항목 — 로고 이니셜(자체 렌더)·이름·가격·등락률·찜 여부. */
export interface WatchlistStock {
  symbol: string
  name: string
  price: number
  changePercent: number
  liked: boolean
}

const MY_INVEST: WatchlistStock[] = [
  { symbol: "NRE", name: "누리전자", price: 128500, changePercent: 4.4, liked: true },
  { symbol: "SJB", name: "선진바이오", price: 43200, changePercent: -4.1, liked: false },
  { symbol: "CMM", name: "청명모빌리티", price: 76800, changePercent: 2.8, liked: true },
  { symbol: "DOE", name: "다온에너지", price: 21400, changePercent: -1.5, liked: false },
  { symbol: "BBS", name: "별빛반도체", price: 95600, changePercent: 1.2, liked: false },
  { symbol: "HDF", name: "한들푸드", price: 15300, changePercent: 0.6, liked: false },
  { symbol: "MRC", name: "마루케미칼", price: 58900, changePercent: -0.8, liked: true },
  { symbol: "PRT", name: "파랑트리", price: 34200, changePercent: 3.1, liked: false },
  { symbol: "SEH", name: "설연헬스케어", price: 67100, changePercent: -2.3, liked: false },
  { symbol: "GNW", name: "가온웨어", price: 12800, changePercent: 5.9, liked: true },
]

const WATCH: WatchlistStock[] = [
  { symbol: "BBS", name: "별빛반도체", price: 95600, changePercent: 1.2, liked: true },
  { symbol: "HDF", name: "한들푸드", price: 15300, changePercent: 0.6, liked: false },
  { symbol: "MRC", name: "마루케미칼", price: 58900, changePercent: -0.8, liked: false },
  { symbol: "PRT", name: "파랑트리", price: 34200, changePercent: 3.1, liked: true },
  { symbol: "SEH", name: "설연헬스케어", price: 67100, changePercent: -2.3, liked: false },
  { symbol: "GNW", name: "가온웨어", price: 12800, changePercent: 5.9, liked: false },
  { symbol: "NRE", name: "누리전자", price: 128500, changePercent: 4.4, liked: true },
  { symbol: "SJB", name: "선진바이오", price: 43200, changePercent: -4.1, liked: false },
  { symbol: "CMM", name: "청명모빌리티", price: 76800, changePercent: 2.8, liked: false },
  { symbol: "DOE", name: "다온에너지", price: 21400, changePercent: -1.5, liked: false },
]

const RECENT: WatchlistStock[] = [
  { symbol: "SEH", name: "설연헬스케어", price: 67100, changePercent: -2.3, liked: false },
  { symbol: "GNW", name: "가온웨어", price: 12800, changePercent: 5.9, liked: true },
  { symbol: "NRE", name: "누리전자", price: 128500, changePercent: 4.4, liked: true },
  { symbol: "PRT", name: "파랑트리", price: 34200, changePercent: 3.1, liked: false },
  { symbol: "MRC", name: "마루케미칼", price: 58900, changePercent: -0.8, liked: true },
  { symbol: "BBS", name: "별빛반도체", price: 95600, changePercent: 1.2, liked: false },
  { symbol: "SJB", name: "선진바이오", price: 43200, changePercent: -4.1, liked: false },
]

const LIVE: WatchlistStock[] = [
  { symbol: "GNW", name: "가온웨어", price: 12800, changePercent: 5.9, liked: false },
  { symbol: "NRE", name: "누리전자", price: 128500, changePercent: 4.4, liked: true },
  { symbol: "CMM", name: "청명모빌리티", price: 76800, changePercent: 2.8, liked: false },
  { symbol: "PRT", name: "파랑트리", price: 34200, changePercent: 3.1, liked: false },
  { symbol: "BBS", name: "별빛반도체", price: 95600, changePercent: 1.2, liked: true },
  { symbol: "SJB", name: "선진바이오", price: 43200, changePercent: -4.1, liked: false },
  { symbol: "SEH", name: "설연헬스케어", price: 67100, changePercent: -2.3, liked: false },
  { symbol: "DOE", name: "다온에너지", price: 21400, changePercent: -1.5, liked: false },
]

/** 탭 ID 별 TOP 10(이하) 관심종목 리스트. */
export const WATCHLIST_BY_TAB: Record<WatchlistTabId, WatchlistStock[]> = {
  myInvest: MY_INVEST,
  watch: WATCH,
  recent: RECENT,
  live: LIVE,
}
