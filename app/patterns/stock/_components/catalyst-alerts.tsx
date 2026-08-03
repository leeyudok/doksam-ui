import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Direction = "bullish" | "bearish" | "neutral"
type Sentiment = "긍정" | "부정" | "중립"

interface Catalyst {
  name: string
  type: string
  dir: Direction
  strength: number
  sentiment: Sentiment
  title: string
}

const CATALYSTS: Catalyst[] = [
  {
    name: "SK하이닉스",
    type: "실적",
    dir: "bullish",
    strength: 85,
    sentiment: "긍정",
    title: "HBM3E 납품 확대 전망",
  },
  {
    name: "LG에너지솔루션",
    type: "정책",
    dir: "bearish",
    strength: 45,
    sentiment: "부정",
    title: "EU 관세 리스크 부각",
  },
  {
    name: "NAVER",
    type: "수급",
    dir: "neutral",
    strength: 30,
    sentiment: "중립",
    title: "외인 소폭 순매수 전환",
  },
]

function DirectionIcon({ dir }: Readonly<{ dir: Direction }>) {
  if (dir === "bullish") return <ArrowUpIcon size={14} weight="bold" className="text-gain" />
  if (dir === "bearish") return <ArrowDownIcon size={14} weight="bold" className="text-loss" />
  return <MinusIcon size={14} weight="bold" className="text-muted-foreground" />
}

function sentimentBadgeVariant(sentiment: Sentiment): "default" | "destructive" | "secondary" {
  if (sentiment === "긍정") return "default"
  if (sentiment === "부정") return "destructive"
  return "secondary"
}

function strengthBarClass(strength: number): string {
  if (strength >= 70) return "bg-destructive"
  if (strength >= 40) return "bg-warning"
  return "bg-muted-foreground"
}

function CatalystRow({ item }: Readonly<{ item: Catalyst }>) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <DirectionIcon dir={item.dir} />
        <span className="text-xs font-medium">{item.name}</span>
        <Badge variant="outline" className="px-1.5 py-0 text-[9px]">
          {item.type}
        </Badge>
        <Badge variant={sentimentBadgeVariant(item.sentiment)} className="px-1.5 py-0 text-[9px]">
          {item.sentiment}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 rounded bg-secondary">
          <div className={`h-1.5 rounded transition-[width] ${strengthBarClass(item.strength)}`} style={{ width: `${item.strength}%` }} />
        </div>
        <span className="w-6 text-right text-[9px] text-muted-foreground tabular-nums">{item.strength}</span>
      </div>
      <p className="line-clamp-1 text-[10px] text-muted-foreground">{item.title}</p>
    </div>
  )
}

/** #28 재료 알림 + 센티먼트 — 방향/강도/감성 표시 (srope catalyst-alerts 이식). */
export function CatalystAlerts() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">재료 알림</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {CATALYSTS.map((item) => (
          <CatalystRow key={item.name} item={item} />
        ))}
      </CardContent>
    </Card>
  )
}
