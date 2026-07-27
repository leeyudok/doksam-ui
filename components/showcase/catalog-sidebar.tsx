"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";

export interface SidebarLink {
  href: string;
  label: string;
  /** 있으면 라벨을 이 i18n 키의 번역으로 렌더 (ko 폴백 = label). */
  labelKey?: string;
}

export interface SidebarGroup {
  /** 그룹 헤딩 — 없으면 구분선 없이 평평한 목록. */
  label?: string;
  /** 있으면 헤딩을 이 i18n 키의 번역으로 렌더 (ko 폴백 = label). */
  labelKey?: string;
  links: SidebarLink[];
}

function linkClass(active: boolean): string {
  return cn(
    "block rounded-md px-2.5 py-1.5 text-[13px] leading-tight transition-colors",
    active
      ? "bg-accent font-medium text-accent-foreground"
      : "text-muted-foreground hover:bg-muted hover:text-foreground",
  );
}

/**
 * 카탈로그 섹션(components/patterns/templates) 좌측 서브 내비.
 * 데이터는 서버 레이아웃이 레지스트리에서 만들어 내려준다(plain object).
 */
export function CatalogSidebar({
  indexHref,
  indexLabel,
  groups,
}: Readonly<{ indexHref: string; indexLabel: string; groups: SidebarGroup[] }>) {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav className="flex flex-col gap-5" aria-label={t("chrome.sidebar.aria", "섹션 내비게이션")}>
      <Link
        href={indexHref}
        aria-current={pathname === indexHref ? "page" : undefined}
        className={linkClass(pathname === indexHref)}
      >
        {t("chrome.sidebar.index", indexLabel)}
      </Link>
      {groups
        .filter((group) => group.links.length > 0)
        .map((group, i) => (
          <div key={group.label ?? i} className="flex flex-col gap-1">
            {group.label && (
              <div className="px-2.5 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                {group.labelKey ? t(group.labelKey, group.label) : group.label}
              </div>
            )}
            {group.links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={linkClass(active)}
                >
                  {link.labelKey ? t(link.labelKey, link.label) : link.label}
                </Link>
              );
            })}
          </div>
        ))}
    </nav>
  );
}
