"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/components/i18n-provider"
import { COMPONENT_REGISTRY } from "@/lib/showcase/registry"
import {
  COMPONENT_CATEGORY_LABEL,
  COMPONENT_CATEGORY_ORDER,
  type ComponentCategory,
  type ComponentLayer,
} from "@/lib/showcase/types"
import { cn } from "@/lib/utils"

type LayerFilter = "all" | ComponentLayer

const FILTERS: { value: LayerFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "primitive", label: "Primitive" },
  { value: "composition", label: "Composition" },
]

const primitiveCount = COMPONENT_REGISTRY.filter((e) => e.layer === "primitive").length
const compositionCount = COMPONENT_REGISTRY.filter((e) => e.layer === "composition").length

export default function ComponentsPage() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<LayerFilter>("all")

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Components
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">{t("page.components.title", "컴포넌트 카탈로그")}</h1>
        <p className="max-w-prose text-sm text-muted-foreground">
          {t(
            "page.components.description",
            "전체 {total}종을 조립 계층으로 나눴습니다. Primitive({primitive}, shadcn)는 shadcn/ui가 제공하는 저수준 빌딩블록, Composition({composition}, doksam)은 그 프리미티브를 조합한 doksam 자체 컴포넌트입니다. 카드의 배지가 출처를 나타냅니다.",
            { total: COMPONENT_REGISTRY.length, primitive: primitiveCount, composition: compositionCount },
          )}
        </p>
      </section>

      <div
        role="tablist"
        aria-label={t("page.components.filter-aria", "계층 필터")}
        className="flex w-fit items-center gap-1 rounded-lg border border-border bg-card p-1"
      >
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            role="tab"
            aria-selected={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              filter === f.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {f.value === "all" ? t("page.components.filter-all", f.label) : f.label}
          </button>
        ))}
      </div>

      {COMPONENT_CATEGORY_ORDER.map((category) => (
        <CategorySection key={category} category={category} filter={filter} />
      ))}
    </div>
  )
}

function CategorySection({
  category,
  filter,
}: Readonly<{ category: ComponentCategory; filter: LayerFilter }>) {
  const { t } = useI18n()
  const entries = COMPONENT_REGISTRY.filter(
    (entry) => entry.category === category && (filter === "all" || entry.layer === filter),
  )

  if (entries.length === 0) return null

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">
        {t(`label.category.${category}`, COMPONENT_CATEGORY_LABEL[category])}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Link key={entry.slug} href={`/components/${entry.slug}`} className="group">
            <Card className="h-full transition-colors group-hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge
                    variant={entry.layer === "composition" ? "default" : "secondary"}
                    className="font-mono text-[10px]"
                    title={
                      entry.layer === "composition"
                        ? t("page.components.badge-composition", "doksam 확장 — 프리미티브를 조합한 자체 컴포넌트")
                        : t("page.components.badge-primitive", "shadcn/ui 프리미티브")
                    }
                  >
                    {entry.layer === "composition" ? "doksam" : "shadcn"}
                  </Badge>
                  <ArrowRightIcon
                    size={16}
                    weight="regular"
                    className="text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  />
                </div>
                <CardTitle>{entry.title}</CardTitle>
                <CardDescription>{t(`component.${entry.slug}.description`, entry.description)}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
