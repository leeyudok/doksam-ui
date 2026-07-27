import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface CategoryItem {
  label: string
  value: string | number
}

export interface CategoryCardProps {
  /** 카테고리 라벨. */
  label: string
  /** 전체 합계. */
  total: number
  icon?: React.ReactNode
  /** 값/아이콘 색 클래스(기본 text-primary — 시맨틱 토큰만). */
  color?: string
  /** 하위 항목 리스트. */
  items: CategoryItem[]
  className?: string
}

/**
 * 카테고리 그룹핑 카드 — 아이콘 + 라벨 + 합계 + 하위 항목 리스트.
 * 분류별 집계(부서별 인원, 유형별 건수 등)에 쓴다(srope customs/category-card 이식).
 */
export function CategoryCard({ label, total, icon, color = "text-primary", items, className }: CategoryCardProps) {
  return (
    <Card className={cn("py-0", className)}>
      <CardContent className="px-3 py-2.5">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {icon ? <span className={color}>{icon}</span> : null}
            <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
          </div>
          <span className={cn("text-base font-black tabular-nums", color)}>{total.toLocaleString()}</span>
        </div>
        <ul className="flex flex-col gap-0.5">
          {items.map((item) => (
            <li
              key={item.label}
              className="-mx-1 flex items-center justify-between rounded px-1 text-[10px] transition-colors hover:bg-accent/50"
            >
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium tabular-nums">
                {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
