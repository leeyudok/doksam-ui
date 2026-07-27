import type { Icon } from "@phosphor-icons/react"
import {
  ChartLineUpIcon,
  CoinsIcon,
  CurrencyBtcIcon,
  CurrencyKrwIcon,
  GaugeIcon,
  GlobeIcon,
} from "@phosphor-icons/react/dist/ssr"

/**
 * app/templates/brokerage/(#41) 전용 가상 시장 지표.
 *
 * "누리증권" — 실존 증권사와 무관한 가상 브랜드. 지수/환율/코인 값은 전부
 * 가상 수치이며 실제 시세와 무관하다. trend 는 최근 구간의 미니 스파크라인용
 * 샘플 시계열(오래된→최신 순)이다.
 */
export interface MarketIndex {
  id: string
  /** 표시 라벨(코스피/코스닥 등). */
  label: string
  /** 분류 배지 텍스트 — 국내/해외/원자재 등. */
  group: "국내" | "해외" | "환율" | "원자재" | "코인"
  icon: Icon
  /** 현재값. */
  value: number
  /** 값 표기에 붙는 단위(포인트 없음 표기는 빈 문자열). */
  unit: string
  /** 등락률(%). */
  changePercent: number
  /** 최근 구간 스파크라인용 샘플 값. */
  trend: number[]
}

export const MARKET_INDICES: MarketIndex[] = [
  {
    id: "kospi",
    label: "코스피",
    group: "국내",
    icon: ChartLineUpIcon,
    value: 2684.31,
    unit: "",
    changePercent: 0.62,
    trend: [2648, 2655, 2661, 2650, 2668, 2672, 2679, 2684],
  },
  {
    id: "kosdaq",
    label: "코스닥",
    group: "국내",
    icon: ChartLineUpIcon,
    value: 861.47,
    unit: "",
    changePercent: -0.34,
    trend: [868, 870, 865, 862, 866, 863, 860, 861],
  },
  {
    id: "nasdaq",
    label: "나스닥",
    group: "해외",
    icon: GlobeIcon,
    value: 17842.15,
    unit: "",
    changePercent: 1.12,
    trend: [17520, 17590, 17610, 17580, 17690, 17740, 17800, 17842],
  },
  {
    id: "sp500",
    label: "S&P500",
    group: "해외",
    icon: GlobeIcon,
    value: 5612.9,
    unit: "",
    changePercent: 0.48,
    trend: [5570, 5578, 5560, 5585, 5592, 5601, 5608, 5613],
  },
  {
    id: "vix",
    label: "VIX",
    group: "해외",
    icon: GaugeIcon,
    value: 14.28,
    unit: "",
    changePercent: -2.15,
    trend: [15.4, 15.1, 14.9, 15.2, 14.7, 14.5, 14.3, 14.28],
  },
  {
    id: "usdkrw",
    label: "달러환율",
    group: "환율",
    icon: CurrencyKrwIcon,
    value: 1372.5,
    unit: "원",
    changePercent: 0.21,
    trend: [1365, 1367, 1364, 1369, 1370, 1371, 1373, 1372.5],
  },
  {
    id: "btc",
    label: "비트코인",
    group: "코인",
    icon: CurrencyBtcIcon,
    value: 91240000,
    unit: "원",
    changePercent: 3.42,
    trend: [86500000, 87200000, 88100000, 87800000, 89400000, 90100000, 90800000, 91240000],
  },
  {
    id: "gold",
    label: "국제금",
    group: "원자재",
    icon: CoinsIcon,
    value: 2418.6,
    unit: "달러",
    changePercent: -0.18,
    trend: [2426, 2429, 2422, 2420, 2424, 2417, 2415, 2418.6],
  },
]

/** 하단 고정 티커 바 전용 항목 — 값 표기 없이 라벨+수치+등락률만 스크롤 노출한다. */
export interface TickerItem {
  id: string
  label: string
  value: number
  unit: string
  changePercent: number
}

export const TICKER_ITEMS: TickerItem[] = [
  { id: "sp500", label: "S&P500", value: 5612.9, unit: "", changePercent: 0.48 },
  { id: "sox", label: "필라델피아 반도체", value: 5284.7, unit: "", changePercent: 1.87 },
  { id: "vix", label: "VIX", value: 14.28, unit: "", changePercent: -2.15 },
  { id: "dow", label: "다우존스", value: 41236.4, unit: "", changePercent: 0.15 },
  { id: "nikkei", label: "닛케이225", value: 39812.2, unit: "", changePercent: -0.52 },
  { id: "usdkrw", label: "달러환율", value: 1372.5, unit: "원", changePercent: 0.21 },
  { id: "btc", label: "비트코인", value: 91240000, unit: "원", changePercent: 3.42 },
  { id: "gold", label: "국제금", value: 2418.6, unit: "달러", changePercent: -0.18 },
]
