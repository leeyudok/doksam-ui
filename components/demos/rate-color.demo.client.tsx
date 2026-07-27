"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { rateColor, rateText } from "@/lib/finance/rate"

/** 등락률을 입력하면 rateColor/rateText 결과를 실시간으로 보여주는 인터랙티브 데모. */
export function RateColorDemo() {
  const [raw, setRaw] = useState("1.23")
  const n = Number(raw)
  const valid = raw.trim() !== "" && Number.isFinite(n)

  return (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="demo-rate">등락률 (%)</Label>
      <Input
        id="demo-rate"
        value={raw}
        onChange={(event) => setRaw(event.target.value)}
        placeholder="예: -0.87"
        inputMode="decimal"
      />
      <p className="text-sm text-muted-foreground">
        표시:{" "}
        <span className={`font-mono font-semibold ${valid ? rateColor(n) : ""}`}>
          {valid ? rateText(n) : "—"}
        </span>
      </p>
    </div>
  )
}
