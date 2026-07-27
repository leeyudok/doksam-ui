import type { ReactNode } from "react";

import { CatalogShell } from "@/components/showcase/catalog-shell";
import { PATTERN_REGISTRY, PATTERN_SCOPE_LABEL, PATTERN_SCOPE_ORDER } from "@/lib/patterns/registry";

const GROUPS = PATTERN_SCOPE_ORDER.map((scope) => ({
  label: PATTERN_SCOPE_LABEL[scope],
  labelKey: `label.scope.${scope}`,
  links: PATTERN_REGISTRY.filter((e) => e.scope === scope).map((e) => ({
    href: `/patterns/${e.slug}`,
    label: e.title,
    labelKey: `pattern.${e.slug}.title`,
  })),
}));

export default function PatternsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <CatalogShell indexHref="/patterns" indexLabel="전체 보기" groups={GROUPS}>
      {children}
    </CatalogShell>
  );
}
