"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { HERO_SLIDES } from "@/app/templates/bank/_data/hero"

/**
 * 히어로 프로모 캐러셀 — 마스코트는 이미지 대신 슬라이드별 Phosphor 아이콘 +
 * CSS 그라디언트 원형 도형으로 추상 표현한다. 도트 인디케이터로 현재 슬라이드를
 * 표시하고 클릭으로 이동할 수 있다.
 */
export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <section aria-label="프로모 배너" className="relative">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {HERO_SLIDES.map((slide) => {
            const Icon = slide.icon
            return (
              <CarouselItem key={slide.id}>
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-12 sm:px-12 sm:py-16">
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-gradient-to-br blur-2xl",
                      slide.toneClass,
                    )}
                  />
                  <div className="relative z-10 flex flex-col items-start gap-4 sm:max-w-xl">
                    <div className="flex items-center gap-3">
                      <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon size={26} weight="duotone" />
                      </span>
                      <span className="text-sm font-semibold text-primary">{slide.eyebrow}</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">{slide.title}</h1>
                    <p className="text-sm text-pretty text-muted-foreground sm:text-base">{slide.subtitle}</p>
                    <Button asChild>
                      <Link href={slide.ctaHref}>
                        {slide.ctaLabel}
                        <ArrowRightIcon size={16} weight="bold" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>

      <div role="tablist" aria-label="배너 선택" className="mt-3 flex items-center justify-center gap-2">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={current === index}
            aria-label={`${index + 1}번째 배너: ${slide.title}`}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              current === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
            )}
          />
        ))}
      </div>
    </section>
  )
}
