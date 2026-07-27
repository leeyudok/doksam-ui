import Link from "next/link"
import { ArrowRightIcon, PlayCircleIcon, SparkleIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PRODUCT_NAME } from "@/app/templates/saas/_lib/data"

/**
 * 히어로 — 외부 이미지 대신 CSS 그라디언트/도형만으로 시각적 무게를 만든다
 * (폐쇄망 대응: 외부 URL 금지 규칙).
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-16 sm:px-12 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-gradient-to-br from-primary/30 to-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-gradient-to-tr from-accent/20 to-primary/5 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <Badge variant="secondary" className="gap-1.5">
          <SparkleIcon size={12} weight="fill" />
          {PRODUCT_NAME} 2.0 출시
        </Badge>

        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          팀의 업무 흐름을 하나의 워크스페이스로
        </h1>

        <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
          {PRODUCT_NAME}는 문서, 태스크, 대화를 한곳에 모아 팀이 도구를 오가며 낭비하는 시간을 줄여줍니다.
          지금 바로 무료로 시작해보세요.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/templates/saas/dashboard">
              무료로 시작하기
              <ArrowRightIcon size={16} weight="bold" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/templates/saas/feed">
              <PlayCircleIcon size={16} weight="regular" />
              제품 소개 보기
            </Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">신용카드 등록 없이 시작 · 언제든 해지 가능</p>
      </div>
    </section>
  )
}
