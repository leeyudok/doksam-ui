"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatWon } from "@/lib/finance/format-won"

/** 원 단위 금액을 입력하면 formatWon 결과를 실시간으로 보여주는 인터랙티브 데모. */
export function FormatWonDemo() {
  const [raw, setRaw] = useState("999960000000")
  const n = Number(raw)
  const valid = raw.trim() !== "" && Number.isFinite(n)

  return (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="demo-won">금액 (원)</Label>
      <Input
        id="demo-won"
        value={raw}
        onChange={(event) => setRaw(event.target.value)}
        placeholder="예: 999960000000"
        inputMode="numeric"
      />
      <p className="text-sm text-muted-foreground">
        표시: <span className="font-mono font-semibold text-foreground">{valid ? formatWon(n) : "—"}</span>
      </p>
    </div>
  )
}
