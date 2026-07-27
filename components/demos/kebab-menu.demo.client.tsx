"use client";

import { useState } from "react";
import { PencilSimpleIcon, ShareNetworkIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";

import { KebabMenu } from "@/components/kebab-menu";

export function KebabMenuDemo() {
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-3">
      <KebabMenu
        label="파일 옵션"
        items={[
          {
            label: "이름 변경",
            icon: <PencilSimpleIcon size={16} weight="regular" />,
            onSelect: () => setLastAction("이름 변경"),
          },
          {
            label: "공유",
            icon: <ShareNetworkIcon size={16} weight="regular" />,
            onSelect: () => setLastAction("공유"),
          },
          "separator",
          {
            label: "삭제",
            icon: <TrashIcon size={16} weight="regular" />,
            variant: "destructive",
            onSelect: () => setLastAction("삭제"),
          },
        ]}
      />
      <span className="text-sm text-muted-foreground">
        {lastAction ? `마지막 실행: ${lastAction}` : "케밥(⋮) 버튼을 눌러보세요"}
      </span>
    </div>
  );
}
