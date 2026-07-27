"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChatCircleTextIcon, GearIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

const TABS = [
  { href: "/templates/chat", label: "대화", icon: ChatCircleTextIcon },
  { href: "/templates/chat/settings", label: "설정", icon: GearIcon },
] as const

/** Chat 템플릿 내부 탭 — 대화 화면/설정 화면 전환. */
export function ChatNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Chat 템플릿 내비게이션" className="flex w-fit items-center gap-1 rounded-lg border border-border bg-card p-1">
      {TABS.map(({ href, label, icon: Icon }) => {
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
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
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
