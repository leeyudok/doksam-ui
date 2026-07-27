import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { BOTTOM_QUICK_ACTIONS, NEWS_ITEMS } from "@/app/templates/bank/_data/news"

export function BottomSection() {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-[auto_1fr]">
      <div aria-label="퀵액션" className="grid grid-cols-4 gap-3 sm:grid-cols-2 sm:gap-4">
        {BOTTOM_QUICK_ACTIONS.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.key}
              href={action.href}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 text-center transition-colors hover:bg-muted/60 sm:w-28"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <Icon size={20} />
              </span>
              <span className="text-xs font-medium text-foreground">{action.label}</span>
            </Link>
          )
        })}
      </div>

      <Card>
        <CardContent className="flex flex-col gap-1">
          <h2 className="mb-2 text-base font-semibold tracking-tight text-foreground">새소식</h2>
          <ul className="flex flex-col divide-y divide-border">
            {NEWS_ITEMS.map((news) => (
              <li key={news.id}>
                <Link
                  href="#news"
                  className="flex items-center justify-between gap-3 py-2.5 text-sm transition-colors hover:text-primary"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {news.category}
                    </span>
                    <span className="truncate text-foreground">{news.title}</span>
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">{news.date}</span>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
