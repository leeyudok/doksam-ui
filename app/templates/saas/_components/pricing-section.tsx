import { CheckIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PRICING_TIERS } from "@/app/templates/saas/_lib/data"

export function PricingSection() {
  return (
    <section className="flex flex-col gap-6">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">팀 규모에 맞는 요금제</h2>
        <p className="text-sm text-muted-foreground">언제든 업그레이드하거나 다운그레이드할 수 있습니다.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {PRICING_TIERS.map((tier) => (
          <Card
            key={tier.name}
            className={cn(
              tier.highlighted && "ring-2 ring-primary",
            )}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{tier.name}</CardTitle>
                {tier.highlighted && (
                  <Badge variant="default" className="text-[10px]">
                    가장 많이 선택
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{tier.description}</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tabular-nums text-foreground">
                  {tier.price === "문의" ? tier.price : `₩${tier.price}`}
                </span>
                <span className="text-xs text-muted-foreground">{tier.period}</span>
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
    </section>
  )
}
