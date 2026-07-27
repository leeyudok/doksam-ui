"use client"

import * as React from "react"
import Link from "next/link"
import {
  ChartLineUpIcon,
  ListIcon,
  MagnifyingGlassIcon,
  NewspaperIcon,
  SignInIcon,
  WalletIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/** "누리증권" — 실존 증권사와 무관한 가상 브랜드명(app/templates/brokerage 전용, #41). */
const BROKERAGE_NAME = "누리증권"

const MAIN_NAV_ITEMS = [
  { href: "#home", label: "홈", icon: ChartLineUpIcon },
  { href: "#feed", label: "피드", icon: NewspaperIcon },
  { href: "#screener", label: "주식 골라보기", icon: MagnifyingGlassIcon },
  { href: "#account", label: "내 계좌", icon: WalletIcon },
] as const

/**
 * 증권 마켓 홈 상단 내비게이션(#41-A). 로고 + 메인 메뉴(홈/피드/주식
 * 골라보기/내 계좌) + 종목 검색바 + 로그인 버튼을 한 줄로 노출하고, 모바일은
 * 로고+검색+햄버거만 남기고 메인 메뉴를 접이식 패널로 축소한다.
 */
export function BrokerageNav() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <header className="flex flex-col border-b border-border bg-card">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="#top" className="flex items-center gap-2 text-lg font-bold tracking-tight text-primary">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ChartLineUpIcon size={18} weight="fill" />
          </span>
          {BROKERAGE_NAME}
        </Link>

        <nav aria-label="메인 메뉴" className="hidden items-center gap-1 lg:flex">
          {MAIN_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <item.icon size={15} />
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
              placeholder="종목명·코드 검색"
              aria-label="종목 검색"
              className="h-8 w-44 rounded-md border border-border bg-background pr-3 pl-8 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none lg:w-56"
            />
          </div>
          <Button variant="outline" size="icon" className="sm:hidden" aria-label="검색">
            <MagnifyingGlassIcon size={16} />
          </Button>
          <Button variant="default" size="sm" className="hidden sm:inline-flex">
            <SignInIcon size={14} data-icon="inline-start" />
            로그인
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="brokerage-mobile-nav"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <XIcon size={18} /> : <ListIcon size={18} />}
          </Button>
        </div>
      </div>

      <nav
        id="brokerage-mobile-nav"
        aria-label="메인 메뉴 (모바일)"
        className={cn("flex flex-col gap-1 border-t border-border px-4 py-2 lg:hidden", !menuOpen && "hidden")}
      >
        {MAIN_NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            onClick={() => setMenuOpen(false)}
          >
            <item.icon size={15} />
            {item.label}
          </Link>
        ))}
        <Button variant="default" size="sm" className="mt-1 justify-center sm:hidden">
          <SignInIcon size={14} data-icon="inline-start" />
          로그인
        </Button>
      </nav>
    </header>
  )
}
