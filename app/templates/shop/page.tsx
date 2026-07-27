import { HeroPromo } from "@/app/templates/shop/_components/hero-promo"
import { ProductGrid } from "@/app/templates/shop/_components/product-grid"

export default function ShopStorefrontPage() {
  return (
    <div className="flex flex-col gap-12 pb-8">
      <HeroPromo />
      <ProductGrid />
    </div>
  )
}
