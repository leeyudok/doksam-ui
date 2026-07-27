"use client"

import { useState } from "react"
import { CheckIcon, SealCheckIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type BillingPeriod = "monthly" | "yearly"

interface PricingTier {
  name: string
  monthlyPrice: number
  description: string
  features: string[]
  highlighted: boolean
  cta: string
}

const TIERS: PricingTier[] = [
  {
    name: "Starter",
    monthlyPrice: 0,
    description: "개인 또는 소규모 팀이 핵심 기능을 가볍게 시작하기 좋습니다.",
    features: ["워크스페이스 1개", "멤버 최대 5명", "기본 대시보드", "커뮤니티 지원"],
    highlighted: false,
    cta: "무료로 시작하기",
  },
  {
    name: "Team",
    monthlyPrice: 29000,
    description: "성장하는 팀에 맞는 자동화와 권한 관리 기능을 제공합니다.",
    features: ["워크스페이스 무제한", "멤버 무제한", "자동화 규칙 50개", "우선 이메일 지원", "감사 로그 30일 보관"],
    highlighted: true,
    cta: "Team 플랜 시작하기",
  },
  {
    name: "Enterprise",
    monthlyPrice: 89000,
    description: "대규모 조직을 위한 전담 지원과 보안 옵션을 제공합니다.",
    features: ["Team 플랜의 모든 기능", "SSO / SCIM 연동", "전담 고객 성공 매니저", "감사 로그 무제한 보관", "99.9% SLA 보장"],
    highlighted: false,
    cta: "영업팀에 문의하기",
  },
]

/** 연 결제 시 적용되는 할인율 — 2개월치를 면제하는 것과 동일한 비율(약 17%). */
const YEARLY_DISCOUNT_RATE = 0.17

function priceFor(tier: PricingTier, period: BillingPeriod): number {
  if (tier.monthlyPrice === 0) return 0
  if (period === "monthly") return tier.monthlyPrice
  return Math.round((tier.monthlyPrice * 12 * (1 - YEARLY_DISCOUNT_RATE)) / 12)
}

/** 3티어 가격 카드 + 월/연 결제 토글(#33). 연간 결제 선택 시 할인율을 배지로 보여주고, 추천 티어는 링 강조 + 배지로 구분한다. */
export function PricingToggleDemo() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly")
  const isYearly = period === "yearly"

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        <Label htmlFor="pricing-billing-toggle" className={cn(!isYearly && "text-foreground", isYearly && "text-muted-foreground")}>
          월간 결제
        </Label>
        <Switch
          id="pricing-billing-toggle"
          checked={isYearly}
          onCheckedChange={(checked) => setPeriod(checked ? "yearly" : "monthly")}
        />
        <Label htmlFor="pricing-billing-toggle" className={cn(isYearly && "text-foreground", !isYearly && "text-muted-foreground")}>
          연간 결제
        </Label>
        <Badge variant="secondary" className="text-success">
          {Math.round(YEARLY_DISCOUNT_RATE * 100)}% 할인
        </Badge>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        {TIERS.map((tier) => (
          <Card key={tier.name} className={cn(tier.highlighted && "ring-2 ring-primary")}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{tier.name}</CardTitle>
                {tier.highlighted && (
                  <Badge variant="default" className="gap-1 text-[10px]">
                    <SealCheckIcon size={12} weight="fill" />
                    추천
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{tier.description}</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tabular-nums text-foreground">
                  {tier.monthlyPrice === 0 ? "무료" : `₩${priceFor(tier, period).toLocaleString()}`}
                </span>
                {tier.monthlyPrice > 0 && <span className="text-xs text-muted-foreground">/ 월 · 멤버당</span>}
              </p>
              <ul className="flex flex-col gap-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckIcon size={16} weight="bold" className="mt-0.5 shrink-0 text-success" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={tier.highlighted ? "default" : "outline"}>
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
