/**
 * 주식 주문 패턴(#34 stock-order) 전용 데모 데이터 — 순수 데이터/함수 모듈.
 *
 * "use client" 없음 — 서버 컴포넌트(samples 파일)에서 바로 import 해 쓴다. React
 * 컴포넌트나 클라이언트 전용 값(훅 등)은 여기서 export 하지 않는다 — 그건
 * components/patterns/stock-order/ 쪽 클라이언트 컴포넌트가 담당한다.
 *
 * 종목명·호가·잔고는 전부 가상의 예시 값이며 실제 시세가 아니다.
 */

export interface OrderSymbol {
  code: string
  name: string
  market: "KOSPI" | "KOSDAQ"
  currentPrice: number
  changePercent: number
  /** 주문 가능 현금(매수용) / 보유 수량(매도용) 안내에 쓰는 값. */
  buyingPower: number
  heldQuantity: number
}

export const ORDER_SYMBOL: OrderSymbol = {
  code: "005930",
  name: "삼성전자",
  market: "KOSPI",
  currentPrice: 72400,
  changePercent: 1.68,
  buyingPower: 5_000_000,
  heldQuantity: 40,
}

export interface OrderBookLevel {
  price: number
  /** 해당 호가에 걸린 수량(주). */
  quantity: number
}

/** 매도호가(높은 가격이 위) — 화면 상단에 그대로 렌더링한다. */
export const ASK_LEVELS: OrderBookLevel[] = [
  { price: 72600, quantity: 3_210 },
  { price: 72500, quantity: 5_640 },
  { price: 72400, quantity: 8_920 },
]

/** 매수호가(높은 가격이 위) — 매도호가 바로 아래 이어서 렌더링한다. */
export const BID_LEVELS: OrderBookLevel[] = [
  { price: 72300, quantity: 7_150 },
  { price: 72200, quantity: 4_380 },
  { price: 72100, quantity: 2_960 },
]

export type OrderSide = "buy" | "sell"
export type OrderType = "limit" | "market"

export const ORDER_TYPE_LABEL: Record<OrderType, string> = {
  limit: "지정가",
  market: "시장가",
}

export const ORDER_SIDE_LABEL: Record<OrderSide, string> = {
  buy: "매수",
  sell: "매도",
}

/** 예상 체결금액 = 가격 x 수량 (시장가는 현재가를 기준으로 추정한다). */
export function estimateOrderAmount(price: number, quantity: number): number {
  if (!Number.isFinite(price) || !Number.isFinite(quantity)) return 0
  return Math.max(price, 0) * Math.max(quantity, 0)
}
