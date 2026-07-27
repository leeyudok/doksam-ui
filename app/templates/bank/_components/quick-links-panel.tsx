"use client"

import * as React from "react"
import Link from "next/link"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  DEFAULT_QUICK_LINK_GROUP,
  QUICK_LINK_GROUPS,
  type QuickLinkGroupKey,
} from "@/app/templates/bank/_data/quick-links"

/** 바로바로서비스 — "예금"/"카드" 토글에 따라 아래 퀵링크 목록이 바뀐다. */
export function QuickLinksPanel() {
  const [group, setGroup] = React.useState<QuickLinkGroupKey>(DEFAULT_QUICK_LINK_GROUP)
  const active = QUICK_LINK_GROUPS[group]

  return (
    <section aria-label="바로바로서비스" className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">바로바로서비스</h2>
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          value={group}
          onValueChange={(value) => value && setGroup(value as QuickLinkGroupKey)}
          aria-label="바로바로서비스 카테고리"
        >
          {(Object.keys(QUICK_LINK_GROUPS) as QuickLinkGroupKey[]).map((key) => (
            <ToggleGroupItem key={key} value={key} aria-label={QUICK_LINK_GROUPS[key].label}>
              {QUICK_LINK_GROUPS[key].label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {active.links.map((link) => {
          const Icon = link.icon
          return (
            <li key={link.key}>
              <Link
                href={link.href}
                className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Icon size={18} className="text-primary" />
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
