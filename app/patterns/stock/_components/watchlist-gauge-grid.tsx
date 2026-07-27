import { EyeIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface WatchItem {
  name: string
  active: boolean
  gaugeValue: number
  tags: string[]
  causeLabel: string
  causeTone: "success" | "destructive"
  causeDescription: string
}

const WATCHLIST: WatchItem[] = [
  {
    name: "포스코퓨처엠",
    active: true,
    gaugeValue: 78,
    tags: ["재료 85", "외인 매수"],
    causeLabel: "재료활성",
    causeTone: "success",
    causeDescription: "양극재 수요 회복 기대",
  },
  {
    name: "에코프로비엠",
    active: true,
    gaugeValue: 45,
    tags: ["재료 40", "외인 매도"],
    causeLabel: "외인매도",
    causeTone: "destructive",
    causeDescription: "실적 대비 밸류에이션 부담",
  },
  {
    name: "LG화학",
    active: false,
    gaugeValue: 20,
    tags: ["재료 15", "외인 중립"],
    causeLabel: "재료소멸",
    causeTone: "destructive",
    causeDescription: "배터리 분사 영향 관망",
  },
]

function WatchCard({ item }: Readonly<{ item: WatchItem }>) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-1.5">
          <EyeIcon size={14} className={item.active ? "text-success" : "text-muted-foreground"} />
          <span className="text-xs font-medium">{item.name}</span>
        </div>
        <Badge variant={item.active ? "default" : "outline"} className="px-1.5 py-0 text-[9px]">
          {item.active ? "활성" : "만료"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <Progress value={item.gaugeValue} className="h-1.5" />
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-1.5 py-0 text-[9px]">
              {tag}
            </Badge>
          ))}
        </div>
        <p className={`text-[10px] font-medium ${item.causeTone === "success" ? "text-success" : "text-destructive"}`}>
          {item.causeLabel} · {item.causeDescription}
        </p>
      </CardContent>
    </Card>
  )
}

/** #31 워치리스트 카드 — 게이지 + 원인 태그 + 활성/만료 상태. */
export function WatchlistGaugeGrid() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {WATCHLIST.map((item) => (
        <WatchCard key={item.name} item={item} />
      ))}
    </div>
  )
}
