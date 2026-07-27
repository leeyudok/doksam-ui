import { cn } from "@/lib/utils"
import { categoryOf, type CategoryKey } from "@/app/templates/shop/_lib/data"

interface ProductVisualProps {
  category: CategoryKey
  /** 같은 카테고리 안에서도 슬라이드마다 다른 각도/위치를 만들기 위한 시드. */
  seed?: number
  className?: string
}

/**
 * 상품 이미지 대체용 CSS 그라디언트 + 도형 + 카테고리 아이콘 비주얼.
 * 폐쇄망 대응 규칙(상품이미지 외부 URL 금지)에 따라 실제 사진 대신 이
 * 컴포넌트로 카드/캐러셀 슬라이드를 채운다 — 하드코딩 색 없이 카테고리별
 * chart 토큰 그라디언트만 사용한다.
 */
export function ProductVisual({ category, seed = 0, className }: Readonly<ProductVisualProps>) {
  const { icon: Icon, toneClass } = categoryOf(category)
  const rotate = ((seed * 37) % 24) - 12
  const offsetX = ((seed * 19) % 20) - 10
  const offsetY = ((seed * 11) % 20) - 10

  return (
    <div
      className={cn(
        "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-muted",
        className,
      )}
    >
      <div
        aria-hidden
        className={cn("absolute size-[70%] rounded-[38%] bg-gradient-to-br blur-md", toneClass)}
        style={{ transform: `rotate(${rotate}deg) translate(${offsetX}%, ${offsetY}%)` }}
      />
      <div
        aria-hidden
        className={cn("absolute size-[45%] rounded-full bg-gradient-to-tr opacity-70", toneClass)}
        style={{ transform: `translate(${-offsetX * 0.6}%, ${-offsetY * 0.6}%)` }}
      />
      <Icon size={40} weight="duotone" className="relative z-10 text-foreground/70" />
    </div>
  )
}
