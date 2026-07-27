"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ProductVisual } from "@/app/templates/shop/_components/product-visual"
import type { CategoryKey } from "@/app/templates/shop/_lib/data"

interface ProductGalleryProps {
  category: CategoryKey
  slideCount: number
}

/** 상품상세 이미지 캐러셀 — 슬라이드마다 ProductVisual을 다른 시드로 렌더한다. */
export function ProductGallery({ category, slideCount }: Readonly<ProductGalleryProps>) {
  const slides = Array.from({ length: slideCount }, (_, i) => i)

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {slides.map((seed) => (
          <CarouselItem key={seed}>
            <ProductVisual category={category} seed={seed} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {slideCount > 1 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  )
}
