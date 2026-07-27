import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { PROMO_CARDS } from "@/app/templates/bank/_data/promos"

export function PromoCards() {
  return (
    <section aria-label="프로모션" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {PROMO_CARDS.map((promo) => (
        <Link key={promo.id} href={promo.href}>
          <Card className="h-full transition-colors hover:bg-muted/40">
            <CardContent className="flex flex-col gap-2">
              <Badge variant={promo.badge === "EVENT" ? "default" : "secondary"} className="w-fit">
                {promo.badge}
              </Badge>
              <h3 className="text-base font-semibold text-foreground">{promo.title}</h3>
              <p className="text-sm text-muted-foreground">{promo.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </section>
  )
}
