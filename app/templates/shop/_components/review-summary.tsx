import { StarIcon } from "@phosphor-icons/react/dist/ssr"

import { Progress } from "@/components/ui/progress"
import type { ReviewSummary } from "@/app/templates/shop/_lib/data"

/** 리뷰 요약 — 평균 별점 + 별점별 분포 막대. */
export function ReviewSummaryPanel({ reviews }: Readonly<{ reviews: ReviewSummary }>) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
      <div className="flex flex-col items-center gap-1">
        <p className="text-3xl font-bold tabular-nums text-foreground">{reviews.average.toFixed(1)}</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon
              key={i}
              size={14}
              weight="fill"
              className={i < Math.round(reviews.average) ? "text-warning" : "text-muted"}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">리뷰 {reviews.count.toLocaleString()}개</p>
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        {reviews.breakdown.map((percent, index) => {
          const star = 5 - index
          return (
            <div key={star} className="flex items-center gap-2">
              <span className="w-8 shrink-0 text-xs text-muted-foreground">{star}점</span>
              <Progress value={percent} className="h-1.5" />
              <span className="w-9 shrink-0 text-right text-xs tabular-nums text-muted-foreground">{percent}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
