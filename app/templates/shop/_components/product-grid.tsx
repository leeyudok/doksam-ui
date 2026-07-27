"use client"

import { useMemo, useState } from "react"

import { cn } from "@/lib/utils"
import { ProductCard } from "@/app/templates/shop/_components/product-card"
import { CATEGORIES, PRODUCTS, type CategoryKey } from "@/app/templates/shop/_lib/data"

/**
 * 카테고리 faceted 필터(components/patterns/faceted-filter 기법) + 상품 그리드.
 * 모바일 1열 → 데스크톱 다열로 처음부터 반응형이다.
 */
export function ProductGrid() {
  const [category, setCategory] = useState<CategoryKey | "">("")

  const filtered = useMemo(
    () => (category === "" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)),
    [category],
  )

  return (
    <section id="product-grid" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">전체 상품</h2>
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1" role="group" aria-label="카테고리 필터">
          <FacetChip active={category === ""} onClick={() => setCategory("")}>
            전체
            <CountBadge active={category === ""}>{PRODUCTS.length}</CountBadge>
          </FacetChip>
          {CATEGORIES.map((c) => {
            const Icon = c.icon
            const count = PRODUCTS.filter((p) => p.category === c.key).length
            return (
              <FacetChip key={c.key} active={category === c.key} onClick={() => setCategory(c.key)}>
                <Icon size={13} weight={category === c.key ? "fill" : "regular"} />
                {c.label}
                <CountBadge active={category === c.key}>{count}</CountBadge>
              </FacetChip>
            )
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          해당 카테고리에 상품이 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

function FacetChip({
  active,
  onClick,
  children,
}: Readonly<{ active: boolean; onClick: () => void; children: React.ReactNode }>) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-transparent bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:bg-accent",
      )}
    >
      {children}
    </button>
  )
}

function CountBadge({ active, children }: Readonly<{ active: boolean; children: React.ReactNode }>) {
  return (
    <span className={cn("font-mono text-[10px]", active ? "text-primary-foreground/80" : "text-muted-foreground")}>
      {children}
    </span>
  )
}
