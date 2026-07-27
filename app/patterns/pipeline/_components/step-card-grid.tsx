import type { ReactNode } from "react"
import { CloudArrowDownIcon, ChartBarIcon, FileTextIcon, CheckCircleIcon, SpinnerGapIcon, XCircleIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const CATEGORIES = [
  { label: "크롤러", icon: <CloudArrowDownIcon size={14} />, count: 4 },
  { label: "분석", icon: <ChartBarIcon size={14} />, count: 3 },
  { label: "렌더링", icon: <FileTextIcon size={14} />, count: 2 },
] as const

type StepStatus = "done" | "running" | "error" | "idle"

interface StepItem {
  name: string
  description: string
  status: StepStatus
  elapsed?: string
  count?: number
  errorMessage?: string
}

const STEP_ITEMS: StepItem[] = [
  { name: "시세 수집", description: "네이버 API로 종목 현재가 수집", status: "done", elapsed: "2.3s", count: 1282 },
  { name: "뉴스 수집", description: "네이버 뉴스 API 크롤링", status: "running", elapsed: "5.1s", count: 45 },
  { name: "유튜브 수집", description: "유튜브 채널 최신 영상 수집", status: "error", elapsed: "0.8s", count: 0, errorMessage: "API timeout" },
  { name: "NLP 분석", description: "뉴스 감성분석 + 키워드 추출", status: "idle" },
]

function statusIcon(status: StepStatus): ReactNode {
  if (status === "done") return <CheckCircleIcon size={16} weight="fill" className="text-success" />
  if (status === "running") return <SpinnerGapIcon size={16} className="animate-spin text-chart-1" />
  if (status === "error") return <XCircleIcon size={16} weight="fill" className="text-destructive" />
  return null
}

function StepItemCard({ item }: Readonly<{ item: StepItem }>) {
  return (
    <Card>
      <CardContent className="space-y-1 p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium">{item.name}</span>
          {statusIcon(item.status)}
        </div>
        <p className="text-[10px] text-muted-foreground">{item.description}</p>
        {item.status === "error" ? (
          <p className="text-[10px] text-destructive">{item.errorMessage}</p>
        ) : (
          item.elapsed && (
            <p className="text-[10px] text-muted-foreground tabular-nums">
              {item.elapsed} · {item.count?.toLocaleString()}건
            </p>
          )
        )}
      </CardContent>
    </Card>
  )
}

/** #36 스텝 카드 그리드 — 카테고리 배지 + 카테고리별 스텝 카드 (srope StepCardGrid 이식). */
export function StepCardGrid() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {CATEGORIES.map((cat, i) => (
          <Badge key={cat.label} variant={i === 0 ? "default" : "secondary"} className="text-xs">
            {cat.icon}
            <span className="ml-1">{cat.label}</span>
            <span className="ml-1 text-[9px] opacity-70">({cat.count})</span>
          </Badge>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {STEP_ITEMS.map((item) => (
          <StepItemCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  )
}
