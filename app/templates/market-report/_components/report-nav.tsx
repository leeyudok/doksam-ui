"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarBlankIcon, NewspaperIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/templates/market-report", label: "데일리", icon: NewspaperIcon },
  { href: "/templates/market-report/weekly", label: "주간", icon: CalendarBlankIcon },
] as const

/** 마켓 리포트 템플릿 내부 탭 — 데일리/주간 리포트 전환(usePathname 활성). */
export function ReportNav() {
  const pathname = usePathname()

  return (
    <nav
      className="flex flex-wrap items-center gap-1 overflow-x-auto border-b border-border pb-2"
      aria-label="마켓 리포트 내비게이션"
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
