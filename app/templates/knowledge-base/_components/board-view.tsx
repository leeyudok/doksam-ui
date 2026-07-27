import {
  ArchiveIcon,
  CalendarBlankIcon,
  FlaskIcon,
  LightbulbIcon,
  MagnifyingGlassIcon,
  TagIcon,
} from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import { BOARD_CARDS, BOARD_COLUMNS, type BoardColumn, type CardStatus } from "../_data/board"

const COLUMN_ICON: Record<BoardColumn["icon"], typeof MagnifyingGlassIcon> = {
  MagnifyingGlassIcon,
  LightbulbIcon,
  FlaskIcon,
  ArchiveIcon,
}

const STATUS_STYLE: Record<CardStatus, string> = {
  신규: "border-chart-2/40 bg-chart-2/10 text-chart-2",
  검토중: "border-chart-4/40 bg-chart-4/10 text-chart-4",
  채택: "border-success/40 bg-success/10 text-success",
  보류: "border-border bg-muted text-muted-foreground",
}

/**
 * 보드 탭 — 카테고리 4칼럼 칸반풍 레이아웃(드래그 없음). 각 카드에 상태 배지 ·
 * 태그 · 날짜를 얹어 원본보다 시각 밀도를 높였다. 모바일 1열 → md 2열 → xl 4열로
 * 스택되며 가로 오버플로우가 없다.
 */
export function BoardView() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {BOARD_COLUMNS.map((column) => {
        const cards = BOARD_CARDS.filter((card) => card.column === column.id)
        const Icon = COLUMN_ICON[column.icon]
        return (
          <section
            key={column.id}
            aria-label={column.label}
            className={cn("flex min-w-0 flex-col gap-3 rounded-lg border border-t-2 border-border bg-muted/30 p-3", column.accent)}
          >
            <header className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <Icon size={16} weight="bold" className="text-muted-foreground" aria-hidden />
              {column.label}
              <span className="ml-auto rounded-full bg-background px-2 py-0.5 font-mono text-[10px] font-normal text-muted-foreground ring-1 ring-border">
                {cards.length}
              </span>
            </header>

            <div className="flex flex-col gap-2.5">
              {cards.map((card) => (
                <article
                  key={card.id}
                  className="group flex min-w-0 flex-col gap-2 rounded-md border border-border bg-card p-3 transition-colors hover:border-primary/40 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                      {card.title}
                    </h4>
                    <span
                      className={cn(
                        "shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-medium",
                        STATUS_STYLE[card.status]
                      )}
                    >
                      {card.status}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{card.summary}</p>
                  <div className="flex flex-wrap items-center gap-1">
                    {card.tags.map((tag) => (
                      <Badge key={tag} variant="ghost" className="gap-1 text-[10px] text-muted-foreground">
                        <TagIcon size={10} aria-hidden />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 border-t border-border/60 pt-2 font-mono text-[10px] text-muted-foreground">
                    <CalendarBlankIcon size={11} aria-hidden />
                    {card.date}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
