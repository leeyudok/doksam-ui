"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChartLineUpIcon, ListMagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/templates/trading", label: "대시보드", icon: ChartLineUpIcon },
  { href: "/templates/trading/watchlist", label: "관심종목", icon: ListMagnifyingGlassIcon },
] as const

/** 트레이딩 템플릿 내부 탭 — 대시보드/관심종목 전환. 종목상세는 각 목록에서 진입한다. */
export function TradingNav() {
  const pathname = usePathname()

  return (
    <nav
      className="flex flex-wrap items-center gap-1 overflow-x-auto border-b border-border pb-2"
      aria-label="트레이딩 템플릿 내비게이션"
    >
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground",
            )}
          >
            <Icon size={14} weight={active ? "duotone" : "regular"} />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
