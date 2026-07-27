import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { rateColor, rateSign } from "@/lib/finance/rate"

interface StockQuote {
  name: string
  code: string
  sector: string
  market: string
  currentPrice: number
  priceChange: number
  changePercent: number
  per: string
  pbr: string
  range52w: { low: number; high: number }
}

const QUOTES: StockQuote[] = [
  {
    name: "삼성전자",
    code: "005930",
    sector: "반도체",
    market: "KOSPI",
    currentPrice: 72400,
    priceChange: 1200,
    changePercent: 1.68,
    per: "12.5",
    pbr: "1.32",
    range52w: { low: 55800, high: 89000 },
  },
  {
    name: "카카오",
    code: "035720",
    sector: "플랫폼",
    market: "KOSPI",
    currentPrice: 48500,
    priceChange: -900,
    changePercent: -1.82,
    per: "28.4",
    pbr: "1.05",
    range52w: { low: 36200, high: 61400 },
  },
]

/** 52주 범위 안에서 현재가 위치를 퍼센트로 계산한다. */
function rangePosition(quote: StockQuote): number {
  const { low, high } = quote.range52w
  if (high <= low) return 0
  return ((quote.currentPrice - low) / (high - low)) * 100
}

/** #25 종목 카드 — 시세 + 등락 + PER/PBR + 52주 범위 (srope StockCard 이식). */
export function StockQuoteCard() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {QUOTES.map((quote) => (
        <Card key={quote.code}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{quote.name}</p>
                <p className="text-xs text-muted-foreground">
                  {quote.code} · {quote.sector} · {quote.market}
                </p>
              </div>
              <Badge variant="outline" className="text-[10px]">
                {quote.market}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tabular-nums">
                {quote.currentPrice.toLocaleString()}
              </span>
              <span className={`text-sm font-semibold tabular-nums ${rateColor(quote.changePercent)}`}>
                {rateSign(quote.priceChange)}
                {quote.priceChange.toLocaleString()} ({rateSign(quote.changePercent)}
                {quote.changePercent.toFixed(2)}%)
              </span>
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>PER {quote.per}</span>
              <span>PBR {quote.pbr}</span>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded-full bg-secondary">
                <div
                  className="h-1.5 rounded-full bg-primary"
                  style={{ width: `${rangePosition(quote)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground tabular-nums">
                <span>52주 최저 {quote.range52w.low.toLocaleString()}</span>
                <span>52주 최고 {quote.range52w.high.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
