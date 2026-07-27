"use client"

import { useState } from "react"

import { TreeView, type TreeNode } from "@/components/tree-view"

const NODES: TreeNode[] = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          { id: "button-tsx", label: "button.tsx" },
          { id: "input-tsx", label: "input.tsx" },
        ],
      },
      { id: "index-ts", label: "index.ts" },
    ],
  },
  { id: "package-json", label: "package.json" },
]

export function TreeViewDemo() {
  const [selectedId, setSelectedId] = useState<string | undefined>("index-ts")

  return (
    <div className="flex w-64 flex-col gap-2">
      <TreeView
        nodes={NODES}
        selectedId={selectedId}
        onSelectedIdChange={setSelectedId}
        defaultExpandedIds={["src", "components"]}
      />
      <span className="text-sm text-muted-foreground">선택: {selectedId ?? "없음"}</span>
    </div>
  )
}
