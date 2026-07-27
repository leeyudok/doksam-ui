import { CaretDownIcon, NewspaperIcon, YoutubeLogoIcon, FileTextIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { rateColor, rateSign } from "@/lib/finance/rate"

const DAY_LABELS = ["D+1", "D+2", "D+3", "D+4", "D+5"] as const

interface TrackingRow {
  name: string
  price: number
  rates: number[]
  catalyst: "활성" | "강화" | "약화" | "소멸"
  sources: { news: number; youtube: number; report: number }
}

const ROWS: TrackingRow[] = [
  {
    name: "삼성전자",
    price: 71200,
    rates: [1.68, 0.42, -0.28, 1.12, 0.85],
    catalyst: "활성",
    sources: { news: 3, youtube: 1, report: 0 },
  },
  {
    name: "SK하이닉스",
    price: 195000,
    rates: [2.31, 1.54, 3.08, -0.51, 2.05],
    catalyst: "강화",
    sources: { news: 5, youtube: 2, report: 1 },
  },
  {
    name: "카카오",
    price: 52000,
    rates: [-1.15, -0.77, -2.31, 0.38, -1.54],
    catalyst: "약화",
    sources: { news: 2, youtube: 0, report: 0 },
  },
]

function catalystVariant(catalyst: TrackingRow["catalyst"]): "default" | "secondary" | "destructive" {
  if (catalyst === "활성" || catalyst === "강화") return "default"
  if (catalyst === "약화") return "secondary"
  return "destructive"
}

function SourceIcons({ sources }: Readonly<{ sources: TrackingRow["sources"] }>) {
  return (
    <div className="flex items-center gap-0.5">
      {sources.news > 0 && <NewspaperIcon size={10} className="text-warning" />}
      {sources.youtube > 0 && <YoutubeLogoIcon size={10} className="text-destructive" />}
      {sources.report > 0 && <FileTextIcon size={10} className="text-chart-1" />}
    </div>
  )
}

/** #30 일별 추적 테이블 — D+1~D+5 등락률 + 재료 배지 + 소스 아이콘. */
export function DailyTrackingTable() {
  return (
    <Card>
      <CardContent className="p-0">
        <ScrollArea>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24 text-[10px]">종목</TableHead>
                <TableHead className="w-16 text-right text-[10px]">추천가</TableHead>
                {DAY_LABELS.map((d) => (
                  <TableHead key={d} className="w-14 text-center text-[10px]">
                    {d}
                  </TableHead>
                ))}
                <TableHead className="w-16 text-[10px]">재료</TableHead>
                <TableHead className="w-10 text-[10px]">소스</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="py-1">
                    <div className="flex items-center gap-1">
                      <CaretDownIcon size={10} className="text-muted-foreground" />
                      <span className="text-xs font-medium">{row.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-1 text-right text-xs tabular-nums">{row.price.toLocaleString()}</TableCell>
                  {row.rates.map((rate, i) => (
                    <TableCell
                      key={DAY_LABELS[i]}
                      className={`py-1 text-center text-[10px] font-semibold tabular-nums ${rateColor(rate)}`}
                    >
                      {rateSign(rate)}
                      {rate.toFixed(1)}%
                    </TableCell>
                  ))}
                  <TableCell className="py-1">
                    <Badge variant={catalystVariant(row.catalyst)} className="px-1.5 py-0 text-[9px]">
                      {row.catalyst}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-1">
                    <SourceIcons sources={row.sources} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
