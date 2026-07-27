"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCartSimpleIcon, StorefrontIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { CART_LINES } from "@/app/templates/shop/_lib/data"

const TABS = [
  { href: "/templates/shop", label: "스토어", icon: StorefrontIcon },
  { href: "/templates/shop/cart", label: "장바구니", icon: ShoppingCartSimpleIcon },
] as const

/**
 * Shop 템플릿 페이지(스토어/장바구니) 간 이동 탭.
 * 템플릿 자체 데모용 내비게이션이며, 사이드바(components/site-sidebar.tsx)와는
 * 별개다 — 그쪽은 상위 배선이라 이 이슈 범위에서 건드리지 않는다.
 */
export function ShopNav() {
  const pathname = usePathname()
  const cartCount = CART_LINES.reduce((sum, line) => sum + line.quantity, 0)

  return (
    <nav
      aria-label="Shop 템플릿 페이지"
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
            {tab.href === "/templates/shop/cart" && cartCount > 0 && (
              <span
                className={cn(
                  "flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold tabular-nums",
                  active ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground",
                )}
              >
                {cartCount}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
