import Link from "next/link"
import { StarIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ProductVisual } from "@/app/templates/shop/_components/product-visual"
import { discountPercent, type Product } from "@/app/templates/shop/_lib/data"

const BADGE_VARIANT: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  신상품: "secondary",
  베스트: "default",
  세일: "destructive",
  품절임박: "outline",
}

export function ProductCard({ product }: Readonly<{ product: Product }>) {
  const percentOff = discountPercent(product)
  const soldOut = product.stock === 0

  return (
    <Card className="group h-full py-0 has-data-[slot=card-footer]:pb-0">
      <Link href={`/templates/shop/product/${product.id}`} className="flex h-full flex-col">
        <div className="relative">
          <ProductVisual category={product.category} className="rounded-b-none" />
          {soldOut && (
            <div className="absolute inset-0 flex items-center justify-center rounded-t-xl bg-background/70">
              <Badge variant="outline" className="bg-card">
                품절
              </Badge>
            </div>
          )}
          {product.badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {product.badges.map((badge) => (
                <Badge key={badge} variant={BADGE_VARIANT[badge]} className="text-[10px]">
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <CardContent className="flex flex-1 flex-col gap-1.5 py-3">
          <p className="line-clamp-1 text-sm font-medium text-foreground">{product.name}</p>
          <p className="line-clamp-1 text-xs text-muted-foreground">{product.shortDescription}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <StarIcon size={12} weight="fill" className="text-warning" />
            <span className="font-medium text-foreground">{product.reviews.average.toFixed(1)}</span>
            <span>({product.reviews.count})</span>
          </div>
        </CardContent>

        <CardFooter className="flex-col items-start gap-0.5 border-t-0 bg-transparent pb-3">
          {percentOff !== undefined && product.originalPrice && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-destructive">{percentOff}%</span>
              <span className="text-xs text-muted-foreground line-through">
                {product.originalPrice.toLocaleString()}원
              </span>
            </div>
          )}
          <span className="text-base font-bold tabular-nums text-foreground">
            {product.price.toLocaleString()}원
          </span>
        </CardFooter>
      </Link>
    </Card>
  )
}
