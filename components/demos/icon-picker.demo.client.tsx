"use client"

import { useState } from "react"

import { IconPicker } from "@/components/icon-picker"

export function IconPickerDemo() {
  const [icon, setIcon] = useState("ChartBar")

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <IconPicker value={icon} onSelect={setIcon} />
      <p className="text-sm text-muted-foreground">선택한 아이콘: {icon}</p>
    </div>
  )
}
