import type { ReactNode } from "react";

import { CatalogSidebar, type SidebarGroup } from "@/components/showcase/catalog-sidebar";

/**
 * 카탈로그 섹션 공용 셸 — lg 이상에서 좌측 sticky 사이드바 + 본문 그리드.
 * lg 미만은 사이드바를 숨기고 본문 풀폭(탐색은 톱네브 햄버거·커맨드 메뉴).
 */
export function CatalogShell({
  indexHref,
  indexLabel,
  groups,
  children,
}: Readonly<{ indexHref: string; indexLabel: string; groups: SidebarGroup[]; children: ReactNode }>) {
  return (
    <div className="lg:grid lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-10">
      <aside className="hidden lg:block">
        <div className="sticky top-14 -ml-2.5 max-h-[calc(100vh-3.5rem)] overflow-y-auto py-2 pr-2">
          <CatalogSidebar indexHref={indexHref} indexLabel={indexLabel} groups={groups} />
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
