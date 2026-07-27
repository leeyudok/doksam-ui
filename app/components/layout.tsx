import type { ReactNode } from "react";

import { CatalogShell } from "@/components/showcase/catalog-shell";
import { COMPONENT_REGISTRY } from "@/lib/showcase/registry";
import { COMPONENT_CATEGORY_LABEL, COMPONENT_CATEGORY_ORDER } from "@/lib/showcase/types";

// 카테고리 순서대로 그룹핑 — 아이콘 등 non-serializable 값은 내려보내지 않는다.
const GROUPS = COMPONENT_CATEGORY_ORDER.map((category) => ({
  label: COMPONENT_CATEGORY_LABEL[category],
  labelKey: `label.category.${category}`,
  links: COMPONENT_REGISTRY.filter((e) => e.category === category).map((e) => ({
    href: `/components/${e.slug}`,
    label: e.title,
  })),
}));

export default function ComponentsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <CatalogShell indexHref="/components" indexLabel="전체 보기" groups={GROUPS}>
      {children}
    </CatalogShell>
  );
}
