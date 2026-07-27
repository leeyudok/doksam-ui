"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChartLineUpIcon, RocketLaunchIcon, StackIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

const TABS = [
  { href: "/templates/saas", label: "랜딩", icon: RocketLaunchIcon },
  { href: "/templates/saas/dashboard", label: "대시보드", icon: ChartLineUpIcon },
  { href: "/templates/saas/feed", label: "피드", icon: StackIcon },
] as const

/**
 * SaaS 템플릿 3페이지(랜딩/대시보드/피드) 간 이동 탭.
 * 템플릿 자체 데모용 내비게이션이며, 사이드바(components/site-sidebar.tsx)와는
 * 별개다 — 그쪽은 상위 배선이라 이 이슈 범위에서 건드리지 않는다.
 */
export function TemplateNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="SaaS 템플릿 페이지"
      className="flex w-fit items-center gap-1 rounded-lg border border-border bg-card p-1"
    >
      {TABS.map((tab) => {
        const active = pathname === tab.href
        const Icon = tab.icon
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon size={16} weight={active ? "duotone" : "regular"} />
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
