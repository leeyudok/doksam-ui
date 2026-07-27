"use client"

import * as React from "react"
import Link from "next/link"
import { BankIcon, ListIcon, MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BANK_NAME } from "@/app/templates/bank/_data/site"
import { MAIN_NAV_ITEMS, UTILITY_LINKS } from "@/app/templates/bank/_data/nav"

/**
 * 상단 유틸바 + 메인 내비게이션. 데스크톱은 유틸바(로그인/공동인증센터 등) +
 * 메인 메뉴(개인/기업/카드/스마트금융/금융상품) + 검색을 한 줄로 노출하고,
 * 모바일은 로고+검색+햄버거만 남기고 메인 메뉴를 접이식 패널로 축소한다.
 */
export function BankNav() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <header className="flex flex-col border-b border-border bg-card">
      <div className="hidden items-center justify-end gap-4 border-b border-border px-6 py-1.5 text-xs text-muted-foreground sm:flex">
        {UTILITY_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="#top" className="flex items-center gap-2 text-lg font-bold tracking-tight text-primary">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BankIcon size={18} weight="fill" />
          </span>
          {BANK_NAME}
        </Link>

        <nav aria-label="메인 메뉴" className="hidden items-center gap-1 lg:flex">
          {MAIN_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <MagnifyingGlassIcon
              size={16}
              className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              placeholder="검색어를 입력하세요"
              aria-label="사이트 검색"
              className="h-8 w-44 rounded-md border border-border bg-background pr-3 pl-8 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none lg:w-56"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="sm:hidden"
            aria-label="검색"
          >
            <MagnifyingGlassIcon size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="bank-mobile-nav"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <XIcon size={18} /> : <ListIcon size={18} />}
          </Button>
        </div>
      </div>

      <nav
        id="bank-mobile-nav"
        aria-label="메인 메뉴 (모바일)"
        className={cn("flex flex-col gap-1 border-t border-border px-4 py-2 lg:hidden", !menuOpen && "hidden")}
      >
        {MAIN_NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-2 text-xs text-muted-foreground">
          {UTILITY_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
