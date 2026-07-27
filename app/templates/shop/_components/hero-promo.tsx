import Link from "next/link"
import { ArrowRightIcon, SparkleIcon, TagIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { STORE_NAME } from "@/app/templates/shop/_lib/data"

/**
 * 히어로/프로모 — 외부 이미지 대신 CSS 그라디언트/도형만으로 시각적 무게를 만든다
 * (폐쇄망 대응: 외부 URL 금지 규칙). app/templates/saas/_components/hero-section.tsx 와
 * 동일한 기법.
 */
export function HeroPromo() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-14 sm:px-12 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-gradient-to-br from-primary/30 to-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-14 size-72 rounded-full bg-gradient-to-tr from-accent/20 to-primary/5 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <Badge variant="secondary" className="gap-1.5">
          <SparkleIcon size={12} weight="fill" />
          여름 시즌 프로모션 진행 중
        </Badge>

        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {STORE_NAME}에서 오늘의 스타일을 찾아보세요
        </h1>

        <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
          의류부터 신발, 가방, 전자기기까지 — 엄선한 상품을 합리적인 가격에 만나보세요. 5만원 이상 구매 시 배송비가
          무료입니다.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="#product-grid">
              전체 상품 보기
              <ArrowRightIcon size={16} weight="bold" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/templates/shop/cart">
              <TagIcon size={16} weight="regular" />
              장바구니 확인
            </Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">전 상품 무료 교환 · 30일 이내 반품 가능</p>
      </div>
    </section>
  )
}
