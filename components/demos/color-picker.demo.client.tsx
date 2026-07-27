"use client"

import { useState } from "react"

import { ColorPicker } from "@/components/color-picker"

export function ColorPickerDemo() {
  const [color, setColor] = useState("#3b82f6")

  return (
    <div className="flex items-center gap-3">
      <ColorPicker value={color} onValueChange={setColor} />
      <span className="text-sm text-muted-foreground">선택한 색: {color}</span>
    </div>
  )
}
