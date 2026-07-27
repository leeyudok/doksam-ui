"use client";

import * as React from "react";
import { DotsThreeVerticalIcon } from "@phosphor-icons/react/dist/ssr";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { VariantProps } from "class-variance-authority";

type KebabMenuSize = Extract<
  NonNullable<VariantProps<typeof buttonVariants>["size"]>,
  "icon" | "icon-xs" | "icon-sm"
>;

export interface KebabMenuAction {
  /** 메뉴 항목에 표시할 텍스트이자 접근 라벨. */
  label: string;
  /** 라벨 앞에 렌더링할 아이콘. */
  icon?: React.ReactNode;
  /** 항목 선택 시 실행할 콜백. */
  onSelect: () => void;
  /** "destructive" 는 삭제 등 파괴적 액션을 빨간색으로 강조한다. */
  variant?: "default" | "destructive";
  disabled?: boolean;
}

/** 액션 항목이거나, 그룹을 가르는 구분선. */
export type KebabMenuItem = KebabMenuAction | "separator";

export interface KebabMenuProps {
  /** 트리거 버튼의 aria-label. 아이콘 전용 버튼의 라벨 누락을 타입으로 강제한다. */
  label: string;
  /** 메뉴에 렌더링할 항목 배열. "separator" 문자열은 구분선이 된다. */
  items: KebabMenuItem[];
  /** 메뉴 정렬. 기본 "end". */
  align?: "start" | "end";
  /** 트리거 아이콘 버튼 크기. 기본 "icon". */
  size?: KebabMenuSize;
}

/**
 * 케밥 메뉴 — 세로 점 3개(⋮) 아이콘 버튼을 누르면 액션 드롭다운이 열린다.
 * `tooltip-icon-button`(#21)과 같은 철학으로, 아이콘 전용 트리거의 aria-label
 * 누락을 `label` 필수 prop 으로 구조적으로 막는다. 메뉴 구성은 `items` 배열
 * 하나로 선언하며, DropdownMenu 조립·접근성 처리는 이 컴포넌트가 담당한다.
 */
function KebabMenu({ label, items, align = "end", size = "icon" }: Readonly<KebabMenuProps>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" size={size} aria-label={label}>
          <DotsThreeVerticalIcon weight="bold" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {items.map((item, index) =>
          item === "separator" ? (
            <DropdownMenuSeparator key={`separator-${index}`} />
          ) : (
            <DropdownMenuItem
              key={item.label}
              variant={item.variant}
              disabled={item.disabled}
              onSelect={item.onSelect}
            >
              {item.icon}
              {item.label}
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { KebabMenu };
