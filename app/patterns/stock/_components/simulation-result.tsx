import { TrendUpIcon, TrendDownIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SimulationChart } from "./simulation-chart.client"

const SUMMARY = [
  { label: "총수익률", value: "+18.5%", icon: <TrendUpIcon size={14} weight="duotone" />, tone: "text-destructive" },
  { label: "MDD", value: "-8.2%", icon: <TrendDownIcon size={14} weight="duotone" />, tone: "text-chart-1" },
  { label: "승률", value: "65.0%", icon: null, tone: "text-success" },
  { label: "평균보유", value: "4.2일", icon: null, tone: "text-foreground" },
] as const

interface Trade {
  name: string
  type: "매수" | "매도"
  date: string
  price: number
  qty: number
  reason: string
}

const TRADES: Trade[] = [
  { name: "삼성전자", type: "매수", date: "04-01", price: 68000, qty: 10, reason: "시그널 매수" },
  { name: "SK하이닉스", type: "매수", date: "04-02", price: 195000, qty: 3, reason: "돌파 매수" },
  { name: "삼성전자", type: "매도", date: "04-05", price: 72400, qty: 10, reason: "목표가 도달" },
]

function SummaryCards() {
  return (
    <div className="grid grid-cols-2 gap-1.5 md:grid-cols-4">
      {SUMMARY.map((item) => (
        <Card key={item.label}>
          <CardContent className="px-2 py-2">
            <p className="text-[9px] font-medium text-muted-foreground">{item.label}</p>
            <div className="flex items-center gap-1">
              {item.icon && <span className={item.tone}>{item.icon}</span>}
              <span className={`text-base font-black ${item.tone}`}>{item.value}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function TradeHistoryTable() {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[10px]">종목</TableHead>
              <TableHead className="w-12 text-[10px]">구분</TableHead>
              <TableHead className="w-20 text-[10px]">날짜</TableHead>
              <TableHead className="w-16 text-right text-[10px]">가격</TableHead>
              <TableHead className="w-10 text-right text-[10px]">수량</TableHead>
              <TableHead className="text-[10px]">사유</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TRADES.map((row, i) => (
              <TableRow key={`${row.name}-${row.date}-${i}`}>
                <TableCell className="py-1 text-xs font-medium">{row.name}</TableCell>
                <TableCell className="py-1">
                  <Badge variant={row.type === "매수" ? "default" : "destructive"} className="px-1.5 py-0 text-[9px]">
                    {row.type}
                  </Badge>
                </TableCell>
                <TableCell className="py-1 text-[10px] text-muted-foreground">{row.date}</TableCell>
                <TableCell className="py-1 text-right text-xs tabular-nums">{row.price.toLocaleString()}</TableCell>
                <TableCell className="py-1 text-right text-xs tabular-nums">{row.qty}</TableCell>
                <TableCell className="py-1 text-[10px] text-muted-foreground">{row.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

/** #32 시뮬 결과 — 요약 카드 4개 + 포트폴리오 가치 추이 차트 + 거래 내역 테이블. */
export function SimulationResult() {
  return (
    <div className="space-y-3">
      <SummaryCards />
      <Card>
        <CardContent className="px-2 pt-2 pb-1">
          <p className="mb-1 px-1 text-[11px] font-bold">포트폴리오 가치 추이</p>
          <SimulationChart />
        </CardContent>
      </Card>
      <TradeHistoryTable />
    </div>
  )
}
