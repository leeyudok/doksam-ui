import { BottomSection } from "@/app/templates/bank/_components/bottom-section"
import { HeroCarousel } from "@/app/templates/bank/_components/hero-carousel"
import { ProductCategories } from "@/app/templates/bank/_components/product-categories"
import { PromoCards } from "@/app/templates/bank/_components/promo-cards"
import { QuickLinksPanel } from "@/app/templates/bank/_components/quick-links-panel"
import { QuickServiceTabs } from "@/app/templates/bank/_components/quick-service-tabs"
import { TrendingProducts } from "@/app/templates/bank/_components/trending-products"

export default function BankHomePage() {
  return (
    <div className="flex flex-col gap-10">
      <HeroCarousel />
      <QuickServiceTabs />
      <PromoCards />
      <ProductCategories />
      <QuickLinksPanel />
      <TrendingProducts />
      <BottomSection />
    </div>
  )
}
