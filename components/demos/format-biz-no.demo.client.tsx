"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatBizNo } from "@/lib/bizinfo/format-biz-no"

/** 입력 필드에 사업자번호를 치면 formatBizNo 결과를 실시간으로 보여주는 인터랙티브 데모. */
export function FormatBizNoDemo() {
  const [raw, setRaw] = useState("1248100998")

  return (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="demo-biz-no">사업자등록번호 (원본)</Label>
      <Input
        id="demo-biz-no"
        value={raw}
        onChange={(event) => setRaw(event.target.value)}
        placeholder="예: 1248100998"
      />
      <p className="text-sm text-muted-foreground">
        표시용 포맷: <span className="font-mono text-foreground">{formatBizNo(raw) || "—"}</span>
      </p>
    </div>
  )
}
