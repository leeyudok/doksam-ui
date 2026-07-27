import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProductGallery } from "@/app/templates/shop/_components/product-gallery"
import { ProductOptions } from "@/app/templates/shop/_components/product-options"
import { ReviewSummaryPanel } from "@/app/templates/shop/_components/review-summary"
import { categoryOf, discountPercent, getProduct, listProductIds } from "@/app/templates/shop/_lib/data"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return listProductIds().map((id) => ({ id }))
}

export async function generateMetadata({ params }: Readonly<ProductPageProps>): Promise<Metadata> {
  const { id } = await params
  const product = getProduct(id)
  return { title: product ? `${product.name} · Shop 템플릿` : "상품 상세 · Shop 템플릿" }
}

/** #30 상품상세 — carousel(이미지) + 옵션·수량 + 리뷰 요약. */
export default async function ShopProductPage({ params }: Readonly<ProductPageProps>) {
  const { id } = await params
  const product = getProduct(id)

  if (!product) {
    notFound()
  }

  const category = categoryOf(product.category)
  const percentOff = discountPercent(product)

  return (
    <div className="flex flex-col gap-10 pb-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ProductGallery category={product.category} slideCount={product.gallerySlides} />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="outline" className="gap-1 text-[10px]">
                <category.icon size={11} weight="regular" />
                {category.label}
              </Badge>
              {product.badges.map((badge) => (
                <Badge key={badge} variant="secondary" className="text-[10px]">
                  {badge}
                </Badge>
              ))}
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>
            <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
          </div>

          <div className="flex items-baseline gap-2">
            {percentOff !== undefined && product.originalPrice && (
              <>
                <span className="text-lg font-semibold text-destructive">{percentOff}%</span>
                <span className="text-base text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString()}원
                </span>
              </>
            )}
            <span className="text-3xl font-bold tabular-nums text-foreground">
              {product.price.toLocaleString()}원
            </span>
          </div>

          <Separator />

          <ProductOptions product={product} />
        </div>
      </div>

      <Separator />

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold tracking-tight">상품 설명</h2>
        <p className="max-w-prose text-sm text-pretty text-muted-foreground">{product.description}</p>
      </section>

      <Separator />

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold tracking-tight">리뷰</h2>
        <ReviewSummaryPanel reviews={product.reviews} />
      </section>
    </div>
  )
}
